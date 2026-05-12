# Screening tool — solution reference

Quick lookup when you need clarity on what we are building and how it fits into WordPress.

---

## 1. Problem we solve

Interactive questionnaire with filters (module, asset type, sub-type, phase, country), conditional questions, four answer types, a recommendations panel, and (in later phases) PDF/Excel export. Question content comes mainly from **Excel**, converted to **JSON** with a stable schema.

---

## 2. Why not “WPBakery only”

WPBakery is great for pages and blocks. This tool is an **application** with state, rules, and structured data. The right split is:

- **Engine + UI:** JavaScript (modular prototype: `tool-app.js`, `tool-logic.js`, etc.).
- **WordPress:** hosts the tool on a page, loads scripts cleanly, SEO, permissions, optional JSON URL/upload.

Pasting huge scripts into “Raw JS” in the builder is **not** sustainable.

---

## 3. Layered architecture (mental model)

```
Excel (editorial source)
    → Excel script → JSON (agreed schema)
         ↓
WordPress: minimal plugin
    → registers shortcode, e.g. [ffb_biodiversity_tool]
    → wp_enqueue_script / wp_enqueue_style (.js and .css files)
    → optional: JSON URL (file in plugin, Media Library, or ACF)
         ↓
WP page (WPBakery or classic editor)
    → one line with the shortcode in content
         ↓
Visitor sees: theme (Total header/footer) + your tool in the middle
```

---

## 4. Data (JSON)

- The file describes modules, answer options, filters (including **phases per module**), and questions with a **`modules` array** (a question may apply to more than one module).
- **Updates:** infrequent (e.g. annual). No heavy per-question CMS required at first; **replace the JSON** when a new questionnaire version is approved (upload or deploy).
- **Validation:** the Excel → JSON converter should validate the schema to avoid broken builds.

---

## 5. WordPress integration (what “plugin” means here)

A folder under `wp-content/plugins/your-plugin-name/` containing:

- PHP that registers the shortcode and **enqueues** assets.
- Your `.js`, `.css`, and optionally `tool-data.json` or a public URL reference.

**WPBakery** only needs a block that outputs the **shortcode** — it does not hold the app logic.

---

## 6. Performance and JSON `fetch`

One HTTP request to load a static `.json` on the same domain is **normal** and fast enough here. Bottlenecks are rarely that request; rendering and CSS matter more.

If JSON lives in the **Media Library** or a configurable URL, it is still a single `fetch` — acceptable, especially with rare updates.

---

## 7. Styles and Total theme

- The tool should use a **CSS wrapper** (e.g. `.ffb-biodiversity-tool`) to avoid fighting the theme.
- **Stylesheet:** `ffb-biodiversity-tool.css` mirrors child-theme tokens (`_variables.scss`) and heading patterns (`.ffb-subheading`, `#wrap` typography). Enqueue that file from the plugin; do not paste large `<style>` blocks into the page builder.
- Brand alignment (colours, fonts) can follow their guidelines; testing on a **draft page** on the real site surfaces Total conflicts early.

---

## 8. Out of core for now (examples)

User accounts, cloud save, AI — future phases if the client wants budget for them.

---

## 9. Related repo documents

- `Excel_Data_Structure_Proposal.md` — How to structure Excel for the converter  
- `Developer_Brifing.md` — Client functional requirements  
- `Meeting_Preparation.md` — Generic agenda (pair with `Client_Meeting_Brief.md`)  

---

## 10. Elevator pitch

“We build the questionnaire as a JavaScript web app with data in JSON produced from Excel. On WordPress it lives in a plugin with a shortcode on a page — the theme still provides the global layout; we provide the full widget in the content area.”
