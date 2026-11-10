import { generate } from '../server/smile-core.mjs';
export default request => generate(request);
export const config = { rateLimit: { action: 'rate_limit', windowLimit: 2, windowSize: 180, aggregateBy: ['ip', 'domain'] } };
