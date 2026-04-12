import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Preloader() {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timeline = gsap.timeline();

    timeline
      .fromTo(
        contentRef.current,
        { opacity: 0, scale: 0.94, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: 1.2, ease: 'power3.out' },
      )
      .to(contentRef.current, {
        opacity: 0,
        scale: 1.04,
        duration: 0.75,
        ease: 'power3.inOut',
        delay: 1.1,
      })
      .to(containerRef.current, {
        opacity: 0,
        pointerEvents: 'none',
        duration: 0.65,
        ease: 'power2.out',
        onComplete: () => {
          if (containerRef.current) {
            containerRef.current.style.display = 'none';
          }
        },
      });
  }, []);

  return (
    <div ref={containerRef} className="preloader">
      <div ref={contentRef} className="preloader__content">
        <div className="preloader__media">
          <div className="preloader__pulse" />
          <img src="/autonomous_agents.gif" alt="Loading animation" />
        </div>

        <div className="preloader__text">
          <span>Interactive portfolio loading</span>
          <strong>Data, systems, motion, experience.</strong>
        </div>
      </div>
    </div>
  );
}
