import Link from "next/link";

type Button3DProps = {
  children: React.ReactNode;
  tone?: "gold" | "coral" | "mint" | "white";
  className?: string;
  onClick?: () => void;
  href?: string;
  disabled?: boolean;
};

// Stamp-bordered paper buttons - see DESIGN.md. gold is a solid fill that
// stays similarly light in both themes, so its text uses the fixed
// --accent-text color (var(--ink) flips to a light color in dark mode and
// would go near-invisible against an unchanging mid-tone fill). coral and
// mint are "ink" colors instead - tuned to work as TEXT on paper (dark in
// light mode, brightened in dark mode), which means neither a fixed light
// nor a fixed dark text color reliably contrasts against them as a fill in
// both themes. A light tint of the fill plus var(--ink) text (which does
// flip correctly) sidesteps that instead of picking a text color that's
// only safe in one theme. white ("paper") flips fully with the theme, so
// it uses var(--ink) and var(--frame-border) directly.
const TONE_CLASSES: Record<NonNullable<Button3DProps["tone"]>, string> = {
  gold: "bg-gold border-2 border-gold-dark text-[var(--accent-text)]",
  coral: "bg-coral/15 border-2 border-coral text-ink",
  mint: "bg-mint/15 border-2 border-mint text-ink",
  white: "bg-card border-2 border-frame-border text-ink",
};

export function Button3D({
  children,
  tone = "gold",
  className = "",
  onClick,
  href,
  disabled = false,
}: Button3DProps) {
  const classes = `block min-h-11 w-full rounded-xl px-4 py-3.5 text-center font-display text-sm font-bold tracking-wide transition-transform active:translate-y-[2px] disabled:opacity-60 ${TONE_CLASSES[tone]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button onClick={onClick} disabled={disabled} className={classes}>
      {children}
    </button>
  );
}
