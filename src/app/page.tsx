import Link from "next/link";
import { Chip } from "@/components/Chip";
import { HeroIdentity } from "@/components/HeroIdentity";
import { NotificationPrompt } from "@/components/NotificationPrompt";
import { getAllQuestions, getProfile, getProgress } from "@/lib/db";

// Reads live data from Neon on every request - must not be statically
// prerendered, or the streak shown would freeze at build time.
export const dynamic = "force-dynamic";

const SESSION_LENGTHS = [5, 10, 15] as const;

export default async function Home() {
  const [profile, { streak }, questions] = await Promise.all([
    getProfile(),
    getProgress(),
    getAllQuestions(),
  ]);
  const topics = [...new Set(questions.map((q) => q.topic))];

  if (!profile.displayName) {
    return (
      <div className="flex flex-1 justify-center px-4 py-6">
        <main className="flex w-full max-w-md flex-1 flex-col items-center justify-center text-center">
          <h1 className="text-lg font-extrabold">Welcome to ContractLingo</h1>
          <p className="mt-1 text-sm text-ink-soft">Set up your hero before your first case</p>
          <div className="mt-4 w-full">
            <HeroIdentity initialName={null} initialScheme={profile.avatarScheme} />
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex flex-1 justify-center px-4 py-6">
      <main className="flex w-full max-w-md flex-col">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 rounded-full bg-card px-2.5 py-1.5 shadow-[0_2px_0_var(--frame-border)]">
            <svg
              className="h-4 w-4 animate-flicker"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M12 2c1 3-3 4-3 7.5A3.5 3.5 0 0012 13a3.5 3.5 0 003-5.3c1.5 1 2.5 3 2.5 5a5.5 5.5 0 11-11 0C6.5 8 9 5.5 12 2z"
                fill="var(--coral)"
              />
            </svg>
            <span className="font-display text-sm font-bold">{streak}</span>
          </div>
          <Link
            href="/progress"
            className="flex h-8 w-8 items-center justify-center rounded-full bg-card text-ink-soft shadow-[0_2px_0_var(--frame-border)]"
            aria-label="View progress"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
              <path d="M3 3v18h18" />
              <path d="M7 15l4-5 3 3 5-7" />
            </svg>
          </Link>
        </div>

        <HeroIdentity initialName={profile.displayName} initialScheme={profile.avatarScheme} />

        <h1 className="mt-4 text-lg font-extrabold">How much time do you have?</h1>
        <p className="mt-0.5 text-sm text-ink-soft">Pick a length and we&apos;ll size the batch to fit</p>

        <div className="mt-4 grid grid-cols-3 gap-2">
          {SESSION_LENGTHS.map((minutes) => (
            <Link
              key={minutes}
              href={`/session?minutes=${minutes}`}
              className="flex flex-col items-center justify-center gap-0.5 rounded-2xl bg-card py-3 shadow-[0_3px_0_var(--frame-border)] transition-transform active:translate-y-[2px] active:shadow-[0_1px_0_var(--frame-border)]"
            >
              <span className="font-display text-xl font-extrabold">{minutes}</span>
              <span className="font-display text-[0.6rem] font-semibold tracking-wide text-ink-soft">
                MIN
              </span>
            </Link>
          ))}
        </div>

        <p className="mt-6 text-sm font-extrabold">Or pick a topic</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {topics.map((topic) => (
            <Link key={topic} href={`/session?topic=${encodeURIComponent(topic)}`}>
              <Chip>{topic}</Chip>
            </Link>
          ))}
        </div>

        <NotificationPrompt />

        <div className="mt-8 flex justify-around border-t border-frame-border pt-3">
          <span className="h-2 w-2 rounded-full bg-coral" aria-hidden="true" />
          <span className="h-2 w-2 rounded-full bg-grey" aria-hidden="true" />
        </div>
      </main>
    </div>
  );
}
