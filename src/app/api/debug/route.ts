import { NextResponse } from "next/server";
import { checkConnection, getProgress, getQuestionsTableCount } from "@/lib/db";

// Unambiguous diagnostic for the Neon connection, since a "0" streak on
// Home is indistinguishable between "genuinely no session completed yet"
// and "the DB call is silently failing and falling back to defaults".
// Visit /api/debug directly and paste the JSON back.
export async function GET() {
  const hasDatabaseUrl = Boolean(process.env.DATABASE_URL);
  const hasAppPassword = Boolean(process.env.APP_PASSWORD);

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

  const progress = await getProgress();

  return NextResponse.json({ hasDatabaseUrl, hasAppPassword, connection, questionsTable, progress });
}
