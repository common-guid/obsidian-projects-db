import {describe, it, expect, vi, beforeEach} from 'vitest';
import {TaskDBPlugin} from '../src/main';
import {VIEW_TYPE_TASKDB, TaskDBView} from '../src/view';
import {App} from 'obsidian';

describe('TaskDBView Registration', () => {
  let app: any;
  let plugin: any;

  beforeEach(() => {
    app = App;
    plugin = new TaskDBPlugin(app, {} as any);
  });

  it('should register the TaskDB view type on onload', async () => {
    const registerViewSpy = vi.spyOn(plugin, 'registerView');
    await plugin.onload();
    expect(registerViewSpy).toHaveBeenCalledWith(
      VIEW_TYPE_TASKDB,
      expect.any(Function)
    );
  });

  it('should add a ribbon icon', async () => {
    const addRibbonIconSpy = vi.spyOn(plugin, 'addRibbonIcon');
    await plugin.onload();
    expect(addRibbonIconSpy).toHaveBeenCalledWith(
      'table',
      'Open TaskDB',
      expect.any(Function)
    );
  });

  it('should add a command to open the view', async () => {
    const addCommandSpy = vi.spyOn(plugin, 'addCommand');
    await plugin.onload();
    expect(addCommandSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        id: 'open-taskdb',
        name: 'Open TaskDB',
      })
    );
  });

  it('should activate the view', async () => {
    const revealLeafSpy = vi.spyOn(app.workspace, 'revealLeaf');
    await plugin.activateView();
    expect(revealLeafSpy).toHaveBeenCalled();
  });

  it('should reuse existing leaf if available', async () => {
    const leaf = {setViewState: vi.fn()};
    vi.spyOn(app.workspace, 'getLeavesOfType').mockReturnValue([leaf]);
    const revealLeafSpy = vi.spyOn(app.workspace, 'revealLeaf');

    await plugin.activateView();

    expect(revealLeafSpy).toHaveBeenCalledWith(leaf);
    expect(leaf.setViewState).not.toHaveBeenCalled();
  });
});

describe('TaskDBView', () => {
  it('should return correct view type and display text', () => {
    const view = new TaskDBView({} as any);
    expect(view.getViewType()).toBe(VIEW_TYPE_TASKDB);
    expect(view.getDisplayText()).toBe('TaskDB');
  });

  it('should have onOpen and onClose methods', () => {
    const view = new TaskDBView({} as any);
    expect(view.onOpen).toBeDefined();
    expect(view.onClose).toBeDefined();
  });
});
