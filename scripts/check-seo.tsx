import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import React, { act } from 'react';
import { JSDOM } from 'jsdom';

const dom = new JSDOM('<!doctype html><html><head></head><body><div id="root"></div></body></html>', {
  url: 'https://northstarimplants.com/', pretendToBeVisual: true,
});
const { window } = dom;
Object.assign(globalThis, { window, document: window.document, HTMLElement: window.HTMLElement,
  PopStateEvent: window.PopStateEvent, requestAnimationFrame: window.requestAnimationFrame.bind(window),
  cancelAnimationFrame: window.cancelAnimationFrame.bind(window), React, IS_REACT_ACT_ENVIRONMENT: true });
Object.defineProperty(globalThis, 'navigator', { value: window.navigator, configurable: true });
globalThis.IntersectionObserver = class { observe() {} disconnect() {} unobserve() {} } as any;
window.scrollTo = () => {};
window.matchMedia = () => ({ matches: false, addEventListener() {}, removeEventListener() {} }) as any;
const { createRoot } = await import('react-dom/client');
const { default: Root, navigate } = await import('../src/Root');
const root = createRoot(document.getElementById('root')!);
const routes = [...readFileSync('src/Root.tsx', 'utf8').matchAll(/^  '([^']+)':/gm)].map(m => m[1]);
const sitemap = readFileSync('public/sitemap.xml', 'utf8');
const redirects = readFileSync('public/_redirects', 'utf8');
const pathFor = (route: string) => route === '/' ? '/' : route + '/';
async function settle() {
  for (let i = 0; i < 30; i++) {
    await act(async () => { await new Promise(r => setTimeout(r, 10)); });
    if (document.querySelector('h1')) return;
  }
  throw new Error('Page did not render');
}
for (const route of routes) {
  for (const path of new Set([route, pathFor(route)])) {
    await act(async () => {
      window.history.replaceState({}, '', path);
      root.render(<Root key={path} />);
    });
    await settle();
    assert.equal(document.querySelectorAll('link[rel="canonical"]').length, 1, path);
    assert.equal(document.querySelector('link[rel="canonical"]')?.getAttribute('href'), 'https://northstarimplants.com' + pathFor(route), path);
    assert.equal(document.querySelector('meta[name="robots"]')?.getAttribute('content'), 'index, follow', path);
    assert.equal(document.querySelectorAll('#schema-northstar').length, 1);
    assert(!document.querySelector('#schema-northstar')!.textContent!.includes('[EDIT'));
    if (route.startsWith('/locations/')) {
      const id = route.split('/').pop();
      const graph = JSON.parse(document.querySelector('#schema-northstar')!.textContent!)['@graph'];
      const dentists = graph.filter((item: any) => item['@type'] === 'Dentist');
      assert.equal(dentists.length, id === 'brooklyn' ? 0 : 1, path);
      if (id !== 'brooklyn') {
        assert.equal(dentists[0].url, 'https://northstarimplants.com' + pathFor(route));
        assert.equal(dentists[0].openingHoursSpecification[0].closes, '20:00');
      } else {
        assert(document.querySelector('main')!.textContent!.includes('not yet open'));
        assert(!document.querySelector('main')!.textContent!.includes('Monday–Saturday: 9am–8pm'));
      }
      assert.equal(document.querySelectorAll('iframe[title^="Map of NorthStar"]').length, 1);
      assert.equal(document.querySelectorAll('nav[aria-label="Other offices"] a').length, 3);
    }
    if (route !== '/') assert(!document.querySelector('h1')!.textContent!.includes('Welcome To'), path);
    if (route === '/') {
      assert.equal(document.querySelectorAll('a.care-card-link[href]').length, 11);
      assert.equal(document.querySelectorAll('a.compass-segment[href]').length, 12);
    }
  }
  assert(sitemap.includes('https://northstarimplants.com' + pathFor(route) + '</loc>'), route);
  assert(!redirects.includes('301!'), 'Slash-only forced redirects can loop on Netlify');
}
await act(async () => navigate('/dental-implants'));
await settle();
assert.equal(window.location.pathname, '/dental-implants/');
assert.equal(document.querySelector('h1')!.textContent, 'Dental Implants');
await act(async () => document.querySelector<HTMLAnchorElement>('.page-nav-links a[href="/full-arch/"]')!.click());
await settle();
assert.equal(document.querySelector('h1')!.textContent, 'Full-Arch Solutions');
await act(async () => navigate('/this-page-does-not-exist'));
await settle();
assert.equal(document.querySelector('h1')!.textContent, 'Page not found');
assert.equal(document.querySelector('meta[name="robots"]')?.getAttribute('content'), 'noindex, follow');
assert.equal(document.querySelectorAll('link[rel="canonical"]').length, 0);
assert(redirects.includes('/*  /404.html  404'));
await act(async () => root.unmount());
dom.window.close();
console.log(`PASS: ${routes.length} routes, slash variants, canonical tags, schema, crawlable links, client navigation, sitemap, and not-found state.`);
