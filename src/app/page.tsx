import Link from "next/link";
import { HeroIdentity } from "@/components/HeroIdentity";
import { NotificationPrompt } from "@/components/NotificationPrompt";
import { getProfile, getProgress } from "@/lib/db";
import { getUserId } from "@/lib/identity";

// Reads live data from Neon on every request - must not be statically
// prerendered, or the streak shown would freeze at build time.
export const dynamic = "force-dynamic";

const SESSION_LENGTHS = [5, 10, 15] as const;

export default async function Home() {
  const userId = await getUserId();
  const [profile, { streak }] = await Promise.all([getProfile(userId), getProgress(userId)]);

  // A DB hiccup and "never onboarded" both leave displayName null - without
  // this check the two were indistinguishable, so an established user hit
  // by a transient Neon error would see "set up your badge" and a save that
  // silently does nothing, indistinguishable from having lost their account.
  if (profile.status === "unavailable") {
    return (
      <div className="flex flex-1 justify-center px-4 py-6">
        <main className="flex w-full max-w-md flex-1 flex-col items-center justify-center gap-1 text-center">
          <h1 className="text-lg font-extrabold">Can&apos;t reach the server</h1>
          <p className="text-sm text-ink-soft">Your progress is safe - try reloading in a moment.</p>
        </main>
      </div>
    );
  }

  if (!profile.displayName) {
    return (
      <div className="flex flex-1 justify-center px-4 py-6">
        <main className="flex w-full max-w-md flex-1 flex-col items-center justify-center text-center">
          <h1 className="text-lg font-extrabold">Welcome to ContractLingo</h1>
          <p className="mt-2 font-body text-sm leading-relaxed text-ink-soft">
            Five minutes a day of real PSSCOC judgment calls - no login, no course. Your progress
            lives in this browser as an id you can copy to another device later.
          </p>
          <p className="mt-2 font-body text-xs leading-relaxed text-ink-soft">
            Built for practicing judgment, not as legal advice - content isn&apos;t verified
            against current PSSCOC clause text, so check the actual contract before relying on
            anything here.
          </p>
          <div className="mt-5 w-full">
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
          <div className="flex items-center gap-1.5 rounded-full border border-frame-border bg-card px-2.5 py-1.5">
            <svg
              className="h-4 w-4 animate-flicker"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M12 2c1 3-3 4-3 7.5A3.5 3.5 0 0012 13a3.5 3.5 0 003-5.3c1.5 1 2.5 3 2.5 5a5.5 5.5 0 11-11 0C6.5 8 9 5.5 12 2z"
                fill="var(--gold)"
              />
            </svg>
            <span className="font-display text-sm font-bold">{streak}</span>
          </div>
          <Link
            href="/progress"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-frame-border bg-card text-ink-soft"
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
              className="flex min-h-11 flex-col items-center justify-center gap-0.5 rounded-2xl border border-frame-border bg-card py-3 transition-transform active:translate-y-[2px]"
            >
              <span className="font-display text-xl font-extrabold">{minutes}</span>
              <span className="font-stamp text-[0.6rem] font-semibold tracking-wide text-ink-soft">
                MIN
              </span>
            </Link>
          ))}
        </div>

        <NotificationPrompt />

        <p className="mt-6 text-center font-body text-[0.7rem] leading-relaxed text-ink-soft">
          For practicing judgment, not legal advice - not verified against current PSSCOC clause
          text.
        </p>
      </main>
    </div>
  );
}
