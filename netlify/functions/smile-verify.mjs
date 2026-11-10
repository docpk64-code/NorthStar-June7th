import { apiKey, editSmile, json, readLimitedJSON, sameOrigin } from '../server/smile-core.mjs';
import { testPage } from '../server/smile-test-page.mjs';
export default async function handler(request) {
  const enabled = process.env.SMILE_AI_TEST_ENABLED === 'true';
  if (request.method === 'GET') return new Response(testPage(enabled), { headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store, private', 'X-Robots-Tag': 'noindex, nofollow', 'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; connect-src 'self'; frame-ancestors 'none'; base-uri 'none'" } });
  if (request.method !== 'POST') return json({ error: 'Method not allowed.' }, 405);
  if (!sameOrigin(request)) return json({ error: 'Use the NorthStar test page.' }, 403);
  if (!enabled) return json({ error: 'The fictional-image connection test is currently disabled.' }, 503);
  if (!apiKey()) return json({ error: 'No API credential is available to this deployment.', diagnostic: 'API_CREDENTIAL_MISSING' }, 503);
  if (!request.headers.get('content-type')?.startsWith('application/json')) return json({ error: 'Use the test controls.' }, 415);
  if (Number(request.headers.get('content-length')) > 512) return json({ error: 'This endpoint does not accept photos.' }, 413);
  let input;
  try { input = await readLimitedJSON(request, 512); } catch { return json({ error: 'Invalid test request.' }, 400); }
  if (!input || Object.keys(input).some(key => key !== 'treatment') || !['arch', 'aligners', 'veneers'].includes(input.treatment)) return json({ error: 'Choose a test treatment. Uploads and custom prompts are not accepted.' }, 400);
  // This constant is a previously generated fictional adult, already public on the site.
  // The endpoint accepts no image data, filename, URL, user prompt or patient input.
  return editSmile({ treatment: input.treatment, image: 'https://northstarimplants.com/assets/smile-preview/sample-0.webp' }, request);
}
export const config = { rateLimit: { action: 'rate_limit', windowLimit: 4, windowSize: 180, aggregateBy: ['ip', 'domain'] } };
