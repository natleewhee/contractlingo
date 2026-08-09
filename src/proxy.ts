import { NextRequest, NextResponse } from "next/server";
import { USER_ID_COOKIE, USER_ID_COOKIE_OPTIONS } from "@/lib/identity";

// Legacy cookie from the old shared-passphrase gate, since removed - kept
// only to migrate the original owner's browser to the 'default' user_id
// (the id all their existing progress/history is already stored under)
// instead of quietly starting them over as a stranger.
const LEGACY_AUTH_COOKIE = "cl_auth";

export function proxy(req: NextRequest) {
  if (req.cookies.get(USER_ID_COOKIE)?.value) {
    return NextResponse.next();
  }

  const userId = req.cookies.get(LEGACY_AUTH_COOKIE)?.value ? "default" : crypto.randomUUID();
  const response = NextResponse.next();
  response.cookies.set(USER_ID_COOKIE, userId, USER_ID_COOKIE_OPTIONS);
  return response;
}

export const config = {
  matcher: [
    "/((?!api/cron|_next/static|_next/image|manifest\\.webmanifest|sw\\.js|icon\\.svg|apple-icon|favicon\\.ico).*)",
  ],
};
