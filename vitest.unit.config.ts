import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
	test: {
		environment: 'node',
		include: ['tests/**/*.test.ts', 'tests/**/*.test.tsx'],
		exclude: ['tests/**/*.browser.test.ts', 'tests/verification.test.tsx'],
		alias: {
			'obsidian': path.resolve(__dirname, './tests/__mocks__/obsidian.ts'),
		},
	},
});
