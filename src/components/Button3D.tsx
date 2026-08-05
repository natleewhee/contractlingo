type Button3DProps = {
  children: React.ReactNode;
  tone?: "gold" | "coral" | "mint" | "white";
  className?: string;
  onClick?: () => void;
};

const TONE_CLASSES: Record<NonNullable<Button3DProps["tone"]>, string> = {
  gold: "bg-gold text-ink shadow-[0_4px_0_var(--gold-dark)] active:shadow-[0_1px_0_var(--gold-dark)]",
  coral:
    "bg-coral text-white shadow-[0_4px_0_var(--coral-dark)] active:shadow-[0_1px_0_var(--coral-dark)]",
  mint: "bg-mint text-white shadow-[0_4px_0_var(--mint-dark)] active:shadow-[0_1px_0_var(--mint-dark)]",
  white:
    "bg-white text-ink shadow-[0_3px_0_rgba(0,0,0,0.15)] active:shadow-[0_1px_0_rgba(0,0,0,0.15)]",
};

export function Button3D({
  children,
  tone = "gold",
  className = "",
  onClick,
}: Button3DProps) {
  return (
    <button
      onClick={onClick}
      className={`block w-full rounded-2xl px-4 py-3 text-center font-display text-sm font-semibold tracking-wide transition-transform active:translate-y-[3px] ${TONE_CLASSES[tone]} ${className}`}
    >
      {children}
    </button>
  );
}
