# FfB Questionnaire - Excel Structure Proposal (for Excel -> JSON)

This document defines a practical Excel structure that:

- is easy for non-technical teams to maintain,
- supports conditional questionnaire logic,
- and can be reliably converted into JSON with a script.

For a **shorter guide** aimed at client workshops (plus a concrete `.tsv` sample), see **`docs/Excel_Structure_Client_Guide.md`**.

## 1) Recommended Workbook Layout

Use one Excel workbook with these tabs:

- `README` - short instructions for content editors
- `Dictionaries` - controlled vocabularies (asset types, phases, countries, etc.)
- `Questions` - all questions and conditional rules (main tab)
- `Recommendations` - optional central repository for recommendation text
- `Links` - optional central list of tools/standards/clarifications

For MVP, only `Dictionaries` + `Questions` are mandatory.

## 2) Why a Single Questions Tab

Avoid "one board per subtype" for logic-heavy tools. It creates duplicate rules and errors.

A single tab enables:

- one source of truth,
- easier filtering and QA,
- simpler Excel -> JSON transformation,
- easier future scaling to additional modules.

## 3) Questions Tab - Required Columns

Each row should represent one question node (main or conditional sub-question).

### Identity and hierarchy

- `question_id` (text, required, unique)  
  Example: `INF_Q001`, `INF_Q001_1`
- `parent_question_id` (text, optional)  
  Empty for top-level questions; set when this is a sub-question *for editorial grouping / sorting in Excel* (see **Parent vs condition** below).
- `is_conditional` (TRUE/FALSE, required)
- `display_order` (number, required)
- `is_active` (TRUE/FALSE, required)

### Module and filters

- `modules` (required)  
  One or more of: `infrastructure`, `natural_capital`, `real_estate`. In Excel use `|` to separate multiple modules (example: `infrastructure|natural_capital`).
- `asset_type` (required)  
  Use dictionary code; for multiple values use `|` separator (example: `solar|wind`)
- `asset_subtype` (required)  
  Same multi-value rule
- `project_phase` (required)  
  Same multi-value rule. **Allowed phase codes depend on module** — maintain a `Project_phases_by_module` dictionary so editors only pick valid combinations per asset context.
- `country_code` (required)  
  ISO code (`PT`, `FR`, `DE`) or `ALL`

### Question and answer setup

- `question_text` (required)
- `answer_type` (required)  
  MVP: fixed to `single_choice_4`
- `answer_options` (required)  
  Fixed string for MVP: `yes|no|unknown|na`

### Parent question vs condition source (when both exist)

| Field | Role |
|-------|------|
| **`condition_source_question_id`** (+ `condition_operator` + `condition_value`) | **Runtime rule:** which prior question’s answer must match for **this row to appear**. Required for the engine whenever the row is conditional. |
| **`parent_question_id`** | **Editorial / workbook UX:** “this row belongs under question X” for sorting, filtering, or documentation. Often **the same ID** as `condition_source_question_id` for simple follow-ups (e.g. INF_Q001 → INF_Q001_A). |

Do you need both?

- **The engine only needs the condition columns** to decide visibility.
- **`parent_question_id` is still useful** in Excel so editors can group sub-questions under the main question and validate pairs by eye.
- If they are always identical for your flows, the converter may **auto-fill** `parent_question_id` from `condition_source_question_id` when left blank (implementation choice).

### Conditional logic (for sub-questions only)

- `condition_source_question_id` (optional)
- `condition_operator` (optional)  
  MVP allowed operators: `equals`, `in`
- `condition_value` (optional)  
  Example: `no` or `unknown|na`
- `condition_group` (optional)  
  If multiple conditions exist, rows sharing same group are evaluated with `AND` in MVP

### Content links / metadata (resources)

**Clarifications — pick one pattern:**

- **Inline (recommended for most editorial teams):** `clarification_text` — full paragraph in the Questions row.
- **Centralised:** `clarification_id` — pointer to a shared snippet on a `Clarifications` tab (useful if the same text is reused in many rows).

**Tools and standards — recommended for non-technical editors (no IDs):**

Use **parallel columns** with the **same number of pipe-separated values** in each pair (1st label ↔ 1st URL, 2nd ↔ 2nd, …):

