# FRONTEND_ARCHITECTURE.md — Frontend Architecture Baseline

**Status:** Active guidance as of 2026-04-18
**Scope:** Design system, UI state, server state, and API-fetching strategy for the NCM rebuild

---

## Purpose

This document turns the April 2026 research into an explicit frontend architecture baseline for NCM.
If a future session wants to replace any part of this baseline, add a superseding entry to `DECISIONS.md` first.

---

## Decision Summary

- Build a token-driven design system with app-owned UI primitives.
- Centralize shared visuals in primitives like `Button`, `Input`, `Select`, `Badge`, `Card`, and `Table`.
- Use semantic design tokens as the single source of truth for colors, spacing, typography, radius, shadows, and motion.
- Use Next.js server-first data fetching for initial page data and low-interaction read paths.
- Use TanStack Query for client-side server state: mutations, cache invalidation, optimistic updates, polling, background refresh, and interactive dashboards.
- Use React local state first for ephemeral UI state.
- Use reducer plus context only for shared client UI state that truly spans distant parts of the tree.
- Use form-local state for drafts and validation, with schema validation at API boundaries.
- Use URL search params for filter, sort, pagination, and other shareable navigation state.
- Do not adopt Redux, RTK Query, or SWR as defaults for this rebuild.

---

## What "Change Buttons In One Place" Means

If the founder wants button styling to change everywhere from one place, the app must not style buttons ad hoc in pages or feature folders.

The required structure is:

- Design tokens define semantic values such as `color.action.primary.background` and `radius.control.md`.
- The shared `Button` primitive consumes those tokens.
- Feature components compose the `Button` primitive and choose only approved variants, sizes, and states.
- Pages never define their own brand button styling outside the design-system surface area.

This is the difference between a reusable component library and a real design system.

---

## Design System Rules

- Tokens come first. Components consume tokens; pages do not consume raw visual values directly.
- Shared primitives are app-owned even if they wrap a third-party primitive library.
- Any third-party primitive library must sit behind NCM-owned components so the visual contract stays local to this repo.
- Variants, sizes, states, and accessibility behavior live in the primitive layer, not in page code.
- New UI work must prefer composition over one-off restyling.
- Accessibility states are not optional: focus, disabled, loading, pressed, invalid, and hover states must be standardized at the primitive level.
- A design-system change is global by default. Feature-level overrides require an explicit reason.

---

## State Model

Treat state as separate categories instead of forcing one library to handle all of it.

### 1. Server State

Use for backend-owned data such as expeditions, voyages, caisse records, users, dashboards, and lookup lists fetched from the live API.

Default tool:

- Next.js server `fetch` for initial render and low-interaction reads
- TanStack Query for client-side reads and mutations that need caching, invalidation, refetching, optimistic UI, or background sync

### 2. Client UI State

Use for UI-only concerns such as open panels, wizard steps, local toggles, selected tabs, row selection, modal visibility, and temporary screen interactions.

Default tool:

- React `useState` for local state
- Reducer plus context only when several distant components must share the same UI-only state

### 3. Form Draft State

Use for editable inputs before submission.

Default tool:

- Form-local state
- Schema validation at submit boundaries

### 4. URL State

Use for shareable and reload-safe state such as filters, sorting, pagination, and search.

Default tool:

- URL search params

---

## What We Are Not Standardizing On

- No Redux by default. It adds coordination cost that is not justified until the app proves it has large, long-lived, cross-cutting client-only state.
- No RTK Query by default. It is most attractive when Redux is already a required foundation.
- No SWR by default. It is a solid library, but TanStack Query is a better fit for mutation-heavy enterprise flows with richer cache control.
- No direct backend fetching from random leaf components.
- No page-level duplication of core control styling.

---

## API and Data-Fetching Rules

- All backend communication must pass through a shared API layer owned by the app.
- Client components should consume typed query hooks or clearly named service functions, not embed raw request logic inline.
- Mutations must define how cache invalidation happens.
- Interactive screens that create, update, cancel, dispatch, receive, or reconcile records should default to TanStack Query mutations.
- Read-only initial page loads should prefer server-first fetching.
- If data must stay fresh while the user remains on a screen, define the refresh strategy explicitly: manual refetch, invalidation after mutation, polling, or focus/reconnect refresh.
- Query keys must be stable and centralized enough that invalidation stays predictable.
- Validation belongs at API boundaries, not only in the UI.

---

## Decision Matrix

