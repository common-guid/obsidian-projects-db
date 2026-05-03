# Track Specification: Phase 2 - Two-Way Data Binding

## 1. Goal
Implement a robust mechanism to persist changes made in the TaskDB UI back to the underlying Markdown files in the Obsidian vault, ensuring data integrity and handling concurrent edits.

## 2. Requirements
- **Atomic Writes:** Use `app.vault.process` for all file updates to prevent data loss and ensure atomic operations.
- **Parent Task Renaming:** Support renaming files when the "Name" property of a Parent Task is edited.
- **Subtask Heading Updates:** Support updating heading text in Markdown files when a Subtask name is edited in the table.
- **Status Toggling:** Synchronize task status (e.g., `[ ]` to `[x]`) between the UI and Markdown.
- **Conflict Management:** Detect if a file has changed on disk since it was last read and prompt the user or handle the merge safely.
- **Optimistic UI Updates:** Update the Zustand store immediately and revert if the file write fails.

## 3. Technical Constraints
- Must adhere to the existing `TaskStore` architecture.
- All file operations must use the Obsidian `Vault` API.
- Must handle edge cases like invalid file characters and duplicate file names.
