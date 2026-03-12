import { Hono } from 'hono';
import { serve } from '@hono/node-server';
import { corsMiddleware } from './middleware/cors.js';
import platforms from './routes/platforms.js';
import promotions from './routes/promotions.js';
import submissions from './routes/submissions.js';

const app = new Hono();

app.use('*', corsMiddleware);

app.route('/api/platforms', platforms);
app.route('/api/promotions', promotions);
app.route('/api/submissions', submissions);

app.get('/api/health', (c) => c.json({ status: 'ok' }));

const port = Number(process.env.PORT) || 3000;
console.log(`🚀 Server running on http://localhost:${port}`);

serve({ fetch: app.fetch, port });
