export default function Experience({ experience }) {
  return (
    <section id="experience" style={{ padding: '40px 16px', background: '#C0C0C0' }}>
      <div style={{ maxWidth: '960px', margin: '0 auto' }}>
        <div className="win95-window">
          <div className="win95-titlebar">
            <span>💼</span>
            <span>Work Experience</span>
          </div>

          <div style={{ padding: '16px' }}>
            {experience.length === 0 ? (
              <div className="win95-sunken" style={{ padding: '16px', textAlign: 'center', fontFamily: 'monospace', fontSize: '12px' }}>
                No experience yet — add via the admin panel.
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {experience.map((exp) => (
                  <div key={exp._id} className="win95-raised" style={{ padding: '0' }}>
                    {/* Experience title bar */}
                    <div
                      style={{
                        background: '#000080',
                        color: '#FFFFFF',
                        padding: '3px 8px',
                        fontSize: '12px',
                        fontWeight: 'bold',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      <span>{exp.role} — {exp.company}</span>
                      <span
                        className="win95-sunken"
                        style={{ fontSize: '11px', padding: '1px 6px', background: '#C0C0C0', color: '#000000', fontWeight: 'normal' }}
                      >
                        {exp.startDate} — {exp.endDate}
                      </span>
                    </div>

                    <div style={{ padding: '10px 12px' }}>
                      {exp.location && (
                        <p style={{ fontSize: '11px', color: '#444444', marginBottom: '6px' }}>
                          📍 {exp.location}{exp.type ? ` · ${exp.type}` : ''}
                        </p>
                      )}
                      {exp.bullets?.length > 0 && (
                        <ul style={{ paddingLeft: '16px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                          {exp.bullets.map((bullet, i) => (
                            <li key={i} style={{ fontSize: '12px', color: '#000000', lineHeight: 1.5, listStyleType: 'disc' }}>
                              {bullet}
                            </li>
                          ))}
                        </ul>
                      )}
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
