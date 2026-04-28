/* ============================================================
   DINO — RETRO PORTFOLIO v3.0 (optimized)

   Source file. Compiled to app.js via:
     node scripts/build.js
   The browser loads the compiled app.js — no Babel runtime needed.
   ============================================================ */

/* ============================================================
   ENVIRONMENT PROBES — used to scale heavy effects on weak devices
   ============================================================ */
const IS_MOBILE = typeof window !== 'undefined' &&
  (window.matchMedia('(max-width: 768px)').matches ||
   /Mobi|Android/i.test(navigator.userAgent || ''));
const IS_LOW_END = typeof navigator !== 'undefined' &&
  ((navigator.deviceMemory && navigator.deviceMemory < 4) ||
   (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4));
const PREFERS_REDUCED = typeof window !== 'undefined' &&
  window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const PARTICLE_COUNT = PREFERS_REDUCED ? 0 : (IS_MOBILE || IS_LOW_END ? 14 : 40);
const WARP_RING_COUNT = IS_MOBILE || IS_LOW_END ? 5 : 8;
const WARP_FINAL_RINGS = IS_MOBILE || IS_LOW_END ? 4 : 7;
/* Reduced from 20/40 → 12/22: less retinal noise during the warp transition */
const WARP_FINAL_STREAKS = IS_MOBILE || IS_LOW_END ? 12 : 22;

/* ============================================================
   AUDIO
   ============================================================ */
(() => {
const { useState, useEffect, useRef, useCallback, createContext, useContext } = React;

const AudioCtx = createContext(null);

function AudioProvider({ children }) {
  const [muted, setMuted] = useState(true);
  const ctxRef = useRef(null);
  const masterRef = useRef(null);

  const ensureCtx = useCallback(() => {
    if (!ctxRef.current) {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return null;
      try {
        ctxRef.current = new AC();
        const master = ctxRef.current.createGain();
        master.gain.value = 0.0;
        master.connect(ctxRef.current.destination);
        masterRef.current = master;
      } catch (e) { return null; }
    }
    if (ctxRef.current && ctxRef.current.state === 'suspended') {
      try { ctxRef.current.resume(); } catch (e) {}
    }
    return ctxRef.current;
  }, []);

  const sfx = useCallback((kind) => {
    if (muted) return;
    const ctx = ensureCtx();
    if (!ctx) return;
    const t = ctx.currentTime;
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.connect(g); g.connect(masterRef.current);
    if (kind === 'select') {
      o.type = 'square';
      o.frequency.setValueAtTime(523, t);
      o.frequency.exponentialRampToValueAtTime(1046, t + 0.06);
      g.gain.setValueAtTime(0.15, t);
      g.gain.exponentialRampToValueAtTime(0.001, t + 0.12);
      o.start(t); o.stop(t + 0.13);
    } else if (kind === 'warp') {
      o.type = 'sawtooth';
      o.frequency.setValueAtTime(220, t);
      o.frequency.exponentialRampToValueAtTime(1760, t + 0.7);
      g.gain.setValueAtTime(0.18, t);
      g.gain.exponentialRampToValueAtTime(0.001, t + 0.8);
      o.start(t); o.stop(t + 0.85);
    } else if (kind === 'coin') {
      o.type = 'square';
      o.frequency.setValueAtTime(988, t);
      o.frequency.setValueAtTime(1318, t + 0.05);
      g.gain.setValueAtTime(0.13, t);
      g.gain.exponentialRampToValueAtTime(0.001, t + 0.18);
      o.start(t); o.stop(t + 0.2);
    } else {
      o.type = 'square';
      o.frequency.setValueAtTime(880, t);
      g.gain.setValueAtTime(0.15, t);
      g.gain.exponentialRampToValueAtTime(0.001, t + 0.08);
      o.start(t); o.stop(t + 0.1);
    }
  }, [muted, ensureCtx]);

  useEffect(() => {
    if (masterRef.current) {
      try { masterRef.current.gain.value = muted ? 0 : 0.6; } catch (e) {}
    }
  }, [muted]);

  return React.createElement(AudioCtx.Provider, { value: { muted, setMuted, sfx, ensureCtx } }, children);
}

function useAudio() { return useContext(AudioCtx); }

window.AudioProvider = AudioProvider;
window.useAudio = useAudio;
})();

/* ============================================================
   PIXEL CAT — sprite frames pre-rendered to dataURLs
   One <img> element per character; .src swap is cheap.
   ============================================================ */
(() => {
const SPRITE = 16;

const CAT_PALETTE = {
  '.': null,
  k: '#0a0820', o: '#ff8a3d', O: '#cc5e1a', l: '#ffc899',
  m: '#ff2bd6', c: '#00f0ff', e: '#39ff90', E: '#0a0820',
  p: '#ffaad4', w: '#ffffff',
};

const CAT_FRAMES = {
  idle: [
    '................', '..k....k...k....', '..ko..oko.ok....', '..kookOoOokk....',
    '.kooOOoooOOok...', 'kooOleeeleOook..', 'kolepEpepEpoook.', 'kollppppppllook.',
    'kollllpwlllllok.', '.kollllllllok...', '..koolllloook...', '...kkooooookk...',
    '....k.kk.k.k....', '...ok.kk.k.ko...', '..oOk.kk.k.kOo..', '..kk..kk...kk...',
  ],
  walk1: [
    '................', '..k....k...k....', '..ko..oko.ok....', '..kookOoOokk....',
    '.kooOOoooOOok...', 'kooOleeeleOook..', 'kolepEpepEpoook.', 'kollppppppllook.',
    'kollllpwlllllok.', '.kollllllllok.k.', '..koolllloookoo.', '..kkoooooookoOk.',
    '..k..kk....k.k..', '.ok..kk....kko..', 'oOk..kk....k.Oo.', 'kk...kk......kk.',
  ],
  walk2: [
    '................', '..k....k...k....', '..ko..oko.ok....', '..kookOoOokk....',
    '.kooOOoooOOok...', 'kooOleeeleOook..', 'kolepEpepEpoook.', 'kollppppppllook.',
    'kollllpwlllllok.', 'kkollllllllok...', 'oookoolllloook..', 'oOkooooooookk...',
    '.k.k....kk..k...', '.koo...kk..ok...', 'oOk.k..kk..kOo..', 'kk..kk..kk...kk.',
  ],
  blink: [
    '................', '..k....k...k....', '..ko..oko.ok....', '..kookOoOokk....',
    '.kooOOoooOOok...', 'kooOlllllllOook.', 'kolepkpkpkEpook.', 'kollppppppllook.',
    'kollllpwlllllok.', '.kollllllllok...', '..koolllloook...', '...kkooooookk...',
    '....k.kk.k.k....', '...ok.kk.k.ko...', '..oOk.kk.k.kOo..', '..kk..kk...kk...',
  ],
};

// Pre-render every frame ONCE into a dataURL.
const FRAME_URLS = (() => {
  const out = {};
  if (typeof document === 'undefined') return out;
  for (const name in CAT_FRAMES) {
    const c = document.createElement('canvas');
    c.width = SPRITE; c.height = SPRITE;
    const ctx = c.getContext('2d');
    if (!ctx) { out[name] = ''; continue; }
    const data = CAT_FRAMES[name];
    for (let y = 0; y < SPRITE; y++) {
      const row = data[y];
      for (let x = 0; x < SPRITE; x++) {
        const color = CAT_PALETTE[row[x]];
        if (color) { ctx.fillStyle = color; ctx.fillRect(x, y, 1, 1); }
      }
    }
    try { out[name] = c.toDataURL(); } catch (e) { out[name] = ''; }
  }
  return out;
})();

function PixelCharacter({ moving = false, scale = 1, style = {} }) {
  const [frame, setFrame] = React.useState('idle');

  React.useEffect(() => {
    if (moving) {
      let i = 0;
      const tick = setInterval(() => {
        i = (i + 1) % 2;
        setFrame(i === 0 ? 'walk1' : 'walk2');
      }, 140);
      return () => clearInterval(tick);
    }
    let alive = true;
    const blinkLoop = () => {
      if (!alive) return;
      setFrame('idle');
      const next = 2200 + Math.random() * 2500;
      setTimeout(() => {
        if (!alive) return;
        setFrame('blink');
        setTimeout(() => {
          if (!alive) return;
          setFrame('idle');
          blinkLoop();
        }, 140);
      }, next);
    };
    blinkLoop();
    return () => { alive = false; };
  }, [moving]);

  const px = 4 * scale;
  const size = SPRITE * px;
  return (
    <div style={{ position: 'relative', width: size, height: size, ...style }}>
      <div style={{
        position: 'absolute', bottom: -px * 0.5, left: '50%',
        transform: 'translateX(-50%)',
        width: size * 0.6, height: px * 1.5,
        background: 'rgba(0,0,0,0.5)', borderRadius: '50%', filter: 'blur(2px)',
      }} />
      <img src={FRAME_URLS[frame] || FRAME_URLS.idle} alt=""
        width={size} height={size}
        style={{
          display: 'block', imageRendering: 'pixelated',
          width: size, height: size,
        }} />
    </div>
  );
}

window.PixelCharacter = PixelCharacter;
})();

/* ============================================================
   BOOT SCREEN
   ============================================================ */
