import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../hooks/useApi';

/* ─────────────────── Shared UI ─────────────────── */
function Input({ label, name, value, onChange, type = 'text', placeholder }) {
  return (
    <div>
      <label className="block text-xs text-text-muted mb-1 font-mono">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full bg-surface2 border border-border rounded-lg px-3 py-2 text-text-primary text-sm focus:outline-none focus:border-primary transition-colors"
      />
    </div>
  );
}

function Textarea({ label, name, value, onChange, rows = 3, placeholder }) {
  return (
    <div>
      <label className="block text-xs text-text-muted mb-1 font-mono">{label}</label>
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        rows={rows}
        placeholder={placeholder}
        className="w-full bg-surface2 border border-border rounded-lg px-3 py-2 text-text-primary text-sm focus:outline-none focus:border-primary transition-colors resize-y"
      />
    </div>
  );
}

function Select({ label, name, value, onChange, options }) {
  return (
    <div>
      <label className="block text-xs text-text-muted mb-1 font-mono">{label}</label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="w-full bg-surface2 border border-border rounded-lg px-3 py-2 text-text-primary text-sm focus:outline-none focus:border-primary transition-colors"
      >
        {options.map((o) => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
    </div>
  );
}

function Modal({ title, children, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="bg-surface border border-border rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h3 className="font-semibold text-text-primary">{title}</h3>
          <button onClick={onClose} className="text-text-muted hover:text-text-primary">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}

function DeleteButton({ onDelete }) {
  const [confirm, setConfirm] = useState(false);
  if (confirm) {
    return (
      <div className="flex gap-2">
        <button onClick={onDelete} className="text-xs px-2 py-1 bg-red-500/20 text-red-400 border border-red-500/30 rounded hover:bg-red-500/30">Confirm</button>
        <button onClick={() => setConfirm(false)} className="text-xs px-2 py-1 bg-surface2 text-text-muted border border-border rounded">Cancel</button>
      </div>
    );
  }
  return (
    <button onClick={() => setConfirm(true)} className="text-xs px-2 py-1 bg-surface2 text-red-400 border border-border rounded hover:border-red-500/50">Delete</button>
  );
}

/* ─────────────────── Profile Tab ─────────────────── */
function ProfileTab() {
  const [profile, setProfile] = useState({ name: '', title: '', subtitle: '', bio: '', image: '', email: '', github: '', linkedin: '', resumeUrl: '', location: '' });
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    api.get('/profile').then((r) => { if (r.data) setProfile(r.data); });
  }, []);

  const onChange = (e) => setProfile({ ...profile, [e.target.name]: e.target.value });

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMsg('');
    try {
      await api.put('/profile', profile);
      setMsg('Profile saved!');
    } catch {
      setMsg('Failed to save.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSave} className="space-y-4 max-w-2xl">
      <div className="grid grid-cols-2 gap-4">
        <Input label="Full Name" name="name" value={profile.name} onChange={onChange} />
        <Input label="Title / Role" name="title" value={profile.title} onChange={onChange} />
      </div>
      <Input label="Subtitle (hero tagline)" name="subtitle" value={profile.subtitle} onChange={onChange} />
      <Textarea label="Bio" name="bio" value={profile.bio} onChange={onChange} rows={4} />
      <div className="grid grid-cols-2 gap-4">
        <Input label="Email" name="email" type="email" value={profile.email} onChange={onChange} />
        <Input label="Location" name="location" value={profile.location} onChange={onChange} />
      </div>
      <Input label="GitHub URL" name="github" value={profile.github} onChange={onChange} placeholder="https://github.com/username" />
      <Input label="LinkedIn URL" name="linkedin" value={profile.linkedin} onChange={onChange} placeholder="https://linkedin.com/in/username" />
      <Input label="Resume URL" name="resumeUrl" value={profile.resumeUrl} onChange={onChange} placeholder="https://..." />
      <Input label="Profile Image URL" name="image" value={profile.image} onChange={onChange} placeholder="https://..." />
      {msg && <p className={`text-xs font-mono ${msg.includes('Failed') ? 'text-red-400' : 'text-green-400'}`}>{msg}</p>}
      <button type="submit" disabled={saving} className="px-6 py-2.5 bg-primary hover:bg-primary-hover text-white text-sm font-medium rounded-lg transition-colors disabled:opacity-60">
        {saving ? 'Saving...' : 'Save Profile'}
      </button>
    </form>
  );
}

/* ─────────────────── Skills Tab ─────────────────── */
const SKILL_CATEGORIES = ['Languages', 'Frameworks', 'Automation Tools', 'CI/CD', 'Databases', 'Other'];
const emptySkill = { name: '', category: 'Automation Tools', level: 80 };

function SkillsTab() {
  const [skills, setSkills] = useState([]);
  const [modal, setModal] = useState(null); // null | { mode: 'add' | 'edit', data }
  const [form, setForm] = useState(emptySkill);

  const load = useCallback(() => api.get('/skills').then((r) => setSkills(r.data)), []);
  useEffect(() => { load(); }, [load]);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const openAdd = () => { setForm(emptySkill); setModal({ mode: 'add' }); };
  const openEdit = (skill) => { setForm({ name: skill.name, category: skill.category, level: skill.level }); setModal({ mode: 'edit', id: skill._id }); };

  const handleSave = async (e) => {
    e.preventDefault();
    if (modal.mode === 'add') await api.post('/skills', form);
    else await api.put(`/skills/${modal.id}`, form);
    setModal(null);
    load();
  };

  const handleDelete = async (id) => {
    await api.delete(`/skills/${id}`);
    load();
  };

  const grouped = skills.reduce((acc, s) => { (acc[s.category] ??= []).push(s); return acc; }, {});

  return (
    <div className="space-y-6">
      <button onClick={openAdd} className="px-4 py-2 bg-primary hover:bg-primary-hover text-white text-sm font-medium rounded-lg transition-colors">
        + Add Skill
      </button>

      {Object.entries(grouped).map(([cat, items]) => (
        <div key={cat}>
          <h4 className="text-accent text-xs font-mono uppercase tracking-widest mb-3">{cat}</h4>
          <div className="grid gap-2">
            {items.map((s) => (
              <div key={s._id} className="flex items-center justify-between bg-surface border border-border rounded-lg px-4 py-2.5">
                <div className="flex items-center gap-4">
                  <span className="text-text-primary text-sm font-medium">{s.name}</span>
                  <span className="text-text-muted text-xs font-mono">{s.level}%</span>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => openEdit(s)} className="text-xs px-2 py-1 bg-primary/10 text-primary border border-primary/30 rounded hover:bg-primary/20">Edit</button>
                  <DeleteButton onDelete={() => handleDelete(s._id)} />
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {skills.length === 0 && <p className="text-text-muted text-sm font-mono">No skills yet.</p>}

      {modal && (
        <Modal title={modal.mode === 'add' ? 'Add Skill' : 'Edit Skill'} onClose={() => setModal(null)}>
          <form onSubmit={handleSave} className="space-y-4">
            <Input label="Skill Name" name="name" value={form.name} onChange={onChange} required />
            <Select label="Category" name="category" value={form.category} onChange={onChange} options={SKILL_CATEGORIES} />
            <div>
              <label className="block text-xs text-text-muted mb-1 font-mono">Level ({form.level}%)</label>
              <input type="range" name="level" min={1} max={100} value={form.level} onChange={onChange} className="w-full accent-primary" />
            </div>
            <div className="flex gap-3 pt-2">
              <button type="submit" className="px-4 py-2 bg-primary hover:bg-primary-hover text-white text-sm rounded-lg">Save</button>
              <button type="button" onClick={() => setModal(null)} className="px-4 py-2 bg-surface2 text-text-muted text-sm rounded-lg border border-border">Cancel</button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}

/* ─────────────────── Projects Tab ─────────────────── */
const emptyProject = { title: '', description: '', tech: '', githubUrl: '', liveUrl: '', image: '', featured: false };

function ProjectsTab() {
  const [projects, setProjects] = useState([]);
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState(emptyProject);

  const load = useCallback(() => api.get('/projects').then((r) => setProjects(r.data)), []);
  useEffect(() => { load(); }, [load]);

  const onChange = (e) => {
    const val = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setForm({ ...form, [e.target.name]: val });
  };

  const openAdd = () => { setForm(emptyProject); setModal({ mode: 'add' }); };
  const openEdit = (p) => {
    setForm({ ...p, tech: Array.isArray(p.tech) ? p.tech.join(', ') : p.tech });
    setModal({ mode: 'edit', id: p._id });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const payload = { ...form, tech: form.tech.split(',').map((t) => t.trim()).filter(Boolean) };
    if (modal.mode === 'add') await api.post('/projects', payload);
    else await api.put(`/projects/${modal.id}`, payload);
    setModal(null);
    load();
  };

  const handleDelete = async (id) => { await api.delete(`/projects/${id}`); load(); };

  return (
    <div className="space-y-4">
      <button onClick={openAdd} className="px-4 py-2 bg-primary hover:bg-primary-hover text-white text-sm font-medium rounded-lg transition-colors">
        + Add Project
      </button>

      <div className="grid gap-3">
        {projects.map((p) => (
          <div key={p._id} className="flex items-start justify-between bg-surface border border-border rounded-xl p-4 gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-text-primary font-medium text-sm">{p.title}</span>
                {p.featured && <span className="text-xs px-1.5 py-0.5 bg-primary/20 text-accent border border-primary/30 rounded">Featured</span>}
              </div>
              <p className="text-text-muted text-xs truncate">{p.description}</p>
              <div className="flex flex-wrap gap-1 mt-2">
                {p.tech?.slice(0, 4).map((t) => (
                  <span key={t} className="text-xs px-1.5 py-0.5 bg-surface2 text-text-muted border border-border rounded font-mono">{t}</span>
                ))}
                {p.tech?.length > 4 && <span className="text-xs text-text-muted">+{p.tech.length - 4}</span>}
              </div>
            </div>
            <div className="flex gap-2 shrink-0">
              <button onClick={() => openEdit(p)} className="text-xs px-2 py-1 bg-primary/10 text-primary border border-primary/30 rounded hover:bg-primary/20">Edit</button>
              <DeleteButton onDelete={() => handleDelete(p._id)} />
            </div>
          </div>
        ))}
      </div>

      {projects.length === 0 && <p className="text-text-muted text-sm font-mono">No projects yet.</p>}

      {modal && (
        <Modal title={modal.mode === 'add' ? 'Add Project' : 'Edit Project'} onClose={() => setModal(null)}>
          <form onSubmit={handleSave} className="space-y-4">
            <Input label="Title" name="title" value={form.title} onChange={onChange} />
            <Textarea label="Description" name="description" value={form.description} onChange={onChange} rows={3} />
            <Input label="Tech Stack (comma-separated)" name="tech" value={form.tech} onChange={onChange} placeholder="Playwright, TypeScript, GitHub Actions" />
            <Input label="GitHub URL" name="githubUrl" value={form.githubUrl} onChange={onChange} />
            <Input label="Live Demo URL" name="liveUrl" value={form.liveUrl} onChange={onChange} />
            <Input label="Image URL" name="image" value={form.image} onChange={onChange} />
            <label className="flex items-center gap-2 text-sm text-text-muted cursor-pointer">
              <input type="checkbox" name="featured" checked={form.featured} onChange={onChange} className="accent-primary" />
              Mark as Featured
            </label>
            <div className="flex gap-3 pt-2">
              <button type="submit" className="px-4 py-2 bg-primary hover:bg-primary-hover text-white text-sm rounded-lg">Save</button>
              <button type="button" onClick={() => setModal(null)} className="px-4 py-2 bg-surface2 text-text-muted text-sm rounded-lg border border-border">Cancel</button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}

/* ─────────────────── Experience Tab ─────────────────── */
const emptyExp = { company: '', role: '', type: 'Full-time', location: '', startDate: '', endDate: 'Present', current: false, bullets: '' };

function ExperienceTab() {
  const [experience, setExperience] = useState([]);
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState(emptyExp);

  const load = useCallback(() => api.get('/experience').then((r) => setExperience(r.data)), []);
  useEffect(() => { load(); }, [load]);

  const onChange = (e) => {
    const val = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setForm({ ...form, [e.target.name]: val });
  };

  const openAdd = () => { setForm(emptyExp); setModal({ mode: 'add' }); };
  const openEdit = (exp) => {
    setForm({ ...exp, bullets: Array.isArray(exp.bullets) ? exp.bullets.join('\n') : exp.bullets });
    setModal({ mode: 'edit', id: exp._id });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      bullets: form.bullets.split('\n').map((b) => b.trim()).filter(Boolean),
      endDate: form.current ? 'Present' : form.endDate,
    };
    if (modal.mode === 'add') await api.post('/experience', payload);
    else await api.put(`/experience/${modal.id}`, payload);
    setModal(null);
    load();
  };

  const handleDelete = async (id) => { await api.delete(`/experience/${id}`); load(); };

  return (
    <div className="space-y-4">
      <button onClick={openAdd} className="px-4 py-2 bg-primary hover:bg-primary-hover text-white text-sm font-medium rounded-lg transition-colors">
        + Add Experience
      </button>

      <div className="grid gap-3">
        {experience.map((exp) => (
          <div key={exp._id} className="flex items-start justify-between bg-surface border border-border rounded-xl p-4 gap-4">
            <div className="flex-1">
              <p className="text-text-primary font-medium text-sm">{exp.role}</p>
              <p className="text-accent text-xs">{exp.company}</p>
              <p className="text-text-muted text-xs font-mono">{exp.startDate} — {exp.endDate}</p>
            </div>
            <div className="flex gap-2 shrink-0">
              <button onClick={() => openEdit(exp)} className="text-xs px-2 py-1 bg-primary/10 text-primary border border-primary/30 rounded hover:bg-primary/20">Edit</button>
              <DeleteButton onDelete={() => handleDelete(exp._id)} />
            </div>
          </div>
        ))}
      </div>

      {experience.length === 0 && <p className="text-text-muted text-sm font-mono">No experience yet.</p>}

      {modal && (
        <Modal title={modal.mode === 'add' ? 'Add Experience' : 'Edit Experience'} onClose={() => setModal(null)}>
          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Input label="Company" name="company" value={form.company} onChange={onChange} />
              <Input label="Role / Title" name="role" value={form.role} onChange={onChange} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Select label="Type" name="type" value={form.type} onChange={onChange} options={['Full-time', 'Part-time', 'Contract', 'Freelance', 'Internship']} />
              <Input label="Location" name="location" value={form.location} onChange={onChange} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Input label="Start Date" name="startDate" value={form.startDate} onChange={onChange} placeholder="Jan 2023" />
              <Input label="End Date" name="endDate" value={form.current ? 'Present' : form.endDate} onChange={onChange} placeholder="Dec 2024" />
            </div>
            <label className="flex items-center gap-2 text-sm text-text-muted cursor-pointer">
              <input type="checkbox" name="current" checked={form.current} onChange={onChange} className="accent-primary" />
              Currently working here
            </label>
            <Textarea label="Bullet Points (one per line)" name="bullets" value={form.bullets} onChange={onChange} rows={5} placeholder="Designed test automation framework...&#10;Integrated CI/CD pipeline..." />
            <div className="flex gap-3 pt-2">
              <button type="submit" className="px-4 py-2 bg-primary hover:bg-primary-hover text-white text-sm rounded-lg">Save</button>
              <button type="button" onClick={() => setModal(null)} className="px-4 py-2 bg-surface2 text-text-muted text-sm rounded-lg border border-border">Cancel</button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}

/* ─────────────────── Messages Tab ─────────────────── */
function MessagesTab() {
  const [messages, setMessages] = useState([]);

  const load = useCallback(() => api.get('/messages').then((r) => setMessages(r.data)), []);
  useEffect(() => { load(); }, [load]);

  const handleDelete = async (id) => { await api.delete(`/messages/${id}`); load(); };
  const markRead = async (id) => { await api.patch(`/messages/${id}/read`); load(); };

  return (
    <div className="space-y-3">
      {messages.length === 0 && <p className="text-text-muted text-sm font-mono">No messages yet.</p>}
      {messages.map((msg) => (
        <div key={msg._id} className={`bg-surface border rounded-xl p-4 transition-colors ${msg.read ? 'border-border' : 'border-primary/40'}`}>
          <div className="flex items-start justify-between gap-4 mb-2">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-text-primary font-medium text-sm">{msg.name}</span>
                {!msg.read && <span className="w-1.5 h-1.5 rounded-full bg-primary inline-block" />}
              </div>
              <p className="text-text-muted text-xs">{msg.email}</p>
            </div>
            <div className="flex gap-2 shrink-0">
              {!msg.read && (
                <button onClick={() => markRead(msg._id)} className="text-xs px-2 py-1 bg-primary/10 text-primary border border-primary/30 rounded">Mark Read</button>
              )}
              <DeleteButton onDelete={() => handleDelete(msg._id)} />
            </div>
          </div>
          {msg.subject && <p className="text-accent text-xs font-mono mb-1">{msg.subject}</p>}
          <p className="text-text-muted text-sm leading-relaxed">{msg.message}</p>
          <p className="text-text-muted text-xs mt-2 font-mono">{new Date(msg.createdAt).toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
}

/* ─────────────────── Dashboard Shell ─────────────────── */
const TABS = [
  { id: 'profile', label: 'Profile', icon: '👤' },
  { id: 'skills', label: 'Skills', icon: '⚡' },
  { id: 'projects', label: 'Projects', icon: '🚀' },
  { id: 'experience', label: 'Experience', icon: '💼' },
  { id: 'messages', label: 'Messages', icon: '✉️' },
];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('profile');
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => { logout(); navigate('/admin/login'); };

  return (
    <div className="min-h-screen bg-bg flex flex-col">
      {/* Top bar */}
      <header className="bg-surface border-b border-border px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary/20 border border-primary/30 flex items-center justify-center">
            <span className="text-primary text-sm">⚙</span>
          </div>
          <div>
            <h1 className="text-text-primary font-semibold text-sm">Admin Dashboard</h1>
            <p className="text-text-muted text-xs font-mono">Portfolio Manager</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <a href="/" target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-accent text-sm transition-colors">
            View Site ↗
          </a>
          <button onClick={handleLogout} className="px-4 py-1.5 text-sm text-text-muted border border-border rounded-lg hover:border-red-500/50 hover:text-red-400 transition-colors">
            Logout
          </button>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-52 bg-surface border-r border-border p-4 shrink-0 hidden md:block">
          <nav className="space-y-1">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors text-left ${
                  activeTab === tab.id
                    ? 'bg-primary/20 text-accent border border-primary/30'
                    : 'text-text-muted hover:text-text-primary hover:bg-surface2'
                }`}
              >
                <span>{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </nav>
        </aside>

        {/* Mobile tab bar */}
        <div className="md:hidden flex border-b border-border bg-surface overflow-x-auto w-full">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-shrink-0 px-4 py-3 text-sm font-medium transition-colors ${
                activeTab === tab.id ? 'text-accent border-b-2 border-primary' : 'text-text-muted'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          <h2 className="text-text-primary font-semibold text-xl mb-6">
            {TABS.find((t) => t.id === activeTab)?.label}
          </h2>
          {activeTab === 'profile' && <ProfileTab />}
          {activeTab === 'skills' && <SkillsTab />}
          {activeTab === 'projects' && <ProjectsTab />}
          {activeTab === 'experience' && <ExperienceTab />}
          {activeTab === 'messages' && <MessagesTab />}
        </main>
      </div>
    </div>
  );
}
