### Phased Implementation Plan (with Testing & Success Criteria)

#### Phase 1: Foundation & Data Aggregation (The Engine)
**Goal:** Set up the plugin environment and successfully parse the vault to identify Parent Tasks (Notes) and Subtasks (Headings).

1.  **Scaffolding:** Initialize the plugin using the official Obsidian template, configure TypeScript, esbuild, and React.
2.  **Data Extraction Service:** Build the background service listening to `app.metadataCache`.
3.  **State Management:** Create a centralized store (e.g., Zustand) to hold the parsed data.

**✅ Success Criteria & Testing (Phase 1)**
* **Unit Tests:**
    * `parseFileCache()`: Pass a mocked `CachedMetadata` object with 3 headings and frontmatter. Assert that it returns exactly 1 Parent Task object and 3 Subtask objects.
    * `headingLevelFilter()`: Ensure that ignoring specific heading levels (e.g., H6) correctly omits them from the returned array.
* **Integration/Manual Tests:**
    * Create a "Test Vault" with 5 markdown files containing various heading hierarchies.
    * Open Obsidian. The plugin's background service should `console.log` the exact number of files and headings without throwing parsing errors.
* **Acceptance Criteria:** * The centralized data store successfully populates on plugin load.
    * Adding a new file with a heading to the vault automatically updates the store state in the background.

#### Phase 2: Read-Only Database UI (The View)
**Goal:** Render the aggregated data into a Notion-style table inside an Obsidian workspace leaf.

1.  **Custom ItemView:** Register a custom `ItemView` and mount the React root.
2.  **Table Implementation:** Implement TanStack Table with dynamic columns (Task Name, Type, Parent Note, Level).
3.  **Navigation:** Wire up row clicks to `app.workspace.openLinkText()`.

**✅ Success Criteria & Testing (Phase 2)**
* **Unit Tests:**
    * `TableRenderer`: Use React Testing Library to mount the table with mock store data. Assert that exactly X rows and Y columns render.
    * `AnchorLinkGenerator`: Pass a file name ("Project A") and heading ("Design Phase"). Assert it outputs `Project A#Design Phase`.
* **Integration/Manual Tests:**
    * Clicking a Parent Task row securely opens the note in the active editor pane.
    * Clicking a Subtask row opens the note and scrolls directly to the heading anchor.
* **Acceptance Criteria:**
    * The Custom View can be opened via the Command Palette (`Ctrl/Cmd + P` -> "Open TaskDB View").
    * The view persists when dragged into the right/left sidebar or bottom panel.
    * Data displayed in the table perfectly mirrors the contents of the Test Vault.

#### Phase 3: Metadata & Interactivity (Two-Way Binding)
**Goal:** Allow users to add properties (Status, Due Date) to subtasks and edit them directly from the table, modifying the underlying Markdown.

1.  **Schema Definition:** Parse inline fields (e.g., `[status:: In Progress]`) below headings.
2.  **Write-back Service:** Implement `app.vault.process()` to safely mutate the raw markdown string.
3.  **Rename/Edit functionality:** Allow editing the heading text from the table.

**✅ Success Criteria & Testing (Phase 3) *[CRITICAL PHASE]* **
* **Unit Tests:**
    * `InlineFieldRegex`: Test regex extraction against various Markdown edge cases (e.g., fields with spaces, fields spanning multiple lines, malformed brackets).
    * `MarkdownMutator`: Pass a mock string of markdown, a target heading, and a new status. Assert that *only* the specific inline field is changed, and the rest of the markdown string remains 100% identical (no data loss).
* **Integration/Manual Tests:**
    * Change a subtask's status in the Table UI. Verify that the corresponding markdown file updates on disk within 100ms.
    * Rename a subtask in the Table UI. Verify that the `# Heading` text in the markdown file changes, *and* that the table immediately reflects the change without duplicating the row.
* **Acceptance Criteria:**
    * Modifying an inline field via the table does not overwrite or delete any standard markdown text beneath the heading.
    * If a user types a duplicate heading name (e.g., two `## Setup` headings in one file), the write-back service correctly uses the `position` data from the `MetadataCache` to update the correct instance.

#### Phase 4: Polish & Advanced Features
**Goal:** Turn the proof-of-concept into a production-ready power tool capable of handling large vaults.

1.  **Filtering & Sorting:** Add UI controls above the table.
2.  **Views:** Save different table configurations into `data.json`.
3.  **Performance Optimization:** Implement debouncing for metadata cache updates.

**✅ Success Criteria & Testing (Phase 4)**
* **Unit Tests:**
    * `FilterLogic`: Assert that filtering by "Status = To Do" correctly reduces the data array.
    * `PluginSettings`: Assert that saving a new View layout correctly serializes to a JSON object.
* **Integration/Manual Tests (Performance):**
    * **Stress Test Vault:** Generate a dummy vault with 1,000 files, each containing 10 headings (10,000 subtasks total).
    * Assert that typing rapidly into a file does not freeze the Obsidian UI (validating the `app.metadataCache.on('changed')` debounce logic).
* **Acceptance Criteria:**
    * Users can switch between saved Views (e.g., "All Tasks" vs. "Due Today") and the table updates instantly.
    * Plugin settings persist seamlessly across app restarts.
    * Table scrolling remains smooth (60 FPS) via virtualization, even with thousands of rows.
