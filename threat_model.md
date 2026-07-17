# Threat Model

## Project Overview

Evening Sun Eatery & Supermarket is a React + Express full-stack web application for a Nigerian restaurant/retail business. The frontend is a single-page app (Vite/React) with a cart that checkouts via WhatsApp. The backend is an Express 5 API server (Node.js 24, TypeScript) backed by PostgreSQL via Drizzle ORM. The deployment is publicly accessible (autoscale, `visibility: public`) at `https://evening-sun-eatery-and-supermarket.replit.app`.

## Assets

- **Customer PII** — customer names, phone numbers, and email addresses stored in `admin_customers`. Exposure violates customer privacy and Nigerian data-protection obligations.
- **Order data** — order history, item lists, totals, and order types stored in `admin_orders`. Contains business-sensitive revenue data.
- **Revenue and business intelligence** — aggregate stats (total revenue, monthly trends, top items). Sensitive business data.
- **Application secrets** — `DATABASE_URL` (database connection string), `SESSION_SECRET` (listed in replit.md but currently unused in code).

## Trust Boundaries

- **Internet → API** — The API is publicly deployed with no network-layer restriction. All admin endpoints must enforce authentication server-side; currently none do.
- **Browser → API (CORS)** — CORS is configured with wildcard `*`, allowing any origin to make cross-origin requests to any endpoint.
- **API → PostgreSQL** — Drizzle ORM with parameterized queries used throughout; no raw string-concatenated SQL found. This boundary is adequately protected against SQL injection.
- **Public site → WhatsApp checkout** — The cart link is generated client-side via `generateWhatsAppLink()`. No server-side data is written during checkout; low risk.

## Scan Anchors

- **Highest-risk file:** `artifacts/api-server/src/routes/admin.ts` — 8 admin endpoints with no auth, PII, write access
- **API entry point:** `artifacts/api-server/src/app.ts` → `artifacts/api-server/src/routes/index.ts`
- **Admin surfaces:** All routes under `/api/admin/*` — currently all public
- **Public (safe) surfaces:** `/api/healthz`, frontend SPA (no server-side rendering)
- **Dev-only:** `artifacts/mockup-sandbox/` — Canvas design tool, not reachable in production API

## Threat Categories

### Spoofing / Broken Access Control

**Critical.** All 8 admin endpoints are mounted without any authentication or authorization middleware. The application's `replit.md` declares `SESSION_SECRET` as a required environment variable, but the session library is never initialized and no token or session check exists at any route. Any anonymous user on the internet can read all orders, customer PII, and revenue data, and can change the status of any order.

Required guarantees:
- All `/api/admin/*` routes MUST require a valid, server-verified credential (session cookie, API key, or JWT) before processing.
- Authentication checks MUST be enforced at the middleware layer, not per-route.

### Information Disclosure

Customer names, phone numbers, and email addresses are returned in plaintext by unauthenticated endpoints. The `/admin/customers` endpoint returns the full customer list; `/admin/orders` and `/admin/orders/recent` return names and phone numbers. There is no rate limiting or pagination cap, so full table dumps are possible in a single request.

Required guarantees:
- Admin endpoints MUST authenticate callers before returning any PII.
- Pagination `limit` MUST be capped server-side (e.g., max 100).
- Error responses MUST NOT expose stack traces or internal details (currently handled correctly — only generic messages returned).

### Tampering

The `PATCH /api/admin/orders/:id` endpoint allows any unauthenticated caller to change the status of any order. The `status` field is not validated against the allowed enum values at the application layer (`as any` cast). While the DB column constraint may reject some values, application-layer validation is missing.

Required guarantees:
- Write endpoints MUST require authentication.
- `status` field MUST be validated against the allowed enum before the DB update.

### Denial of Service

No rate limiting is applied to any endpoint. The `limit` query parameter on list endpoints is not capped, allowing a caller to request arbitrarily large result sets from the database in a single HTTP request, potentially exhausting DB memory and connection pool.

Required guarantees:
- Pagination `limit` MUST be capped (e.g., max 100 rows).
- Rate limiting SHOULD be applied to all API endpoints, especially unauthenticated ones.

### Security Misconfiguration

`app.use(cors())` with no options sets `Access-Control-Allow-Origin: *`, permitting any origin to call admin endpoints from a browser context. This is unnecessary since the API is only used by the same-origin frontend and admin dashboard.

Required guarantees:
- CORS MUST be restricted to known, allowed origins (the deployed frontend URL and any admin dashboard URL).
