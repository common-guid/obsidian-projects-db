# Implementation Plan: Move Toggle to File Column

This plan outlines the steps to move the hierarchical toggle from the heading cells to the "File" column, replacing the file icon for rows that have subtasks.

## Objective
Refine the UI to use a standard "Tree Table" pattern where the expansion control is located in the first column, keeping the content columns (H1-H6) clean.

## Key Changes

### 1. UI Component (`src/components/TaskTable.tsx`)
- **First Column Update**: In the `TaskRow` component, modify the first `<td>` (File column).
    - If `task.hasChildren` is true: Render the `Chevron` component.
    - Else: Render the standard `FileIcon`.
- **Remove Old Toggle**: Delete the logic that renders the `Chevron` inside the `renderCell` function.
- **Event Handling**: Update the `onClick` handler for the File cell to ensure `e.stopPropagation()` on the toggle button works correctly, preventing the file from opening when just expanding/collapsing.

### 2. Styling (`styles.css`)
- Ensure the `toggle-button` and `FileIcon` have identical dimensions (16x16px).
- Maintain consistent spacing between the icon/toggle and the filename.
- Ensure the `file-icon-wrapper` uses flexbox for perfect vertical alignment.

### 3. Verification & Testing
- **Unit Tests**: Update `tests/table-component-hierarchy.test.tsx` to verify:
    - The toggle button exists in the first column for parent rows.
    - The file icon exists in the first column for leaf rows.
    - The heading columns (H1-H6) no longer contain toggle buttons.
- **Manual Check**: Verify alignment in the Obsidian view using the `nesting-test.md` file.

## Execution Steps
1.  Apply code changes to `src/components/TaskTable.tsx`.
2.  Apply CSS refinements to `styles.css`.
3.  Update and run automated tests.
4.  Build and deploy to `test-vault`.
