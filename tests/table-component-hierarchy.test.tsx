import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { TaskTable } from '../src/components/TaskTable';
import { HeadingTask, HeadingLevel } from '../src/types';

describe('TaskTable Component Hierarchy', () => {
  const emptyLevel: HeadingLevel = { id: null, text: null, tags: [] };
  const tasks: HeadingTask[] = [
    {
      id: 'p1',
      file: 'test.md',
      h1: { id: 'p1', text: 'Project', tags: [] },
      h2: emptyLevel,
      h3: emptyLevel,
      h4: emptyLevel,
      h5: emptyLevel,
      h6: emptyLevel,
      level: 1,
      text: 'Project',
      tags: [],
      hasChildren: true
    },
    {
      id: 't1',
      file: 'test.md',
      h1: { id: 'p1', text: 'Project', tags: [] },
      h2: { id: 't1', text: 'Task 1', tags: [] },
      h3: emptyLevel,
      h4: emptyLevel,
      h5: emptyLevel,
      h6: emptyLevel,
      level: 2,
      text: 'Task 1',
      tags: [],
      hasChildren: false
    }
  ];

  it('should render a toggle button when hasChildren is true', () => {
    render(<TaskTable tasks={tasks} />);
    
    // Find the 'Project' that is a level-pill (the primary heading row)
    const projectPills = screen.getAllByText('Project');
    const primaryProjectPill = projectPills.find(el => el.classList.contains('level-pill'));
    const projectCell = primaryProjectPill?.closest('.cell-content');
    expect(projectCell?.querySelector('.toggle-button')).toBeInTheDocument();

    // Find 'Task 1' level-pill
    const task1Pill = screen.getByText('Task 1');
    const taskCell = task1Pill.closest('.cell-content');
    expect(taskCell?.querySelector('.toggle-button')).not.toBeInTheDocument();
  });

  it('should collapse children when toggle is clicked', () => {
    render(<TaskTable tasks={tasks} />);
    
    // Check initial state
    expect(screen.getByText('Task 1')).toBeInTheDocument();

    // Click the toggle on Project
    const toggleButtons = screen.getAllByRole('button');
    fireEvent.click(toggleButtons[0]);

    // Task 1 should be gone
    expect(screen.queryByText('Task 1')).not.toBeInTheDocument();

    // Click again to expand
    fireEvent.click(toggleButtons[0]);
    expect(screen.getByText('Task 1')).toBeInTheDocument();
  });

  it('should handle multi-level collapse', () => {
    const multiTasks: HeadingTask[] = [
        { ...tasks[0] },
        { ...tasks[1] },
        {
            id: 's1',
            file: 'test.md',
            h1: { id: 'p1', text: 'Project', tags: [] },
            h2: { id: 't1', text: 'Task 1', tags: [] },
            h3: { id: 's1', text: 'Subtask 1.1', tags: [] },
            h4: emptyLevel,
            h5: emptyLevel,
            h6: emptyLevel,
            level: 3,
            text: 'Subtask 1.1',
            tags: [],
            hasChildren: false
        }
    ];
    // Update Task 1 to have children
    multiTasks[1].hasChildren = true;

    render(<TaskTable tasks={multiTasks} />);

    expect(screen.getByText('Subtask 1.1')).toBeInTheDocument();

    // Toggles are on Project and Task 1
    const toggleButtons = screen.getAllByRole('button');
    expect(toggleButtons).toHaveLength(2);

    // Collapse Task 1 (the second toggle button)
    fireEvent.click(toggleButtons[1]);

    expect(screen.getByText('Task 1')).toBeInTheDocument();
    expect(screen.queryByText('Subtask 1.1')).not.toBeInTheDocument();

    // Expand Task 1
    fireEvent.click(toggleButtons[1]);
    expect(screen.getByText('Subtask 1.1')).toBeInTheDocument();

    // Collapse Project (the first toggle button)
    fireEvent.click(toggleButtons[0]);
    expect(screen.queryByText('Task 1')).not.toBeInTheDocument();
    expect(screen.queryByText('Subtask 1.1')).not.toBeInTheDocument();
  });
});
