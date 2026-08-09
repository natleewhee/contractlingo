import { cookies } from "next/headers";

export const USER_ID_COOKIE = "cl_uid";

// Shared by proxy.ts (which sets this cookie via NextResponse) and every
// Server Action that repoints it (via next/headers' cookies()) - both
// accept the same option shape, so keeping one copy avoids the two call
// sites drifting (they previously duplicated this with `secure: true`
// unconditionally, which silently drops the cookie on any non-HTTPS dev
// origin, and two different spellings of the same five-year max-age).
export const USER_ID_COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  maxAge: 60 * 60 * 24 * 365 * 5, // 5 years
  path: "/",
};

// Set by proxy.ts on first visit (see there for the legacy-migration
// logic). This should always be present by the time a Server Component or
// Server Action reads it - the one exception is a request that's the very
// first thing a brand-new visitor's browser ever sends (proxy sets the
// cookie on that response, but it isn't visible to this same request's
// render). Falling back to a fresh id here just means that one-off render
// shows a generic/empty view - by the next request the real cookie is in
// place and everything resolves normally. Read-only call sites should use
// this; anything that WRITES data should use requireUserId() instead.
export async function getUserId(): Promise<string> {
  const store = await cookies();
  return store.get(USER_ID_COOKIE)?.value ?? crypto.randomUUID();
}

// Like getUserId(), but throws instead of falling back when the cookie is
// missing. Every mutating Server Action uses this - silently writing to a
// freshly-minted id that's never persisted anywhere (the getUserId()
// fallback) would be undiagnosable data loss instead of a loud, visible
// error.
export async function requireUserId(): Promise<string> {
  const store = await cookies();
  const id = store.get(USER_ID_COOKIE)?.value;
  if (!id) throw new Error("Missing user identity cookie");
  return id;
}
