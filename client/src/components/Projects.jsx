import { Link } from 'react-router-dom';

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

export function ProjectCard({ project, isCoremind }) {
  return (
    <div
      className="win95-window"
      style={{ marginBottom: '0', display: 'flex', flexDirection: 'column' }}
    >
      {/* Title bar */}
      <div className={`win95-titlebar${isCoremind ? '' : ' win95-titlebar-inactive'}`}>
        <span>📁</span>
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

export default function Projects({ projects, showFade = false }) {
  const coremindTitles = new Set(COREMIND_PROJECTS.map((p) => p.title.toLowerCase()));
  const apiProjects = (projects ?? [])
    .filter((p) => !coremindTitles.has(p.title?.toLowerCase()))
    .slice(0, 5);

  return (
    <section id="projects" style={{ padding: '40px 16px', background: '#C0C0C0' }}>
      <div style={{ maxWidth: '960px', margin: '0 auto' }}>
        {/* Section header window */}
        <div className="win95-window" style={{ marginBottom: '12px' }}>
          <div className="win95-titlebar">
            <span>🗂️</span>
            <span>Projects — Core Mind Technology</span>
          </div>
          <div style={{ padding: '6px 14px', fontSize: '12px', color: '#000000' }}>
            Automation workflows, AI pipelines, and tools built for CoreMind Technology clients.
          </div>
        </div>

        {/* CoreMind projects — 2-column grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
            gap: '8px',
          }}
        >
          {COREMIND_PROJECTS.map((project) => (
            <ProjectCard key={project._id} project={project} isCoremind />
          ))}
        </div>

        {/* API projects from admin (if any) */}
        {apiProjects.length > 0 && (
          <div style={{ marginTop: '16px' }}>
            <div className="win95-window" style={{ marginBottom: '8px' }}>
              <div className="win95-titlebar win95-titlebar-inactive">
                <span>📁</span>
                <span>Other Projects</span>
              </div>
            </div>
            <div style={{ position: 'relative' }}>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
                  gap: '8px',
                }}
              >
                {apiProjects.map((project) => (
                  <ProjectCard key={project._id} project={project} />
                ))}
              </div>
              {showFade && (
                <div
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '48px',
                    background: 'linear-gradient(to top, #C0C0C0, transparent)',
                    pointerEvents: 'none',
                  }}
                />
              )}
            </div>
          </div>
        )}

        {/* View all link */}
        <div style={{ marginTop: '16px', textAlign: 'center' }}>
          <Link
            to="/projects"
            className="win95-btn"
            style={{ display: 'inline-block', padding: '6px 20px', fontSize: '12px' }}
          >
            View All Projects →
          </Link>
        </div>
      </div>
    </section>
  );
}
