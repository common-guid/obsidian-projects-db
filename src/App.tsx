import React from 'react';
import {TaskTable} from './components/TaskTable';

/**
 * Root React component for the TaskDB interface.
 */
const App = () => {
  return (
    <div className="taskdb-container">
      <h1>TaskDB</h1>
      <p>Notion-style database for Obsidian tasks.</p>
      <TaskTable />
    </div>
  );
};

export {App};
