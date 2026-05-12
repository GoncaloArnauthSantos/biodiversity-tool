# Dictionary tab samples (from `tool-data.mock.json`)

These `.tsv` files model separate sheets inside the **`Dictionaries`** workbook (or one Excel file with multiple tabs).

| File | Contents |
|------|----------|
| `modules.tsv` | Module IDs used in `Questions.modules` |
| `countries.tsv` | Country codes for `country_code` |
| `asset_types_by_module.tsv` | Asset types allowed per module |
| `asset_subtypes_by_asset_type.tsv` | Sub-types per asset type code |
| `project_phases_by_module.tsv` | **Phase codes depend on module** |
| `answer_options.tsv` | Fixed four answers (`yes`, `no`, `unknown`, `na`) |

**Tools and standards** are **not** listed here — they live **inline** on the Questions sheet (`tools_labels` / `tools_urls`, `standards_labels` / `standards_urls`). See `sample_questions_from_mock.tsv`.

These samples are **static documentation**; update them manually when the agreed Excel layout or mock data changes. The production pipeline will be **Excel → JSON** (converter to be defined later), not JSON → TSV.
