import { NextRequest, NextResponse } from "next/server";
import { AUTH_COOKIE_NAME, verifyAuthToken } from "@/lib/auth";

export async function proxy(req: NextRequest) {
  const token = req.cookies.get(AUTH_COOKIE_NAME)?.value;
  if (await verifyAuthToken(token)) {
    return NextResponse.next();
  }

  const loginUrl = new URL("/login", req.url);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  // Everything except the login page itself, the cron route (which has its
  // own CRON_SECRET Bearer check and won't present this cookie), the debug
  // route (diagnostic-only, no secrets in its response - needs to stay
  // reachable specifically to debug a broken login), and static assets
  // needed before/without auth (manifest, service worker, icons).
  matcher: [
    "/((?!login|api/cron|api/debug|_next/static|_next/image|manifest\\.webmanifest|sw\\.js|icon\\.svg|apple-icon|favicon\\.ico).*)",
  ],
};
