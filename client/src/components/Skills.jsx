const categoryColors = {
  Languages: 'border-blue-500/50 text-blue-400',
  Frameworks: 'border-green-500/50 text-green-400',
  'Automation Tools': 'border-purple-500/50 text-purple-400',
  'CI/CD': 'border-orange-500/50 text-orange-400',
  Databases: 'border-yellow-500/50 text-yellow-400',
  Other: 'border-pink-500/50 text-pink-400',
};

const categoryBg = {
  Languages: 'bg-blue-500/10',
  Frameworks: 'bg-green-500/10',
  'Automation Tools': 'bg-purple-500/10',
  'CI/CD': 'bg-orange-500/10',
  Databases: 'bg-yellow-500/10',
  Other: 'bg-pink-500/10',
};

export default function Skills({ skills }) {
  // Group by category
  const grouped = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill);
    return acc;
  }, {});

  const categories = Object.keys(grouped);

  return (
    <section id="skills" className="py-24 px-6 bg-surface/30">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="mb-16 text-center">
          <p className="text-accent font-mono text-sm mb-2">{'// 02'}</p>
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary">Technical Skills</h2>
          <div className="mt-4 w-16 h-0.5 bg-primary mx-auto" />
          <p className="text-text-muted mt-4 text-sm max-w-lg mx-auto">
            My toolkit for building robust, scalable automation solutions
          </p>
        </div>

        {categories.length === 0 ? (
          <p className="text-center text-text-muted font-mono">No skills yet — add them via the admin panel.</p>
        ) : (
          <div className="space-y-10">
            {categories.map((category) => (
              <div key={category}>
                <h3 className={`text-sm font-mono font-semibold uppercase tracking-widest mb-4 ${categoryColors[category] ?? 'text-accent'}`}>
                  {category}
                </h3>
                <div className="flex flex-wrap gap-3">
                  {grouped[category].map((skill) => (
                    <div
                      key={skill._id}
                      className={`group relative px-4 py-2 rounded-lg border text-sm font-medium cursor-default
                        transition-all duration-200 hover:scale-105
                        ${categoryColors[category] ?? 'border-border text-text-muted'}
                        ${categoryBg[category] ?? 'bg-surface'}
                      `}
                    >
                      {skill.name}
                      {/* Skill level tooltip */}
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-surface2 border border-border rounded text-xs text-text-muted whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                        {skill.level}%
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
