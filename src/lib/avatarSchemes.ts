// The personnel badge's accent stripe / "hard-hat color" - the one
// user-customizable visual token (see DESIGN.md). All four are picked to
// clear 4.5:1 contrast against the fixed dark text used on accent fills
// (#241D14, see globals.css's --accent-text) in both themes.
export type AvatarSchemeId = "marker-yellow" | "marker-orange" | "marker-coral" | "marker-honey";

export type AvatarScheme = {
  id: AvatarSchemeId;
  label: string;
  color: string;
};

export const AVATAR_SCHEMES: AvatarScheme[] = [
  { id: "marker-yellow", label: "Yellow", color: "#d9a62e" },
  { id: "marker-orange", label: "Orange", color: "#d98a3d" },
  { id: "marker-coral", label: "Coral", color: "#ce7052" },
  { id: "marker-honey", label: "Honey", color: "#c99a4a" },
];

export const DEFAULT_AVATAR_SCHEME: AvatarSchemeId = "marker-yellow";

export function getAvatarScheme(id: string): AvatarScheme {
  return AVATAR_SCHEMES.find((s) => s.id === id) ?? AVATAR_SCHEMES[0];
}
