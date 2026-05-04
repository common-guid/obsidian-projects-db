/**
 * @vitest-environment jsdom
 */
import {describe, it, expect, vi, beforeEach} from 'vitest';
import {TaskDBView} from '../src/view';
import {createRoot} from 'react-dom/client';

vi.mock('react-dom/client', () => ({
  createRoot: vi.fn(() => ({
    render: vi.fn(),
    unmount: vi.fn(),
  })),
}));

describe('React Mounting Logic', () => {
  let view: TaskDBView;
  let container: HTMLElement;

  beforeEach(() => {
    vi.clearAllMocks();
    container = document.createElement('div');
    const leaf = {
      contentEl: container,
    } as any;
    view = new TaskDBView(leaf);
  });

  it('should call createRoot and render on onOpen', async () => {
    await view.onOpen();
    expect(createRoot).toHaveBeenCalledWith(container);
    const root = (createRoot as any).mock.results[0].value;
    expect(root.render).toHaveBeenCalled();
  });

  it('should call unmount on onClose', async () => {
    await view.onOpen();
    const root = (createRoot as any).mock.results[0].value;
    await view.onClose();
    expect(root.unmount).toHaveBeenCalled();
  });
});
