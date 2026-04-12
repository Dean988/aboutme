import { useEffect, useRef } from 'react';
import { ArrowRight, Mail } from 'lucide-react';
import gsap from 'gsap';
import heroGraphic from '../assets/hero.png';

const highlightItems = [
  { value: 'RAG', label: 'Knowledge systems with controlled retrieval and usable outputs.' },
  { value: 'Agents', label: 'Multi-step automations with clearer orchestration layers.' },
  { value: 'Analytics', label: 'Human-centered insight systems and decision support.' },
];

const focusItems = [
  ['Current focus', 'Retrieval, assistants, analytics, and AI-powered workflows'],
  ['What matters', 'Interaction, clarity, technical depth, and practical execution'],
  ['Approach', 'Immersive interfaces with systems thinking behind the motion'],
];

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) {
      return;
    }

    const context = gsap.context(() => {
      const timeline = gsap.timeline({ delay: 1.6 });

      timeline.fromTo(
        '.hero-reveal',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.12,
          ease: 'power3.out',
        },
      );

      gsap.to('.hero-float', {
        y: '-=18',
        duration: 3.2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        stagger: 0.2,
      });
    }, sectionRef.current);

    return () => context.revert();
  }, []);

  return (
    <section id="home" ref={sectionRef} className="section hero-section">
      <div className="section-shell hero-grid">
        <div className="hero-copy">
          <span className="eyebrow hero-reveal">Interactive systems, not static slides</span>

          <h1 className="hero-title hero-reveal">
            Data science and AI engineering
            <span>with motion, depth, and intent.</span>
          </h1>

          <p className="hero-lead hero-reveal">
            I build AI experiences that feel alive on the surface and robust underneath:
            retrieval systems, analytics products, assistants, and interfaces that turn
            complexity into something people can actually use.
          </p>

          <div className="hero-actions hero-reveal">
            <a className="button button-primary" href="#contact" data-cursor="large">
              <Mail size={18} />
              Start a conversation
            </a>
            <a className="button button-secondary" href="#services" data-cursor="large">
              See interactive work
              <ArrowRight size={18} />
            </a>
          </div>

          <div className="hero-highlights hero-reveal">
            {highlightItems.map((item) => (
              <div key={item.value} className="hero-highlight" data-cursor="large">
                <strong>{item.value}</strong>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        <aside className="hero-stage hero-reveal" data-cursor="media" aria-label="Immersive portfolio preview">
          <div className="surface-card hero-panel hero-stage__panel">
            <div className="hero-stage__screen">
              <img className="hero-stage__bg" src="/background.gif" alt="" />
              <div className="hero-stage__mesh" />
              <img className="hero-stage__core hero-float" src="/ai_core.png" alt="AI systems illustration" />
              <img className="hero-stage__overlay hero-float" src={heroGraphic} alt="Layered systems graphic" />

              <div className="hero-floating-card hero-floating-card--top hero-float">
                <span>Live mode</span>
                <strong>Immersive AI portfolio</strong>
              </div>

              <div className="hero-floating-card hero-floating-card--bottom hero-float">
                <img src="/social_anim.gif" alt="" />
                <div>
                  <span>Interaction layer</span>
                  <strong>Motion-driven storytelling</strong>
                </div>
              </div>
            </div>

            <div className="hero-panel__stack">
              {focusItems.map(([label, value]) => (
                <div key={label} className="hero-stack-item">
                  <strong>{label}</strong>
                  <span>{value}</span>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
