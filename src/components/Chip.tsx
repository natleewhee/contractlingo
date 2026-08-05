export function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full bg-card px-3 py-1.5 font-display text-xs font-semibold text-ink shadow-[0_2px_0_var(--frame-border)]">
      {children}
    </span>
  );
}
