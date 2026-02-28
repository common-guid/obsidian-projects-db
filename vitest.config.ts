import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    alias: {
      'obsidian': './tests/obsidian-mock.ts'
    },
    environment: 'node'
  }
});
