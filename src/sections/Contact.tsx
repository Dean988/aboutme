import { useEffect, useRef } from 'react';
import { ArrowUpRight, Mail } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function LinkedinIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function GithubIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
    </svg>
  );
}

const socialLinks = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/dinode/', icon: LinkedinIcon },
  { label: 'GitHub', href: 'https://github.com/Dean988', icon: GithubIcon },
  { label: 'Email', href: 'mailto:diemidiodino@gmail.com', icon: Mail },
];

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) {
      return;
    }

    const context = gsap.context(() => {
      gsap.fromTo(
        '.contact-reveal',
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
    <section id="contact" ref={sectionRef} className="section section-soft">
      <div className="section-shell">
        <div className="contact-shell panel">
          <div className="contact-shell__grid">
            <div className="contact-shell__copy">
              <span className="eyebrow contact-reveal">Final Screen</span>

              <h2 className="contact-reveal">Ready for the next mission.</h2>

              <p className="contact-reveal">
                If you are building an AI or data product and want the result to feel
                sharper, clearer, and more memorable, I would be happy to hear about it.
              </p>

              <div className="contact-actions contact-reveal">
                <a className="button button-primary" href="mailto:diemidiodino@gmail.com">
                  <Mail size={18} />
                  diemidiodino@gmail.com
                </a>
                <a
                  className="button button-secondary"
                  href="https://github.com/Dean988/aboutme"
                  target="_blank"
                  rel="noreferrer"
                >
                  View repository
                  <ArrowUpRight size={18} />
                </a>
              </div>
            </div>

            <div className="contact-shell__panel contact-reveal">
              <div className="contact-shell__media">
                <img src="/social_data.png" alt="Data visualization graphic." />
              </div>

              <div className="contact-links">
                {socialLinks.map((item) => {
                  const Icon = item.icon;

                  return (
                    <a
                      key={item.label}
                      className="contact-link"
                      href={item.href}
                      target={item.href.startsWith('http') ? '_blank' : undefined}
                      rel={item.href.startsWith('http') ? 'noreferrer' : undefined}
                    >
                      <Icon size={18} />
                      {item.label}
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          <footer className="contact-meta contact-reveal">
            <span>© {new Date().getFullYear()} Dino Di Emidio</span>
            <span>System status: online</span>
          </footer>
        </div>
      </div>
    </section>
  );
}
