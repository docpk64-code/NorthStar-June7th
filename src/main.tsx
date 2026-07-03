/**
 * main.tsx — No react-router-dom needed.
 * Uses a simple custom router built into the app.
 */
import React from 'react';
import ReactDOM from 'react-dom/client';
import Root from './Root';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);
