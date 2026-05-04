/**
 * @vitest-environment jsdom
 */
import {describe, it, expect, vi, beforeEach} from 'vitest';
import {TaskDBPlugin} from '../src/main';
import {App} from 'obsidian';

describe('Markdown Code Block Integration', () => {
  let app: any;
  let plugin: any;

  beforeEach(() => {
    app = App;
    plugin = new TaskDBPlugin(app, {} as any);
  });

  it('should render the TaskDB view when the processor is called', async () => {
    let handler: any;
    vi.spyOn(plugin, 'registerMarkdownCodeBlockProcessor').mockImplementation((lang, h) => {
      handler = h;
    });
    
    await plugin.onload();
    
    const container = document.createElement('div');
    await handler('', container, {} as any);
    
    // Wait for React render
    await new Promise(resolve => setTimeout(resolve, 50));
    
    expect(container.innerHTML).toContain('TaskDB');
    expect(container.innerHTML).toContain('task-table');
  });
});
