export type AvatarSchemeId = "coral" | "mint" | "violet" | "golden" | "slate";

export type AvatarScheme = {
  id: AvatarSchemeId;
  label: string;
  body: string;
  bodyDark: string;
  helmet: string;
  helmetDark: string;
};

// Reuses the app's existing design tokens (already theme-flipped for
// light/dark in globals.css) instead of inventing new colors that would
// need their own dark-mode variants.
export const AVATAR_SCHEMES: AvatarScheme[] = [
  {
    id: "coral",
    label: "Coral",
    body: "var(--coral)",
    bodyDark: "var(--coral-dark)",
    helmet: "var(--gold)",
    helmetDark: "var(--gold-dark)",
  },
  {
    id: "mint",
    label: "Mint",
    body: "var(--mint)",
    bodyDark: "var(--mint-dark)",
    helmet: "var(--gold)",
    helmetDark: "var(--gold-dark)",
  },
  {
    id: "violet",
    label: "Violet",
    body: "var(--minion)",
    bodyDark: "var(--minion-dark)",
    helmet: "var(--gold)",
    helmetDark: "var(--gold-dark)",
  },
  {
    id: "golden",
    label: "Golden",
    body: "var(--gold)",
    bodyDark: "var(--gold-dark)",
    helmet: "var(--coral)",
    helmetDark: "var(--coral-dark)",
  },
  {
    id: "slate",
    label: "Slate",
    body: "var(--grey)",
    bodyDark: "var(--grey-dark)",
    helmet: "var(--coral)",
    helmetDark: "var(--coral-dark)",
  },
];

export const DEFAULT_AVATAR_SCHEME: AvatarSchemeId = "coral";

export function getAvatarScheme(id: string): AvatarScheme {
  return AVATAR_SCHEMES.find((s) => s.id === id) ?? AVATAR_SCHEMES[0];
}
