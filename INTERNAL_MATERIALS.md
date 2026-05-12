# Materials excluded from this public repository

Some paths are listed in `.gitignore` so they are **not committed** when you work against a public or shared remote.

Typical contents (maintain **locally**, in `private/`, or in an **internal** repository):

- Original stakeholder briefings and meeting agendas  
- Host-specific WordPress / theme / hosting notes (where the tool will ship)  
- Detailed spreadsheet column specifications and brand typography guides  
- Any full-site or CMS mirror used only for local integration testing

If you cloned this repo and need those artefacts, obtain them from the project maintainer or your team’s internal documentation store.

**Note:** If a file was ever committed before it was ignored, older commits may still contain it. For a fully clean public history, coordinate a history rewrite (e.g. `git filter-repo`) with anyone who has already cloned the repo.
