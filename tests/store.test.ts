import {describe, it, expect, beforeEach} from 'vitest';
import {useTaskStore} from '../src/store';

describe('Task Store', () => {
  beforeEach(() => {
    useTaskStore.getState().reset();
  });

  it('should add a parent task', () => {
    const parentTask = {
      id: 'task-1',
      name: 'Project Alpha',
      type: 'note' as const,
      path: 'Project Alpha.md',
      frontmatter: {status: 'todo'},
    };

    useTaskStore.getState().addParentTask(parentTask);

    const tasks = useTaskStore.getState().parentTasks;
    expect(tasks).toHaveLength(1);
    expect(tasks[0]).toEqual(parentTask);
  });

  it('should add a subtask', () => {
    const subtask = {
      id: 'subtask-1',
      name: 'Phase 1',
      type: 'heading' as const,
      path: 'Project Alpha.md#Phase 1',
      level: 1,
      parentPath: 'Project Alpha.md',
      properties: {priority: 'high'},
    };

    useTaskStore.getState().addSubtask(subtask);

    const subtasks = useTaskStore.getState().subtasks;
    expect(subtasks).toHaveLength(1);
    expect(subtasks[0]).toEqual(subtask);
  });

  it('should update a parent task if it already exists', () => {
    const parentTask = {
      id: 'task-1',
      name: 'Project Alpha',
      type: 'note' as const,
      path: 'Project Alpha.md',
      frontmatter: {status: 'todo'},
    };

    useTaskStore.getState().addParentTask(parentTask);

    const updatedTask = {...parentTask, frontmatter: {status: 'done'}};
    useTaskStore.getState().addParentTask(updatedTask);

    const tasks = useTaskStore.getState().parentTasks;
    expect(tasks).toHaveLength(1);
    expect(tasks[0].frontmatter.status).toBe('done');
  });

  it('should update a subtask if it already exists', () => {
    const subtask = {
      id: 'subtask-1',
      name: 'Phase 1',
      type: 'heading' as const,
      path: 'Project Alpha.md#Phase 1',
      level: 1,
      parentPath: 'Project Alpha.md',
      properties: {priority: 'high'},
    };

    useTaskStore.getState().addSubtask(subtask);

    const updatedSubtask = {...subtask, properties: {priority: 'low'}};
    useTaskStore.getState().addSubtask(updatedSubtask);

    const subtasks = useTaskStore.getState().subtasks;
    expect(subtasks).toHaveLength(1);
    expect(subtasks[0].properties.priority).toBe('low');
  });
});
