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
      'Turning advanced AI concepts into operational frameworks for real industrial use.',
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
        '.timeline-item',
        { y: 36, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.14,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          },
        },
      );
    }, sectionRef.current);

    return () => context.revert();
  }, []);

  return (
    <section id="experience" ref={sectionRef} className="section">
      <div className="section-shell">
        <div className="section-heading">
          <span className="eyebrow">Experience</span>
          <h2>Professional work across industry, research, and applied AI.</h2>
          <p>
            The common thread across these roles is turning advanced technical work
            into systems that can support better decisions, better operations, and
            better user outcomes.
          </p>
        </div>

        <div className="experience-layout">
          {experienceData.map((item) => (
            <article key={`${item.company}-${item.duration}`} className="surface-card timeline-item">
              <div className="timeline-meta">
                <span className="timeline-period">{item.duration}</span>
                <h3>{item.company}</h3>
                <p className="timeline-role">{item.role}</p>
              </div>

              <ul className="timeline-points">
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
