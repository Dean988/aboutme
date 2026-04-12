import { useEffect, useRef } from 'react';
import { ArrowRight, Mail } from 'lucide-react';
import gsap from 'gsap';
import heroGraphic from '../assets/hero.png';

const highlightItems = [
  { value: 'AI systems', label: 'Built with delivery in mind, not just prototypes.' },
  { value: 'Human context', label: 'Research depth translated into practical products.' },
  { value: 'Clear execution', label: 'Strong focus on readability, ownership, and outcomes.' },
];

const focusItems = [
  ['Current focus', 'RAG systems, AI assistants, and analytics workflows'],
  ['Industry lens', 'Automotive, enterprise knowledge, and behavioral data'],
  ['Working style', 'Structured, collaborative, and grounded in real operations'],
];

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) {
      return;
    }

    const context = gsap.context(() => {
      const timeline = gsap.timeline({ delay: 0.15 });

      timeline.fromTo(
        '.hero-reveal',
        { y: 32, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.12,
          ease: 'power3.out',
        },
      );
    }, sectionRef.current);

    return () => context.revert();
  }, []);

  return (
    <section id="home" ref={sectionRef} className="section hero-section">
      <div className="section-shell hero-grid">
        <div className="hero-copy">
          <span className="eyebrow hero-reveal">Available for AI and data-driven projects</span>

          <h1 className="hero-title hero-reveal">
            Designing AI systems that stay
            <span>clear, useful, and human.</span>
          </h1>

          <p className="hero-lead hero-reveal">
            I work at the intersection of data science, AI engineering, and product
            thinking, shaping solutions that connect technical depth with practical
            business value.
          </p>

          <div className="hero-actions hero-reveal">
            <a className="button button-primary" href="#contact">
              <Mail size={18} />
              Contact me
            </a>
            <a className="button button-secondary" href="#experience">
              Explore experience
              <ArrowRight size={18} />
            </a>
          </div>

          <div className="hero-highlights hero-reveal">
            {highlightItems.map((item) => (
              <div key={item.value} className="hero-highlight">
                <strong>{item.value}</strong>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        <aside className="surface-card hero-panel hero-reveal" aria-label="Profile summary">
          <div className="hero-panel__visual">
            <img src={heroGraphic} alt="Abstract layered illustration representing AI systems." />

            <div className="hero-panel__note">
              <div>
                <span className="hero-panel__label">Role</span>
                <span className="hero-panel__value">Data Scientist and AI Engineer</span>
              </div>
              <div>
                <span className="hero-panel__label">Base</span>
                <span className="hero-panel__value">Italy</span>
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
        </aside>
      </div>
    </section>
  );
}
