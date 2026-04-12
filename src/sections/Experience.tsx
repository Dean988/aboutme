import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const experienceData = [
  {
    role: 'Automotive AI Innovation',
    company: 'Italdesign',
    duration: '2025 - Present',
    points: [
      'Designing generative and predictive AI architectures for next-generation automotive workflows.',
      'Building explainable systems that connect experimentation, business intelligence, and decision support.',
      'Turning advanced AI concepts into operational frameworks for industrial use.',
    ],
  },
  {
    role: 'Tech and Digital Integration',
    company: 'Iveco Group',
    duration: '2025',
    points: [
      'Architected Azure foundations for enterprise AI adoption.',
      'Developed RAG assistants and vector-search solutions to unlock internal knowledge at scale.',
    ],
  },
  {
    role: 'LLM Alignment and Training',
    company: 'Outlier',
    duration: '2024',
    points: [
      'Applied sociological frameworks to RLHF and evaluation tasks, improving alignment between model behavior and human expectations.',
    ],
  },
  {
    role: 'Behavioral Analytics',
    company: 'Gameforge',
    duration: '2023 - 2024',
    points: [
      'Analyzed player behavior datasets to predict churn and optimize economic balance.',
      'Supported intelligent assistant and chatbot initiatives for user support scenarios.',
    ],
  },
];

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) {
      return;
    }

    const context = gsap.context(() => {
      gsap.fromTo(
        '.experience-reveal',
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
    <section id="experience" ref={sectionRef} className="section section-contrast">
      <div className="section-shell">
        <div className="section-heading experience-reveal">
          <span className="eyebrow">Campaign Log</span>
          <h2>Professional missions completed across AI, analytics, and research.</h2>
          <p>
            Each role added a different layer to the build: enterprise systems,
            industrial AI, model alignment, and behavioral analytics applied to real
            datasets and operations.
          </p>
        </div>

        <div className="experience-spotlight panel experience-reveal">
          <div className="experience-spotlight__media">
            <img src="/autonomous_agents.gif" alt="Autonomous agents animation." />
          </div>
          <div className="experience-spotlight__copy">
            <span>Mission theme</span>
            <strong>From experimentation to production-oriented AI systems.</strong>
          </div>
        </div>

        <div className="experience-list">
          {experienceData.map((item, index) => (
            <article key={`${item.company}-${item.duration}`} className="panel experience-card experience-reveal">
              <div className="experience-card__meta">
                <span>{`Stage ${String(index + 1).padStart(2, '0')}`}</span>
                <h3>{item.company}</h3>
                <p>{item.role}</p>
                <small>{item.duration}</small>
              </div>

              <ul className="experience-card__points">
                {item.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
