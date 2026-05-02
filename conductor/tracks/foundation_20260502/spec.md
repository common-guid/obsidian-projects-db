# Track Specification: Foundation: Task Parsing and Data Aggregation

## 1. Goal
Successfully parse the Obsidian vault to identify Parent Tasks (Notes) and Subtasks (Headings), and store them in a centralized data store.

## 2. Requirements
- Initialize the plugin environment (scaffolding).
- Implement a Data Extraction Service using `app.metadataCache`.
- Implement a centralized state management solution (Zustand).
- Support dynamic updates when files change.

## 3. Technical Constraints
- Must use Obsidian's `MetadataCache` for performance.
- Must handle H1-H6 headings.
- Must parse frontmatter for parent task identification.