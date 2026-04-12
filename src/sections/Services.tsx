import { useEffect, useRef } from 'react';
import { Bot, Database, LineChart, Users } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const servicesData = [
  {
    title: 'RAG and knowledge assistants',
    description:
      'Designing retrieval-driven systems that surface the right information with context, traceability, and practical usefulness for teams.',
    image: '/rag_knowledge.png',
    tag: 'Knowledge systems',
    icon: Database,
  },
  {
    title: 'Predictive modeling and analytics',
    description:
      'Turning data into decision support through behavioral analytics, forecasting, experimentation, and dashboards that stay readable.',
    image: '/social_data.png',
    tag: 'Analytics',
    icon: LineChart,
  },
  {
    title: 'AI automation and agent workflows',
    description:
      'Structuring AI-assisted processes that can support research, internal operations, and multi-step execution without losing control.',
    image: '/ai_services.png',
    tag: 'Automation',
    icon: Bot,
  },
  {
    title: 'Human-centered AI strategy',
    description:
      'Bringing a social-science lens to architecture and evaluation so systems are not only advanced, but also aligned with real users.',
    image: '/socio_ai_fusion.png',
    tag: 'Strategy',
    icon: Users,
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
        '.service-card',
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
    <section id="services" ref={sectionRef} className="section">
      <div className="section-shell">
        <div className="section-heading">
          <span className="eyebrow">Services</span>
          <h2>AI capabilities designed to look polished and work in reality.</h2>
          <p>
            The strongest systems are the ones that feel intentional at every level:
            architecture, content quality, business fit, and the experience around the
            model itself.
          </p>
        </div>

        <div className="services-grid">
          {servicesData.map((item) => {
            const Icon = item.icon;

            return (
              <article key={item.title} className="surface-card service-card">
                <div className="service-card__media">
                  <img src={item.image} alt={item.title} />
                </div>

                <div className="service-card__body">
                  <div className="service-card__header">
                    <span className="service-icon">
                      <Icon size={18} />
                    </span>
                    <span className="service-tag">{item.tag}</span>
                  </div>

                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
