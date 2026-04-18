# CONTINUITY.md — Session Handoff

> The last thing AI 1 writes before closing a session.
> The first thing both AIs read at the start of the next session.

---

## Last Session

**Date:** 2026-04-18
**Milestone:** Planning and architecture correction session — no code written
**Outcome:** Three critical structural gaps (testing, RAG documentation, API layer) were identified, researched, and resolved. All planning documents are now current and internally consistent. The correct next milestone is M-001b, not M-002.

---

## What Was Done

**Gap audit:**
- Identified: no testing strategy in any planning document
- Identified: no RAG documentation process or format defined
- Identified: api-proxy pattern unresolved
- Identified: no git repository in the working directory
- Identified: no environment variable strategy
- Identified (deferred): no error handling conventions, no loading state conventions, no locale/currency formatting, no print/label generation plan, no auth middleware shape

**Decisions made and recorded in DECISIONS.md:**
- BFF pattern: all backend calls hidden from browser via typed Next.js Route Handlers. `BACKEND_API_URL` is server-only. Resolves the PENDING api-proxy entry.
- Testing infrastructure: Vitest + React Testing Library (unit/integration) + Playwright (E2E)
- RAG documentation format: French-language markdown in `docs/guide/[module]/[workflow].md`, one file per user workflow, H2 sections 200–400 words, no tables, no technical terms, session starters per section
- Context7 MCP server (Upstash): connected for all milestones — pulls current docs for Next.js 16, React 19, Tailwind v4, shadcn/ui CLI v4, Vitest, TanStack Query into AI 2's context
- AI 1 search protocol: vendor doc search required for every service a milestone touches, no exceptions — recorded after AI 1 missed the official Playwright MCP server by not searching

**Documents updated:**
- `DECISIONS.md` — 4 new entries appended; PENDING api-proxy entry marked resolved
- `SPEC.md` — testing and RAG documentation added to In Scope; backend URL exposure added to Out of Scope
- `FRONTEND_ARCHITECTURE.md` — API Layer Architecture, Testing Architecture, and RAG Documentation sections added
- `AGENTS.md` — Testing Rules, Documentation Rules, and MCP Tools (mandatory usage) sections added
- `MILESTONE_LOG.md` — M-001b inserted as current milestone; M-002 moved to first backlog position; MCP servers documented for M-001b

**Plans produced:**
- M-002 full implementation plan — drafted and complete, but **on hold until M-001b is done**
- M-001b full implementation plan — produced and ready for AI 2 review

## What Was NOT Done (and why)

- No code written — this was a planning and correction session
- M-001b plan not yet reviewed by AI 2 — session closed before AI 2 was engaged
- M-002 plan paused — M-001b is the prerequisite
- Deferred gaps not yet in milestone plans: error handling conventions, loading state conventions, Moroccan French locale/MAD currency formatting, print/label generation (critical for Expeditions), auth middleware shape — these must be addressed in their respective milestone plans before those features are built

## Known Issues / Warnings

- **No git repository in the working directory.** First task of M-001b. No version control until this is done.
- **The M-001b plan requires AI 2 to install `clsx` and `tailwind-merge` as production dependencies** — these will also be needed by shadcn in M-002, so it is not wasted work.
- **shadcn init with Tailwind v4 behaves differently from v3** — AI 2 must use Context7 to fetch current shadcn docs before running init in M-002.
- Print/label generation is a daily operational requirement for NCM (expedition labels, barcodes) — it is not planned yet. Must be addressed before the Expeditions milestone.

## State of the Codebase Right Now

The repo contains a working Next.js 16 scaffold (App Router, TypeScript, Tailwind v4, ESLint) with no git history and no testing infrastructure. All planning documents are current and internally consistent. The architecture is fully decided across all dimensions: BFF pattern, design system, state management, testing, documentation. No feature code exists. The app renders the default Next.js scaffold page. Three MCP servers are documented for connection: Context7 (Upstash), Playwright (Microsoft), and shadcn (Vercel).

---

## Next Session

**Milestone:** M-001b — Git repository, testing infrastructure, and environment baseline
**AI 1's first task:** Hand the M-001b plan to AI 2 for review. The plan is already written — no new planning needed. Confirm the three MCP servers are connected (`/mcp` in Claude Code), then relay the plan.

## Open Questions for AI 1

1. After M-001b and M-002 are complete, revisit the deferred gaps before starting M-003: error handling conventions, loading state patterns, and auth middleware shape all affect M-003 architecture.
2. Print/label generation planning — must happen before the Expeditions milestone. Research whether Next.js has a print-layout pattern or whether a library is needed.
3. Locale formatting — MAD (Moroccan Dirham) and Moroccan French date formats need a consistent `Intl` strategy before any financial module is built.

## Open Questions for AI 2

1. Verify the three MCP servers are connected before starting M-001b: run `/mcp` in Claude Code and confirm context7, playwright, and shadcn all show as Connected.
2. When running `git init`, confirm the working directory is `/Users/obande/Desktop/workspace/nejme-chamal-messagerie` — not a subdirectory.
3. Vitest with Next.js 16 / React 19 requires specific configuration — use Context7 to fetch current Vitest docs (`resolve-library-id` → "Vitest", then `query-docs` for "configure vitest with Next.js App Router") before writing `vitest.config.ts`.
4. The M-001b plan requires a minimal `lib/utils.ts` (cn utility) so the Vitest smoke test can compile. shadcn will overwrite this file in M-002 — that is expected and fine.
