export default function Footer({ profile }) {
  return (
    <footer style={{ background: '#C0C0C0', borderTop: '2px solid #808080' }}>
      {/* Taskbar */}
      <div
        style={{
          background: '#C0C0C0',
          borderTop: '2px solid #FFFFFF',
          padding: '4px 8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '8px',
        }}
      >
        {/* Start button area */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div
            className="win95-raised"
            style={{ padding: '3px 10px', fontSize: '12px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '4px' }}
          >
            <span>🖥</span>
            {profile?.name ?? 'Portfolio'}
          </div>
          <div className="win95-sunken" style={{ padding: '2px 8px', fontSize: '11px', color: '#444444' }}>
            Open to Work · AI Automation · n8n · Philippines
          </div>
        </div>

        {/* Links */}
        <div style={{ display: 'flex', gap: '4px' }}>
          {profile?.github && (
            <a href={profile.github} target="_blank" rel="noopener noreferrer" className="win95-btn" style={{ fontSize: '11px', padding: '3px 10px' }}>
              GitHub
            </a>
          )}
          {profile?.linkedin && (
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="win95-btn" style={{ fontSize: '11px', padding: '3px 10px' }}>
              LinkedIn
            </a>
          )}
          {profile?.email && (
            <a href={`mailto:${profile.email}`} className="win95-btn" style={{ fontSize: '11px', padding: '3px 10px' }}>
              Email
            </a>
          )}
        </div>

        {/* Clock */}
        <div className="win95-sunken" style={{ padding: '2px 10px', fontSize: '11px', minWidth: '80px', textAlign: 'center' }}>
          © {new Date().getFullYear()}
        </div>
      </div>
    </footer>
  );
}
