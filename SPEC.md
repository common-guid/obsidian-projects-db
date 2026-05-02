# Product Specification: Obsidian TaskDB Plugin

## 1. Overview
**Name:** Obsidian TaskDB (Working Title)
**Purpose:** To provide a Notion-like database view inside Obsidian where Markdown files act as parent tasks and their internal headings (H1-H6) act as subtasks. 
**Target Audience:** Power users who want structured task management without leaving their local Markdown vault.

## 2. Core Architecture
- **Framework:** Obsidian Plugin API, TypeScript, React 18.
- **UI Library:** TanStack Table (for data grid), Lucide Icons (standard Obsidian icons).
- **Data Source of Truth:** The Markdown files themselves. The database is a *projection* of the vault state, not a separate database.
- **Caching:** Obsidian's native `MetadataCache`.

## 3. Data Schema

### Parent Tasks (Notes)
Defined by a specific tag in the YAML frontmatter (e.g., `type: task`) or by existing in a specific folder.
- **Task Name:** File Name (minus `.md`).
- **Properties:** Derived from YAML Frontmatter.

### Subtasks (Headings)
Defined by any heading (`#` to `######`) within a Parent Task note.
- **Task Name:** The text of the heading.
- **Level:** H1 - H6.
- **Properties:** Derived from Dataview-style inline properties placed on the line immediately following the heading.
  
*Example Markdown Source:*
\`\`\`markdown
# Design Login Screen
[status:: in-progress] [assignee:: John] [due:: 2026-05-10]

The login screen needs to have a username and password field.

## Create SVG Assets
[status:: todo]

Need logo and background illustrations.
\`\`\`

## 4. Feature Requirements

### 4.1 Data Aggregation
- [ ] Listen to `app.metadataCache.on('changed')` to trigger re-renders.
- [ ] Parse frontmatter for parent tasks.
- [ ] Parse `fileCache.headings` for subtasks.
- [ ] Parse inline properties immediately following headings.

### 4.2 Database View (UI)
- [ ] Register a custom `ItemView` with a unique icon.
- [ ] Render a data grid supporting dynamic columns.
- [ ] Columns required: Title, Type (Note/Heading), Status, Due Date.
- [ ] Visual hierarchy indicating subtask relationships (e.g., indented rows or breadcrumbs).

### 4.3 Two-Way Editing
- [ ] Clicking a cell in the "Status" column opens a dropdown.
- [ ] Selecting a new status triggers a file write.
- [ ] Use `app.vault.process(file, callback)` to safely mutate the raw markdown string and inject/update the inline property.
- [ ] Editing the Title cell directly modifies the `#` heading in the markdown file.

## 5. Obsidian API Dependencies
- `Plugin`: Core lifecycle management.
- `ItemView`: Mounting the React interface.
- `Workspace`: Opening files, linking to headings (`WorkspaceLeaf.openFile`, `Workspace.openLinkText`).
- `MetadataCache`: Fast retrieval of headings, frontmatter, and file resolution.
- `Vault`: Read/Write operations via `Vault.read()`, `Vault.process()`.

## 6. Known Constraints & Edge Cases
- **Duplicate Headings:** Obsidian anchors link to the first instance of a heading. If a note has two `## Setup` headings, writing data back or navigating may resolve to the wrong one. **Mitigation:** The write-back service must track the line number from the `MetadataCache` block location to ensure exact text replacement.
- **Performance:** Re-rendering a table with 10,000 headings on every keystroke will crash the app. **Mitigation:** Use strict debouncing on cache updates and implement virtualization in the table UI if row counts exceed 500.