(() => {
const { useState, useEffect } = React;

function BootScreen({ onComplete }) {
  const [phase, setPhase] = useState('boot');
  const [progress, setProgress] = useState(0);
  const [bootLines, setBootLines] = useState([]);
  const audio = window.useAudio();

  const bootSequence = [
    { t: 80, line: 'NEON-OS v3.0.4 — © 2026 DINO SYS' },
    { t: 200, line: 'POST: CPU... [OK]' },
    { t: 120, line: 'POST: MEMORY 64K x 1024... [OK]' },
    { t: 140, line: 'POST: GPU PIXEL UNIT... [OK]' },
    { t: 180, line: 'LOADING KERNEL.SYS' },
    { t: 200, line: 'MOUNTING /portfolio' },
    { t: 160, line: 'INIT GRAPHICS DRIVER (CRT MODE)' },
    { t: 200, line: 'CHECK: HUMAN.MODULE [OK]' },
    { t: 200, line: 'CHECK: MACHINE.MODULE [OK]' },
    { t: 240, line: 'READY.' },
  ];

  useEffect(() => {
    if (phase !== 'boot') return;
    let cancelled = false;
    let elapsed = 0;
    const out = [];
    bootSequence.forEach((step, i) => {
      elapsed += step.t;
      setTimeout(() => {
        if (cancelled) return;
        out.push(step.line);
        setBootLines([...out]);
        if (i === bootSequence.length - 1) setTimeout(() => setPhase('progress'), 500);
      }, elapsed);
    });
    return () => { cancelled = true; };
  }, [phase]);

  useEffect(() => {
    if (phase !== 'progress') return;
    let p = 0;
    const tick = setInterval(() => {
      p += Math.random() * 6 + 1;
      if (p >= 100) {
        p = 100;
        clearInterval(tick);
        setProgress(100);
        setTimeout(() => setPhase('glitch'), 350);
      }
      setProgress(Math.min(100, Math.floor(p)));
    }, 90);
    return () => clearInterval(tick);
  }, [phase]);

  useEffect(() => {
    if (phase !== 'glitch') return;
    setTimeout(() => setPhase('title'), 800);
  }, [phase]);

  if (phase === 'done') return null;

  return (
    <div style={bootStyles.root}>
      <div style={bootStyles.scanlines} />
      {(phase === 'boot' || phase === 'progress') && (
        <div style={bootStyles.bootBox} className="boot-box">
          <div style={bootStyles.consoleHeader}>
            <span style={{ color: 'var(--neon-cyan)' }}>┌─</span>
            <span> NEON-OS BOOT </span>
            <span style={{ color: 'var(--neon-cyan)' }}>──────────────────────┐</span>
          </div>
          <div style={bootStyles.consoleBody}>
            {bootLines.map((l, i) => (
              <div key={i} style={bootStyles.bootLine} className="boot-line">
                <span style={{ color: 'var(--neon-green)' }}>{'>'}</span>{' '}
                <span style={{ color: 'var(--ink)' }}>{l}</span>
              </div>
            ))}
            {phase === 'progress' && (
              <>
                <div style={{ ...bootStyles.bootLine, marginTop: 16 }} className="boot-line">
                  <span style={{ color: 'var(--neon-green)' }}>{'>'}</span>{' '}
                  <span style={{ color: 'var(--neon-yellow)' }}>LOADING ASSETS... {progress}%</span>
                </div>
                <div style={bootStyles.progressTrack}>
                  <div style={{ ...bootStyles.progressFill, width: `${progress}%` }} />
                </div>
                <div style={{ ...bootStyles.bootLine, color: 'var(--ink-dim)', marginTop: 8 }} className="boot-line">
                  {progress < 30 && 'Decoding pixel assets...'}
                  {progress >= 30 && progress < 60 && 'Synchronizing neural sprites...'}
                  {progress >= 60 && progress < 90 && 'Calibrating CRT geometry...'}
                  {progress >= 90 && 'Almost there...'}
                </div>
              </>
            )}
          </div>
          <div style={bootStyles.consoleFooter}>
            <span style={{ color: 'var(--neon-cyan)' }}>└──────────────────────────────────────┘</span>
          </div>
        </div>
      )}
      {phase === 'glitch' && <GlitchFlash />}
      {phase === 'title' && <TitleScreen onStart={() => { audio?.sfx('select'); onComplete(); }} />}
    </div>
  );
}

function GlitchFlash() {
  return (
    <div style={glitchStyles.root}>
      <div style={glitchStyles.bar1} />
      <div style={glitchStyles.bar2} />
      <div style={glitchStyles.bar3} />
      <div style={glitchStyles.flash} />
    </div>
  );
}

function TitleScreen({ onStart }) {
  const [pressed, setPressed] = useState(false);

  useEffect(() => {
    const handler = (e) => { if (e.code === 'Space' || e.code === 'Enter') triggerStart(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const triggerStart = () => {
    if (pressed) return;
    setPressed(true);
    setTimeout(onStart, 600);
  };

  return (
    <div style={titleStyles.root} className={pressed ? 'title-flash' : ''}>
      <div style={titleStyles.sun}>
        <div style={titleStyles.sunInner} />
        {[...Array(6)].map((_, i) => (
          <div key={i} style={{
            ...titleStyles.sunLine,
            top: `${50 + i * 6}%`, height: `${1 + i * 0.5}px`,
          }} />
        ))}
      </div>
      <div style={titleStyles.gridFloor} />
      <svg viewBox="0 0 1200 200" style={titleStyles.mountains} preserveAspectRatio="none">
        <polygon points="0,200 100,80 200,140 320,40 440,120 560,60 680,130 800,50 920,110 1040,30 1160,100 1200,200" fill="#1a0a3a" stroke="#ff2bd6" strokeWidth="2"/>
        <polygon points="0,200 80,140 180,170 280,110 400,160 520,120 640,165 760,100 880,150 1000,90 1120,140 1200,200" fill="#0a0820" stroke="#00f0ff" strokeWidth="1" opacity="0.7"/>
      </svg>
      <div style={titleStyles.vignette} />
      <div style={titleStyles.titleStack}>
        <div style={titleStyles.smallLabel} className="pixel-text">── PORTFOLIO v3.0 ──</div>
        <h1 style={titleStyles.mainTitle} className="pixel-text">
          <span className="glow-magenta">DINO</span>
        </h1>
        <h2 style={titleStyles.subTitle} className="pixel-text">
          <span className="glow-cyan">HUMAN</span>{' '}
          <span style={{ color: 'var(--ink)' }}>+</span>{' '}
          <span className="glow-magenta">MACHINE</span>
        </h2>
        <div style={titleStyles.tagline} className="pixel-text glow-yellow title-tagline">
          INTELLIGENCE.EXE
        </div>
        <div style={titleStyles.bio} className="title-bio">
          <span style={{ color: 'var(--neon-green)' }}>{'<'}</span>
          <span style={{ color: 'var(--ink)' }}>AI ENGINEER & DATA SCIENTIST</span>
          <span style={{ color: 'var(--neon-green)' }}>{'/>'}</span>
          <br />
          <span style={{ color: 'var(--ink-dim)' }}>building at the intersection of ethics & artificial intelligence.</span>
        </div>
        <button style={titleStyles.startBtn} className="pixel-text title-start-btn" onClick={triggerStart}>
          <span className="blink">▶</span> PRESS START <span className="blink">◀</span>
        </button>
        <div style={titleStyles.scrollHint} className="pixel-text">
          <span style={{ color: 'var(--ink-faint)' }}>OR SCROLL TO BEGIN</span>
          <div style={{ marginTop: 8, fontSize: '24px' }} className="blink glow-cyan">▼</div>
        </div>
      </div>
    </div>
  );
}

const bootStyles = {
  root: {
    position: 'fixed', inset: 0, top: 0, right: 0, bottom: 0, left: 0,
    background: 'var(--bg-void)',
    zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center',
    overflow: 'hidden',
  },
  scanlines: {
    position: 'absolute', inset: 0, top: 0, right: 0, bottom: 0, left: 0,
    pointerEvents: 'none',
    background: 'repeating-linear-gradient(0deg, rgba(0,240,255,0.03) 0px, rgba(0,240,255,0.03) 2px, transparent 2px, transparent 4px)',
  },
  bootBox: { width: 'min(680px, 92vw)', fontFamily: 'var(--mono)', fontSize: '13px', color: 'var(--neon-green)', padding: '20px' },
  consoleHeader: { fontFamily: 'var(--mono)', fontSize: '12px', marginBottom: '12px', whiteSpace: 'pre', overflow: 'hidden' },
  consoleFooter: { fontFamily: 'var(--mono)', fontSize: '12px', marginTop: '12px', whiteSpace: 'pre', overflow: 'hidden' },
  consoleBody: { paddingLeft: '8px', minHeight: '320px' },
  bootLine: { fontFamily: 'var(--mono)', fontSize: '14px', lineHeight: 1.7, letterSpacing: '0.02em' },
  progressTrack: { marginTop: '10px', height: '14px', background: 'var(--bg-mid)', border: '2px solid var(--neon-cyan)', position: 'relative' },
  progressFill: { height: '100%', background: 'linear-gradient(90deg, var(--neon-magenta), var(--neon-cyan))', boxShadow: '0 0 10px var(--neon-cyan)', transition: 'width 0.1s steps(4)', willChange: 'width' },
};

const glitchStyles = {
  root: { position: 'fixed', inset: 0, top: 0, right: 0, bottom: 0, left: 0, pointerEvents: 'none', overflow: 'hidden' },
  bar1: { position: 'absolute', top: '20%', left: 0, right: 0, height: '40px', background: 'var(--neon-magenta)', transform: 'translateX(15%)', animation: 'glitch-slide 0.8s steps(8)', mixBlendMode: 'screen', willChange: 'transform, opacity' },
  bar2: { position: 'absolute', top: '50%', left: 0, right: 0, height: '20px', background: 'var(--neon-cyan)', transform: 'translateX(-25%)', animation: 'glitch-slide-r 0.8s steps(8)', mixBlendMode: 'screen', willChange: 'transform, opacity' },
  bar3: { position: 'absolute', top: '75%', left: 0, right: 0, height: '60px', background: 'var(--neon-yellow)', transform: 'translateX(8%)', animation: 'glitch-slide 0.8s steps(8) 0.1s', mixBlendMode: 'screen', opacity: 0.6, willChange: 'transform, opacity' },
  /* Tinted dim overlay instead of pure-white strobe (epilepsy-safe). */
  flash: { position: 'absolute', inset: 0, top: 0, right: 0, bottom: 0, left: 0, background: 'rgba(45, 228, 240, 0.45)', animation: 'flash-out 0.8s ease-out', willChange: 'opacity' },
};

const titleStyles = {
  root: {
    position: 'fixed', inset: 0, top: 0, right: 0, bottom: 0, left: 0,
    // Calmer synthwave: deep purple base, subtle magenta horizon, no bright bands behind text
    background: 'radial-gradient(ellipse 120% 80% at 50% 90%, rgba(255,43,214,0.45) 0%, rgba(155,92,255,0.25) 30%, #1a0a3a 55%, #0a0820 80%, #05030f 100%)',
    overflow: 'hidden', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
  },
  // Vignette darkens the area behind the title stack for contrast
  vignette: {
    position: 'absolute', inset: 0, top: 0, right: 0, bottom: 0, left: 0,
    background: 'radial-gradient(ellipse 70% 55% at 50% 45%, rgba(5,3,15,0.7) 0%, rgba(5,3,15,0.35) 40%, transparent 70%)',
    pointerEvents: 'none', zIndex: 1,
  },
  sun: {
    position: 'absolute', top: '32%', left: '50%',
    width: 'min(280px, 65vw)', height: 'min(280px, 65vw)',
    transform: 'translate(-50%, -50%)', borderRadius: '50%',
    background: 'linear-gradient(180deg, #ffe066 0%, #ff5cad 55%, #c01a8a 100%)',
    boxShadow: '0 0 60px rgba(255, 92, 173, 0.5), 0 0 140px rgba(255, 224, 102, 0.25)',
    overflow: 'hidden', opacity: 0.85, animation: 'title-sun-pulse 4s ease-in-out infinite',
  },
  sunInner: { position: 'absolute', inset: 0, top: 0, right: 0, bottom: 0, left: 0, borderRadius: '50%' },
  sunLine: { position: 'absolute', left: 0, right: 0, background: '#0a0820' },
  gridFloor: {
    position: 'absolute', bottom: 0, left: 0, right: 0, height: '40%',
    background: `linear-gradient(180deg, transparent 0%, var(--bg-void) 100%), repeating-linear-gradient(90deg, transparent 0, transparent 60px, rgba(0, 240, 255, 0.55) 60px, rgba(0, 240, 255, 0.55) 62px), linear-gradient(180deg, transparent 0%, rgba(0, 240, 255, 0.35) 100%)`,
    backgroundSize: 'auto, 120px 120px, auto',
    transform: 'perspective(400px) rotateX(60deg)', transformOrigin: 'top',
    animation: 'title-grid-pan 8s linear infinite',
  },
  mountains: { position: 'absolute', bottom: '38%', left: 0, right: 0, height: '150px', width: '100%' },
  titleStack: {
    position: 'relative', zIndex: 2,
    display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center',
    padding: '28px 22px', maxWidth: '100%',
  },
  smallLabel: {
    fontSize: '10px', color: '#ffe066', marginBottom: '24px', letterSpacing: '0.3em',
    textShadow: '0 0 6px rgba(255, 224, 102, 0.6), 0 2px 0 #05030f',
  },
  mainTitle: {
    fontSize: 'clamp(40px, 8vw, 96px)', margin: 0, lineHeight: 1,
    // Strong outline for readability over any bg
    textShadow: '0 0 8px rgba(255, 43, 214, 0.6), 3px 0 0 #05030f, -3px 0 0 #05030f, 0 3px 0 #05030f, 0 -3px 0 #05030f',
  },
  subTitle: {
    fontSize: 'clamp(18px, 3vw, 36px)', margin: '12px 0 4px', lineHeight: 1,
    textShadow: '0 2px 0 #05030f, 0 0 12px rgba(0, 0, 0, 0.6)',
  },
  tagline: {
    fontSize: 'clamp(13px, 2vw, 22px)', marginTop: '8px',
    textShadow: '0 0 8px rgba(255, 230, 0, 0.5), 0 2px 0 #05030f',
  },
  bio: {
    marginTop: '28px', fontFamily: 'var(--mono)', fontSize: '14px',
    background: 'rgba(5, 3, 15, 0.85)', padding: '14px 22px',
    border: '1px solid var(--neon-cyan)', maxWidth: '560px', lineHeight: 1.6,
    boxShadow: '0 0 20px rgba(0, 240, 255, 0.2)',
  },
  startBtn: {
    marginTop: '36px', fontSize: '16px', padding: '16px 28px',
    background: '#05030f', color: '#ffe600',
    border: '3px solid #ffe600', cursor: 'pointer', letterSpacing: '0.2em',
    boxShadow: '6px 6px 0 #ff2bd6, 0 0 24px rgba(255, 230, 0, 0.45)',
    textShadow: '0 0 6px rgba(255, 230, 0, 0.6)',
    animation: 'neon-breath 1.8s ease-in-out infinite',
  },
  scrollHint: { marginTop: '40px', fontSize: '10px' },
};

window.BootScreen = BootScreen;
})();

/* ============================================================
   WORLDS — overworld sections
   ============================================================ */
(() => {
const { useState, useEffect, useRef } = React;

function Marquee({ items, color = 'var(--neon-cyan)', dir = 1 }) {
  return (
    <div style={{
      width: '100%', overflow: 'hidden',
      borderTop: '2px solid ' + color, borderBottom: '2px solid ' + color,
      background: 'var(--bg-void)', padding: '14px 0', position: 'relative', zIndex: 5,
    }}>
      <div className="marquee-track pixel-text" style={{
        fontSize: '11px', color, textShadow: `0 0 6px ${color}`, letterSpacing: '0.2em',
        animationDirection: dir > 0 ? 'normal' : 'reverse',
      }}>
        {[...items, ...items, ...items, ...items].map((it, i) => (
          <span key={i} style={{ padding: '0 28px' }}>★ {it} ◆</span>
        ))}
      </div>
    </div>
  );
}

function World1Academic() {
  const stages = [
    { lvl: '01', title: 'HUMANITIES', sub: "BACHELOR'S DEGREE", meta: '// FOUNDATION · ITALY',
      desc: "Critical thinking, epistemology, social sciences. The base stats: reading context, holding doubt, asking the uncomfortable questions. The foundation everything else was built on.",
      tags: ['CRITICAL THINKING', 'EPISTEMOLOGY', 'SOCIAL SCIENCES', 'ETHICS'],
      grade: '110/110', honors: 'CUM LAUDE', stars: 4, color: 'var(--neon-cyan)' },
    { lvl: '02', title: 'SOCIAL DATA SCIENCE', sub: "MASTER'S DEGREE", meta: '// 2021 — 2023',
      desc: 'Quantitative analysis of social phenomena through big data, advanced statistics, and applied machine learning. Computational sociology meets predictive modeling.',
      tags: ['STATISTICS', 'PYTHON · R', 'CAUSAL INFERENCE', 'RESEARCH', 'SOCIAL ML'],
      grade: '110/110', honors: 'CUM LAUDE', stars: 4, color: 'var(--neon-magenta)' },
    { lvl: '03', title: 'AI, MANAGEMENT & ETHICS', sub: "MASTER'S DEGREE", meta: '// POLITECNICO DI TORINO · 2024 — 2026',
      desc: 'Advanced machine learning, deep neural networks, generative models, LLMs, and AI ethics. Building systems that are powerful and responsible.',
      tags: ['LLMs', 'DEEP LEARNING', 'MLOps', 'AI ETHICS', 'NLP'],
      grade: '110/110', honors: 'CUM LAUDE', stars: 4, color: 'var(--neon-yellow)' },
  ];

  return (
    <section style={worldStyles.world} className="world-section cv-auto">
      <WorldHeader worldNum="01" subtitle="THE ACADEMIC PATH."
        intro="Three levels cleared. Each one with 110L — cum laude. A humanities origin story that grew into statistics, social data, and eventually artificial intelligence."
        flag="cyan" />
      <div style={worldStyles.stagesWrap}>
        {stages.map((s, i) => <StageCard key={i} stage={s} index={i} />)}
      </div>
      <PathSegment />
    </section>
  );
}

function StageCard({ stage, index }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (!('IntersectionObserver' in window)) { setVisible(true); return; }
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } });
    }, { threshold: 0.15 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const align = index % 2 === 0 ? 'left' : 'right';
  return (
    <div ref={ref} className="stage-row" style={{
      ...worldStyles.stageRow,
      flexDirection: align === 'left' ? 'row' : 'row-reverse',
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(40px)',
      transition: 'opacity 0.6s ease-out, transform 0.6s ease-out',
      willChange: visible ? 'auto' : 'opacity, transform',
    }}>
      <div className="stage-card" style={{
        ...worldStyles.stageCard, borderColor: stage.color,
        boxShadow: `0 0 0 2px var(--bg-void), 0 0 0 4px ${stage.color}, 0 0 30px ${stage.color}40`,
      }}>
        <div style={worldStyles.stageHeader} className="stage-header">
          <div style={{ ...worldStyles.lvlBadge, borderColor: stage.color, color: stage.color }} className="pixel-text lvl-badge">
            <div style={{ fontSize: '8px', opacity: 0.7 }}>LVL</div>
            <div style={{ fontSize: '20px', marginTop: '4px' }}>{stage.lvl}</div>
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div className="pixel-text" style={{ fontSize: '9px', color: 'var(--ink-faint)', marginBottom: '6px' }}>{stage.meta}</div>
            <h3 className="pixel-text" style={{ fontSize: 'clamp(12px, 2.3vw, 16px)', color: stage.color, marginBottom: '4px', textShadow: `0 0 8px ${stage.color}80`, lineHeight: 1.3 }}>{stage.title}</h3>
            <div className="pixel-text" style={{ fontSize: '10px', color: 'var(--ink-dim)' }}>{stage.sub}</div>
          </div>
        </div>
        <p style={worldStyles.stageDesc}>{stage.desc}</p>
        <div style={worldStyles.stageTags}>
          {stage.tags.map((t, i) => (
            <span key={i} className="pixel-text" style={{ ...worldStyles.tag, borderColor: stage.color, color: stage.color }}>{t}</span>
          ))}
        </div>
        <div style={worldStyles.stageFooter}>
          <div className="pixel-text" style={{ fontSize: '12px', color: stage.color }}>
            <span style={{ color: 'var(--ink-faint)', fontSize: '9px' }}>GRADE</span> {stage.grade}
          </div>
          <div className="pixel-text" style={{ fontSize: '10px', color: 'var(--neon-yellow)' }}>★ {stage.honors}</div>
          <div style={{ fontSize: '14px', color: 'var(--neon-yellow)', textShadow: '0 0 6px var(--neon-yellow)' }}>{'✦'.repeat(stage.stars)}</div>
        </div>
      </div>
      <div style={worldStyles.stagePost} className="stage-post">
        <div style={{ ...worldStyles.flagPole, background: stage.color }} />
        <div style={{ ...worldStyles.flag, background: stage.color, boxShadow: `0 0 12px ${stage.color}` }} className="pixel-text">{stage.lvl}</div>
        <div style={worldStyles.flagBase} />
      </div>
    </div>
  );
}

function WorldHeader({ worldNum, subtitle, intro, flag = 'cyan' }) {
  const flagColor = { cyan: 'var(--neon-cyan)', magenta: 'var(--neon-magenta)', yellow: 'var(--neon-yellow)', green: 'var(--neon-green)' }[flag];
  return (
    <div style={worldStyles.headerWrap} className="world-header-wrap">
      <div className="pixel-text" style={{ fontSize: '11px', color: flagColor, letterSpacing: '0.3em', textShadow: `0 0 8px ${flagColor}` }}>WORLD {worldNum}</div>
      <h2 className="pixel-text" style={{
        fontSize: 'clamp(24px, 5vw, 56px)', color: 'var(--ink)',
        textShadow: `4px 4px 0 ${flagColor}, 8px 8px 0 var(--bg-void)`,
        marginTop: '12px', lineHeight: 1.1, wordBreak: 'break-word',
      }}>{subtitle}</h2>
      <p style={{ fontFamily: 'var(--mono)', fontSize: '15px', color: 'var(--ink-dim)', maxWidth: '640px', margin: '20px auto 0', lineHeight: 1.6 }}>{intro}</p>
      <div className="pixel-text" style={{ marginTop: '24px', fontSize: '9px', color: 'var(--ink-faint)' }}>▼ TAP/HOVER TO INSPECT</div>
    </div>
  );
}

function World2Class() {
  const skills = [
    { n: '01', label: 'APPLIED MACHINE LEARNING', xp: 95 },
    { n: '02', label: 'NATURAL LANGUAGE PROCESSING', xp: 92 },
    { n: '03', label: 'LLM INTEGRATION & TUNING', xp: 90 },
    { n: '04', label: 'AI ETHICS & FAIRNESS', xp: 96 },
    { n: '05', label: 'DATA PIPELINES & MLOps', xp: 85 },
    { n: '06', label: 'SOCIAL DATA ANALYSIS', xp: 94 },
    { n: '07', label: 'PYTHON · R · SQL', xp: 93 },
  ];
  return (
    <section style={worldStyles.world} className="world-section cv-auto">
      <WorldHeader worldNum="02" subtitle="WHAT I DO NOW."
        intro="Primary class unlocked. I design, train, and deploy machine learning systems — from raw data pipelines to production models, with a sharp focus on interpretability, fairness, and real-world impact."
        flag="magenta" />
      <div style={worldStyles.classCard} className="class-card">
        <div className="pixel-text" style={{ fontSize: '9px', color: 'var(--neon-magenta)', letterSpacing: '0.3em' }}>▶ PRIMARY CLASS</div>
        <div className="pixel-text" style={{ fontSize: 'clamp(18px, 3vw, 32px)', marginTop: '14px', color: 'var(--neon-cyan)', textShadow: '0 0 12px var(--neon-cyan)' }}>AI ENGINEER</div>
        <div className="pixel-text" style={{ fontSize: 'clamp(14px, 2.5vw, 24px)', color: 'var(--ink)', marginTop: '6px' }}>/ DATA SCIENTIST</div>
        <div style={{ fontFamily: 'var(--mono)', fontSize: '13px', color: 'var(--ink-faint)', marginTop: '12px' }}>alias · "the bridge-builder"</div>
        <p style={{ fontFamily: 'var(--mono)', fontSize: '14px', color: 'var(--ink-dim)', marginTop: '20px', maxWidth: '600px', lineHeight: 1.6, marginInline: 'auto' }}>
          I work best at the edge — where the question isn't just <em style={{ color: 'var(--neon-cyan)', fontStyle: 'normal' }}>how</em> to build something, but <em style={{ color: 'var(--neon-magenta)', fontStyle: 'normal' }}>whether</em> we should, and <em style={{ color: 'var(--neon-yellow)', fontStyle: 'normal' }}>for whom</em>.
        </p>
      </div>
      <div style={{ marginTop: '60px' }}>
        <div className="pixel-text" style={{ fontSize: '14px', color: 'var(--neon-yellow)', textAlign: 'center', marginBottom: '32px', textShadow: '0 0 8px var(--neon-yellow)' }}>▶ SKILL TREE</div>
        <div style={worldStyles.skillGrid} className="grid-skills">
          {skills.map((s, i) => (
            <div key={i} style={worldStyles.skillCard}>
              <div className="pixel-text" style={{ fontSize: '9px', color: 'var(--neon-yellow)' }}>SKILL {s.n}</div>
              <div className="pixel-text" style={{ fontSize: '11px', color: 'var(--ink)', marginTop: '10px', minHeight: '36px', lineHeight: 1.4 }}>{s.label}</div>
              <div style={worldStyles.xpBar}>
                <div style={{ ...worldStyles.xpFill, width: `${s.xp}%` }} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '6px' }}>
                <span className="pixel-text" style={{ fontSize: '8px', color: 'var(--ink-faint)' }}>XP</span>
                <span className="pixel-text" style={{ fontSize: '8px', color: 'var(--neon-cyan)' }}>{s.xp}/100</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <PathSegment />
    </section>
  );
}

function World3Shop() {
  const services = [
    { n: '01', rarity: 'CORE', rarityColor: 'var(--neon-cyan)', title: 'ML MODEL', sub: 'DEVELOPMENT', desc: 'End-to-end design, training and evaluation of machine learning models tailored to your data.', bullets: ['Supervised & unsupervised', 'Deep learning (PyTorch/TF)', 'Evaluation & interpretability'], stack: 'PYTHON · PYTORCH', icon: '⚙' },
    { n: '02', rarity: 'RARE', rarityColor: 'var(--neon-magenta)', title: 'LLM & NLP', sub: 'SOLUTIONS', desc: 'Fine-tuning, RAG systems, persistent memory, chatbots and language workflows integrated into your product.', bullets: ['Persistent memory & RAG', 'Vector search & retrieval', 'Fine-tuning & evaluation'], stack: 'LLMs · RAG · LANGCHAIN', icon: '◈' },
    { n: '03', rarity: 'EPIC', rarityColor: 'var(--neon-yellow)', title: 'DATA ANALYSIS', sub: '& INSIGHTS', desc: 'Statistical analysis, dashboards and research-grade insights from your data — social or business.', bullets: ['Exploratory data analysis', 'Statistical modeling', 'Research reports & viz'], stack: 'PYTHON · R · SQL', icon: '◊' },
    { n: '04', rarity: 'RARE', rarityColor: 'var(--neon-magenta)', title: 'DATA PIPELINES', sub: '& MLOps', desc: 'Robust data pipelines, model deployment and monitoring — from experiment to production.', bullets: ['ETL & automation', 'Model deployment', 'Monitoring & retraining'], stack: 'DOCKER · AIRFLOW · CLOUD', icon: '⌬' },
    { n: '05', rarity: 'LEGENDARY', rarityColor: 'var(--neon-pink)', title: 'AI ETHICS', sub: '& AUDITS', desc: 'Fairness assessment, bias detection and responsible-AI audits for your models and data.', bullets: ['Bias & fairness audits', 'Explainability reviews', 'Responsible AI strategy'], stack: 'XAI · FAIRNESS · POLICY', icon: '✦' },
    { n: '06', rarity: 'CORE', rarityColor: 'var(--neon-cyan)', title: 'CONSULTING', sub: '& STRATEGY', desc: 'AI roadmaps, feasibility studies and technical guidance for teams and organizations.', bullets: ['AI opportunity mapping', 'Feasibility & ROI', 'Team training'], stack: 'STRATEGY · WORKSHOPS', icon: '◉' },
  ];
  return (
    <section style={worldStyles.world} className="world-section cv-auto">
      <WorldHeader worldNum="03" subtitle="SERVICES UNLOCKED."
        intro="Pick what you need. From model prototypes to production pipelines — with an ethical lens built in."
        flag="yellow" />
      <div style={worldStyles.shopGrid} className="grid-shop">
        {services.map((s, i) => (
          <div key={i} className="service-card" style={{
            ...worldStyles.serviceCard, borderColor: s.rarityColor,
            boxShadow: `0 0 0 2px var(--bg-void), 0 0 0 4px ${s.rarityColor}, 0 0 24px ${s.rarityColor}30`,
          }}>
            <div style={worldStyles.serviceHeader}>
              <div className="pixel-text" style={{ fontSize: '9px', color: 'var(--ink-faint)' }}>SVC {s.n}</div>
              <div className="pixel-text" style={{ fontSize: '8px', color: s.rarityColor, padding: '4px 8px', border: `1px solid ${s.rarityColor}` }}>{s.rarity}</div>
            </div>
            <div style={{ fontSize: '36px', textAlign: 'center', margin: '12px 0', color: s.rarityColor, textShadow: `0 0 12px ${s.rarityColor}` }}>{s.icon}</div>
            <h3 className="pixel-text" style={{ fontSize: '13px', color: s.rarityColor, lineHeight: 1.3 }}>{s.title}<br />{s.sub}</h3>
            <p style={{ fontFamily: 'var(--mono)', fontSize: '13px', color: 'var(--ink-dim)', marginTop: '12px', lineHeight: 1.5 }}>{s.desc}</p>
            <ul style={worldStyles.serviceBullets}>
              {s.bullets.map((b, j) => (
                <li key={j} style={{ fontFamily: 'var(--mono)', fontSize: '12px', color: 'var(--ink)', marginBottom: '4px' }}>
                  <span style={{ color: s.rarityColor }}>▸</span> {b}
                </li>
              ))}
            </ul>
            <div style={worldStyles.serviceFooter}>
              <div className="pixel-text" style={{ fontSize: '7px', color: 'var(--ink-faint)' }}>STACK</div>
              <div className="pixel-text" style={{ fontSize: '8px', color: 'var(--ink)', marginTop: '4px' }}>{s.stack}</div>
            </div>
          </div>
        ))}
      </div>
      <PathSegment />
    </section>
  );
}

function PathSegment() {
  return <div style={{ height: '60px', position: 'relative' }} />;
}

const worldStyles = {
  world: { position: 'relative', padding: '80px 24px 60px', maxWidth: '1280px', margin: '0 auto', width: '100%' },
  headerWrap: { textAlign: 'center', marginBottom: '60px', position: 'relative' },
  stagesWrap: { display: 'flex', flexDirection: 'column', gap: '60px' },
  stageRow: { display: 'flex', alignItems: 'center', gap: '40px', flexWrap: 'wrap', justifyContent: 'center' },
  stageCard: { flex: '1 1 480px', maxWidth: '640px', minWidth: 0, background: 'rgba(10, 8, 32, 0.92)', border: '2px solid var(--neon-cyan)', padding: '24px' },
  stageHeader: { display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '16px' },
  lvlBadge: { width: '64px', height: '64px', border: '2px solid var(--neon-cyan)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  stageDesc: { fontFamily: 'var(--mono)', fontSize: '14px', color: 'var(--ink-dim)', lineHeight: 1.6, marginBottom: '16px' },
  stageTags: { display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '20px' },
  tag: { fontSize: '8px', padding: '5px 10px', border: '1px solid', letterSpacing: '0.1em' },
  stageFooter: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '12px', borderTop: '1px dashed var(--ink-faint)', flexWrap: 'wrap', gap: '8px' },
  stagePost: { width: '60px', height: '160px', position: 'relative', flexShrink: 0 },
  flagPole: { position: 'absolute', left: '50%', top: 0, transform: 'translateX(-50%)', width: '4px', height: '100%' },
  flag: { position: 'absolute', left: '50%', top: '12px', transform: 'translateX(0)', width: '40px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', color: 'var(--bg-void)' },
  flagBase: { position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: '32px', height: '12px', background: 'var(--stone)', borderTop: '2px solid var(--stone-light)' },
  classCard: { background: 'rgba(10, 8, 32, 0.85)', border: '2px solid var(--neon-magenta)', padding: '40px', textAlign: 'center', maxWidth: '720px', margin: '0 auto', boxShadow: '0 0 0 2px var(--bg-void), 0 0 0 4px var(--neon-magenta), 0 0 40px rgba(255, 43, 214, 0.3)' },
  skillGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' },
  skillCard: { background: 'rgba(10, 8, 32, 0.85)', border: '2px solid var(--neon-yellow)', padding: '16px' },
  xpBar: { marginTop: '14px', height: '10px', background: 'var(--bg-mid)', border: '1px solid var(--neon-yellow)', position: 'relative' },
  xpFill: { height: '100%', background: 'linear-gradient(90deg, var(--neon-yellow), var(--neon-magenta))', boxShadow: '0 0 8px var(--neon-yellow)' },
  shopGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' },
  serviceCard: { background: 'rgba(10, 8, 32, 0.92)', border: '2px solid var(--neon-cyan)', padding: '20px', display: 'flex', flexDirection: 'column' },
  serviceHeader: { display: 'flex', alignItems: 'center', justifyContent: 'space-between' },
  serviceBullets: { listStyle: 'none', padding: 0, margin: '14px 0', flex: 1 },
  serviceFooter: { paddingTop: '12px', borderTop: '1px dashed var(--ink-faint)' },
};

window.World1Academic = World1Academic;
window.World2Class = World2Class;
window.World3Shop = World3Shop;
window.Marquee = Marquee;
})();

/* ============================================================
   WARP ZONE + AI DIMENSION + INVENTORY
   ============================================================ */
(() => {
const { useState, useEffect, useRef } = React;

function WarpZone({ onEnter }) {
  const ref = useRef(null);
  const [active, setActive] = useState(false);
  const audio = window.useAudio();

  useEffect(() => {
    if (!('IntersectionObserver' in window)) return;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting && e.intersectionRatio > 0.5 && !active) {
          setActive(true);
          audio?.sfx('warp');
          setTimeout(() => onEnter && onEnter(), 100);
          obs.disconnect();
        }
      });
    }, { threshold: [0, 0.5, 1] });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [active]);

  return (
    <section ref={ref} style={warpStyles.zone} className="cv-auto-tall">
      <div style={warpStyles.tunnel}>
        {Array.from({ length: WARP_RING_COUNT }).map((_, i) => (
          <div key={i} style={{
            ...warpStyles.ring, animationDelay: `${i * 0.18}s`,
            borderColor: i % 2 === 0 ? 'var(--neon-cyan)' : 'var(--neon-magenta)',
          }} />
        ))}
        <div style={warpStyles.center}>
          <div className="pixel-text" style={warpStyles.warpText}>
            <span className="glow-magenta">WARP</span>
          </div>
          <div className="pixel-text" style={warpStyles.warpSub}>↓ ENTERING ANOTHER DIMENSION ↓</div>
          <div className="pixel-text glow-cyan blink" style={{ fontSize: '10px', marginTop: '20px' }}>▼ KEEP SCROLLING ▼</div>
        </div>
      </div>
      <div style={{ ...warpStyles.glitchOverlay, opacity: active ? 1 : 0 }} />
    </section>
  );
}

