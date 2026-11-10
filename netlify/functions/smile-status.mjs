import { CONSENT_VERSION, isEnabled, json } from '../server/smile-core.mjs';
export default request => request.method === 'GET' ? json({ enabled: isEnabled(), consentVersion: CONSENT_VERSION }) : json({ error: 'Method not allowed.' }, 405);
