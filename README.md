# Biodiversity Assessment Tool

Interactive **screening questionnaire** for nature-related due diligence, built for the [Finance for Biodiversity Foundation](https://www.financeforbiodiversity.org/) (FfB). This repository holds a **vanilla JavaScript prototype**: modular ES modules, no build step, and a JSON-driven content model aligned with an Excel → JSON editorial pipeline.

**Status:** UI and core behaviour are implemented; **WordPress plugin packaging**, **Excel → JSON converter**, and **PDF / Excel export** are planned next (see [Developer briefing](Developer_Brifing.md) and [Meeting preparation](Meeting_Preparation.md)).

---

## What it does

| Area | Behaviour |
|------|------------|
| **Modules** | Three tabs: Infrastructure, Natural Capital, Real Estate. |
| **Filters** | Four required selects: asset type, asset sub-type, project phase, country (phase labels depend on module). |
| **Questions** | Only rows matching module, filters, and optional **conditional** rules (`equals` / `in` on a prior answer). |
| **Answers** | Four options: Yes, No, Not sure / Unknown, Not applicable. |
| **Recommendations** | Side panel lists cumulative recommendation text per answered question, when defined for that answer. |
| **Support content** | Per question: clarification text plus linked **Tools** and **Standards** (from JSON). |

Styles live under `.ffb-biodiversity-tool` so the widget can sit inside a WordPress theme without leaking globals.

---

## Tech stack

- **Runtime:** Modern browsers (ES modules, `fetch`).
- **Markup:** Static shell in `index.html`; lists and questions rendered from JS.
- **Data:** `tool-data.mock.json` — target shape for production JSON (see [Excel data structure proposal](Excel_Data_Structure_Proposal.md)).

---

## Repository layout

```
biodiversity-tool/
├── index.html                 # Standalone demo shell
├── ffb-biodiversity-tool.css  # Scoped styles (same file to enqueue in WP)
├── tool-app.js                # Entry: load JSON, bind events, orchestrate renders
├── tool-state.js              # Mutable app state
├── tool-logic.js              # Filter matching, visibility, conditional rules
├── tool-render.js             # DOM updates
├── tool-utils.js              # Shared helpers (escaping, selects)
├── tool-data.mock.json        # Sample dataset
├── docs/                      # Architecture, client briefs, WP notes, Excel guides
├── Excel_Data_Structure_Proposal.md
├── Developer_Brifing.md
├── Meeting_Preparation.md
└── Font_Template.md
```

---

## Run locally

ES modules and `fetch` require a **local HTTP server** (opening `index.html` as `file://` will not work).

```bash
npx serve .
```

Alternatively:

```bash
python3 -m http.server 8000
```

Then open the URL the server prints (e.g. `http://localhost:3000` or `http://localhost:8000`).

---

## Data and content workflow

1. Editors maintain questionnaire content in **Excel** (tabs and columns described in [Excel_Data_Structure_Proposal.md](Excel_Data_Structure_Proposal.md)).
2. A **converter** (to be added) produces validated **JSON** matching the schema used by the app.
3. In production, JSON is served from the **WordPress plugin**, the media library, or another URL the plugin is configured to load.

The mock file documents the current JSON contract alongside [docs/Excel_Structure_Client_Guide.md](docs/Excel_Structure_Client_Guide.md) for stakeholder-friendly explanations.

---

## WordPress integration (summary)

Intended deployment: a **small plugin** that registers a shortcode, enqueues `tool-*.js` as `type="module"`, enqueues `ffb-biodiversity-tool.css`, and exposes the JSON URL. Page builders (e.g. WPBakery) only embed the shortcode — application logic stays in JavaScript.

Theme alignment notes for the FfB site (Total child theme, tokens, Lato) live in [docs/WordPress_Mirror_Analysis.md](docs/WordPress_Mirror_Analysis.md). End-to-end architecture: [docs/Solution_Reference.md](docs/Solution_Reference.md).

---

## Documentation index

| Document | Purpose |
|----------|---------|
| [docs/Solution_Reference.md](docs/Solution_Reference.md) | Mental model: Excel → JSON → plugin → page |
| [docs/WordPress_Mirror_Analysis.md](docs/WordPress_Mirror_Analysis.md) | Live-site theme stack and CSS integration notes |
| [docs/Client_Meeting_Brief.md](docs/Client_Meeting_Brief.md) | Stakeholder meeting backbone |
| [Meeting_Preparation.md](Meeting_Preparation.md) | Agenda, MVP scope, risks |
| [docs/Excel_Structure_Client_Guide.md](docs/Excel_Structure_Client_Guide.md) | How to present the workbook structure to non-developers |
| [Excel_Data_Structure_Proposal.md](Excel_Data_Structure_Proposal.md) | Full column spec for Excel → JSON |
| [Developer_Brifing.md](Developer_Brifing.md) | Original functional requirements |
| [docs/examples/sample_questions_from_mock.tsv](docs/examples/sample_questions_from_mock.tsv) | Tab-separated export of mock questions |
| [docs/examples/dictionaries/](docs/examples/dictionaries/) | Sample dictionary sheets (`README` inside folder) |

---

## Roadmap (high level)

- [ ] WordPress plugin: shortcode, asset enqueue, configurable JSON source  
- [ ] Excel → JSON build script with schema validation  
- [ ] Branded **PDF** and **Excel** export (per client agreement)  
- [ ] Hardening: accessibility pass, error states, optional i18n  

Out of scope for early iterations unless explicitly scoped: user accounts, cloud save, AI-assisted answers (see briefing).

---

## Contributing

This is a client-aligned prototype. For structural or copy changes, prefer updating the linked docs in `docs/` so Excel, JSON, and UI stay in sync.

If you add a **LICENSE** file at the repo root, link it here once terms are confirmed with the foundation.
