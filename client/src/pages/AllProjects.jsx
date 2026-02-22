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

  // Only show tags that appear in 2+ projects as filters (avoids clutter)
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
      <div className="flex items-center justify-center min-h-screen bg-bg">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-text-muted font-mono text-sm">Loading projects...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-bg min-h-screen">
      <div className="max-w-6xl mx-auto px-6 py-20">

        {/* Back link */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-text-muted hover:text-accent font-mono text-sm transition-colors mb-12"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
          </svg>
          Back to Portfolio
        </Link>

        {/* Header */}
        <div className="mb-12">
          <p className="text-accent font-mono text-sm mb-2">{'// all work'}</p>
          <h1 className="text-4xl md:text-5xl font-bold text-text-primary">All Projects</h1>
          <div className="mt-4 w-16 h-0.5 bg-primary" />
          <p className="text-text-muted mt-4 text-sm max-w-lg">
            Every automation project, workflow, and AI integration I&apos;ve built.
          </p>
        </div>

        {/* Filter bar */}
        {techFilters.length > 1 && (
          <div className="flex flex-wrap gap-2 mb-10">
            {techFilters.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveFilter(tag)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all duration-200 border ${
                  activeFilter === tag
                    ? 'bg-primary/20 border-primary/60 text-accent'
                    : 'bg-surface border-border text-text-muted hover:border-primary/40 hover:text-accent'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        )}

        {/* Count */}
        <p className="text-text-muted font-mono text-xs mb-6">
          {filtered.length} project{filtered.length !== 1 ? 's' : ''}
          {activeFilter !== 'All' && <span className="text-accent"> · {activeFilter}</span>}
        </p>

        {/* Grid */}
        {filtered.length === 0 ? (
          <p className="text-center text-text-muted font-mono py-24">
            No projects match this filter.
          </p>
        ) : (
          <div className="flex flex-col gap-4">
            {filtered.map((project) => (
              <ProjectCard key={project._id} project={project} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
