import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const servicesData = [
  {
    title: 'RAG and knowledge assistants',
    description:
      'Retrieval-driven systems that make internal knowledge easier to access, navigate, and trust.',
    image: '/rag_knowledge.png',
    details: ['Context-aware retrieval', 'Knowledge design', 'Assistant UX'],
  },
  {
    title: 'Predictive modeling and analytics',
    description:
      'Analytics workflows that turn datasets into operational insight, experimentation, and decision support.',
    image: '/social_data.png',
    details: ['Behavioral analytics', 'Forecasting', 'Insight delivery'],
  },
  {
    title: 'AI engineering and orchestration',
    description:
      'Structured systems for assistants, workflows, and model-based tools that need more than a prototype.',
    image: '/ai_services.png',
    details: ['LLM systems', 'Workflow design', 'Production thinking'],
  },
  {
    title: 'Research-informed AI strategy',
    description:
      'A perspective that connects technical architecture with human context, adoption, and product clarity.',
    image: '/socio_ai_fusion.png',
    details: ['Human-centered framing', 'Evaluation thinking', 'Product fit'],
  },
];

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) {
      return;
    }

    const context = gsap.context(() => {
      gsap.fromTo(
        '.services-reveal',
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
    <section id="services" ref={sectionRef} className="section">
      <div className="section-shell">
        <div className="section-heading services-reveal">
          <span className="eyebrow">Services</span>
          <h2>What I build.</h2>
          <p>
            The goal is always the same: make the technical layer stronger while making
            the final product clearer, more useful, and easier for people to work with.
          </p>
        </div>

        <div className="services-grid">
          {servicesData.map((item) => (
            <article key={item.title} className="panel service-card services-reveal">
              <div className="service-card__media">
                <img src={item.image} alt={item.title} />
              </div>

              <div className="service-card__body">
                <h3>{item.title}</h3>
                <p>{item.description}</p>

                <ul className="service-card__details">
                  {item.details.map((detail) => (
                    <li key={detail}>{detail}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
