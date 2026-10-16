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
  '/locations/briarwood', '/locations/manhattan', '/locations/commack', '/locations/brooklyn',
  '/about', '/procedures', '/dental-implants', '/full-arch', '/wisdom-teeth',
  '/sedation', '/patient-information', '/patient-forms', '/patient-forms/hipaa', '/patient-forms/new-patient', '/patient-forms/consent/oral-surgery', '/patient-forms/consent/all-on-x', '/patient-forms/consent/subperiosteal', '/technology',
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
  '/hydrafacial', '/emface', '/terms',
];

function startServer() {
  // Always render from the unmodified Vite shell, never a previously rendered page.
  const shell = readFileSync(join(DIST, 'index.html'));
  const server = createServer((req, res) => {
    const url = new URL(req.url, `http://localhost:${PORT}`);
    let filePath = join(DIST, url.pathname);
    if (!extname(filePath)) {
      res.writeHead(200, { 'Content-Type': MIME['.html'] });
      return res.end(shell);
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

  const launchBrowser = () => puppeteer.launch({
    headless: 'new',
    ...(process.env.PUPPETEER_EXECUTABLE_PATH ? { executablePath: process.env.PUPPETEER_EXECUTABLE_PATH } : {}),
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-gpu',
      '--mute-audio',
      '--disable-dev-shm-usage',
    ],
  });

  let browser = await launchBrowser();
  let ok = 0;
  const failed = [];

  for (const route of [...ROUTES, '/404']) {
    for (let attempt = 1; attempt <= 3; attempt++) {
      let page;
      try {
        if (!browser || !browser.connected) browser = await launchBrowser();
        page = await browser.newPage();
        await page.setViewport({ width: 1280, height: 800 });
        await page.setRequestInterception(true);
        page.on('request', req => {
          req.url().startsWith(`http://localhost:${PORT}`) ? req.continue() : req.abort();
        });

      await page.goto(`http://localhost:${PORT}${route === "/" ? "/" : route + "/"}`, {
        waitUntil: 'domcontentloaded',
        timeout: 20_000,
      });

      await page.waitForFunction((expected) => {
        const h1 = document.querySelector('h1');
        const canonical = document.querySelector('link[rel="canonical"]');
        return h1 && (expected === '/404'
          ? document.querySelector('meta[name="robots"]')?.content.includes('noindex')
          : canonical?.getAttribute('href') === 'https://northstarimplants.com' + (expected === '/' ? '/' : expected + '/'));
      }, { timeout: 15000 }, route);

      const html = await page.content();

      const cleanHtml = html.replaceAll(`http://localhost:${PORT}`, DOMAIN);

      if (!cleanHtml.includes('id="root"><')) {
        throw new Error('React did not render into #root');
      }

      if (route === '/404') {
        writeFileSync(join(DIST, '404.html'), cleanHtml, 'utf8');
      } else if (route === '/') {
        writeFileSync(join(DIST, 'index.html'), cleanHtml, 'utf8');
      } else {
        const outDir = join(DIST, route);
        mkdirSync(outDir, { recursive: true });
        writeFileSync(join(outDir, 'index.html'), cleanHtml, 'utf8');
      }

      ok++;
      console.log(`  ✓  ${route}`);
      break;
      } catch (err) {
        console.error(`  Attempt ${attempt}/3 for ${route}: ${err.message}`);
        if (attempt === 3) failed.push(route);
        // Discard the failed browser session, then retry the same route.
        await browser?.close().catch(() => {});
        browser = null;
      } finally {
        await page?.close().catch(() => {});
      }
    }
  }

  await browser?.close().catch(() => {});
  server.close();

  console.log(`\n${'─'.repeat(44)}`);
  if (failed.length === 0) {
    console.log(`✅  ${ok}/${ROUTES.length + 1} pages prerendered.\n`);
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