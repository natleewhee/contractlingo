type EntryMarkProps = {
  size?: number;
  className?: string;
  style?: React.CSSProperties;
};

// A small ruled-page icon - stands in for a queued or logged case, in the
// site-diary paperwork idiom. Replaces the old cartoon mascot avatar.
export function EntryMark({ size = 24, className = "", style }: EntryMarkProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      style={style}
      aria-hidden="true"
    >
      <rect x="4" y="2" width="16" height="20" rx="2" fill="var(--card)" stroke="var(--ink)" strokeWidth="1.6" />
      <path d="M7.5 7.5h9M7.5 11.5h9M7.5 15.5h5.5" stroke="var(--ink-soft)" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}
