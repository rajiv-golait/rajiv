# Falcon Portfolio — Antigravity Build Instructions

## What You Are Building

A production Next.js 15 portfolio for Rajiv Golait.
- E&TC Engineering Student
- AI/ML Builder, Data Scientist
- Visual Storyteller: shot_by_f.a.l.c.o.n
- SIH 2024 Winner

**Live design reference files are in this folder.**
Each HTML file = one section of the portfolio.
Translate them to Next.js + Tailwind + Sanity.

---

## Tech Stack

- **Framework**: Next.js 15 (App Router, TypeScript)
- **Styling**: Tailwind CSS v4
- **CMS**: Sanity.io (embedded at /studio)
- **Animations**: Framer Motion (page transitions, scroll reveals)
- **Fonts**: Google Fonts (already in HTML files)
- **Deploy**: Vercel

---

## Project Structure to Scaffold

```
falcon-portfolio/
├── app/
│   ├── layout.tsx              # Root layout, fonts, nav
│   ├── page.tsx                # Main scroll page (all sections)
│   ├── projects/[slug]/        # Project detail
│   ├── gallery/[slug]/         # Gallery item detail
│   ├── studio/[[...tool]]/     # Sanity Studio
│   └── api/
│       ├── sync/github/        # GitHub sync endpoint
│       └── revalidate/         # Sanity webhook ISR
├── components/
│   ├── sections/               # One component per section
│   │   ├── Hero.tsx
│   │   ├── Stats.tsx
│   │   ├── Projects.tsx
│   │   ├── Arsenal.tsx
│   │   ├── Experience.tsx
│   │   ├── IntelMissions.tsx
│   │   ├── TheShift.tsx
│   │   ├── Gallery.tsx
│   │   └── Contact.tsx
│   ├── ui/                     # Reusable: ComicCaption, ProjectCard, etc.
│   └── layout/                 # Nav, Footer
├── lib/
│   ├── sanity.ts               # Sanity client
│   └── queries.ts              # All GROQ queries
├── sanity/
│   └── schemas/                # All schema files
│       ├── project.ts
│       ├── galleryItem.ts
│       ├── certification.ts
│       ├── achievement.ts
│       ├── experience.ts
│       ├── skill.ts
│       └── siteSettings.ts
└── constants/
    └── site.ts                 # Hardcoded constants
```

---

## CRITICAL RULE: What Is Hardcoded vs Sanity

### Hardcoded in constants/site.ts — NEVER in Sanity:
```typescript
export const SITE = {
  name: "Rajiv Golait",
  alias: "shot_by_f.a.l.c.o.n",
  tagline: "ENGINEER BY LOGIC. shot_by_f.a.l.c.o.n BY INSTINCT.",
  bio: "I solve problems with data and AI. Then I pick up a camera.",
  degree: "B.E. — Electronics & Telecommunication",
  collegeStart: 2022,
  collegeEnd: 2026,
  githubUsername: "rajiv-golait",
  hackathonDuration: 36,
  nationalWins: 1,
}
```

### Everything else comes from Sanity:
- CGPA (changes each semester)
- Projects (title, desc, images, tags, links, featured flag)
- Certifications
- Achievements
- Experience entries
- Gallery items (photos, reels)
- Skills (add as you learn)
- Resume file URL

---

## Sanity Schemas

### siteSettings (singleton)
Fields: cgpa (number), resumeFile (file), 
        githubUrl, linkedinUrl, instagramUrl, falconInstagram, email

### project
Fields: title, slug, tagline, description (richText),
        thumbnail (image), images[] (image array),
        architectureDiagram (image),
        techStack[] (string array),
        category (select: ai-ml | data | hardware | hackathon),
        githubUrl, liveUrl,
        isFeatured (boolean), isVisible (boolean),
        source (select: manual | github),
        githubRepoId (number, hidden — for dedup),
        order (number)

### certification
Fields: title, issuer, issueDate (date),
        credentialUrl, badgeImage (image),
        isVisible (boolean), order (number)

### achievement
Fields: title, event, position (string),
        date, description,
        isFeatured (boolean), isVisible (boolean)

### experience
Fields: company, role, startDate, endDate (nullable = Present),
        description, techTags[] (string array),
        order (number)

### galleryItem
Fields: title, type (select: photo | reel | cinematic | bts),
        aspectRatio (select: 16:9 | 4:5 | 9:16 | 1:1),
        image, videoUrl (for reels),
        location, captureDate,
        isVisible (boolean), order (number)

### skill
Fields: name, zone (select: ai-ml | data | etc | tools),
        proficiency (select: built-with | comfortable | exploring),
        isVisible (boolean)

