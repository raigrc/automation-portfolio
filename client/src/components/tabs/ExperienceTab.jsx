export default function ExperienceTab({ experience, loading }) {
  if (loading) {
    return <div style={{ padding: '20px', fontSize: '12px', color: '#444' }}>Loading work history…</div>;
  }

  const jobs = experience ?? [];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: '0' }}>
      {/* Notepad toolbar */}
      <div
        className="win-panel-raised"
        style={{ padding: '3px 8px', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11px' }}
      >
        <span>📄</span>
        <span style={{ fontWeight: 'bold' }}>Work History.txt — Notepad</span>
      </div>

      {/* Notepad body */}
      <div
        className="win-panel-sunken"
        style={{
          flex: 1,
          padding: '12px 14px',
          overflow: 'auto',
          maxHeight: '400px',
          fontFamily: '"Courier New", Courier, monospace',
          fontSize: '11px',
          lineHeight: 1.7,
          background: '#FFFFFF',
          color: '#000000',
        }}
      >
        <pre style={{ margin: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
{`WORK HISTORY — Raven Justin P. Garcia
======================================
AI Automation Developer | n8n Specialist
Last modified: 2025

`}
          {jobs.length === 0 ? (
            `[No experience entries found. Add via admin panel.]\n`
          ) : (
            jobs.map((job, i) => {
              const bullets = Array.isArray(job.bullets)
                ? job.bullets
                : typeof job.description === 'string'
                ? job.description.split('\n').filter(Boolean)
                : [];

              return (
                `${'─'.repeat(50)}\n` +
                `POSITION : ${job.title ?? 'N/A'}\n` +
                `COMPANY  : ${job.company ?? 'N/A'}\n` +
                `PERIOD   : ${job.startDate ?? ''} – ${job.endDate ?? 'Present'}\n` +
                `LOCATION : ${job.location ?? 'Philippines'}\n` +
                `\n` +
                (bullets.length > 0
                  ? bullets.map((b) => `  • ${b}`).join('\n') + '\n'
                  : '') +
                (i < jobs.length - 1 ? '\n' : '')
              );
            }).join('')
          )}
{`\n${'─'.repeat(50)}
[END OF FILE]
`}
        </pre>
      </div>

      {/* Status bar */}
      <div className="win-statusbar" style={{ marginTop: '4px' }}>
        <span className="win-statusbar-cell" style={{ flex: 1 }}>
          {jobs.length} position{jobs.length !== 1 ? 's' : ''} found
        </span>
        <span className="win-statusbar-cell">Ln 1, Col 1</span>
        <span className="win-statusbar-cell">100%</span>
      </div>
    </div>
  );
}
