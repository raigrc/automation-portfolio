import { useState, useEffect } from 'react';

export default function Taskbar() {
  const [time, setTime] = useState('');

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const h = now.getHours().toString().padStart(2, '0');
      const m = now.getMinutes().toString().padStart(2, '0');
      setTime(`${h}:${m}`);
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 200,
        background: '#C0C0C0',
        borderTop: '2px solid #FFFFFF',
        boxShadow: 'inset 0 1px 0 #FFFFFF',
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
        height: '34px',
      }}
    >
      {/* Start button */}
      <button
        className="win95-btn"
        style={{
          fontWeight: 'bold',
          padding: '2px 10px',
          fontSize: '12px',
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          minWidth: 'auto',
          height: '26px',
        }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <span style={{ fontSize: '14px' }}>🪟</span> Start
      </button>

      {/* Vertical separator */}
      <div
        style={{
          width: '2px',
          height: '24px',
          borderLeft: '1px solid #808080',
          borderRight: '1px solid #FFFFFF',
          flexShrink: 0,
        }}
      />

      {/* Quick nav buttons */}
      <button
        className="win95-btn"
        style={{ padding: '2px 8px', fontSize: '11px', minWidth: 'auto', height: '26px' }}
        onClick={() => scrollTo('about')}
      >
        👤 About
      </button>
      <button
        className="win95-btn"
        style={{ padding: '2px 8px', fontSize: '11px', minWidth: 'auto', height: '26px' }}
        onClick={() => scrollTo('projects')}
      >
        🗂️ Projects
      </button>
      <button
        className="win95-btn"
        style={{ padding: '2px 8px', fontSize: '11px', minWidth: 'auto', height: '26px' }}
        onClick={() => scrollTo('skills')}
      >
        ⚙️ Skills
      </button>
      <button
        className="win95-btn"
        style={{ padding: '2px 8px', fontSize: '11px', minWidth: 'auto', height: '26px' }}
        onClick={() => scrollTo('contact')}
      >
        ✉️ Contact
      </button>

      {/* Spacer */}
      <div style={{ flex: 1 }} />

      {/* Right area separator */}
      <div
        style={{
          width: '2px',
          height: '24px',
          borderLeft: '1px solid #808080',
          borderRight: '1px solid #FFFFFF',
          flexShrink: 0,
        }}
      />

      {/* Clock */}
      <div
        className="win95-sunken"
        style={{
          padding: '2px 10px',
          fontSize: '12px',
          minWidth: '52px',
          textAlign: 'center',
          fontFamily: '"Courier New", monospace',
          height: '26px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {time}
      </div>
    </div>
  );
}
