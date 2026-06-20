/**
 * apply-changes.js — apply a reviewed changeset to the LIVE portfolio database.
 * NON-DESTRUCTIVE: performs only the explicit operations you list (set / upsert /
 * delete). It never wipes a collection. Schema validation is enforced by the models.
 *
 *   node apply-changes.js                 → DRY RUN of data/changeset.json (no writes)
 *   node apply-changes.js --commit        → apply to MongoDB
 *   node apply-changes.js path/to/cs.json [--commit]
 *
 * Writes go through MONGO_URI in the root .env (the production Atlas connection).
 * Reads for the snapshot use the public API instead — see scan.mjs. (We don't use the
 * admin API for writes because the deployed server's admin creds differ from the local
 * .env.) Match keys: skills=name, projects=title, experience=company. Profile is a
 * singleton (use profile.set). See OPERATIONS.md.
 */
require("dotenv").config({ path: require("path").join(__dirname, "..", ".env") });
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");

const Profile = require("./models/Profile");
const Skill = require("./models/Skill");
const Experience = require("./models/Experience");
const Project = require("./models/Project");

const COMMIT = process.argv.includes("--commit");
const fileArg = process.argv.slice(2).find((a) => a.endsWith(".json"));
const CHANGESET = fileArg
  ? (path.isAbsolute(fileArg) ? fileArg : path.join(process.cwd(), fileArg))
  : path.join(__dirname, "..", "data", "changeset.json");

const j = (x) => JSON.stringify(x);
const differs = (a, b) => j(a) !== j(b);
const log = (...a) => console.log(...a);
let changes = 0;

const IGNORE = ["_id", "__v", "createdAt", "updatedAt", "id"];
function plain(doc) {
  return doc && typeof doc.toObject === "function" ? doc.toObject() : doc;
}
function fieldsThatDiffer(item, current) {
  const cur = plain(current) || {};
  const out = {};
  for (const [k, v] of Object.entries(item)) {
    if (IGNORE.includes(k)) continue;
    if (differs(v, cur[k])) out[k] = v;
  }
  return out;
}
function trunc(v) {
  if (v == null) return "(empty)";
  const s = Array.isArray(v) ? `[${v.join(", ")}]` : String(v);
  return s.length > 90 ? s.slice(0, 87) + "..." : s;
}

async function handleCollection(label, Model, key, ops) {
  const upserts = ops?.upsert || [];
  const deletes = ops?.delete || [];
  if (!upserts.length && !deletes.length) return;

  log(`\n── ${label.toUpperCase()} ───────────────────────`);
  const current = await Model.find();
  const byKey = new Map(current.map((d) => [d[key], d]));

  for (const item of upserts) {
    const k = item[key];
    if (k == null) { log(`  ⚠ skipped upsert with no "${key}": ${j(item)}`); continue; }
    const existing = byKey.get(k);
    if (!existing) {
      log(`  + INSERT ${key}="${k}"`);
      changes++;
      if (COMMIT) await Model.create(item);
    } else {
      const diff = fieldsThatDiffer(item, existing);
      if (!Object.keys(diff).length) { log(`  ✓ "${k}" already current`); continue; }
      log(`  → UPDATE "${k}"`);
      const cur = plain(existing);
      for (const [f, v] of Object.entries(diff)) log(`      ${f}: ${trunc(cur[f])}  →  ${trunc(v)}`);
      changes++;
      if (COMMIT) await Model.findByIdAndUpdate(existing._id, item, { new: true, runValidators: true });
    }
  }
  for (const k of deletes) {
    const existing = byKey.get(k);
    if (!existing) { log(`  ✓ "${k}" already absent`); continue; }
    log(`  - DELETE ${key}="${k}"`);
    changes++;
    if (COMMIT) await Model.findByIdAndDelete(existing._id);
  }
}

async function main() {
  let cs;
  try { cs = JSON.parse(fs.readFileSync(CHANGESET, "utf8")); }
  catch (e) { console.error(`Cannot read changeset ${CHANGESET}: ${e.message}`); process.exit(1); }

  log(`Changeset : ${CHANGESET}`);
  log(`Database  : MongoDB via MONGO_URI`);
  log(`Mode      : ${COMMIT ? "COMMIT (writing)" : "DRY RUN (no writes)"}`);

  if (!process.env.MONGO_URI) { console.error("MONGO_URI missing from .env"); process.exit(1); }
  await mongoose.connect(process.env.MONGO_URI);

  // PROFILE (singleton)
  const profileSet = cs.profile?.set || {};
  if (Object.keys(profileSet).length) {
    log(`\n── PROFILE ─────────────────────────────`);
    const cur = await Profile.findOne();
    const diff = fieldsThatDiffer(profileSet, cur);
    if (!Object.keys(diff).length) log("  ✓ all fields already current");
    else {
      const curp = plain(cur) || {};
      for (const [f, v] of Object.entries(diff)) {
        log(`  → ${f}:`);
        log(`      before: ${trunc(curp[f])}`);
        log(`      after : ${trunc(v)}`);
        changes++;
      }
      if (COMMIT) {
        if (cur) await Profile.findByIdAndUpdate(cur._id, profileSet, { new: true, runValidators: true });
        else await Profile.create(profileSet);
      }
    }
  }

  await handleCollection("skills", Skill, "name", cs.skills);
  await handleCollection("projects", Project, "title", cs.projects);
  await handleCollection("experience", Experience, "company", cs.experience);

  log(`\n────────────────────────────────────────`);
  if (!changes) log("No changes — the live data already matches this changeset.");
  else {
    log(`${changes} change(s) ${COMMIT ? "APPLIED to MongoDB." : "would be applied."}`);
    if (!COMMIT) log("Re-run with  --commit  to apply.");
    else log("Run  node scan.mjs  to refresh the snapshot.");
  }

  await mongoose.disconnect();
}

main().catch((e) => { console.error("apply-changes failed:", e.message); process.exit(1); });
