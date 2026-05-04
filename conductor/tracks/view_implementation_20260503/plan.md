# Implementation Plan: Phase 1 - Interactive Database View

## Phase 1: View Infrastructure
- [x] Task: Register TaskDB View (c725310)
    - [x] Create `TaskDBView` class extending `ItemView`.
    - [x] Add a ribbon icon and command to open the view.
- [x] Task: React Mounting Logic (e5925ea)
    - [x] Create a `Root` component as the React entry point.
    - [x] Implement mounting/unmounting in `TaskDBView.onOpen` and `onClose`.

## Phase 2: Table Implementation [checkpoint: bd5f3f2]
- [x] Task: Basic Table Component (46fca9c)
    - [x] Implement `TanStack Table` with "Name" and "Type" columns.
    - [x] Connect the table to `useTaskStore` to display live vault data.
- [x] Task: Native Styling (dd42521)
    - [x] Apply Obsidian-themed CSS to the table (borders, headers, hover states).
    - [x] Ensure layout responsiveness.

## Phase 3: Verification & Polish
- [x] Task: Markdown Code Block Integration (328aa24)
    - [x] Register `registerMarkdownCodeBlockProcessor` for `taskdb` blocks.
    - [x] Reuse the Table component for embedded rendering.
- [x] Task: Update Screenshot Pipeline (680d4db)
    - [x] Modify `tests/verification.test.tsx` or create a new test to capture the active React UI.
    - [x] Run `capture-obsidian.sh` to confirm visual correctness.
- [ ] Task: Conductor - User Manual Verification 'Phase 1: Interactive Database View'
