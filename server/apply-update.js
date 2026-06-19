/**
 * Non-destructive portfolio update — fills the gaps between the live DB and the
 * Job Hunting Assistant profile data WITHOUT deleting or overwriting curated content.
 *
 *   node apply-update.js          → DRY RUN (prints what would change, writes nothing)
 *   node apply-update.js --commit → applies the changes
 *
 * Safe to run repeatedly (idempotent):
 *   - Projects: sets company/icon ONLY when those fields are currently empty; never
 *     touches your descriptions, tech, or order. Inserts the Zinho project only if absent.
 *   - Skills: inserts the new skills only if a skill of that name doesn't already exist.
 *   - Profile: updates resumeUrl / location / stack / bio (before→after shown).
 *   - Experience: appends the two Core Mind bullets only if not already present.
 */
require("dotenv").config({ path: "../.env" });
const mongoose = require("mongoose");

const Profile = require("./models/Profile");
const Skill = require("./models/Skill");
const Experience = require("./models/Experience");
const Project = require("./models/Project");

const COMMIT = process.argv.includes("--commit");

// --- Project enrichment, keyed by EXACT live title -------------------------
// Work projects get a `company` (navy/active title bar); personal builds get icon only.
const PROJECT_META = {
  "AI Hypnotherapy Voice Chat System":                  { company: "Omelas AI", icon: "🧘" },
  "AI Voice Receptionist":                              { company: "Core Mind Technology · MightyWell", icon: "📞" },
  "WhatsApp Business Automation System":                { company: "Omelas AI", icon: "💬" },
  "Client Acquisition Pipeline":                        { company: "Core Mind Technology · MightyWell", icon: "🎯" },
  "Real-Time Lead Pipeline Dashboard":                  { company: "Core Mind Technology", icon: "📊" },
  "Automated EOD Reporting System":                     { company: "Core Mind Technology", icon: "📋" },
  "Cross-Platform Social Media Automation":             { company: "Core Mind Technology", icon: "📡" },
  "AI Content Generation Workflow":                     { company: "Core Mind Technology", icon: "✍️" },
  "MaxTracks - Automated Package Tracking":             { company: "Omelas AI", icon: "📦" },
  "AI Faceless Video Content Pipeline":                 { icon: "🎬" },
  "Sora2 AI Video Generation & Auto-Publish Pipeline":  { icon: "🎥" },
  "AI Content Creation Team with VEO3 & NanoBanana":    { icon: "🍌" },
  "Telegram Stock Analysis AI Agent":                   { icon: "📈" },
  "Facebook Marketplace Car Flipping Analyzer":         { icon: "🚗" },
  "Telegram Voice Bot":                                 { icon: "🎙️" },
  "WhatsApp AI Chatbot for Any Business":               { icon: "🤖" },
};

const ZINHO_PROJECT = {
  title: "Zinho Media — Client Automation Builds",
  company: "Zinho Media",
  icon: "🛠️",
  description:
    "Built n8n automation workflows from client briefs: content marketing systems, AI-powered stock analysis agents, WhatsApp business chatbots, video generation pipelines, and marketplace automation. Integrated OpenAI GPT-4, Google Gemini, VEO3, Sora2, Firecrawl, and OpenRouter.",
  tech: ["n8n", "OpenAI GPT-4", "Google Gemini", "VEO3", "Sora2", "Firecrawl", "OpenRouter", "Client Work"],
  order: 17,
};

// --- Skills to add (insert only if a skill of that name is missing) --------
const NEW_SKILLS = [
  { name: "VAPI",                 category: "Automation Tools", level: 85, order: 3 },
  { name: "LinkedIn API",         category: "Automation Tools", level: 78, order: 8 },
  { name: "Twitter / X API",      category: "Automation Tools", level: 76, order: 9 },
  { name: "YouTube Data API",     category: "Automation Tools", level: 78, order: 10 },
  { name: "GoHighLevel (GHL)",    category: "Automation Tools", level: 60, order: 15 },
  { name: "xAI / Grok",           category: "AI Models",        level: 78, order: 4 },
  { name: "Amazon S3",            category: "Cloud Storage",    level: 72, order: 1 },
  { name: "Google Cloud Storage", category: "Cloud Storage",    level: 70, order: 2 },
];

// --- Profile field corrections (only fields that are a clear, safe refinement) --
// stack/bio are intentionally left out — the live values are curated and as good
// or richer than the JHA data. resumeUrl is handled as an advisory below.
const PROFILE_PATCH = {
  location: "San Pedro, Laguna, Philippines",
  // Confirmed by Rai: the links.md résumé is the current one.
  resumeUrl: "https://drive.google.com/file/d/15x7pyWp-XVy8KZalX0fGKvghYKjR0gzE/view?usp=sharing",
};

const PROFILE_ADVISORY = {};

