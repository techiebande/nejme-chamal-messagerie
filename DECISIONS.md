# DECISIONS.md — Architectural Decision Log

Append-only. Never delete an entry.
To reverse a decision, add a new entry that supersedes it and explains why.

---

## 2026-04-17 — Old codebase is reference-only for UI appearance

**Decision:** The existing NCM-FrontEnd codebase at `/Users/obande/Desktop/workspace/NCM-FrontEnd` is discarded entirely. It may be opened only to reference how the UI looks, never for code patterns, component structure, or logic.
**Why:** The codebase has no design system, no consistent patterns, no architectural discipline, and causes constant UI and logic regressions. Even senior AI models struggle to understand it. The rebuild starts clean.
**Implications:** No file, function, hook, context, or pattern from the old codebase may appear in the new one. Any resemblance must be coincidental and justified independently.
**Decided by:** Founder

---

## 2026-04-17 — NCM_REFERENCE.md is the canonical product and API reference

**Decision:** `NCM_REFERENCE.md` in the project root is the single source of truth for what modules exist and every API endpoint. Both AI 1 and AI 2 read it at the start of every session before any other file.
**Why:** AI 1 produced an initial API reference; AI 2 reviewed it against the actual source and found 7 wrong HTTP methods, 20+ missing endpoints, and 2 misattributions. The corrected document is now verified and must be maintained going forward.
**Implications:** If a new endpoint is discovered during implementation, AI 2 flags it and AI 1 adds it to NCM_REFERENCE.md before the session closes. The document is never allowed to go stale.
**Decided by:** AI 1 proposed · AI 2 reviewed · Founder approved

---

## 2026-04-17 — Backend API is untouched

**Decision:** The backend at `https://ncapi.digitalbang.ma` is not modified. This project is frontend-only.
**Why:** The rebuild scope is the frontend only. The backend API is live and in production use.
**Implications:** Every API integration must match the verified endpoints in NCM_REFERENCE.md exactly. No new backend endpoints are designed by AI 1 or AI 2.
**Decided by:** Founder

---

## 2026-04-17 — Three-Man Team Protocol governs all development

**Decision:** All development follows the Vibe-Coding Playbook v2.1 three-man team protocol. AI 1 plans and never codes. AI 2 implements and never designs. The founder relays and approves.
**Why:** The old codebase failed because there was no architectural discipline or separation of concerns in how it was built. The protocol enforces that separation.
**Implications:** No milestone starts without AI 1's plan. No code is written before AI 2 reviews the plan. No milestone closes without browser testing and session end protocol.
**Decided by:** Founder

---

## [RESOLVED — see 2026-04-18 BFF entry below] — api-proxy pattern: keep or replace

**Decision:** TBD
**Why:** The old app routes most data operations through a generic `POST /api/api-proxy` obfuscation layer. The rebuild can either keep this (security through obscurity, hides backend URL from browser) or replace it with a clean typed http-service layer using Next.js server actions or route handlers that call the backend directly.
**Status:** Resolved by the 2026-04-18 BFF pattern decision below.

---

## [PENDING] — Client-side state management strategy

**Decision:** TBD
**Why:** The old app had 16 React Contexts managing a mix of server state and UI state. SWR handles server/remote state in the rebuild. But local UI state strategy (global modals, sidebar state, active agency context, user session) needs to be defined before coding begins.
**Status:** Superseded by the 2026-04-18 frontend architecture baseline decision below.

---

## 2026-04-18 — Frontend architecture baseline for design system, state, and data fetching

**Decision:** The rebuild will use a token-driven design system with app-owned primitives, Next.js server-first fetching for initial read paths, TanStack Query for client-side server state and mutations, React local state as the default for ephemeral UI state, reducer plus context only for shared UI-only client state, and URL search params for shareable filter or navigation state. Redux, RTK Query, and SWR are not default tools for this rebuild.
**Why:** Research from primary and maintainer-run sources showed that design-system consistency depends on tokens plus owned primitives, and that server state should be treated separately from client UI state. NCM is an enterprise logistics app with many interactive flows and mutations, which makes TanStack Query a better default than SWR, while Redux would add unnecessary coordination cost unless future requirements prove otherwise.
**Implications:** `FRONTEND_ARCHITECTURE.md` is now the detailed baseline document. `AGENTS.md`, `CLAUDE.md`, and both Claude and Codex role skills must include it in their startup reading order. Any future proposal to add Redux, RTK Query, or SWR must supersede this decision explicitly in `DECISIONS.md`.
**Decided by:** Founder approved after AI research

---

## 2026-04-18 — Context7 MCP server connected for all milestones

