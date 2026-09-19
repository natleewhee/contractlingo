# ContractLingo

A daily 5-10 minute practice habit for PSSCOC / Singapore contract-administration
judgment calls — "Duolingo for Contracts." Two-option decision scenarios, spaced
repetition, streaks. Trains judgment, not clause recall.

No accounts, no login: every visitor gets an anonymous per-browser identity
(a cookie that also functions as a bearer token) that can be renamed or
resumed across devices.

See [`PRODUCT.md`](./PRODUCT.md) for the full product context (audience,
purpose, constraints) and [`DESIGN.md`](./DESIGN.md) for the visual system.
`docs/solutions/` has short write-ups of specific bugs found and fixed along
the way, for anyone picking this codebase back up later.

## Stack

- [Next.js](https://nextjs.org) 16 (App Router, Turbopack), React 19, TypeScript
- Tailwind CSS v4
- [Neon](https://neon.tech) serverless Postgres (`@neondatabase/serverless`)
- Web Push (`web-push`) for daily reminder notifications
- [Vitest](https://vitest.dev) for unit tests

## Local setup

```bash
npm install
```

Create `.env.local` (see `.env.example`) with:

| Variable | Required | Purpose |
| --- | --- | --- |
| `DATABASE_URL` | yes | Neon Postgres connection string. Schema is created/migrated automatically on first request (see `ensureSchema()` in `src/lib/db.ts`) — no separate migration step. |
| `NEXT_PUBLIC_VAPID_PUBLIC_KEY` | for push notifications | Web Push VAPID public key. |
| `VAPID_PRIVATE_KEY` | for push notifications | Web Push VAPID private key. |
| `VAPID_SUBJECT` | for push notifications | A `mailto:` or `https:` contact URL, required by the Web Push protocol. |
| `ADMIN_SECRET` | for `/api/admin/stats` | Shared secret for the operator-only stats endpoint (`?key=...` or `Authorization: Bearer ...`). |
| `CRON_SECRET` | for the reminder cron | Shared secret the scheduler sends as `Authorization: Bearer ...` when calling `/api/cron/daily-reminder`. |

Generate a VAPID key pair with:

```bash
npx web-push generate-vapid-keys
```

Then run the dev server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Does |
| --- | --- |
| `npm run dev` | Start the dev server (Turbopack). |
| `npm run build` | Production build. |
| `npm start` | Serve a production build. |
| `npm run lint` | ESLint. |
| `npm test` | Run the Vitest suite once. |

## Testing

`npm test` runs unit tests under `src/lib/**/*.test.ts` — timezone-sensitive
date-key logic, avatar-scheme fallback behavior, and content invariants over
the question bank (e.g. that the correct answer's position isn't a static
tell). There's no end-to-end test harness; UI/flow changes are verified
manually against a running app (see `docs/solutions/` for examples of bugs
that were caught this way).

The app talks to Neon over HTTPS, which isn't reachable from every sandboxed
environment. For local verification against real Postgres semantics (e.g.
schema migrations, concurrent-write behavior), point `DATABASE_URL` at a
local Postgres instance instead — the code only depends on the standard
`neon()` tagged-template/`.transaction()` interface, not anything
Neon-specific.
