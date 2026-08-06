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
      await db`
        CREATE TABLE IF NOT EXISTS question_progress (
          question_id text PRIMARY KEY,
          due_date date NOT NULL DEFAULT CURRENT_DATE,
          interval_days integer NOT NULL DEFAULT 1,
          ease_factor real NOT NULL DEFAULT 2.5,
          reps integer NOT NULL DEFAULT 0,
          updated_at timestamptz NOT NULL DEFAULT now()
        )
      `;
      await db`
        CREATE TABLE IF NOT EXISTS push_subscriptions (
          endpoint text PRIMARY KEY,
          p256dh text NOT NULL,
          auth text NOT NULL,
          created_at timestamptz NOT NULL DEFAULT now()
        )
      `;
      await db`
        CREATE TABLE IF NOT EXISTS answer_log (
          id bigserial PRIMARY KEY,
          question_id text NOT NULL,
          topic text NOT NULL,
          correct boolean NOT NULL,
          created_at timestamptz NOT NULL DEFAULT now()
        )
      `;
    })();
  }
  return schemaReady;
}

// Unlike getProgress()/recordFlag(), this deliberately does NOT swallow
// errors - it's for the /api/debug diagnostic route, where the whole point
// is surfacing the real failure reason instead of a graceful fallback.
export async function checkConnection(): Promise<{ time: string }> {
  await ensureSchema();
  const db = getSql();
  const rows = await db`SELECT now() as time`;
  const raw = (rows[0] as { time: unknown }).time;
  return { time: raw instanceof Date ? raw.toISOString() : String(raw) };
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

function twoDaysAgoKey(): string {
  const d = new Date();
  d.setDate(d.getDate() - 2);
  return d.toISOString().slice(0, 10);
}

// The Neon driver returns `date` columns as JS Date objects, not strings -
// String(dateObject) gives Date's default toString() ("Thu Aug 06 2026 ..."),
// NOT an ISO string, so naively slicing that produces "Thu Aug 06" instead
// of "2026-08-06". Route through toISOString() when it's an actual Date.
function normalizeDateKey(value: unknown): string | null {
  if (!value) return null;
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  return String(value).slice(0, 10);
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
      last_completed_date: unknown;
    };
    return {
      streak: row.streak,
      totalCleared: row.total_cleared,
      lastCompletedDate: normalizeDateKey(row.last_completed_date),
    };
  } catch (err) {
    console.error("getProgress failed", err);
    return DEFAULT_PROGRESS;
  }
}

export type SessionCompleteResult = Progress & { frozeStreak: boolean };

