// Reuse a cached browser instead of invoking npx on every Netlify build.
// A cold build still uses the original Puppeteer installation command.
import { accessSync, constants } from 'node:fs';
import { spawnSync } from 'node:child_process';
import puppeteer from 'puppeteer';

let installed = false;
try {
  const executable = process.env.PUPPETEER_EXECUTABLE_PATH || puppeteer.executablePath();
  accessSync(executable, constants.X_OK);
  installed = true;
} catch {
  // Puppeteer throws when its pinned browser is not present in the cache.
}
if (installed) {
  console.log('Using installed browser for search-page prerendering.');
} else {
  console.log('Installing the pinned Puppeteer browser for prerendering.');
  const result = spawnSync('npx', ['puppeteer', 'browsers', 'install', 'chrome'], { stdio: 'inherit', shell: process.platform === 'win32' });
  if (result.error) throw result.error;
  if (result.status !== 0) process.exit(result.status || 1);
}
