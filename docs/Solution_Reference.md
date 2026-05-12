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
    → registers shortcode, e.g. [biodiversity_screening_tool]
    → wp_enqueue_script / wp_enqueue_style (.js and .css files)
    → optional: JSON URL (file in plugin, Media Library, or ACF)
         ↓
WP page (page builder or block editor)
    → one line with the shortcode in content
         ↓
Visitor sees: site header/footer + your tool in the content area
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

## 7. Styles and host theme

- The tool should use a **CSS wrapper** (e.g. `.ffb-biodiversity-tool`) to avoid fighting the theme.
- **Stylesheet:** `ffb-biodiversity-tool.css` should be enqueued from the plugin; avoid pasting large `<style>` blocks into a page builder. Tune colours and typography to match the host site’s design tokens when embedding in production.
- Validate on a **draft or staging page** early — commercial themes often set strong defaults on headings, links, and `#content` wrappers.

---

## 8. Out of core for now (examples)

User accounts, cloud save, AI — future phases if stakeholders scope and fund them.

---

## 9. Related repo documents

- `tool-data.mock.json` — Reference dataset and implicit JSON contract  
- `docs/Data_pipeline.md` — High-level data flow and JSON sections  

---

## 10. Elevator pitch

“We build the questionnaire as a JavaScript web app with data in JSON produced from Excel. On WordPress it lives in a plugin with a shortcode on a page — the theme still provides the global layout; we provide the full widget in the content area.”
