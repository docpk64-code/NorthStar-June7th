// Reuse a cached browser instead of invoking npx on every Netlify build.
// Cold builds use the pinned browser installer directly.
import { accessSync, constants } from 'node:fs';
import { install, Browser } from '@puppeteer/browsers';
import { PUPPETEER_REVISIONS } from 'puppeteer-core/internal/revisions.js';
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
  // Use the installer directly: a nested npx process can remain running after
  // the browser download completes and prevent Netlify from prerendering.
  await install({
    browser: Browser.CHROME,
    buildId: puppeteer.configuration.browserRevision || PUPPETEER_REVISIONS.chrome,
    cacheDir: puppeteer.configuration.cacheDirectory,
    baseUrl: puppeteer.configuration.downloadBaseUrl,
  });
  accessSync(puppeteer.executablePath(), constants.X_OK);
  console.log('Pinned browser installed; continuing to search-page prerendering.');
}
