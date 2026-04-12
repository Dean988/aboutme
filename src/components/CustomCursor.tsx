import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
  const glowRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) {
      return;
    }

    const glow = glowRef.current;
    const ring = ringRef.current;
    const dot = dotRef.current;

    if (!glow || !ring || !dot) {
      return;
    }

    gsap.set([glow, ring, dot], { xPercent: -50, yPercent: -50 });

    const moveGlowX = gsap.quickTo(glow, 'x', { duration: 0.55, ease: 'power3.out' });
    const moveGlowY = gsap.quickTo(glow, 'y', { duration: 0.55, ease: 'power3.out' });
    const moveRingX = gsap.quickTo(ring, 'x', { duration: 0.25, ease: 'power3.out' });
    const moveRingY = gsap.quickTo(ring, 'y', { duration: 0.25, ease: 'power3.out' });
    const moveDotX = gsap.quickTo(dot, 'x', { duration: 0.12, ease: 'power2.out' });
    const moveDotY = gsap.quickTo(dot, 'y', { duration: 0.12, ease: 'power2.out' });

    const handlePointerMove = (event: PointerEvent) => {
      moveGlowX(event.clientX);
      moveGlowY(event.clientY);
      moveRingX(event.clientX);
      moveRingY(event.clientY);
      moveDotX(event.clientX);
      moveDotY(event.clientY);
    };

    const activateLargeState = () => {
      gsap.to(glow, { scale: 1.22, opacity: 0.9, duration: 0.25, ease: 'power2.out' });
      gsap.to(ring, { scale: 1.8, borderColor: 'rgba(124, 233, 255, 0.65)', duration: 0.25 });
      gsap.to(dot, { scale: 0.55, duration: 0.2 });
    };

    const activateMediaState = () => {
      gsap.to(glow, { scale: 1.45, opacity: 1, duration: 0.25, ease: 'power2.out' });
      gsap.to(ring, { scale: 2.1, borderColor: 'rgba(211, 135, 255, 0.65)', duration: 0.25 });
      gsap.to(dot, { scale: 0.3, duration: 0.2 });
    };

    const resetState = () => {
      gsap.to(glow, { scale: 1, opacity: 0.75, duration: 0.25, ease: 'power2.out' });
      gsap.to(ring, { scale: 1, borderColor: 'rgba(124, 233, 255, 0.32)', duration: 0.25 });
      gsap.to(dot, { scale: 1, duration: 0.2 });
    };

    const handlePointerOver = (event: PointerEvent) => {
      const target = event.target as HTMLElement | null;
      const interactive = target?.closest<HTMLElement>(
        '[data-cursor="media"], [data-cursor="large"], a, button, .surface-card',
      );

      if (!interactive) {
        resetState();
        return;
      }

      const cursorMode = interactive.dataset.cursor;

      if (cursorMode === 'media') {
        activateMediaState();
        return;
      }

      activateLargeState();
    };

    const handlePointerLeave = () => {
      resetState();
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    document.addEventListener('pointerover', handlePointerOver);
    document.addEventListener('pointerout', handlePointerLeave);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('pointerover', handlePointerOver);
      document.removeEventListener('pointerout', handlePointerLeave);
    };
  }, []);

  return (
    <div className="custom-cursor" aria-hidden="true">
      <div ref={glowRef} className="custom-cursor__glow" />
      <div ref={ringRef} className="custom-cursor__ring" />
      <div ref={dotRef} className="custom-cursor__dot" />
    </div>
  );
}
