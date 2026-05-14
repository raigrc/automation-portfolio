import { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import api from '../hooks/useApi';
import { ProjectCard } from '../components/Projects';

const COREMIND_PROJECTS = [
  {
    _id: 'cm-1',
    title: 'EOD Report v2',
    description: 'End-of-day automated report generator for CoreMind Technology. Aggregates daily metrics, team updates, and KPIs into a structured report delivered via Slack and email on schedule.',
    tech: ['n8n', 'Slack API', 'OpenAI', 'MongoDB', 'Webhooks'],
    featured: true,
    company: 'Core Mind Technology',
  },
  {
    _id: 'cm-2',
    title: 'MightyWell Pipeline',
    description: 'Automated lead intake and enrichment pipeline for MightyWell. Handles inbound lead data, enriches via external APIs, and routes qualified leads into the CRM automatically.',
    tech: ['n8n', 'Make.com', 'REST APIs', 'MongoDB', 'Webhooks'],
    featured: true,
    company: 'Core Mind Technology',
  },
  {
    _id: 'cm-3',
    title: 'Auto-Posting Automation',
    description: 'Social media auto-posting workflow that schedules and publishes AI-generated content across Facebook, Instagram, and LinkedIn with performance tracking.',
    tech: ['n8n', 'Meta Graph API', 'LinkedIn API', 'Google Sheets', 'OpenAI'],
    featured: true,
    company: 'Core Mind Technology',
  },
  {
    _id: 'cm-4',
    title: 'Content Generation Pipeline',
    description: 'AI-powered content generation system that produces blog posts, social media captions, and marketing copy using large language models with brand voice consistency.',
    tech: ['n8n', 'OpenAI GPT-4', 'Claude AI', 'Google Docs API', 'Airtable'],
    featured: true,
    company: 'Core Mind Technology',
  },
  {
    _id: 'cm-5',
    title: 'Lead Enrichment Workflow',
    description: 'Automated lead enrichment pipeline that augments raw contact data with company info, social profiles, and intent signals using multiple data providers and AI scoring.',
    tech: ['n8n', 'Apollo.io', 'LinkedIn API', 'Clearbit', 'OpenAI'],
    featured: true,
    company: 'Core Mind Technology',
  },
  {
    _id: 'cm-6',
    title: 'CoreMind Actors',
    description: 'AI agent orchestration system managing specialized agents for CoreMind sales, support, and operations tasks with persistent memory and context management.',
    tech: ['n8n', 'Claude AI', 'OpenAI', 'Webhooks', 'MongoDB'],
    featured: true,
    company: 'Core Mind Technology',
  },
  {
    _id: 'cm-7',
    title: 'Leads Dashboard',
    description: 'Real-time leads management dashboard for CoreMind Technology. Visualizes pipeline stages, conversion rates, and team performance metrics with live data updates.',
    tech: ['Next.js', 'MongoDB', 'Recharts', 'Tailwind CSS', 'Node.js'],
    featured: true,
    company: 'Core Mind Technology',
    githubUrl: 'https://github.com/raigrc/coremind-leads-dashboard',
  },
];

export default function AllProjects() {
  const [apiProjects, setApiProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('All');

  useEffect(() => {
    api.get('/projects')
      .then((res) => setApiProjects(res.data))
      .catch((err) => console.error('Failed to fetch projects:', err))
      .finally(() => setLoading(false));
  }, []);

  const coremindTitles = new Set(COREMIND_PROJECTS.map((p) => p.title.toLowerCase()));
  const extraProjects = apiProjects.filter((p) => !coremindTitles.has(p.title?.toLowerCase()));
  const allProjects = [...COREMIND_PROJECTS, ...extraProjects];

  const techFilters = useMemo(() => {
    const counts = {};
    allProjects.forEach((p) => p.tech?.forEach((t) => { counts[t] = (counts[t] || 0) + 1; }));
    const repeated = Object.entries(counts)
      .filter(([, c]) => c >= 2)
      .sort((a, b) => b[1] - a[1])
      .map(([tag]) => tag);
    return ['All', ...repeated];
  }, [allProjects.length]);

  const filtered = useMemo(() => {
    if (activeFilter === 'All') return allProjects;
    return allProjects.filter((p) => p.tech?.includes(activeFilter));
  }, [allProjects.length, activeFilter]);

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
            No projects match this filter.
          </div>
        ) : (
          <div>
            {filtered.map((project) => (
              <ProjectCard key={project._id} project={project} isCoremind={!!project.company} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
