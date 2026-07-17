import { type Request, type Response, type NextFunction } from "express";

const ADMIN_API_KEY = process.env.ADMIN_API_KEY;

if (!ADMIN_API_KEY) {
  console.error(
    "[FATAL] ADMIN_API_KEY environment variable is not set. " +
      "Admin endpoints will be inaccessible until it is configured."
  );
}

/**
 * Middleware that protects admin routes with a static API key.
 *
 * Clients must send one of:
 *   Authorization: Bearer <key>
 *   X-Admin-Api-Key: <key>
 */
export function adminAuth(req: Request, res: Response, next: NextFunction) {
  if (!ADMIN_API_KEY) {
    return res.status(503).json({ error: "Admin API is not configured" });
  }

  const authHeader = req.headers["authorization"];
  const apiKeyHeader = req.headers["x-admin-api-key"];

  let providedKey: string | undefined;

  if (typeof authHeader === "string" && authHeader.startsWith("Bearer ")) {
    providedKey = authHeader.slice(7).trim();
  } else if (typeof apiKeyHeader === "string") {
    providedKey = apiKeyHeader.trim();
  }

  if (!providedKey || providedKey !== ADMIN_API_KEY) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  next();
}
