import {ItemView, WorkspaceLeaf} from 'obsidian';
import React from 'react';
import {createRoot, Root} from 'react-dom/client';
import {App} from './App';

/**
 * Custom view type for TaskDB.
 */
const VIEW_TYPE_TASKDB = 'taskdb-view';

/**
 * TaskDB View class.
 */
class TaskDBView extends ItemView {
  root: Root | null = null;

  constructor(leaf: WorkspaceLeaf) {
    super(leaf);
  }

  getViewType() {
    return VIEW_TYPE_TASKDB;
  }

  getDisplayText() {
    return 'TaskDB';
  }

  async onOpen() {
    this.root = createRoot(this.contentEl);
    this.root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  }

  async onClose() {
    this.root?.unmount();
  }
}

export {VIEW_TYPE_TASKDB, TaskDBView};
