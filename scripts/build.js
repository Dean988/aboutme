// Compile src/app.src.jsx → app.js using @babel/standalone (no toolchain needed).
// Run:  node scripts/build.js
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const srcPath = path.join(root, 'src', 'app.src.jsx');
const outPath = path.join(root, 'app.js');

const babel = require('@babel/standalone');

const src = fs.readFileSync(srcPath, 'utf8');

const banner = `/* DINO Portfolio v3.0 — bundled at ${new Date().toISOString()}\n * Source: src/app.src.jsx (do not edit app.js directly).\n */\n`;

const out = babel.transform(src, {
  presets: ['react'],
  // Avoid inserting "use strict" at top — we want it as a single IIFE-friendly script.
  sourceType: 'script',
  compact: false,
  comments: false,
});

fs.writeFileSync(outPath, banner + out.code, 'utf8');
console.log(`Built ${outPath}  (${out.code.length} bytes)`);
