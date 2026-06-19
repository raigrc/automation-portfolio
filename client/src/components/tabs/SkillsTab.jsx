import { useState } from 'react';

const CATEGORY_ICONS = {
  Languages:         '📝',
  Frameworks:        '🔧',
  'Automation Tools':'⚙️',
  'Scraping & Data': '🕷️',
  'AI Models':       '🤖',
  'DevOps & CI/CD':  '🔄',
  Databases:         '🗄️',
  'Cloud Storage':   '☁️',
};

export default function SkillsTab({ skills, loading, isMobile }) {
  const grouped = (skills ?? []).reduce((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill);
    return acc;
  }, {});

  const categories = Object.keys(grouped);
  const [expanded, setExpanded] = useState(new Set(categories));
  const [selected, setSelected] = useState(null);

  const toggle = (cat) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      next.has(cat) ? next.delete(cat) : next.add(cat);
      return next;
    });
  };

  if (loading) {
    return <div style={{ padding: '20px', fontSize: '12px', color: '#444' }}>Loading control panel…</div>;
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '240px 1fr', gap: '8px', alignItems: 'start' }}>
      {/* Left: Device Manager tree */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <div
          className="win-panel-raised"
          style={{ padding: '4px 8px', fontSize: '11px', fontWeight: 'bold', display: 'flex', gap: '4px', alignItems: 'center' }}
        >
          <span>⚙️</span> Control Panel
        </div>
        <div className="win-panel-sunken" style={{ padding: '4px', maxHeight: isMobile ? '200px' : '360px', overflow: 'auto' }}>
          {categories.map((cat) => (
            <div key={cat}>
              <div
                className="tree-item"
                onClick={() => toggle(cat)}
                style={{ fontWeight: 'bold' }}
              >
                <span style={{ fontSize: '9px', fontFamily: 'monospace', color: '#808080', width: '10px' }}>
                  {expanded.has(cat) ? '▼' : '▶'}
                </span>
                <span>{CATEGORY_ICONS[cat] ?? '📦'}</span>
                <span style={{ fontSize: '12px' }}>{cat}</span>
                <span style={{ fontSize: '10px', color: '#808080', marginLeft: 'auto' }}>
                  ({grouped[cat].length})
                </span>
              </div>

              {expanded.has(cat) && (
                <div style={{ paddingLeft: '18px' }}>
                  {grouped[cat].map((skill) => (
                    <div
                      key={skill._id}
                      className="tree-item"
                      onClick={() => setSelected(selected?._id === skill._id ? null : skill)}
                      style={{
                        background: selected?._id === skill._id ? '#000080' : 'transparent',
                        color: selected?._id === skill._id ? '#FFFFFF' : '#000000',
                        padding: '1px 6px',
                      }}
                    >
                      <span style={{ fontSize: '11px', color: selected?._id === skill._id ? '#90FF90' : '#008000' }}>✓</span>
                      <span style={{ fontSize: '11px' }}>{skill.name}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Right: detail + summary */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {/* Selected skill info */}
        {selected ? (
          <div className="win-panel-raised" style={{ padding: '10px 12px' }}>
            <p style={{ fontWeight: 'bold', fontSize: '12px', marginBottom: '6px', borderBottom: '1px solid #808080', paddingBottom: '4px' }}>
              Properties — {selected.name}
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '80px 1fr', rowGap: '4px', fontSize: '11px' }}>
              <span style={{ color: '#000080', fontWeight: 'bold' }}>Name:</span>
              <span>{selected.name}</span>
              <span style={{ color: '#000080', fontWeight: 'bold' }}>Category:</span>
              <span>{selected.category}</span>
              <span style={{ color: '#000080', fontWeight: 'bold' }}>Proficiency:</span>
              <span>
                <div className="win-panel-sunken" style={{ height: '10px', position: 'relative', display: 'inline-block', width: '100%', padding: 0 }}>
                  <div
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      height: '100%',
                      width: `${selected.level ?? 80}%`,
                      background: '#000080',
                    }}
                  />
                </div>
                <span style={{ fontSize: '10px', color: '#444' }}> {selected.level ?? 80}%</span>
              </span>
              <span style={{ color: '#000080', fontWeight: 'bold' }}>Status:</span>
              <span style={{ color: '#008000' }}>✓ Enabled</span>
            </div>
          </div>
        ) : (
          <div className="win-panel-raised" style={{ padding: '10px 12px' }}>
            <p style={{ fontSize: '11px', color: '#444' }}>
              Select a skill from the tree to view its properties.
            </p>
          </div>
        )}

        {/* Category summary bars */}
        <div className="win-panel-sunken" style={{ padding: '10px' }}>
          <p style={{ fontSize: '11px', fontWeight: 'bold', marginBottom: '8px' }}>
            Skills Summary — {skills.length} total
          </p>
          {categories.map((cat) => (
            <div key={cat} style={{ marginBottom: '7px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', marginBottom: '2px' }}>
                <span>{CATEGORY_ICONS[cat]} {cat}</span>
                <span style={{ color: '#444' }}>{grouped[cat].length} items</span>
              </div>
              <div
                className="win-panel-sunken"
                style={{ height: '8px', position: 'relative', padding: 0, background: '#FFFFFF' }}
              >
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    height: '100%',
                    width: `${Math.min(100, (grouped[cat].length / 12) * 100)}%`,
                    background: '#000080',
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
