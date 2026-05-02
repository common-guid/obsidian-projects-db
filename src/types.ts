export type TaskType = 'note' | 'heading';

export interface BaseTask {
	id: string;
	name: string;
	type: TaskType;
	path: string;
}

export interface ParentTask extends BaseTask {
	type: 'note';
	frontmatter: Record<string, any>;
}

export interface Subtask extends BaseTask {
	type: 'heading';
	level: number;
	parentPath: string;
	properties: Record<string, string>;
}