const PROJECTS = [
  { id: 'P-001', title: 'NEURAL MEMORY', sub: 'Persistent context layer for LLM agents', tag: 'LLM · MEMORY', desc: 'A long-horizon memory system that lets conversational agents retain user preferences, facts and prior reasoning across sessions — with controllable forgetting and provenance tracking.', stack: ['Python', 'pgvector', 'LangChain', 'OpenAI API'], metric: { v: '+47%', label: 'TASK CONSISTENCY' }, color: 'var(--neon-cyan)', glyph: '◈' },
  { id: 'P-002', title: 'BIAS LENS', sub: 'Fairness audit toolkit for production models', tag: 'AI ETHICS · XAI', desc: 'A pipeline that flags disparate impact across protected groups in deployed classifiers, generates SHAP-based explanations and produces audit-ready reports for compliance teams.', stack: ['Python', 'Fairlearn', 'SHAP', 'Plotly'], metric: { v: '-31%', label: 'DEMOGRAPHIC GAP' }, color: 'var(--neon-magenta)', glyph: '✦' },
  { id: 'P-003', title: 'RAG-FORGE', sub: 'Domain-tuned retrieval-augmented chat', tag: 'RAG · NLP', desc: 'Custom retrieval-augmented generation pipeline for legal & policy documents — hybrid sparse/dense retrieval, citation-aware answering, and a reranker fine-tuned on in-domain queries.', stack: ['Python', 'LlamaIndex', 'BM25 + Embeddings', 'FastAPI'], metric: { v: '0.89', label: 'NDCG@10' }, color: 'var(--neon-yellow)', glyph: '◊' },
  { id: 'P-004', title: 'CIVIC PULSE', sub: 'Social media sentiment for public policy', tag: 'SOCIAL DATA · NLP', desc: 'A real-time NLP dashboard tracking public discourse around policy proposals — multilingual sentiment, topic drift detection and bot/inauthentic-behavior flags.', stack: ['Python', 'spaCy', 'Transformers', 'Streamlit'], metric: { v: '2.4M', label: 'POSTS / DAY' }, color: 'var(--neon-pink)', glyph: '◉' },
  { id: 'P-005', title: 'CRIMINOMETRY', sub: 'Spatio-temporal crime forecasting', tag: 'STATISTICS · GIS', desc: 'A causal-aware forecasting model for urban crime rates combining demographic indicators, mobility data and event windows — built during my Social Data Science thesis.', stack: ['R', 'INLA', 'PySAL', 'PostGIS'], metric: { v: 'AUC 0.84', label: 'HOTSPOT MODEL' }, color: 'var(--neon-green)', glyph: '⌬' },
  { id: 'P-006', title: 'FINE-TUNE LAB', sub: 'LoRA fine-tuning for niche domains', tag: 'LLM · FINE-TUNING', desc: 'Parameter-efficient fine-tuning workflow for adapting open LLMs to specialised vocabularies (medical, legal, internal docs) with eval harnesses and safety regression checks.', stack: ['PyTorch', 'PEFT/LoRA', 'HuggingFace', 'Weights & Biases'], metric: { v: '4.2x', label: 'INFERENCE SPEEDUP' }, color: 'var(--neon-purple)', glyph: '⚙' },
];

