import { useEffect, useRef, useState } from 'react';
import { Bot, Database, LineChart, Sparkles } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const servicesData = [
  {
    title: 'RAG and knowledge assistants',
    description:
      'Retrieval-first systems that can navigate internal knowledge, preserve context, and return outputs that are actually usable in production workflows.',
    image: '/rag_knowledge.png',
    motion: '/background.gif',
    tag: 'Knowledge systems',
    icon: Database,
  },
  {
    title: 'Predictive modeling and analytics',
    description:
      'Behavioral analysis, forecasting, experimentation, and dashboards designed to reveal signal without flattening the human side of the data.',
    image: '/social_data.png',
    motion: '/social_anim_new.gif',
    tag: 'Analytics',
    icon: LineChart,
  },
  {
    title: 'AI automation and agent workflows',
    description:
      'Agentic layers and orchestrated systems for multi-step internal processes, research support, and execution chains that need control as much as intelligence.',
    image: '/ai_services.png',
    motion: '/autonomous_agents.gif',
    tag: 'Automation',
    icon: Bot,
  },
  {
    title: 'Immersive AI direction',
    description:
      'A more cinematic layer for AI products and portfolios: motion, media, and interaction design that make technical work feel immediate and memorable.',
    image: '/socio_ai_fusion.png',
    motion: '/ai_anim.gif',
    tag: 'Experience layer',
    icon: Sparkles,
  },
];

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const activeService = servicesData[activeIndex];

  useEffect(() => {
    if (!sectionRef.current) {
      return;
    }

    const context = gsap.context(() => {
      gsap.fromTo(
        '.services-reveal',
        { y: 36, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.84,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 72%',
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
          <h2>Media-rich interactions around serious AI work.</h2>
          <p>
            This is the balance I aim for: strong technical systems, but presented with
            enough visual intelligence and motion to feel contemporary, tactile, and
            immersive rather than flat.
          </p>
        </div>

        <div className="services-explorer">
          <div className="services-list services-reveal">
            {servicesData.map((item, index) => {
              const Icon = item.icon;
              const isActive = activeIndex === index;

              return (
                <button
                  key={item.title}
                  type="button"
                  className={`service-list-item${isActive ? ' is-active' : ''}`}
                  onMouseEnter={() => setActiveIndex(index)}
                  onFocus={() => setActiveIndex(index)}
                  data-cursor="media"
                >
                  <span className="service-icon">
                    <Icon size={18} />
                  </span>
                  <div className="service-list-item__copy">
                    <span className="service-tag">{item.tag}</span>
                    <strong>{item.title}</strong>
                    <p>{item.description}</p>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="surface-card services-preview services-reveal" data-cursor="media">
            <div className="services-preview__visual">
              <img className="services-preview__motion" src={activeService.motion} alt="" />
              <img className="services-preview__image" src={activeService.image} alt={activeService.title} />
              <div className="services-preview__wash" />
              <div className="services-preview__label">
                <span>{activeService.tag}</span>
                <strong>{activeService.title}</strong>
              </div>
            </div>

            <div className="services-preview__body">
              <p>{activeService.description}</p>
              <div className="services-preview__pills">
                <span>Interactive layer</span>
                <span>Immersive media</span>
                <span>Production mindset</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
