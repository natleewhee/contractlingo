import { NextRequest, NextResponse } from "next/server";
import { checkConnection, getProgress, getQuestionsTableCount } from "@/lib/db";
import { getUserId } from "@/lib/identity";
import { isAdminRequest } from "@/lib/adminAuth";

// Unambiguous diagnostic for the Neon connection, since a "0" streak on
// Home is indistinguishable between "genuinely no session completed yet"
// and "the DB call is silently failing and falling back to defaults".
// Visit /api/debug?key=<ADMIN_SECRET> and paste the JSON back - this used
// to be wide open, which leaked raw driver error text (hostnames, whether
// DATABASE_URL is set at all) to any anonymous visitor.
export async function GET(req: NextRequest) {
  if (!isAdminRequest(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const hasDatabaseUrl = Boolean(process.env.DATABASE_URL);
  const userId = await getUserId();

  let connection: { ok: true; time: string } | { ok: false; error: string };
  try {
    const result = await checkConnection();
    connection = { ok: true, ...result };
  } catch (err) {
    connection = { ok: false, error: err instanceof Error ? err.message : String(err) };
  }

  let questionsTable: { ok: true; rowCount: number } | { ok: false; error: string };
  try {
    const rowCount = await getQuestionsTableCount();
    questionsTable = { ok: true, rowCount };
  } catch (err) {
    questionsTable = { ok: false, error: err instanceof Error ? err.message : String(err) };
  }

  const progress = await getProgress(userId);

  return NextResponse.json({ hasDatabaseUrl, userId, connection, questionsTable, progress });
}
