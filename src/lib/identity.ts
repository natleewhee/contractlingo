import { cookies } from "next/headers";

export const USER_ID_COOKIE = "cl_uid";

// Set by proxy.ts on first visit (see there for the legacy-migration
// logic). This should always be present by the time a Server Component or
// Server Action reads it - the one exception is a request that's the very
// first thing a brand-new visitor's browser ever sends (proxy sets the
// cookie on that response, but it isn't visible to this same request's
// render). Falling back to a fresh id here just means that one-off render
// shows a generic/empty view - by the next request the real cookie is in
// place and everything resolves normally.
export async function getUserId(): Promise<string> {
  const store = await cookies();
  return store.get(USER_ID_COOKIE)?.value ?? crypto.randomUUID();
}