// Bumps the streak by one calendar day (never more than once per day) and
// adds to the running total of cases faced. Missing a single day doesn't
// reset the streak - it's forgiven once (the freeze), so a two-day-old
// last-completed-date still counts as a continuation. A gap of two or more
// full missed days still resets to 1.
export async function recordSessionComplete(clearedCount: number): Promise<SessionCompleteResult> {
  await ensureSchema();
  const db = getSql();
  const current = await getProgress();
  const today = todayKey();

  let streak = current.streak;
  let frozeStreak = false;
  if (current.lastCompletedDate === today) {
    // Already logged a session today - streak doesn't move twice in a day.
  } else if (current.lastCompletedDate === yesterdayKey()) {
    streak += 1;
  } else if (current.lastCompletedDate === twoDaysAgoKey()) {
    streak += 1;
    frozeStreak = true;
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

  return { streak, totalCleared, lastCompletedDate: today, frozeStreak };
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

// Filters `allIds` down to the ones due for review today - either never
// attempted before, or due_date has arrived. Fails open (returns everything)
// on error, since showing too much is far better than showing nothing.
export async function getDueQuestionIds(allIds: string[]): Promise<string[]> {
  if (allIds.length === 0) return [];
  try {
    await ensureSchema();
    const db = getSql();
    const rows = await db`
      SELECT question_id, due_date FROM question_progress
      WHERE question_id = ANY(${allIds})
    `;
    const dueDateById = new Map<string, string | null>();
    for (const row of rows as { question_id: string; due_date: unknown }[]) {
      dueDateById.set(row.question_id, normalizeDateKey(row.due_date));
    }
    const today = todayKey();
    return allIds.filter((id) => {
      const dueDate = dueDateById.get(id);
      return dueDate === undefined || dueDate === null || dueDate <= today;
    });
  } catch (err) {
    console.error("getDueQuestionIds failed", err);
    return allIds;
  }
}

// Simplified SM-2: correct answers grow the interval (1 day -> 3 days ->
// interval * ease from there); any miss resets the question to come back
// tomorrow. Best-effort, matching recordFlag - a scheduling hiccup should
// never break the session.
export async function recordAnswer(questionId: string, correct: boolean, topic: string): Promise<void> {
  try {
    await ensureSchema();
    const db = getSql();
    await db`INSERT INTO answer_log (question_id, topic, correct) VALUES (${questionId}, ${topic}, ${correct})`;
    const rows = await db`
      SELECT interval_days, ease_factor, reps FROM question_progress WHERE question_id = ${questionId}
    `;
    const current = rows[0] as
      | { interval_days: number; ease_factor: number; reps: number }
      | undefined;

    let intervalDays = current?.interval_days ?? 1;
    let easeFactor = current?.ease_factor ?? 2.5;
    let reps = current?.reps ?? 0;

    if (correct) {
      reps += 1;
      if (reps === 1) intervalDays = 1;
      else if (reps === 2) intervalDays = 3;
      else intervalDays = Math.round(intervalDays * easeFactor);
      easeFactor = Math.min(easeFactor + 0.1, 3);
    } else {
      reps = 0;
      intervalDays = 1;
      easeFactor = Math.max(easeFactor - 0.2, 1.3);
    }

    const due = new Date();
    due.setDate(due.getDate() + intervalDays);
    const dueDate = due.toISOString().slice(0, 10);

    await db`
      INSERT INTO question_progress (question_id, due_date, interval_days, ease_factor, reps, updated_at)
      VALUES (${questionId}, ${dueDate}, ${intervalDays}, ${easeFactor}, ${reps}, now())
      ON CONFLICT (question_id) DO UPDATE SET
        due_date = EXCLUDED.due_date,
        interval_days = EXCLUDED.interval_days,
        ease_factor = EXCLUDED.ease_factor,
        reps = EXCLUDED.reps,
        updated_at = now()
    `;
  } catch (err) {
    console.error("recordAnswer failed", err);
  }
}

export type PushSubscriptionRecord = {
  endpoint: string;
  p256dh: string;
  auth: string;
};

export async function saveSubscription(sub: PushSubscriptionRecord): Promise<void> {
  await ensureSchema();
  const db = getSql();
  await db`
    INSERT INTO push_subscriptions (endpoint, p256dh, auth)
    VALUES (${sub.endpoint}, ${sub.p256dh}, ${sub.auth})
    ON CONFLICT (endpoint) DO UPDATE SET p256dh = EXCLUDED.p256dh, auth = EXCLUDED.auth
  `;
}

export async function removeSubscription(endpoint: string): Promise<void> {
  await ensureSchema();
  const db = getSql();
  await db`DELETE FROM push_subscriptions WHERE endpoint = ${endpoint}`;
}

export async function getSubscription(endpoint: string): Promise<boolean> {
  await ensureSchema();
  const db = getSql();
  const rows = await db`SELECT 1 FROM push_subscriptions WHERE endpoint = ${endpoint}`;
  return rows.length > 0;
}

export async function getAllSubscriptions(): Promise<PushSubscriptionRecord[]> {
  await ensureSchema();
  const db = getSql();
  const rows = await db`SELECT endpoint, p256dh, auth FROM push_subscriptions`;
  return rows as PushSubscriptionRecord[];
}

export type TopicStat = {
  topic: string;
  attempts: number;
  correct: number;
  accuracy: number; // 0-100
};

// Powers the PRD's "weak topics" progress view. Fails open to an empty list
// on error - the progress page just shows no weak-topic callouts rather than
// crashing.
export async function getTopicStats(): Promise<TopicStat[]> {
  try {
    await ensureSchema();
    const db = getSql();
    const rows = await db`
      SELECT topic, COUNT(*) as attempts, COUNT(*) FILTER (WHERE correct) as correct
      FROM answer_log
      GROUP BY topic
    `;
    return (rows as { topic: string; attempts: string | number; correct: string | number }[]).map((row) => {
      const attempts = Number(row.attempts);
      const correct = Number(row.correct);
      return {
        topic: row.topic,
        attempts,
        correct,
        accuracy: attempts === 0 ? 100 : Math.round((correct / attempts) * 100),
      };
    });
  } catch (err) {
    console.error("getTopicStats failed", err);
    return [];
  }
}
