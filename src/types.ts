/**
 * Represents the type of a task in the system.
 * 'note' refers to a parent task (Markdown file).
 * 'heading' refers to a subtask (H1-H6 heading).
 */
type TaskType = 'note' | 'heading';

/**
 * Base interface for all task-like objects.
 */
interface BaseTask {
  id: string;
  name: string;
  type: TaskType;
  path: string;
}

/**
 * Represents a parent task, which is a complete Markdown note.
 */
interface ParentTask extends BaseTask {
  type: 'note';
  frontmatter: Record<string, any>;
}

/**
 * Represents a subtask, which is a heading within a Markdown note.
 */
interface Subtask extends BaseTask {
  type: 'heading';
  level: number;
  parentPath: string;
  properties: Record<string, string>;
}

export {TaskType, BaseTask, ParentTask, Subtask};
