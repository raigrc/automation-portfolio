import { useState } from 'react';
import api from '../../hooks/useApi';

const LINKS = [
  { label: 'GitHub',   icon: '🐙', key: 'github' },
  { label: 'LinkedIn', icon: '💼', key: 'linkedin' },
  { label: 'Email',    icon: '✉️', key: 'email' },
];

export default function ContactTab({ profile, loading, isMobile }) {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setStatus('sending');
    try {
      await api.post('/messages', form);
      setStatus('sent');
      setForm({ name: '', email: '', message: '' });
    } catch {
      setStatus('error');
    }
  };

  const inputStyle = {
    width: '100%',
    boxSizing: 'border-box',
    border: '2px solid',
    borderColor: '#808080 #FFFFFF #FFFFFF #808080',
    background: '#FFFFFF',
    color: '#000000',
    fontFamily: 'Arial, sans-serif',
    fontSize: '11px',
    padding: '2px 4px',
    outline: 'none',
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '200px 1fr', gap: '8px', alignItems: 'start' }}>
      {/* Left: contact card */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        {/* vCard-style panel */}
        <div className="win-panel-raised" style={{ padding: '10px 10px', textAlign: 'center' }}>
          <div style={{ fontSize: '40px', marginBottom: '6px' }}>🧑‍💻</div>
          <p style={{ fontWeight: 'bold', fontSize: '12px', marginBottom: '2px' }}>
            {loading ? '…' : (profile?.name ?? 'Raven Garcia')}
          </p>
          <p style={{ fontSize: '10px', color: '#000080', marginBottom: '6px' }}>
            {loading ? '…' : (profile?.title ?? 'AI Engineer & Automation Developer')}
          </p>
          <div
            style={{
              borderTop: '1px solid #808080',
              paddingTop: '6px',
              display: 'flex',
              flexDirection: 'column',
              gap: '3px',
            }}
          >
            {LINKS.map(({ label, icon, key }) => {
              const href = key === 'email'
                ? (profile?.email ? `mailto:${profile.email}` : null)
                : profile?.[key];
              if (!href && !loading) return null;
              return (
                <a
                  key={key}
                  href={href ?? '#'}
                  target={key === 'email' ? '_self' : '_blank'}
                  rel="noopener noreferrer"
                  className="win-button-sm"
                  style={{ textAlign: 'center', display: 'block', textDecoration: 'none' }}
                >
                  {icon} {label} ↗
                </a>
              );
            })}
          </div>
        </div>

        {/* Status panel */}
        <div className="win-panel-sunken" style={{ padding: '8px 10px', fontSize: '10px' }}>
          <p style={{ fontWeight: 'bold', marginBottom: '4px', color: '#000080' }}>● Online Status</p>
          <p style={{ color: '#008000' }}>✓ Open to Work</p>
          <p style={{ color: '#444', marginTop: '2px' }}>Philippines (GMT+8)</p>
        </div>
      </div>

      {/* Right: compose message */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        {/* Header */}
        <div
          className="win-panel-raised"
          style={{ padding: '4px 8px', fontSize: '11px', fontWeight: 'bold', display: 'flex', gap: '4px', alignItems: 'center' }}
        >
          <span>✉️</span> New Message — Contact.exe
        </div>

        {/* Compose area */}
        <form onSubmit={handleSubmit}>
          <div className="win-panel-sunken" style={{ padding: '8px 10px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {/* To field */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', borderBottom: '1px solid #C0C0C0', paddingBottom: '4px' }}>
              <span style={{ fontWeight: 'bold', width: '40px', color: '#000080' }}>To:</span>
              <span style={{ color: '#444' }}>{loading ? '…' : (profile?.email ?? '')}</span>
            </div>

            {/* From / Name */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px' }}>
              <span style={{ fontWeight: 'bold', width: '40px', color: '#000080' }}>From:</span>
              <input
                type="text"
                placeholder="Your name"
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                style={inputStyle}
                required
              />
            </div>

            {/* Email */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px' }}>
              <span style={{ fontWeight: 'bold', width: '40px', color: '#000080' }}>Email:</span>
              <input
                type="email"
                placeholder="your@email.com"
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                style={inputStyle}
                required
              />
            </div>

            {/* Separator */}
            <div style={{ borderTop: '1px solid #808080', margin: '2px 0' }} />

            {/* Message body */}
            <textarea
              placeholder="Type your message here…"
              value={form.message}
              onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
              rows={6}
              style={{ ...inputStyle, resize: 'vertical', fontFamily: '"Courier New", monospace', lineHeight: 1.5 }}
              required
            />

            {/* Action row */}
            <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
              <button
                type="submit"
                className="win-button"
                disabled={status === 'sending'}
                style={{ fontWeight: 'bold' }}
              >
                {status === 'sending' ? 'Sending…' : '📤 Send'}
              </button>
              <button
                type="button"
                className="win-button"
                onClick={() => { setForm({ name: '', email: '', message: '' }); setStatus('idle'); }}
              >
                Clear
              </button>
              {status === 'sent' && (
                <span style={{ fontSize: '11px', color: '#008000' }}>✓ Message sent!</span>
              )}
              {status === 'error' && (
                <span style={{ fontSize: '11px', color: '#FF0000' }}>✗ Failed to send. Try again.</span>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
