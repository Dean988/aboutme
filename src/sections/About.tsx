import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const profileTraits = [
  {
    title: 'System thinking',
    description:
      'I like AI products that feel architected, not improvised. The strongest work is usually the clearest work.',
  },
  {
    title: 'Human logic',
    description:
      'A social data science background helps me read not only the model, but also the user behavior around it.',
  },
  {
    title: 'Execution mode',
    description:
      'From concept to delivery, I focus on usable outputs, maintainability, and decisions that survive beyond the demo.',
  },
];

const strengths = [
  'AI engineering and orchestration',
  'RAG system design',
  'Behavioral analytics',
  'Research-driven product framing',
  'Dashboards and decision support',
  'Cloud-aware delivery',
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
          <span className="eyebrow">Player Profile</span>
          <h2>A technical profile with a social-science layer underneath.</h2>
          <p>
            I moved from sociology into advanced AI and data work because I was always
            more interested in how systems behave in the real world than in how they
            look in isolation.
          </p>
        </div>

        <div className="about-layout">
          <article className="panel about-story about-reveal">
            <div className="about-story__media">
              <img src="/social_anim.gif" alt="Animated network visualization." />
            </div>

            <div className="about-story__content">
              <p>
                That perspective is what shapes my work today: I build solutions that
                aim to be technically strong, but also usable, readable, and relevant to
                the people working around them.
              </p>

              <div className="about-pillars">
                {profileTraits.map((item) => (
                  <div key={item.title} className="about-pillar">
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </article>

          <aside className="panel about-profile about-reveal">
            <span className="about-profile__label">Equipped skills</span>
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
