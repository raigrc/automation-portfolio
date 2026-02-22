import { Link } from 'react-router-dom';

export function ProjectCard({ project }) {
  // First 5 tags as tech pills, rest grouped into pairs for the feature row
  const pillTags = project.tech?.slice(0, 5) ?? [];
  const featureTagsRaw = project.tech?.slice(5) ?? [];
  const featurePairs = [];
  for (let i = 0; i < featureTagsRaw.length; i += 2) {
    featurePairs.push([featureTagsRaw[i], featureTagsRaw[i + 1]]);
  }

  return (
    <div className="group relative flex bg-[#161616] border border-[#222222] rounded-xl overflow-hidden transition-all duration-300 hover:border-primary/40 hover:-translate-y-0.5">
      {/* Purple left accent bar */}
      <div className="w-[5px] bg-primary flex-shrink-0" />

      {/* Content */}
      <div className="flex-1 px-8 py-6 min-w-0">
        {/* Featured badge — top right */}
        {project.featured && (
          <span className="absolute top-5 right-5 text-xs px-3 py-1 rounded-md border border-primary/60 text-primary bg-primary/10 font-mono tracking-wide">
            Featured
          </span>
        )}

        {/* Title */}
        <h3 className="text-[#f0f0f0] text-xl font-normal tracking-wide mb-3 pr-28 leading-snug">
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-[#888888] text-sm leading-relaxed tracking-wide mb-5">
          {project.description}
        </p>

        {/* Tech pills */}
        {pillTags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-5">
            {pillTags.map((t) => (
              <span
                key={t}
                className="text-xs px-3 py-1.5 rounded-lg bg-[#0d0d0d] border border-[#222222] text-[#888888]"
              >
                {t}
              </span>
            ))}
          </div>
        )}

        {/* Divider */}
        <div className="border-t border-[#222222] mb-4" />

        {/* Bottom row: feature pairs left, links right */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-wrap gap-6">
            {featurePairs.map(([label, sub], i) => (
              <div key={i} className="flex flex-col">
                <span className="text-primary text-sm font-medium tracking-wide">{label}</span>
                {sub && (
                  <span className="text-[#555555] text-xs tracking-wide mt-0.5">{sub}</span>
                )}
              </div>
            ))}
          </div>

          {(project.githubUrl || project.liveUrl) && (
            <div className="flex gap-4 flex-shrink-0">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-[#888888] hover:text-accent text-xs transition-colors"
                >
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                  </svg>
                  Code
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-[#888888] hover:text-accent text-xs transition-colors"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  Live Demo
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Projects({ projects, showFade = false }) {
  return (
    <section id="projects" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="mb-16 text-center">
          <p className="text-accent font-mono text-sm mb-2">{'// 03'}</p>
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary">Projects</h2>
          <div className="mt-4 w-16 h-0.5 bg-primary mx-auto" />
          <p className="text-text-muted mt-4 text-sm max-w-lg mx-auto">
            A selection of automation projects I&apos;ve built and contributed to
          </p>
        </div>

        {projects.length === 0 ? (
          <p className="text-center text-text-muted font-mono">No projects yet — add them via the admin panel.</p>
        ) : (
          <>
            <div className="relative">
              <div className="flex flex-col gap-4">
                {projects.map((project) => (
                  <ProjectCard key={project._id} project={project} />
                ))}
              </div>
              {showFade && (
                <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-bg via-bg/80 to-transparent pointer-events-none" />
              )}
            </div>
            <div className="mt-12 text-center">
              <Link
                to="/projects"
                className="inline-flex items-center gap-2 px-6 py-3 border border-primary/40 rounded-lg text-accent font-mono text-sm hover:bg-primary/10 hover:border-primary transition-all duration-200"
              >
                View All Projects
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
