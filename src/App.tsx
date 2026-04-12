import { useEffect } from 'react';
import Lenis from 'lenis';
import About from './sections/About';
import Contact from './sections/Contact';
import Education from './sections/Education';
import Experience from './sections/Experience';
import Hero from './sections/Hero';
import Services from './sections/Services';

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
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.6,
    });

    let frameId = 0;

    const raf = (time: number) => {
      lenis.raf(time);
      frameId = requestAnimationFrame(raf);
    };

    frameId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frameId);
      lenis.destroy();
    };
  }, []);

  return (
    <>
      <header className="site-header">
        <div className="section-shell site-header__inner">
          <a className="brand" href="#home">
            Dino Di Emidio
            <span>Data Scientist and AI Engineer</span>
          </a>

          <nav className="site-nav" aria-label="Primary">
            {navigationItems.map((item) => (
              <a key={item.href} href={item.href}>
                {item.label}
              </a>
            ))}
          </nav>

          <a className="header-cta" href="#contact">
            Start a conversation
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
