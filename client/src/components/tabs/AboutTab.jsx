const STATS = [
  { metric: '50+', label: 'Workflows Built' },
  { metric: '3',   label: 'Companies Served' },
  { metric: '2+',  label: 'Years Experience' },
  { metric: '10+', label: 'AI Models Used' },
];

export default function AboutTab({ profile, loading, isMobile }) {
  if (loading) {
    return (
      <div style={{ padding: '20px', fontSize: '12px', color: '#444' }}>
        Loading system information…
      </div>
    );
  }

  const properties = [
    { label: 'Name',     value: profile?.name ?? 'N/A' },
    { label: 'Role',     value: profile?.title ?? 'AI Engineer & Automation Developer' },
    { label: 'Stack',    value: 'n8n · React · Node.js · MongoDB · OpenAI' },
    { label: 'Status',   value: '● Open to Work' },
    { label: 'Location', value: profile?.location ?? 'Philippines' },
    { label: 'Email',    value: profile?.email ?? 'N/A' },
  ];

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : '160px 1fr',
        gap: '12px',
        alignItems: 'start',
      }}
    >
      {/* Left: icon + OS name */}
      <div style={{ display: 'flex', flexDirection: isMobile ? 'row' : 'column', alignItems: 'center', gap: '6px' }}>
        <div
          className="win-panel-raised"
          style={{
            width: isMobile ? 'auto' : '100%',
            flex: isMobile ? 1 : undefined,
            padding: '12px 8px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '6px',
          }}
        >
          <span style={{ fontSize: '56px', lineHeight: 1 }}>🖥️</span>
          <p style={{ fontSize: '12px', fontWeight: 'bold', textAlign: 'center' }}>RavenOS 95</p>
          <p style={{ fontSize: '10px', color: '#444', textAlign: 'center' }}>Portfolio v1.0</p>
        </div>

        {/* Quick links */}
        <div style={{ display: 'flex', flexDirection: isMobile ? 'row' : 'column', gap: '4px', width: isMobile ? 'auto' : '100%', flexShrink: 0 }}>
          {profile?.github && (
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="win-button-sm"
              style={{ textAlign: 'center', display: 'block' }}
            >
              GitHub ↗
            </a>
          )}
          {profile?.linkedin && (
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="win-button-sm"
              style={{ textAlign: 'center', display: 'block' }}
            >
              LinkedIn ↗
            </a>
          )}
        </div>
      </div>

      {/* Right: properties + bio + stats */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {/* System Properties panel */}
        <div className="win-panel-raised" style={{ padding: '10px 12px' }}>
          <p
            style={{
              fontSize: '12px',
              fontWeight: 'bold',
              borderBottom: '1px solid #808080',
              paddingBottom: '4px',
              marginBottom: '8px',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
            }}
          >
            🖥️ System Properties
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '80px 1fr', rowGap: '4px', columnGap: '8px' }}>
            {properties.map(({ label, value }) => (
              <>
                <span
                  key={label + '-l'}
                  style={{ fontSize: '11px', color: '#000080', fontWeight: 'bold', whiteSpace: 'nowrap' }}
                >
                  {label}:
                </span>
                <span key={label + '-v'} style={{ fontSize: '11px', color: '#000000', wordBreak: 'break-word' }}>
                  {value}
                </span>
              </>
            ))}
          </div>
        </div>

        {/* Bio */}
        <div className="win-panel-sunken" style={{ padding: '10px 12px' }}>
          <p style={{ fontSize: '12px', lineHeight: 1.65, color: '#000000' }}>
            {profile?.bio ?? "Most of what I do lives inside n8n — wiring up AI models, scraping pipelines, and business APIs into workflows that run on their own. I've shipped a voice AI therapy assistant, a WhatsApp automation system, a multi-source lead acquisition pipeline, and cross-platform social automation across 5 platforms. Recently promoted to manage the AI/Dev department at Core Mind Technology — I still write the code, I just also make sure the team does too. I like building things that keep working while nobody's watching."}
          </p>
        </div>

        {/* Stats row */}
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)', gap: '6px' }}>
          {STATS.map(({ metric, label }) => (
            <div key={label} className="win-panel-raised" style={{ padding: '8px 6px', textAlign: 'center' }}>
              <p style={{ fontSize: '20px', fontWeight: 'bold', color: '#000080', lineHeight: 1 }}>{metric}</p>
              <p style={{ fontSize: '9px', color: '#444444', marginTop: '3px' }}>{label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