**Decision:** The Context7 MCP server (maintained by Upstash, https://github.com/upstash/context7) is connected to Claude Code for all milestones. It is configured as a remote HTTP server in `.mcp.json` with no credentials required.
**Why:** This project runs Next.js 16, React 19, Tailwind v4, and shadcn/ui CLI v4 — all at or past the edge of AI training data. Context7 pulls current, version-specific documentation for these libraries directly into AI 2's context before code is written, preventing hallucinated APIs and outdated patterns. AGENTS.md already warns that this is not the Next.js AI models know from training; Context7 automates that correction.
**Implications:** AI 2 must use the `resolve-library-id` and `query-docs` tools to fetch current docs for any library it is about to write code for. This is not optional — it is the mechanism that makes the "read the docs before writing code" rule from AGENTS.md enforceable in practice.
**Decided by:** Founder

---

## 2026-04-18 — AI 1 must search vendor docs for every service a milestone touches, not just expected ones

**Decision:** Step 2 of every AI 1 session (MCP server search) must include a vendor documentation search for every named service, tool, or package a milestone installs or configures — regardless of whether AI 1 expects that service to have an MCP server. Stating "none found" is only acceptable after a search has been conducted. Skipping the search and assuming "none" is a protocol violation.
**Why:** AI 1 initially missed the official Microsoft-maintained Playwright MCP server (`@playwright/mcp`, documented at playwright.dev/docs/getting-started-mcp) for M-001b by not searching Playwright's vendor docs at all — the founder had to find it independently. This is a correctness failure, not a search quality issue.
**Implications:** For each milestone, AI 1 lists every service touched, runs a vendor doc search for each, and records either the server found or "none found — confirmed by checking [source URL]". No service is skipped.
**Decided by:** Founder (correction)

---

## 2026-04-18 — Official Next.js-generated agent files are the root instruction surface

**Decision:** The repo keeps the official Next.js-generated `AGENTS.md` managed block intact and layers project-specific rules below it. `CLAUDE.md` stays minimal and points to `@AGENTS.md`.
**Why:** Next.js now generates version-aware agent guidance and MCP-oriented instructions that may change over time. Preserving the managed block lets the repo benefit from official framework guidance without losing NCM-specific rules.
**Implications:** Project guidance should live in supporting docs such as `FRONTEND_ARCHITECTURE.md`, `SPEC.md`, `DECISIONS.md`, and `CONTINUITY.md`, with `AGENTS.md` acting as the shared entrypoint. Future edits must not modify the Next.js-managed block itself.
**Decided by:** Founder approved after scaffold integration

---

## 2026-04-18 — BFF pattern: all backend calls are server-side, never visible in the browser network tab

**Decision:** The backend at `https://ncapi.digitalbang.ma` is never called directly from the browser. All backend communication is routed through Next.js Route Handlers in `app/api/[domain]/route.ts`, which act as a typed Backend-for-Frontend (BFF) layer. The backend base URL lives in the `BACKEND_API_URL` server-side environment variable and is never included in the client bundle.

The architecture is:
- Server Components call the backend directly via server-side `fetch()` — invisible to the browser by definition.
- Client Components call typed Next.js Route Handlers (e.g., `/api/expeditions`) via TanStack Query — the browser only ever sees the Next.js route, never the real backend.
- Route Handlers validate inputs with Zod, call the backend with auth credentials, and return typed responses.
- TypeScript types are shared between Route Handlers and TanStack Query hooks via colocated `types.ts` files.
- Query keys are centralized in `lib/query-keys.ts` so invalidation stays predictable.
- Mutation hooks follow the pattern `use[Domain]Mutation`, query hooks follow `use[Domain]Query`.

**Why:** The founder requires that the backend URL is never exposed in the browser network tab. The old `POST /api/api-proxy` obfuscation layer satisfied the security requirement but was a developer experience failure — one opaque endpoint for all operations, no typing, no discoverability. The BFF pattern using per-domain Route Handlers satisfies the security requirement while being typed, organized, and testable.
**Implications:** Every API-layer milestone creates one Route Handler file per backend resource domain. No raw `fetch()` calls to the backend URL are ever written in client components or TanStack Query hooks. The `BACKEND_API_URL` env var must be in `.env.local` (not `.env`) and must never appear in `NEXT_PUBLIC_*` variables. A `.env.local.example` file must be maintained listing all required server-side env vars.
**Decided by:** Founder

---

## 2026-04-18 — Testing infrastructure: Vitest + React Testing Library + Playwright

**Decision:** The project uses three testing layers:
- **Unit and integration tests:** Vitest with React Testing Library. Vitest is ESM-native, faster than Jest, and has first-class support for React 19 and Tailwind v4. Test files colocate with the code they test: `[file].test.ts` or `[component].test.tsx`.
- **E2E tests:** Playwright. Official Next.js recommendation. Tests live in `e2e/` at the repo root.
- **Test commands:** `pnpm test` runs Vitest, `pnpm test:e2e` runs Playwright.
- **Definition of done:** Every milestone that creates or modifies user-facing logic must include passing tests. "All automated checks pass" in any exit condition means lint + build + `pnpm test` + `pnpm test:e2e` all pass.

**Why:** No testing existed in the original planning documents. For a platform that handles money, shipments, and multi-agency operations, untested code is a production liability. Testing infrastructure is established in M-001b before any feature code is written so that every subsequent milestone can write tests as a matter of course.
**Implications:** M-001b adds Vitest, React Testing Library, and Playwright to `devDependencies`. Every subsequent milestone plan from AI 1 must specify which tests AI 2 writes. The milestone exit condition for M-001b is that `pnpm test` and `pnpm test:e2e` both pass with at least one smoke test each.
**Decided by:** Founder

---

## 2026-04-18 — RAG documentation format and process

**Decision:** Every user-facing feature milestone produces at least one French-language user guide file alongside the code. These files are the source corpus for the RAG chatbot (Module 12).

Format rules (based on AWS RAG best-practices research):
- **Location:** `docs/guide/[module]/[workflow].md` — one file per user workflow, not per module.
- **Naming:** French kebab-case from the user's task perspective. Example: `docs/guide/expeditions/creer-une-expedition.md` not `expeditions.md`.
- **Language:** Plain French. Staff perspective. No component names, no endpoint names, no variable names, no technical jargon. Write as if explaining to an NCM employee who has never seen the app.
- **Structure per file:**
  1. A top-level heading that is the question the file answers ("Comment créer une nouvelle expédition ?")
  2. A one-paragraph summary of what this workflow does and when to use it
  3. H2 sections for each step or sub-topic
  4. A brief summary sentence after each H2 heading before the list items
  5. Numbered steps with transition phrases between items ("Après avoir rempli ce champ, passez à…")
  6. No tables — use nested bullet lists instead
  7. All NCM-specific terms defined on first use in parentheses
- **Chunk target:** Each H2 section should be 200–400 words — large enough for context, small enough for precise retrieval.
- **No images or diagrams** — describe visuals in text.

**Why:** The RAG chatbot needs a high-quality source corpus to answer staff questions accurately. Docs written after the fact are inconsistent. Writing one guide file per milestone while the feature is being built produces better, more accurate documentation and costs almost no extra time.
**Implications:** AI 1 implementation plans must name the guide file(s) AI 2 must produce. AI 2 must create or append to those files as part of every user-facing milestone. The guide files are committed to the repo and later indexed into Qdrant by the RAG pipeline.
**Decided by:** Founder

---

## 2026-04-18 — DeepWiki MCP server added alongside Context7

**Decision:** The DeepWiki MCP server (maintained by Cognition AI, https://mcp.deepwiki.com/mcp) is added to `.mcp.json` alongside Context7. The two servers serve distinct purposes and are used together, not interchangeably.
- **Context7** answers "how do I use this API?" — pulls current, version-specific library documentation.
- **DeepWiki** answers "how does this codebase work internally?" — AI-generated architecture analysis of public GitHub repos, including diagrams and module-level explanations.
**Why:** Context7 covers API reference well but does not explain underlying library behaviour. DeepWiki fills that gap: when docs contradict observed behaviour, or when understanding a library's internals is required to write correct integration code, DeepWiki provides source-level architectural context. Both are free, no-auth, HTTP remote servers — zero cost to connect both.
**Implications:** `AGENTS.md` now documents both servers with explicit "when to use" and "how to use" instructions. AI 1 and AI 2 must use Context7 for API reference and DeepWiki for architectural/internal questions. Neither replaces the other. Both must be connected at all times.
**Decided by:** Founder

---

## 2026-04-18 — Git commits use Conventional Commits with milestone scope

**Decision:** Git commits for this repo use Conventional Commit prefixes. When a commit belongs to a milestone, the milestone ID is included as the scope, for example `chore(m-001b): initialize git, testing infrastructure, and env baseline`.
**Why:** The project already tracks delivery by milestone, but plain free-form commit messages make history harder to scan. Adding a standard commit type plus milestone scope keeps history readable for both day-to-day work and milestone review.
**Implications:** `AGENTS.md` and AI 2 implementation instructions must tell agents to use commit messages like `feat(m-002): ...`, `fix(m-003): ...`, `chore(m-001b): ...`, `test(m-002): ...`, or `docs(m-004): ...` as appropriate. Infrastructure and repository setup work defaults to `chore(...)` unless a more specific type is clearly correct.
**Decided by:** Founder

---

## 2026-04-18 — M-001b now includes hosted CI/CD, not just local checks

**Decision:** M-001b is reopened and expanded to require a hosted GitHub Actions pipeline in addition to the already completed local testing and environment baseline. The pipeline must run lint, typecheck, build, unit/integration tests, and Playwright E2E checks in CI, and publish a releasable build artifact from `main` for continuous delivery.
**Why:** Local commands alone are not enough to prove the project is continuously validated after each push. The foundation milestone should leave the repo with a shared automation path that every future milestone can rely on.
**Implications:** M-001b stays open until the new workflow records a confirmed green hosted run. M-002 must not start until that happens. Future milestone closeout can assume the repository already has a baseline GitHub Actions path for validation and delivery artifacts.
**Decided by:** Founder
