export function QueueDots({ total, currentIndex }: { total: number; currentIndex: number }) {
  return (
    <div className="flex gap-1.5">
      {Array.from({ length: total }).map((_, i) => {
        const done = i < currentIndex;
        const active = i === currentIndex;
        return (
          <div
            key={i}
            className={`relative h-5 w-5 shrink-0 rounded-full ${
              done
                ? "bg-grey shadow-[0_2px_0_var(--grey-dark)]"
                : "bg-minion shadow-[0_2px_0_var(--minion-dark)]"
            } ${active ? "outline outline-2 outline-offset-2 outline-[var(--gold)]" : ""}`}
          >
            {!done && (
              <>
                <span className="absolute left-[28%] top-[38%] h-[3px] w-[3px] rounded-full bg-white" />
                <span className="absolute left-[60%] top-[38%] h-[3px] w-[3px] rounded-full bg-white" />
              </>
            )}
          </div>
        );
      })}
    </div>
  );
}
