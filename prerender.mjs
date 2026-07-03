/**
 * prerender.mjs  —  NorthStar Implant Dentistry  (v3)
 * Place at the PROJECT ROOT (same folder as package.json).
 *
 * v3 fix: replaces localhost:3456 URLs baked in by Puppeteer
 * with the real domain before saving each HTML file.
 */

import puppeteer from 'puppeteer';
import { createServer } from 'node:http';
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { resolve, join, extname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const DIST = resolve(__dirname, 'dist');
const PORT = 3456;
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
    const url = new URL(req.url, `http://localhost:${PORT}`);
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
  console.log('\n🦷  NorthStar Prerender v3 — starting\n');
  if (!existsSync(DIST)) {
    console.error('❌  dist/ not found. Run "npm run build" first.');
    process.exit(1);
  }

  const server = await startServer();
  console.log(`📡  Static server → http://localhost:${PORT}`);

  const browser = await puppeteer.launch({
    headless: 'new',
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-gpu',
      '--mute-audio',
      '--disable-dev-shm-usage',
      '--disable-web-security',
    ],
  });

  let ok = 0;
  const failed = [];

  for (const route of ROUTES) {
    const page = await browser.newPage();
    page.on('console', () => {});
    page.on('pageerror', () => {});

    await page.setViewport({ width: 1280, height: 800 });

    await page.setRequestInterception(true);
    page.on('request', req => {
      req.url().startsWith(`http://localhost:${PORT}`) ? req.continue() : req.abort();
    });

    try {
      await page.goto(`http://localhost:${PORT}${route}`, {
        waitUntil: 'domcontentloaded',
        timeout: 20_000,
      });

      await page.waitForFunction(
        () => {
          const root = document.getElementById('root');
          return root && root.children.length > 0;
        },
        { timeout: 15_000 }
      );

      await new Promise(r => setTimeout(r, 1500));

      const html = await page.content();

      const cleanHtml = html.replaceAll(`http://localhost:${PORT}`, DOMAIN);

      if (!cleanHtml.includes('id="root"><')) {
        throw new Error('React did not render into #root');
      }

      if (route === '/') {
        writeFileSync(join(DIST, 'index.html'), cleanHtml, 'utf8');
      } else {
        const outDir = join(DIST, route);
        mkdirSync(outDir, { recursive: true });
        writeFileSync(join(outDir, 'index.html'), cleanHtml, 'utf8');
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