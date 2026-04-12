import { useEffect } from 'react';
import Lenis from 'lenis';
import CanvasBackground from './components/CanvasBackground';
import CustomCursor from './components/CustomCursor';
import Preloader from './components/Preloader';
import Hero from './sections/Hero';

import About from './sections/About';
import Experience from './sections/Experience';
import Education from './sections/Education';
import Services from './sections/Services';
import Contact from './sections/Contact';

function App() {

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <>
      <Preloader />
      <CustomCursor />
      <CanvasBackground />
      
      <main style={{ position: 'relative', zIndex: 10 }}>
        <Hero />
        <Education />
        <Services />
        <About />
        <Experience />
        <Contact />
      </main>
    </>
  );
}

export default App;