- `tools_labels` — e.g. `IBAT|ENCORE`
- `tools_urls` — e.g. `https://www.ibat-alliance.org/|https://encore.naturalcapital.finance/`
- `standards_labels` — e.g. `TNFD LEAP|IFC PS6`
- `standards_urls` — matching URLs in the same order

Leave a pair empty if a question has no tool or no standard. The Excel → JSON script splits on `|` and zips label + URL.

**Optional pattern for large catalogues (same URL reused 50+ times):** a `Links` tab with `link_id` and reference columns `tools_ids` / `standards_ids` on **Questions** — only worth the indirection if editors are trained and duplication is a real problem. For FfB-style workflows, **inline label+URL columns are usually simpler**.

Optional:

- `clarification_id` (optional, if not using `clarification_text`)
- `topic_tags` (optional, multi-value `|`)

### Recommendation mapping

Either keep text directly in the row or use IDs pointing to `Recommendations` tab.

Option A (simpler):
- `recommendation_yes`
- `recommendation_no`
- `recommendation_unknown`
- `recommendation_na`

Option B (cleaner at scale):
- `recommendation_yes_id`
- `recommendation_no_id`
- `recommendation_unknown_id`
- `recommendation_na_id`

## 4) Logic Rules for Editors (must be explicit)

- `question_id` must be unique forever (never reuse IDs).
- If text changes, keep ID and update only content columns.
- Use dictionary codes, not free text, in filter columns.
- Multi-values always use `|` separator, no commas.
- Conditional questions must have `parent_question_id` and condition fields filled.
- Do not leave required cells blank.

## 5) Minimal MVP Conditional Model

To keep implementation stable for v1:

- Support only conditions based on one previously answered question.
- Support operators: `equals` and `in`.
- Support only `AND` inside condition groups.
- No nested multi-level condition trees beyond one level in MVP.

This avoids complex rule engines while still supporting practical flows.

## 6) Example Rows (Questions tab)

| question_id   | parent_question_id | is_conditional | modules                      | asset_type | asset_subtype | project_phase | country_code | question_text                                           | answer_options        | condition_source_question_id | condition_operator | condition_value | recommendation_no |
|---------------|--------------------|----------------|------------------------------|------------|---------------|---------------|--------------|---------------------------------------------------------|-----------------------|------------------------------|-------------------|-----------------|-------------------|
| INF_Q001      |                    | FALSE          | infrastructure|natural_capital | ALL        | ALL           | planning      | ALL          | Has a biodiversity baseline been completed?             | yes|no|unknown|na    |                              |                   |                 | Start with baseline mapping using ... |
| INF_Q001_1    | INF_Q001           | TRUE           | infrastructure               | ALL        | ALL           | planning      | ALL          | Is baseline work scheduled before financial close?      | yes|no|unknown|na    | INF_Q001                     | equals            | no              | Add milestone and assign owner ... |

## 7) Excel -> JSON Output Shape (target)

The script should produce a JSON object like:

```json
{
  "version": "2026-05-06",
  "questions": [
    {
      "id": "INF_Q001",
      "modules": ["infrastructure", "natural_capital"],
      "filters": {
        "asset_type": ["ALL"],
        "asset_subtype": ["ALL"],
        "project_phase": ["planning"],
        "country_code": ["ALL"]
      },
      "text": "Has a biodiversity baseline been completed?",
      "answers": ["yes", "no", "unknown", "na"],
      "conditions": [],
      "recommendations": {
        "yes": "",
        "no": "Start with baseline mapping using ...",
        "unknown": "",
        "na": ""
      }
    }
  ]
}
```

## 8) Validation Checklist Before JSON Export

- No duplicate `question_id`
- All required columns present
- All required fields filled
- All dictionary-coded fields match existing dictionary values
- All `condition_source_question_id` values exist
- No cyclic conditional references
- No invalid answer values in `condition_value`

## 9) Suggested Next Step with FfB

Ask them to deliver:

1. one sample Excel using this structure with 10-15 realistic questions,  
2. one example per module,  
3. at least 3 conditional sub-question examples.

Then implement the converter against that sample and freeze the schema.
