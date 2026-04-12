import { Suspense, lazy, useEffect } from 'react';
import Lenis from 'lenis';
import About from './sections/About';
import Contact from './sections/Contact';
import CustomCursor from './components/CustomCursor';
import Education from './sections/Education';
import Experience from './sections/Experience';
import Hero from './sections/Hero';
import Preloader from './components/Preloader';
import Services from './sections/Services';

const CanvasBackground = lazy(() => import('./components/CanvasBackground'));

const navigationItems = [
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Experience', href: '#experience' },
  { label: 'Education', href: '#education' },
  { label: 'Contact', href: '#contact' },
];

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.05,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    });

    let frameId = 0;

    const raf = (time: number) => {
      lenis.raf(time);
      frameId = requestAnimationFrame(raf);
    };

    frameId = requestAnimationFrame(raf);

    const root = document.documentElement;

    const updatePointer = (event: PointerEvent) => {
      root.style.setProperty('--pointer-x', `${event.clientX}px`);
      root.style.setProperty('--pointer-y', `${event.clientY}px`);
    };

    root.style.setProperty('--pointer-x', `${window.innerWidth / 2}px`);
    root.style.setProperty('--pointer-y', `${window.innerHeight / 2}px`);

    window.addEventListener('pointermove', updatePointer, { passive: true });

    return () => {
      cancelAnimationFrame(frameId);
      lenis.destroy();
      window.removeEventListener('pointermove', updatePointer);
    };
  }, []);

  return (
    <>
      <Preloader />
      <Suspense fallback={null}>
        <CanvasBackground />
      </Suspense>
      <div className="page-media-backdrop" aria-hidden="true">
        <img src="/background.gif" alt="" />
      </div>
      <div className="page-scanlines" aria-hidden="true" />
      <CustomCursor />

      <header className="site-header">
        <div className="section-shell site-header__inner">
          <a className="brand" href="#home">
            Dino Di Emidio
            <span>Data Scientist and AI Engineer</span>
          </a>

          <nav className="site-nav" aria-label="Primary">
            {navigationItems.map((item) => (
              <a key={item.href} href={item.href} data-cursor="large">
                {item.label}
              </a>
            ))}
          </nav>

          <a className="header-cta" href="#contact" data-cursor="large">
            Let&apos;s build something
          </a>
        </div>
      </header>

      <main className="app-shell">
        <Hero />
        <About />
        <Services />
        <Experience />
        <Education />
        <Contact />
      </main>
    </>
  );
}

export default App;
