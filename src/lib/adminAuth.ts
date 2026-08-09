import { timingSafeEqual } from "node:crypto";
import type { NextRequest } from "next/server";

// Shared operator-only gate for /api/debug, /api/admin/stats, and /flags -
// none of these should be reachable by an anonymous visitor. Supports both
// a `Bearer` header (for API-style callers, mirroring the cron route's
// CRON_SECRET check) and a `?key=` query param, since a human just visiting
// the URL in a browser can't set a custom header. Fails closed: with no
// ADMIN_SECRET configured, nothing is ever authorized.
export function isAdminSecretValid(candidate: string | null | undefined): boolean {
  const secret = process.env.ADMIN_SECRET;
  if (!secret || !candidate) return false;
  const a = Buffer.from(candidate);
  const b = Buffer.from(secret);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

export function isAdminRequest(req: NextRequest): boolean {
  const authHeader = req.headers.get("authorization");
  const headerSecret = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : null;
  const querySecret = req.nextUrl.searchParams.get("key");
  return isAdminSecretValid(headerSecret) || isAdminSecretValid(querySecret);
}