function AIDimension() {
  const ref = useRef(null);
  const [particlesOn, setParticlesOn] = useState(false);

  // Defer particle mount until section is near viewport
  useEffect(() => {
    if (PARTICLE_COUNT === 0) return;
    if (!('IntersectionObserver' in window)) { setParticlesOn(true); return; }
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) { setParticlesOn(true); obs.disconnect(); }
      });
    }, { rootMargin: '600px 0px' });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} style={dimStyles.root} className="dim-root cv-auto-tall">
      <div style={dimStyles.gridFloor} />
      <div style={dimStyles.gridFloor2} />

      {particlesOn && (
        <div style={dimStyles.particles}>
          {Array.from({ length: PARTICLE_COUNT }).map((_, i) => (
            <div key={i} style={{
              position: 'absolute',
              left: `${(i * 37) % 100}%`,
              top: `${(i * 53) % 100}%`,
              width: '2px', height: '2px',
              background: i % 3 === 0 ? 'var(--neon-cyan)' : i % 3 === 1 ? 'var(--neon-magenta)' : 'var(--neon-yellow)',
              boxShadow: '0 0 4px currentColor',
              color: i % 3 === 0 ? 'var(--neon-cyan)' : i % 3 === 1 ? 'var(--neon-magenta)' : 'var(--neon-yellow)',
              animation: `float ${3 + (i % 5)}s ease-in-out infinite alternate`,
              animationDelay: `${(i * 0.13) % 2}s`,
              willChange: 'transform, opacity',
            }} />
          ))}
        </div>
      )}

      <div style={dimStyles.content}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <div className="pixel-text" style={{ fontSize: '11px', color: 'var(--neon-pink)', letterSpacing: '0.4em', textShadow: '0 0 10px var(--neon-pink)' }}>DIMENSION α — UNLOCKED</div>
          <h2 className="pixel-text" style={{
            fontSize: 'clamp(24px, 5vw, 56px)', marginTop: '16px', lineHeight: 1.1,
            background: 'linear-gradient(90deg, var(--neon-cyan), var(--neon-magenta), var(--neon-yellow))',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            color: 'var(--neon-magenta)',
            filter: 'drop-shadow(0 0 12px rgba(255, 43, 214, 0.5))',
          }}>SELECTED PROJECTS.</h2>
          <p style={{ fontFamily: 'var(--mono)', fontSize: '15px', color: 'var(--ink-dim)', maxWidth: '640px', margin: '20px auto 0', lineHeight: 1.6 }}>
            A handful of artifacts from the AI / data-science workshop. Production systems, research prototypes and audit toolkits — each with an ethics-aware lens.
          </p>
        </div>
        <div style={dimStyles.grid} className="grid-projects">
          {PROJECTS.map((p, i) => <ProjectCard key={i} project={p} index={i} />)}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project: p }) {
  const [hover, setHover] = useState(false);
  return (
    <div onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} className="project-card"
      style={{
        ...dimStyles.card, borderColor: p.color,
        boxShadow: hover
          ? `0 0 0 2px var(--bg-void), 0 0 0 4px ${p.color}, 0 0 40px ${p.color}80`
          : `0 0 0 2px var(--bg-void), 0 0 0 4px ${p.color}, 0 0 20px ${p.color}40`,
        transform: hover ? 'translate3d(-4px, -4px, 0)' : 'translate3d(0, 0, 0)',
      }}>
      <div style={{
        position: 'absolute', inset: 0, top: 0, right: 0, bottom: 0, left: 0,
        pointerEvents: 'none',
        background: 'repeating-linear-gradient(0deg, rgba(255,255,255,0.02) 0px, rgba(255,255,255,0.02) 1px, transparent 1px, transparent 3px)',
      }} />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', position: 'relative' }}>
        <div className="pixel-text" style={{ fontSize: '9px', color: 'var(--ink-faint)' }}>{p.id}</div>
        <div className="pixel-text" style={{ fontSize: '8px', color: p.color, padding: '4px 8px', border: `1px solid ${p.color}` }}>{p.tag}</div>
      </div>
      <div style={{ fontSize: '52px', textAlign: 'left', margin: '16px 0 8px', color: p.color, textShadow: `0 0 16px ${p.color}`, position: 'relative' }}>{p.glyph}</div>
      <h3 className="pixel-text" style={{ fontSize: '15px', color: p.color, lineHeight: 1.3, textShadow: `0 0 8px ${p.color}80`, position: 'relative' }}>{p.title}</h3>
      <div style={{ fontFamily: 'var(--mono)', fontSize: '13px', color: 'var(--ink)', marginTop: '6px', fontStyle: 'italic', position: 'relative' }}>{p.sub}</div>
      <p style={{ fontFamily: 'var(--mono)', fontSize: '13px', color: 'var(--ink-dim)', lineHeight: 1.6, marginTop: '14px', position: 'relative' }}>{p.desc}</p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '14px', position: 'relative' }}>
        {p.stack.map((s, j) => (
          <span key={j} className="pixel-text" style={{ fontSize: '8px', padding: '4px 8px', background: 'rgba(0,0,0,0.4)', color: 'var(--ink)', border: `1px solid ${p.color}50` }}>{s}</span>
        ))}
      </div>
      <div style={{ marginTop: '16px', paddingTop: '14px', borderTop: `1px dashed ${p.color}50`, display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', position: 'relative' }}>
        <div>
          <div className="pixel-text" style={{ fontSize: '7px', color: 'var(--ink-faint)' }}>METRIC</div>
          <div className="pixel-text" style={{ fontSize: '8px', color: 'var(--ink-dim)', marginTop: '2px' }}>{p.metric.label}</div>
        </div>
        <div className="pixel-text" style={{ fontSize: '20px', color: p.color, textShadow: `0 0 8px ${p.color}` }}>{p.metric.v}</div>
      </div>
    </div>
  );
}

