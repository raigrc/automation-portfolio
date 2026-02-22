export default function Footer({ profile }) {
  return (
    <footer className="border-t border-border bg-surface py-8 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-text-muted text-sm font-mono">
          &copy; {new Date().getFullYear()} <span className="text-accent">{profile?.name ?? 'Portfolio'}</span>. Built with React + MongoDB.
        </p>
        <div className="flex items-center gap-6">
          {profile?.github && (
            <a href={profile.github} target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-accent text-sm transition-colors">
              GitHub
            </a>
          )}
          {profile?.linkedin && (
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-accent text-sm transition-colors">
              LinkedIn
            </a>
          )}
          {profile?.email && (
            <a href={`mailto:${profile.email}`} className="text-text-muted hover:text-accent text-sm transition-colors">
              Email
            </a>
          )}
        </div>
      </div>
    </footer>
  );
}
