import { Plugin } from 'obsidian';
import { mapHeadingsToTasks } from './mapper';
import { HeadingTask } from './types';

// Note: These types might not be in the standard obsidian.d.ts if it's an old version
// but we'll define them as needed for now.
export const ExampleViewType = 'task-table';

export default class TaskManagerPlugin extends Plugin {
  async onload() {
    // @ts-ignore - registerBasesView is provided by the Bases core plugin
    this.registerBasesView(ExampleViewType, {
      name: 'Task Table',
      icon: 'lucide-table',
      factory: (controller: any, containerEl: HTMLElement) => {
        return new TaskBasesView(controller, containerEl);
      },
    });
  }
}

// @ts-ignore - BasesView is provided by the Bases core plugin
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
