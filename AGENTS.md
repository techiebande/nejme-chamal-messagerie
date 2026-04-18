<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Next.js Docs — Mandatory for Every Task

Before writing any code that touches Next.js — routing, components, config, middleware, API routes, data fetching, testing setup, or anything else — you MUST read the version-matched local docs first:

```
node_modules/next/dist/docs/
```

**How to find the right guide:**
- App Router features → `01-app/`
- Pages Router features → `02-pages/`
- Testing (Vitest, Playwright, Jest) → `01-app/02-guides/testing/`
- API reference → `01-app/03-api-reference/`

**This rule applies to every task, not just substantial ones.** Training data about Next.js is unreliable for this version. The local docs are the only authoritative source for this exact version. Reading them takes 2 minutes. Skipping them and writing against stale APIs wastes hours.

After reading the local docs, use Context7 (`resolve-library-id` → `query-docs`) for any libraries that interact with Next.js — Vitest, Playwright, TanStack Query, etc. Local docs first, then Context7.

## Relay Message Format — Mandatory

Whenever an AI produces a message intended to be copied and passed to the other AI — a plan, a counter-proposal, a review, a fix, or any inter-AI communication — it MUST be wrapped in a single fenced code block so the founder can copy it with one click:

~~~
```
[full message here — everything the receiving AI needs, self-contained]
```
~~~

Rules:
- The entire relay message goes inside one code block. No content split across multiple blocks.
- The code block contains plain text only — no nested markdown fences.
- Every relay message is self-contained. The receiving AI has no memory of prior conversation, so the message must include all context needed to act on it.
- Label the code block clearly above it: **"→ Copy this to AI 2"** or **"→ Copy this to AI 1"** so the founder knows who it is for.

# Project Conventions

At the start of every task, read these project files in this exact order:

1. `NCM_REFERENCE.md`
2. `AGENTS.md`
3. `FRONTEND_ARCHITECTURE.md`
4. `SPEC.md`
5. `DECISIONS.md`
6. `MILESTONE_LOG.md`
7. `CONTINUITY.md`

If any file is missing, stop and report it before proceeding.

## Frontend Architecture Defaults

- Use the baseline in `FRONTEND_ARCHITECTURE.md` unless a newer `DECISIONS.md` entry supersedes it.
- The design system is token-driven and built around app-owned primitives.
- Shared control visuals must be centralized in primitives, not repeated in pages or feature folders.
- Next.js server-first fetching is the default for initial page reads.
- TanStack Query is the default for client-side server state and mutations.
- React local state is the default for ephemeral UI concerns.
- Reducer plus context is reserved for shared UI-only client state.
- URL search params hold shareable filter, sort, and pagination state.

## Current "Do Not Default To" List

- Do not introduce Redux unless a `DECISIONS.md` entry explicitly approves it.
- Do not introduce RTK Query unless Redux itself has already been approved.
- Do not introduce SWR while TanStack Query is the standard client-side server-state tool.
- Do not restyle core controls ad hoc in pages.
- Do not scatter raw request logic across leaf components.

## Implementation Rules

- Tokens feed primitives, primitives feed feature components, and feature components feed pages.
- Shared controls such as buttons and inputs must expose approved variants instead of encouraging one-off styling.
- Backend communication must go through typed Next.js Route Handlers in `app/api/[domain]/route.ts`. The backend URL (`BACKEND_API_URL`) is server-only and must never appear in client code or `NEXT_PUBLIC_*` variables.
- Validation must exist at API boundaries using Zod on all Route Handler inputs and outputs.
- Plans and implementations must name the state bucket being used: server state, client UI state, form draft state, or URL state.
- If a task needs to deviate from this baseline, record the reason in `DECISIONS.md` first.

## MCP Tools — Mandatory Usage

Four MCP servers must always be connected. Each has a distinct job — use the right one for the right question.

### context7 — Library API reference
**When to use:** Before writing any code that uses a library. Answers "how do I use this API correctly right now?"
**How to use:**
1. Call `resolve-library-id` with the library name (e.g. "Next.js", "TanStack Query", "Vitest", "Tailwind CSS")
2. Call `query-docs` with the returned ID and a specific question (e.g. "how to create a route handler in App Router")

