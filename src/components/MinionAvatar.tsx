type MinionAvatarProps = {
  size?: number;
  animate?: boolean;
  className?: string;
  style?: React.CSSProperties;
};

export function MinionAvatar({
  size = 26,
  animate = true,
  className = "",
  style,
}: MinionAvatarProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={`${animate ? "animate-bob" : ""} ${className}`}
      style={style}
      aria-hidden="true"
    >
      <path
        d="M30 34l6 10M70 34l-6 10"
        stroke="var(--minion-dark)"
        strokeWidth="6"
        strokeLinecap="round"
      />
      <circle
        cx="50"
        cy="55"
        r="30"
        fill="var(--minion)"
        stroke="var(--ink)"
        strokeWidth="5"
      />
      <circle cx="41" cy="53" r="5.5" fill="#fff" />
      <circle cx="61" cy="53" r="5.5" fill="#fff" />
      <circle cx="41" cy="54" r="2.2" fill="var(--ink)" />
      <circle cx="61" cy="54" r="2.2" fill="var(--ink)" />
    </svg>
  );
}
