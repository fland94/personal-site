# FL Portfolio — Design Conventions

## Visual language

Federico Landozzi's portfolio uses a warm, editorial aesthetic. The palette is built on off-white paper tones and near-black ink rather than pure white/black, giving a subtle warmth to all surfaces. Colour is used sparingly — the accent colours (danger red, success green) appear only in functional contexts (form validation).

## Colour tokens

| Token | Light | Dark | Role |
|---|---|---|---|
| `--paper` | `#f6f5f1` | `#121110` | Page background, html/body |
| `--paper-2` | `#efede7` | `#1a1916` | Section backgrounds, footer |
| `--card` | `#fbfaf7` | `#1a1916` | Card surfaces |
| `--ink` | `#1b1a17` | `#f1efe8` | Body text |
| `--ink-soft` | `#36342e` | `#dad7cd` | Secondary text |
| `--muted` | `#56544d` | `#a6a39a` | Supporting labels |
| `--faint` | `#8a8880` | `#74716a` | Placeholders, captions |
| `--line` | `#e2e0d8` | `#2b2925` | Borders, dividers |
| `--line-2` | `#d6d3ca` | `#36332d` | Stronger borders |
| `--danger` | `#a03b28` | `#f08a72` | Error states |
| `--success` | `#2f5d44` | `#95c9ad` | Success states |

Dark mode is activated by `data-theme="dark"` on `:root` (the `html` element). This is the only valid scope — the selector is `:root[data-theme="dark"]`, not a generic `[data-theme]`.

## Typography

Three typefaces, each with a distinct role:

- **Hanken Grotesk** — default sans-serif for body copy, UI labels, navigation. Used at normal weight for prose, medium/semi-bold for emphasis.
- **Newsreader** — serif for pull quotes, the daily-quote card, and any large editorial headline. Italic variant used for quote bodies.
- **JetBrains Mono** — monospace for form field labels (uppercase, tracked), character counters, copyright lines, and any metadata.

## Spacing and layout

- Content is constrained to `max-width: 900px` centred with auto margins.
- Section padding is typically `60px` top, `24px` horizontal.
- Cards use `border-radius: 6px` and a `1px solid var(--line)` border.
- The header is `position: sticky; top: 0` with a backdrop-filter blur and semi-transparent `var(--paper)` background.

## Component tones

- **Header**: full-width sticky bar, brand name in Newsreader, nav in Hanken Grotesk, mobile menu below 900px.
- **DailyQuote**: high-contrast dark card (ink background, paper text) with a Newsreader italic quote — this is the only component that inverts the palette in light mode.
- **ContactForm**: structured with mono uppercase labels, `var(--card)` surface, clear CTA using `.btn-primary` (near-black fill, paper text).
- **Footer**: minimal — name, copyright, two text links. Inherits `--paper-2` background from the page section.

## Buttons

- `.btn-primary`: `background: var(--ink)`, `color: var(--paper)`, uppercase mono label — the strongest action.
- `.btn-secondary`: outlined with `var(--line)` border, ink text — supporting action.

## Writing tone (for prompt.md and AI-generated copy)

Short, direct, no filler. Federico writes as a PM: concrete outcomes over generic descriptions. Form labels and placeholders are plain and instructive. No decorative copy.
