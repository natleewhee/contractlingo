"use server";

import { cookies } from "next/headers";
import { AUTH_COOKIE_NAME, issueAuthToken, verifyPassword } from "@/lib/auth";

export async function login(password: string): Promise<boolean> {
  const ok = await verifyPassword(password);
  if (!ok) return false;

  const token = await issueAuthToken();
  if (!token) return false;

  const cookieStore = await cookies();
  cookieStore.set(AUTH_COOKIE_NAME, token, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 180, // 180 days
    path: "/",
  });
  return true;
}
