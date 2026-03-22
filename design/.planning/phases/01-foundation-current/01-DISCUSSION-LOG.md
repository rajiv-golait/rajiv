# Phase 1: Foundation (Current) - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in `01-CONTEXT.md` — this log preserves the auto-selected path for `/gsd-next`.

**Date:** 2026-03-22
**Phase:** 1 — Foundation (Current)
**Mode:** Auto (recommended defaults — no interactive session)
**Areas discussed:** Repository layout, Next + Sanity wiring, schemas, GROQ/data layer, Tailwind baseline

---

## Repository layout

| Option | Description | Selected |
|--------|-------------|----------|
| Keep `falcon-portfolio/` as app root | Planning stays at `falcon_portfolio_src/.planning/` | ✓ |
| Flatten into single folder | Would move app up | |

**User's choice:** [auto] Keep current layout — matches existing tree and ROADMAP execution.
**Notes:** Zero-friction `/gsd-next` run; no live Q&A.

---

## Next.js + Sanity

| Option | Description | Selected |
|--------|-------------|----------|
| Embedded Studio + next-sanity | Matches current `sanity.config.ts` and studio route | ✓ |
| Separate Sanity deployment only | No local studio | |

**User's choice:** [auto] Embedded Studio + env-based project ID for production.
**Notes:** Remove `demoProjectID` placeholder via env vars and `.env.example`.

---

## Schemas

| Option | Description | Selected |
|--------|-------------|----------|
| Full schema set in repo | All types in `sanity/schemas/` | ✓ |
| Minimal schema, expand later | Fewer types now | |

**User's choice:** [auto] Retain and validate full schema list aligned with queries.

---

## GROQ / client

| Option | Description | Selected |
|--------|-------------|----------|
| Single client + `queries.ts` | Current pattern | ✓ |
| Split clients per domain | More files | |

**User's choice:** [auto] Keep centralized `sanity.ts` and `queries.ts`.

---

## Tailwind

| Option | Description | Selected |
|--------|-------------|----------|
| Tailwind v4 + PostCSS | Current toolchain | ✓ |
| Downgrade or CSS Modules only | N/A | |

**User's choice:** [auto] Stay on v4; defer full design-system extraction to section polish phases.

---

## Claude's Discretion

- Exact env variable names if conventions appear elsewhere in the repo during execution.

## Deferred Ideas

- See `<deferred>` in `01-CONTEXT.md`.
