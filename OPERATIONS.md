# OPERATIONS — How this portfolio runs

This is the source-of-truth runbook for **content** and **deployment**. If you only
read one thing, read this. (Design/Win95 rules live in `CLAUDE.md`.)

## TL;DR

- **The live MongoDB is the single source of truth.** Not `seed.js`.
- **Content** (projects / skills / experience / profile text) → change via the API
  tools below. It goes **live immediately** — the site is DB-driven, no deploy.
- **Code / design** (React components, styles, models, routes) → edit + `git push` to
  `main`. That auto-deploys (server via Cloud Build, client via Cloudflare Pages).
- **Never run `seed.js` to make changes.** It wipes every collection. It's guarded to
  refuse on a populated DB and exists only for disaster recovery.

---

## Architecture

| Piece | Where | How it deploys |
|---|---|---|
| **Frontend** (`client/`, Vite + React) | `https://portfolio.raigrc.com` → **Cloudflare Pages** (git-connected) | Auto-builds on push to `main` (`npm run build`, output `client/dist`). ~1–2 min. |
| **API** (`server/`, Express) | Cloud Run service `automation-portfolio` · project `mythical-zodiac-450714-s3` · region `us-central1` · `https://automation-portfolio-vrdyzcnn7q-uc.a.run.app` | **Cloud Build trigger** on push to `main` (`cloudbuild.yaml` builds `./server` Docker → Cloud Run). ~2–4 min. |
| **Database** | MongoDB Atlas (`portfolio` db) | n/a — edited via API tools |

The Express server serves **only `/api/*`** (no static client). The client reads the
API base from `VITE_API_URL` (set in the Cloudflare Pages env, points at the Cloud Run URL).

Collections: `profiles` (singleton), `skills`, `experiences`, `projects`, `messages`
(contact form — PII, auth-only, never touched by these tools).

> If the Cloud Run URL ever changes, find the current one with:
> `gcloud run services describe automation-portfolio --region=us-central1 --format='value(status.url)'`
> and pass it to the tools via `API_BASE=<url>/api`.

---

## The content workflow (the normal way to change the site)

All commands run from the **`server/`** directory. Reads use the public API (no
credentials); writes go **directly to MongoDB** via `MONGO_URI` in the root `.env`.

> Why not the admin API for writes? The deployed Cloud Run server sets its own admin
> credentials (not the local `.env` defaults), so an API login from here returns 401.
> `MONGO_URI` in `.env` *is* the real production connection, so the tools write through it.

### 1. See the current live state
```bash
node scan.mjs
```
Writes `data/portfolio-snapshot.json` (machine) and `data/portfolio-snapshot.md`
(human). Read-only. Run it anytime to know what's actually live.

### 2. Request a change
Write what you want in plain English in `data/REQUESTED-CHANGES.md`, then ask Claude
to "apply my requested changes." Claude translates it into `data/changeset.json`.

`changeset.json` shape (explicit operations only — nothing implicit is deleted):
```jsonc
{
  "profile":    { "set": { "title": "..." } },          // singleton, partial update
  "skills":     { "upsert": [ {"name":"Redis","category":"Databases","level":70} ],
                  "delete": ["Old Skill"] },             // match by name
  "projects":   { "upsert": [ {"title":"X","description":"...","company":"...","icon":"📦","tech":["n8n"]} ],
                  "delete": ["Old Project Title"] },      // match by title
  "experience": { "upsert": [ {"company":"X","role":"...","startDate":"...","bullets":[...]} ],
                  "delete": ["Old Company"] }             // match by company
}
```
- **upsert** = update if the match key exists (only the fields you provide change),
  otherwise insert (inserts must include the model's required fields).
- To edit an array (project `tech`, experience `bullets`), provide the **full new array**.

### 3. Preview (dry run — always do this)
```bash
node apply-changes.js
```
Prints every change as `before → after`. Writes nothing. **Claude shows you this and
waits for your confirmation.**

### 4. Apply (only after you confirm)
```bash
node apply-changes.js --commit
```
Connects to MongoDB and performs only the listed operations (schema-validated).

### 5. Refresh + verify
```bash
node scan.mjs        # snapshot now reflects the change
```
Content is already live (DB-driven). Reload `portfolio.raigrc.com` to see it.

> After applying, Claude resets `changeset.json` to empty and moves the request to the
> **Done** section of `REQUESTED-CHANGES.md` with a date.

---

## Changing code / design (not content)

1. Edit files under `client/` or `server/`.
2. `cd client && npm run build` to confirm it builds (this is what Cloudflare runs).
3. Commit + push to `main` → both pipelines auto-deploy.
4. Verify: `gcloud builds list --limit=1` (server) and reload the site (client).

---

## `seed.js` — recovery only ⚠️

`seed.js` does `deleteMany({})` on every collection, then re-inserts a bootstrap.
It is **guarded**: it aborts if the DB already has data. Only use it to rebuild a
**lost/empty** database, and only with explicit intent:
```bash
node seed.js                    # aborts if data exists
node seed.js --force-recovery   # DESTRUCTIVE full re-seed (you must mean it)
```
Keep `seed.js` roughly in sync with the live data so a recovery doesn't regress things,
but it is **not** the way to make edits. `apply-update.js` was a one-time enrichment
script (the Job Hunting Assistant import) and is superseded by `apply-changes.js`.

---

## Files at a glance

| Path | Purpose |
|---|---|
| `server/scan.mjs` | Read live API → `data/portfolio-snapshot.{json,md}` (read-only) |
| `server/apply-changes.js` | Apply `data/changeset.json` to MongoDB (dry-run default, `--commit`) |
| `data/REQUESTED-CHANGES.md` | You write change requests here in plain English |
| `data/changeset.json` | Machine-readable changeset Claude builds from your request |
| `data/portfolio-snapshot.{json,md}` | Current live state mirror (regenerated by `scan.mjs`) |
| `server/seed.js` | ⚠️ Recovery-only bootstrap (guarded) |
| `.env` (root, gitignored) | `MONGO_URI`, `ADMIN_USERNAME`, `ADMIN_PASSWORD`, `JWT_SECRET`, `API_BASE?` |
