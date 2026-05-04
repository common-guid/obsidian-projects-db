import {Plugin, WorkspaceLeaf} from 'obsidian';
import {TaskDBView, VIEW_TYPE_TASKDB} from './view';
import {createRoot} from 'react-dom/client';
import React from 'react';
import {Root as RootComponent} from './Root';

/**
 * Main plugin class for Obsidian TaskDB.
 */
class TaskDBPlugin extends Plugin {
  /**
   * Initializes the plugin, registering events, views, and commands.
   */
  async onload() {
    console.log('Loading Obsidian TaskDB Plugin');

    this.registerView(
      VIEW_TYPE_TASKDB,
      (leaf) => new TaskDBView(leaf)
    );

    this.registerMarkdownCodeBlockProcessor('taskdb', (source, el, ctx) => {
      const root = createRoot(el);
      root.render(<RootComponent />);
    });

    this.addRibbonIcon('table', 'Open TaskDB', () => {
      this.activateView();
    });

    this.addCommand({
      id: 'open-taskdb',
      name: 'Open TaskDB',
      callback: () => this.activateView(),
    });

    this.registerEvent(
      this.app.metadataCache.on('changed', (file) => {
        // TODO: Trigger re-parsing and state update
      })
    );

    this.registerEvent(
      this.app.metadataCache.on('resolved', () => {
        // TODO: Trigger initial scan or full refresh
      })
    );
  }

  /**
   * Activates the TaskDB view, creating it if it doesn't exist.
   */
  async activateView() {
    const {workspace} = this.app;

    let leaf: WorkspaceLeaf | null = null;
    const leaves = workspace.getLeavesOfType(VIEW_TYPE_TASKDB);

    if (leaves.length > 0) {
      leaf = leaves[0];
    } else {
      leaf = workspace.getRightLeaf(false);
      if (leaf) {
        await leaf.setViewState({
          type: VIEW_TYPE_TASKDB,
          active: true,
        });
      }
    }

    if (leaf) {
      workspace.revealLeaf(leaf);
    }
  }

  /**
   * Cleanup logic when the plugin is disabled.
   */
  onunload() {
    console.log('Unloading Obsidian TaskDB Plugin');
  }
}

export {TaskDBPlugin};
