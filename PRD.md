# ContractLingo (Working Name)

Product Vision & Product Requirements Document (PRD)

> Version: v0.2
> Author: Nathaniel Lee
> Purpose: A daily 5-10 minute mobile webapp that teaches practical judgement for contract management — starting with PSSCOC and Singapore Contract Law, built solo, for solo use.

---

## Vision

Most contract professionals learn by reading clauses or attending courses.

This teaches how an experienced Contracts Manager *thinks*, not what the contract says.

The platform should feel like:

- Duolingo for Contracts
- A senior Contracts Manager mentoring you every day

The goal is commercial judgement and legal reasoning, built through bite-sized daily lessons — not clause memorisation.

---

## V1 Scope (this is what gets built first)

Everything below is deliberately narrow. It is a personal daily-habit tool, not a platform launch. Broader ambitions are captured in **Later Phases** so they don't creep into V1.

| Decision | V1 Answer |
|---|---|
| Content types | Lessons + Quiz Bank only |
| Domains | PSSCOC + Singapore Contract Law |
| Users | Just you — no accounts/auth, no multi-tenancy |
| Content authoring | AI-assisted drafting from your notes/experience, you review and edit before publishing |
| Core loop | One lesson/day → one decision question → spaced-repetition review of past lessons |

**Explicitly out of scope for V1:** Scenarios, Clause Explorer, Case Library, Templates, Checklists, Decision Trees/Flowcharts, AI mentor chat, multi-user support, other jurisdictions/frameworks (FIDIC, NEC, etc.). These are real and valuable — see **Later Phases** — but none of them should block shipping a working daily habit.

---

## Learning Philosophy

The platform should NOT teach users to memorise clauses. Instead it trains users to answer questions like:

- Can I issue this instruction?
- Can the contractor claim?
- Is this actually a variation?
- What evidence do I need?
- Which clause governs this issue?

### Every lesson answers 5 questions

1. Why should I care?
2. What do most people misunderstand?
3. What is the correct principle?
4. Why is that the correct principle?
5. How would this happen on a real project?

---

## V1 Content Model

### Lessons

One concept, ~3-5 minutes to read.

**Structure:**
Situation → Common Misunderstanding → Principle → Why → Practical Example → Decision Question → Answer → Red Flags → Takeaway → Related Lessons

Stored as individual Markdown files with YAML frontmatter, e.g. `/content/lessons/l001-not-every-instruction-is-a-variation.md`.

```yaml
---
id: L001
title: Not Every Instruction is a Variation
domain: psscoc # or sg-contract-law
level: 1 # foundations | claims | commercial | advanced
tags: [variations, instructions]
related: [L004, L012]
---
```

### Quiz Bank

Tests judgement, not recall.

- Bad: "What does Clause 19.3 say?"
- Good: "The contractor installs incorrect cable. The Engineer instructs replacement. Is this a variation?"

Each quiz question is linked to the lesson(s) it draws from and feeds the spaced-repetition scheduler — questions on lessons you're forgetting resurface more often.

---

## Core Loop (the actual "Duolingo" mechanics)

The original draft was heavy on content structure but light on the mechanics that make a daily habit actually stick. V1 needs these explicitly:

- **Streaks** — consecutive days completed, shown prominently, don't let it feel punishing to miss one (e.g. a streak freeze).
- **Daily push notification** — PWA install-to-homescreen + push notification at a set time ("Today's lesson is ready").
- **Spaced repetition** — past quiz questions resurface on a schedule (simple SM-2-style algorithm is enough; no need to build anything fancy for V1).
- **Session length guardrail** — one new lesson + a handful of review questions, hard-capped so it stays a 5-10 min session, not creeping longer.
- **Progress view** — lessons completed, current streak, weak topics (based on quiz misses).

No XP/leagues/leaderboards for V1 — those matter for social/competitive motivation, which doesn't apply to a single-user app. Revisit if this expands to multi-user.

---

## Content Authoring Workflow

The real bottleneck is content, not code. V1 workflow:

1. You supply a topic + your own notes/experience/a real situation you encountered.
2. AI drafts the lesson in the standard structure above.
3. You fact-check and edit — you are the source of truth on correctness, especially where it touches your employer's actual projects.
4. Commit the reviewed Markdown file to the content repo.

**Confidentiality note:** if a lesson's "Practical Example" is drawn from a real project you've worked on, anonymise project/party names and check it doesn't disclose anything you have a confidentiality obligation on (NDAs, employment terms). This applies most to the future Case Library (real disputes) but is worth having as a habit now.

---

## Tech Stack (V1)

- **Content:** Markdown + YAML frontmatter, versioned in this GitHub repo
- **Backend:** Supabase (Postgres) — stores lesson progress, streak state, SRS scheduling data
- **Frontend:** Next.js, installable PWA (manifest + service worker for offline lesson caching + push notifications)
- **Hosting:** Vercel
- **Auth:** None for V1 (single user). If needed at all, a single shared passphrase/env-based gate is enough — don't build multi-user auth for a V1 that has one user.

---

## Later Phases (not V1 — sequencing only, not commitments)

**Phase 2 — Deepen the judgement training**
- Scenarios (realistic multi-document decision exercises)
- Clause Explorer (PSSCOC in plain English)
- Checklists, Decision Trees/Flowcharts

**Phase 3 — Reference depth**
- Case Library (SG courts, arbitration, SOP Act adjudications — mind confidentiality on non-public arbitration material)
- Templates (letters, EOT assessments, etc.)

**Phase 4 — Expansion**
- Additional frameworks: FIDIC, NEC, Energy/PPP contracts
- AI mentor features (explain a clause, challenge my position, review my draft reply)
- Multi-user support, if/when there's a reason to share this beyond yourself

---

## Success Metric (V1)

Pick one primary metric so you know if this actually worked. Recommended: **7-day and 30-day streak retention** — did you actually keep doing this daily. Lesson count and quiz accuracy are secondary/vanity if the streak isn't holding.

---

## Guiding Principle

> "Don't teach the contract. Teach the judgement behind the contract."

Every feature, lesson and scenario should reinforce this — but in V1, that means doing it well for a *small* set of lessons before expanding breadth.
