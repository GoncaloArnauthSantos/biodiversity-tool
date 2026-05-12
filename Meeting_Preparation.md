# FfB Project Meeting Preparation

This document is designed to help run the next project meeting with clear outcomes.

## 1) Meeting Goals

- Confirm technical access and delivery constraints.
- Align on MVP scope and freeze line.
- Agree Excel structure for reliable Excel -> JSON conversion.
- Confirm timeline, ownership, and next actions.

## 2) Suggested Agenda (45-60 min)

1. Context and objective recap (5 min)  
2. MVP walkthrough using mocked prototype (10-15 min)  
3. Data model and Excel structure alignment (15 min)  
4. WordPress/infrastructure integration decisions (10 min)  
5. Timeline, responsibilities, next milestones (5-10 min)

## 3) What to Show in Demo

- Module tabs: Infrastructure / Natural Capital / Real Estate
- 4 mandatory filters
- Conditional sub-questions triggered by answers
- 4 answer options: Yes / No / Not sure / Not applicable
- Right panel with cumulative recommendations
- Clarification, tools and standards per question

Objective of the demo: identify missing logic cases and missing data fields before implementation starts.

## 4) Questions to Ask the Client (Critical)

### Access and integration

- Can you provide valid WordPress/hosting access and a staging environment?
- Where should this tool live in the current website structure?
- Do you prefer shortcode embed, custom plugin, or custom page template?
- Who approves production deployment?

### Data and logic

- Who is the owner of questionnaire content and final logic sign-off?
- Are we aligned on one canonical Excel structure for all modules?
- Can we limit conditional logic in MVP to one-level conditions (no deep nested logic)?
- Which answer values should trigger recommendations or icons by default?

### Export outputs

- What is the minimum acceptable PDF quality for MVP?
- Should Excel export contain only answered questions or all applicable questions?
- Are there branding or legal statements required in exports?

### Timeline and scope control

- What is the exact MVP feature list for late November?
- Which requested items are explicitly out-of-scope for MVP?
- What is the date for content freeze (Excel freeze)?

## 5) Proposed MVP Scope (Recommend Confirming)

- Embedded questionnaire in WordPress
- Module tabs + 4 mandatory filters
- Dynamic question rendering with one-level conditional questions
- 4 fixed answer options
- Cumulative recommendation panel
- Basic support cards: clarification/tools/standards
- Excel export and basic branded PDF export

Out of scope for MVP:

- User accounts / saved sessions
- AI-assisted answers
- Uploading pre-filled files
- Advanced analytics dashboard

## 6) Risks and Mitigations

- **Risk:** credentials/environment delays  
  **Mitigation:** request working staging access this week; no implementation without access confirmation.

- **Risk:** Excel structure keeps changing  
  **Mitigation:** freeze schema first, allow content changes later without schema changes.

- **Risk:** uncontrolled feature growth  
  **Mitigation:** define MVP acceptance checklist and formalize post-MVP backlog.

- **Risk:** conditional logic becomes too complex  
  **Mitigation:** MVP rule engine limited to `equals` and `in` with one-level depth.

## 7) Decisions to Close in This Meeting

- Integration method in WordPress
- Final MVP list
- Excel schema approval
- Content owner and sign-off process
- Deadline for sample data and content freeze

## 8) Immediate Next Steps After Meeting

1. Client sends fixed access credentials + staging URL.  
2. Client delivers 10-15 sample questions using approved Excel schema.  
3. Developer validates schema and creates Excel -> JSON converter v1.  
4. Build starts on production architecture with phased milestones.
