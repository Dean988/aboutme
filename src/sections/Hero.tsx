import { useEffect, useRef } from 'react';
import { ArrowRight, Mail } from 'lucide-react';
import gsap from 'gsap';
import heroGraphic from '../assets/hero.png';

const metrics = [
  { value: 'LV. 02', label: "Master's degrees unlocked" },
  { value: 'AI + DATA', label: 'Primary class specialization' },
  { value: 'RAG / AGENTS', label: 'Current active build' },
];

const loadoutItems = [
  'Decision-support systems',
  'Knowledge assistants',
  'Analytics and experimentation',
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
          <span className="eyebrow hero-reveal">Player One // Portfolio</span>

          <h1 className="hero-display hero-reveal">
            DATA SCIENTIST
            <span>&amp; AI ENGINEER</span>
          </h1>

          <p className="hero-lead hero-reveal">
            I design AI systems with a gaming-inspired interface language: structured,
            sharp, and immersive. Under the visual layer, the focus stays serious:
            analytics, knowledge systems, orchestration, and products that work in
            real contexts.
          </p>

          <div className="hero-actions hero-reveal">
            <a className="button button-primary" href="#contact">
              <Mail size={18} />
              Contact me
            </a>
            <a className="button button-secondary" href="#services">
              Open loadout
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

        <aside className="hero-visual hero-reveal" aria-label="Gaming HUD summary">
          <div className="panel hero-visual__frame">
            <div className="hero-visual__art">
              <img className="hero-visual__bg" src="/background.gif" alt="" />
              <div className="hero-visual__grid" />
              <div className="hero-note">SYSTEM ONLINE // AVAILABLE FOR NEW QUESTS</div>
              <img className="hero-visual__graphic" src={heroGraphic} alt="Abstract gaming-style AI systems graphic." />
            </div>

            <div className="hero-visual__stack">
              <div className="hero-stack-card">
                <span>Active loadout</span>
                <ul>
                  {loadoutItems.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="hero-stack-card">
                <span>Status</span>
                <strong>From research logic to production-minded AI delivery.</strong>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