function Inventory() {
  const audio = window.useAudio();
  const items = [
    { n: '01', label: 'GITHUB', stars: 5, desc: 'Source code, experiments, open-source artifacts.', cta: 'REPOSITORY', href: 'https://github.com/Dean988', color: 'var(--neon-cyan)', glyph: '⌥' },
    { n: '02', label: 'LINKEDIN', stars: 5, desc: 'Professional network & career log.', cta: 'CONNECT', href: 'https://www.linkedin.com/in/dinode/', color: 'var(--neon-magenta)', glyph: 'in' },
    { n: '03', label: 'EMAIL', stars: 5, desc: 'Direct message. Work, collabs, or chats.', cta: 'SEND_MSG', href: 'mailto:diemidiodino@gmail.com', color: 'var(--neon-yellow)', glyph: '✉' },
  ];
  return (
    <section style={invStyles.root} className="inv-root cv-auto">
      <div style={{ textAlign: 'center', marginBottom: '50px' }}>
        <div className="pixel-text" style={{ fontSize: '11px', color: 'var(--neon-yellow)', letterSpacing: '0.3em', textShadow: '0 0 8px var(--neon-yellow)' }}>FINAL ZONE — INVENTORY</div>
        <h2 className="pixel-text" style={{ fontSize: 'clamp(24px, 5vw, 56px)', marginTop: '14px', lineHeight: 1.1, color: 'var(--ink)', textShadow: '4px 4px 0 var(--neon-yellow), 8px 8px 0 var(--bg-void)' }}>PICK YOUR LINK.</h2>
        <p style={{ fontFamily: 'var(--mono)', fontSize: '15px', color: 'var(--ink-dim)', maxWidth: '560px', margin: '20px auto 0', lineHeight: 1.6 }}>Grab any of these items to continue the quest outside this map.</p>
      </div>
      <div style={invStyles.grid} className="grid-inventory">
        {items.map((it, i) => (
          <a key={i} href={it.href} target="_blank" rel="noopener noreferrer"
             onMouseEnter={() => audio?.sfx('coin')} onClick={() => audio?.sfx('select')}
             className="inv-slot"
             style={{ ...invStyles.slot, borderColor: it.color, boxShadow: `0 0 0 2px var(--bg-void), 0 0 0 4px ${it.color}, 0 0 24px ${it.color}40` }}>
            <div style={invStyles.slotHeader}>
              <div className="pixel-text" style={{ fontSize: '9px', color: 'var(--ink-faint)' }}>SLOT {it.n}</div>
              <div className="pixel-text" style={{ fontSize: '10px', color: 'var(--neon-yellow)' }}>{'★'.repeat(it.stars)}</div>
            </div>
            <div style={{ fontSize: '60px', textAlign: 'center', margin: '20px 0', color: it.color, textShadow: `0 0 16px ${it.color}`, fontFamily: 'var(--pixel)' }}>{it.glyph}</div>
            <h3 className="pixel-text" style={{ fontSize: '20px', color: it.color, textAlign: 'center', textShadow: `0 0 10px ${it.color}` }}>{it.label}</h3>
            <p style={{ fontFamily: 'var(--mono)', fontSize: '14px', color: 'var(--ink-dim)', textAlign: 'center', margin: '16px 0', lineHeight: 1.5, minHeight: '44px' }}>{it.desc}</p>
            <div className="pixel-text" style={{ ...invStyles.slotCta, color: it.color, borderColor: it.color }}>{it.cta} <span style={{ marginLeft: '8px' }}>▶</span></div>
          </a>
        ))}
      </div>
      <div style={invStyles.credits}>
        <div className="pixel-text glow-yellow" style={{ fontSize: '20px', marginBottom: '14px' }}>✦ THANKS FOR PLAYING ✦</div>
        <div className="pixel-text" style={{ fontSize: '10px', color: 'var(--ink-dim)' }}>DINO · AI ENGINEER & DATA SCIENTIST · 2026</div>
        <div style={{ fontFamily: 'var(--mono)', fontSize: '13px', color: 'var(--ink-faint)', marginTop: '10px' }}>Built with HTML, neurons, and a soft spot for 8-bit consoles.</div>
      </div>
    </section>
  );
}

