import { neon, type NeonQueryFunction } from "@neondatabase/serverless";
import { SESSION_QUESTIONS, type Question } from "@/lib/questions";

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
      // Final shape for a fresh install - already user_id-keyed.
      await db`
        CREATE TABLE IF NOT EXISTS progress (
          user_id text PRIMARY KEY,
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
          user_id text NOT NULL,
          question_id text NOT NULL,
          due_date date NOT NULL DEFAULT CURRENT_DATE,
          interval_days integer NOT NULL DEFAULT 1,
          ease_factor real NOT NULL DEFAULT 2.5,
          reps integer NOT NULL DEFAULT 0,
          updated_at timestamptz NOT NULL DEFAULT now(),
          PRIMARY KEY (user_id, question_id)
        )
      `;
      await db`
        CREATE TABLE IF NOT EXISTS push_subscriptions (
          endpoint text PRIMARY KEY,
          user_id text NOT NULL DEFAULT 'default',
          p256dh text NOT NULL,
          auth text NOT NULL,
          created_at timestamptz NOT NULL DEFAULT now()
        )
      `;
      await db`
        CREATE TABLE IF NOT EXISTS answer_log (
          id bigserial PRIMARY KEY,
          user_id text NOT NULL DEFAULT 'default',
          question_id text NOT NULL,
          topic text NOT NULL,
          correct boolean NOT NULL,
          created_at timestamptz NOT NULL DEFAULT now()
        )
      `;
      await db`
        CREATE TABLE IF NOT EXISTS profile (
          user_id text PRIMARY KEY,
          display_name text,
          avatar_scheme text NOT NULL DEFAULT 'coral',
          updated_at timestamptz NOT NULL DEFAULT now()
        )
      `;
      await db`
        CREATE TABLE IF NOT EXISTS questions (
          id text PRIMARY KEY,
          topic text NOT NULL,
          scenario text NOT NULL,
          options jsonb NOT NULL,
          correct_index integer NOT NULL,
          explanation text NOT NULL,
          updated_at timestamptz NOT NULL DEFAULT now()
        )
      `;

      // One-time migrations from the original single-user shape (id text
      // PRIMARY KEY DEFAULT 'default', no user_id column at all). Each is
      // guarded so it only runs once - on a fresh install the CREATE TABLE
      // statements above already produce the final shape, so these no-op.
      // Verified against a local Postgres copy of the live schema,
      // including that re-running is a safe no-op.
      await db`
        DO $$
        BEGIN
          IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'progress' AND column_name = 'id')
             AND NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'progress' AND column_name = 'user_id') THEN
            ALTER TABLE progress ADD COLUMN user_id text;
            UPDATE progress SET user_id = id;
            ALTER TABLE progress ALTER COLUMN user_id SET NOT NULL;
            ALTER TABLE progress DROP CONSTRAINT progress_pkey;
            ALTER TABLE progress ADD PRIMARY KEY (user_id);
            ALTER TABLE progress DROP COLUMN id;
          END IF;
        END $$
      `;
      await db`
        DO $$
        BEGIN
          IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'profile' AND column_name = 'id')
             AND NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'profile' AND column_name = 'user_id') THEN
            ALTER TABLE profile ADD COLUMN user_id text;
            UPDATE profile SET user_id = id;
            ALTER TABLE profile ALTER COLUMN user_id SET NOT NULL;
            ALTER TABLE profile DROP CONSTRAINT profile_pkey;
            ALTER TABLE profile ADD PRIMARY KEY (user_id);
            ALTER TABLE profile DROP COLUMN id;
          END IF;
        END $$
      `;
      await db`
        DO $$
        BEGIN
          IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'question_progress' AND column_name = 'user_id') THEN
            ALTER TABLE question_progress ADD COLUMN user_id text;
            UPDATE question_progress SET user_id = 'default';
            ALTER TABLE question_progress ALTER COLUMN user_id SET NOT NULL;
            ALTER TABLE question_progress DROP CONSTRAINT question_progress_pkey;
            ALTER TABLE question_progress ADD PRIMARY KEY (user_id, question_id);
          END IF;
        END $$
      `;
      await db`ALTER TABLE answer_log ADD COLUMN IF NOT EXISTS user_id text NOT NULL DEFAULT 'default'`;
      await db`ALTER TABLE push_subscriptions ADD COLUMN IF NOT EXISTS user_id text NOT NULL DEFAULT 'default'`;

      // The question bank is still authored in code (src/lib/questions.ts) -
      // reviewable via git, no risk of DB/code drift - but synced into Neon
      // here on every cold start so it's genuinely queryable there too, and
      // getAllQuestions() below reads from this table. One bulk upsert via
      // jsonb_to_recordset, not one round trip per question.
      const seedRows = SESSION_QUESTIONS.map((q) => ({
        id: q.id,
        topic: q.topic,
        scenario: q.scenario,
        options: q.options,
        correct_index: q.correctIndex,
        explanation: q.explanation,
      }));
      await db`
        INSERT INTO questions (id, topic, scenario, options, correct_index, explanation)
        SELECT id, topic, scenario, options, correct_index, explanation
        FROM jsonb_to_recordset(${JSON.stringify(seedRows)}::jsonb)
          AS x(id text, topic text, scenario text, options jsonb, correct_index integer, explanation text)
        ON CONFLICT (id) DO UPDATE SET
          topic = EXCLUDED.topic,
          scenario = EXCLUDED.scenario,
          options = EXCLUDED.options,
          correct_index = EXCLUDED.correct_index,
          explanation = EXCLUDED.explanation,
          updated_at = now()
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

// Same non-swallowing rationale as checkConnection() - lets /api/debug
// distinguish "table exists with 0 rows" (seed didn't run/failed) from a
// real connection error, rather than both silently looking like "0".
export async function getQuestionsTableCount(): Promise<number> {
  await ensureSchema();
  const db = getSql();
  const rows = await db`SELECT COUNT(*) as count FROM questions`;
  return Number((rows[0] as { count: string | number }).count);
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

// Every visitor gets their own anonymous, cookie-scoped user_id (see
// src/proxy.ts and src/lib/identity.ts) - no login, no shared data. Every
// function below is scoped to a specific userId rather than a single
// global row.
export async function getProgress(userId: string): Promise<Progress> {
  try {
    await ensureSchema();
    const db = getSql();
    const rows = await db`
      SELECT streak, total_cleared, last_completed_date
      FROM progress WHERE user_id = ${userId}
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
export async function recordSessionComplete(
  userId: string,
  clearedCount: number
): Promise<SessionCompleteResult> {
  await ensureSchema();
  const db = getSql();
  const current = await getProgress(userId);
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
    INSERT INTO progress (user_id, streak, total_cleared, last_completed_date, updated_at)
    VALUES (${userId}, ${streak}, ${totalCleared}, ${today}, now())
    ON CONFLICT (user_id) DO UPDATE SET
      streak = EXCLUDED.streak,
      total_cleared = EXCLUDED.total_cleared,
      last_completed_date = EXCLUDED.last_completed_date,
      updated_at = now()
  `;

  return { streak, totalCleared, lastCompletedDate: today, frozeStreak };
}

// Best-effort - "report this case" should never break the session flow.
// Content reports stay global (not per-user) - they're about the question
// bank itself, not anyone's personal progress.
export async function recordFlag(questionId: string, reason: string): Promise<void> {
  try {
    await ensureSchema();
    const db = getSql();
    await db`INSERT INTO flags (question_id, reason) VALUES (${questionId}, ${reason})`;
  } catch (err) {
    console.error("recordFlag failed", err);
  }
}

export type Flag = {
  id: number;
  questionId: string;
  reason: string;
  createdAt: string; // ISO
};

// Powers /flags - the only way to see reported content is otherwise a
// direct Neon query, which defeats the point of the in-app report button.
export async function getFlags(): Promise<Flag[]> {
  try {
    await ensureSchema();
    const db = getSql();
    const rows = await db`
      SELECT id, question_id, reason, created_at FROM flags ORDER BY created_at DESC
    `;
    return (rows as { id: number; question_id: string; reason: string; created_at: unknown }[]).map(
      (row) => ({
        id: row.id,
        questionId: row.question_id,
        reason: row.reason,
        createdAt: row.created_at instanceof Date ? row.created_at.toISOString() : String(row.created_at),
      })
    );
  } catch (err) {
    console.error("getFlags failed", err);
    return [];
  }
}

// Filters `allIds` down to the ones due for this user's review today -
// either never attempted before, or due_date has arrived. Fails open
// (returns everything) on error, since showing too much is far better than
// showing nothing.
export async function getDueQuestionIds(userId: string, allIds: string[]): Promise<string[]> {
  if (allIds.length === 0) return [];
  try {
    await ensureSchema();
    const db = getSql();
    const rows = await db`
      SELECT question_id, due_date FROM question_progress
      WHERE user_id = ${userId} AND question_id = ANY(${allIds})
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
export async function recordAnswer(
  userId: string,
  questionId: string,
  correct: boolean,
  topic: string
): Promise<void> {
  try {
    await ensureSchema();
    const db = getSql();
    await db`
      INSERT INTO answer_log (user_id, question_id, topic, correct)
      VALUES (${userId}, ${questionId}, ${topic}, ${correct})
    `;
    const rows = await db`
      SELECT interval_days, ease_factor, reps FROM question_progress
      WHERE user_id = ${userId} AND question_id = ${questionId}
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
      INSERT INTO question_progress (user_id, question_id, due_date, interval_days, ease_factor, reps, updated_at)
      VALUES (${userId}, ${questionId}, ${dueDate}, ${intervalDays}, ${easeFactor}, ${reps}, now())
      ON CONFLICT (user_id, question_id) DO UPDATE SET
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

export async function saveSubscription(userId: string, sub: PushSubscriptionRecord): Promise<void> {
  await ensureSchema();
  const db = getSql();
  await db`
    INSERT INTO push_subscriptions (endpoint, user_id, p256dh, auth)
    VALUES (${sub.endpoint}, ${userId}, ${sub.p256dh}, ${sub.auth})
    ON CONFLICT (endpoint) DO UPDATE SET user_id = EXCLUDED.user_id, p256dh = EXCLUDED.p256dh, auth = EXCLUDED.auth
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

export type PushSubscriptionWithUser = PushSubscriptionRecord & { userId: string };

// Used by the daily cron - each subscriber gets their own due-count message
// now that progress is per-user, not one shared count for everyone.
export async function getAllSubscriptions(): Promise<PushSubscriptionWithUser[]> {
  await ensureSchema();
  const db = getSql();
  const rows = await db`SELECT endpoint, user_id, p256dh, auth FROM push_subscriptions`;
  return (rows as { endpoint: string; user_id: string; p256dh: string; auth: string }[]).map((row) => ({
    endpoint: row.endpoint,
    userId: row.user_id,
    p256dh: row.p256dh,
    auth: row.auth,
  }));
}

// Reads the live question bank from Neon (kept in sync from
// src/lib/questions.ts by ensureSchema's seed step). Falls back to the
// code copy on any DB error, same fail-open pattern as the rest of this
// file - a Neon hiccup should never leave the app with no questions.
export async function getAllQuestions(): Promise<Question[]> {
  try {
    await ensureSchema();
    const db = getSql();
    const rows = await db`
      SELECT id, topic, scenario, options, correct_index, explanation
      FROM questions ORDER BY id
    `;
    if (rows.length === 0) return SESSION_QUESTIONS;
    return (
      rows as {
        id: string;
        topic: string;
        scenario: string;
        options: [string, string];
        correct_index: 0 | 1;
        explanation: string;
      }[]
    ).map((row) => ({
      id: row.id,
      topic: row.topic,
      scenario: row.scenario,
      options: row.options,
      correctIndex: row.correct_index,
      explanation: row.explanation,
    }));
  } catch (err) {
    console.error("getAllQuestions failed", err);
    return SESSION_QUESTIONS;
  }
}

export type Profile = {
  displayName: string | null;
  avatarScheme: string;
};

const DEFAULT_PROFILE: Profile = { displayName: null, avatarScheme: "coral" };

// A null displayName means onboarding hasn't happened yet - the home page
// uses that to gate the dashboard behind the name/avatar picker.
export async function getProfile(userId: string): Promise<Profile> {
  try {
    await ensureSchema();
    const db = getSql();
    const rows = await db`SELECT display_name, avatar_scheme FROM profile WHERE user_id = ${userId}`;
    if (rows.length === 0) return DEFAULT_PROFILE;
    const row = rows[0] as { display_name: string | null; avatar_scheme: string };
    return { displayName: row.display_name, avatarScheme: row.avatar_scheme };
  } catch (err) {
    console.error("getProfile failed", err);
    return DEFAULT_PROFILE;
  }
}

export async function saveProfile(userId: string, displayName: string, avatarScheme: string): Promise<void> {
  await ensureSchema();
  const db = getSql();
  await db`
    INSERT INTO profile (user_id, display_name, avatar_scheme, updated_at)
    VALUES (${userId}, ${displayName}, ${avatarScheme}, now())
    ON CONFLICT (user_id) DO UPDATE SET
      display_name = EXCLUDED.display_name,
      avatar_scheme = EXCLUDED.avatar_scheme,
      updated_at = now()
  `;
}

// Wipes this user's streak, totals, spaced-repetition state, and answer
// history back to a clean slate. Deliberately leaves flags (content
// reports) and push subscriptions alone - those aren't "progress", and
// flags are global, not per-user.
export async function resetProgress(userId: string): Promise<void> {
  await ensureSchema();
  const db = getSql();
  await db`DELETE FROM answer_log WHERE user_id = ${userId}`;
  await db`DELETE FROM question_progress WHERE user_id = ${userId}`;
  await db`DELETE FROM progress WHERE user_id = ${userId}`;
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
export async function getTopicStats(userId: string): Promise<TopicStat[]> {
  try {
    await ensureSchema();
    const db = getSql();
    const rows = await db`
      SELECT topic, COUNT(*) as attempts, COUNT(*) FILTER (WHERE correct) as correct
      FROM answer_log
      WHERE user_id = ${userId}
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

export type WeeklyStats = {
  activeDays: string[]; // YYYY-MM-DD dates with at least one answer, within the last 7 days
  casesThisWeek: number;
  accuracyThisWeek: number; // 0-100
};

const EMPTY_WEEKLY_STATS: WeeklyStats = { activeDays: [], casesThisWeek: 0, accuracyThisWeek: 100 };

// Powers the home screen's weekly recap - ties directly to the PRD's stated
// success metric (7-day streak retention), not just vanity accuracy stats.
export async function getWeeklyStats(userId: string): Promise<WeeklyStats> {
  try {
    await ensureSchema();
    const db = getSql();
    const rows = await db`
      SELECT created_at, correct FROM answer_log
      WHERE user_id = ${userId} AND created_at >= now() - interval '7 days'
    `;
    const activeDays = new Set<string>();
    let correct = 0;
    for (const row of rows as { created_at: unknown; correct: boolean }[]) {
      const day = normalizeDateKey(row.created_at);
      if (day) activeDays.add(day);
      if (row.correct) correct += 1;
    }
    return {
      activeDays: [...activeDays],
      casesThisWeek: rows.length,
      accuracyThisWeek: rows.length === 0 ? 100 : Math.round((correct / rows.length) * 100),
    };
  } catch (err) {
    console.error("getWeeklyStats failed", err);
    return EMPTY_WEEKLY_STATS;
  }
}
