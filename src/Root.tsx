import React from 'react';
import {App} from './App';

/**
 * Root component that wraps the application with necessary providers.
 */
const RootComponent = () => {
  return (
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
};

export {RootComponent as Root};
