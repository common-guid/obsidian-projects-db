import {describe, it, expect, vi} from 'vitest';
import {TaskDBPlugin} from '../src/main';
import {App} from 'obsidian';

describe('TaskDBPlugin', () => {
  it('should be defined', () => {
    expect(TaskDBPlugin).toBeDefined();
  });

  it('should have onload and onunload methods', () => {
    const plugin = new TaskDBPlugin(App as any, {} as any);
    expect(plugin.onload).toBeDefined();
    expect(plugin.onunload).toBeDefined();
  });

  it('should log messages on onload and onunload', async () => {
    const consoleSpy = vi.spyOn(console, 'log');
    const plugin = new TaskDBPlugin(App as any, {} as any);

    await plugin.onload();
    expect(consoleSpy).toHaveBeenCalledWith('Loading Obsidian TaskDB Plugin');

    plugin.onunload();
    expect(consoleSpy).toHaveBeenCalledWith('Unloading Obsidian TaskDB Plugin');
  });
});
