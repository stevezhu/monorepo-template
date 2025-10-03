import './main.css';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { App } from './App';

const rootEl = document.getElementById('root');
if (!rootEl) throw new Error('Failed to get root element');

const root = createRoot(rootEl);
root.render(
  <StrictMode>
    <App />
  </StrictMode>,
);
