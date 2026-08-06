import Link from "next/link";

type Button3DProps = {
  children: React.ReactNode;
  tone?: "gold" | "coral" | "mint" | "white";
  className?: string;
  onClick?: () => void;
  href?: string;
  disabled?: boolean;
};

// Button backgrounds (gold/white) don't flip with the page's light/dark
// theme, so their text can't use the `--ink` token — it flips to a light
// colour in dark mode and would go near-invisible against a still-bright
// gold or white background. These use a fixed dark navy instead.
const TONE_CLASSES: Record<NonNullable<Button3DProps["tone"]>, string> = {
  gold: "bg-gold text-[#21284A] shadow-[0_4px_0_var(--gold-dark)] active:shadow-[0_1px_0_var(--gold-dark)]",
  coral:
    "bg-coral text-white shadow-[0_4px_0_var(--coral-dark)] active:shadow-[0_1px_0_var(--coral-dark)]",
  mint: "bg-mint text-white shadow-[0_4px_0_var(--mint-dark)] active:shadow-[0_1px_0_var(--mint-dark)]",
  white:
    "bg-white text-[#21284A] shadow-[0_3px_0_rgba(0,0,0,0.15)] active:shadow-[0_1px_0_rgba(0,0,0,0.15)]",
};

export function Button3D({
  children,
  tone = "gold",
  className = "",
  onClick,
  href,
  disabled = false,
}: Button3DProps) {
  const classes = `block w-full rounded-2xl px-4 py-3 text-center font-display text-sm font-semibold tracking-wide transition-transform active:translate-y-[3px] disabled:opacity-60 disabled:active:translate-y-0 ${TONE_CLASSES[tone]} ${className}`;

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
