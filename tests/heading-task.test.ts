import { describe, it, expect } from 'vitest';
import { HeadingTask } from '../src/types';

describe('HeadingTask Schema', () => {
  it('should create a HeadingTask object with file and h1-h6 fields', () => {
    const task: HeadingTask = {
      file: 'test.md',
      h1: 'Root Heading',
      h2: 'Subheading',
      h3: 'Detailed Task',
      h4: null,
      h5: null,
      h6: null,
      level: 3,
      text: 'Detailed Task'
    };

    expect(task.file).toBe('test.md');
    expect(task.h3).toBe('Detailed Task');
    expect(task.level).toBe(3);
  });
});
