export const SITE_ORIGIN = 'https://northstarimplants.com';
export function routeKey(path: string) { return path.replace(/\/+$/, '') || '/'; }
export function pagePath(path: string) { const key = routeKey(path); return key === '/' ? '/' : `${key}/`; }
export function canonicalUrl(path: string) { return SITE_ORIGIN + pagePath(path); }
