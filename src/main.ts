import { Plugin, BasesView } from 'obsidian';
import { mapHeadingsToTasks } from './mapper';
import { HeadingTask } from './types';

export const ExampleViewType = 'task-table';

export default class TaskManagerPlugin extends Plugin {
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

  constructor(controller: any, parentEl: HTMLElement) {
    super(controller);
    this.containerEl = parentEl.createDiv('task-manager-view-container');
  }

  public onDataUpdated(): void {
    this.containerEl.empty();
    const flattenedTasks = this.flattenData();
    this.containerEl.createDiv({ text: `Task Manager Hub (${flattenedTasks.length} tasks)` });
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
