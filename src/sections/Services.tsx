import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const servicesData = [
  {
    title: 'RAG & Knowledge Assistants',
    desc: 'Building intelligent Retrieval-Augmented Generation systems. Architectures that don\'t just query a database, but understand the sociological and business context to return actionable, precise, and hallucination-free insights.',
    image: '/rag_knowledge.png',
    tag: 'ARCHITECTURE'
  },
  {
    title: 'Predictive Modeling & Analytics',
    desc: 'Merging social sciences with machine learning to extract signals from raw data. Algorithms designed not only for mathematical precision but to interpret human behavioral patterns hidden behind metrics (churn rate, adoption, friction).',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=600',
    tag: 'ANALYTICS'
  },
  {
    title: 'Autonomous Agents',
    desc: 'Designing multi-agent ecosystems where different LLMs collaborate to solve complex tasks. From logical reasoning to autonomous execution of business workflows, built on a solid infrastructure (LangChain, LangGraph).',
    image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=600',
    tag: 'ORCHESTRATION'
  },
  {
    title: 'Societal AI Alignment',
    desc: 'Language models are not just calculators; they are cultural artifacts. Applying sociological frameworks to fine-tuning (RLHF) to ensure AI is ethically aligned and free from harmful biases.',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=600',
    tag: 'RESEARCH'
  }
];

export default function Services() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    
    // Initial entry animation
    gsap.fromTo('.service-row',
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 60%',
        }
      }
    );
  }, []);

  const handleMouseEnter = (index: number) => {
    setActiveIdx(index);
    gsap.to(`.service-title-${index}`, { color: 'var(--color-accent)', x: 10, duration: 0.3 });
    gsap.to(`.service-desc-${index}`, { color: '#fff', opacity: 1, duration: 0.3 });
  };

  const handleMouseLeave = (index: number) => {
    setActiveIdx(null);
    gsap.to(`.service-title-${index}`, { color: '#fff', x: 0, duration: 0.3 });
    gsap.to(`.service-desc-${index}`, { color: '#E5E5E5', opacity: 0.7, duration: 0.3 });
  };

  return (
    <section 
      ref={containerRef}
      style={{
        width: '100vw',
        padding: '15vh 10vw',
        position: 'relative',
        zIndex: 10,
        backgroundColor: '#000',
        minHeight: '100vh',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <div style={{ marginBottom: '4rem' }}>
        <h2 style={{ fontSize: '3rem', fontFamily: 'var(--font-display)', color: '#fff' }}>
          AI ARCHITECTURES <br/>
          <span style={{ color: 'transparent', WebkitTextStroke: '1px var(--color-tertiary)' }}>& SOCIAL LOGIC</span>
        </h2>
        <p style={{ marginTop: '1rem', maxWidth: '600px', opacity: 0.8, fontSize: '1.1rem' }}>
          Hover over the interconnected modules below. Intelligence systems must interface with human sociology to achieve structural permanence.
        </p>
      </div>

      <div className="mobile-col mobile-gap-small" style={{ display: 'flex', flex: 1, gap: '4rem', alignItems: 'center' }}>
        {/* Texts List */}
        <div className="mobile-full-width" style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0' }}>
          {servicesData.map((item, index) => (
            <div 
              key={index}
              className={`service-row service-row-${index}`}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={() => handleMouseLeave(index)}
              style={{
                borderBottom: '1px solid rgba(255,255,255,0.1)',
                padding: '2rem 0',
                cursor: 'none',
              }}
            >
              <div style={{ fontFamily: 'var(--font-retro)', fontSize: '0.6rem', color: 'var(--color-tertiary)', marginBottom: '1rem' }}>
                &gt; {item.tag}
              </div>
              <h3 
                className={`service-title-${index} mobile-font-large`} 
                style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2.5rem)', fontFamily: 'var(--font-display)', margin: '0 0 1rem 0' }}
              >
                {item.title}
              </h3>
              <p className={`service-desc-${index}`} style={{ opacity: 0.7, fontSize: '1rem', lineHeight: 1.6, maxWidth: '500px', transition: 'all 0.3s' }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Constrained Image Viewer mapped to currently hovered Index */}
        <div className="mobile-hide" style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ 
            width: '100%', 
            maxWidth: '500px', 
            aspectRatio: '4/3', 
            position: 'relative',
            borderRadius: '12px',
            border: '1px solid rgba(0, 240, 255, 0.4)',
            overflow: 'hidden',
            backgroundColor: 'rgba(0,0,0,0.5)',
            boxShadow: '0 0 40px rgba(0, 240, 255, 0.1)'
          }}>
            {servicesData.map((item, index) => (
              <img 
                key={index}
                src={item.image} 
                alt={item.title}
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  opacity: activeIdx === index ? 1 : 0,
                  transform: activeIdx === index ? 'scale(1)' : 'scale(1.05)',
                  filter: 'contrast(1.1)', // "poco sfocate, nitide"
                  transition: 'opacity 0.4s ease, transform 0.4s ease',
                  backgroundColor: '#000'
                }}
              />
            ))}
            
            {/* Fallback pattern when nothing hovered */}
            <div style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              opacity: activeIdx === null ? 1 : 0,
              transition: 'opacity 0.4s ease',
              fontFamily: 'var(--font-retro)',
              color: 'rgba(255, 255, 255, 0.2)',
              fontSize: '0.8rem',
              backgroundImage: 'radial-gradient(rgba(255,255,255,0.1) 1px, transparent 1px)',
              backgroundSize: '20px 20px'
            }}>
              [ NO SIGNAL ]
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
