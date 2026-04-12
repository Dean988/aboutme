import { useEffect, useRef } from 'react';
import { ArrowRight, Mail } from 'lucide-react';
import gsap from 'gsap';
import heroGraphic from '../assets/hero.png';

const metrics = [
  { value: '2', label: "Master's degrees" },
  { value: 'AI', label: 'Engineering and delivery' },
  { value: 'Data', label: 'Research-driven mindset' },
];

const highlights = [
  'RAG systems and assistants',
  'Analytics and decision support',
  'Research, product thinking, and execution',
];

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) {
      return;
    }

    const context = gsap.context(() => {
      const timeline = gsap.timeline({ delay: 0.1 });

      timeline.fromTo(
        '.hero-reveal',
        { y: 28, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.85,
          stagger: 0.1,
          ease: 'power3.out',
        },
      );
    }, sectionRef.current);

    return () => context.revert();
  }, []);

  return (
    <section id="home" ref={sectionRef} className="section hero">
      <div className="section-shell hero-layout">
        <div className="hero-copy">
          <span className="eyebrow hero-reveal">Portfolio</span>

          <h1 className="hero-display hero-reveal">
            Building AI products that feel clear, credible, and ready for real use.
          </h1>

          <p className="hero-lead hero-reveal">
            I work across data science, AI engineering, and product thinking, with a
            profile shaped by both technical depth and social data science. My focus is
            on solutions that are strong in substance and clear in the way they are
            presented.
          </p>

          <div className="hero-actions hero-reveal">
            <a className="button button-primary" href="#contact">
              <Mail size={18} />
              Contact me
            </a>
            <a className="button button-secondary" href="#experience">
              View experience
              <ArrowRight size={18} />
            </a>
          </div>

          <div className="hero-metrics hero-reveal">
            {metrics.map((item) => (
              <div key={item.label} className="hero-metric">
                <strong>{item.value}</strong>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        <aside className="hero-visual hero-reveal" aria-label="Profile overview">
          <div className="panel hero-visual__frame">
            <div className="hero-visual__art">
              <div className="hero-note">Available for AI, analytics, and product-focused work</div>
              <img src={heroGraphic} alt="Abstract layered graphic representing AI systems." />
            </div>

            <div className="hero-visual__stack">
              <div className="hero-stack-card">
                <span>Current focus</span>
                <strong>AI systems, analytics workflows, and knowledge tools</strong>
              </div>

              <div className="hero-stack-card">
                <span>Approach</span>
                <ul>
                  {highlights.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
