import { create } from 'zustand';
import { ParentTask, Subtask } from './types';

interface TaskState {
	parentTasks: ParentTask[];
	subtasks: Subtask[];
	addParentTask: (task: ParentTask) => void;
	addSubtask: (task: Subtask) => void;
	reset: () => void;
}

export const useTaskStore = create<TaskState>((set) => ({
	parentTasks: [],
	subtasks: [],
	addParentTask: (task) => set((state) => {
		const existingIndex = state.parentTasks.findIndex(t => t.id === task.id);
		if (existingIndex !== -1) {
			const newTasks = [...state.parentTasks];
			newTasks[existingIndex] = task;
			return { parentTasks: newTasks };
		}
		return { parentTasks: [...state.parentTasks, task] };
	}),
	addSubtask: (task) => set((state) => {
		const existingIndex = state.subtasks.findIndex(t => t.id === task.id);
		if (existingIndex !== -1) {
			const newSubtasks = [...state.subtasks];
			newSubtasks[existingIndex] = task;
			return { subtasks: newSubtasks };
		}
		return { subtasks: [...state.subtasks, task] };
	}),
	reset: () => set({ parentTasks: [], subtasks: [] }),
}));
