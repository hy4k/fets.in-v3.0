# FETS — fets.in (v3.0)

Official website of **FETS — Forun Testing & Educational Services**, authorized exam
testing centre with two facilities in Kerala, India (Calicut · Kochi).

Concept: **EXAM DAY — a live session**. A single continuous scroll through nine
checkpoints (CP 00–CP 08): airlock hero, scroll-drawn exam-day journey, surveillance
style facility feed, exam catalogue ledger, Exam Test Drive simulations,
authorizations, site dossiers, candidate briefing (FAQ) and contact report.
No menus — a fixed right-edge *SessionRail* instrument (live clock, checkpoint
readout, progress dial) replaces navigation. Mobile gets a bottom instrument strip.

## Stack

- React 19 + TypeScript + Vite 7
- Tailwind CSS 3.4 + shadcn/ui primitives
- Design system in `src/index.css` (dark facility palette, Space Grotesk + JetBrains Mono)
- All site content centralised in `src/data/site.ts`

## Develop

```bash
npm install
npm run dev
```

## Build

```bash
npm run build   # outputs static site to dist/
```

## Images

Facility photography and brand marks live in `public/images/` and are **not tracked
in this repository**. After cloning, unzip `fets.in-v3.0-images.zip` at the repo root
(it restores `public/images/brand/*` and `public/images/facility/*`) — or drag the
folder into the GitHub web UI. The pre-built `dist` bundle already includes them.

## Deploy

See [DEPLOY.md](DEPLOY.md) — static build, any web server works. Current target:
Hostinger VPS + Nginx serving `fets.in`.

## Centres

- **Calicut** — 4th Floor, Kadooli Tower, West Nadakkavu, Vandipetta Junction — 0495 491 5936
- **Kochi** — 6th Floor, Manjooran Estate, Bypass Junction, Edappally — 0484 454 1957
