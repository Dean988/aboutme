import { useRef, useEffect } from 'react';
import gsap from 'gsap';

export default function Contact() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!containerRef.current || !textRef.current) return;

    const text = textRef.current;
    
    const handleEnter = () => {
      gsap.to(text, { color: 'var(--color-secondary)', scale: 1.05, duration: 0.2 });
      // Glitch effect
      gsap.to(text, { x: 5, y: -5, duration: 0.05, yoyo: true, repeat: 5 });
    };
    const handleLeave = () => {
      gsap.to(text, { color: '#fff', scale: 1, duration: 0.3 });
    };

    text.addEventListener('mouseenter', handleEnter);
    text.addEventListener('mouseleave', handleLeave);

    return () => {
      text.removeEventListener('mouseenter', handleEnter);
      text.removeEventListener('mouseleave', handleLeave);
    };
  }, []);

  const stickerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.8rem',
    fontFamily: 'var(--font-retro)',
    fontSize: '0.7rem',
    color: '#000',
    backgroundColor: '#fff',
    padding: '12px 25px',
    borderRadius: '8px',
    textDecoration: 'none',
    boxShadow: '4px 4px 0px rgba(0,240,255,0.8), -2px -2px 0px rgba(255,0,60,0.8)',
    transform: 'rotate(-2deg)',
    transition: 'transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
  };

  const LinkedinIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
  );

  const GithubIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
  );

  const MailIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>
  );

  return (
    <section 
      ref={containerRef}
      className="mobile-padding"
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        padding: '10vh 5vw',
        position: 'relative'
      }}
    >
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <p style={{ fontFamily: 'var(--font-retro)', fontSize: '0.8rem', color: 'var(--color-accent)', marginBottom: '2rem' }}>
          &gt; INITIATE CONNECTION
        </p>
        <a href="mailto:diemidiodino@gmail.com" style={{ textDecoration: 'none' }}>
          <h1 
            ref={textRef}
            style={{ 
              fontSize: 'clamp(3rem, 8vw, 10rem)', 
              cursor: 'none',
              fontFamily: 'var(--font-display)',
              WebkitTextStroke: '1px #fff',
              color: 'transparent',
              transition: 'all 0.3s'
            }}
          >
            CONTACT
          </h1>
        </a>

        {/* Social Stickers Panel */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center',
          gap: '2.5rem', 
          marginTop: '4rem',
          flexWrap: 'wrap'
        }}>
          <a href="https://www.linkedin.com/in/dinode/" target="_blank" rel="noreferrer" 
             style={stickerStyle}
             onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.1) rotate(3deg)'; }}
             onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1) rotate(-2deg)'; }}>
            <LinkedinIcon />
            LINKEDIN
          </a>
          <a href="https://github.com/Dean988" target="_blank" rel="noreferrer" 
             style={{...stickerStyle, transform: 'rotate(2deg)'}}
             onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.1) rotate(-3deg)'; }}
             onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1) rotate(2deg)'; }}>
            <GithubIcon />
            GITHUB
          </a>
          <a href="mailto:diemidiodino@gmail.com" 
             style={{...stickerStyle, transform: 'rotate(-1deg)'}}
             onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.1) rotate(4deg)'; }}
             onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1) rotate(-1deg)'; }}>
            <MailIcon />
            EMAIL
          </a>
        </div>
      </div>

      <footer style={{
        position: 'absolute',
        bottom: '2rem',
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        padding: '0 5vw',
        opacity: 0.5,
        fontFamily: 'var(--font-retro)',
        fontSize: '0.5rem',
        color: 'var(--color-accent)'
      }}>
        <span>© {new Date().getFullYear()} DINO DI EMIDIO</span>
        <span>LEVEL 27 - SYSTEM.ONLINE</span>
      </footer>
    </section>
  );
}
