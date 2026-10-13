# Search visibility repairs

Prepared on branch `fix/search-visibility`. These changes are not deployed.

## Changes

- Each of the 33 routes gets a self-referencing canonical URL on https://northstarimplants.com, with directory-style trailing slashes.
- The router accepts both slash variants. Unknown routes show a noindex not-found page instead of the homepage.
- Service cards, compass wedges, procedure cards, shared navigation, breadcrumbs and consultation links use real anchors. HTML links retain client navigation and normal modified-click behavior.
- Prerendering starts each route from the original Vite shell, avoiding metadata/style contamination from the homepage. It waits for the route's canonical tag and heading, includes Terms, and writes 404.html.
- Netlify redirects, robots.txt and the sitemap agree on page addresses. The wildcard now serves 404.html with status 404; real static pages retain priority. Slash-only redirect rules are intentionally omitted because Netlify normalizes paths before matching rules (https://docs.netlify.com/manage/routing/redirects/redirect-options/).
- One shared schema describes the organization and the three active offices, with full addresses. Removed placeholder addresses, unverified map coordinates, missing logo URL and conflicting structured-data hours.
- Replaced development-oriented homepage card descriptions and case captions with patient-facing wording.
- `build` now uses `tsc -b` so the referenced TypeScript projects are actually checked.

## Validation

Passed: TypeScript project build, Vite production compilation, and `npm run test:seo`.
The DOM regression suite covers all 33 routes with/without trailing slashes, metadata, office schema, homepage links, client-side navigation, sitemap coverage and safe fallback configuration, and unknown routes.

Browser visual QA and the Puppeteer prerender step could not run in this execution environment: Chrome was blocked from creating its process singleton socket. The DOM tests do not replace those checks. Run `npm ci` and `npm run build` in Netlify or a normal local environment, then inspect the deploy preview before merging. The production bundle also reports an existing large page chunk; performance optimization is a separate follow-up.

## Deploy-preview checks

1. Verify the connected repository, production branch, build command and publish directory in Netlify. Use a branch/deploy preview first. Do not merge into the production branch until review is complete.
2. Confirm the build prerenders all 34 outputs (33 real routes plus 404).
3. Open /dental-implants/, /full-arch/, /locations/ and /terms/ directly; refresh and test browser back/forward. Verify desktop/mobile navigation, compass, call links and forms without submitting a test inquiry.
4. Confirm unknown URLs return HTTP 404, and canonical URLs, sitemap and www redirects all resolve consistently. Canonical hostname should be northstarimplants.com.
5. Inspect the HTML source, not only the browser DOM, for the correct page-specific canonical and content.

## Content needing owner confirmation

- Briarwood, Manhattan and Commack are active. Melville is an old listing and should be updated in business directories/Google Business Profile as appropriate, preserving the existing business history where possible.
- Owner confirmed hours on October 12, 2026: Monday–Saturday 9am–8pm at all three locations; Sunday by appointment. All displayed schedules and office structured data now agree. Sunday has no fixed opening interval in structured data.
- About page has unfinished introductory copy and biographies for Dr. Nelson and Dr. Garcia. Terms has publish-date/contact placeholders. These were not fabricated.
- Testimonials page still contains explicit review placeholders. Homepage quotations and case images need confirmation as authentic/authorized before publishing any replacement claims. Several case sliders contain gradient placeholders. This patch updates captions but does not certify the material as actual results.
- Social icons still need confirmed destination URLs.
- No Google Business Profile or directory edits have been made.

## After publication

In Google Search Console, inspect the homepage and key treatment URLs. Compare user-declared and Google-selected canonicals, review page-indexing exclusions, submit the sitemap, and request indexing for the corrected pages. Recheck after Google recrawls. Code corrections do not guarantee ranking positions.
