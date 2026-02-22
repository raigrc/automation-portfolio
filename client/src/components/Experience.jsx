export default function Experience({ experience }) {
  return (
    <section id="experience" className="py-24 px-6 bg-surface/30">
      <div className="max-w-4xl mx-auto">
        {/* Section header */}
        <div className="mb-16 text-center">
          <p className="text-accent font-mono text-sm mb-2">{'// 04'}</p>
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary">Experience</h2>
          <div className="mt-4 w-16 h-0.5 bg-primary mx-auto" />
        </div>

        {experience.length === 0 ? (
          <p className="text-center text-text-muted font-mono">No experience yet — add via the admin panel.</p>
        ) : (
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-3 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-accent to-transparent" />

            <div className="space-y-10">
              {experience.map((exp, idx) => (
                <div key={exp._id} className="relative pl-10 md:pl-20">
                  {/* Timeline dot */}
                  <div className="absolute left-[7px] md:left-[27px] top-1.5 w-3 h-3 rounded-full bg-primary border-2 border-bg ring-2 ring-primary/30" />

                  {/* Card */}
                  <div className="bg-surface border border-border rounded-xl p-6 hover:border-primary/40 transition-colors duration-300">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
                      <div>
                        <h3 className="text-text-primary font-semibold text-lg">{exp.role}</h3>
                        <p className="text-accent text-sm font-medium">{exp.company}</p>
                        {exp.location && (
                          <p className="text-text-muted text-xs mt-0.5">{exp.location}</p>
                        )}
                      </div>
                      <div className="text-right shrink-0">
                        <span className="inline-block text-xs font-mono px-3 py-1 rounded-full bg-primary/10 text-primary-hover border border-primary/20">
                          {exp.startDate} — {exp.endDate}
                        </span>
                        {exp.type && (
                          <p className="text-text-muted text-xs mt-1">{exp.type}</p>
                        )}
                      </div>
                    </div>

                    {exp.bullets?.length > 0 && (
                      <ul className="space-y-2">
                        {exp.bullets.map((bullet, i) => (
                          <li key={i} className="flex gap-3 text-text-muted text-sm leading-relaxed">
                            <span className="text-primary mt-1 shrink-0">▸</span>
                            {bullet}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
