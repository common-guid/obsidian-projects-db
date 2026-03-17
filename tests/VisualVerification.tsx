import React from 'react';
import { createRoot } from 'react-dom/client';
import { TaskTable } from '../src/components/TaskTable';
import { HeadingTask, HeadingLevel } from '../src/types';

const emptyLevel: HeadingLevel = { text: null, tags: [] };

const sampleTasks: HeadingTask[] = [
  {
    file: 'update vpn configs.md',
    h1: { text: 'AI/project', tags: ['ai-tag'] },
    h2: { text: 'network', tags: ['vpn', 'security'] },
    h3: { text: 'dev', tags: ['config'] },
    h4: emptyLevel,
    h5: emptyLevel,
    h6: emptyLevel,
    level: 3,
    text: 'dev',
    tags: ['config']
  },
  {
    file: 'Project-B.md',
    h1: { text: 'Main Project', tags: ['urgent'] },
    h2: { text: 'Design Phase', tags: ['ui', 'ux'] },
    h3: emptyLevel,
    h4: emptyLevel,
    h5: emptyLevel,
    h6: emptyLevel,
    level: 2,
    text: 'Design Phase',
    tags: ['ui', 'ux']
  },
  {
    file: 'Notes.md',
    h1: { text: 'General', tags: [] },
    h2: { text: 'Sub-topic', tags: ['research'] },
    h3: emptyLevel,
    h4: emptyLevel,
    h5: emptyLevel,
    h6: emptyLevel,
    level: 2,
    text: 'Sub-topic',
    tags: ['research']
  }
];

const App = () => {
  return (
    <div style={{ padding: '20px', background: 'var(--background-primary)', color: 'var(--text-normal)', minHeight: '100vh' }}>
      <h1>Visual Verification: Task Manager UI</h1>
      <div style={{ border: '1px solid var(--background-modifier-border)', borderRadius: '8px', overflow: 'hidden' }}>
        <TaskTable tasks={sampleTasks} onOpenLink={(file, heading) => console.log('Open:', file, heading)} />
      </div>
      <div style={{ marginTop: '20px' }}>
        <h3>Legend:</h3>
        <ul>
          <li><strong>Pill:</strong> Active heading level tags (Subtle purple bg, grey text).</li>
          <li><strong>Plain Text:</strong> Parent level tags (Plain muted text).</li>
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
