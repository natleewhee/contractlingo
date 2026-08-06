import Link from "next/link";
import { Button3D } from "@/components/Button3D";
import { ResetProgressButton } from "@/components/ResetProgressButton";
import { getProgress, getTopicStats } from "@/lib/db";
import { SESSION_QUESTIONS } from "@/lib/questions";

// Reads live data from Neon on every request - must not be statically
// prerendered, same reasoning as the home page.
export const dynamic = "force-dynamic";

const ALL_TOPICS = [...new Set(SESSION_QUESTIONS.map((q) => q.topic))];
const WEAK_THRESHOLD = 70;
const MIN_ATTEMPTS_TO_JUDGE = 3;

export default async function ProgressPage() {
  const [{ streak, totalCleared }, topicStats] = await Promise.all([
    getProgress(),
    getTopicStats(),
  ]);

  const statsByTopic = new Map(topicStats.map((s) => [s.topic, s]));
  const rows = ALL_TOPICS.map((topic) => statsByTopic.get(topic) ?? { topic, attempts: 0, correct: 0, accuracy: 100 })
    .sort((a, b) => a.accuracy - b.accuracy || b.attempts - a.attempts);

  const weakTopics = rows.filter(
    (r) => r.attempts >= MIN_ATTEMPTS_TO_JUDGE && r.accuracy < WEAK_THRESHOLD
  );

  return (
    <div className="flex flex-1 justify-center px-4 py-6">
      <main className="flex w-full max-w-md flex-col">
        <div className="flex items-center gap-2">
          <Link
            href="/"
            className="flex h-8 w-8 items-center justify-center rounded-full bg-card text-ink-soft shadow-[0_2px_0_var(--frame-border)]"
            aria-label="Back to home"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </Link>
          <h1 className="text-lg font-extrabold">Your progress</h1>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2">
          <div className="rounded-2xl bg-card px-4 py-3 shadow-[0_2px_0_var(--frame-border)]">
            <span className="font-display text-2xl font-bold">{streak}</span>
            <p className="text-xs text-ink-soft">day streak</p>
          </div>
          <div className="rounded-2xl bg-card px-4 py-3 shadow-[0_2px_0_var(--frame-border)]">
            <span className="font-display text-2xl font-bold">{totalCleared}</span>
            <p className="text-xs text-ink-soft">cases faced</p>
          </div>
        </div>

        <h2 className="mt-6 text-sm font-extrabold">Needs practice</h2>
        {weakTopics.length === 0 ? (
          <p className="mt-1.5 text-xs text-ink-soft">
            {totalCleared === 0
              ? "Face a few cases and weak spots will show up here."
              : "No weak spots yet — keep it up."}
          </p>
        ) : (
          <div className="mt-2 flex flex-col gap-2">
            {weakTopics.map((r) => (
              <div
                key={r.topic}
                className="flex items-center justify-between rounded-2xl bg-card px-4 py-3 shadow-[0_2px_0_var(--frame-border)]"
              >
                <div>
                  <p className="font-display text-sm font-bold">{r.topic}</p>
                  <p className="text-xs text-coral">
                    {r.accuracy}% correct · {r.correct}/{r.attempts}
                  </p>
                </div>
                <Link href={`/session?topic=${encodeURIComponent(r.topic)}`}>
                  <span className="rounded-full bg-coral px-3 py-1.5 font-display text-[0.65rem] font-bold text-white">
                    Practice
                  </span>
                </Link>
              </div>
            ))}
          </div>
        )}

        <h2 className="mt-6 text-sm font-extrabold">All topics</h2>
        <div className="mt-2 flex flex-col gap-1.5">
          {rows.map((r) => (
            <div
              key={r.topic}
              className="flex items-center justify-between rounded-xl bg-card px-3 py-2 text-xs shadow-[0_1px_0_var(--frame-border)]"
            >
              <span className="font-display font-semibold">{r.topic}</span>
              <span className="text-ink-soft">
                {r.attempts === 0 ? "Not started" : `${r.accuracy}% · ${r.correct}/${r.attempts}`}
              </span>
            </div>
          ))}
        </div>

        <Button3D tone="gold" href="/session" className="mt-6">
          FACE MORE CASES
        </Button3D>

        <Link
          href="/library"
          className="mt-4 self-center font-display text-[0.68rem] font-semibold text-ink-soft"
        >
          Browse all questions
        </Link>

        <ResetProgressButton />
      </main>
    </div>
  );
}