- Use server `fetch` when the data is needed for first paint, mostly read-only, or naturally belongs to the route render.
- Use TanStack Query when the data is client-driven, mutation-heavy, refresh-sensitive, or shared across interactive widgets.
- Use React local state when the concern dies with the component.
- Use reducer plus context when UI-only state must be shared across distant client components.
- Use URL params when the state should survive refresh, deep links, or copy-paste sharing.

---

## Implementation Consequences

- The repo should expose a clear primitive layer for shared UI and a clear API layer for backend access.
- Button, input, table, badge, and similar controls should be owned centrally before feature work starts multiplying.
- Future milestone plans should name which state bucket each concern belongs to instead of saying "use state management" generically.
- Any proposal to add Redux, SWR, or RTK Query must justify why the default model is insufficient.

---

## API Layer Architecture

All backend communication is hidden from the browser. The backend base URL (`BACKEND_API_URL`) lives in a server-only environment variable and is never included in the client bundle or visible in the browser network tab.

### Server Components
Call the backend directly via server-side `fetch()`. These calls happen on the server and are invisible to the browser by definition. Use for initial page data and read-only routes that do not need client interactivity.

### Client Components
Never call the backend directly. Instead they call typed Next.js Route Handlers via TanStack Query. The browser network tab shows only `/api/[domain]` — never the real backend.

### Route Handlers (BFF Layer)
Location: `app/api/[domain]/route.ts` — one file per backend resource domain.

Each Route Handler:
- Validates the incoming request body or query params with Zod
- Attaches auth credentials from the server-side session cookie before calling the backend
- Calls `BACKEND_API_URL/api/[Resource]` server-side
- Returns a typed response

### Shared Types
`app/api/[domain]/types.ts` holds the TypeScript types shared between the Route Handler and its corresponding TanStack Query hook. This is the single source of truth for the shape of data crossing the BFF boundary.

### Query Keys
Centralized in `lib/query-keys.ts`. Never inline query keys in hooks. This keeps cache invalidation predictable.

### Naming Conventions
- Query hooks: `use[Domain]Query` (e.g., `useExpeditionsQuery`)
- Mutation hooks: `use[Domain]Mutation` (e.g., `useCreateExpeditionMutation`)
- Route Handler files: `app/api/[domain]/route.ts`

### Environment Variables
- `BACKEND_API_URL` — server-only, never prefixed with `NEXT_PUBLIC_`
- A `.env.local.example` file must list every required server-side env var
- `.env.local` is gitignored and never committed

---

## Testing Architecture

Three layers, all required:

- **Unit / component tests:** Vitest + React Testing Library. Colocate test files with the code: `[file].test.ts` / `[component].test.tsx`.
- **Integration tests:** Vitest. Test Route Handlers and service functions with real logic but mocked HTTP.
- **E2E tests:** Playwright. Located in `e2e/` at repo root.
- **Commands:** `pnpm test` (Vitest), `pnpm test:e2e` (Playwright).
- Every milestone exit condition includes these checks passing.

---

## RAG Documentation

Every user-facing feature milestone produces one or more guide files in `docs/guide/[module]/[workflow].md`.

Rules:
- Plain French, staff perspective, no technical terms
- One file per user workflow (not per module)
- H2 sections target 200–400 words each for optimal RAG chunk size
- No tables — use nested bullet lists
- Session starters at the top of each section
- Brief summary after each H2 before list items
- Define NCM-specific terms in parentheses on first use

See `DECISIONS.md` for the full format specification.

---

## Research Basis

This baseline is grounded in primary or maintainer-run sources reviewed on 2026-04-18:

- React docs on state patterns and data fetching: https://react.dev/learn/scaling-up-with-reducer-and-context and https://react.dev/learn/synchronizing-with-effects
- Next.js docs on server and client data fetching: https://nextjs.org/docs/app/getting-started/fetching-data and https://nextjs.org/docs/pages/building-your-application/data-fetching/client-side
- TanStack Query docs: https://tanstack.com/query/latest/docs/framework/react/overview and https://tanstack.com/query/v4/docs/framework/react/guides/does-this-replace-client-state
- Redux Toolkit RTK Query docs: https://redux-toolkit.js.org/rtk-query/overview
- SWR docs: https://swr.vercel.app/
- Untitled UI design-system article: https://www.untitledui.com/blog/what-is-a-design-system
- Atlassian design tokens: https://atlassian.design/foundations/tokens/design-tokens/
- Adobe Spectrum design data: https://opensource.adobe.com/spectrum-design-data/
- GOV.UK guidance on extending and modifying components: https://design-system.service.gov.uk/get-started/extending-and-modifying-components/
