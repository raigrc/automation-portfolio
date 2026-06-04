export function ProjectCard({ project, isCoremind }) {
  return (
    <div
      className="win95-window"
      style={{ marginBottom: '0', display: 'flex', flexDirection: 'column' }}
    >
      {/* Title bar */}
      <div className={`win95-titlebar${isCoremind ? '' : ' win95-titlebar-inactive'}`}>
        <span>{project.icon || '📁'}</span>
        <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {project.title}
        </span>
      </div>

      {/* Content */}
      <div style={{ padding: '10px 12px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        {project.company && (
          <p style={{ fontSize: '10px', color: '#000080', fontWeight: 'bold', marginBottom: '4px' }}>
            {project.company}
          </p>
        )}
        <p style={{ fontSize: '12px', color: '#000000', lineHeight: 1.5, marginBottom: '8px', flex: 1 }}>
          {project.description}
        </p>

        {/* Tech tags */}
        {project.tech?.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3px', marginBottom: '8px' }}>
            {project.tech.map((t) => (
              <span key={t} className="win95-tag">{t}</span>
            ))}
          </div>
        )}

        {/* Links */}
        {(project.githubUrl || project.liveUrl) && (
          <div style={{ borderTop: '1px solid #808080', paddingTop: '6px', display: 'flex', gap: '6px' }}>
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="win95-btn"
                style={{ fontSize: '11px', padding: '3px 10px' }}
              >
                View Code
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="win95-btn"
                style={{ fontSize: '11px', padding: '3px 10px' }}
              >
                Live Demo
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
