import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const educationData = [
  {
    degree: 'Master Degree',
    institution: 'Politecnico di Torino',
    image: '/ai_anim.gif', // Using requested GIF
    focus: 'AI Architecture, Machine Learning & AI Ethics and Management',
    score: '110/110 Cum Laude'
  },
  {
    degree: 'Master\'s Degree in Social Data Science',
    institution: 'Università degli Studi d\'Annunzio',
    image: '/social_anim_new.gif', // Using requested GIF
    focus: 'Digital Sociology & Predictive Modeling',
    score: '110/110 Cum Laude'
  }
];

export default function Education() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // A subtle floating effect instead of extreme parallax since they are gifs
    const images = containerRef.current.querySelectorAll('.edu-image');
    images.forEach(img => {
      gsap.to(img, {
        y: -15,
        duration: 2,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut'
      });
    });

    const blocks = containerRef.current.querySelectorAll('.edu-block');
    blocks.forEach(block => {
      gsap.fromTo(block,
        { opacity: 0, scale: 0.95 },
        {
          opacity: 1, 
          scale: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: block,
            start: 'top 80%',
          }
        }
      );
    });

  }, []);

  return (
    <section 
      ref={containerRef}
      style={{
        width: '100vw',
        padding: '15vh 10vw',
        position: 'relative',
        zIndex: 10,
        backgroundColor: 'rgba(0,0,0,0.5)'
      }}
    >
      <div style={{ textAlign: 'center', marginBottom: '15vh' }}>
        <div style={{ fontFamily: 'var(--font-retro)', color: 'var(--color-tertiary)', fontSize: '0.8rem', marginBottom: '1rem' }}>
          &gt; KNOWLEDGE_BASE_UNLOCKED
        </div>
        <h2 style={{ 
          fontSize: 'clamp(3rem, 6vw, 5rem)', 
          letterSpacing: '-0.02em', 
          color: '#fff',
          textTransform: 'uppercase',
          fontFamily: 'var(--font-display)'
        }}>
          Academic
          <br/>
          <span style={{ color: 'transparent', WebkitTextStroke: '1px var(--color-tertiary)' }}>Foundation</span>
        </h2>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '15vh' }}>
        {educationData.map((item, index) => (
          <div key={index} className={`edu-block mobile-col${index % 2 === 0 ? '' : '-reverse'}`} style={{
            display: 'flex',
            flexDirection: index % 2 === 0 ? 'row' : 'row-reverse',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '5vw'
          }}>
            
            <div className="mobile-full-width" style={{ flex: 1 }}>
              <div className="mobile-bottom-margin" style={{ 
                display: 'inline-block',
                padding: '0.5rem 1rem',
                border: '1px solid var(--color-tertiary)',
                backgroundColor: 'rgba(255, 51, 0, 0.1)',
                color: 'var(--color-tertiary)',
                fontFamily: 'var(--font-retro)',
                fontSize: '0.6rem',
                marginBottom: '2rem',
              }}>
                LOCATION: {item.institution.toUpperCase()}
              </div>
              
              <h3 className="mobile-font-huge mobile-bottom-margin" style={{ 
                fontSize: 'clamp(2rem, 3.5vw, 3.5rem)', 
                lineHeight: 1.2, 
                marginBottom: '1rem',
                fontFamily: 'var(--font-display)'
              }}>
                {item.degree}
              </h3>
              
              <p className="mobile-bottom-margin" style={{ 
                fontSize: '1.2rem', 
                color: 'var(--color-accent)',
                marginBottom: '1rem'
              }}>
                {item.focus}
              </p>

              <div className="mobile-bottom-margin" style={{
                fontFamily: 'var(--font-retro)',
                fontSize: '0.7rem',
                color: '#0f0',
              }}>
                &gt; SCORE: {item.score}
              </div>
            </div>

            <div className="mobile-full-width" style={{ flex: 1, position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              {item.image && (
                <div style={{ 
                  borderRadius: '12px',
                  boxShadow: '0 0 30px rgba(0, 240, 255, 0.2)',
                  width: '100%',
                  maxWidth: '500px',
                  overflow: 'hidden'
                }}>
                  <img 
                    className="edu-image"
                    src={item.image} 
                    alt={item.degree} 
                    style={{
                      width: '100%',
                      height: 'auto', 
                      display: 'block',
                      mixBlendMode: 'screen',
                    }}
                  />
                </div>
              )}
            </div>
            
          </div>
        ))}
      </div>
    </section>
  );
}
