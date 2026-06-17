/**
 * install-chrome.mjs — NorthStar Implant Dentistry
 *
 * Ensures the Chrome build that Puppeteer expects is present before the
 * prerender step runs. Netlify caches node_modules but does not always
 * persist the Puppeteer browser cache (/opt/buildhome/.cache/puppeteer),
 * so the postbuild prerender can fail with "Could not find Chrome".
 *
 * This installs the exact Chrome revision pinned to the installed
 * Puppeteer version, into Puppeteer's own cache directory. It is
 * idempotent: an already-downloaded browser is reused instantly.
 */

import { execFileSync } from 'node:child_process';

console.log('\n🌐  Ensuring Chrome is available for Puppeteer…');

try {
  // `puppeteer browsers install chrome` (no version) installs the revision
  // that the locally installed Puppeteer is pinned to, into the configured
  // PUPPETEER_CACHE_DIR. Already-present downloads are skipped.
  execFileSync(
    process.execPath,
    ['node_modules/puppeteer/lib/esm/puppeteer/node/cli.js', 'browsers', 'install', 'chrome'],
    { stdio: 'inherit' }
  );
  console.log('✅  Chrome is ready.\n');
} catch (err) {
  // Fall back to the public CLI entry if the internal path changes.
  try {
    execFileSync('npx', ['--no-install', 'puppeteer', 'browsers', 'install', 'chrome'], {
      stdio: 'inherit',
    });
    console.log('✅  Chrome is ready.\n');
  } catch (err2) {
    console.error('❌  Failed to install Chrome for Puppeteer:', err2.message);
    process.exit(1);
  }
}
