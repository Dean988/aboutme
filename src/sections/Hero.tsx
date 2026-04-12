import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const title1Ref = useRef<HTMLHeadingElement>(null);
  const title2Ref = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const retroTagsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 2.5 });
    
    tl.fromTo(title1Ref.current,
      { y: 100, opacity: 0, rotationX: -15, transformPerspective: 500 },
      { y: 0, opacity: 1, rotationX: 0, duration: 1.2, ease: 'power4.out' }
    )
    .fromTo(title2Ref.current,
      { y: 100, opacity: 0, rotationX: -15, transformPerspective: 500 },
      { y: 0, opacity: 1, rotationX: 0, duration: 1.2, ease: 'power4.out' },
      "-=1.0"
    )
    .fromTo(subtitleRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1 },
      "-=0.6"
    )
    .fromTo(retroTagsRef.current?.children || [],
       { opacity: 0, x: -20 },
       { opacity: 1, x: 0, duration: 0.5, stagger: 0.1 },
       "-=0.5"
    );

  }, []);

  return (
    <section 
      ref={containerRef}
      style={{
        height: '100vh',
        width: '100vw',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '0 10vw',
        position: 'relative',
        zIndex: 10
      }}
    >
      <div style={{ overflow: 'hidden', paddingBottom: '1rem' }}>
        <h1 
          ref={title1Ref} 
          style={{ 
            fontSize: 'clamp(3rem, 8vw, 8rem)', 
            lineHeight: 0.9, 
            margin: 0,
            color: '#fff',
            mixBlendMode: 'difference'
          }}
        >
          DATA SCIENTIST
        </h1>
      </div>
      <div style={{ overflow: 'hidden', paddingBottom: '1rem' }}>
        <h1 
          ref={title2Ref} 
          style={{ 
            fontSize: 'clamp(3rem, 8vw, 8rem)', 
            lineHeight: 0.9, 
            margin: 0,
            color: 'var(--color-accent)',
            mixBlendMode: 'plus-lighter',
            marginLeft: '10vw'
          }}
        >
          & AI ENGINEER
        </h1>
      </div>
      
      <p 
        ref={subtitleRef}
        style={{
          marginTop: '2rem',
          maxWidth: '500px',
          fontSize: '1.2rem',
          lineHeight: 1.6,
          fontWeight: 300,
          opacity: 0.9,
          marginLeft: '4vw'
        }}
      >
        "Data science, AI engineering, and a way of building that stays practical and human." <br/><br/>
        From sociology to advanced AI systems, I work on projects that connect technical depth, clear thinking, and practical execution.
      </p>

      {/* Retro tags showing Active theory styling fused with gaming */}
      <div 
        ref={retroTagsRef}
        style={{
          display: 'flex',
          gap: '1rem',
          marginTop: '3rem',
          marginLeft: '4vw',
          flexWrap: 'wrap'
        }}
      >
        <span style={{ fontFamily: 'var(--font-retro)', fontSize: '0.6rem', color: 'var(--color-accent)', border: '1px solid var(--color-accent)', padding: '8px 12px', background: 'rgba(0, 240, 255, 0.1)' }}>&gt; SOCIOLOGY + AI</span>
        <span style={{ fontFamily: 'var(--font-retro)', fontSize: '0.6rem', color: 'var(--color-secondary)', border: '1px solid var(--color-secondary)', padding: '8px 12px', background: 'rgba(255, 0, 60, 0.1)' }}>&gt; RESEARCH + DELIVERY</span>
        <span style={{ fontFamily: 'var(--font-retro)', fontSize: '0.6rem', color: 'var(--color-tertiary)', border: '1px solid var(--color-tertiary)', padding: '8px 12px', background: 'rgba(255, 51, 0, 0.1)' }}>&gt; RAG / AGENTS</span>
      </div>

      <div style={{
        position: 'absolute',
        bottom: '5vh',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        opacity: 0.5
      }}>
        <span style={{ fontFamily: 'var(--font-retro)', fontSize: '0.6rem', letterSpacing: '0.2em', marginBottom: '10px' }}>PRESS START</span>
        <div style={{ width: '2px', height: '50px', backgroundColor: '#fff' }} />
      </div>
    </section>
  );
}
