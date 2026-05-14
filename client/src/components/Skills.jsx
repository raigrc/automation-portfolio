const categoryIcons = {
  Languages: '📝',
  Frameworks: '🔧',
  'Automation Tools': '⚙️',
  'Scraping & Data': '🕷️',
  'AI Models': '🤖',
  'DevOps & CI/CD': '🔄',
  Databases: '🗄️',
};

export default function Skills({ skills }) {
  const grouped = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill);
    return acc;
  }, {});

  const categories = Object.keys(grouped);

  return (
    <section id="skills" style={{ padding: '40px 16px', background: '#C0C0C0' }}>
      <div style={{ maxWidth: '960px', margin: '0 auto' }}>
        <div className="win95-window">
          <div className="win95-titlebar">
            <span>⚙️</span>
            <span>Technical Skills</span>
          </div>

          <div style={{ padding: '16px' }}>
            {categories.length === 0 ? (
              <div
                className="win95-sunken"
                style={{ padding: '16px', textAlign: 'center', fontFamily: 'monospace', fontSize: '12px' }}
              >
                No skills yet — add them via the admin panel.
              </div>
            ) : (
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
                  gap: '10px',
                }}
              >
                {categories.map((category) => (
                  <div key={category} className="win95-raised" style={{ padding: '8px 12px' }}>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        marginBottom: '8px',
                        borderBottom: '1px solid #808080',
                        paddingBottom: '4px',
                      }}
                    >
                      <span>{categoryIcons[category] ?? '📦'}</span>
                      <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#000080' }}>
                        {category}
                      </span>
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                      {grouped[category].map((skill) => (
                        <span key={skill._id} className="win95-tag" title={`${skill.level}%`}>
                          {skill.name}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
