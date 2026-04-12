import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const expData = [
  { 
    role: 'Automotive AI Innovation', 
    company: 'Italdesign', 
    duration: '2025 – Present',
    points: [
      "Designing generative and predictive AI architectures for next-generation automotive workflows.",
      "Building explainable systems that connect experimentation, business intelligence, and decision support.",
      "Turning advanced AI concepts into operational frameworks for real industrial use."
    ]
  },
  { 
    role: 'Tech and Digital Integration', 
    company: 'Iveco Group', 
    duration: '2025',
    points: [
      "Architected Azure foundations for enterprise AI adoption.",
      "Developed RAG assistants and vector-search solutions to unlock internal knowledge at scale."
    ]
  },
  { 
    role: 'LLM Alignment and Training', 
    company: 'Outlier', 
    duration: '2024',
    points: [
      "Applied sociological frameworks to RLHF and evaluation tasks, improving alignment between model behavior and human expectations."
    ]
  },
  { 
    role: 'Behavioral Analytics', 
    company: 'Gameforge', 
    duration: '2023 – 2024',
    points: [
      "Analyzed player behavior datasets to predict churn and optimize economic balance.",
      "Supported intelligent assistant and chatbot initiatives for user support scenarios."
    ]
  }
];

export default function Experience() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;

    if (!section || !track) return;

    const getScrollAmount = () => {
      let trackWidth = track.scrollWidth;
      return -(trackWidth - window.innerWidth + window.innerWidth * 0.2);
    };

    const tween = gsap.to(track, {
      x: getScrollAmount,
      ease: "none"
    });

    ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: () => `+=${getScrollAmount() * -1}`,
      pin: true,
      animation: tween,
      scrub: 1,
      invalidateOnRefresh: true,
    });

    return () => {
      tween.kill();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section 
      ref={sectionRef} 
      style={{
        height: '100vh',
        width: '100vw',
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        background: 'transparent'
      }}
    >
      
      <div style={{
        position: 'absolute',
        top: '10vh',
        left: '10vw',
        zIndex: 1
      }}>
        <h2 style={{ fontSize: '4rem', opacity: 0.1 }}>CAMPAIGN LOG</h2>
        <p style={{ fontFamily: 'var(--font-retro)', fontSize: '0.8rem', color: 'var(--color-accent)' }}>&gt; NAVIGATE TIMELINE</p>
      </div>

      <div 
        ref={trackRef}
        style={{
          display: 'flex',
          gap: '10vw',
          paddingLeft: '50vw',
          paddingRight: '20vw',
          alignItems: 'center',
        }}
      >
        {expData.map((item, index) => (
          <div key={index} className="mobile-experience-card" style={{
            minWidth: '500px',
            maxWidth: '600px',
            backgroundColor: 'rgba(0,0,0,0.6)',
            border: '1px solid rgba(0, 240, 255, 0.2)',
            borderTop: 'none',
            padding: '3rem',
            position: 'relative',
            transform: `translateY(${index % 2 === 0 ? '-30px' : '30px'})`,
            backdropFilter: 'blur(10px)',
            transition: 'border 0.3s ease',
            cursor: 'none'
          }}
          onMouseEnter={(e) => { e.currentTarget.style.border = '1px solid var(--color-accent)' }}
          onMouseLeave={(e) => { e.currentTarget.style.border = '1px solid rgba(0, 240, 255, 0.2)' }}
          >
            {/* Retro header tape */}
            <div style={{
              position: 'absolute',
              top: '-15px',
              left: '20px',
              backgroundColor: 'var(--color-bg)',
              border: '1px solid var(--color-accent)',
              padding: '5px 10px',
              fontFamily: 'var(--font-retro)',
              fontSize: '0.6rem',
              color: 'var(--color-accent)'
            }}>
              LOG {index + 1}
            </div>

            <span style={{ color: 'var(--color-secondary)', fontFamily: 'var(--font-retro)', fontSize: '0.7rem' }}>
              [{item.duration}]
            </span>
            <h3 style={{ fontSize: '2.5rem', marginTop: '1rem', marginBottom: '0.5rem', fontFamily: 'var(--font-display)' }}>
              {item.company}
            </h3>
            <p style={{ fontSize: '1.2rem', color: 'var(--color-accent)', marginBottom: '1.5rem', fontWeight: 600 }}>
              {item.role}
            </p>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', opacity: 0.8 }}>
              {item.points.map((pt, i) => (
                <li key={i} style={{ paddingLeft: '1.5rem', position: 'relative' }}>
                  <span style={{ position: 'absolute', left: 0, top: '5px', width: '5px', height: '5px', backgroundColor: '#fff' }} />
                  {pt}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