// --- Core Mind bullets to append if missing (matched by keyword) -----------
const COREMIND_BULLETS = [
  {
    key: "dashboard",
    text: "Shipped a real-time lead pipeline dashboard in Next.js deployed on Vercel, giving leadership live visibility into pipeline stages and conversion metrics without digging through spreadsheets.",
  },
  {
    key: "receptionist",
    text: "Collaborated on an inbound AI voice receptionist for MightyWell built on VAPI — answers prospect questions on first touch with no human required, then routes high-intent callers by transferring to the CEO, sending a Calendly booking link via n8n, or ending the call gracefully.",
  },
];

const log = (...a) => console.log(...a);

async function run() {
  await mongoose.connect(process.env.MONGO_URI);
  log(`Connected to MongoDB  —  mode: ${COMMIT ? "COMMIT (writing)" : "DRY RUN (no writes)"}\n`);

  let changes = 0;

  // ---- Projects: set company/icon only when empty -------------------------
  log("── PROJECTS ────────────────────────────────");
  const projects = await Project.find();
  const byTitle = new Map(projects.map((p) => [p.title, p]));

  for (const [title, meta] of Object.entries(PROJECT_META)) {
    const doc = byTitle.get(title);
    if (!doc) {
      log(`  ⚠ not found in live DB (skipped): "${title}"`);
      continue;
    }
    const set = {};
    if (meta.company && !doc.company) set.company = meta.company;
    if (meta.icon && !doc.icon) set.icon = meta.icon;
    if (Object.keys(set).length === 0) {
      log(`  ✓ already set: "${title}"`);
      continue;
    }
    log(`  → "${title}"  ${JSON.stringify(set)}`);
    changes++;
    if (COMMIT) await Project.updateOne({ _id: doc._id }, { $set: set });
  }

  // Insert Zinho project if absent
  if (!byTitle.has(ZINHO_PROJECT.title)) {
    log(`  + INSERT new project: "${ZINHO_PROJECT.title}"`);
    changes++;
    if (COMMIT) await Project.create(ZINHO_PROJECT);
  } else {
    log(`  ✓ already present: "${ZINHO_PROJECT.title}"`);
  }

  // ---- Skills: insert only if missing -------------------------------------
  log("\n── SKILLS ──────────────────────────────────");
  for (const skill of NEW_SKILLS) {
    const exists = await Skill.findOne({ name: skill.name });
    if (exists) {
      log(`  ✓ already present: ${skill.name}`);
      continue;
    }
    log(`  + INSERT skill: ${skill.name} (${skill.category})`);
    changes++;
    if (COMMIT) await Skill.create(skill);
  }

  // ---- Profile: field corrections (show before → after) -------------------
  log("\n── PROFILE ─────────────────────────────────");
  const profile = await Profile.findOne();
  if (!profile) {
    log("  ⚠ no profile document found (skipped)");
  } else {
    const set = {};
    for (const [k, v] of Object.entries(PROFILE_PATCH)) {
      if (profile[k] !== v) {
        const before = (profile[k] ?? "").toString();
        log(`  → ${k}:`);
        log(`      before: ${before.length > 80 ? before.slice(0, 77) + "..." : before || "(empty)"}`);
        log(`      after : ${v.length > 80 ? v.slice(0, 77) + "..." : v}`);
        set[k] = v;
        changes++;
      } else {
        log(`  ✓ ${k} already current`);
      }
    }
    if (COMMIT && Object.keys(set).length) await Profile.updateOne({ _id: profile._id }, { $set: set });

    // Advisory only — never written by this script.
    for (const [k, suggested] of Object.entries(PROFILE_ADVISORY)) {
      const live = (profile[k] ?? "").toString();
      if (live !== suggested) {
        log(`  ⚠ ${k} differs (left UNCHANGED — review):`);
        log(`      live      : ${live || "(empty)"}`);
        log(`      JHA source: ${suggested}`);
      }
    }
  }

  // ---- Experience: append missing Core Mind bullets -----------------------
  log("\n── EXPERIENCE (Core Mind Technology) ───────");
  const cm = await Experience.findOne({ company: "Core Mind Technology" });
  if (!cm) {
    log("  ⚠ Core Mind experience entry not found (skipped)");
  } else {
    const existing = cm.bullets || [];
    const toAdd = COREMIND_BULLETS.filter(
      (b) => !existing.some((x) => x.toLowerCase().includes(b.key))
    );
    if (toAdd.length === 0) {
      log("  ✓ dashboard + receptionist bullets already present");
    } else {
      for (const b of toAdd) {
        log(`  + APPEND bullet (${b.key}): ${b.text.slice(0, 70)}...`);
        changes++;
      }
      if (COMMIT) {
        await Experience.updateOne(
          { _id: cm._id },
          { $push: { bullets: { $each: toAdd.map((b) => b.text) } } }
        );
      }
    }
  }

  log(`\n────────────────────────────────────────────`);
  log(`${changes} change(s) ${COMMIT ? "APPLIED" : "would be applied"}.`);
  if (!COMMIT && changes) log(`Re-run with  --commit  to apply.`);

  await mongoose.disconnect();
}

run().catch((err) => {
  console.error("Update failed:", err);
  process.exit(1);
});
