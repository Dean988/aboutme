# DINO — Retro Portfolio v3.0

A retro-gaming portfolio for **Dino De Midio** — AI Engineer & Data Scientist.

CRT scanlines + synthwave + pixel art. Boot screen → title screen → scrollable
overworld with a pixel cat character → AI Dimension projects → contact slots.

## Stack

Static site, no build step. React 18 (UMD) + Babel-Standalone served from CDN.
Deployed on Vercel.

## Files

- `index.html` — entry point and bundled JSX
- `styles.css` — base palette, CRT effect, mobile media queries
- `animations.css` — keyframes for teleport effects
- `vercel.json` — SPA rewrite + security headers

## Local preview

Any static server works. For example:

```sh
python -m http.server 8000
```

Then open <http://localhost:8000>.

## Contact

- GitHub: <https://github.com/Dean988>
- LinkedIn: <https://www.linkedin.com/in/dinode/>
- Email: <diemidiodino@gmail.com>
