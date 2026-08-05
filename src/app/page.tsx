import { Button3D } from "@/components/Button3D";
import { Chip } from "@/components/Chip";
import { HeroAvatar } from "@/components/HeroAvatar";

const TOPICS = ["Variations", "Payment", "LD", "EOT", "Notices", "Delay"];

export default function Home() {
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
            <span className="font-display text-sm font-bold">14</span>
          </div>
          <span
            className="flex h-8 w-8 items-center justify-center rounded-full bg-card text-ink-soft shadow-[0_2px_0_var(--frame-border)]"
            aria-hidden="true"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <circle cx="12" cy="12" r="3" />
              <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 11-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 11-2.83-2.83l.06-.06A1.65 1.65 0 004.6 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 112.83-2.83l.06.06A1.65 1.65 0 009 4.6a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09A1.65 1.65 0 0015 4.6a1.65 1.65 0 001.82-.33l.06-.06a2 2 0 112.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />
            </svg>
          </span>
        </div>

        <div className="mt-3 flex items-center gap-3">
          <HeroAvatar size={58} />
          <div className="flex flex-col">
            <span className="font-display text-sm font-bold">Knight-Defender</span>
            <span className="font-display text-[0.65rem] font-medium text-ink-soft">
              This is you
            </span>
          </div>
        </div>

        <h1 className="mt-4 text-lg font-extrabold">12 cases due today</h1>
        <p className="mt-0.5 text-sm text-ink-soft">
          Pick a fight, or take the whole batch
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {TOPICS.map((topic) => (
            <Chip key={topic}>{topic}</Chip>
          ))}
        </div>

        <Button3D tone="gold" className="mt-6">
          FACE THEM ALL
        </Button3D>

        <div className="mt-8 flex justify-around border-t border-frame-border pt-3">
          <span className="h-2 w-2 rounded-full bg-coral" aria-hidden="true" />
          <span className="h-2 w-2 rounded-full bg-grey" aria-hidden="true" />
        </div>
      </main>
    </div>
  );
}
