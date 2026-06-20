/**
 * scan.mjs — read the LIVE portfolio from the public API and write a git-tracked
 * snapshot to data/portfolio-snapshot.{json,md}. READ-ONLY. No credentials needed.
 *
 *   node scan.mjs                 → snapshot the production API
 *   API_BASE=http://localhost:5010/api node scan.mjs   → snapshot a local server
 *
 * The live MongoDB is the single source of truth; this just mirrors it into files
 * you (and future Claude sessions) can read without DB access. See OPERATIONS.md.
 */
import { writeFile, mkdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const API = (process.env.API_BASE || "https://automation-portfolio-vrdyzcnn7q-uc.a.run.app/api").replace(/\/$/, "");
const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA = join(__dirname, "..", "data");

const get = async (p) => {
  const r = await fetch(`${API}${p}`);
  if (!r.ok) throw new Error(`GET ${p} -> HTTP ${r.status}`);
  return r.json();
};

const esc = (s) => (s == null ? "" : String(s));

function toMarkdown({ generatedAt, source, profile, skills, projects, experience }) {
  const L = [];
  L.push(`# Portfolio — Live Snapshot`);
  L.push("");
  L.push(`_Generated ${generatedAt} from \`${source}\`._`);
  L.push(`_Read-only mirror of the live database. **Do not hand-edit** — change the live data with \`apply-changes.js\`, then re-run \`scan.mjs\`. See OPERATIONS.md._`);
  L.push("");

  // Profile
  L.push(`## Profile`);
  if (profile) {
    L.push(`- **Name:** ${esc(profile.name)}`);
    L.push(`- **Title:** ${esc(profile.title)}`);
    L.push(`- **Subtitle:** ${esc(profile.subtitle)}`);
    L.push(`- **Stack:** ${esc(profile.stack)}`);
    L.push(`- **Location:** ${esc(profile.location)}`);
    L.push(`- **Email:** ${esc(profile.email)}`);
    L.push(`- **LinkedIn:** ${esc(profile.linkedin)}`);
    if (profile.github) L.push(`- **GitHub:** ${esc(profile.github)}`);
    L.push(`- **Résumé:** ${esc(profile.resumeUrl)}`);
    L.push(`- **Image:** ${esc(profile.image)}`);
    L.push("");
    L.push(`> ${esc(profile.bio)}`);
  } else {
    L.push(`_(no profile document)_`);
  }
  L.push("");

  // Skills grouped by category
  L.push(`## Skills (${skills.length})`);
  const byCat = {};
  for (const s of skills) (byCat[s.category] ||= []).push(s);
  for (const cat of Object.keys(byCat).sort()) {
    const items = byCat[cat].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
    L.push(`### ${cat} (${items.length})`);
    for (const s of items) L.push(`- ${esc(s.name)} — ${s.level ?? 80}%`);
    L.push("");
  }

  // Experience
  L.push(`## Experience (${experience.length})`);
  for (const e of [...experience].sort((a, b) => (a.order ?? 0) - (b.order ?? 0))) {
    L.push(`### ${esc(e.role)} — ${esc(e.company)}`);
    L.push(`_${esc(e.startDate)} – ${esc(e.endDate)} · ${esc(e.type)} · ${esc(e.location)}${e.current ? " · current" : ""}_`);
    for (const b of e.bullets || []) L.push(`- ${esc(b)}`);
    L.push("");
  }

  // Projects
  L.push(`## Projects (${projects.length})`);
  for (const p of [...projects].sort((a, b) => (a.order ?? 0) - (b.order ?? 0))) {
    L.push(`### ${esc(p.icon)} ${esc(p.title)}${p.company ? ` — ${esc(p.company)}` : ""}`);
    L.push(esc(p.description));
    if (p.tech?.length) L.push("`" + p.tech.join("` `") + "`");
    if (p.githubUrl) L.push(`- Code: ${esc(p.githubUrl)}`);
    if (p.liveUrl) L.push(`- Live: ${esc(p.liveUrl)}`);
    L.push("");
  }

  return L.join("\n");
}

async function main() {
  const [profile, skills, projects, experience] = await Promise.all([
    get("/profile"), get("/skills"), get("/projects"), get("/experience"),
  ]);

  await mkdir(DATA, { recursive: true });
  const generatedAt = new Date().toISOString();
  const snapshot = { generatedAt, source: API, profile, skills, projects, experience };

  await writeFile(join(DATA, "portfolio-snapshot.json"), JSON.stringify(snapshot, null, 2) + "\n");
  await writeFile(join(DATA, "portfolio-snapshot.md"), toMarkdown(snapshot) + "\n");

  console.log(`Snapshot written from ${API} @ ${generatedAt}`);
  console.log(`  profile: ${profile ? 1 : 0} | skills: ${skills.length} | projects: ${projects.length} | experience: ${experience.length}`);
  console.log(`  -> data/portfolio-snapshot.json`);
  console.log(`  -> data/portfolio-snapshot.md`);
}

main().catch((e) => { console.error("scan failed:", e.message); process.exit(1); });
