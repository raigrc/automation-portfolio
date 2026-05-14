const STATS = [
  { metric: '50+', label: 'Workflows Built' },
  { metric: '3', label: 'Companies Served' },
  { metric: '2+', label: 'Years Experience' },
  { metric: '10+', label: 'AI Models Used' },
];

export default function About({ profile }) {
  return (
    <section id="about" style={{ padding: '40px 16px', background: '#C0C0C0' }}>
      <div style={{ maxWidth: '960px', margin: '0 auto' }}>
        <div className="win95-window">
          <div className="win95-titlebar">
            <span>👤</span>
            <span>About Me</span>
          </div>

          <div style={{ padding: '16px 20px' }}>
            {/* Stats row */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: '8px',
                marginBottom: '16px',
              }}
            >
              {STATS.map(({ metric, label }) => (
                <div
                  key={label}
                  className="win95-raised"
                  style={{ padding: '10px 8px', textAlign: 'center' }}
                >
                  <p style={{ fontSize: '22px', fontWeight: 'bold', color: '#000080', lineHeight: 1 }}>
                    {metric}
                  </p>
                  <p style={{ fontSize: '10px', color: '#444444', marginTop: '3px' }}>{label}</p>
                </div>
              ))}
            </div>

            {/* Sunken divider */}
            <div
              style={{
                height: '4px',
                borderTop: '2px solid #808080',
                borderBottom: '2px solid #FFFFFF',
                marginBottom: '16px',
              }}
            />

            {/* Bio + image grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 200px', gap: '24px', alignItems: 'start' }}>
              {/* Text column */}
              <div>
                <p style={{ fontSize: '13px', color: '#000000', lineHeight: 1.6, marginBottom: '16px' }}>
                  {profile?.bio ??
                    "I'm a passionate Automation Developer dedicated to building AI-driven workflows and automation systems that accelerate business operations. I bridge the gap between manual processes and intelligent automation."}
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '16px' }}>
                  {[
                    { label: 'Location', value: profile?.location ?? 'Philippines' },
                    { label: 'Status', value: 'Open to Work' },
                    { label: 'Degree', value: 'BS Information Technology' },
                    { label: 'Email', value: profile?.email ?? 'your@email.com' },
                  ].map(({ label, value }) => (
                    <div key={label} className="win95-raised" style={{ padding: '6px 8px' }}>
                      <p style={{ fontSize: '10px', color: '#000080', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '2px' }}>
                        {label}
                      </p>
                      <p style={{ fontSize: '12px', color: '#000000', wordBreak: 'break-word' }}>{value}</p>
                    </div>
                  ))}
                </div>

                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {profile?.github && (
                    <a
                      href={profile.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="win95-btn"
                      style={{ fontSize: '11px', padding: '4px 12px' }}
                    >
                      GitHub
                    </a>
                  )}
                  {profile?.linkedin && (
                    <a
                      href={profile.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="win95-btn"
                      style={{ fontSize: '11px', padding: '4px 12px' }}
                    >
                      LinkedIn
                    </a>
                  )}
                </div>
              </div>

              {/* Image column */}
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div
                  className="win95-sunken"
                  style={{
                    width: '180px',
                    height: '200px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                  }}
                >
                  {profile?.image ? (
                    <img
                      src={profile.image}
                      alt={profile.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '48px' }}>👤</span>
                      <p style={{ fontSize: '10px', color: '#444444', fontFamily: 'monospace', textAlign: 'center' }}>
                        Add photo via admin
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
