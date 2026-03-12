import { Hono } from 'hono';
import { db, schema } from '../db/index.js';

const app = new Hono();

// POST /api/submissions
app.post('/', async (c) => {
  const body = await c.req.json();

  const result = db.insert(schema.submissions).values({
    platform_name: body.platform_name,
    submitted_data: body,
    status: 'pending',
  }).returning().get();

  return c.json({ data: result }, 201);
});

export default app;
