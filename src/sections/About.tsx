import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const principles = [
  {
    title: 'Clear thinking',
    description:
      'I prefer systems that are understandable from the inside out, not just visually impressive from a distance.',
  },
  {
    title: 'Human context',
    description:
      'My background in sociology helps me connect models, user behavior, and product decisions in a more grounded way.',
  },
  {
    title: 'Professional delivery',
    description:
      'I care about how AI work is shipped, explained, maintained, and used by real teams in real environments.',
  },
];

const strengths = [
  'AI engineering and orchestration',
  'Analytics and data systems',
  'Research-driven product thinking',
  'RAG and retrieval design',
  'Power BI and data storytelling',
  'Azure and AWS delivery',
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) {
      return;
    }

    const context = gsap.context(() => {
      gsap.fromTo(
        '.about-reveal',
        { y: 28, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 78%',
          },
        },
      );
    }, sectionRef.current);

    return () => context.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="section">
      <div className="section-shell">
        <div className="section-heading about-reveal">
          <span className="eyebrow">About</span>
          <h2>A profile shaped by both technical systems and social understanding.</h2>
          <p>
            I moved from sociology into advanced AI and data work because I am most
            interested in how complex systems meet real human behavior. That perspective
            is what makes my work feel both analytical and practical.
          </p>
        </div>

        <div className="about-layout">
          <article className="panel about-story about-reveal">
            <p>
              Whether the project is an assistant, an analytics workflow, or a
              decision-support system, I focus on clarity, maintainability, and a user
              experience that makes the intelligence feel usable rather than abstract.
            </p>

            <div className="about-pillars">
              {principles.map((item) => (
                <div key={item.title} className="about-pillar">
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              ))}
            </div>
          </article>

          <aside className="panel about-profile about-reveal">
            <span className="about-profile__label">Core strengths</span>
            <ul className="about-strengths">
              {strengths.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </aside>
        </div>
      </div>
    </section>
  );
}
