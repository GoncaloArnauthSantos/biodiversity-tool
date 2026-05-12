# FfB Natural Capital Due Diligence Questionnaire
## Developer Briefing

## 1) Overview

The Finance for Biodiversity Foundation (FFB), in collaboration with Quantis, is developing an interactive screening tool to help users assess biodiversity and nature-related risks across different asset types:

- Infrastructure
- Natural Capital
- Real Estate

The tool should:

- Support early-stage screening
- Provide tailored recommendations
- Guide better nature-related decision-making

The tool will be publicly accessible, with potential future member login functionality.

The full questionnaire may include approximately 100 questions per subgroup (Infrastructure, Natural Capital, Real Estate), with only a relevant subset shown based on user selections (around 30 questions).

## 2) User Journey

The expected flow is:

1. User selects one of three tabs: Infrastructure, Real Estate, or Natural Capital.
2. User completes four mandatory filters:
   - Asset type
   - Asset sub-type
   - Project phase
   - Country
3. Based on the filters, a tailored questionnaire appears on a single page (left side).
4. Each question includes three clickable icons:
   - Clarifications
   - Tools
   - Standards
5. User answers each question with one of four options:
   - Yes
   - No
   - Not sure / Unknown
   - Not applicable
6. Some questions can be conditional (sub-questions).
7. Recommendations are triggered in real time and shown cumulatively in a dedicated right-side panel.
   - Max one recommendation per question
   - Not all answers trigger recommendations
8. At the end, users can generate:
   - A branded PDF report (recommendation summary)
   - An Excel export containing applicable questions and user responses

## 3) Core Functional Requirements

- Filter system to determine applicable questions
- Dynamic one-page questionnaire display (scroll flow + icon interactions)
- Answer capture with 4 options
- Basic conditional logic for sub-questions
- Recommendation engine updating the right-side panel dynamically
- PDF and Excel export
  - PDF: branded and recommendation-focused
  - Excel: only questions shown + answers provided

Optional behavior:

- `Not sure / Unknown` may trigger a relevant tools icon
- `Not applicable` may trigger the clarification icon

## 4) Content & Data

All questionnaire content will be provided by FFB and Quantis, including:

- Questions
- Answer logic
- Recommendations
- Supporting materials (clarifications, tools, references)

Current source of truth is Excel.

Developer responsibilities:

- Define a robust data structure
- Transform and integrate content into the application

Current Excel organization:

- One tab per asset type
- One board per sub-type
- Questions tagged by phase, outputs, tools, clarification

Excel format can be adapted to improve implementation efficiency.

## 5) Design & Communications

Key UI elements:

- Top filter section
- Central questionnaire area
- Right-side recommendation panel
- Per-question icons for clarifications, tools, and references

Additional notes:

- Brand guidelines (colors, spacing, typography, etc.) provided separately
- Icon style still to be decided (Laurence may provide, or they can be designed in brand style)
- PDF layout/design template provided separately (Word template)
- Placement on website: [Tools and Frameworks](https://www.financeforbiodiversity.org/tools-and-frameworks/)

## 6) Technical & Integration

The tool is expected to be embedded into the FFB website and hosted on FFB infrastructure.

## 7) MVP vs Nice-to-Have

Initial scope should stay focused on the core functionality above.

Identified but non-priority items for v1:

- User accounts and data storage (save/revisit projects)
- AI-assisted responses/prompts
- Upload pre-filled Excel files to auto-complete questionnaire

## 8) Timeline

- Internal prototype (Infrastructure + Natural Capital): target by end of September
- Public launch for Infrastructure module: target late November
- Additional modules: planned for early 2027

## 9) Open Points

- Final design decisions (Comms) and website integration details
- Data structure and questionnaire flow (IPLC dataset, topic vs granularity level)