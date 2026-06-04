import { useState } from 'react';

export default function ProjectsTab({ projects, loading, isMobile }) {
  const [selectedId, setSelectedId] = useState(null);

  const list = projects ?? [];
  const selected = list.find((p) => p._id === selectedId) ?? list[0] ?? null;

  if (loading) {
    return <div style={{ padding: '20px', fontSize: '12px', color: '#444' }}>Loading projects…</div>;
  }

  if (list.length === 0) {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '240px',
          color: '#808080',
          fontSize: '12px',
          gap: '8px',
        }}
      >
        <span style={{ fontSize: '32px' }}>📂</span>
        <p>No projects yet. Add them from the admin dashboard.</p>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: '0' }}>
      {/* Toolbar */}
      <div
        className="win-panel-raised"
        style={{
          padding: '3px 6px',
          marginBottom: '6px',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          fontSize: '11px',
        }}
      >
        <span>📁</span>
        <span style={{ fontWeight: 'bold' }}>My Projects</span>
        <div style={{ width: '1px', height: '16px', background: '#808080', marginLeft: '4px' }} />
        <span style={{ color: '#444' }}>{list.length} object{list.length !== 1 ? 's' : ''}</span>
      </div>

      {/* Explorer layout */}
      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '220px 1fr', gap: '6px', flex: 1 }}>
        {/* Left: file list */}
        <div className="win-panel-sunken" style={{ padding: '2px', overflow: 'auto', maxHeight: isMobile ? '160px' : '380px' }}>
          {/* Header row */}
          <div
            className="win-panel-raised"
            style={{
              padding: '2px 6px',
              fontSize: '11px',
              fontWeight: 'bold',
              marginBottom: '1px',
              display: 'flex',
              gap: '6px',
            }}
          >
            <span style={{ flex: 1 }}>Name</span>
          </div>

          {list.map((project) => (
            <div
              key={project._id}
              className={selected?._id === project._id ? 'file-row file-row-selected' : 'file-row'}
              onClick={() => setSelectedId(project._id)}
              style={{ fontSize: '11px' }}
            >
              <span>{project.icon || '📂'}</span>
              <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {project.title}
              </span>
            </div>
          ))}
        </div>

        {/* Right: detail pane */}
        <div className="win-panel-sunken" style={{ padding: '10px 12px', overflow: 'auto', maxHeight: isMobile ? '280px' : '380px' }}>
          {selected ? (
            <div>
              {/* Header */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  marginBottom: '10px',
                  paddingBottom: '8px',
                  borderBottom: '1px solid #808080',
                }}
              >
                <span style={{ fontSize: '28px' }}>{selected.icon || '📂'}</span>
                <div>
                  <p style={{ fontWeight: 'bold', fontSize: '13px', marginBottom: '2px' }}>
                    {selected.title}
                  </p>
                  {selected.company && (
                    <p style={{ fontSize: '11px', color: '#000080' }}>{selected.company}</p>
                  )}
                </div>
              </div>

              {/* Description */}
              <p style={{ fontSize: '12px', lineHeight: 1.65, marginBottom: '10px', color: '#000000' }}>
                {selected.description}
              </p>

              {/* Tech tags */}
              {selected.tech?.length > 0 && (
                <div style={{ marginBottom: '10px' }}>
                  <p style={{ fontSize: '11px', color: '#444', marginBottom: '4px', fontWeight: 'bold' }}>
                    Stack:
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3px' }}>
                    {selected.tech.map((t) => (
                      <span key={t} className="win95-tag">{t}</span>
                    ))}
                  </div>
                </div>
              )}

              {/* Links */}
              {(selected.githubUrl || selected.liveUrl) && (
                <div style={{ display: 'flex', gap: '6px', paddingTop: '8px', borderTop: '1px solid #808080' }}>
                  {selected.githubUrl && (
                    <a
                      href={selected.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="win-button-sm"
                      style={{ textDecoration: 'none' }}
                    >
                      Open ↗
                    </a>
                  )}
                  {selected.liveUrl && (
                    <a
                      href={selected.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="win-button-sm"
                      style={{ textDecoration: 'none' }}
                    >
                      Live Demo ↗
                    </a>
                  )}
                </div>
              )}
            </div>
          ) : (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '200px',
                color: '#808080',
                fontSize: '12px',
                gap: '8px',
              }}
            >
              <span style={{ fontSize: '32px' }}>📂</span>
              <p>Select a project to view details</p>
            </div>
          )}
        </div>
      </div>

      {/* Status bar */}
      <div className="win-statusbar" style={{ marginTop: '4px' }}>
        <span className="win-statusbar-cell" style={{ flex: 1 }}>
          {selected ? selected.title : `${list.length} objects`}
        </span>
        <span className="win-statusbar-cell">
          {selected?.company ?? 'All Projects'}
        </span>
      </div>
    </div>
  );
}
