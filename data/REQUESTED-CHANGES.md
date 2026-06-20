# Requested Portfolio Changes

This is where **you** write what you want changed, in plain English. Then start a
Claude session and say *"apply my requested changes"* (or just point Claude here).

### What Claude does with this file
1. Reads your request below + the current state in `data/portfolio-snapshot.md`.
2. Translates it into `data/changeset.json`.
3. Runs a **dry run** (`node apply-changes.js`) and shows you the exact before → after.
4. Applies it **only after you confirm** (`node apply-changes.js --commit`).
5. Refreshes the snapshot (`node scan.mjs`) and moves your request to **Done** below.

> Content changes (projects, skills, experience, profile text) go **live immediately** —
> the site is database-driven, no deploy needed. Only *code/design* changes require a
> git push (which auto-deploys). See `OPERATIONS.md`.

---

## ✍️ Pending requests

_Write here. Examples of the kinds of things you can ask for:_

- Change my title to "…"
- Update my `stack` line to "…"
- Add a skill: **Redis**, category **Databases**, level **70**
- Bump **n8n** to level 98
- Rename the project "MaxTracks - Automated Package Tracking" to "…"
- Update the description of the "AI Voice Receptionist" project to "…"
- Add a tech tag "LangChain" to the "Telegram Stock Analysis AI Agent" project
- Remove the "Telegram Voice Bot" project
- Add a bullet to my Core Mind experience: "…"
- Reorder projects so "AI Voice Receptionist" is first

_(delete the examples and write your real request)_

---

## ✅ Done

_Claude appends applied requests here with the date, so there's a history._
