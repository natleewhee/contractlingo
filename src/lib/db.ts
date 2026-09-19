import { neon, type NeonQueryFunction } from "@neondatabase/serverless";
import { SESSION_QUESTIONS, type Question } from "@/lib/questions";
import { daysAgoKey, todayKey } from "@/lib/date";
import { DEFAULT_AVATAR_SCHEME } from "@/lib/avatarSchemes";

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

// Arbitrary constant - just needs to be unique within this database, since
// nothing else here takes advisory locks. Scoped to the transaction below
// (pg_advisory_xact_lock), not a session-level lock: it releases itself on
// commit/rollback, which matters because Neon's HTTP driver doesn't give
// separate `await db\`...\`` calls a shared session to unlock from later.
const SCHEMA_MIGRATION_LOCK_KEY = 84172;

// Idempotent - safe to call on every request. Cached per server instance so
// it only actually hits the database once per cold start. All the DDL runs
// as ONE transaction guarded by an advisory lock: reproduced against a
// fresh local Postgres, 12 concurrent cold starts against untouched tables
// used to fail 11/12 with a duplicate-key error on table creation
// (CREATE TABLE IF NOT EXISTS isn't safe against real concurrent races) -
// the lock serializes them instead of letting them race.
function ensureSchema(): Promise<void> {
  if (!schemaReady) {
    const db = getSql();
    schemaReady = db
      .transaction([
        db`SELECT pg_advisory_xact_lock(${SCHEMA_MIGRATION_LOCK_KEY})`,

        // Final shape for a fresh install - already user_id-keyed.
        db`
          CREATE TABLE IF NOT EXISTS progress (
            user_id text PRIMARY KEY,
            streak integer NOT NULL DEFAULT 0,
            total_cleared integer NOT NULL DEFAULT 0,
            last_completed_date date,
            updated_at timestamptz NOT NULL DEFAULT now()
          )
        `,
        db`
          CREATE TABLE IF NOT EXISTS flags (
            id bigserial PRIMARY KEY,
            question_id text NOT NULL,
            reason text NOT NULL,
            created_at timestamptz NOT NULL DEFAULT now()
          )
        `,
        db`
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
        `,
        db`
          CREATE TABLE IF NOT EXISTS push_subscriptions (
            endpoint text PRIMARY KEY,
            user_id text NOT NULL DEFAULT 'default',
            p256dh text NOT NULL,
            auth text NOT NULL,
            created_at timestamptz NOT NULL DEFAULT now()
          )
        `,
        db`
          CREATE TABLE IF NOT EXISTS answer_log (
            id bigserial PRIMARY KEY,
            user_id text NOT NULL DEFAULT 'default',
            question_id text NOT NULL,
            topic text NOT NULL,
            correct boolean NOT NULL,
            created_at timestamptz NOT NULL DEFAULT now()
          )
        `,
        db`
          CREATE TABLE IF NOT EXISTS profile (
            user_id text PRIMARY KEY,
            display_name text,
            -- Keep this literal in sync with DEFAULT_AVATAR_SCHEME in
            -- src/lib/avatarSchemes.ts - can't reference a JS constant from
            -- inside DDL text.
            avatar_scheme text NOT NULL DEFAULT 'marker-yellow',
            updated_at timestamptz NOT NULL DEFAULT now()
          )
        `,

        // Single source of truth for "does this user id exist" - changeUserId
        // claims a new id by inserting into this table inside a transaction,
        // so two concurrent claims of the same id can't both succeed (the
        // second INSERT hits the primary key and the whole transaction rolls
        // back). See changeUserId()/isUserIdAvailable() below.
        db`
          CREATE TABLE IF NOT EXISTS users (
            user_id text PRIMARY KEY,
            created_at timestamptz NOT NULL DEFAULT now()
          )
        `,

        // Answer_log/flags are queried by (user_id, created_at) and
        // (created_at) respectively (getTopicStats/getWeeklyStats/getFlags
        // below) - without these, both are full sequential scans that get
        // more expensive as the tables grow. Cheap to keep in the same
        // migration transaction as everything else.
        db`CREATE INDEX IF NOT EXISTS answer_log_user_created_idx ON answer_log (user_id, created_at DESC)`,
        db`CREATE INDEX IF NOT EXISTS flags_created_idx ON flags (created_at DESC)`,

        // One-time migrations from the original single-user shape (id text
        // PRIMARY KEY DEFAULT 'default', no user_id column at all). Each is
        // guarded so it only runs once - on a fresh install the CREATE TABLE
        // statements above already produce the final shape, so these no-op.
        // Verified against a local Postgres copy of the live schema,
        // including that re-running is a safe no-op.
        db`
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
        `,
        db`
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
        `,
        db`
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
        `,
        db`ALTER TABLE answer_log ADD COLUMN IF NOT EXISTS user_id text NOT NULL DEFAULT 'default'`,
        db`ALTER TABLE push_subscriptions ADD COLUMN IF NOT EXISTS user_id text NOT NULL DEFAULT 'default'`,

        // One-time backfill: register every user id that already has data in
        // any per-user table (from before the `users` table existed) so
        // isUserIdAvailable/changeUserId's claim check sees them as taken.
        // Safe to re-run - ON CONFLICT DO NOTHING.
        db`
          INSERT INTO users (user_id)
          SELECT user_id FROM progress
          UNION SELECT user_id FROM profile
          UNION SELECT user_id FROM question_progress
          UNION SELECT user_id FROM answer_log
          UNION SELECT user_id FROM push_subscriptions
          ON CONFLICT DO NOTHING
        `,

        // 'coral' was the accidental default before the Site Diary redesign
        // renamed every avatar scheme id (see avatarSchemes.ts) - it no
        // longer matches any valid scheme, so getAvatarScheme() was
        // silently falling back for every row stuck on it. Re-point them
        // at the real default. Safe to re-run - no-ops once no rows match.
        db`UPDATE profile SET avatar_scheme = 'marker-yellow' WHERE avatar_scheme = 'coral'`,

        // Belt-and-suspenders data integrity - these values are already
        // never set to something invalid by the application code, but a
        // CHECK constraint catches a future bug at the database instead of
        // silently storing (say) a negative streak. ADD CONSTRAINT has no
        // IF NOT EXISTS, so guard each with a pg_constraint lookup to stay
        // idempotent across every cold start.
        db`
          DO $$
          BEGIN
            IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'progress_streak_nonneg') THEN
              ALTER TABLE progress ADD CONSTRAINT progress_streak_nonneg CHECK (streak >= 0);
            END IF;
            IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'progress_total_cleared_nonneg') THEN
              ALTER TABLE progress ADD CONSTRAINT progress_total_cleared_nonneg CHECK (total_cleared >= 0);
            END IF;
            IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'question_progress_interval_positive') THEN
              ALTER TABLE question_progress ADD CONSTRAINT question_progress_interval_positive CHECK (interval_days > 0);
            END IF;
            IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'question_progress_ease_positive') THEN
              ALTER TABLE question_progress ADD CONSTRAINT question_progress_ease_positive CHECK (ease_factor > 0);
            END IF;
            IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'question_progress_reps_nonneg') THEN
              ALTER TABLE question_progress ADD CONSTRAINT question_progress_reps_nonneg CHECK (reps >= 0);
            END IF;
          END $$
        `,
      ])
      .then(() => undefined)
      .catch((err) => {
        // Don't cache a rejected promise forever - a transient blip (e.g.
        // Neon waking from scale-to-zero) would otherwise permanently brick
        // this warm instance, since every future call just re-throws the
        // same cached rejection instead of retrying.
        schemaReady = null;
        throw err;
      });
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

// The question bank lives only in code now (src/lib/questions.ts) - it's
// never synced into Neon, so this is just a sanity check that the code
// bundle loaded, not a database call. Kept as a function (not a plain
// export) so /api/debug's shape didn't need to change.
export async function getQuestionBankCount(): Promise<number> {
  return SESSION_QUESTIONS.length;
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
  } else if (current.lastCompletedDate === daysAgoKey(1)) {
    streak += 1;
  } else if (current.lastCompletedDate === daysAgoKey(2)) {
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

const MAX_FLAGS_RETURNED = 200;

// Powers /flags - the only way to see reported content is otherwise a
// direct Neon query, which defeats the point of the in-app report button.
export async function getFlags(): Promise<Flag[]> {
  try {
    await ensureSchema();
    const db = getSql();
    const rows = await db`
      SELECT id, question_id, reason, created_at FROM flags
      ORDER BY created_at DESC
      LIMIT ${MAX_FLAGS_RETURNED}
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

export type SubscriptionDue = PushSubscriptionRecord & { userId: string; dueCount: number };

// Used by the daily cron. One grouped query for every subscriber's due
// count, instead of a separate getDueQuestionIds round trip per subscriber
// (each of which sent the full ~240-id question bank as a query parameter
// - N concurrent queries, no batching). due = the full bank size minus
// however many of this user's question_progress rows aren't due yet -
// matches the definition getDueQuestionIds used: a question with no
// question_progress row at all (never attempted) counts as due.
export async function getSubscriptionsWithDueCounts(totalQuestions: number): Promise<SubscriptionDue[]> {
  await ensureSchema();
  const db = getSql();
  const today = todayKey();
  const rows = await db`
    SELECT ps.endpoint, ps.user_id, ps.p256dh, ps.auth,
      GREATEST(${totalQuestions}::int - COALESCE(fd.future_count, 0), 0) AS due_count
    FROM push_subscriptions ps
    LEFT JOIN (
      SELECT user_id, count(*)::int AS future_count
      FROM question_progress
      WHERE due_date > ${today}::date
      GROUP BY user_id
    ) fd ON fd.user_id = ps.user_id
  `;
  return (
    rows as { endpoint: string; user_id: string; p256dh: string; auth: string; due_count: number }[]
  ).map((row) => ({
    endpoint: row.endpoint,
    userId: row.user_id,
    p256dh: row.p256dh,
    auth: row.auth,
    dueCount: Number(row.due_count),
  }));
}

// The question bank is authored in code (src/lib/questions.ts) and served
// straight from there - it used to be mirrored into a Neon `questions`
// table on every cold start (13 round trips, ~180KB re-uploaded, every
// time) purely so this function could read it back over the network. The
// code array already is the reviewable, canonical copy; reading it
// directly removes that whole round trip, the reseed cost, and a source of
// drift (a retired question used to linger in the table forever since
// nothing ever deleted rows). See docs/solutions/.
export async function getAllQuestions(): Promise<Question[]> {
  return SESSION_QUESTIONS;
}

// Used by recordAnswer/recordFlag to derive correctness and topic from the
// canonical bank server-side, rather than trusting whatever a Server
// Action's caller claims.
export async function getQuestionById(id: string): Promise<Question | null> {
  return SESSION_QUESTIONS.find((q) => q.id === id) ?? null;
}

export type Profile = {
  displayName: string | null;
  avatarScheme: string;
  // "ok": the query ran - a null displayName genuinely means onboarding
  // hasn't happened yet. "unavailable": the query itself failed (a DB
  // hiccup), so displayName being null here does NOT mean "never
  // onboarded" - callers must not show the onboarding flow for this case,
  // or an established user sees "welcome, set up your hero" every time
  // Neon has a blip and quietly loses the ability to tell the difference.
  status: "ok" | "unavailable";
};

const DEFAULT_PROFILE: Profile = { displayName: null, avatarScheme: DEFAULT_AVATAR_SCHEME, status: "ok" };
const UNAVAILABLE_PROFILE: Profile = { displayName: null, avatarScheme: DEFAULT_AVATAR_SCHEME, status: "unavailable" };

export async function getProfile(userId: string): Promise<Profile> {
  try {
    await ensureSchema();
    const db = getSql();
    const rows = await db`SELECT display_name, avatar_scheme FROM profile WHERE user_id = ${userId}`;
    if (rows.length === 0) return DEFAULT_PROFILE;
    const row = rows[0] as { display_name: string | null; avatar_scheme: string };
    return { displayName: row.display_name, avatarScheme: row.avatar_scheme, status: "ok" };
  } catch (err) {
    console.error("getProfile failed", err);
    return UNAVAILABLE_PROFILE;
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

export type AdminStats = {
  totalUsers: number;
  active1d: number;
  active7d: number;
  active30d: number;
  totalFlags: number;
  hardestQuestions: { questionId: string; attempts: number; accuracy: number }[];
};

const MIN_ATTEMPTS_FOR_DIFFICULTY = 5;

// Cheap operator-only visibility into who's using this and which content is
// misfiring - otherwise there's no way to answer "did anyone come back on
// day 2" (the PRD's own primary success metric) short of a manual Neon
// query. Gated behind ADMIN_SECRET at the route level (see
// /api/admin/stats), never exposed to regular users.
export async function getAdminStats(): Promise<AdminStats> {
  await ensureSchema();
  const db = getSql();
  // Bound as app-timezone date strings rather than Postgres's own
  // CURRENT_DATE (server/session timezone, not necessarily Asia/Singapore)
  // - last_completed_date is itself written from the same app-timezone
  // clock (see src/lib/date.ts), so the comparison has to use it too.
  const today = todayKey();
  const sevenDaysAgo = daysAgoKey(6);
  const thirtyDaysAgo = daysAgoKey(29);

  const [userRows, activityRows, flagRows, hardestRows] = await Promise.all([
    db`
      SELECT count(*)::int AS total FROM (
        SELECT user_id FROM profile
        UNION SELECT user_id FROM progress
        UNION SELECT user_id FROM question_progress
        UNION SELECT user_id FROM answer_log
        UNION SELECT user_id FROM push_subscriptions
      ) u
    `,
    db`
      SELECT
        count(*) FILTER (WHERE last_completed_date >= ${today}::date) AS active_1d,
        count(*) FILTER (WHERE last_completed_date >= ${sevenDaysAgo}::date) AS active_7d,
        count(*) FILTER (WHERE last_completed_date >= ${thirtyDaysAgo}::date) AS active_30d
      FROM progress
    `,
    db`SELECT count(*)::int AS total FROM flags`,
    db`
      SELECT question_id, count(*)::int AS attempts, avg(correct::int) AS accuracy
      FROM answer_log
      GROUP BY question_id
      HAVING count(*) >= ${MIN_ATTEMPTS_FOR_DIFFICULTY}
      ORDER BY accuracy ASC
      LIMIT 10
    `,
  ]);

  const activity = activityRows[0] as
    | { active_1d: string | number; active_7d: string | number; active_30d: string | number }
    | undefined;

  return {
    totalUsers: Number((userRows[0] as { total: number } | undefined)?.total ?? 0),
    active1d: Number(activity?.active_1d ?? 0),
    active7d: Number(activity?.active_7d ?? 0),
    active30d: Number(activity?.active_30d ?? 0),
    totalFlags: Number((flagRows[0] as { total: number } | undefined)?.total ?? 0),
    hardestQuestions: (hardestRows as { question_id: string; attempts: number; accuracy: number }[]).map((r) => ({
      questionId: r.question_id,
      attempts: Number(r.attempts),
      accuracy: Math.round(Number(r.accuracy) * 100),
    })),
  };
}

// Checked against the `users` registry (see ensureSchema's backfill) plus
// every per-user table directly, not just `users` alone - a raw anonymous
// id can hold real data without ever having gone through an explicit claim.
export async function isUserIdAvailable(userId: string): Promise<boolean> {
  await ensureSchema();
  const db = getSql();
  const rows = await db`
    SELECT 1 FROM users WHERE user_id = ${userId}
    UNION ALL SELECT 1 FROM profile WHERE user_id = ${userId}
    UNION ALL SELECT 1 FROM progress WHERE user_id = ${userId}
    UNION ALL SELECT 1 FROM question_progress WHERE user_id = ${userId}
    UNION ALL SELECT 1 FROM answer_log WHERE user_id = ${userId}
    UNION ALL SELECT 1 FROM push_subscriptions WHERE user_id = ${userId}
    LIMIT 1
  `;
  return rows.length === 0;
}

function isUniqueViolation(err: unknown): boolean {
  return typeof err === "object" && err !== null && "code" in err && (err as { code: unknown }).code === "23505";
}

// Atomically claims newId and migrates every row this user owns from oldId
// to newId, across all per-user tables, in a single Postgres transaction.
// The claim is the INSERT into `users` - its primary key is what makes this
// safe against two concurrent renames to the same newId (an
// isUserIdAvailable() check beforehand narrows the common case but can't
// close that race on its own, since the check and this call are separate
// round trips). Returns "taken" instead of throwing if newId was claimed by
// someone else in between - callers should treat that as a normal, expected
// outcome, not an error.
export async function changeUserId(oldId: string, newId: string): Promise<"claimed" | "taken"> {
  await ensureSchema();
  const db = getSql();
  try {
    await db.transaction([
      db`INSERT INTO users (user_id) VALUES (${newId})`,
      db`DELETE FROM users WHERE user_id = ${oldId}`,
      db`UPDATE progress SET user_id = ${newId} WHERE user_id = ${oldId}`,
      db`UPDATE profile SET user_id = ${newId} WHERE user_id = ${oldId}`,
      db`UPDATE question_progress SET user_id = ${newId} WHERE user_id = ${oldId}`,
      db`UPDATE answer_log SET user_id = ${newId} WHERE user_id = ${oldId}`,
      db`UPDATE push_subscriptions SET user_id = ${newId} WHERE user_id = ${oldId}`,
    ]);
  } catch (err) {
    if (isUniqueViolation(err)) return "taken";
    throw err;
  }
  return "claimed";
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
// Aggregated in SQL rather than pulling every row into Node - the count and
// accuracy were already pushed down, but the previous version still fetched
// every row just to bucket it into calendar days in JS. Bucketing now
// happens in Postgres too, converted into the app's timezone (Asia/
// Singapore) rather than the UTC calendar day `created_at`'s own date would
// give - see src/lib/date.ts and docs/solutions/ for the bug that fixed.
export async function getWeeklyStats(userId: string): Promise<WeeklyStats> {
  try {
    await ensureSchema();
    const db = getSql();
    const rows = await db`
      SELECT
        count(*)::int AS total,
        count(*) FILTER (WHERE correct)::int AS correct,
        jsonb_agg(DISTINCT to_char(created_at AT TIME ZONE 'Asia/Singapore', 'YYYY-MM-DD')) AS active_days
      FROM answer_log
      WHERE user_id = ${userId} AND created_at >= now() - interval '7 days'
    `;
    const row = rows[0] as { total: number; correct: number; active_days: string[] | null } | undefined;
    const total = row?.total ?? 0;
    const correct = row?.correct ?? 0;
    return {
      activeDays: row?.active_days ?? [],
      casesThisWeek: total,
      accuracyThisWeek: total === 0 ? 100 : Math.round((correct / total) * 100),
    };
  } catch (err) {
    console.error("getWeeklyStats failed", err);
    return EMPTY_WEEKLY_STATS;
  }
}
