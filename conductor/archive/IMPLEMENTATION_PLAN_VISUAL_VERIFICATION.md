# Implementation Plan: Visual Verification of Task Manager Plugin

## Goal
Provide instructions and a reproducible environment for visual verification of the Task Manager plugin's UI changes (Notion-style tag pills and position-based correlation).

## Status
Automated unit and component tests have been implemented and are passing:
- `tests/heading-mapper.test.ts`: Verifies position-based tag correlation and prevents bubbling.
- `tests/table-component.test.tsx`: Verifies conditional styling (pills vs. plain text).

## Visual Verification Environment
A dedicated visual verification app has been created in the `tests/` directory:
- `tests/VisualVerification.tsx`: A React app that renders the `TaskTable` with a complex dataset.
- `tests/index.html`: Host page for the verification app.
- `tests/visual_bundle.js`: Bundled verification app.

### Manual Verification Steps (For User)
Since the headless browser environment is restricted, the user can verify the changes following these steps:

1. **Option A: Browser-based verification**
   - Run a local static server in the project root: `npx http-server . -p 8080`
   - Open a browser to: `http://localhost:8080/tests/index.html`
   - **Verification Points:**
     - The `update vpn configs.md` row should show tags in their correct columns.
     - Only the "active" level tags (lowest level in the row) should have the light purple pill background.
     - Parent level tags should be plain grey text.

2. **Option B: Obsidian-based verification (Primary)**
   - Run `npm run build` (already completed) to deploy the plugin to `test-vault`.
   - Open the `test-vault` in Obsidian.
   - Open a note or base that utilizes the `task-table` view.
   - **Verification Points:**
     - Tags should appear below the heading text in the table cells.
     - Confirm the "AI/project" tag has a subtle purple background and grey text when it is the active level.
     - Confirm that tags do not "bubble up" to parent headings (e.g., a tag on H2 should not appear in the H1 column).

## Success Criteria
- [ ] UI matches the Notion-style aesthetic described (pills for active, text for parents).
- [ ] Tag correlation logic is verified visually to match the structure in `file.png` and `base.png`.
