export default function About({ profile }) {
  return (
    <section id="about" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="mb-16 text-center">
          <p className="text-accent font-mono text-sm mb-2">{'// 01'}</p>
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary">About Me</h2>
          <div className="mt-4 w-16 h-0.5 bg-primary mx-auto" />
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <div className="space-y-5">
            <p className="text-text-muted leading-relaxed text-base">
              {profile?.bio ??
                "I'm a passionate QA Automation Engineer dedicated to building reliable, scalable test frameworks that accelerate software delivery. I bridge the gap between development and quality assurance."}
            </p>

            <div className="grid grid-cols-2 gap-4 pt-4">
              {[
                { label: 'Location', value: profile?.location ?? 'Philippines' },
                { label: 'Status', value: 'Open to Work ✓' },
                { label: 'Degree', value: 'BS Information Technology' },
                { label: 'Email', value: profile?.email ?? 'your@email.com' },
              ].map(({ label, value }) => (
                <div key={label} className="space-y-1">
                  <p className="text-accent text-xs font-mono uppercase tracking-wider">{label}</p>
                  <p className="text-text-primary text-sm font-medium break-words">{value}</p>
                </div>
              ))}
            </div>

            <div className="flex gap-4 pt-2">
              {profile?.github && (
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-text-muted hover:text-accent text-sm transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                  </svg>
                  GitHub
                </a>
              )}
              {profile?.linkedin && (
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-text-muted hover:text-accent text-sm transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                  LinkedIn
                </a>
              )}
            </div>
          </div>

          {/* Profile image / placeholder */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="w-64 h-64 md:w-80 md:h-80 rounded-2xl border-gradient overflow-hidden">
                {profile?.image ? (
                  <img src={profile.image} alt={profile.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-surface2 flex flex-col items-center justify-center gap-3">
                    <svg className="w-24 h-24 text-border" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
                    </svg>
                    <p className="text-text-muted text-xs font-mono">Add photo via admin</p>
                  </div>
                )}
              </div>
              {/* Decorative corner */}
              <div className="absolute -bottom-3 -right-3 w-full h-full border-2 border-primary/40 rounded-2xl -z-10" />
              <div className="absolute -top-2 -left-2 w-6 h-6 bg-primary rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