---

## Design System — Translate From HTML Files

Read each HTML file in this folder.
Extract the exact CSS variables, colors, and component patterns.
Implement as Tailwind config + CSS variables.

Key values from DESIGN.md:
- Background void: #050510
- Card surface: #0e0e1a
- Primary neon: #ff1493
- Secondary neon: #4d2dff
- Purple accent: #9b30ff
- Comic captions: #ffd700 (yellow)

All cards: 3px comic border (#1a1a35), one asymmetric corner.
No soft shadows. Hard 3px flat offset shadows only.
No rounded 20px cards. No cyan. No teal.

---

## Build Order

### Phase 1: Foundation
1. npx create-next-app@latest falcon-portfolio --typescript --tailwind --app
2. npm create sanity@latest (embedded at /studio)
3. Define ALL schemas above
4. Set up Sanity client in lib/sanity.ts
5. Write all GROQ queries in lib/queries.ts
6. Set up Tailwind config with design tokens
7. Populate 3-4 test items in Sanity Studio

### Phase 2: Sections (translate HTML → components)
8. Build Nav component (transparent, RAJIV wordmark, links)
9. Hero section — pixel match to hero HTML file
10. Stats section — 4 floating cards from Sanity siteSettings
11. Projects section — featured + grid, all from Sanity
12. Arsenal section — constellation network, skills from Sanity
13. Experience section — timeline from Sanity
14. Intel + Missions — certs + achievements from Sanity
15. The Shift — static, no CMS needed
16. Gallery — masonry grid from Sanity galleryItems
17. Contact — form + social links from siteSettings

### Phase 3: Dynamic Routes
18. /projects/[slug] — full project detail
19. /gallery/[slug] — lightbox detail page

### Phase 4: CMS Integration
20. GitHub sync API route /api/sync/github
21. Sanity webhook → /api/revalidate (ISR)
22. "Sync GitHub" button in Sanity Studio

### Phase 5: Polish
23. Framer Motion page load animations
24. Scroll reveal on section entry
25. Filter functionality on projects + gallery
26. Mobile responsive pass
27. SEO metadata per page
28. Deploy to Vercel

---

## Animation Rules

Use Framer Motion for:
- Staggered card reveals on scroll
- Page load sequence (hero first, then elements stagger in)
- Filter transitions on projects grid (layout animations)
- Gallery hover states

The Shift section: CSS only. No JS needed. Pure cinematic.

---

## GitHub Sync Logic

POST /api/sync/github:
1. Fetch all public repos from rajiv-golait
2. For each repo: check if githubRepoId exists in Sanity
3. If new: create project doc with status "imported", source "github"
4. Map: name→title, description→tagline, html_url→githubUrl,
        stargazers_count→githubStars, language→githubLanguage
5. NEVER auto-publish. status stays "imported" until manually approved.
6. Return summary: {imported: N, skipped: N, errors: []}

---

## GROQ Queries Needed

```groq
// Published projects (for grid)
*[_type == "project" && isVisible == true] | order(isFeatured desc, order asc)

// Featured project only  
*[_type == "project" && isFeatured == true && isVisible == true][0]

// Projects by category
*[_type == "project" && category == $cat && isVisible == true]

// Project by slug
*[_type == "project" && slug.current == $slug][0]

// All certifications
*[_type == "certification" && isVisible == true] | order(order asc)

// All achievements  
*[_type == "achievement" && isVisible == true] | order(isFeatured desc)

// Experience timeline
*[_type == "experience"] | order(order asc)

// Gallery items
*[_type == "galleryItem" && isVisible == true] | order(order asc)

// Gallery by type
*[_type == "galleryItem" && type == $type && isVisible == true]

// Skills by zone
*[_type == "skill" && isVisible == true] | order(zone asc)

// Site settings
*[_type == "siteSettings"][0]
```

---

## Stitch HTML Files — Section Mapping

| File | Next.js Section |
|------|----------------|
| hero_stats_projects.html | Hero + Stats + Projects |
| arsenal.html | Arsenal (skills constellation) |
| experience.html | Experience timeline |
| intel_missions.html | Certifications + Achievements |
| the_shift.html | The Shift (static) |
| gallery.html | Shot by Falcon gallery |
| contact.html | Comms Relay contact |
| DESIGN.md | Tailwind config + CSS variables |

Translate each HTML file section by section.
Do NOT invent new design. Pixel-match the HTML.
The Stitch files ARE the design spec.

---

## Start Command

```
npx create-next-app@latest falcon-portfolio --typescript --tailwind --app --src-dir false
cd falcon-portfolio
npm create sanity@latest
```

Then read each HTML file and translate section by section.
