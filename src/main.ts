import { Plugin, BasesView } from 'obsidian';
import React from 'react';
import { createRoot, Root } from 'react-dom/client';
import { mapHeadingsToTasks } from './mapper';
import { HeadingTask } from './types';
import { TaskTable } from './components/TaskTable';

export const ExampleViewType = 'task-table';

export class TaskManagerPlugin extends Plugin {
  async onload() {
    console.log('Task Manager Plugin loading...');
    
    // @ts-ignore
    if (!this.registerBasesView) {
      console.error('registerBasesView not found on Plugin instance');
    } else {
      console.log('registerBasesView found!');
    }

    try {
      // @ts-ignore
      this.registerBasesView(ExampleViewType, {
        name: 'Task Table',
        icon: 'lucide-table',
        factory: (controller: any, containerEl: HTMLElement) => {
          return new TaskBasesView(controller, containerEl);
        },
      });
      console.log('Task Table view registered successfully');
    } catch (e) {
      console.error('Failed to register Bases view:', e);
    }
  }
}

export class TaskBasesView extends BasesView {
  readonly type = ExampleViewType;
  private containerEl: HTMLElement;
  private root: Root | null = null;

  constructor(controller: any, parentEl: HTMLElement) {
    super(controller);
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
        onOpenLink: handleOpenLink
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
          const fileTasks = mapHeadingsToTasks(file.name, cache.headings);
          allTasks.push(...fileTasks);
        }
      }
    }

    return allTasks;
  }
}
