# Biodiversity Assessment Tool — Vanilla JS prototype

Tool structure for the Finance for Biodiversity Foundation.

## File layout

```
biodiversity-tool/
├── index.html           # Shell page (loads modular JS + stylesheet)
├── ffb-biodiversity-tool.css  # Scoped UI styles (enqueue same file in WP)
├── tool-app.js          # App entry (ES modules)
├── tool-logic.js        # Filtering & visibility rules
├── tool-render.js       # DOM rendering
├── tool-state.js        # Application state
├── tool-utils.js        # Helpers
├── tool-data.mock.json  # Sample dataset
└── README.md            # This documentation
```

## How it works

1. **Module tabs** — User picks Infrastructure, Natural Capital, or Real Estate.
2. **Four filters** — Asset type, asset sub-type, project phase, country (phase options depend on module).
3. **Filtered questions** — Only questions matching the selection (and conditional rules) are shown.
4. **Four answers** — Yes / No / Not sure / Unknown / Not applicable.
5. **Recommendations** — Shown cumulatively in the side panel when defined for the chosen answer.

## Data shape

See `tool-data.mock.json` and `Excel_Data_Structure_Proposal.md` for the target schema (modules array, filters, conditions, recommendations).

## WordPress integration (high level)

1. **Scripts** — Prefer a small plugin that uses `wp_enqueue_script` instead of pasting raw `<script>` in the page builder.
2. **Styles** — Ship `ffb-biodiversity-tool.css` and enqueue it with `wp_enqueue_style`; rules are scoped under `.ffb-biodiversity-tool`. `index.html` loads Google Fonts (Lato) for standalone demos; in production the theme usually loads Lato already.
3. **Data** — Serve JSON via plugin URL, Media Library, or bundled file; rare updates favour a simple replace workflow.

## Run locally

Use a local HTTP server (required for ES modules and `fetch` of JSON):

```bash
npx serve .
# or
python3 -m http.server 8000
```

Then open the served URL (not `file://`).

## Further docs

- `docs/WordPress_Mirror_Analysis.md` — Notes from the local WP mirror (Total child theme, tokens, integration)  
- `docs/Solution_Reference.md` — Architecture and WP integration overview  
- `docs/Client_Meeting_Brief.md` — Stakeholder meeting brief  
- `docs/Excel_Structure_Client_Guide.md` — How to explain Excel layout to stakeholders (includes concrete sample)  
- `docs/examples/sample_questions_minimal.tsv` — Minimal Questions sheet (tab-separated)  
- `docs/examples/sample_questions_from_mock.tsv` — All questions from `tool-data.mock.json` (tab-separated; includes clarifications + link IDs)  
- `docs/examples/dictionaries/` — Sample dictionary tabs (`modules`, `countries`, `phases`, …); see `dictionaries/README.md`  
- `Excel_Data_Structure_Proposal.md` — Full technical column spec (Excel → JSON)  
- `Developer_Brifing.md` — Original functional briefing  
