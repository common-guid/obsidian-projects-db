# Initial Concept
Provide a Notion-like database view inside Obsidian where Markdown files act as parent tasks and their internal headings (H1-H6) act as subtasks.

# Product Guide

## Target Audience
Obsidian power users who require structured, Notion-like task management capabilities while maintaining their data locally in Markdown format.

## Core Value Proposition
Bridging the gap between free-form Markdown note-taking and structured database management. TaskDB allows users to visualize, filter, and manage tasks and subtasks without altering their underlying notes structure.

## Key Features
- **Database View:** A dynamic, tabular interface powered by TanStack Table, offering Notion-style columns, filtering, and sorting.
- **Two-Way Binding:** Edits made in the database view (e.g., changing status, editing titles) are seamlessly written back to the source Markdown files.
- **Hierarchical Tasks:** Parent tasks (entire Markdown notes) and subtasks (headings within notes) are parsed dynamically using Obsidian's MetadataCache.
- **Custom Properties:** Support for Dataview-style inline properties underneath headings.