import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Preloader() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();
    
    // Initial text reveal
    tl.fromTo(textRef.current, 
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
    )
    .to(textRef.current, {
      opacity: 0, y: -50, duration: 0.8, ease: 'power3.in', delay: 0.5
    })
    .to(containerRef.current, {
      yPercent: -100,
      duration: 1.2,
      ease: 'power4.inOut',
      onComplete: () => {
        if (containerRef.current) containerRef.current.style.display = 'none';
      }
    });

  }, []);

  return (
    <div 
      ref={containerRef}
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: '#030303',
        zIndex: 5000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'var(--color-accent)'
      }}
    >
      <h1 ref={textRef} style={{ fontSize: '3rem', letterSpacing: '0.2em' }}>
        LOADING_
      </h1>
    </div>
  );
}
