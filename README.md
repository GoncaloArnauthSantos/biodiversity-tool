# Biodiversity Assessment Tool

Prototype **screening questionnaire** for biodiversity and nature-related due diligence across infrastructure, natural capital, and real estate–style asset contexts. This repository is a **vanilla JavaScript** front end: ES modules, no bundler, and JSON-driven content so the same app can be embedded in a CMS later.

**Status:** Core UI and filtering logic are in place. **WordPress plugin packaging**, an **Excel → JSON** build pipeline, and **PDF / Excel export** are follow-up work (see [docs/Solution_Reference.md](docs/Solution_Reference.md) and [docs/Data_pipeline.md](docs/Data_pipeline.md)).

Internal briefings and deployment-specific notes (not intended for a public README) are **not** tracked in this tree; see [INTERNAL_MATERIALS.md](INTERNAL_MATERIALS.md).

---

## What it does

| Area | Behaviour |
|------|------------|
| **Modules** | Three tabs (e.g. infrastructure-style, natural capital, real estate–style sectors — labels come from JSON). |
| **Filters** | Four required selects: asset type, asset sub-type, project phase, country (phase options depend on module). |
| **Questions** | Only items matching module, filters, and optional **conditional** rules (`equals` / `in` on a prior answer). |
| **Answers** | Four options: Yes, No, Not sure / Unknown, Not applicable. |
| **Recommendations** | Side panel shows cumulative recommendation copy per answered question when defined for that answer. |
| **Support content** | Per question: clarification text plus linked **Tools** and **Standards** (from JSON). |

UI styles are scoped under `.ffb-biodiversity-tool` so the block can sit inside a host page without resetting global site CSS.

---

## Tech stack

- **Runtime:** Modern browsers (ES modules, `fetch`).
- **Markup:** Static shell in `index.html`; lists and questions rendered from JS.
- **Data:** `tool-data.mock.json` — reference dataset and implicit schema (see [docs/Data_pipeline.md](docs/Data_pipeline.md)).

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
├── tool-data.mock.json        # Sample dataset
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

Editors maintain structured content (typically **spreadsheet → JSON**). The app loads one JSON document describing modules, filters, questions, and recommendations. See [docs/Data_pipeline.md](docs/Data_pipeline.md).

---

## WordPress (summary)

Target integration: a **small plugin** that registers a shortcode, enqueues the module scripts with `type="module"`, enqueues the stylesheet, and exposes a configurable JSON URL. Page builders only output the shortcode; application logic stays in JavaScript. Details: [docs/Solution_Reference.md](docs/Solution_Reference.md).

---

## Documentation

| Document | Purpose |
|----------|---------|
| [docs/Solution_Reference.md](docs/Solution_Reference.md) | Architecture: Excel → JSON → plugin → page |
| [docs/Data_pipeline.md](docs/Data_pipeline.md) | JSON shape and editorial pipeline (high level) |
| [docs/examples/sample_questions_from_mock.tsv](docs/examples/sample_questions_from_mock.tsv) | Tab-separated sample aligned with the mock JSON |
| [docs/examples/dictionaries/](docs/examples/dictionaries/) | Sample dictionary tabs; see `README` inside |

---

## Roadmap (high level)

- [ ] WordPress plugin: shortcode, asset enqueue, configurable JSON source  
- [ ] Spreadsheet → JSON converter with schema validation  
- [ ] Branded **PDF** and **Excel** export (per product agreement)  
- [ ] Hardening: accessibility, error states, optional i18n  

---

## Contributing

Prefer keeping **one** canonical JSON shape (`tool-data.mock.json`) and updating examples when the schema evolves. Confidential specs and internal comms stay outside this published tree — see [INTERNAL_MATERIALS.md](INTERNAL_MATERIALS.md).

### Documentation style

**Code** (class names, prefixes like `.ffb-biodiversity-tool`, filenames) stays as-is for consistency and embedding. **Reader-facing Markdown** (this README, public `docs/*.md`) should stay **generic**: no named commissioning organisation and no links to a specific production website. Sample JSON/TSV may still use placeholder or third-party **resource** links (standards, tools) to keep demos realistic.