const warpStyles = {
  zone: { position: 'relative', width: '100%', minHeight: '90vh', background: 'radial-gradient(ellipse at center, #1a0a3a 0%, #05030f 70%)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' },
  tunnel: { position: 'relative', width: '100%', height: '100%', minHeight: '90vh', display: 'flex', alignItems: 'center', justifyContent: 'center', perspective: '600px' },
  ring: { position: 'absolute', width: '120vw', height: '120vw', maxWidth: '900px', maxHeight: '900px', border: '3px solid var(--neon-cyan)', borderRadius: '50%', animation: 'warp-ring 2.5s linear infinite', boxShadow: '0 0 40px currentColor', willChange: 'transform, opacity' },
  center: { position: 'relative', zIndex: 2, textAlign: 'center', padding: '0 16px' },
  /* Slowed shake from 0.2s → 0.5s, amplitude reduced in keyframe */
  warpText: { fontSize: 'clamp(40px, 10vw, 120px)', textShadow: '0 0 20px var(--neon-magenta), 4px 0 0 var(--neon-cyan), -4px 0 0 var(--neon-yellow)', letterSpacing: '0.1em', animation: 'warp-shake 0.5s steps(4) infinite', willChange: 'transform' },
  warpSub: { fontSize: '12px', color: 'var(--neon-cyan)', marginTop: '20px', textShadow: '0 0 8px var(--neon-cyan)' },
  glitchOverlay: { position: 'absolute', inset: 0, top: 0, right: 0, bottom: 0, left: 0, pointerEvents: 'none', background: 'repeating-linear-gradient(0deg, rgba(255, 43, 214, 0.05) 0, rgba(255, 43, 214, 0.05) 2px, transparent 2px, transparent 8px)', transition: 'opacity 0.5s' },
};

const dimStyles = {
  root: { position: 'relative', width: '100%', minHeight: '100vh', background: 'linear-gradient(180deg, #05030f 0%, #1a0a3a 50%, #05030f 100%)', overflow: 'hidden', padding: '100px 24px 80px' },
  gridFloor: {
    position: 'absolute', bottom: 0, left: 0, right: 0, height: '50%',
    background: `repeating-linear-gradient(90deg, transparent 0, transparent 80px, rgba(0, 240, 255, 0.4) 80px, rgba(0, 240, 255, 0.4) 82px), repeating-linear-gradient(0deg, transparent 0, transparent 80px, rgba(0, 240, 255, 0.4) 80px, rgba(0, 240, 255, 0.4) 82px)`,
    transform: 'perspective(500px) rotateX(60deg)', transformOrigin: 'top', opacity: 0.5,
    maskImage: 'linear-gradient(180deg, transparent 0%, black 50%, transparent 100%)',
    WebkitMaskImage: 'linear-gradient(180deg, transparent 0%, black 50%, transparent 100%)',
  },
  gridFloor2: {
    position: 'absolute', top: 0, left: 0, right: 0, height: '50%',
    background: `repeating-linear-gradient(90deg, transparent 0, transparent 80px, rgba(255, 43, 214, 0.4) 80px, rgba(255, 43, 214, 0.4) 82px), repeating-linear-gradient(0deg, transparent 0, transparent 80px, rgba(255, 43, 214, 0.4) 80px, rgba(255, 43, 214, 0.4) 82px)`,
    transform: 'perspective(500px) rotateX(-60deg)', transformOrigin: 'bottom', opacity: 0.4,
    maskImage: 'linear-gradient(0deg, transparent 0%, black 50%, transparent 100%)',
    WebkitMaskImage: 'linear-gradient(0deg, transparent 0%, black 50%, transparent 100%)',
  },
  particles: { position: 'absolute', inset: 0, top: 0, right: 0, bottom: 0, left: 0, pointerEvents: 'none', zIndex: 1 },
  content: { position: 'relative', zIndex: 2, maxWidth: '1280px', margin: '0 auto' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '28px' },
  card: { position: 'relative', background: 'rgba(5, 3, 15, 0.92)', border: '2px solid var(--neon-cyan)', padding: '24px', transition: 'transform 0.2s ease-out, box-shadow 0.2s ease-out', cursor: 'default', overflow: 'hidden', willChange: 'transform' },
};

const invStyles = {
  root: { position: 'relative', maxWidth: '1280px', margin: '0 auto', padding: '100px 24px 80px' },
  grid: { display: 'grid', gap: '24px', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' },
  slot: { background: 'rgba(10, 8, 32, 0.92)', border: '2px solid var(--neon-cyan)', padding: '24px', textDecoration: 'none', color: 'inherit', transition: 'all 0.15s ease-out', display: 'block' },
  slotHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  slotCta: { marginTop: '20px', padding: '14px', border: '2px solid', textAlign: 'center', fontSize: '11px', letterSpacing: '0.15em' },
  credits: { textAlign: 'center', marginTop: '80px', paddingTop: '40px', borderTop: '2px dashed var(--ink-faint)' },
};

window.WarpZone = WarpZone;
window.AIDimension = AIDimension;
window.Inventory = Inventory;
})();

/* ============================================================
   TELEPORTERS — IntersectionObserver-driven
   ============================================================ */
(() => {
const { useState, useEffect, useRef } = React;

function TeleportAnchor({ id, kind, color = 'var(--neon-cyan)', label = '' }) {
  const ref = useRef(null);
  useEffect(() => {
    if (!('IntersectionObserver' in window)) return;
    let fired = false;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting && !fired) {
          fired = true;
          window.__triggerTeleport?.(kind, color, label);
          obs.disconnect();
        }
      });
    }, { rootMargin: '0px 0px -45% 0px' });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [kind, color, label]);

  return (
    <div ref={ref} id={id} style={{
      width: '100%', height: '120px', display: 'flex',
      alignItems: 'center', justifyContent: 'center', position: 'relative',
    }}>
      <div className="pixel-text" style={{ fontSize: '10px', color, letterSpacing: '0.3em', textShadow: `0 0 8px ${color}` }}>
        ◆ ◆ ◆ TELEPORT ◆ ◆ ◆
      </div>
    </div>
  );
}

function TeleportOverlay() {
  const [state, setState] = useState(null);
  const audio = window.useAudio?.();
  useEffect(() => {
    window.__triggerTeleport = (kind, color, label) => {
      setState({ kind, color, label, t: Date.now() });
      audio?.sfx('warp');
      setTimeout(() => setState(null), kind === 'warp-final' ? 2200 : 1600);
    };
    return () => { delete window.__triggerTeleport; };
  }, [audio]);
  if (!state) return null;
  return <TeleportFx {...state} />;
}

function TeleportFx({ kind, color, label }) {
  const variants = {
    'pixelate':   <PixelateFx color={color} label={label} />,
    'warp-pipe':  <WarpPipeFx color={color} label={label} />,
    'crt-off':    <CrtOffFx color={color} label={label} />,
    'mode7':      <Mode7Fx color={color} label={label} />,
    'glitch':     <GlitchFx color={color} label={label} />,
    'warp-final': <WarpFinalFx color={color} label={label} />,
  };
  return (
    <div className="fx-overlay" style={{ position: 'fixed', inset: 0, top: 0, right: 0, bottom: 0, left: 0, zIndex: 10020, pointerEvents: 'none', overflow: 'hidden' }}>
      {variants[kind] || variants.pixelate}
    </div>
  );
}

function PixelateFx({ color, label }) {
  return (<>
    <div className="fx-layer" style={{
      position: 'absolute', inset: 0, top: 0, right: 0, bottom: 0, left: 0,
      background: `radial-gradient(circle at center, rgba(5,3,15,0.04) 0%, rgba(5,3,15,0.24) 72%, rgba(5,3,15,0.36) 100%), repeating-conic-gradient(from 45deg, transparent 0deg 62deg, ${color} 62deg 90deg, transparent 90deg 180deg)`,
      backgroundSize: '24px 24px', animation: 'pixelate-anim 1.6s steps(14) forwards',
      willChange: 'transform, background-size, opacity',
    }} />
    <FxLabel color={color}>{label || 'PIXELATING...'}</FxLabel>
  </>);
}

