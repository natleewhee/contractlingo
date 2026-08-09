// Shared between the report-this-case UI (SessionView) and recordFlag's
// server-side validation, so a flag can only ever carry one of these exact
// reasons - a Server Action is a public POST endpoint regardless of what
// buttons the UI offers.
export const FLAG_REASONS = ["Answer feels wrong", "Too easy", "Not relevant", "Other"] as const;
export type FlagReason = (typeof FLAG_REASONS)[number];
