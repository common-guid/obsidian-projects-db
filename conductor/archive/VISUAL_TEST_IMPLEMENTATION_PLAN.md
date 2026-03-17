# Implementation Plan: Visual Verification of Task Manager Plugin

## Goal
Provide a visual rendering and screenshot of the Task Manager plugin (specifically the TaskTable component with Notion-style tag pills) to verify the UI changes.

## Proposed Strategy: Browser-based Mock Rendering
Since the Obsidian desktop application is not available for direct interaction, we will create a dedicated rendering script that uses our existing React components to display a sample Task Table in a browser environment.

### 1. Create a Rendering Entry Point (`tests/VisualVerification.tsx`)
- Create a simple React application that:
  - Imports `TaskTable` and the updated `styles.css`.
  - Defines a rich dataset of `HeadingTask` objects, including headings with tags at various levels to demonstrate:
    - Position-based tag correlation (tags below headings).
    - Conditional styling (pills for active level, plain text for parents).
    - Notion-style aesthetics (purple pills, grey text).
  - Renders the `TaskTable` into the DOM.

### 2. Set Up a Temporary Web Server
- Use a lightweight server (e.g., `esbuild` serve or a simple Node.js static server) to serve the bundled `VisualVerification.tsx` and `styles.css`.
- Bundle the verification app using the existing `esbuild` configuration.

### 3. Capture Screenshot with Browser Tools
- Use the `mcp_chrome-devtools_new_page` tool to navigate to the locally served verification page.
- Use `mcp_chrome-devtools_take_screenshot` to capture the rendered table.
- Save the screenshot to `scratch/visual_verification_result.png`.

### 4. Provide Verification to User
- The screenshot will be provided as an attachment/reference in the task summary.
- The user can review the visual representation of:
  - Correct tag placement (no bubbling).
  - Correct pill styling (purple background, grey text).
  - Correct hierarchy rendering.

## Verification Data Script (Pseudo-code)
```typescript
const sampleTasks = [
  {
    file: 'Project-A.md',
    h1: { text: 'Main Project', tags: ['important'] },
    h2: { text: 'Sub-task', tags: ['active-tag', 'dev'] },
    level: 2,
    text: 'Sub-task',
    tags: ['active-tag', 'dev']
  },
  // Additional scenarios for bubbling and styling verification...
];
```

## Success Criteria
- [ ] A clear, high-resolution screenshot is generated.
- [ ] The screenshot accurately reflects the Notion-style UI and tag correlation logic.
- [ ] The user can confirm the visual correctness of the implementation.

