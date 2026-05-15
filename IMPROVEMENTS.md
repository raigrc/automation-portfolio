# RavenOS 95 — Portfolio Improvement Ideas

Use `/improve-portfolio` to start planning or building any item here.

---

## Interactivity / "OS Feel"

| # | Idea | ROI | Complexity |
|---|------|-----|------------|
| I-1 | **Draggable window** — main window can be repositioned on the teal desktop, snaps to grid on release | ⭐⭐⭐ High | Medium |
| I-2 | **Double-click to open** — single click selects desktop icon (highlight only), double-click opens the tab | ⭐⭐ Medium | Low |
| I-3 | **Right-click context menu** — desktop icons get a Win95-style menu (Open / Properties / …) | ⭐⭐ Medium | Medium |
| I-4 | **Window minimize/restore** — clicking `_` shrinks window into taskbar button with animation; clicking taskbar restores it | ⭐⭐ Medium | Medium |

---

## Immersion

| # | Idea | ROI | Complexity |
|---|------|-----|------------|
| M-1 | **Sound effects** (opt-in toggle) — Win95 startup chime on boot, soft click sounds on buttons; ~5KB WAV files | ⭐⭐⭐ High | Low |
| M-2 | **"You have new mail" tray notification** — fades in after a few seconds on desktop, clicking it opens Contact tab | ⭐⭐⭐ High | Low |
| M-3 | **Win95 hourglass cursor** during loading states | ⭐⭐ Medium | Low |
| M-4 | **Modal loading dialogs** — file-copy style dialog with progress bar when fetching API data, instead of inline spinners | ⭐ Low | Medium |
| M-5 | **Tab paint effect** — content reveals top-to-bottom on tab switch like a slow Win95 render, instead of fade | ⭐ Low | Low |

---

## Polish

| # | Idea | ROI | Complexity |
|---|------|-----|------------|
| P-1 | **Live session uptime in taskbar** — clock area shows "Session: 00:04:32" counting up since page load | ⭐⭐ Medium | Low |
| P-2 | **Animated boot logo** — replace static emoji with a pixelated 🪟 that "loads" segment by segment | ⭐ Low | Low |
| P-3 | **Keyboard shortcuts** — Alt+1–5 to switch tabs, mimicking Alt+Tab OS behavior | ⭐⭐ Medium | Low |
| P-4 | **Error dialog** — if API fetch fails, show a proper Win95 error modal (red X icon, OK button) instead of silent fallback | ⭐⭐⭐ High | Low |

---

## Content / Easter Eggs

| # | Idea | ROI | Complexity |
|---|------|-----|------------|
| C-1 | **Recycle Bin easter egg** — opens a window listing "deprecated skills" (PHP, Flash, jQuery, etc.) with funny tombstone copy | ⭐⭐⭐ High | Low |
| C-2 | **My Documents / Downloads tab** — mini file browser listing certifications or project files as `.zip`/`.doc` icons | ⭐⭐ Medium | Medium |
| C-3 | **"Properties" dialog for skills** — right-clicking a skill in the tree opens a modal with more detail (years used, tools, projects) | ⭐ Low | Medium |

---

## Status

| ID | Status | Notes |
|----|--------|-------|
| I-1 | ✅ Done | Drag via title bar handle, snaps to 16px grid, disabled on mobile |
| I-2 | ✅ Done | Single click highlights icon, double click opens tab |
| I-3 | ✅ Done | Win95 right-click context menu on all desktop icons |
| I-4 | ✅ Done | `_` collapses window, taskbar button toggles minimize/restore |

---

_Last updated: 2026-05-15_
