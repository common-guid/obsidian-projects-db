# Track Specification: Phase 1 - Interactive Database View

## 1. Goal
Implement a visible, interactive database interface within Obsidian that renders task data from the Zustand store using React and TanStack Table.

## 2. Requirements
- Register a custom Obsidian `ItemView` and a `MarkdownPostProcessor` (code block) as UI entry points.
- Implement a `TanStack Table` component that consumes `ParentTask` and `Subtask` data.
- Apply Obsidian native CSS variables for theme-consistent styling.
- Ensure the React application mounts and unmounts correctly within the Obsidian lifecycle.
- Update the screenshot verification pipeline to capture the active UI.

## 3. Technical Constraints
- Must use `React` v18.3.1 as defined in the tech stack.
- Must use `TanStack Table` v8 for the grid implementation.
- UI must be responsive to sidebar/panel width changes.
- All styles must use CSS variables (e.g., `--text-normal`, `--background-primary`) to support Light/Dark mode automatically.
