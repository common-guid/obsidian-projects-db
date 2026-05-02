import { describe, it, expect, vi } from 'vitest';
import TaskDBPlugin from '../src/main';
import { App } from 'obsidian';

describe('Event Handlers', () => {
	it('should register changed and resolved listeners on onload', async () => {
		const app = App as any;
		const spy = vi.spyOn(app.metadataCache, 'on');
		
		const plugin = new TaskDBPlugin(app, {} as any);
		await plugin.onload();
		
		expect(spy).toHaveBeenCalledWith('changed', expect.any(Function));
		expect(spy).toHaveBeenCalledWith('resolved', expect.any(Function));
	});
});