function WarpPipeFx({ color, label }) {
  return (<>
    <div className="fx-layer" style={{
      position: 'absolute', inset: 0, top: 0, right: 0, bottom: 0, left: 0,
      background: 'var(--bg-void)', animation: 'pipe-fade 1.6s ease-in-out forwards',
    }}>
      <div style={{
        position: 'absolute', left: '50%', bottom: 0, transform: 'translateX(-50%)',
        width: 'min(320px, 70vw)', height: '60vh',
        background: `linear-gradient(90deg, #1a5e2e 0 12%, #39ff90 12% 24%, #1a5e2e 24% 50%, #0d3a1c 50% 70%, #39ff90 70% 82%, #1a5e2e 82%)`,
        border: '6px solid #0a0820',
        animation: 'pipe-rise 1.6s cubic-bezier(.5,1.5,.7,1) forwards',
        boxShadow: '0 0 60px #39ff90', willChange: 'transform',
      }}>
        <div style={{ position: 'absolute', top: '-30px', left: '-30px', right: '-30px', height: '60px', background: '#39ff90', border: '6px solid #0a0820', borderRadius: '6px 6px 0 0' }} />
        <div style={{ position: 'absolute', top: '40px', left: '50%', transform: 'translateX(-50%)', color: '#0a0820', fontFamily: 'var(--pixel)', fontSize: '14px', animation: 'pipe-suck 1.6s ease-in forwards' }}>↓ ↓ ↓</div>
      </div>
    </div>
    <FxLabel color={color}>{label || 'WARP PIPE ACTIVATED'}</FxLabel>
  </>);
}

function CrtOffFx({ color, label }) {
  return (<>
    {/* Background uses keyframe colors (tinted, not white) — avoids high-luminance strobe. */}
    <div className="fx-layer" style={{ position: 'absolute', inset: 0, top: 0, right: 0, bottom: 0, left: 0, animation: 'crt-off-anim 1.6s steps(8) forwards', willChange: 'transform, opacity' }} />
    <FxLabel color={color}>{label || 'SIGNAL...'}</FxLabel>
  </>);
}

function Mode7Fx({ color, label }) {
  return (<>
    <div className="fx-layer" style={{ position: 'absolute', inset: 0, top: 0, right: 0, bottom: 0, left: 0, background: 'var(--bg-void)' }}>
      <div style={{
        position: 'absolute', inset: 0, top: 0, right: 0, bottom: 0, left: 0,
        background: `repeating-linear-gradient(90deg, transparent 0 60px, ${color} 60px 62px), repeating-linear-gradient(0deg, transparent 0 60px, ${color} 60px 62px)`,
        transformOrigin: 'center bottom', animation: 'mode7-anim 1.6s ease-in forwards',
        boxShadow: `inset 0 0 200px ${color}`, willChange: 'transform, opacity',
      }} />
    </div>
    <FxLabel color={color}>{label || 'ENGAGING MODE-7'}</FxLabel>
  </>);
}

function GlitchFx({ color, label }) {
  return (<>
    <div className="fx-layer" style={{ position: 'absolute', inset: 0, top: 0, right: 0, bottom: 0, left: 0, background: 'var(--bg-void)', animation: 'glitch-bg 1.6s steps(20) forwards' }} />
    {/* Reduced from 6→4 bands at 0.35 opacity (was 0.7) — calmer transition */}
    {[0, 1, 2, 3].map((i) => (
      <div key={i} className="fx-layer" style={{
        position: 'absolute', left: 0, right: 0, top: `${i * 22 + 8}%`, height: '12%',
        background: i % 3 === 0 ? 'var(--neon-magenta)' : i % 3 === 1 ? 'var(--neon-cyan)' : 'var(--neon-yellow)',
        animation: `glitch-band-${i % 2} ${0.85 + i * 0.12}s steps(8) forwards`,
        opacity: 0.62, willChange: 'transform, opacity',
      }} />
    ))}
    <FxLabel color={color}>{label || 'BUFFER OVERFLOW'}</FxLabel>
  </>);
}

