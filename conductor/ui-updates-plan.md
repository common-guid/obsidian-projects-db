# UI Updates Implementation Plan

## Objective
Implement three specific UI adjustments to the TaskTable component to improve visual hierarchy and remove redundant elements.

## Changes
1. **Remove 'Open' Button:**
   - In `src/components/TaskTable.tsx`, locate the `<button className="tm-action-btn" title="Open">` element within the `TaskRow` component.
   - Remove this button and its corresponding `<OpenIcon />` child, as clicking the row text already provides this functionality.

2. **Decrease Link Button Size:**
   - In `src/components/TaskTable.tsx`, locate the `CopyIcon` SVG component.
   - Update its inline `style` prop to reduce the size by 50% (from `width: '14px', height: '14px'` to `width: '7px', height: '7px'`).

3. **Increase File Name Font Size:**
   - In `src/components/TaskTable.tsx`, locate the `<span className="tm-file-name">{group.file}</span>` element within the `TaskTable` component's render loop.
   - Add an inline style to increase the font size to match an H1 header: `style={{ fontSize: 'var(--h1-size, 2em)', fontWeight: 'bold' }}`.
   - This ensures the size is increased while preserving the existing grey background color applied by the class.

## Verification
- Open the application and verify that the "Open" icon no longer appears next to task rows.
- Verify that the "Copy Link" icon is noticeably smaller.
- Verify that the file name headers are rendered at a larger (H1) font size and that their background color remains unaffected.