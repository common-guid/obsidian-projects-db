/**
 * @vitest-environment jsdom
 */
import {describe, it, expect} from 'vitest';
import {createRoot} from 'react-dom/client';
import {Root} from '../src/Root';
import React from 'react';

describe('Root Component', () => {
  it('should render the Root component with App content', async () => {
    const container = document.createElement('div');
    const root = createRoot(container);
    root.render(<Root />);
    
    // Wait for render
    await new Promise(resolve => setTimeout(resolve, 50));
    
    expect(container.innerHTML).toContain('TaskDB');
    expect(container.innerHTML).toContain('Notion-style database');
  });
});