Use context7 for: config file shapes, hook signatures, component props, CLI flags, migration guides between versions.
Do not use context7 for: understanding why a library is architected a certain way, or for questions about a library's internal source code.

This is the enforcement mechanism for the AGENTS.md rule: "This is NOT the Next.js you know." There is no excuse for writing code against stale training-data APIs.

### deepwiki — Codebase architecture intelligence
**When to use:** When docs alone don't explain the underlying behaviour — you need to understand *why* something works the way it does, or how a library's internals are structured.
**How to use:**
1. Call `ask_question` with the GitHub repo (e.g. `vercel/next.js`) and a specific question (e.g. "how does App Router handle server component streaming?")
2. Call `read_wiki_structure` to get an overview of how a repo is organized before diving in
3. Call `read_wiki_contents` to read a specific wiki page for a repo

Use deepwiki for: understanding Next.js middleware execution order, how shadcn's registry CLI works internally, how TanStack Query's cache invalidation is implemented, debugging behaviour that contradicts the docs.
Do not use deepwiki instead of context7 for API reference — deepwiki reads source code, not official docs.

### playwright — Live browser verification
**When to use:** During E2E test authoring and when verifying that a feature works correctly in a real browser before marking it done.
**How to use:** Use playwright MCP tools to navigate the running app, inspect elements, and assert visible state. Start `pnpm dev` first.

Use playwright for: verifying the running app before writing E2E specs, checking that a UI change looks correct, confirming a form submission works end-to-end.

### shadcn — Component registry
**When to use:** From M-002 onward, before installing or composing any shadcn component.
**How to use:** Query the registry to find available components, check their props and variants, and install them into the project.

Required from M-002 onward. Not needed for M-001b.

---

The four MCP servers that must always be connected:
- `context7` — current library API docs
- `deepwiki` — codebase architecture and internals
- `playwright` — live browser verification during E2E work
- `shadcn` — component registry (required from M-002 onward)

### Connecting MCP servers — by tool

Each AI role may use a different tool. The servers are the same; the config file differs.

**Claude Code (AI 1 default):**
Config file: `.mcp.json` at project root — already present. Restart Claude Code or run `/mcp` to verify.

**OpenAI Codex (AI 2):**
Config file: `.codex/config.toml` at project root — already present. Codex picks it up automatically for trusted projects.

**Cursor:**
Copy server entries into `.cursor/mcp.json` using the same `mcpServers` JSON structure as `.mcp.json`.

**VS Code / GitHub Copilot:**
Copy server entries into `.vscode/mcp.json`. Use `"servers"` as the root key instead of `"mcpServers"`. HTTP servers use `"url"`, stdio servers use `"command"` and `"args"` — same values.

**Other tools:**
Check your tool's MCP documentation for the config file location and format. The server URLs and commands in `.mcp.json` are the source of truth.

## Testing Rules

- Every milestone that creates or modifies user-facing logic must include tests.
- Unit and component tests use Vitest + React Testing Library, colocated with the code under test.
- E2E tests use Playwright and live in `e2e/` at the repo root.
- "All automated checks pass" means: `pnpm lint` + `pnpm build` + `pnpm test` + `pnpm test:e2e`.
- AI 1 milestone plans must name the test files AI 2 must produce.

## Documentation Rules

- Every milestone that builds a user-facing feature must produce at least one guide file in `docs/guide/[module]/[workflow].md`.
- Files are written in plain French, from the perspective of an NCM staff member.
- No component names, no endpoint names, no variable names, no technical terms visible to end users.
- Format: H1 = the question this file answers, H2 = steps or sub-topics (200–400 words each), numbered steps with transitions, no tables.
- All NCM-specific terminology defined in parentheses on first use.
- AI 1 milestone plans must name the guide file(s) AI 2 must produce.

## Git Commit Rules

- Use Conventional Commit prefixes for every commit: `feat`, `fix`, `chore`, `refactor`, `test`, or `docs`.
- When a commit belongs to a milestone, include the milestone ID as the scope: `type(m-001b): summary`.
- Write commit summaries in imperative mood and keep them short and specific.
- Infrastructure, setup, and repository maintenance work defaults to `chore(...)` unless a more specific type is clearly correct.
