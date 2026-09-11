# PRODUCT.md

Durable product context — audience, purpose, constraints, voice. Doesn't change with visual direction; see `DESIGN.md` for that. Full background/history lives in `PRD.md`; this is the condensed, current-state version.

## What this is

ContractLingo — a daily 5-10 minute practice habit for PSSCOC / Singapore contract-administration judgment calls. "Duolingo for Contracts": two-option decision scenarios, spaced repetition, streaks. Trains judgment, not clause recall.

## Audience

Started solo (Nathaniel Lee, working in contracts/engineering), now shared with others doing similar work. No accounts, no login — every visitor gets an anonymous per-browser identity they can rename or resume across devices. Assume the reader is a working professional (engineer, QS, contracts manager) practicing on a commute or between meetings, not a student in a classroom with time to spare.

## Purpose

Force a real decision. "Is this a variation?", "Can I certify this?", "Can the contractor claim?" — every scenario should make the user commit to a call, then explain the judgment principle behind the right one. Not a reference tool, not a textbook.

## Constraints

- **Session length is hard-capped 5-10 minutes.** Never let a session grow past that — see `/session`'s cap logic (Phase 1 fix: no path may serve an uncapped pool).
- **No login.** Identity is a browser cookie; the id itself functions like a bearer token, so the UI has to say so, and reserved/guessable ids (`default`, `admin`, ...) are blocked outright (Phase 2).
- **Content is AI-drafted and explicitly unverified** pending a real legal review pass (see the header disclaimer in `src/lib/questions.ts`). The product must never present it as authoritative Singapore law — a visible disclaimer is owed to strangers arriving from a shared link before this scales further.
- **Mobile-first PWA.** Most real usage is a phone at arm's length, not a desktop monitor. Every screen gets checked at ~390px.
- **Solo-maintained.** Prefer boring, low-maintenance implementations over clever ones — see `docs/solutions/` for the lessons that cost real debugging time.

## Voice

Direct, unhedged, decision-forcing. A scenario states a real situation and asks for a call; the explanation gives the judgment principle, not a hedge. The current question bank drifts from this in places (see the adversarial review's content-quality findings — too many "check the contract" non-answers) — new content should hold this line even where old content doesn't yet.

## Success metric

7-day and 30-day streak retention (per `PRD.md`). Accuracy and lesson count are secondary/vanity.