function WarpFinalFx({ color, label }) {
  return (<>
    {/* No #fff core — center starts at the tinted accent so total luminance stays well below the seizure threshold. */}
    <div className="fx-layer" style={{
      position: 'absolute', inset: 0, top: 0, right: 0, bottom: 0, left: 0,
      background: 'radial-gradient(circle at center, rgba(237,60,198,0.55) 0%, rgba(237,60,198,0.4) 25%, rgba(45,228,240,0.3) 55%, var(--bg-void) 100%)',
      animation: 'warp-final-bg 1.8s ease-out forwards', willChange: 'transform, opacity',
    }} />
    {Array.from({ length: WARP_FINAL_RINGS }).map((_, i) => (
      <div key={i} style={{
        position: 'absolute', left: '50%', top: '50%',
        width: '100px', height: '100px', marginLeft: '-50px', marginTop: '-50px',
        border: `4px solid ${i % 2 === 0 ? 'var(--neon-cyan)' : 'var(--neon-magenta)'}`,
        borderRadius: '50%', animation: `warp-ring-final 1.8s ease-out forwards`,
        animationDelay: `${i * 0.08}s`, boxShadow: `0 0 20px currentColor`,
        color: i % 2 === 0 ? 'var(--neon-cyan)' : 'var(--neon-magenta)',
        willChange: 'transform, opacity',
      }} />
    ))}
    {Array.from({ length: WARP_FINAL_STREAKS }).map((_, i) => {
      const angle = (i / WARP_FINAL_STREAKS) * Math.PI * 2;
      return (
        <div key={i} style={{
          position: 'absolute', left: '50%', top: '50%', width: '4px', height: '40vh',
          background: i % 2 === 0 ? 'var(--neon-yellow)' : 'var(--neon-pink)',
          transformOrigin: 'top center',
          transform: `translate(-50%, 0) rotate(${angle}rad)`,
          animation: `warp-streak 1.8s ease-out forwards`,
          animationDelay: `${(i * 0.02) % 0.4}s`,
          boxShadow: '0 0 10px currentColor',
          willChange: 'transform, opacity',
        }} />
      );
    })}
    <div style={{ position: 'absolute', inset: 0, top: 0, right: 0, bottom: 0, left: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="pixel-text" style={{
        fontSize: 'clamp(36px, 8vw, 96px)', color: 'var(--ink)',
        textShadow: '0 0 20px var(--neon-magenta), 4px 0 0 var(--neon-cyan), -4px 0 0 var(--neon-yellow)',
        letterSpacing: '0.1em', animation: 'warp-final-text 1.8s ease-out forwards',
        willChange: 'transform, opacity',
      }}>WARP!</div>
    </div>
  </>);
}

function FxLabel({ color, children }) {
  return (
    <div style={{ position: 'absolute', left: 0, right: 0, top: '50%', transform: 'translateY(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '14px', padding: '0 16px' }}>
      <div className="pixel-text" style={{
        fontSize: 'clamp(18px, 4vw, 42px)', color: 'var(--ink)',
        textShadow: `0 0 12px ${color}, 3px 0 0 var(--neon-magenta), -3px 0 0 var(--neon-cyan)`,
        letterSpacing: '0.15em', animation: 'warp-shake 0.4s steps(4) infinite', textAlign: 'center',
      }}>{children}</div>
      <div className="pixel-text blink" style={{ fontSize: '11px', color }}>▼ TELEPORTING ▼</div>
    </div>
  );
}

window.TeleportAnchor = TeleportAnchor;
window.TeleportOverlay = TeleportOverlay;
})();

/* ============================================================
   AMBIENT GAMING OBJECTS — Active-Theory inspired depth layer.
   Pure SVG, pointer-events: none, GPU transforms only.
   Disabled on prefers-reduced-motion via .ambient-layer CSS.
   ============================================================ */
(() => {
const ICONS = {
  dpad: (
    <svg viewBox="0 0 32 32" width="100%" height="100%" aria-hidden="true">
      <rect x="11" y="3"  width="10" height="10" fill="currentColor" />
      <rect x="11" y="19" width="10" height="10" fill="currentColor" />
      <rect x="3"  y="11" width="10" height="10" fill="currentColor" />
      <rect x="19" y="11" width="10" height="10" fill="currentColor" />
      <rect x="13" y="13" width="6" height="6" fill="rgba(0,0,0,0.4)" />
    </svg>
  ),
  gem: (
    <svg viewBox="0 0 32 32" width="100%" height="100%" aria-hidden="true">
      <polygon points="16,2 28,12 16,30 4,12" fill="currentColor" stroke="rgba(0,0,0,0.4)" strokeWidth="1" />
      <polygon points="16,2 22,12 16,18 10,12" fill="rgba(255,255,255,0.18)" />
    </svg>
  ),
  sword: (
    <svg viewBox="0 0 32 32" width="100%" height="100%" aria-hidden="true">
      <rect x="14" y="3" width="4" height="20" fill="currentColor" />
      <rect x="10" y="22" width="12" height="3" fill="currentColor" />
      <rect x="14" y="25" width="4" height="6" fill="rgba(160,120,69,0.9)" />
      <rect x="15" y="4" width="2" height="18" fill="rgba(255,255,255,0.3)" />
    </svg>
  ),
  heart: (
    <svg viewBox="0 0 32 32" width="100%" height="100%" aria-hidden="true">
      <rect x="6"  y="8"  width="6" height="6" fill="currentColor" />
      <rect x="20" y="8"  width="6" height="6" fill="currentColor" />
      <rect x="6"  y="14" width="20" height="6" fill="currentColor" />
      <rect x="10" y="20" width="12" height="4" fill="currentColor" />
      <rect x="14" y="24" width="4" height="3" fill="currentColor" />
      <rect x="9"  y="9"  width="2" height="2" fill="rgba(255,255,255,0.5)" />
    </svg>
  ),
  coin: (
    <svg viewBox="0 0 32 32" width="100%" height="100%" aria-hidden="true">
      <circle cx="16" cy="16" r="12" fill="currentColor" />
      <circle cx="16" cy="16" r="8" fill="rgba(0,0,0,0.25)" />
      <text x="16" y="21" textAnchor="middle" fontFamily="monospace" fontWeight="700"
            fontSize="12" fill="currentColor">$</text>
    </svg>
  ),
  controller: (
    <svg viewBox="0 0 48 32" width="100%" height="100%" aria-hidden="true">
      <rect x="2" y="6" width="44" height="22" rx="6" fill="currentColor" />
      <rect x="6" y="13" width="3" height="9" fill="rgba(0,0,0,0.5)" />
      <rect x="3" y="16" width="9" height="3" fill="rgba(0,0,0,0.5)" />
      <circle cx="34" cy="14" r="2" fill="rgba(0,0,0,0.5)" />
      <circle cx="40" cy="20" r="2" fill="rgba(0,0,0,0.5)" />
      <circle cx="40" cy="14" r="2" fill="rgba(0,0,0,0.5)" />
      <circle cx="34" cy="20" r="2" fill="rgba(0,0,0,0.5)" />
    </svg>
  ),
  floppy: (
    <svg viewBox="0 0 32 32" width="100%" height="100%" aria-hidden="true">
      <rect x="3" y="3" width="26" height="26" fill="currentColor" />
      <rect x="7" y="3" width="14" height="9" fill="rgba(0,0,0,0.45)" />
      <rect x="16" y="5" width="3" height="6" fill="currentColor" />
      <rect x="9" y="18" width="14" height="9" fill="rgba(0,0,0,0.25)" />
    </svg>
  ),
  star: (
    <svg viewBox="0 0 32 32" width="100%" height="100%" aria-hidden="true">
      <polygon points="16,2 20,12 30,13 22,20 25,30 16,24 7,30 10,20 2,13 12,12"
               fill="currentColor" />
    </svg>
  ),
};

/* Static layout — no per-object randomness on each render.
   Positions chosen so objects spread across the viewport without clustering. */
const OBJECTS = [
  { type: 'dpad',       size: 78,  top: '6%',  left: '4%',  color: 'var(--neon-cyan)',    speed: 'slow' },
  { type: 'gem',        size: 56,  top: '14%', left: '88%', color: 'var(--neon-magenta)', speed: 'med'  },
  { type: 'sword',      size: 68,  top: '32%', left: '2%',  color: 'var(--neon-yellow)',  speed: 'med'  },
  { type: 'heart',      size: 50,  top: '46%', left: '92%', color: 'var(--neon-pink)',    speed: 'fast' },
  { type: 'coin',       size: 60,  top: '60%', left: '6%',  color: 'var(--neon-yellow)',  speed: 'slow' },
  { type: 'controller', size: 96,  top: '70%', left: '82%', color: 'var(--neon-cyan)',    speed: 'med'  },
  { type: 'floppy',     size: 54,  top: '84%', left: '10%', color: 'var(--neon-green)',   speed: 'slow' },
  { type: 'star',       size: 44,  top: '90%', left: '70%', color: 'var(--neon-magenta)', speed: 'fast' },
  { type: 'gem',        size: 38,  top: '24%', left: '46%', color: 'var(--neon-cyan)',    speed: 'fast' },
  { type: 'star',       size: 34,  top: '54%', left: '40%', color: 'var(--neon-yellow)',  speed: 'med'  },
];

function FloatingGameObjects() {
  /* On low-end / mobile, render half the objects */
  const list = (IS_MOBILE || IS_LOW_END) ? OBJECTS.filter((_, i) => i % 2 === 0) : OBJECTS;
  return (
    <div className="ambient-layer" aria-hidden="true">
      {list.map((o, i) => (
        <div key={i} className={`ambient-obj ${o.speed}`} style={{
          top: o.top, left: o.left, width: o.size, height: o.size, color: o.color,
          animationDelay: `${(i * 0.6) % 4}s`,
        }}>
          {ICONS[o.type]}
        </div>
      ))}
    </div>
  );
}

window.FloatingGameObjects = FloatingGameObjects;
})();

/* ============================================================
   APP — Boot + scrolling overworld
   ============================================================ */

const { useState, useEffect, useRef } = React;

const TWEAK_DEFAULTS = { crtEnabled: !IS_LOW_END, characterScale: 1, audioEnabled: false, showHud: true };

function App() {
  const [booted, setBooted] = useState(false);
  const [warped, setWarped] = useState(false);
  const [tweaks, setTweaks] = useState(TWEAK_DEFAULTS);

  useEffect(() => {
    if (tweaks.crtEnabled) document.body.classList.add('crt-on');
    else document.body.classList.remove('crt-on');
  }, [tweaks.crtEnabled]);

  const AudioProvider = window.AudioProvider;
  return (
    <AudioProvider>
      <AppInner booted={booted} setBooted={setBooted} warped={warped} setWarped={setWarped}
        tweaks={tweaks} setTweaks={setTweaks} />
    </AudioProvider>
  );
}

function AppInner({ booted, setBooted, warped, setWarped, tweaks, setTweaks }) {
  const audio = window.useAudio();
  useEffect(() => { if (audio) audio.setMuted(!tweaks.audioEnabled); }, [tweaks.audioEnabled, audio]);

  if (!booted) return <window.BootScreen onComplete={() => setBooted(true)} />;

  return (<>
    <window.FloatingGameObjects />
    <div className="grain" aria-hidden="true" />
    <Hud tweaks={tweaks} setTweaks={setTweaks} warped={warped} />
    <ScrollWorld onWarp={() => setWarped(true)} warped={warped} characterScale={tweaks.characterScale} />
  </>);
}

function Hud({ tweaks, setTweaks, warped }) {
  if (!tweaks.showHud) return null;
  return (
    <div style={hudStyles.root} className="hud-root">
      <div style={hudStyles.left}>
        <div className="pixel-text hud-title" style={{ fontSize: '10px', color: 'var(--neon-yellow)' }}>DINO.EXE</div>
        <div className="pixel-text hud-subtitle" style={{ fontSize: '8px', color: 'var(--ink-faint)', marginTop: '4px' }}>PORTFOLIO v3.0</div>
      </div>
      <div style={hudStyles.center} className="hud-center">
        <div className="pixel-text" style={{ fontSize: '9px', color: warped ? 'var(--neon-magenta)' : 'var(--neon-cyan)' }}>{warped ? 'DIMENSION α' : 'OVERWORLD'}</div>
      </div>
      <div style={hudStyles.right}>
        <button className="pixel-text hud-btn" style={hudStyles.hudBtn} aria-label="Toggle audio"
          onClick={() => setTweaks(t => ({ ...t, audioEnabled: !t.audioEnabled }))}>
          {tweaks.audioEnabled ? '♪ ON' : '♪ OFF'}
        </button>
        <button className="pixel-text hud-btn" style={hudStyles.hudBtn} aria-label="Toggle CRT effect"
          onClick={() => setTweaks(t => ({ ...t, crtEnabled: !t.crtEnabled }))}>
          CRT {tweaks.crtEnabled ? '■' : '□'}
        </button>
      </div>
    </div>
  );
}

function ScrollWorld({ onWarp, warped, characterScale }) {
  const [moving, setMoving] = useState(false);
  const moveTimer = useRef(null);
  const [warpTriggered, setWarpTriggered] = useState(false);
  const [flashing, setFlashing] = useState(false);
  const audio = window.useAudio();

  // rAF-throttled scroll listener — set "moving" only when scrollY actually changes
  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        if (Math.abs(y - lastY) > 1) {
          setMoving(true);
          if (moveTimer.current) clearTimeout(moveTimer.current);
          moveTimer.current = setTimeout(() => setMoving(false), 220);
        }
        lastY = y;
        ticking = false;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleWarp = () => {
    if (warpTriggered) return;
    setWarpTriggered(true);
    setFlashing(true);
    audio?.sfx('warp');
    setTimeout(() => setFlashing(false), 700);
    onWarp();
  };

  return (
    <div style={{ position: 'relative' }}>
      <CharacterFollower moving={moving} scale={characterScale} warped={warped} />
      <window.TeleportOverlay />
      <window.World1Academic />
      <window.TeleportAnchor id="tp-1" kind="pixelate" color="var(--neon-magenta)" label="LOADING WORLD 2" />
      <window.Marquee items={['WORLD 2 · CHARACTER CLASS', 'AI ENGINEER', 'DATA SCIENTIST']} color="var(--neon-magenta)" dir={1} />
      <window.World2Class />
      <window.TeleportAnchor id="tp-2" kind="warp-pipe" color="var(--neon-green)" label="ENTERING SHOP" />
      <window.Marquee items={['WORLD 3 · SHOP', 'WHAT I CAN BUILD FOR YOU', 'SERVICES UNLOCKED']} color="var(--neon-yellow)" dir={-1} />
      <window.World3Shop />
      <window.TeleportAnchor id="tp-3" kind="glitch" color="var(--neon-pink)" label="DIMENSIONAL BREACH" />
      <window.Marquee items={['◢◤ WARNING ◥◣', 'DIMENSIONAL BREACH AHEAD', 'PROCEED WITH CURIOSITY']} color="var(--neon-pink)" dir={1} />
      <window.WarpZone onEnter={handleWarp} />
      <window.TeleportAnchor id="tp-4" kind="warp-final" color="var(--neon-cyan)" label="DIMENSION α" />
      <window.AIDimension />
      <window.TeleportAnchor id="tp-5" kind="mode7" color="var(--neon-yellow)" label="FINAL ZONE" />
      <window.Marquee items={['FINAL ZONE', 'PICK UP ITEMS', 'GET IN TOUCH']} color="var(--neon-yellow)" dir={1} />
      <window.Inventory />
      {/* Tinted, capped-opacity overlay — was full white at peak. */}
      {flashing && <div style={{
        position: 'fixed', inset: 0, top: 0, right: 0, bottom: 0, left: 0,
        background: 'rgba(45, 228, 240, 0.4)', zIndex: 10010,
        animation: 'flash-out 0.7s ease-out forwards',
        pointerEvents: 'none', willChange: 'opacity',
      }} />}
    </div>
  );
}

function CharacterFollower({ moving, scale, warped }) {
  return (
    <div className="char-follower" style={{
      position: 'fixed', right: '32px', bottom: '32px', zIndex: 100, pointerEvents: 'none',
    }}>
      <div style={{
        position: 'absolute', inset: '-20px', top: '-20px', right: '-20px', bottom: '-20px', left: '-20px',
        background: warped
          ? 'radial-gradient(circle, rgba(255, 43, 214, 0.4) 0%, transparent 70%)'
          : 'radial-gradient(circle, rgba(0, 240, 255, 0.3) 0%, transparent 70%)',
        animation: 'pulse 2s ease-in-out infinite', willChange: 'transform, opacity',
      }} />
      <div className="char-follower-inner" style={{
        position: 'relative', background: 'rgba(5, 3, 15, 0.7)',
        border: `2px solid ${warped ? 'var(--neon-magenta)' : 'var(--neon-cyan)'}`,
        padding: '10px',
        boxShadow: `0 0 20px ${warped ? 'var(--neon-magenta)' : 'var(--neon-cyan)'}80`,
      }}>
        <window.PixelCharacter moving={moving} scale={scale} />
        <div className="pixel-text char-follower-label" style={{
          fontSize: '7px', textAlign: 'center', marginTop: '6px',
          color: warped ? 'var(--neon-magenta)' : 'var(--neon-cyan)', letterSpacing: '0.1em',
        }}>{moving ? '▶ MOVING' : '◆ IDLE'}</div>
      </div>
    </div>
  );
}

const hudStyles = {
  root: {
    position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200,
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    padding: '12px 20px', background: 'rgba(5, 3, 15, 0.85)',
    borderBottom: '2px solid var(--neon-cyan)',
    backdropFilter: 'blur(4px)', WebkitBackdropFilter: 'blur(4px)',
  },
  left: {}, center: {},
  right: { display: 'flex', gap: '8px' },
  hudBtn: { fontSize: '9px', padding: '6px 10px', background: 'var(--bg-void)', color: 'var(--neon-cyan)', border: '1px solid var(--neon-cyan)', cursor: 'pointer', letterSpacing: '0.1em' },
};

const rootEl = document.getElementById('app-root');
if (ReactDOM.createRoot) {
  ReactDOM.createRoot(rootEl).render(<App />);
} else {
  ReactDOM.render(<App />, rootEl);
}
