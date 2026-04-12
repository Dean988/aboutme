import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Preloader() {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();
    
    // Initial fade in for the whole container
    tl.fromTo(contentRef.current, 
      { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1, duration: 1.5, ease: 'power3.out' }
    )
    // Hold it for a moment so the user sees the cool GIF
    .to(contentRef.current, {
      opacity: 0, scale: 1.1, duration: 0.8, ease: 'power3.in', delay: 1.5
    })
    // Slide the door up
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
      <div ref={contentRef} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}>
        <div style={{ position: 'relative', width: '250px', height: '250px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          {/* Subtle glow behind the GIF */}
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle, rgba(255,51,0,0.15) 0%, transparent 60%)', filter: 'blur(30px)' }} />
          <img 
            src="https://mir-s3-cdn-cf.behance.net/project_modules/fs/b6e0b072897469.5bf6e79950d23.gif" 
            alt="Loading HUD" 
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              mixBlendMode: 'screen',
              position: 'relative',
              zIndex: 1
            }}
          />
        </div>
        <div style={{ 
          fontFamily: 'var(--font-retro)', 
          fontSize: '0.7rem', 
          letterSpacing: '0.2em',
          color: 'var(--color-tertiary)',
          animation: 'pulse 1.5s infinite' 
        }}>
          INITIALIZING_SYSTEMS
        </div>
      </div>
      <style>
        {`
          @keyframes pulse {
            0% { opacity: 0.5; }
            50% { opacity: 1; text-shadow: 0 0 10px var(--color-tertiary); }
            100% { opacity: 0.5; }
          }
        `}
      </style>
    </div>
  );
}
