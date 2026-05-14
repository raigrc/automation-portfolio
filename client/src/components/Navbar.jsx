import { useState } from 'react';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar({ profile }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className="win95-menubar fixed top-0 left-0 right-0 z-50" style={{ borderBottom: '2px solid #808080' }}>
      <div
        style={{
          background: 'linear-gradient(to right, #000080 0%, #1084d0 100%)',
          padding: '3px 8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Logo */}
        <a
          href="#"
          onClick={(e) => handleNavClick(e, 'body')}
          style={{
            color: '#FFFFFF',
            fontWeight: 'bold',
            fontSize: '13px',
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}
        >
          <span style={{ fontSize: '16px' }}>🖥</span>
          {profile?.name ?? 'Portfolio'} — Automation Developer
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center" style={{ gap: '2px', listStyle: 'none' }}>
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                style={{
                  color: '#FFFFFF',
                  fontSize: '12px',
                  textDecoration: 'none',
                  padding: '2px 10px',
                  display: 'block',
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = 'rgba(255,255,255,0.2)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'transparent';
                }}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile hamburger */}
        <button
          className="md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{ color: '#FFFFFF', background: 'none', border: 'none', cursor: 'pointer', fontSize: '18px' }}
        >
          ☰
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden win95-raised" style={{ padding: '4px 0' }}>
          <ul style={{ listStyle: 'none' }}>
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  style={{
                    display: 'block',
                    padding: '6px 16px',
                    color: '#000000',
                    fontSize: '12px',
                    textDecoration: 'none',
                  }}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}
