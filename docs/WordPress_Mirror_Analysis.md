# WordPress mirror — structure and integration notes

Based on `financeforbiodiversity.org.mirrow/DEFAULT/` (main site root used in production).

## 1. What the mirror contains

| Area | Path (under `DEFAULT/`) | Note |
|------|-------------------------|------|
| **WordPress core** | `wp-admin/`, `wp-includes/`, `wp-*.php` | Standard; do not edit. |
| **Content** | `wp-content/` | Themes, plugins, uploads (large). |
| **Active stack** | `wp-content/themes/total-child-theme/` (child) + `Total/` (parent) | Confirmed. |
| **Other top-level folders** in the full mirror (`catalog/`, `data/`, `test/`, etc.) | Mixed | `test/` can be a second WP copy or staging — treat as reference only. |
| **Nested copy of this repo** | `data-catalogue/.../biodiversity-tool-prototype/` | Looks like an uploaded duplicate of the prototype; not the live theme source. |

**Takeaway:** treat **`DEFAULT/wp-content/themes/total-child-theme/`** as the real customisation layer for the public site.

## 2. Child theme — how styles are built

- **Source SCSS:** `assets/scss/` — `custom.scss` compiles to `assets/css/custom.css` (very large single file).
- **Design tokens** (aligned with your `Font_Template.md`): `assets/scss/inc/_variables.scss`
  - `$indigo: #28286C`
  - `$hanBlue: #5C71D7`
  - `$emerald: #50c27b`
  - Breakpoints: `$small`, `$medium`, `$large`, etc.
- **Typography:** `assets/scss/inc/_typography.scss` — Lato referenced (fonts may be loaded globally elsewhere).
- **Live `#wrap`:** compiled CSS sets `#wrap { font-family: "Lato", sans-serif; color: #28286C; line-height: 1.4; }` and container max-width ~1440px (rem-based).

## 3. Parent Total theme

- **`Total/assets/css/wpex-custom-properties.css`** defines `:root` variables (`--wpex-text-*`, `--wpex-surface-*`, `--wpex-accent`, `--wpex-rounded-*`, shadows, etc.).
- When our tool runs **inside** WordPress, those variables exist globally; we can optionally reference them for closer native feel.

## 4. Relevance to “Tools & frameworks”

- **`assets/scss/pages/_frameworks-tools.scss`** styles `.frameworks-tools` under `#wrap` (hero row, grid cards, Lato, emerald links).
- Naming uses an **`ffb-`** prefix for blocks (e.g. `.ffb-text`, `.ffb-frameworks-tools-grid`). Our embedded tool should use a similar wrapper class (e.g. `.ffb-biodiversity-tool`) so future SCSS can live next to this page if needed.

## 5. Does our solution still fit?

**Yes.** Nothing in the mirror changes the architecture:

- Complex questionnaire + JSON + plugin/shortcode remains correct.
- Child theme already loads **`custom.css`** and **`main.min.js`** as ES modules — using **`type="module"`** for our bundle is consistent with their stack.

What the mirror **does** change: we should **reuse brand tokens and typography** (Lato, indigo/blue/green, spacing) so the tool does not look like a separate product inside `#wrap`.

## 6. Practical integration checklist

1. Enqueue **`ffb-biodiversity-tool.css`** from the plugin (or register extra SCSS in child theme later) scoped under **`.ffb-biodiversity-tool`**.
2. Prefer **CSS variables** in that file: map FFB palette first; optionally fall back to `--wpex-*` where it improves parity with Total.
3. Avoid fighting `#wrap .container` padding — usually wrap only the shortcode output in one inner container if needed.
4. Keep **`financeforbiodiversity.org.mirrow`** **gitignored** if this repo is published (large dump + possible uploads).

## 7. Mirror hygiene

- **Do not commit** the full 4 GB mirror to Git.
- Add `financeforbiodiversity.org.mirrow/` to `.gitignore` if not already ignored.
