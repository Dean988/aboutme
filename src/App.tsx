import { useEffect } from 'react';
import Lenis from 'lenis';
import About from './sections/About';
import Contact from './sections/Contact';
import Education from './sections/Education';
import Experience from './sections/Experience';
import Hero from './sections/Hero';
import Services from './sections/Services';

const navigationItems = [
  { label: 'Education', href: '#education' },
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Services', href: '#services' },
  { label: 'Contact', href: '#contact' },
];

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.3,
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
            Get in touch
          </a>
        </div>
      </header>

      <main className="app-shell">
        <Hero />
        <Education />
        <About />
        <Experience />
        <Services />
        <Contact />
      </main>
    </>
  );
}

export default App;
