import { neon, type NeonQueryFunction } from "@neondatabase/serverless";

// Constructed lazily (not at module load) so a missing DATABASE_URL only
// throws when actually queried, never during build/static analysis.
let sql: NeonQueryFunction<false, false> | null = null;

function getSql(): NeonQueryFunction<false, false> {
  if (!sql) {
    const url = process.env.DATABASE_URL;
    if (!url) throw new Error("DATABASE_URL is not set");
    sql = neon(url);
  }
  return sql;
}

let schemaReady: Promise<void> | null = null;

// Idempotent - safe to call on every request. Cached per server instance so
// it only actually hits the database once per cold start.
function ensureSchema(): Promise<void> {
  if (!schemaReady) {
    const db = getSql();
    schemaReady = (async () => {
      await db`
        CREATE TABLE IF NOT EXISTS progress (
          id text PRIMARY KEY DEFAULT 'default',
          streak integer NOT NULL DEFAULT 0,
          total_cleared integer NOT NULL DEFAULT 0,
          last_completed_date date,
          updated_at timestamptz NOT NULL DEFAULT now()
        )
      `;
      await db`
        CREATE TABLE IF NOT EXISTS flags (
          id bigserial PRIMARY KEY,
          question_id text NOT NULL,
          reason text NOT NULL,
          created_at timestamptz NOT NULL DEFAULT now()
        )
      `;
    })();
  }
  return schemaReady;
}

export type Progress = {
  streak: number;
  totalCleared: number;
  lastCompletedDate: string | null; // YYYY-MM-DD
};

const DEFAULT_PROGRESS: Progress = {
  streak: 0,
  totalCleared: 0,
  lastCompletedDate: null,
};

function todayKey(): string {
  return new Date().toISOString().slice(0, 10);
}

function yesterdayKey(): string {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().slice(0, 10);
}

// Single-user app, single row - no auth/user id needed for V1.
export async function getProgress(): Promise<Progress> {
  try {
    await ensureSchema();
    const db = getSql();
    const rows = await db`
      SELECT streak, total_cleared, last_completed_date
      FROM progress WHERE id = 'default'
    `;
    if (rows.length === 0) return DEFAULT_PROGRESS;
    const row = rows[0] as {
      streak: number;
      total_cleared: number;
      last_completed_date: string | null;
    };
    return {
      streak: row.streak,
      totalCleared: row.total_cleared,
      lastCompletedDate: row.last_completed_date ? String(row.last_completed_date).slice(0, 10) : null,
    };
  } catch (err) {
    console.error("getProgress failed", err);
    return DEFAULT_PROGRESS;
  }
}

// Bumps the streak by one calendar day (never more than once per day) and
// adds to the running total of cases faced.
export async function recordSessionComplete(clearedCount: number): Promise<Progress> {
  await ensureSchema();
  const db = getSql();
  const current = await getProgress();
  const today = todayKey();

  let streak = current.streak;
  if (current.lastCompletedDate === today) {
    // Already logged a session today - streak doesn't move twice in a day.
  } else if (current.lastCompletedDate === yesterdayKey()) {
    streak += 1;
  } else {
    streak = 1;
  }

  const totalCleared = current.totalCleared + clearedCount;

  await db`
    INSERT INTO progress (id, streak, total_cleared, last_completed_date, updated_at)
    VALUES ('default', ${streak}, ${totalCleared}, ${today}, now())
    ON CONFLICT (id) DO UPDATE SET
      streak = EXCLUDED.streak,
      total_cleared = EXCLUDED.total_cleared,
      last_completed_date = EXCLUDED.last_completed_date,
      updated_at = now()
  `;

  return { streak, totalCleared, lastCompletedDate: today };
}

// Best-effort - "report this case" should never break the session flow.
export async function recordFlag(questionId: string, reason: string): Promise<void> {
  try {
    await ensureSchema();
    const db = getSql();
    await db`INSERT INTO flags (question_id, reason) VALUES (${questionId}, ${reason})`;
  } catch (err) {
    console.error("recordFlag failed", err);
  }
}
