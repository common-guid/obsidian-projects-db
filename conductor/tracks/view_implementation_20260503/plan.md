# Implementation Plan: Phase 1 - Interactive Database View

## Phase 1: View Infrastructure
- [ ] Task: Register TaskDB View
    - [ ] Create `TaskDBView` class extending `ItemView`.
    - [ ] Add a ribbon icon and command to open the view.
- [ ] Task: React Mounting Logic
    - [ ] Create a `Root` component as the React entry point.
    - [ ] Implement mounting/unmounting in `TaskDBView.onOpen` and `onClose`.

## Phase 2: Table Implementation
- [ ] Task: Basic Table Component
    - [ ] Implement `TanStack Table` with "Name" and "Type" columns.
    - [ ] Connect the table to `useTaskStore` to display live vault data.
- [ ] Task: Native Styling
    - [ ] Apply Obsidian-themed CSS to the table (borders, headers, hover states).
    - [ ] Ensure layout responsiveness.

## Phase 3: Verification & Polish
- [ ] Task: Markdown Code Block Integration
    - [ ] Register `registerMarkdownCodeBlockProcessor` for `taskdb` blocks.
    - [ ] Reuse the Table component for embedded rendering.
- [ ] Task: Update Screenshot Pipeline
    - [ ] Modify `tests/verification.test.tsx` or create a new test to capture the active React UI.
    - [ ] Run `capture-obsidian.sh` to confirm visual correctness.
- [ ] Task: Conductor - User Manual Verification 'Phase 1: Interactive Database View'
