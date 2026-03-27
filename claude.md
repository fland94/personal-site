# claude.md — Federico Landozzi Personal Site

## Project overview

This is my personal website and portfolio. It serves as a professional presentation of my background, skills, and projects. The tone should feel clean, modern, and credible — professional but not corporate.

The site is built with plain HTML5, CSS3, and JavaScript (Tailwind via CDN). It is deployed on Vercel via a GitHub CI/CD pipeline. No build step, no framework, no bundler. Keep it that way unless there is a clear and specific reason to change.

Pages: **Home**, **About Me**, **Projects**, **Contact**.

---

## About me

**Federico Landozzi** — Project Manager, Rome, Italy.

**Academic background:**
- Bachelor's in Economics & Business, LUISS University, 2018
- First-Level Master's in Data Analytics & Digital Marketing, LUISS Business School, 2019 — 30/30
- Master's in Marketing, Customer Engagement & Relationship Management, LUISS University, 2021 — 110/110 cum laude

**Professional background:**
- Waiter, pub in Rome, 2015–2017 (while studying)
- Marketing Intern, Procter & Gamble, 2020
- Career Factory Consultant, LUISS, 2021
- Intern → Junior Project Manager, Publicis Sapient, 2021–present

**Current role:** Junior Project Manager at Publicis Sapient. I work in a consulting environment focused on web operations for a multinational automotive client. My focus areas are digital operations, process optimization, and delivery quality.

**Current role:** Junior Project Manager at Publicis Sapient. I work in a consulting environment focused on web operations for a multinational automotive client. My focus areas are digital operations, process optimization, and delivery quality.

**Skills and learning path:** Python (data analysis), R (basic), KNIME, HTML5/CSS3/JavaScript, Node.js, React, Web3 (exploratory), data analytics, ML foundations, AI-assisted workflows, automation.

**Mindset:** A PM gets better by combining process, delivery, and technical understanding. I value technical skills because they improve collaboration, clarity, and decision-making. I prefer practical, maintainable solutions. I learn by building.

---

## Working principles

- **Simplicity first.** Prefer the simplest solution that works well. Avoid overengineering.
- **Incremental.** Improve the site in small, stable steps. Never rewrite everything at once.
- **Readable code.** Keep HTML/CSS/JS clean and modular. Comments where non-obvious.
- **No unnecessary dependencies.** Only introduce a library or tool if it clearly improves maintainability or capability.
- **Preserve visual quality.** The design should remain polished after every change.
- **Separate content from presentation.** Especially in the Projects section.

---

## Technical preferences

| Area | Preference |
|---|---|
| Styling | Tailwind CSS (CDN, class-based) |
| Icons | Material Symbols Outlined (Google CDN) |
| Fonts | Inter (Google Fonts) |
| Deployment | Vercel, triggered by push to `main` on GitHub |
| Dark mode | Class-based (`dark:` prefix), toggled via JS, persisted in `localStorage`, defaults to system preference |
| Images | Optimised PNG or SVG in `images/` folder |
| Projects data | `projects.json` (current) → Markdown files (target, see below) |

**Do not introduce:** npm, webpack, Vite, React, Next.js, or any build pipeline unless explicitly requested and justified.

---

## File structure

```
/
├── index.html
├── about_me.html
├── projects.html
├── contact_me.html
├── projects.json          ← derived file (DO NOT treat as source of truth)
├── favicon.svg
├── favicon-96x96.png
├── favicon.ico
├── apple-touch-icon.png
├── web-app-manifest-192x192.png
├── web-app-manifest-512x512.png
├── site.webmanifest
├── images/
│   ├── avatar.svg
│   └── projects/          ← project thumbnails
├── projects/              ← source of truth for project content
│   └── YYYY-MM_slug.md
└── build-projects.js      ← optional: generates projects.json from /projects/
```

---

## Projects section — Markdown → HTML workflow

The goal is to keep project content easy to write and edit, without touching HTML directly.

### Content architecture

Project entries live in `/projects/` as individual Markdown files.

**Naming convention:** `YYYY-MM_short-slug.md`
Examples: `2025-03_personal-site.md`, `2024-11_churn-model.md`

**Frontmatter fields (YAML):**

```yaml
---
title: "Project title"
date: "2025-03"              # YYYY-MM, used for sorting and display
status: "published"          # published | draft
summary: "One or two sentences. What it is and why it matters."
context: "Where/why this project happened."
tools: [HTML, CSS, JavaScript, Python]
link: "https://..."          # optional: live URL
repo: "https://github.com/..." # optional: GitHub repo
thumbnail: ""                # optional: path to image in /images/projects/
---
```

