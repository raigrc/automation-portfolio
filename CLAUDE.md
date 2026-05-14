# automation-portfolio — CLAUDE.md

## Who You're Helping
Rai (Raven Justin P. Garcia) — Manager, AI/Dev Department at Core Mind Technology.
Full-stack builder, ships fast, prefers root-cause fixes over band-aids.
Taglish is fine. No fluff.

## Stack
- **Frontend:** React 19 + Vite + Tailwind CSS v3 + Framer Motion + React Router v7 + Axios
- **Backend:** Express + MongoDB (Mongoose) + JWT auth
- **Dev command:** `npm run dev` from root (runs client + server concurrently)
- **Client port:** Vite default (5173) — check `vite.config.js` if different
- **Structure:** `client/src/` for all frontend code, `server/` for API

## Design Direction — Windows 95/98 Classic UI

This portfolio uses a retro Win32 / Windows 95-98 aesthetic. Every UI decision should align with this:

### Color palette
- Background: `#C0C0C0` (silver grey) — primary surface
- Dark shadow: `#808080` — border bottom-right for raised elements
- Light highlight: `#FFFFFF` — border top-left for raised elements
- Deep shadow: `#404040` — outer dark border on buttons/panels
- Title bar active: `#000080` navy → `#1084D0` blue gradient (left to right)
- Title bar text: `#FFFFFF`
- Input background: `#FFFFFF`
- Body text: `#000000`

### Typography
- Font: `'Tahoma', 'MS Sans Serif', Arial, sans-serif`
- Size: 11–13px for body, 12px for labels, no antialiasing feel
- No italic, no thin weights — stick to normal/bold

### Borders & Effects
- Raised element (buttons, panels): `border: 2px solid; border-color: #FFFFFF #808080 #808080 #FFFFFF`
- Sunken element (inputs, progress bars): `border: 2px solid; border-color: #808080 #FFFFFF #FFFFFF #808080`
- No `border-radius` anywhere — everything is square
- No box shadows (except title bar inner glow if needed)
- No modern gradients — flat fills only (title bar is the one exception)

### Components
- **Windows:** white content area inside a raised panel, with a title bar on top (navy gradient, white text, [_][□][×] buttons)
- **Buttons:** grey `#D4D0C8`, raised border, square, hover = pressed (invert border)
- **Inputs:** white, sunken border, square
- **Scrollbars:** mimic Win32 chunky scrollbars where possible
- **Tabs:** classic Win32 tab style (raised active tab, flat inactive)
- **Status bar:** fixed bottom strip, sunken, small text showing current section or status
- **Dividers:** `<hr>` style inset lines between sections
- **Icons:** pixelated 16×16 or 32×32 style where applicable

### What NOT to do
- No `border-radius` (not even `2px`)
- No soft box shadows
- No glassmorphism, neumorphism, or any modern effects
- No Tailwind `rounded-*` classes
- No dark mode toggle (the aesthetic IS the theme)
- Don't strip Tailwind — use it, but override with custom CSS where Tailwind can't express Win32 patterns

## Content — Core Mind Technology Work

When adding work experience or projects related to Core Mind, use these details:

### Role
**Manager, AI/Dev Department** — Core Mind Technology
Promoted April 2026 from Mid-Level AI/Automation Engineer.
Graveyard shift (9PM–6AM PHT). 80% dev / 20% management.

### Projects to feature

**EOD Reporting System v2**
- Built end-to-end: Formaloo form (13 fields) + n8n routing automation
- Routes EOD submissions to 22 FTEs via Slack DM (direct + skip-level)
- Stack: n8n, Formaloo, Google Sheets, Slack API

**MightyWell Lead Acquisition Pipeline**
- Multi-source scraper: Facebook, Reddit, Google Maps via Apify
- AI scoring (1–10), Hot/Warm/Cold routing, dedup, normalization
- Output: Google Sheets + Slack alerts, Close CRM-ready
- Stack: Apify, n8n, Google Sheets, OpenAI

**Auto-Posting Automation**
- Cross-platform social media automation: FB, IG, TikTok, X, LinkedIn
- Sheet-driven content pipeline with per-post platform selector
- Multi-brand support (CoreMind + subsidiaries)
- Stack: n8n, Meta Graph API, LinkedIn API, Google Sheets

**Content Generation Workflow**
- AI-drafted captions + image prompt generation for social posts
- Multi-brand, multi-platform variants
- Stack: n8n, OpenAI, Google Sheets

**Lead Enrichment Workflow**
- Website scrape → email extraction → enrichment columns
- Feeds into MightyWell hot leads sheet + Close CRM ingestion
- Stack: n8n, Apify, custom JS nodes

**CoreMind Actors (Apify Platform)**
- Production-grade multi-actor monorepo for lead gen/enrichment/validation
- TypeScript strict + Apify SDK + Crawlee + Turborepo + Vitest + Zod
- Taxonomy: source-* / enrich-* / validate-* actors, shared core package
- Stack: TypeScript, Apify, Crawlee, pnpm, Turborepo, GitHub Actions

**Leads Dashboard**
- Isolated Next.js dashboard for real-time lead pipeline visibility
- Stack: Next.js, Vercel

### Skills to highlight
- n8n (advanced — multi-workflow orchestration, error handling, custom JS nodes)
- Apify (actor development, scraping pipelines)
- OpenAI API (scoring, generation, enrichment)
- React / Next.js / TypeScript
- MongoDB / Mongoose
- REST API design (Express)
- Slack API, Google Workspace APIs, Meta Graph API
- Team leadership, technical hiring, intern management

## Rules
- Don't change content — only styling, unless explicitly asked
- Don't auto-commit — ask first
- Keep changes scoped: a styling task doesn't need a refactor
- When in doubt about a component's Win32 equivalent, ask
- Run `npm run dev` from root to test — verify in browser before calling done
- No new dependencies without asking first (especially UI libraries — Tailwind is enough)