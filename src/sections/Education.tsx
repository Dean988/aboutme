import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const educationData = [
  {
    degree: 'Master Degree in Artificial Intelligence',
    institution: 'Politecnico di Torino',
    image: '/ai_anim.gif',
    focus: 'AI architecture, machine learning, ethics, and management.',
    score: '110/110 cum laude',
    topics: ['AI architecture', 'Machine learning', 'Ethics', 'Management'],
  },
  {
    degree: "Master's Degree in Social Data Science",
    institution: "Universita degli Studi d'Annunzio",
    image: '/social_anim_new.gif',
    focus: 'Digital sociology, predictive modeling, and human-centered analysis.',
    score: '110/110 cum laude',
    topics: ['Digital sociology', 'Predictive modeling', 'Social research', 'Analytics'],
  },
];

export default function Education() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) {
      return;
    }

    const context = gsap.context(() => {
      gsap.fromTo(
        '.education-card',
        { y: 34, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.82,
          stagger: 0.14,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          },
        },
      );

      gsap.to('.education-card__media img', {
        scale: 1.05,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        stagger: 0.15,
      });
    }, sectionRef.current);

    return () => context.revert();
  }, []);

  return (
    <section id="education" ref={sectionRef} className="section">
      <div className="section-shell">
        <div className="section-heading">
          <span className="eyebrow">Education</span>
          <h2>Academic depth with richer visual storytelling.</h2>
          <p>
            I wanted this section to feel alive as well: two educational tracks, both
            represented with moving media to reflect the technical and social layers of
            my work.
          </p>
        </div>

        <div className="education-grid">
          {educationData.map((item) => (
            <article key={item.degree} className="surface-card education-card" data-cursor="media">
              <div className="education-card__media">
                <img src={item.image} alt={item.degree} />
              </div>

              <div className="education-card__body">
                <span className="education-badge">{item.score}</span>
                <p className="education-meta">{item.institution}</p>
                <h3>{item.degree}</h3>
                <p>{item.focus}</p>

                <div className="education-topics">
                  {item.topics.map((topic) => (
                    <span key={topic}>{topic}</span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
