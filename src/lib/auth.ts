export const AUTH_COOKIE_NAME = "cl_auth";

const SIGNED_PAYLOAD = "contractlingo-authenticated";

// Web Crypto (crypto.subtle) is used instead of Node's `crypto` module so
// this works unmodified in both the Edge middleware runtime and the
// Node.js runtime the login Server Action runs in.
async function computeToken(password: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(password),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signature = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(SIGNED_PAYLOAD));
  return Array.from(new Uint8Array(signature))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let result = 0;
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return result === 0;
}

// The cookie never stores the password itself - just an HMAC of a fixed
// payload keyed by it, so changing APP_PASSWORD invalidates every existing
// session automatically (the stored token no longer matches).
export async function issueAuthToken(): Promise<string | null> {
  const password = process.env.APP_PASSWORD;
  if (!password) return null;
  return computeToken(password);
}

export async function verifyAuthToken(token: string | undefined): Promise<boolean> {
  const password = process.env.APP_PASSWORD;
  if (!password || !token) return false;
  const expected = await computeToken(password);
  return timingSafeEqual(token, expected);
}

export async function verifyPassword(candidate: string): Promise<boolean> {
  const password = process.env.APP_PASSWORD;
  if (!password) return false;
  return timingSafeEqual(candidate, password);
}
