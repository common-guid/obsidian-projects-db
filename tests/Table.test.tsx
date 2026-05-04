/**
 * @vitest-environment jsdom
 */
import {describe, it, expect, beforeEach, afterEach} from 'vitest';
import {createRoot} from 'react-dom/client';
import React from 'react';
import {TaskTable} from '../src/components/TaskTable';
import {useTaskStore} from '../src/store';

describe('TaskTable Component', () => {
  let container: HTMLDivElement;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
    useTaskStore.getState().reset();
  });

  afterEach(() => {
    document.body.removeChild(container);
  });

  it('should render a table with Name and Type columns', async () => {
    const root = createRoot(container);
    root.render(<TaskTable />);
    
    // Wait for render
    await new Promise(resolve => setTimeout(resolve, 50));
    
    expect(container.innerHTML).toContain('Name');
    expect(container.innerHTML).toContain('Type');
  });

  it('should render data from the store', async () => {
    useTaskStore.getState().addParentTask({
      id: '1',
      name: 'Project Alpha',
      type: 'note',
      path: 'Project Alpha.md',
      frontmatter: {},
    });

    const root = createRoot(container);
    root.render(<TaskTable />);
    
    // Wait for render
    await new Promise(resolve => setTimeout(resolve, 50));
    
    expect(container.innerHTML).toContain('Project Alpha');
    expect(container.innerHTML).toContain('note');
  });

  it('should render subtasks from the store', async () => {
    useTaskStore.getState().addSubtask({
      id: '2',
      name: 'Subtask 1',
      type: 'heading',
      path: 'Project Alpha.md',
      parentPath: 'Project Alpha.md',
      level: 1,
      properties: {},
    });

    const root = createRoot(container);
    root.render(<TaskTable />);
    
    // Wait for render
    await new Promise(resolve => setTimeout(resolve, 50));
    
    expect(container.innerHTML).toContain('Subtask 1');
    expect(container.innerHTML).toContain('heading');
  });

  it('should have the correct CSS classes for styling', async () => {
    useTaskStore.getState().addParentTask({
      id: '1',
      name: 'Project Alpha',
      type: 'note',
      path: 'Project Alpha.md',
      frontmatter: {},
    });

    const root = createRoot(container);
    root.render(<TaskTable />);

    // Wait for render
    await new Promise(resolve => setTimeout(resolve, 50));
    
    expect(container.querySelector('.task-table-container')).not.toBeNull();
    expect(container.querySelector('.task-table')).not.toBeNull();
    expect(container.querySelector('thead')).not.toBeNull();
    expect(container.querySelector('tbody')).not.toBeNull();
    expect(container.querySelector('th')).not.toBeNull();
    expect(container.querySelector('td')).not.toBeNull();
  });
});
