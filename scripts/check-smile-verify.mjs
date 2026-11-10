import assert from 'node:assert/strict';
import verify from '../netlify/functions/smile-verify.mjs';
import { apiKey, isEnabled, credentialProblem } from '../netlify/server/smile-core.mjs';
const previous = { ...process.env }; const fetcher = globalThis.fetch;
const input = (body, origin = 'https://northstarimplants.com') => new Request('https://northstarimplants.com/.netlify/functions/smile-verify', { method: 'POST', headers: { origin, 'content-type': 'application/json' }, body: JSON.stringify(body) });
try {
  delete process.env.OPENAI_API_KEY; process.env.NorthStar_Preview = 'sk-test-only-not-real-credential-1234567890'; process.env.SMILE_AI_TEST_ENABLED = 'false';
  assert.equal(apiKey({OPENAI_API_KEY: 'export OPENAI_API_KEY=\"sk-test-only-not-real-credential-1234567890\"'}), 'sk-test-only-not-real-credential-1234567890');
  assert.equal(apiKey(), 'sk-test-only-not-real-credential-1234567890'); assert.equal(credentialProblem(), null); assert.equal(credentialProblem({OPENAI_API_KEY:'sk-...example'}),'API_CREDENTIAL_MASKED'); assert.equal(credentialProblem({OPENAI_API_KEY:'NorthStar'}),'API_CREDENTIAL_FORMAT'); assert.equal(isEnabled(), false);
  assert.equal((await verify(input({ treatment: 'arch' }))).status, 503);
  process.env.SMILE_AI_TEST_ENABLED = 'true'; let calls = 0;
  globalThis.fetch = async (url, options) => {
    calls++; const data = JSON.parse(options.body);
    assert.equal(url, 'https://api.openai.com/v1/images/edits');
    assert.equal(data.images[0].image_url, 'https://northstarimplants.com/assets/smile-preview/sample-0.webp');
    assert.equal(options.headers.Authorization, 'Bearer sk-test-only-not-real-credential-1234567890');
    return Response.json({ data: [{ b64_json: '/9j/' + 'A'.repeat(136) }] });
  };
  assert.equal((await verify(input({ treatment: 'arch', image: 'patient-content' }))).status, 400);
  assert.equal((await verify(input({ treatment: 'arch', prompt: 'custom' }))).status, 400);
  assert.equal((await verify(input({ treatment: 'arch', image: 'x'.repeat(1024) }))).status, 400);
  assert.equal((await verify(input({ treatment: 'arch' }, 'https://other.example'))).status, 403); assert.equal(calls, 0);
  assert.equal((await verify(input({ treatment: 'arch' }))).status, 200); assert.equal(calls, 1); assert.equal(isEnabled(), false);
  const html = await (await verify(new Request('https://northstarimplants.com/.netlify/functions/smile-verify'))).text();
  assert(html.includes('Run fictional smile test')); assert(!html.includes('type="file"')); assert(!html.includes('sk-test-only-not-real-credential-1234567890'));
  console.log('PASS: saved key alias, sample-only test gate, no patient/custom input, fixed fictional source, same-origin and independent public generation gate. No live API calls.');
} finally { globalThis.fetch = fetcher; for (const key of ['OPENAI_API_KEY', 'NorthStar_Preview', 'SMILE_AI_TEST_ENABLED']) { if (previous[key] === undefined) delete process.env[key]; else process.env[key] = previous[key]; } }
