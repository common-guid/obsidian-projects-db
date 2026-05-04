import { describe, it, expect } from 'vitest';
import { page } from '@vitest/browser/context';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Root } from '../src/Root';
import { useTaskStore } from '../src/store';

describe('Verification Screenshot', () => {
	it('should capture a screenshot of the active React UI', async () => {
		// Seed the store with some test data
		useTaskStore.getState().reset();
		useTaskStore.getState().addParentTask({
			id: '1',
			name: 'Project Alpha',
			type: 'note',
			path: 'Project Alpha.md',
			frontmatter: { status: 'active' },
		});
		useTaskStore.getState().addSubtask({
			id: '2',
			name: 'Implement View Logic',
			type: 'heading',
			path: 'Project Alpha.md',
			parentPath: 'Project Alpha.md',
			level: 2,
			properties: { priority: 'high' },
		});

		const container = document.createElement('div');
		document.body.appendChild(container);
		const root = createRoot(container);
		root.render(<Root />);
		
		// Wait for render and styles
		await new Promise(resolve => setTimeout(resolve, 500));
		
		// Capture screenshot to the verification directory
		await page.screenshot({ path: '/home/guid/.gemini/tmp/life-manager/verification/ui-verification.png' });
		
		expect(true).toBe(true);
	});
});
