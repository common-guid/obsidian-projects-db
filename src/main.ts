import { Plugin, BasesView, PluginSettingTab, Setting } from 'obsidian';
import React from 'react';
import { createRoot, Root } from 'react-dom/client';
import { mapHeadingsToTasks } from './mapper';
import { HeadingTask } from './types';
import { TaskTable } from './components/TaskTable';

export const ExampleViewType = 'task-table';

export interface TaskManagerSettings {
  levelColors: string[];
}

export const DEFAULT_SETTINGS: TaskManagerSettings = {
  levelColors: [
    '#70e0af', // Level 1 - Tealish
    '#70a1e0', // Level 2 - Bluish
    '#e0d270', // Level 3 - Yellowish
    '#e070af', // Level 4 - Pinkish
    '#e0e0e0', // Level 5 - Whitish
    '#e0a170', // Level 6 - Orangish
  ]
};

export default class TaskManagerPlugin extends Plugin {
  settings: TaskManagerSettings;

  async onload() {
    console.log('Task Manager Plugin loading...');

    await this.loadSettings();

    const registered = this.registerBasesView(ExampleViewType, {
      name: 'Task Table',
      icon: 'lucide-table',
      factory: (controller, containerEl) => {
        return new TaskBasesView(controller, containerEl, this);
      },
    });

    if (!registered) {
      console.warn('Task Manager: registerBasesView returned false — Bases may not be enabled in this vault.');
      return;
    }

    this.addSettingTab(new TaskManagerSettingTab(this.app, this));

    console.log('Task Table view registered successfully.');

    // Obsidian's deferred-view system can render the active .base tab before
    // a community plugin's onload completes (startup race condition).  After
    // the workspace layout is fully ready, force every open Bases leaf to
    // re-apply its state so that it picks up the now-registered view type.
    this.app.workspace.onLayoutReady(() => {
      this.app.workspace.getLeavesOfType('bases').forEach((leaf: any) => {
        leaf.setViewState(leaf.getViewState());
      });
    });
  }

  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  }

  async saveSettings() {
    await this.saveData(this.settings);
    // Notify all open views to re-render with new settings
    this.app.workspace.getLeavesOfType('bases').forEach((leaf: any) => {
      if (leaf.view instanceof TaskBasesView) {
        leaf.view.onDataUpdated();
      }
    });
  }
}

class TaskManagerSettingTab extends PluginSettingTab {
  plugin: TaskManagerPlugin;

  constructor(app: any, plugin: TaskManagerPlugin) {
    super(app, plugin);
    this.plugin = plugin;
  }

  display(): void {
    const { containerEl } = this;

    containerEl.empty();

    containerEl.createEl('h2', { text: 'Task Manager Settings' });

    containerEl.createEl('h3', { text: 'Hierarchy Colors' });
    
    this.plugin.settings.levelColors.forEach((color, index) => {
      new Setting(containerEl)
        .setName(`Level ${index + 1} Color`)
        .setDesc(`Color for the vertical bar at hierarchy level ${index + 1}`)
        .addColorPicker(colorPicker => colorPicker
          .setValue(color)
          .onChange(async (value) => {
            this.plugin.settings.levelColors[index] = value;
            await this.plugin.saveSettings();
          }));
    });
  }
}

export class TaskBasesView extends BasesView {
  readonly type = ExampleViewType;
  private containerEl: HTMLElement;
  private root: Root | null = null;
  private plugin: TaskManagerPlugin;

  constructor(controller: any, parentEl: HTMLElement, plugin: TaskManagerPlugin) {
    super(controller);
    this.plugin = plugin;
    this.containerEl = parentEl.createDiv('task-manager-view-container');
  }

  onDataUpdated(): void {
    const flattenedTasks = this.flattenData();
    
    if (!this.root) {
      this.root = createRoot(this.containerEl);
    }

    const handleOpenLink = (file: string, heading: string) => {
      const { app } = this;
      const path = file + (heading ? '#' + heading : '');
      void app.workspace.openLinkText(path, '', false);
    };

    this.root.render(
      React.createElement(TaskTable, { 
        tasks: flattenedTasks,
        onOpenLink: handleOpenLink,
        settings: this.plugin.settings
      })
    );
  }

  protected flattenData(): HeadingTask[] {
    const allTasks: HeadingTask[] = [];
    const { app, data } = this;

    if (!data || !data.groupedData) return [];

    for (const group of data.groupedData) {
      for (const entry of group.entries) {
        const file = entry.file;
        const cache = app.metadataCache.getFileCache(file);
        if (cache && cache.headings) {
          const fileTasks = mapHeadingsToTasks(file.name, cache.headings, cache.tags || []);
          allTasks.push(...fileTasks);
        }
      }
    }

    return allTasks;
  }
}
