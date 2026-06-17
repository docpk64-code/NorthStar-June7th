const { join } = require('node:path');

/**
 * Puppeteer configuration.
 *
 * Pin the browser download into `node_modules/.cache/puppeteer`. Netlify
 * caches `node_modules` between builds, so Chrome is downloaded once and
 * reused on subsequent builds instead of living in the un-cached default
 * `~/.cache/puppeteer` location (which is what caused the build to fail
 * with "Could not find Chrome").
 */
module.exports = {
  cacheDirectory: join(__dirname, 'node_modules', '.cache', 'puppeteer'),
};
