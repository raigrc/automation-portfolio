import { useState } from 'react';

const COREMIND_PROJECTS = [
  {
    _id: 'cm-1',
    title: 'EOD Report v2',
    description: 'End-of-day automated report generator for CoreMind Technology. Aggregates daily metrics, team updates, and KPIs into a structured report delivered via Slack and email on schedule.',
    tech: ['n8n', 'Slack API', 'OpenAI', 'MongoDB', 'Webhooks'],
    company: 'Core Mind Technology',
    icon: '📊',
  },
  {
    _id: 'cm-2',
    title: 'MightyWell Pipeline',
    description: 'Automated lead intake and enrichment pipeline for MightyWell. Handles inbound lead data, enriches via external APIs, and routes qualified leads into the CRM automatically.',
    tech: ['n8n', 'Make.com', 'REST APIs', 'MongoDB', 'Webhooks'],
    company: 'Core Mind Technology',
    icon: '🔄',
  },
  {
    _id: 'cm-3',
    title: 'Auto-Posting Automation',
    description: 'Social media auto-posting workflow that schedules and publishes AI-generated content across Facebook, Instagram, and LinkedIn with performance tracking.',
    tech: ['n8n', 'Meta Graph API', 'LinkedIn API', 'Google Sheets', 'OpenAI'],
    company: 'Core Mind Technology',
    icon: '📢',
  },
  {
    _id: 'cm-4',
    title: 'Content Generation Pipeline',
    description: 'AI-powered content generation system that produces blog posts, social media captions, and marketing copy using large language models with brand voice consistency.',
    tech: ['n8n', 'OpenAI GPT-4', 'Claude AI', 'Google Docs API', 'Airtable'],
    company: 'Core Mind Technology',
    icon: '✍️',
  },
  {
    _id: 'cm-5',
    title: 'Lead Enrichment Workflow',
    description: 'Automated lead enrichment pipeline that augments raw contact data with company info, social profiles, and intent signals using multiple data providers and AI scoring.',
    tech: ['n8n', 'Apollo.io', 'LinkedIn API', 'Clearbit', 'OpenAI'],
    company: 'Core Mind Technology',
    icon: '🎯',
  },
  {
    _id: 'cm-6',
    title: 'CoreMind Actors',
    description: 'AI agent orchestration system managing specialized agents for CoreMind sales, support, and operations tasks with persistent memory and context management.',
    tech: ['n8n', 'Claude AI', 'OpenAI', 'Webhooks', 'MongoDB'],
    company: 'Core Mind Technology',
    icon: '🤖',
  },
  {
    _id: 'cm-7',
    title: 'Leads Dashboard',
    description: 'Real-time leads management dashboard for CoreMind Technology. Visualizes pipeline stages, conversion rates, and team performance metrics with live data updates.',
    tech: ['Next.js', 'MongoDB', 'Recharts', 'Tailwind CSS', 'Node.js'],
    company: 'Core Mind Technology',
    icon: '📈',
    githubUrl: 'https://github.com/raigrc/coremind-leads-dashboard',
  },
];

export default function ProjectsTab({ projects, loading, isMobile }) {
  const [selectedId, setSelectedId] = useState('cm-1');

  const coremindTitles = new Set(COREMIND_PROJECTS.map((p) => p.title.toLowerCase()));
  const apiProjects = (projects ?? [])
    .filter((p) => !coremindTitles.has(p.title?.toLowerCase()))
    .slice(0, 5)
    .map((p) => ({ ...p, icon: '📂' }));

  const allProjects = [...COREMIND_PROJECTS, ...apiProjects];
  const selected = allProjects.find((p) => p._id === selectedId) ?? allProjects[0];

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
        <span style={{ color: '#444' }}>{allProjects.length} objects</span>
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

          {allProjects.map((project) => (
            <div
              key={project._id}
              className={selectedId === project._id ? 'file-row file-row-selected' : 'file-row'}
              onClick={() => setSelectedId(project._id)}
              style={{ fontSize: '11px' }}
            >
              <span>{project.icon ?? '📂'}</span>
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
                <span style={{ fontSize: '28px' }}>{selected.icon ?? '📂'}</span>
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
          {selected ? selected.title : `${allProjects.length} objects`}
        </span>
        <span className="win-statusbar-cell">
          {selected?.company ?? 'All Projects'}
        </span>
      </div>
    </div>
  );
}
