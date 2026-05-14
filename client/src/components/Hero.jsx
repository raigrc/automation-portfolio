import { useState, useEffect } from 'react';

const roles = [
  'AI-Driven Programmer',
  'n8n Automation Developer',
  'AI Workflow Architect',
];

const SHORTCUTS = [
  { icon: '🗂️', label: 'My Projects.exe', target: 'projects' },
  { icon: '⚙️', label: 'skills.txt', target: 'skills' },
  { icon: '💼', label: 'experience.doc', target: 'experience' },
  { icon: '✉️', label: 'contact.lnk', target: 'contact' },
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
    <section
      id="hero"
      style={{
        minHeight: '100vh',
        background: '#008080',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: '48px',
        paddingBottom: '48px',
      }}
    >
      {/* Main portfolio window */}
      <div className="win95-window" style={{ width: '100%', maxWidth: '680px', margin: '0 16px' }}>
        {/* Title bar */}
        <div className="win95-titlebar">
          <span>🖥</span>
          <span>Welcome — Automation Developer Portfolio</span>
          <div style={{ marginLeft: 'auto', display: 'flex', gap: '2px' }}>
            <button
              className="win95-raised"
              style={{ width: '16px', height: '14px', fontSize: '9px', padding: '0', cursor: 'default', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              _
            </button>
            <button
              className="win95-raised"
              style={{ width: '16px', height: '14px', fontSize: '9px', padding: '0', cursor: 'default', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              □
            </button>
            <button
              className="win95-raised"
              style={{ width: '16px', height: '14px', fontSize: '9px', padding: '0', cursor: 'default', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              ✕
            </button>
          </div>
        </div>

        {/* Window content */}
        <div style={{ padding: '24px 32px', textAlign: 'center' }}>
          <p style={{ fontSize: '11px', color: '#444444', marginBottom: '8px', fontFamily: 'monospace' }}>
            C:\PORTFOLIO&gt; Hello, World! I&apos;m
          </p>

          <h1 style={{ fontSize: '36px', fontWeight: 'bold', color: '#000080', marginBottom: '8px', lineHeight: 1.2 }}>
            {profile?.name ?? 'Your Name'}
          </h1>

          <div style={{ height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '12px' }}>
            <p style={{ fontSize: '16px', fontFamily: 'monospace', color: '#000080' }}>
              {displayed}
              <span className="animate-blink" style={{ color: '#000000' }}>|</span>
            </p>
          </div>

          {profile?.subtitle && (
            <p style={{ fontSize: '13px', color: '#444444', maxWidth: '480px', margin: '0 auto 20px', lineHeight: 1.5 }}>
              {profile.subtitle}
            </p>
          )}

          <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', flexWrap: 'wrap', marginTop: '20px' }}>
            <button onClick={() => scrollTo('projects')} className="win95-btn-primary">
              View Projects
            </button>
            <button onClick={() => scrollTo('contact')} className="win95-btn">
              Contact Me
            </button>
          </div>
        </div>

        {/* Status bar */}
        <div className="win95-status-bar" style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
          <div className="win95-sunken" style={{ padding: '1px 8px', fontSize: '11px', flex: 1 }}>
            Ready
          </div>
          <div className="win95-sunken" style={{ padding: '1px 8px', fontSize: '11px' }}>
            Automation Developer
          </div>
        </div>
      </div>

      {/* Desktop shortcut icons */}
      <div
        style={{
          display: 'flex',
          gap: '28px',
          marginTop: '32px',
          justifyContent: 'center',
          flexWrap: 'wrap',
          padding: '0 16px',
        }}
      >
        {SHORTCUTS.map(({ icon, label, target }) => (
          <button
            key={target}
            onClick={() => scrollTo(target)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '4px',
              padding: '6px',
              width: '72px',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.querySelector('.shortcut-label').style.background = '#000080';
              e.currentTarget.querySelector('.shortcut-label').style.color = '#FFFFFF';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.querySelector('.shortcut-label').style.background = 'transparent';
              e.currentTarget.querySelector('.shortcut-label').style.color = '#FFFFFF';
            }}
          >
            <span style={{ fontSize: '36px', lineHeight: 1 }}>{icon}</span>
            <span
              className="shortcut-label"
              style={{
                fontSize: '11px',
                color: '#FFFFFF',
                textShadow: '1px 1px 1px #000000',
                textAlign: 'center',
                lineHeight: 1.2,
                padding: '1px 2px',
                wordBreak: 'break-word',
                width: '100%',
              }}
            >
              {label}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}