**Body sections (Markdown):**

```markdown
## What I did
Describe your role and actions concretely. Be specific.

## Outcome
What was the result? What changed or improved?

## Key learnings
What did you take away from this? Keep it honest and specific.
```

### Render approach

`projects.html` fetches and renders project cards dynamically via JavaScript.

**Current implementation:** reads `projects.json` directly.

**Target implementation:** a lightweight JS script (or a simple Node.js build script run locally) that:
1. reads all `*.md` files in `/projects/`
2. parses frontmatter + body
3. writes/updates `projects.json`

Until a build script is in place, `projects.json` can be updated manually or via Claude Code when a new project Markdown file is added.

**Do not over-engineer this.** A single `build-projects.js` script that runs with `node build-projects.js` locally before push is sufficient. No watcher, no CI step needed for now.

---

## Project entry style guide

Write project descriptions as a senior professional would — concrete, outcome-oriented, and honest. Not a press release.

**Do:**
- Start with what the project was and what problem it solved
- Name specific tools, methods, and results
- Quantify outcomes where possible (even rough numbers are better than none)
- Keep summaries to 1–2 sentences
- Use active voice

**Don't:**
- Use generic buzzwords without substance ("leveraged synergies", "innovative solution", "seamless experience")
- Overstate scope or impact
- Write in the third person
- Use corporate passive voice

**Tone:** semi-professional, direct, editorial. Think of how a good engineer or PM writes in a README or case study — clear, purposeful, no fluff.

---

## Sample project Markdown template

```markdown
---
title: "Personal Portfolio Site"
date: "2025-03"
status: "published"
summary: "End-to-end design and development of this personal website, built from scratch with HTML, CSS, and JavaScript."
context: "Personal project. Built to consolidate front-end skills and create a professional online presence."
tools: [HTML5, CSS3, JavaScript, Tailwind, Vercel, GitHub]
link: "https://federico-landozzi-live-cv.vercel.app"
repo: "https://github.com/fland94/personal-site"
thumbnail: ""
---

## What I did
Designed and built a four-page static site from scratch. Implemented a CI/CD pipeline via GitHub and Vercel. Added dark mode with system-preference detection and localStorage persistence. Built a dynamic Projects section driven by a JSON data file. Created a custom flat-style SVG favicon with automatic light/dark switching.

## Outcome
A live, deployed personal portfolio used as a professional reference and a testbed for front-end experimentation.

## Key learnings
Managing a clean dark mode implementation across multiple pages requires a disciplined token system from the start. Keeping content (JSON/Markdown) separate from presentation pays off immediately when updating entries.
```

---

## Instructions for Claude Code

When working on this project:

1. **Read this file first.** Use it as the source of truth for project context, preferences, and constraints.
2. **Suggest minimal solutions.** If there are two ways to solve something, propose the simpler one first and mention the trade-off.
3. **Explain briefly when making choices.** One sentence is enough. ("Using fetch instead of XMLHttpRequest — simpler, same browser support target.")
4. **Preserve existing patterns.** Match the naming conventions, class patterns, and file structure already in place.
5. **Don't change things that aren't broken.** If the task is to add a feature, don't refactor unrelated code at the same time.
6. **Keep dark mode consistent.** Every new element needs both light and dark variants. Follow the existing color token pattern (`bg-[#f8f9fa] dark:bg-[#0f172a]` etc.).
7. **When adding a project:** parse or create the Markdown file in `/projects/`, update `projects.json` accordingly, and confirm the card renders correctly in `projects.html`. Order in `projects.json` does not matter — the renderer sorts by `date` descending (most recent first) automatically.
8. **When refactoring content:** preserve tone and meaning. Do not add marketing language or inflate claims.
9. **When asked to generate project entries from raw notes:** apply the style guide above. Ask for clarification if the outcome or impact is unclear.
10. **When suggesting future improvements:** flag them as optional and don't implement them unless asked.

---

## Future scalability (optional, not urgent)

These are possible evolutions — do not implement proactively:

- `build-projects.js`: a local Node.js script to auto-generate `projects.json` from Markdown files in `/projects/`
- SEO: Open Graph meta tags, sitemap.xml
- Contact form: wire up to Formspree or similar
- Analytics: Vercel Analytics (already free, minimal setup)
- Migration to Next.js: only if SSR/SEO becomes a clear need — not now
