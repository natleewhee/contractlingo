import Link from "next/link";
import { SESSION_QUESTIONS, type Question } from "@/lib/questions";

const TOPICS = [...new Set(SESSION_QUESTIONS.map((q) => q.topic))];

function questionsFor(topic: string): Question[] {
  return SESSION_QUESTIONS.filter((q) => q.topic === topic);
}

export default function LibraryPage() {
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
          <h1 className="text-lg font-extrabold">All questions</h1>
        </div>
        <p className="mt-1 text-xs text-ink-soft">
          {SESSION_QUESTIONS.length} cases across {TOPICS.length} topics
        </p>

        <div className="mt-5 flex flex-col gap-6">
          {TOPICS.map((topic) => (
            <section key={topic}>
              <h2 className="font-display text-sm font-bold text-coral">{topic}</h2>
              <div className="mt-2 flex flex-col gap-2">
                {questionsFor(topic).map((q) => (
                  <div
                    key={q.id}
                    className="rounded-2xl bg-card px-4 py-3 shadow-[0_2px_0_var(--frame-border)]"
                  >
                    <p className="font-display text-[0.6rem] font-semibold tracking-wide text-ink-soft/70">
                      {q.id}
                    </p>
                    <p className="mt-1 text-sm font-bold">{q.scenario}</p>
                    <ul className="mt-2 flex flex-col gap-1">
                      {q.options.map((opt, i) => (
                        <li
                          key={opt}
                          className={`flex items-start gap-1.5 text-xs ${
                            i === q.correctIndex ? "font-semibold text-mint" : "text-ink-soft"
                          }`}
                        >
                          <span className="mt-0.5 shrink-0">{i === q.correctIndex ? "✓" : "–"}</span>
                          <span>{opt}</span>
                        </li>
                      ))}
                    </ul>
                    <p className="mt-2 text-xs leading-relaxed text-ink-soft">{q.explanation}</p>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </main>
    </div>
  );
}
