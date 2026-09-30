// Injects the server-rendered page into dist/index.html so the content paints
// before any JavaScript runs (fast first load on phones), then React hydrates.
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const root = path.resolve(import.meta.dirname, '..');
const dist = path.join(root, 'dist');
const ssrDir = path.join(root, 'dist-ssr');
const entry = fs.readdirSync(ssrDir).find((f) => /^entry-server\.m?js$/.test(f));
if (!entry) throw new Error('prerender: SSR bundle not found in dist-ssr/');

const { render } = await import(pathToFileURL(path.join(ssrDir, entry)).href);
const templatePath = path.join(dist, 'index.html');
const template = fs.readFileSync(templatePath, 'utf8');
const marker = '<div id="root"></div>';
if (!template.includes(marker)) throw new Error('prerender: #root marker not found');

fs.writeFileSync(templatePath, template.replace(marker, `<div id="root">${render()}</div>`));
fs.rmSync(ssrDir, { recursive: true, force: true });
console.log('prerender: wrote dist/index.html');
