/**
 * prerender.mjs  —  NorthStar Implant Dentistry
 * Place at the PROJECT ROOT (same folder as package.json).
 *
 * Build-time prerendering. Runs as the `postbuild` step: it serves the
 * built `dist/` over a local static server, loads every route in headless
 * Chrome, and writes the fully rendered HTML back into `dist/`. Crawlers,
 * AI agents, and social/preview bots therefore receive real content
 * straight from the static deploy — no dependency on Netlify's deprecated
 * runtime "Prerendering" feature.
 *
 * Notes:
 *  - External requests (fonts, analytics, CDN scripts) are blocked because
 *    they hang in CI build environments and stall rendering.
 *  - Capture waits for React to actually mount into #root.
 *  - The local http://localhost:3456 origin baked in by the browser is
 *    rewritten back to the production domain before each file is saved.
 */

import puppeteer from 'puppeteer';
import { createServer } from 'node:http';
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { resolve, join, extname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const DIST = resolve(__dirname, 'dist');
const PORT = 3456;
const ORIGIN = `http://localhost:${PORT}`;
const DOMAIN = 'https://northstarimplants.com';

const MIME = {
  '.html': 'text/html; charset=utf-8', '.js': 'application/javascript',
  '.mjs': 'application/javascript', '.css': 'text/css', '.json': 'application/json',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml', '.ico': 'image/x-icon', '.webp': 'image/webp',
  '.woff2': 'font/woff2', '.woff': 'font/woff', '.mp3': 'audio/mpeg',
};

const ROUTES = [
  '/',
  '/about', '/procedures', '/dental-implants', '/full-arch', '/wisdom-teeth',
  '/sedation', '/patient-information', '/patient-forms', '/technology',
  '/testimonials', '/contact', '/locations',
  '/procedure/tooth-extractions', '/procedure/bone-grafting',
  '/procedure/sinus-lifts', '/procedure/implant-placement',
  '/procedure/ridge-preservation', '/procedure/restorative-coordination',
  '/procedure/remote-anchorage-implant', '/procedure/wisdom-teeth-extractions',
  '/procedure/full-mouth-reconstruction', '/procedure/oral-medicine-pathology',
  '/procedure/pre-prosthetic-surgery', '/procedure/impacted-unerupted-teeth',
  '/procedure/maxillary-expansion-marpe', '/procedure/technology',
  '/specialized/cant-get-implants', '/specialized/botched-smile',
  '/specialized/sub-periosteal-implant',
  '/hydrafacial', '/emface',
];

function startServer() {
  const server = createServer((req, res) => {
    const url = new URL(req.url, ORIGIN);
    let filePath = join(DIST, url.pathname);
    if (!extname(filePath)) {
      const idx = join(filePath, 'index.html');
      filePath = existsSync(idx) ? idx : join(DIST, 'index.html');
    }
    if (!existsSync(filePath)) { res.writeHead(404); return res.end('Not found'); }
    res.writeHead(200, { 'Content-Type': MIME[extname(filePath).toLowerCase()] ?? 'application/octet-stream' });
    res.end(readFileSync(filePath));
  });
  return new Promise(r => server.listen(PORT, '127.0.0.1', () => r(server)));
}

async function prerender() {
  console.log('\n🦷  NorthStar Prerender — starting\n');
  if (!existsSync(DIST)) {
    console.error('❌  dist/ not found. Run "npm run build" first.');
    process.exit(1);
  }

  const server = await startServer();
  console.log(`📡  Static server → ${ORIGIN}`);

  const browser = await puppeteer.launch({
    headless: 'new',
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-gpu',
      '--mute-audio',
      '--disable-dev-shm-usage',   // prevents crashes in low-memory envs
      '--disable-web-security',
    ],
  });

  let ok = 0;
  const failed = [];

  for (const route of ROUTES) {
    const page = await browser.newPage();
    page.on('console', () => {});
    page.on('pageerror', () => {});

    // Set a proper desktop viewport so the compass wheel renders
    await page.setViewport({ width: 1280, height: 800 });

    // Block external requests — Google Fonts, analytics, CDN scripts
    // all hang in the build environment and prevent rendering
    await page.setRequestInterception(true);
    page.on('request', req => {
      if (req.url().startsWith(ORIGIN)) {
        req.continue();
      } else {
        req.abort();   // abort anything external
      }
    });

    try {
      // Use domcontentloaded — doesn't wait for external resources to load
      await page.goto(`${ORIGIN}${route}`, {
        waitUntil: 'domcontentloaded',
        timeout: 20_000,
      });

      // Wait for React to actually mount something inside #root
      await page.waitForFunction(
        () => {
          const root = document.getElementById('root');
          return root && root.children.length > 0;
        },
        { timeout: 15_000 }
      );

      // Let animations and lazy-loaded content settle
      await new Promise(r => setTimeout(r, 1500));

      let html = await page.content();

      // Verify the snapshot actually has content before saving
      if (!html.includes('id="root"><')) {
        throw new Error('React did not render into #root');
      }

      // Rewrite the local origin baked in by the browser to the real domain
      html = html.split(ORIGIN).join(DOMAIN);

      if (route === '/') {
        writeFileSync(join(DIST, 'index.html'), html, 'utf8');
      } else {
        const outDir = join(DIST, route);
        mkdirSync(outDir, { recursive: true });
        writeFileSync(join(outDir, 'index.html'), html, 'utf8');
      }

      ok++;
      console.log(`  ✓  ${route}`);
    } catch (err) {
      failed.push(route);
      console.error(`  ✗  ${route}  →  ${err.message}`);
    } finally {
      await page.close();
    }
  }

  await browser.close();
  server.close();

  console.log(`\n${'─'.repeat(44)}`);
  if (failed.length === 0) {
    console.log(`✅  ${ok}/${ROUTES.length} pages prerendered.\n`);
  } else {
    console.log(`⚠️   ${ok} ok · ${failed.length} failed:\n`);
    failed.forEach(r => console.log(`     ${r}`));
    process.exit(1);
  }
}

prerender().catch(err => {
  console.error('\n❌  Prerender crashed:', err.message);
  process.exit(1);
});
