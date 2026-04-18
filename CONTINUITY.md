# CONTINUITY.md — Session Handoff

> The last thing AI 1 writes before closing a session.
> The first thing both AIs read at the start of the next session.

---

## Last Session

**Date:** 2026-04-18
**Milestone:** M-001b — Git repository, testing infrastructure, and environment baseline
**Outcome:** M-001b was originally marked complete, but it has been reopened after the milestone scope was patched to require hosted CI/CD in addition to local testing infrastructure.

---

## What Was Done

**Implementation completed:**
- Ran `git init` in `/Users/obande/Desktop/workspace/nejme-chamal-messagerie` and confirmed `.git/` exists at the repo root
- Added Playwright artifact paths to `.gitignore`
- Installed `clsx` and `tailwind-merge` as production dependencies
- Installed Vitest, React Testing Library, Playwright, and their supporting dev dependencies
- Created `vitest.config.mts`, `vitest.setup.ts`, `lib/utils.ts`, `lib/utils.test.ts`, `playwright.config.ts`, `e2e/smoke.spec.ts`, and `.env.local.example`
- Updated `package.json` scripts for `test`, `test:watch`, and `test:e2e`
- Replaced the scaffold's remote `next/font/google` Geist setup with a local Arial/Helvetica stack so production builds do not depend on Google Fonts access
- Added a GitHub Actions CI/CD workflow that runs lint, typecheck, build, unit/integration tests, and Playwright E2E checks, then publishes a release artifact on `main`

**Verification completed:**
- `pnpm typecheck` passed
- `pnpm lint` passed
- `pnpm build` passed
- `pnpm test` passed with 2 unit tests green
- `pnpm test:e2e` passed with 1 Playwright smoke test green when rerun outside the Codex sandbox
- The repository now includes a hosted CI/CD workflow definition, but it still needs its first confirmed green GitHub Actions run before M-001b can be closed again

**Documents updated:**
- `AGENTS.md` — added Conventional Commit rules with milestone scope guidance
- `DECISIONS.md` — recorded Conventional Commits with milestone scope as the repo standard
- `MILESTONE_LOG.md` — reopened M-001b with CI/CD in scope and moved M-002 back to backlog

**Important environment note:**
- The Codex sandbox could not complete `git add -A` because it was blocked from creating `.git/index.lock`
- The Codex sandbox still blocks Playwright's local `webServer` from binding a port, so `pnpm test:e2e` must run either outside the sandbox or in hosted CI
- The actual project state is therefore based on local Codex-run checks plus one outside-sandbox Codex E2E verification

## What Was NOT Done (and why)

- The initial git commit was not created from Codex because the sandbox could not write `.git/index.lock`
- M-002 was not started — M-001b was completed first as required
- Deferred gaps not yet in milestone plans: error handling conventions, loading state conventions, Moroccan French locale/MAD currency formatting, print/label generation (critical for Expeditions), auth middleware shape — these must be addressed in their respective milestone plans before those features are built

## Known Issues / Warnings

- **The founder still needs to run the initial commit locally.** Use the new commit convention: `chore(m-001b): initialize git, testing infrastructure, env baseline, and ci-cd`.
- **shadcn init with Tailwind v4 behaves differently from v3** — AI 2 must use Context7 to fetch current shadcn docs before running init in M-002.
- **M-001b is open again until GitHub Actions is green.** Local checks are necessary but not sufficient after the milestone patch.
- **Playwright now uses a webpack-backed build path inside `playwright.config.ts`.** This avoids the sandbox-only Turbopack startup panic, while the normal project build remains on Turbopack.
- Print/label generation is a daily operational requirement for NCM (expedition labels, barcodes) — it is not planned yet. Must be addressed before the Expeditions milestone.

## State of the Codebase Right Now

The repo now contains a working Next.js 16 scaffold with git initialized, Vitest + React Testing Library, Playwright smoke coverage, `.env.local.example`, a GitHub Actions CI/CD workflow, and the `cn` utility that M-002 will build on. The app still renders the scaffold page, but it now uses a local Arial/Helvetica stack instead of remote Google-hosted Geist. All planning documents are current and internally consistent. Four MCP servers are documented for connection: Context7 (Upstash), DeepWiki (Cognition AI), Playwright (Microsoft), and shadcn (Vercel).

---

## Next Session

**Milestone:** M-001b — Git repository, testing infrastructure, environment baseline, and CI/CD
**AI 1's first task:** Confirm the first hosted GitHub Actions run for the new CI/CD workflow, then either re-close M-001b or relay any fixes needed before M-002 starts.

## Open Questions for AI 1

1. Before starting M-003, revisit the deferred gaps after M-002 closes: error handling conventions, loading state patterns, and auth middleware shape all affect M-003 architecture.
2. Print/label generation planning — must happen before the Expeditions milestone. Research whether Next.js has a print-layout pattern or whether a library is needed.
3. Locale formatting — MAD (Moroccan Dirham) and Moroccan French date formats need a consistent `Intl` strategy before any financial module is built.

## Open Questions for AI 2

1. Verify the four MCP servers are connected before starting M-002: confirm context7, deepwiki, playwright, and shadcn are all available to the active agent.
2. Use the new commit convention for any reopened M-001b commit: `type(m-001b): summary`, with `chore(...)` as the default for setup-only changes.
3. Reuse the existing `lib/utils.ts` `cn()` helper during shadcn setup rather than replacing it with a different path or name once M-002 resumes.
