# Product Guidelines

## Prose Style
- **Clarity and Precision:** Use simple, direct language. Avoid jargon unless it is specific to the Obsidian ecosystem.
- **Tone:** Professional, helpful, and concise.
- **Formatting:** Use Markdown features consistently (e.g., bold for UI elements, code blocks for paths or variables).

## User Interface (UI)
- **Native Experience:** Adhere strictly to Obsidian's design tokens and CSS variables. The plugin should feel like a native part of the Obsidian interface.
- **Consistency:** Use Obsidian's icon set (Lucide) and UI components (modals, settings tabs, etc.) wherever possible.
- **Responsiveness:** Ensure the database view remains functional and readable across different sidebar widths and panel sizes.

## User Experience (UX)
- **Data Safety:** Prioritize data integrity. File writes must be non-destructive and highly targeted (e.g., using `app.vault.process`).
- **Feedback:** Provide immediate visual feedback for all user actions (e.g., cell editing, sorting).
- **Performance:** Optimize for large vaults. Use debouncing for cache updates and virtualization for large tables.

## Accessibility
- **Keyboard Navigation:** Support keyboard navigation within the database view.
- **Screen Readers:** Ensure UI elements are properly labeled for screen reader compatibility.
- **Contrast:** Respect Obsidian's theme (Light/Dark) and maintain high contrast for readability.