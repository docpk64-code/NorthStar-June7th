# NorthStar Smile Preview activation

The camera, upload, and sample comparison are public. Personalized generation fails closed until all server-only environment variables below are configured. No credential belongs in GitHub, Vite variables, browser code, or chat.

## Owner setup

1. Create an OpenAI project for NorthStar. Create a project-scoped API key with image-edit permission. Configure billing/usage controls and verify access to `gpt-image-1.5`. Keep the key private.
2. In Netlify project `coruscating-cranachan-7269c6` → Project configuration → Environment variables, add `OPENAI_API_KEY` with **Contains secret values** selected and a value only for the **Production** context. Choose the **Functions** scope if the Netlify plan supports scope selection; otherwise leave Netlify’s default secret-compatible scopes and do not expose the variable through any client-side/build output. The owner enters the value directly. Never use a `VITE_` prefix.
3. Before processing actual patient photographs, confirm the practice’s privacy notice, consent, applicable healthcare agreements with OpenAI and Netlify, and the OpenAI organization/project retention configuration. API billing and patient consent do not themselves establish HIPAA readiness. Do not treat the flags below as certification or an alternative to those arrangements.
4. Only after that review, set `SMILE_AI_PRIVACY_READY=true` and `SMILE_AI_ENABLED=true` for Functions/Production, and redeploy. Keep both false or unset until review is complete.
5. Test using a fictional, non-patient image before patient launch. Verify a concept for each treatment, errors, timing, and cost, including on a real phone and laptop. Existing tests use mocked API responses; they do not confirm live model access or output quality.

## Behavior and limits

- Public availability: `GET /.netlify/functions/smile-status` exposes only activation state and consent version. Generation: `POST /.netlify/functions/smile-generate`.
- Server verifies canonical same-origin requests, supported treatments, current consent, JPEG signature and maximum input size. Server chooses the model and treatment prompt. Arbitrary URLs and user-supplied prompts/models are rejected.
- Browser resizes and re-encodes photos to JPEG on a square canvas, preserving the whole photo with letterboxing and removing original file metadata. The original filename is not transmitted.
- No application database, file store or email copy is created. Photos/results remain in runtime memory and the page; responses are marked `no-store`. This does not promise that infrastructure/OpenAI retain no data. Their agreed controls and safety exceptions still apply.
- Netlify function rate limit: two requests per IP/domain in 180 seconds. This is abuse mitigation, not a guaranteed monthly spending cap or global quota. Monitor platform billing and set appropriate provider controls; disable `SMILE_AI_ENABLED` to stop the service.
- Each call asks `gpt-image-1.5` for one medium-quality 1024×1024 JPEG with high input fidelity. The browser labels results as AI illustrations and never describes them as diagnoses or guaranteed outcomes. Every treatment uses a distinct conservative prompt.
- Netlify synchronous functions have a 60-second execution limit. This integration aborts the upstream request after 52 seconds and shows a graceful error; some image generations may exceed that limit. There are no automatic retries, and a timed-out/canceled provider operation may still incur cost. If real tests show frequent timeouts, move generation to a longer-running HIPAA-appropriate service before patient launch; do not add public photo storage just to work around the timeout.
- Changing/removing a photo or treatment cancels the browser request and invalidates its result. This does not guarantee cancellation of work already accepted by OpenAI.
- The page remains noindex and marked as a demo in navigation pending reviewed activation and a successful live test.

## Checks

```
node scripts/check-smile-ai.mjs
node --import tsx scripts/check-smile-ai-ui.tsx
node --import tsx scripts/check-smile-camera.tsx
npm run test:seo
npx tsc -b && npx vite build
```

References:
- https://developers.openai.com/api/reference/resources/images/methods/edit
- https://developers.openai.com/api/docs/guides/your-data
- https://docs.netlify.com/build/functions/api/
- https://docs.netlify.com/manage/security/secure-access-to-sites/rate-limiting/
