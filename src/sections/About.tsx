import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const cards = containerRef.current.querySelectorAll('.stat-card');
    
    gsap.fromTo(cards,
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 70%',
        }
      }
    );
  }, []);

  return (
    <section 
      ref={containerRef}
      className="mobile-padding"
      style={{
        minHeight: '100vh',
        width: '100vw',
        padding: '10vh 10vw',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '3rem', borderBottom: '1px solid rgba(255,255,255,0.2)', paddingBottom: '1rem' }}>
        <h2 style={{ fontSize: '3rem', flex: 1 }}>PLAYER PROFILE</h2>
        <div style={{ fontFamily: 'var(--font-retro)', fontSize: '0.7rem', color: '#0f0', border: '1px solid #0f0', padding: '5px 10px' }}>STATUS: AVAILABLE OK</div>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '2rem'
      }}>
        
        {/* Card 1 */}
        <div className="stat-card" style={{
          backgroundColor: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderTop: '4px solid var(--color-tertiary)',
          padding: '2rem',
          backdropFilter: 'blur(10px)',
          borderRadius: '4px'
        }}>
          <h3 style={{ fontFamily: 'var(--font-retro)', fontSize: '1rem', color: 'var(--color-tertiary)', marginBottom: '1.5rem', letterSpacing: '0.1em' }}>LV. DATA + AI</h3>
          <ul style={{ lineHeight: 1.8, fontSize: '1.1rem' }}>
            <li style={{ marginBottom: '1rem' }}><strong style={{color: 'var(--color-accent)'}}>Current Build:</strong> AI systems with human context. A profile that mixes sociology, product thinking, and technical delivery.</li>
            <li style={{ marginBottom: '1rem' }}><strong style={{color: 'var(--color-accent)'}}>Playstyle:</strong> Professional, curious, practical. I like interfaces and systems that feel thoughtful rather than loud.</li>
            <li><strong style={{color: 'var(--color-accent)'}}>Career Arc:</strong> Research -&gt; delivery -&gt; impact. From academic depth to solutions that work in real environments.</li>
          </ul>
        </div>

        {/* Card 2 */}
        <div className="stat-card" style={{
          backgroundColor: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderTop: '4px solid var(--color-accent)',
          padding: '2rem',
          backdropFilter: 'blur(10px)',
          borderRadius: '4px'
        }}>
          <h3 style={{ fontFamily: 'var(--font-retro)', fontSize: '1rem', color: 'var(--color-accent)', marginBottom: '1.5rem', letterSpacing: '0.1em' }}>CORE STATS</h3>
          <ul style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <li>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontFamily: 'var(--font-retro)', fontSize: '0.7rem' }}>
                <span>PYTHON & AI ENG</span>
                <span style={{ color: 'var(--color-accent)' }}>98%</span>
              </div>
              <div style={{ width: '100%', height: '10px', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)' }}>
                <div style={{ width: '98%', height: '100%', background: 'linear-gradient(90deg, var(--color-tertiary), var(--color-accent))' }} />
              </div>
            </li>
            <li>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontFamily: 'var(--font-retro)', fontSize: '0.7rem' }}>
                <span>SQL & DATA SYS</span>
                <span style={{ color: 'var(--color-accent)' }}>93%</span>
              </div>
              <div style={{ width: '100%', height: '10px', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)' }}>
                <div style={{ width: '93%', height: '100%', background: 'linear-gradient(90deg, var(--color-tertiary), var(--color-accent))' }} />
              </div>
            </li>
            <li>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontFamily: 'var(--font-retro)', fontSize: '0.7rem' }}>
                <span>RESEARCH & ANALYTICS</span>
                <span style={{ color: 'var(--color-accent)' }}>91%</span>
              </div>
              <div style={{ width: '100%', height: '10px', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)' }}>
                <div style={{ width: '91%', height: '100%', background: 'linear-gradient(90deg, var(--color-tertiary), var(--color-accent))' }} />
              </div>
            </li>
          </ul>
        </div>

        {/* Card 3 */}
        <div className="stat-card" style={{
          backgroundColor: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderTop: '4px solid var(--color-secondary)',
          padding: '2rem',
          backdropFilter: 'blur(10px)',
          borderRadius: '4px'
        }}>
          <h3 style={{ fontFamily: 'var(--font-retro)', fontSize: '1rem', color: 'var(--color-secondary)', marginBottom: '1.5rem', letterSpacing: '0.1em' }}>INVENTORY</h3>
          
          <div style={{ marginBottom: '1rem' }}>
            <span style={{ fontFamily: 'var(--font-retro)', fontSize: '0.6rem', color: '#fff', opacity: 0.5, display: 'block', marginBottom: '0.5rem' }}>GEN AI STACK</span>
            <p>LLMs, prompting, evaluation, orchestration.</p>
          </div>
          
          <div style={{ marginBottom: '1rem' }}>
            <span style={{ fontFamily: 'var(--font-retro)', fontSize: '0.6rem', color: '#fff', opacity: 0.5, display: 'block', marginBottom: '0.5rem' }}>ML & DATA</span>
            <p>Pandas, NumPy, predictive modeling, experimentation.</p>
          </div>
          
          <div style={{ marginBottom: '1rem' }}>
            <span style={{ fontFamily: 'var(--font-retro)', fontSize: '0.6rem', color: '#fff', opacity: 0.5, display: 'block', marginBottom: '0.5rem' }}>CLOUD & DELIVERY</span>
            <p>Azure, AWS, production thinking, scalability.</p>
          </div>
          
          <div>
            <span style={{ fontFamily: 'var(--font-retro)', fontSize: '0.6rem', color: '#fff', opacity: 0.5, display: 'block', marginBottom: '0.5rem' }}>VISUALIZATION</span>
            <p>Power BI, dashboards, insight storytelling.</p>
          </div>
        </div>

      </div>
    </section>
  );
}
