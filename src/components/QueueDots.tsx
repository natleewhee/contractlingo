// Tally squares (see DESIGN.md) - filled = answered, gold outline = the
// current question, plain outline = not yet reached.
export function QueueDots({ total, currentIndex }: { total: number; currentIndex: number }) {
  return (
    <div className="flex gap-1.5" role="presentation">
      {Array.from({ length: total }).map((_, i) => {
        const done = i < currentIndex;
        const active = i === currentIndex;
        return (
          <div
            key={i}
            className={`h-3.5 w-3.5 shrink-0 rounded-[3px] border-2 ${
              done ? "border-ink bg-ink" : active ? "border-gold bg-transparent" : "border-frame-border bg-transparent"
            }`}
            aria-hidden="true"
          />
        );
      })}
    </div>
  );
}
