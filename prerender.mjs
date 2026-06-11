import puppeteer from 'puppeteer';
import { createServer } from 'http';
import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { join, extname, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST = join(__dirname, 'dist');

const ROUTES = [
  '/',
  '/about',
  '/procedures',
  '/dental-implants',
  '/full-arch',
  '/wisdom-teeth',
  '/sedation',
  '/patient-information',
  '/patient-forms',
  '/technology',
  '/testimonials',
  '/contact',
  '/locations',
  '/procedure/tooth-extractions',
  '/procedure/bone-grafting',
  '/procedure/sinus-lifts',
  '/procedure/implant-placement',
  '/procedure/ridge-preservation',
  '/procedure/restorative-coordination',
  '/procedure/remote-anchorage-implant',
  '/procedure/wisdom-teeth-extractions',
  '/procedure/full-mouth-reconstruction',
  '/procedure/oral-medicine-pathology',
  '/procedure/pre-prosthetic-surgery',
  '/procedure/impacted-unerupted-teeth',
  '/procedure/maxillary-expansion-marpe',
  '/procedure/technology',
  '/specialized/cant-get-implants',
  '/specialized/botched-smile',
  '/specialized/sub-periosteal-implant',
  '/hydrafacial',
  '/emface',
];

const MIME = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.mjs': 'application/javascript',
  '.css': 'text/css',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.json': 'application/json',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.txt': 'text/plain',
  '.xml': 'application/xml',
};

function startServer(port = 3099) {
  return new Promise((resolve, reject) => {
    const server = createServer((req, res) => {
      const url = req.url.split('?')[0];
      const ext = extname(url);
      const filePath = ext && MIME[ext] ? join(DIST, url) : join(DIST, 'index.html');

      try {
        const content = readFileSync(filePath);
        res.writeHead(200, { 'Content-Type': MIME[extname(filePath)] || 'application/octet-stream' });
        res.end(content);
      } catch {
        res.writeHead(404);
        res.end('Not found');
      }
    });

    server.listen(port, '127.0.0.1', () => resolve({ server, port }));
    server.on('error', reject);
  });
}

async function main() {
  console.log('prerender: starting...');

  const { server, port } = await startServer();

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
  });

  try {
    for (const route of ROUTES) {
      const url = `http://127.0.0.1:${port}${route}`;
      console.log(`prerender: ${route}`);

      const page = await browser.newPage();
      await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });
      const html = await page.content();
      await page.close();

      const segments = route === '/' ? [] : route.slice(1).split('/');
      const outDir = join(DIST, ...segments);
      mkdirSync(outDir, { recursive: true });
      writeFileSync(join(outDir, 'index.html'), html, 'utf8');
    }
  } finally {
    await browser.close();
    await new Promise((resolve) => server.close(resolve));
  }

  console.log('prerender: done — ' + ROUTES.length + ' routes rendered.');
}

main().catch((err) => {
  console.error('prerender: error', err);
  process.exit(1);
});
