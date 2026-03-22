# Phase 1: Foundation (Current) - Context

**Gathered:** 2026-03-22
**Status:** Ready for planning

<domain>
## Phase Boundary

Establish and harden the technical foundation: Next.js App Router app (under `falcon-portfolio/`), Sanity Studio embedded at `/studio`, all content schemas defined and registered, GROQ queries and Sanity client wired for the portfolio data model, and Tailwind CSS v4 styling baseline aligned with the Spider-Verse / comic aesthetic described in PROJECT.md. This phase does not build out all section UIs or dynamic routes beyond what is needed to validate the stack.

</domain>

<decisions>
## Implementation Decisions

### Repository layout
- **D-01:** Treat `falcon-portfolio/` as the application root for code, configs, and scripts. Planning artifacts live in parent `.planning/` at `falcon_portfolio_src` root.
- **D-02:** Keep the existing monorepo-style split (planning vs app) rather than flattening directories mid-milestone.

### Next.js + Sanity integration
- **D-03:** Use `next-sanity` and the embedded Studio route pattern already present (`sanity.config.ts`, `src/app/studio/[[...tool]]/page.tsx`).
- **D-04:** Replace placeholder `demoProjectID` in both `sanity.config.ts` and `src/lib/sanity.ts` with environment-driven values (`NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`, and `NEXT_PUBLIC_SANITY_API_VERSION` or equivalent) for real deployments; document required vars in `falcon-portfolio/.env.example`.
- **D-05:** Keep `useCdn: false` for the public client until caching/ISR strategy is finalized in a later phase.

### Schemas (Sanity)
- **D-06:** Maintain the full schema set in `falcon-portfolio/sanity/schemas/`: `siteSettings`, `project`, `certification`, `achievement`, `experience`, `galleryItem`, `skill` — exported via `sanity/schemas/index.ts` into `schemaTypes`.
- **D-07:** Any new fields or document types required by the roadmap must extend these schemas in Phase 1 only if they are foundational to data shape; section-specific presentation belongs to later phases.

### GROQ and data layer
- **D-08:** Centralize published queries in `falcon-portfolio/src/lib/queries.ts` using `groq` from `next-sanity`; add queries only for document types that exist in schemas.
- **D-09:** Keep `src/lib/sanity.ts` as the single `createClient` entry point for the app (plus `urlFor` for images).

### Tailwind and styling
- **D-10:** Stay on Tailwind CSS v4 with the PostCSS pipeline already in the project (`@tailwindcss/postcss`, `tailwindcss` in devDependencies).
- **D-11:** Global aesthetic (halftones, neon, hard shadows, comic language) is defined at PROJECT.md level; Phase 1 ensures tokens/utilities exist so Section phases can reuse them — exact component polish is not blocking.

### Claude's Discretion
- ESLint/TS strictness details, exact env var naming if a convention already exists in the repo, and minor dev-experience scripts (`package.json` scripts) not specified above.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Planning and product
- `.planning/PROJECT.md` — Objective, stack, Spider-Verse design identity
- `.planning/ROADMAP.md` — Phase 1 scope: scaffold, schemas, client + GROQ, Tailwind

### Application (relative to `falcon_portfolio_src/`)
- `falcon-portfolio/package.json` — Dependency versions and scripts
- `falcon-portfolio/sanity.config.ts` — Studio and project wiring
- `falcon-portfolio/sanity/schemas/index.ts` — Schema registration
- `falcon-portfolio/src/lib/sanity.ts` — Browser/client configuration
- `falcon-portfolio/src/lib/queries.ts` — GROQ query definitions

No separate REQ or ADR set — requirements are captured in PROJECT.md, ROADMAP.md, and this CONTEXT.md.

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `src/lib/sanity.ts` — Sanity client and image URL builder; extend with env-based `projectId` / `dataset`.
- `src/lib/queries.ts` — GROQ exports for projects, gallery, certifications, achievements, experience, skills, site settings.
- `sanity/schemas/*.ts` — Per-type schema modules already stubbed for portfolio content.

### Established Patterns
- App Router structure under `src/app/`; Studio mounted under `/studio`.
- Next 16 + React 19 + Tailwind v4 per `package.json`.

### Integration Points
- `src/app/page.tsx` and layout components consume CMS data via queries + client.
- Webhook/API routes under `src/app/api/` for later ISR (Phase 4) — do not rip out in Phase 1.

</code_context>

<specifics>
## Specific Ideas

- Align visual direction with PROJECT.md: “Spider-Verse cinematic,” halftones, async borders, neon glows, hard 3px drop shadows.
- Portfolio already demonstrates section components under `src/components/sections/` — Phase 1 focuses on stack + schemas + queries, not redesigning every section.

</specifics>

<deferred>
## Deferred Ideas

- GitHub sync API behavior and ISR/webhook hardening — ROADMAP Phase 4
- Full Framer Motion polish and SEO — Phase 5
- Rich UI translation from static HTML references — Phase 2

</deferred>

---

*Phase: 01-foundation-current*
*Context gathered: 2026-03-22*
