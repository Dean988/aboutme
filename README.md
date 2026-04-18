# PLAYER_01 — AI Engineer & Data Scientist

A retro-gaming personal portfolio built as a single, self-contained HTML file. Black & white CRT aesthetic, scroll-driven world map, pixel-art animations. English copy.

Live file: [`portfolio.html`](./portfolio.html)

## Concept

The portfolio is framed as a game adventure. As you scroll, a fixed full-viewport world-map canvas morphs through five biomes, a pixel cat sprite walks along a winding SVG path, and each section is a "World" or "Level".

## Sections

- **START** — hero with press-start screen, glitch title, typewriter boot terminal, and a live neural-network background
- **WORLD 1 — ACADEMIC PATH** — three level cards, all 110/110 CUM LAUDE
  - LVL 01 · Humanities Bachelor's
  - LVL 02 · Master's in Social Data Science
  - LVL 03 · Master's in Artificial Intelligence
- **WORLD 2 — CLASS** — AI Engineer / Data Scientist card + pip-level skill tree
- **WORLD 3 — SERVICES** — six tiered service cards (CORE / RARE / EPIC / LEGENDARY): ML Model Development, LLM & NLP Solutions, Data Analysis & Insights, Data Pipelines & MLOps, AI Ethics & Audits, Consulting & Strategy
- **WORLD 4 — INVENTORY** — contact slots for LinkedIn / GitHub / Email

## Visual system

- Palette: pure black & white with grayscale mids
- CRT overlay: scanlines, flicker, vignette
- Fonts: **Press Start 2P** (display), **VT323** (body), **JetBrains Mono** (labels)
- Custom crosshair cursor with `mix-blend-mode: difference`

## Animations

- Fixed full-page world-map canvas that morphs biome-by-biome with scroll (neural net → academic library → dungeon → shop → final zone)
- Scroll-driven SVG path with a pixel cat sprite following waypoints
- HUD progress bar, blinking REC, pulsing hearts, auto-incrementing score
- Glitch pulses on zone titles
- Spark bursts around 110L grade badges
- Stat bars and stepped reveal animations on scroll
- Marquee tickers (alternating direction, inverted colors)
- Hover states: invert, sparkles, pulse borders, border-sweep on service cards

## Running it

No build step, no dependencies — it's a single HTML file.

```bash
# open directly in a browser
open portfolio.html

# or serve locally
python -m http.server 8000
# then visit http://localhost:8000/portfolio.html
```

Google Fonts are loaded from the CDN at runtime.

## Responsive

Fully responsive on mobile and desktop: HUD simplifies on small screens, grids collapse to single columns, the sprite and canvas scale.

---

*Status: SYSTEM.ONLINE*
