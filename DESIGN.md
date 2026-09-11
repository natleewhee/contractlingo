# DESIGN.md

The enforced visual system. Direction: **Site Diary** — the app reads as a construction site superintendent's daily site diary / inspection log, not a game. Replaces the earlier Duolingo-style minion-avatar/3D-button look (called "genuinely charming" by the adversarial review, but a deliberate fresh direction was chosen over refining it).

Mockup of record: the "ContractLingo — Site Diary Direction" canvas (home / mid-question / resolution screens, light+dark, correct+incorrect states). This file is that mockup's system written down as the spec to build against — when the two disagree, fix the mockup or this file, don't silently drift.

## Palette (CSS custom properties)

**Light**
```
--bg: #E4DAC2
--paper: #F4EEDD
--paper-alt: #EDE4CC
--ink: #2B241C
--ink-soft: #5A5143
--line: #C9BC9C
--stamp-approve: #2F5D52
--stamp-reject: #A63A2C
```

**Dark**
```
--bg: #1C1712
--paper: #26201A
--paper-alt: #2E271F
--ink: #EDE3CF
--ink-soft: #B2A78F
--line: #4A4032
--stamp-approve: #5FA491
--stamp-reject: #E37A63
```

**Accent** (the one user-customizable token — the personnel badge's accent stripe / hard-hat color, also the primary-button fill): default `#D9A62E`, swatch options `#D9A62E` / `#D98A3D` / `#CE7052` / `#C99A4A` (light and dark share these — all four were picked to clear 4.5:1 against `#241D14` text in either theme).

**Rule learned the hard way:** never use `--accent` as small text color directly on `--paper`/`--bg` — the first mockup pass did exactly that and failed WCAG AA for most of the swatch options (a review agent caught it before publish). Always use accent as a **fill**, with fixed dark text `#241D14` on top, never `var(--ink)` (which flips light/dark and won't reliably contrast against a mid-tone accent in both themes). This is the same reasoning the old `Button3D` component already used for its tone buttons — worth carrying forward, not relearning.

## Type

Three fonts, one role each:

- **Special Elite** — stamps, entry metadata, eyebrow labels. Typewriter/stencil feel. Always uppercase, letter-spaced. Never body copy — it's illegible at paragraph length.
- **PT Serif** — scenario text and resolution explanations. The one place legibility is non-negotiable; never below 15px, generous line-height (~1.5-1.6).
- **Public Sans** — UI labels, buttons, quiz options. Deliberate nod to official/government-form typography, matching the "form" chrome below.

## Motifs

- **Logbook spine**: a 16px left-edge strip, `--paper-alt` fill, 4 evenly-spaced small punched-hole circles. Present on every screen — it's the one constant that says "notebook," so don't drop it on new screens.
- **Rubber stamp**: 2-3px border in `--stamp-approve`/`--stamp-reject`, rotated -4° to -6°, uppercase Special Elite. No gradients, no ink-splatter textures — the rotation and border carry the whole effect. Used for the streak counter (approve-colored, dashed) and the correct/incorrect resolution verdict.
- **Personnel ID badge**: replaces the old minion mascot. Accent stripe + circular photo-placeholder (person silhouette) + name / role / badge-number fields.
- **Form-style controls**: checkbox-square icons for the session-length picker and quiz options — not pills, not chips. Reinforces "filling in a form," which is the whole point of the direction.

## Component map (old → new)

| Old | New |
|---|---|
| `Button3D` (coral/gold/mint tone system, `text-[#21284A]` hardcoded) | Stamp-bordered paper button; primary action = accent-filled, `#241D14` text |
| `MinionAvatar` / `HeroAvatar` | Personnel badge |
| `QueueDots` | Tally squares — filled = answered (colored by correct/incorrect), outline = not yet reached |
| Resolution panel (always `bg-mint` regardless of outcome — adversarial review §1.3) | APPROVED / QUERIED stamp, color reflects actual correctness. Fixes that bug as a side effect of the redesign, not a separate patch. |

## Accessibility floor

Carried over from the adversarial review — non-negotiable regardless of visual direction:

- 4.5:1 contrast for all body/label text; 3:1 for large/bold text ≥18.66px.
- Every tap target ≥44px.
- Focus-visible outlines on both text inputs (currently stripped via `outline-none` — restore, don't reintroduce the strip).
- `aria-live` on the resolution/feedback panel; `aria-disabled` (not `disabled`) on answered options so keyboard focus survives into the resolution state.
