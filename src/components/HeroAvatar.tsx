import { getAvatarScheme, type AvatarSchemeId } from "@/lib/avatarSchemes";

type HeroAvatarProps = {
  size?: number;
  className?: string;
  scheme?: AvatarSchemeId | string;
};

// The personnel-badge photo placeholder - a plain silhouette in a ring of
// the user's chosen accent color. Replaces the old cartoon mascot avatar;
// see DESIGN.md.
export function HeroAvatar({ size = 56, className = "", scheme = "marker-yellow" }: HeroAvatarProps) {
  const { color } = getAvatarScheme(scheme);
  const borderWidth = Math.max(2, Math.round(size * 0.05));

  return (
    <div
      className={`flex shrink-0 items-center justify-center rounded-full bg-card ${className}`}
      style={{ width: size, height: size, border: `${borderWidth}px solid ${color}` }}
      aria-hidden="true"
    >
      <svg width={size * 0.56} height={size * 0.56} viewBox="0 0 24 24" fill="var(--ink-soft)">
        <circle cx="12" cy="8" r="4" />
        <path d="M4 20c0-4.4 3.6-7 8-7s8 2.6 8 7" />
      </svg>
    </div>
  );
}
