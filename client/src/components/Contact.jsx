import { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import api from '../hooks/useApi';

const RESUME_URL = 'https://drive.google.com/file/d/1kM9dhIbwR8kF3sz4s9x-oVmuUR8ouNTR/view?usp=sharing';

export default function Contact({ profile }) {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState(null); // 'sending' | 'success' | 'error'

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    try {
      await api.post('/messages', form);
      setStatus('success');
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="mb-16 text-center">
          <p className="text-accent font-mono text-sm mb-2">{'// 05'}</p>
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary">Get In Touch</h2>
          <div className="mt-4 w-16 h-0.5 bg-primary mx-auto" />
          <p className="text-text-muted mt-4 text-sm max-w-lg mx-auto">
            Have a project in mind or want to discuss automation opportunities? Let&apos;s talk.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact info */}
          <div className="space-y-8">
            <div>
              <h3 className="text-text-primary font-semibold text-xl mb-4">Let&apos;s Connect</h3>
              <p className="text-text-muted text-sm leading-relaxed">
                I&apos;m always open to new opportunities, collaborations, or just a friendly chat about automation and testing. Feel free to reach out!
              </p>
            </div>

            <div className="space-y-4">
              {profile?.email && (
                <a
                  href={`mailto:${profile.email}`}
                  className="flex items-center gap-4 p-4 bg-surface border border-border rounded-xl hover:border-primary/50 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:bg-primary/20 transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-text-muted">Email</p>
                    <p className="text-text-primary text-sm font-medium">{profile.email}</p>
                  </div>
                </a>
              )}

              {profile?.github && (
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 bg-surface border border-border rounded-xl hover:border-primary/50 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:bg-primary/20 transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-text-muted">GitHub</p>
                    <p className="text-text-primary text-sm font-medium">View my code</p>
                  </div>
                </a>
              )}

              {profile?.linkedin && (
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 bg-surface border border-border rounded-xl hover:border-primary/50 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:bg-primary/20 transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-text-muted">LinkedIn</p>
                    <p className="text-text-primary text-sm font-medium">Connect with me</p>
                  </div>
                </a>
              )}
            </div>

            {/* Resume QR Code */}
            <div className="p-5 bg-surface border border-border rounded-xl flex flex-col sm:flex-row items-center gap-5">
              <a
                href={RESUME_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 p-2 bg-white rounded-lg hover:opacity-80 transition-opacity"
                title="Scan to view resume"
              >
                <QRCodeSVG
                  value={RESUME_URL}
                  size={96}
                  bgColor="#ffffff"
                  fgColor="#7C3AED"
                  level="M"
                />
              </a>
              <div className="text-center sm:text-left">
                <p className="text-text-primary text-sm font-semibold mb-1">Scan for Resume</p>
                <p className="text-text-muted text-xs leading-relaxed">
                  Point your camera at the QR code to view or download my latest resume on Google Drive.
                </p>
              </div>
            </div>
          </div>

          {/* Contact form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-text-muted mb-1.5 font-mono">Name *</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  placeholder="John Doe"
                  className="w-full bg-surface border border-border rounded-lg px-4 py-2.5 text-text-primary text-sm placeholder:text-text-muted/50 focus:outline-none focus:border-primary transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs text-text-muted mb-1.5 font-mono">Email *</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  placeholder="john@example.com"
                  className="w-full bg-surface border border-border rounded-lg px-4 py-2.5 text-text-primary text-sm placeholder:text-text-muted/50 focus:outline-none focus:border-primary transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs text-text-muted mb-1.5 font-mono">Subject</label>
              <input
                type="text"
                name="subject"
                value={form.subject}
                onChange={handleChange}
                placeholder="Job Opportunity / Collaboration"
                className="w-full bg-surface border border-border rounded-lg px-4 py-2.5 text-text-primary text-sm placeholder:text-text-muted/50 focus:outline-none focus:border-primary transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs text-text-muted mb-1.5 font-mono">Message *</label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                rows={5}
                placeholder="Tell me about your project or opportunity..."
                className="w-full bg-surface border border-border rounded-lg px-4 py-2.5 text-text-primary text-sm placeholder:text-text-muted/50 focus:outline-none focus:border-primary transition-colors resize-none"
              />
            </div>

            {status === 'success' && (
              <p className="text-green-400 text-sm font-mono bg-green-400/10 px-4 py-2 rounded-lg border border-green-400/20">
                ✓ Message sent! I&apos;ll get back to you soon.
              </p>
            )}
            {status === 'error' && (
              <p className="text-red-400 text-sm font-mono bg-red-400/10 px-4 py-2 rounded-lg border border-red-400/20">
                ✗ Failed to send. Please try again or email directly.
              </p>
            )}

            <button
              type="submit"
              disabled={status === 'sending'}
              className="w-full py-3 bg-primary hover:bg-primary-hover text-white font-semibold rounded-lg transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed hover:glow-purple-sm"
            >
              {status === 'sending' ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
