/**
 * @vitest-environment jsdom
 */
import {describe, it, expect} from 'vitest';
import {createRoot} from 'react-dom/client';
import {App} from '../src/App';
import React from 'react';

describe('App Component', () => {
  it('should render the App component content', async () => {
    const container = document.createElement('div');
    const root = createRoot(container);
    root.render(<App />);
    
    // Wait for render (React rendering is async)
    await new Promise(resolve => setTimeout(resolve, 50));
    
    expect(container.innerHTML).toContain('TaskDB');
    expect(container.innerHTML).toContain('Notion-style database');
  });
});
