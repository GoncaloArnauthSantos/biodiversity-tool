# Client meeting brief — professional tone

Goal: explain the solution clearly, align expectations, secure what you need, and surface risks. First meeting of this kind: use this as a backbone, not a script to read word-for-word.

---

## 1. Core message (opening, ~2 min)

**Proposal:** A screening tool with dynamic questionnaire, recommendations, and exports (per agreed phases). Editorial content stays **theirs** (Excel → conversion process → JSON). WordPress **publishes** the tool on the official site with the same global look (header, navigation, SEO).

**Why not “page builder only”:** question volume, filters, and conditional logic make maintaining everything as WPBakery blocks costly and error-prone. The standard approach here is an **embedded application** (JavaScript) delivered through a **light plugin**.

---

## 2. What we deliver (product)

Aligned with the FfB briefing:

- Three contexts (tabs) and mandatory filters.
- Conditional questions and four answer options.
- Recommendations panel while the user progresses.
- Per-question support content (clarifications, tools, references).
- Integration on the current site via **plugin + dedicated page** (Tools & Frameworks section or equivalent).

**Data:** Excel as working source; agreed schema to produce JSON consumed by the tool.

**Questionnaire updates:** expected **infrequently** (e.g. annual reviews), so a complex per-question editor in WordPress is **not** required for v1 — **replacing the data file** when a new approved version exists is enough.

---

## 3. How it fits their WordPress (minimal jargon)

1. Install a **plugin** containing the tool code.
2. Create a **page** where you place a **shortcode** (one line), like a component.
3. Visitors see the normal site page (header, footer) and the tool **in the content**.

We avoid pasting large scripts into WPBakery; that approach breaks easily as you iterate.

---

## 4. Concrete asks (what to leave the room with)

| Ask | Why |
|-----|-----|
| **Draft test page** and permission to install the plugin for **testing** before going public | Validate integration without visitor risk |
| **One contact who can approve** site publication and production changes | Avoid last-minute blocks |
| **Backup confirmation** before material changes (they already have DB listings on Greenhost) | Operational safety |
| **Excel schema freeze** (v1) once they are comfortable | Less rework on converter and frontend |
| **Real sample** in the new format (15–20 rows per module if possible) | Validate Excel → JSON pipeline |
| **Decision on who uploads** JSON later (you vs a trained WP editor) | Drives whether we add simple admin UI |
| **Design alignment:** final brand PDF + font confirmation (e.g. Lato/Lora) | Consistent PDF and UI |

---

## 5. Questions to ask (checklist)

**Product and content**

- Who **owns** the Excel and final conditional-logic sign-off?
- Is there a **target date** to freeze content for the first public release?
- Single global questionnaire or **future language variants**?

**WordPress and operations**

- Is there a **staging** URL, or only production + draft pages?
- Who has **admin access** and who can **install plugins**?
- **Caching** or CDN in front of the site that could delay seeing updates after file swaps?

**Design and outputs**

- Must the output PDF **strictly** follow an existing Word template?
- Should Excel export include **only answered** questions or **all applicable** questions?

**Budget and phases**

- What is **mandatory** for the first public delivery vs **nice-to-have** billed separately (login, AI, pre-filled Excel upload, etc.)?

---

## 6. Risks to mention frankly (no drama)

| Risk | How we mitigate |
|------|------------------|
| Excel content shifting during build | Freeze schema + changes only via numbered versions |
| Visual clashes with Total theme | Prefixed CSS + early test on a draft page |
| Expectation of “edit everything in WP like a block” | Explain Excel → JSON flow; optional later admin JSON upload |
| Tight briefing timelines | Prioritise MVP + explicit exclusions |
| Heavy PDF/Excel in v1 | Phase: working MVP first, polish branding after |

---

## 7. Meeting outcomes (close with this)

By the end:

1. **Shared understanding** of architecture (app + plugin + WP).
2. **Agreed list** of first-phase deliverables and deferred items.
3. **Asks above** answered or scheduled.
4. **Next step** with a date (sample Excel, test page, first plugin drop).

---

## 8. If you stall mid-meeting

- Fall back to the elevator pitch (section 10 of `Solution_Reference.md`).
- Say: “This is the usual pattern for interactive tools on sites like yours; WordPress remains the publishing system.”
- Always propose **one decision** or **dated next step**, even if small.

---

## 9. Suggested tone

Confident, collaborative, transparent about trade-offs. You do not need to know every WordPress detail — you know **where** the tool lives and **why**; the rest is implementation detail once the environment is real.
