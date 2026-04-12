import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const principles = [
  {
    title: 'Context before complexity',
    description:
      'I like systems that solve the real problem first: user context, business flow, and team constraints come before technical spectacle.',
  },
  {
    title: 'Delivery with structure',
    description:
      'From prototypes to production-minded solutions, I work toward interfaces and workflows that remain understandable after the demo.',
  },
  {
    title: 'Research translated into action',
    description:
      'My background in sociology helps me connect data patterns with human behavior, decision making, and product adoption.',
  },
];

const capabilities = [
  { label: 'AI engineering and orchestration', level: 96 },
  { label: 'Analytics and data systems', level: 91 },
  { label: 'Research-driven product thinking', level: 89 },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) {
      return;
    }

    const context = gsap.context(() => {
      gsap.fromTo(
        '.reveal-card',
        { y: 32, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.14,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 72%',
          },
        },
      );

      gsap.fromTo(
        '.capability-bar__fill',
        { scaleX: 0, transformOrigin: 'left center' },
        {
          scaleX: 1,
          duration: 0.85,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 68%',
          },
        },
      );
    }, sectionRef.current);

    return () => context.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="section">
      <div className="section-shell">
        <div className="section-heading">
          <span className="eyebrow">About</span>
          <h2>A professional profile shaped by both data and people.</h2>
          <p>
            My work combines technical implementation, research sensitivity, and a
            preference for products that feel reliable, legible, and useful from the
            first interaction onward.
          </p>
        </div>

        <div className="about-layout">
          <article className="surface-card about-story reveal-card">
            <p>
              I moved from sociology into advanced AI and data work because I am most
              interested in systems that connect analysis with real human behavior.
              That perspective helps me build solutions that are not only accurate,
              but also understandable and operationally relevant.
            </p>
            <p>
              Whether the project is an assistant, an analytics workflow, or a
              decision-support system, I focus on clarity, maintainability, and the
              quality of the user experience around the model.
            </p>

            <div className="about-principles">
              {principles.map((item) => (
                <div key={item.title} className="principle-card">
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              ))}
            </div>
          </article>

          <aside className="surface-card capabilities-card reveal-card">
            <span className="eyebrow">Core strengths</span>

            <div className="capabilities-list">
              {capabilities.map((item) => (
                <div key={item.label} className="capability-row">
                  <header>
                    <span>{item.label}</span>
                    <strong>{item.level}%</strong>
                  </header>
                  <div className="capability-bar">
                    <div
                      className="capability-bar__fill"
                      style={{ width: `${item.level}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="capability-tags" aria-label="Capabilities">
              <span>LLM orchestration</span>
              <span>RAG and retrieval design</span>
              <span>Behavioral analytics</span>
              <span>Azure and AWS delivery</span>
              <span>Power BI and storytelling</span>
              <span>Experimentation and evaluation</span>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
