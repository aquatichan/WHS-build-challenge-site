import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import App from './App.jsx';
import './styles/index.css';

const root = document.getElementById('root');
const app = (
  <StrictMode>
    <App />
  </StrictMode>
);

// Production builds are prerendered to static HTML (scripts/prerender.mjs), so hydrate;
// the dev server serves an empty #root, so render from scratch.
if (root.hasChildNodes()) hydrateRoot(root, app);
else createRoot(root).render(app);
