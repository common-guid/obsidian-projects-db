import { describe, it, expect, vi } from 'vitest';
import { TaskBasesView, ExampleViewType } from '../src/main';

describe('TaskBasesView', () => {
  const controller = {} as any;
  const parentEl = {
    createDiv: vi.fn().mockReturnValue({
      empty: vi.fn(),
      createDiv: vi.fn()
    })
  } as any;

  it('should be a class extending BasesView', () => {
    const view = new TaskBasesView(controller, parentEl);
    expect(view.type).toBe(ExampleViewType);
  });

  it('should flatten Bases data into heading-based tasks', () => {
    const view = new TaskBasesView(controller, parentEl);
    
    // Mock Obsidian app with metadata cache
    (view as any).app = {
      metadataCache: {
        getFileCache: vi.fn().mockReturnValue({
          headings: [
            { heading: 'Task 1', level: 1 },
            { heading: 'Task 2', level: 2 },
          ]
        })
      }
    };

    // Mock Bases data
    (view as any).data = {
      groupedData: [
        {
          entries: [
            { file: { name: 'test.md', path: 'test.md' } }
          ]
        }
      ]
    };

    // This is where we'll test the flattening logic. 
    // We'll expose it as a protected method or just test its side effect.
    // For now, let's assume onDataUpdated calls a method that we can spy on.
    const spy = vi.spyOn(view as any, 'flattenData');
    view.onDataUpdated();
    
    expect(spy).toHaveBeenCalled();
    const result = spy.mock.results[0].value;
    expect(result).toHaveLength(2);
    expect(result[0].h1).toBe('Task 1');
    expect(result[1].h2).toBe('Task 2');
  });
});
