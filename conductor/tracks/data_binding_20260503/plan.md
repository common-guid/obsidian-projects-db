# Implementation Plan: Phase 2 - Two-Way Data Binding

## Phase 1: Core Write Infrastructure
- [ ] Task: Implement VaultWriter Utility
    - [ ] Create a service to wrap `app.vault.process`.
    - [ ] Implement safe heading replacement logic (Regex-based or AST-based).
- [ ] Task: Store Integration
    - [ ] Add `updateTask` action to `useTaskStore`.
    - [ ] Implement optimistic updates and rollback logic.

## Phase 2: UI Interactions
- [ ] Task: Editable Table Cells
    - [ ] Implement inline editing for the TanStack Table.
    - [ ] Trigger store actions on blur or enter.
- [ ] Task: File & Heading Synchronization
    - [ ] Connect "Name" edits to `vault.rename` (for files) and heading updates.
    - [ ] Handle task status toggling.

## Phase 3: Robustness & Verification
- [ ] Task: Conflict Detection
    - [ ] Compare `mtime` or content hashes before writing.
    - [ ] Implement a simple "File Changed" notification/warning.
- [ ] Task: Verification & Polish
    - [ ] Comprehensive unit tests for file writing logic.
    - [ ] Manual verification of two-way sync in the test vault.
    - [ ] Conductor - User Manual Verification 'Phase 2: Two-Way Data Binding'
