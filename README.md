# Biodiversity Assessment Tool

Prototype **screening questionnaire** for biodiversity and nature-related due diligence. This repository is a **vanilla JavaScript** front end: ES modules, no bundler, and JSON-driven content so the same app can be embedded in a CMS later.

**Status:** Core UI and filtering logic work against sample JSON. **WordPress plugin packaging**, a maintained **Excel → JSON** pipeline, and **PDF export** are follow-up work (see [docs/Solution_Reference.md](docs/Solution_Reference.md) and [docs/Data_pipeline.md](docs/Data_pipeline.md)).

Internal briefings and deployment-specific notes are **not** tracked in this tree; see [INTERNAL_MATERIALS.md](INTERNAL_MATERIALS.md).

---

## What it does

| Area | Behaviour |
|------|------------|
| **Filters** | Three required selects: asset type, asset sub-type, project phase. |
| **Questions** | Only items matching the selected filters and optional **conditional** rules (`equals` / `in` on a prior answer). |
| **Answers** | Four options: Yes, No, Not sure / Unknown, Not applicable. |
| **Recommendations** | Side panel shows cumulative recommendation copy; long text is collapsed with **See more** / **See less**. |
| **Support content** | Per question: clarification text plus linked **Tools** and **Standards** (from JSON). |

UI styles are scoped under `.ffb-biodiversity-tool` so the block can sit inside a host page without resetting global site CSS.

---

## Tech stack

- **Runtime:** Modern browsers (ES modules, `fetch`).
- **Markup:** Static shell in `index.html`; lists and questions rendered from JS.
- **Data:** `tool-data.sample.json` — active sample dataset (see [docs/Data_pipeline.md](docs/Data_pipeline.md)). `tool-data.mock.json` is an older multi-module sample kept for reference only.

---

## Repository layout

```
biodiversity-tool/
├── index.html                 # Standalone demo shell
├── ffb-biodiversity-tool.css  # Scoped styles (enqueue the same file from a plugin if needed)
├── tool-app.js                # Entry: load JSON, bind events, orchestrate renders
├── tool-state.js              # Mutable app state
├── tool-logic.js              # Filter matching, visibility, conditional rules
├── tool-render.js             # DOM updates
├── tool-utils.js              # Shared helpers (escaping, selects)
├── tool-data.sample.json      # Active sample dataset
├── tool-data.mock.json        # Legacy multi-module sample (not loaded by the app)
├── docs/                      # Architecture + data-flow notes (public-safe)
└── docs/examples/             # Sample TSVs / dictionaries for workbook modelling
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

## Data flow (summary)

Editors maintain structured content (typically **spreadsheet → JSON**). The app loads one JSON document describing filters, questions, and recommendations. See [docs/Data_pipeline.md](docs/Data_pipeline.md).

---

## WordPress (summary)

Target integration: a **small plugin** that registers a shortcode, enqueues the module scripts with `type="module"`, enqueues the stylesheet, and exposes a configurable JSON URL. Page builders only output the shortcode; application logic stays in JavaScript. Details: [docs/Solution_Reference.md](docs/Solution_Reference.md).

---

## Documentation

| Document | Purpose |
|----------|---------|
| [docs/Solution_Reference.md](docs/Solution_Reference.md) | Architecture: Excel → JSON → plugin → page |
| [docs/Data_pipeline.md](docs/Data_pipeline.md) | JSON shape and editorial pipeline (high level) |
| [docs/examples/sample_questions_from_mock.tsv](docs/examples/sample_questions_from_mock.tsv) | Tab-separated sample aligned with the legacy mock JSON |
| [docs/examples/dictionaries/](docs/examples/dictionaries/) | Sample dictionary tabs; see `README` inside |

---

## Roadmap (high level)

- [ ] WordPress plugin: shortcode, asset enqueue, configurable JSON source  
- [ ] Spreadsheet → JSON converter aligned with the current schema  
- [ ] Branded **PDF** export (per product agreement)  
- [ ] Layout iteration for long recommendations / denser content  
- [ ] Hardening: accessibility, error states, optional i18n  

---

## Contributing

Prefer keeping **`tool-data.sample.json`** as the canonical shape the app loads, and updating docs when the schema evolves. Confidential specs and internal comms stay outside this published tree — see [INTERNAL_MATERIALS.md](INTERNAL_MATERIALS.md).

### Documentation style

**Code** (class names, prefixes like `.ffb-biodiversity-tool`, filenames) stays as-is for consistency and embedding. **Reader-facing Markdown** (this README, public `docs/*.md`) should stay **generic**: no named commissioning organisation and no links to a specific production website. Sample JSON/TSV may still use placeholder or third-party **resource** links (standards, tools) to keep demos realistic.
