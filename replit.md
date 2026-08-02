# Evening Sun Eatery & Supermarket

A premium single-page website for Evening Sun Eatery & Supermarket, Mosafejo, Nigeria — covering the restaurant, bakery, grill spot, lounge, snooker arena, salon, and supermarket under one roof.

## Run & Operate

- `pnpm --filter @workspace/evening-sun run dev` — run the main website (frontend only)
- `pnpm --filter @workspace/api-server run dev` — run the API server
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string, `SESSION_SECRET` — session signing secret

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Frontend: React + Vite (artifacts/evening-sun)
- API: Express 5 (artifacts/api-server)
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec in `lib/api-spec/openapi.yaml`)
- Build: esbuild (CJS bundle)

## Where things live

```
artifacts/
  evening-sun/          # Main public website (React + Vite)
    src/
      App.tsx           # Root — controls page state (home | privacy | terms)
      components/
        Navbar.tsx
        RestaurantSection.tsx   # All menu data & items
        BakerySection.tsx
        GrillSection.tsx
        SupermarketSection.tsx
        LoungeSection.tsx
        SnookerSection.tsx
        SalonSection.tsx
        ProductCard.tsx
        CartDrawer.tsx          # Slide-out cart → WhatsApp checkout
        Footer.tsx
        PrivacyPolicyPage.tsx
        TermsConditionsPage.tsx
      lib/utils.ts              # cn(), formatNaira(), generateWhatsAppLink(), CONTACT_PHONE

  api-server/           # Express API backend
    src/
      routes/
        health.ts
        admin.ts        # 8 admin endpoints (stats, orders, monthly, categories, customers)
      app.ts

lib/
  api-spec/openapi.yaml # OpenAPI source of truth — edit here, then run codegen
  api-client-react/     # Generated React Query hooks (do not edit)
  api-zod/              # Generated Zod schemas (do not edit)
  db/
    src/schema/admin.ts # admin_orders + admin_customers tables
```

## Architecture decisions

- **No prices anywhere** — all prices removed site-wide; salon and snooker are booking-only via WhatsApp. Cart sends item names + quantities only.
- **Privacy/Terms as overlays** — no router; controlled by `page` state in `App.tsx` (`'home' | 'privacy' | 'terms'`).
- **All product images via Vite asset URL pattern** — `new URL('@assets/...', import.meta.url).href` pointing to `attached_assets/`. Never use raw import for images.
- **WhatsApp as checkout** — `generateWhatsAppLink()` in `lib/utils.ts` builds the message; phone `08081734021`.
- **OpenAPI-first** — all API contracts live in `lib/api-spec/openapi.yaml`; run codegen after any spec change before touching frontend hooks.

## Product

**Main website (`/evening-sun`):**
- Cinematic hero with sticky navbar, dark/light mode toggle, and real logo
- Full menu: Nigerian Meals, Shawarma, Burgers, Pizza, Small Chops, Drinks, Bakery, Grill Spot
- Lounge, Snooker Arena (book via WhatsApp), Salon (book via WhatsApp)
- Supermarket with six product categories (Groceries, Beverages, Snacks, Toiletries, Frozen Foods, Household)
- Slide-out cart drawer with WhatsApp checkout (no prices in message)
- Floating WhatsApp button
- Testimonials, FAQ, Newsletter signup, Contact section
- Full Privacy Policy and Terms & Conditions (overlay pages with working footer links)

## User preferences

- No prices displayed anywhere on the site
- Salon and snooker are booking-only (WhatsApp), not purchasable via cart
- Contact phone: 08081734021 (WhatsApp + calls), alternate: defined in `lib/utils.ts`
- Facebook handle: @EveningSun247 (facebook.com/EveningSun247)
- Instagram handle: @evensuneatry (instagram.com/evensuneatry)
- Contact section has a live Google Maps embed centred on Mosafejo, Ondo State, Nigeria

## Gotchas

- Always run `pnpm --filter @workspace/api-spec run codegen` after editing `openapi.yaml` — the frontend hooks are generated from it.
- After any API server code change, restart the `artifacts/api-server: API Server` workflow.
- Images must use `new URL('@assets/filename', import.meta.url).href` — raw imports do not work with the Vite asset pipeline here.
- `zod/v4` is the import path (not `zod`) — the project uses Zod v4.

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
