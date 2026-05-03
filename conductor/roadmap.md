# TaskDB Project Roadmap

## Vision
To provide a Notion-like database experience natively within Obsidian, where Markdown notes act as parent tasks and their internal headings (H1-H6) act as structured subtasks, seamlessly integrating free-form writing with database management.

---

## 🟢 Completed: Phase 0 - Foundation
*Establishing the core architecture and testing environment.*
- [x] Project scaffolding and build pipeline (esbuild, TypeScript).
- [x] Headless visual verification sandbox (Docker, Xvfb, Playwright/Scrot).
- [x] High-performance data extraction service parsing `app.metadataCache`.
- [x] Centralized state management using Zustand.

---

## 🟡 Up Next: Phase 1 - The Interactive Database View
*Making the database visible and native to the Obsidian interface.*
- **Core Objective:** Mount a React application within Obsidian that renders the parsed task data.
- **Key Deliverables:**
  - **View Registration:** Implement an Obsidian `ItemView` (for full-tab dashboards) and/or a Markdown code block processor (````taskdb````) for embedding.
  - **Table Implementation:** Integrate `TanStack Table` to render the data from the Zustand store.
  - **Native Styling:** Apply Obsidian's CSS variables to ensure the table matches the active theme seamlessly.
  - **Visual Verification:** Update the screenshot pipeline to capture the active React table rendering in the test vault.

---

## ⚪ Future: Phase 2 - Two-Way Data Binding
*Making the database interactive, allowing edits to persist back to the source Markdown.*
- **Core Objective:** Ensure any changes made in the UI safely and accurately update the underlying text files.
- **Key Deliverables:**
  - Implement a safe write mechanism using `app.vault.process`.
  - Handle title/heading renames directly from the table cells.
  - Manage real-time conflict resolution if a file is edited externally while the table is open.

---

## ⚪ Future: Phase 3 - Dynamic Properties & Filtering
*Achieving the true "Notion" feel with customizable columns and metadata.*
- **Core Objective:** Parse, display, and edit inline metadata (Dataview style) as table columns.
- **Key Deliverables:**
  - Extend the parser to recognize inline fields (e.g., `[priority:: high]`) beneath headings.
  - Dynamic column generation based on detected properties.
  - Implement column sorting, filtering, and hiding in the UI.
  - Support for different property types (Select, Multi-select, Date, Checkbox).
