# Data pipeline (public overview)

This document describes how questionnaire content reaches the app **without** relying on private briefing documents.

---

## 1. Editorial source

Content is authored in structured tables (typically one or more **Excel** workbooks), then converted to a single **JSON** file consumed by the browser.

---

## 2. Target JSON (conceptual)

The running app expects one JSON document. The bundled **`tool-data.sample.json`** is the current reference. At a high level it contains:

| Section | Role |
|---------|------|
| `version` | Opaque string for cache-busting / support. |
| `answerOptions` | The four radio values and human-readable labels. |
| `filters` | Lookups: `assetTypes`, `assetSubtypesByAssetType`, `projectPhases`. |
| `questions` | Each item: `id`, `text`, optional per-axis `filters`, optional `condition` (prior question + operator + values), `recommendations` map keyed by answer value, optional `resources` (clarification, tools, standards). |

Conditional visibility today supports **`equals`** and **`in`** against a single `sourceQuestionId`.

(`tool-data.mock.json` is a legacy multi-module sample and is **not** loaded by the current app.)

---

## 3. Converter and validation

A build step (script or small service) should:

1. Read the agreed workbook layout.  
2. Emit JSON matching the shape above.  
3. **Validate** (schema + referential checks: question IDs, filter codes, condition targets).

Detailed column-by-column specs belong in **private** documentation alongside internal workbook agreements.

---

## 4. Delivery

In production the JSON can be:

- Shipped inside a **plugin** directory,  
- Served from **media** or **static** storage with a URL passed into the app, or  
- Produced by a **build** pipeline and deployed with the assets.

The prototype loads a relative path; a WordPress plugin should inject the final URL via `wp_localize_script` or equivalent.
