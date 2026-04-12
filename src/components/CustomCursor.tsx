import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;

    if (!cursor || !follower) return;

    // Set initial position
    gsap.set([cursor, follower], { xPercent: -50, yPercent: -50 });

    const onMouseMove = (e: MouseEvent) => {
      // Fast dot
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: 'power2.out'
      });
      
      // Trailing ring
      gsap.to(follower, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.5,
        ease: 'power2.out'
      });
    };

    const addHoverLinks = () => {
      const links = document.querySelectorAll('a, button');
      links.forEach(link => {
        link.addEventListener('mouseenter', () => {
          gsap.to(cursor, { scale: 0, duration: 0.2 });
          gsap.to(follower, { scale: 1.5, backgroundColor: 'var(--color-accent)', opacity: 0.2, duration: 0.3 });
        });
        link.addEventListener('mouseleave', () => {
          gsap.to(cursor, { scale: 1, duration: 0.2 });
          gsap.to(follower, { scale: 1, backgroundColor: 'transparent', opacity: 1, duration: 0.3 });
        });
      });
    };

    window.addEventListener('mousemove', onMouseMove);
    
    // Slight delay to allow DOM to render links
    setTimeout(addHoverLinks, 1000);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  return (
    <>
      <div 
        ref={cursorRef} 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '6px',
          height: '6px',
          borderRadius: '50%',
          backgroundColor: 'var(--color-accent)',
          pointerEvents: 'none',
          zIndex: 9999,
          mixBlendMode: 'difference'
        }}
      />
      <div 
        ref={followerRef} 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '32px',
          height: '32px',
          borderRadius: '50%',
          border: '1px solid var(--color-accent)',
          pointerEvents: 'none',
          zIndex: 9998,
          transition: 'border 0.2s',
          mixBlendMode: 'difference'
        }}
      />
    </>
  );
}
