# SPEC.md — Product Specification

**Status:** Active foundation spec as of 2026-04-18

> SPEC.md is the only authoritative description of what this product does.
> Nothing is built that is not in SPEC.md.
> Changes to SPEC.md require a DECISIONS.md entry explaining why.

---

## Product

Nejme Chamal Messagerie is a French-language enterprise logistics frontend for a Moroccan cargo network.
This repo rebuilds the frontend from scratch while keeping the existing production backend at `https://ncapi.digitalbang.ma`.

`NCM_REFERENCE.md` remains the canonical reference for the business modules and verified backend endpoints.
This file defines what this rebuild is trying to achieve and what is currently in scope.

---

## Rebuild Goal

Build a maintainable, modern frontend for NCM that:

- preserves the verified business scope from `NCM_REFERENCE.md`
- uses a token-driven design system with app-owned UI primitives
- keeps backend integration aligned with the live API
- is developed milestone by milestone with explicit plans, checks, and browser-test gates where applicable

---

## Confirmed Technical Baseline

The current repo baseline is:

- Next.js 16.2.4 with App Router
- React 19.2.4
- TypeScript
- Tailwind CSS v4
- ESLint
- Official Next.js-generated `AGENTS.md` / `CLAUDE.md` structure, with project rules layered on top

Additional implementation libraries may be introduced only through milestone planning and `DECISIONS.md` where needed.

---

## In Scope

- Rebuild the NCM frontend only
- Connect to the existing live backend API without changing backend endpoints
- Create a shared design system based on tokens and app-owned primitives
- Build a typed BFF (Backend-for-Frontend) API layer using Next.js Route Handlers — the backend URL is never exposed in the browser network tab
- Recreate the required business modules listed in `NCM_REFERENCE.md`
- Automated testing at three layers: unit (Vitest + React Testing Library), integration (Vitest), and E2E (Playwright)
- French-language user guide documentation in `docs/guide/` produced alongside every user-facing milestone, for indexing into the RAG chatbot corpus
- Progress through small milestones that can be completed, verified, and reviewed in one session

---

## Out of Scope

- Backend code changes
- Inventing new business modules outside `NCM_REFERENCE.md`
- Reusing old `NCM-FrontEnd` code patterns, abstractions, or copied implementation
- Adopting Redux, RTK Query, or SWR as defaults without a superseding decision in `DECISIONS.md`
- Exposing `BACKEND_API_URL` or any backend credential to the client bundle or browser network tab
- Documentation written in any language other than French, or using technical terms visible to end users

---

## Current Phase

The repo is in the foundation phase.

What already exists:

- verified product and API reference
- role skills and continuity documents
- frontend architecture baseline
- official Next.js scaffold with working lint and production build

What does not exist yet:

- production feature implementation
- finalized module-by-module delivery plan
- agreed implementation plan for the first real UI milestone

---

## Next Delivery Target

The next implementation milestone is the design-system foundation on top of the current Next.js scaffold.

That milestone should establish:

- initial design tokens
- core shared primitives such as button, input, card, and layout shell
- project folder conventions for feature code and shared UI
- a minimal app shell that proves the design-system contract is real

Detailed acceptance criteria for that milestone belong in `MILESTONE_LOG.md` and the AI 1 implementation plan.
