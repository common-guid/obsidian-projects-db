import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
	test: {
		browser: {
			enabled: true,
			name: 'chromium',
			provider: 'playwright',
			headless: true,
			providerOptions: {
				launch: {
					executablePath: path.resolve(process.cwd(), '.playwright-cache/chromium-1217/chrome-linux64/chrome'),
				}
			}
		},
	},
});
