import React from 'react';
import { createRoot } from 'react-dom/client';
import { TaskTable } from '../src/components/TaskTable';
import { HeadingTask, HeadingLevel } from '../src/types';

const emptyLevel: HeadingLevel = { id: null, text: null, tags: [] };

const sampleTasks: HeadingTask[] = [
  {
    id: 'project.md:0',
    file: 'project.md',
    h1: { id: 'project.md:0', text: 'Project Alpha', tags: ['work'] },
    h2: emptyLevel, h3: emptyLevel, h4: emptyLevel, h5: emptyLevel, h6: emptyLevel,
    level: 1, text: 'Project Alpha', tags: ['work'], hasChildren: true
  },
  {
    id: 'project.md:1',
    file: 'project.md',
    h1: { id: 'project.md:0', text: 'Project Alpha', tags: ['work'] },
    h2: { id: 'project.md:1', text: 'Design Phase', tags: ['ui'] },
    h3: emptyLevel, h4: emptyLevel, h5: emptyLevel, h6: emptyLevel,
    level: 2, text: 'Design Phase', tags: ['ui'], hasChildren: true
  },
  {
    id: 'project.md:2',
    file: 'project.md',
    h1: { id: 'project.md:0', text: 'Project Alpha', tags: ['work'] },
    h2: { id: 'project.md:1', text: 'Design Phase', tags: ['ui'] },
    h3: { id: 'project.md:2', text: 'Wireframes', tags: [] },
    h4: emptyLevel, h5: emptyLevel, h6: emptyLevel,
    level: 3, text: 'Wireframes', tags: [], hasChildren: false
  },
  {
    id: 'project.md:3',
    file: 'project.md',
    h1: { id: 'project.md:0', text: 'Project Alpha', tags: ['work'] },
    h2: { id: 'project.md:1', text: 'Design Phase', tags: ['ui'] },
    h3: { id: 'project.md:3', text: 'Visual Identity', tags: [] },
    h4: emptyLevel, h5: emptyLevel, h6: emptyLevel,
    level: 3, text: 'Visual Identity', tags: [], hasChildren: false
  },
  {
    id: 'project.md:4',
    file: 'project.md',
    h1: { id: 'project.md:0', text: 'Project Alpha', tags: ['work'] },
    h2: { id: 'project.md:4', text: 'Development Phase', tags: ['coding'] },
    h3: emptyLevel, h4: emptyLevel, h5: emptyLevel, h6: emptyLevel,
    level: 2, text: 'Development Phase', tags: ['coding'], hasChildren: true
  },
  {
    id: 'project.md:5',
    file: 'project.md',
    h1: { id: 'project.md:0', text: 'Project Alpha', tags: ['work'] },
    h2: { id: 'project.md:4', text: 'Development Phase', tags: ['coding'] },
    h3: { id: 'project.md:5', text: 'Backend Setup', tags: [] },
    h4: emptyLevel, h5: emptyLevel, h6: emptyLevel,
    level: 3, text: 'Backend Setup', tags: [], hasChildren: false
  },
  {
    id: 'project.md:6',
    file: 'project.md',
    h1: { id: 'project.md:0', text: 'Project Alpha', tags: ['work'] },
    h2: { id: 'project.md:4', text: 'Development Phase', tags: ['coding'] },
    h3: { id: 'project.md:6', text: 'Frontend Implementation', tags: [] },
    h4: emptyLevel, h5: emptyLevel, h6: emptyLevel,
    level: 3, text: 'Frontend Implementation', tags: [], hasChildren: true
  },
  {
    id: 'project.md:7',
    file: 'project.md',
    h1: { id: 'project.md:0', text: 'Project Alpha', tags: ['work'] },
    h2: { id: 'project.md:4', text: 'Development Phase', tags: ['coding'] },
    h3: { id: 'project.md:6', text: 'Frontend Implementation', tags: [] },
    h4: { id: 'project.md:7', text: 'React Components', tags: [] },
    h5: emptyLevel, h6: emptyLevel,
    level: 4, text: 'React Components', tags: [], hasChildren: false
  },
  {
    id: 'project.md:8',
    file: 'project.md',
    h1: { id: 'project.md:0', text: 'Project Alpha', tags: ['work'] },
    h2: { id: 'project.md:4', text: 'Development Phase', tags: ['coding'] },
    h3: { id: 'project.md:6', text: 'Frontend Implementation', tags: [] },
    h4: { id: 'project.md:8', text: 'CSS Modules', tags: [] },
    h5: emptyLevel, h6: emptyLevel,
    level: 4, text: 'CSS Modules', tags: [], hasChildren: false
  }
];

const mockSettings = {
  levelColors: [
    '#70e0af', // Level 1 - Tealish
    '#70a1e0', // Level 2 - Bluish
    '#e0d270', // Level 3 - Yellowish
    '#e070af', // Level 4 - Pinkish
    '#e0e0e0', // Level 5 - Whitish
    '#e0a170', // Level 6 - Orangish
  ]
};

const App = () => {
  return (
    <div style={{ padding: '20px', background: 'var(--background-primary)', color: 'var(--text-normal)', minHeight: '100vh' }}>
      <h1>Visual Verification: Colored Hierarchy Bars</h1>
      <div style={{ border: '1px solid var(--background-modifier-border)', borderRadius: '8px', overflow: 'hidden' }}>
        <TaskTable tasks={sampleTasks} onOpenLink={(file, heading) => console.log('Open:', file, heading)} settings={mockSettings} />
      </div>
    </div>
  );
};

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(<App />);
}
