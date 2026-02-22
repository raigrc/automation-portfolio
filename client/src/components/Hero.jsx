import { useState, useEffect } from 'react';

const roles = [
  'AI-Driven Programmer',
  'n8n Automation Developer',
  'AI Workflow Architect',
];

export default function Hero({ profile }) {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = roles[roleIndex];
    let timeout;
    if (!deleting && displayed.length < current.length) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 80);
    } else if (!deleting && displayed.length === current.length) {
      timeout = setTimeout(() => setDeleting(true), 2000);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 40);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setRoleIndex((i) => (i + 1) % roles.length);
    }
    return () => clearTimeout(timeout);
  }, [displayed, deleting, roleIndex]);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `linear-gradient(#7C3AED 1px, transparent 1px), linear-gradient(90deg, #7C3AED 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/20 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-56 h-56 bg-accent/15 rounded-full blur-3xl" />

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        {/* Greeting */}
        <p className="text-text-muted text-sm font-mono mb-4 animate-fade-in">
          <span className="text-accent">{'>'}</span> Hello, World! I&apos;m
        </p>

        {/* Name */}
        <h1 className="text-5xl md:text-7xl font-extrabold mb-4 animate-slide-up">
          <span className="text-gradient">{profile?.name ?? 'Your Name'}</span>
        </h1>

        {/* Typewriter role */}
        <div className="h-10 flex items-center justify-center mb-6">
          <p className="text-xl md:text-2xl font-mono text-text-muted">
            <span className="text-primary-hover">{displayed}</span>
            <span className="animate-blink text-accent">|</span>
          </p>
        </div>

        {/* Subtitle */}
        {profile?.subtitle && (
          <p className="text-text-muted text-base md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
            {profile.subtitle}
          </p>
        )}

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={() => scrollTo('projects')}
            className="px-8 py-3 bg-primary hover:bg-primary-hover text-white font-semibold rounded-lg transition-all duration-200 glow-purple-sm hover:glow-purple hover:scale-105"
          >
            View Projects
          </button>
          <button
            onClick={() => scrollTo('contact')}
            className="px-8 py-3 border border-primary text-primary hover:bg-primary/10 font-semibold rounded-lg transition-all duration-200 hover:scale-105"
          >
            Contact Me
          </button>
          {/* {profile?.resumeUrl && (
            <a
              href={profile.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 border border-border text-text-muted hover:border-accent hover:text-accent font-semibold rounded-lg transition-all duration-200 hover:scale-105"
            >
              Download Resume
            </a>
          )} */}
        </div>

      </div>

      {/* Scroll indicator — child of section so it anchors to viewport bottom */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-text-muted animate-bounce">
        <span className="text-xs font-mono">scroll</span>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </section>
  );
}
