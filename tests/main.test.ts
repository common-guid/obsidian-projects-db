import { describe, it, expect } from 'vitest';
import TaskDBPlugin from '../src/main';
import { Plugin } from 'obsidian';

describe('TaskDBPlugin', () => {
	it('should be a class extending Plugin', () => {
		const plugin = new TaskDBPlugin({} as any, {} as any);
		expect(plugin).toBeInstanceOf(Plugin);
	});

	it('should have onload and onunload methods', async () => {
		const plugin = new TaskDBPlugin({} as any, {} as any);
		expect(typeof plugin.onload).toBe('function');
		expect(typeof plugin.onunload).toBe('function');
		
		await plugin.onload();
		plugin.onunload();
	});
});
