# MILESTONE_LOG.md — Milestone Tracker

**Status:** Active as of 2026-04-18

---

## Milestone Size Rules

A milestone MUST be completable in one session (≤3 hours of AI work).
A milestone MUST have a binary exit condition — true or not, no partial credit.
A milestone MUST specify whether a browser test is required.

**A milestone is too large if it:**
- Involves more than 2 new database tables
- Touches more than 4 unrelated files
- Requires more than 1 external API integration
- Contains the word "and" in its objective more than once
→ Split it before starting it.

---

## Current Milestone

M-001b — Git repository, testing infrastructure, environment baseline, and CI/CD

**Status:** Reopened — CI/CD patch added, waiting for first hosted green run
**Exit condition:** A git repository exists in the working directory with a proper `.gitignore`; Vitest + React Testing Library are installed and `pnpm test` passes with at least one smoke test; Playwright is installed and `pnpm test:e2e` passes with at least one smoke test; a `.env.local.example` file documents all required server-side env vars; all existing local checks (`pnpm lint`, `pnpm typecheck`, `pnpm build`, `pnpm test`, `pnpm test:e2e`) pass; and a GitHub Actions pipeline runs the same validation in CI while producing a release artifact on `main`.
**Browser test required:** No — this milestone remains infrastructure only.
**Notes:** M-002 is blocked until the reopened M-001b closes again with a confirmed hosted workflow run.

## Backlog

- M-002 — Design-system foundation
- M-003 — Shared API layer and auth/session foundation
- M-004 — First real business workflow shell
- M-005+ — Remaining module rebuild milestones to be defined from `NCM_REFERENCE.md`

## Completed Milestones

### M-000 — Project reference and team protocol foundation

**Date completed:** 2026-04-17
**Exit condition:** Core continuity files, verified API reference, and AI role skills exist in the repo.
**Browser test required:** No — documentation and protocol only.
**Notes:** `NCM_REFERENCE.md` was verified and the team protocol files were created.

### M-001 — Next.js scaffold and official agent-file integration

**Date completed:** 2026-04-18
**Exit condition:** A working Next.js app exists in this repo, official `AGENTS.md` / `CLAUDE.md` structure is present, project-specific rules are merged cleanly, and baseline checks pass.
**Browser test required:** No — framework scaffold only, no user-facing business flow yet.
**Notes:** Next.js 16.2.4, React 19.2.4, Tailwind v4, TypeScript, and ESLint are in place. `pnpm lint` and `pnpm build` passed after integration.
