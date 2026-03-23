import React from 'react';
import { createRoot } from 'react-dom/client';
import { TaskTable } from '../src/components/TaskTable';
import { HeadingTask, HeadingLevel } from '../src/types';

const emptyLevel: HeadingLevel = { id: null, text: null, tags: [] };

const sampleTasks: HeadingTask[] = [
  {
    id: 'project.md:0',
    file: 'project.md',
    h1: { id: 'project.md:0', text: 'Main Project', tags: ['urgent'] },
    h2: emptyLevel,
    h3: emptyLevel,
    h4: emptyLevel,
    h5: emptyLevel,
    h6: emptyLevel,
    level: 1,
    text: 'Main Project',
    tags: ['urgent'],
    hasChildren: true
  },
  {
    id: 'project.md:1',
    file: 'project.md',
    h1: { id: 'project.md:0', text: 'Main Project', tags: ['urgent'] },
    h2: { id: 'project.md:1', text: 'Design Phase', tags: ['ui'] },
    h3: emptyLevel,
    h4: emptyLevel,
    h5: emptyLevel,
    h6: emptyLevel,
    level: 2,
    text: 'Design Phase',
    tags: ['ui'],
    hasChildren: true
  },
  {
    id: 'project.md:2',
    file: 'project.md',
    h1: { id: 'project.md:0', text: 'Main Project', tags: ['urgent'] },
    h2: { id: 'project.md:1', text: 'Design Phase', tags: ['ui'] },
    h3: { id: 'project.md:2', text: 'Mockups', tags: [] },
    h4: emptyLevel,
    h5: emptyLevel,
    h6: emptyLevel,
    level: 3,
    text: 'Mockups',
    tags: [],
    hasChildren: false
  },
  {
    id: 'project.md:3',
    file: 'project.md',
    h1: { id: 'project.md:0', text: 'Main Project', tags: ['urgent'] },
    h2: { id: 'project.md:3', text: 'Development', tags: ['coding'] },
    h3: emptyLevel,
    h4: emptyLevel,
    h5: emptyLevel,
    h6: emptyLevel,
    level: 2,
    text: 'Development',
    tags: ['coding'],
    hasChildren: false
  },
  {
    id: 'other.md:0',
    file: 'other.md',
    h1: { id: 'other.md:0', text: 'Secondary Task', tags: [] },
    h2: emptyLevel,
    h3: emptyLevel,
    h4: emptyLevel,
    h5: emptyLevel,
    h6: emptyLevel,
    level: 1,
    text: 'Secondary Task',
    tags: [],
    hasChildren: false
  }
];

const App = () => {
  return (
    <div style={{ padding: '20px', background: 'var(--background-primary)', color: 'var(--text-normal)', minHeight: '100vh' }}>
      <h1>Visual Verification: Hierarchical Toggle</h1>
      <div style={{ border: '1px solid var(--background-modifier-border)', borderRadius: '8px', overflow: 'hidden' }}>
        <TaskTable tasks={sampleTasks} onOpenLink={(file, heading) => console.log('Open:', file, heading)} />
      </div>
      <div style={{ marginTop: '20px' }}>
        <h3>Instructions:</h3>
        <ul>
          <li>Click the chevron next to <strong>Main Project</strong> to collapse the entire project.</li>
          <li>Click the chevron next to <strong>Design Phase</strong> to collapse its subtasks.</li>
          <li>Verify that <strong>Secondary Task</strong> is unaffected.</li>
        </ul>
      </div>
    </div>
  );
};

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(<App />);
}
