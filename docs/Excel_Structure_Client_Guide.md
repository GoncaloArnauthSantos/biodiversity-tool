# Excel workbook structure — guide for stakeholders

Use this document when you explain **how we want the Excel file organised** before it is converted to JSON for the web tool.  
For the full technical column list, see `Excel_Data_Structure_Proposal.md` in the repository root.

---

## Why structure matters

- One predictable layout lets us **automate** Excel → JSON and catch errors early.
- Your team keeps editing **Excel** (not code). We provide the **rules** once; your updates stay in familiar spreadsheets.

---

## Workbook tabs (recommended)

| Tab | Purpose |
|-----|---------|
| **README** | Short instructions for editors (who to ask, version date, glossary). |
| **Dictionaries** | Allowed codes: modules, asset types, phases **per module**, countries, etc. Everyone picks from lists — fewer typos. |
| **Questions** | **Main sheet:** one row = one question (including conditional follow-ups). |
| **Recommendations** *(optional)* | Reusable recommendation blocks referenced by ID if you prefer not to inline long text. |
| **Links** *(optional)* | Central list of tools / standards / clarification snippets referenced by ID. |

For the first delivery, **Dictionaries** + **Questions** are enough.

---

## Core idea: one row = one question

Each row defines:

- **Who sees it** — which module(s), asset types, phase(s), country (or `ALL`).
- **What is asked** — question text and the four answer options (same set for MVP).
- **When it appears** — optional condition (e.g. only if a previous answer was “No”).
- **What we recommend** — text per answer type (Yes / No / Unknown / N.A.), where applicable.

---

## Modules (tabs in the app)

Use **codes** in the sheet, not labels:

- `infrastructure`
- `natural_capital`
- `real_estate`

**Several modules on one question:** put them in one cell, separated by **`|`**, for example:

```text
infrastructure|natural_capital
```

Same rule for multiple asset types or phases in one cell: **`|`**, never commas.

---

## Special value: `ALL`

Use **`ALL`** in a filter column when the question applies **regardless** of that dimension (e.g. any country).

---

## Conditional questions (follow-ups)

A sub-question row:

- References **`condition_source_question_id`** (the parent question’s ID).
- Sets **`condition_operator`**: `equals` (one answer) or `in` (several answers).
- Sets **`condition_value`**: e.g. `no` or `no|unknown`.

The tool only shows that row when the user’s answer to the source question matches.

---

## Concrete samples (`docs/examples/`)

Import with **Data → From Text/CSV** if needed and set delimiter to **Tab** (both sample files are TSV).

### Sample files

| File | Purpose |
|------|---------|
| [`sample_questions_minimal.tsv`](examples/sample_questions_minimal.tsv) | Short illustrative sheet (**4 rows**) — easy to skim in a meeting. |
| [`sample_questions_from_mock.tsv`](examples/sample_questions_from_mock.tsv) | **Full export from `tool-data.mock.json`** — **all 9 questions** with **`clarification_text`**, **`tools_labels` / `tools_urls`**, **`standards_labels` / `standards_urls`** (inline, no link IDs). Tab-separated. |
| [`examples/dictionaries/README.md`](examples/dictionaries/README.md) | Lists sample **dictionary** `.tsv` files (`modules`, countries, asset types, phases, **links**, …) to show how controlled vocabularies connect to the Questions sheet. |

The full Questions TSV mirrors the prototype dataset: multi-module rows (**INF_Q001**, **CROSS_Q_GOVERNANCE**), conditional follow-ups (**INF_Q001_A**, **NC_Q002_A**), and varied filters (e.g. **INF_Q002** `energy|transport`, **RE_Q002** `residential|commercial`).

Full column definitions and optional fields are in `Excel_Data_Structure_Proposal.md`.

---

## What we ask FfB / Quantis to deliver next

1. Adopt this workbook layout (or confirm small adjustments with us).
2. Fill **Dictionaries** first (codes your editors will use).
3. Add **10–15 real questions** per module using the **Questions** columns, including **at least three** conditional follow-ups.

After that we freeze **schema v1** and build the converter against your file.

---

## FAQ — fields people mix up

### `parent_question_id` vs `condition_source_question_id`

- **`condition_source_question_id`** (with operator + value) is what the **app uses** to show or hide a conditional row.
- **`parent_question_id`** helps **people** working in Excel group follow-up rows under the main question (sort/filter). Often it is the **same** ID as the condition source for a simple follow-up (e.g. INF_Q001_A depends on INF_Q001).

You can keep both columns aligned for clarity; the converter only **requires** the condition columns for logic.

### Where do clarifications, tools, and standards go?

- **Clarification:** **`clarification_text`** in the Questions row (simplest), or a shared snippet on another tab if text repeats everywhere.
- **Tools / standards:** use **`tools_labels`** + **`tools_urls`** and **`standards_labels`** + **`standards_urls`**. Each column uses **`|`** to separate multiple entries; **positions match** (first label ↔ first URL). No internal IDs — easier for editors.

### Dictionary tabs

See **`docs/examples/dictionaries/`** for sample `.tsv` files that mirror **`modules`**, **`countries`**, **`asset_types_by_module`**, **`asset_subtypes_by_asset_type`**, **`project_phases_by_module`**, **`answer_options`**, and **`links`**. Import each as its own sheet when presenting the workbook structure.

---

## One-line summary for the room

“We maintain **one Questions sheet**: each row is a question with filters and optional logic; **modules and lists** use **`|`**; **`ALL`** means any value on that axis; conditional rows use **condition_source_question_id** plus operator/value; **parent_question_id** is mainly for grouping rows in Excel.”
