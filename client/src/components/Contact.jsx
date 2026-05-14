import { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import api from '../hooks/useApi';

const RESUME_URL = 'https://drive.google.com/file/d/1bAv4ITgZsKAireaXWUddg9Uf6DBQXf5H/view?usp=sharing';

export default function Contact({ profile }) {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState(null);

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
    <section id="contact" style={{ padding: '40px 16px', background: '#C0C0C0' }}>
      <div style={{ maxWidth: '960px', margin: '0 auto' }}>
        <div className="win95-window">
          <div className="win95-titlebar">
            <span>✉️</span>
            <span>Get In Touch</span>
          </div>

          <div style={{ padding: '16px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            {/* Contact info */}
            <div>
              <p style={{ fontSize: '13px', fontWeight: 'bold', marginBottom: '8px', color: '#000000' }}>
                Let&apos;s Connect
              </p>
              <p style={{ fontSize: '12px', color: '#444444', lineHeight: 1.6, marginBottom: '12px' }}>
                Open to new opportunities, collaborations, or a friendly chat about automation and AI workflows.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '16px' }}>
                {profile?.email && (
                  <a
                    href={`mailto:${profile.email}`}
                    className="win95-raised"
                    style={{ padding: '6px 10px', display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none', color: '#000000', fontSize: '12px' }}
                  >
                    <span>✉️</span>
                    <div>
                      <div style={{ fontSize: '10px', color: '#444444' }}>Email</div>
                      <div>{profile.email}</div>
                    </div>
                  </a>
                )}
                {profile?.github && (
                  <a
                    href={profile.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="win95-raised"
                    style={{ padding: '6px 10px', display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none', color: '#000000', fontSize: '12px' }}
                  >
                    <span>💻</span>
                    <div>
                      <div style={{ fontSize: '10px', color: '#444444' }}>GitHub</div>
                      <div>View my code</div>
                    </div>
                  </a>
                )}
                {profile?.linkedin && (
                  <a
                    href={profile.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="win95-raised"
                    style={{ padding: '6px 10px', display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none', color: '#000000', fontSize: '12px' }}
                  >
                    <span>🔗</span>
                    <div>
                      <div style={{ fontSize: '10px', color: '#444444' }}>LinkedIn</div>
                      <div>Connect with me</div>
                    </div>
                  </a>
                )}
              </div>

              {/* Resume QR */}
              <div className="win95-raised" style={{ padding: '10px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                <a href={RESUME_URL} target="_blank" rel="noopener noreferrer" className="win95-sunken" style={{ padding: '4px', display: 'inline-block' }}>
                  <QRCodeSVG value={RESUME_URL} size={80} bgColor="#ffffff" fgColor="#000080" level="M" />
                </a>
                <div>
                  <p style={{ fontSize: '12px', fontWeight: 'bold', marginBottom: '4px' }}>Scan for Resume</p>
                  <p style={{ fontSize: '11px', color: '#444444', lineHeight: 1.4 }}>
                    View or download my latest resume on Google Drive.
                  </p>
                </div>
              </div>
            </div>

            {/* Contact form */}
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                <div>
                  <label style={{ fontSize: '11px', display: 'block', marginBottom: '3px' }}>Name *</label>
                  <input type="text" name="name" value={form.name} onChange={handleChange} required placeholder="John Doe" className="win95-input" />
                </div>
                <div>
                  <label style={{ fontSize: '11px', display: 'block', marginBottom: '3px' }}>Email *</label>
                  <input type="email" name="email" value={form.email} onChange={handleChange} required placeholder="john@example.com" className="win95-input" />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '11px', display: 'block', marginBottom: '3px' }}>Subject</label>
                <input type="text" name="subject" value={form.subject} onChange={handleChange} placeholder="Job Opportunity / Collaboration" className="win95-input" />
              </div>

              <div>
                <label style={{ fontSize: '11px', display: 'block', marginBottom: '3px' }}>Message *</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  placeholder="Tell me about your project..."
                  className="win95-input"
                  style={{ resize: 'none' }}
                />
              </div>

              {status === 'success' && (
                <div className="win95-raised" style={{ padding: '6px 10px', fontSize: '12px', color: '#000080' }}>
                  ✓ Message sent! I&apos;ll get back to you soon.
                </div>
              )}
              {status === 'error' && (
                <div className="win95-raised" style={{ padding: '6px 10px', fontSize: '12px', color: '#800000' }}>
                  ✗ Failed to send. Please try again or email directly.
                </div>
              )}

              <button type="submit" disabled={status === 'sending'} className="win95-btn-primary" style={{ width: '100%', padding: '7px' }}>
                {status === 'sending' ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
