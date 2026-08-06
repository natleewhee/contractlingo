import { getAvatarScheme, type AvatarSchemeId } from "@/lib/avatarSchemes";

type HeroAvatarProps = {
  size?: number;
  cape?: boolean;
  animate?: boolean;
  className?: string;
  scheme?: AvatarSchemeId | string;
};

export function HeroAvatar({
  size = 56,
  cape = true,
  animate = true,
  className = "",
  scheme = "coral",
}: HeroAvatarProps) {
  const { body, bodyDark, helmet, helmetDark } = getAvatarScheme(scheme);

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={`${animate ? "animate-bob" : ""} ${className}`}
      aria-hidden="true"
    >
      {cape && <path d="M30 48 L16 90 Q50 79 84 90 L70 48 Z" fill={bodyDark} opacity="0.9" />}
      <ellipse cx="50" cy="58" rx="30" ry="28" fill={body} stroke="var(--ink)" strokeWidth="5" />
      <ellipse cx="50" cy="34" rx="26" ry="6" fill={helmetDark} />
      <path d="M26 32a24 18 0 0148 0z" fill={helmet} stroke="var(--ink)" strokeWidth="5" />
      <g className="animate-blink-eyes">
        <circle cx="40" cy="58" r="6" fill="#fff" stroke="var(--ink)" strokeWidth="3" />
        <circle cx="62" cy="58" r="6" fill="#fff" stroke="var(--ink)" strokeWidth="3" />
      </g>
      <circle cx="41" cy="59" r="2.4" fill="var(--ink)" />
      <circle cx="63" cy="59" r="2.4" fill="var(--ink)" />
      <g transform="translate(64,66) scale(0.5)">
        <path
          d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z"
          fill={helmet}
          stroke="var(--ink)"
          strokeWidth="2.5"
        />
      </g>
    </svg>
  );
}
