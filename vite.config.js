import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// `base: './'` makes every asset path relative, so the same build works at a
// domain root (Vercel) and under a sub-path (GitHub Pages project sites).
export default defineConfig({
  base: './',
  plugins: [react()],
});
