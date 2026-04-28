# DINO — Retro Portfolio v3.0

A retro-gaming portfolio for **Dino De Midio** — AI Engineer & Data Scientist.

CRT scanlines + synthwave + pixel art. Boot screen → title screen → scrollable
overworld with a pixel cat character → AI Dimension projects → contact slots.

## Stack

Static site. React 18 (UMD) is loaded from CDN; the JSX is **pre-compiled
locally** with `@babel/standalone` and shipped as plain `app.js` — no Babel
runtime, no transpile cost in the browser. Deployed on Vercel.

## Files

- `index.html` — entry point (loads `app.js`)
- `app.js` — compiled bundle (do not edit by hand)
- `src/app.src.jsx` — readable JSX source
- `scripts/build.js` — recompiles `src/app.src.jsx` → `app.js`
- `styles.css` — palette, CRT effect, content-visibility, mobile media queries
- `animations.css` — keyframes for teleport effects
- `vercel.json` — SPA rewrite + security headers

## Rebuild after editing the source

```sh
node scripts/build.js
```

The script needs `@babel/standalone` available (install once with
`npm i @babel/standalone`).

## Local preview

```sh
python -m http.server 8000
```

Then open <http://localhost:8000>.

## Contact

- GitHub: <https://github.com/Dean988>
- LinkedIn: <https://www.linkedin.com/in/dinode/>
- Email: <diemidiodino@gmail.com>
