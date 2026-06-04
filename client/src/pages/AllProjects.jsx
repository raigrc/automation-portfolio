import { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import api from '../hooks/useApi';
import { ProjectCard } from '../components/Projects';

export default function AllProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('All');

  useEffect(() => {
    api.get('/projects')
      .then((res) => setProjects(res.data))
      .catch((err) => console.error('Failed to fetch projects:', err))
      .finally(() => setLoading(false));
  }, []);

  const techFilters = useMemo(() => {
    const counts = {};
    projects.forEach((p) => p.tech?.forEach((t) => { counts[t] = (counts[t] || 0) + 1; }));
    const repeated = Object.entries(counts)
      .filter(([, c]) => c >= 2)
      .sort((a, b) => b[1] - a[1])
      .map(([tag]) => tag);
    return ['All', ...repeated];
  }, [projects]);

  const filtered = useMemo(() => {
    if (activeFilter === 'All') return projects;
    return projects.filter((p) => p.tech?.includes(activeFilter));
  }, [projects, activeFilter]);

  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: '#008080' }}>
        <div className="win95-window" style={{ width: '300px' }}>
          <div className="win95-titlebar">
            <span>⏳</span>
            <span>Loading Projects...</span>
          </div>
          <div style={{ padding: '20px', textAlign: 'center', fontSize: '12px' }}>Please wait...</div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: '#C0C0C0', minHeight: '100vh', paddingTop: '40px' }}>
      <div style={{ maxWidth: '960px', margin: '0 auto', padding: '20px 16px' }}>

        {/* Back link */}
        <Link to="/" className="win95-btn" style={{ display: 'inline-block', marginBottom: '16px', padding: '4px 12px', fontSize: '12px' }}>
          ← Back to Portfolio
        </Link>

        {/* Header */}
        <div className="win95-window" style={{ marginBottom: '16px' }}>
          <div className="win95-titlebar">
            <span>🗂️</span>
            <span>All Projects</span>
          </div>
          <div style={{ padding: '8px 14px', fontSize: '12px', color: '#000000' }}>
            Every automation project, workflow, and AI integration I&apos;ve built.
          </div>
        </div>

        {/* Filter bar */}
        {techFilters.length > 1 && (
          <div className="win95-raised" style={{ padding: '8px', marginBottom: '12px', display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
            <span style={{ fontSize: '11px', color: '#444444', alignSelf: 'center', marginRight: '4px' }}>Filter:</span>
            {techFilters.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveFilter(tag)}
                className={activeFilter === tag ? 'win95-btn-primary' : 'win95-btn'}
                style={{ fontSize: '11px', padding: '2px 10px', minWidth: 'auto' }}
              >
                {tag}
              </button>
            ))}
          </div>
        )}

        {/* Count */}
        <div className="win95-sunken" style={{ padding: '3px 8px', fontSize: '11px', marginBottom: '12px', display: 'inline-block' }}>
          {filtered.length} project{filtered.length !== 1 ? 's' : ''}
          {activeFilter !== 'All' && ` · ${activeFilter}`}
        </div>

        {/* Project list */}
        {filtered.length === 0 ? (
          <div className="win95-window" style={{ padding: '24px', textAlign: 'center', fontSize: '12px' }}>
            {projects.length === 0 ? 'No projects yet. Add them from the admin dashboard.' : 'No projects match this filter.'}
          </div>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
              gap: '8px',
            }}
          >
            {filtered.map((project) => (
              <ProjectCard key={project._id} project={project} isCoremind={!!project.company} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
