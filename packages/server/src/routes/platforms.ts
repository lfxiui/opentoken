import { Hono } from 'hono';
import { db, schema } from '../db/index.js';
import { eq, and, like, or } from 'drizzle-orm';

const app = new Hono();

// GET /api/platforms
app.get('/', (c) => {
  const category = c.req.query('category');
  const search = c.req.query('search');
  const status = c.req.query('status') ?? 'active';

  let platforms = db.select().from(schema.platforms).all();

  // Filter by status
  platforms = platforms.filter(p => p.status === status);

  // Filter by category
  if (category) {
    platforms = platforms.filter(p => p.category === category);
  }

  // Filter by search (name + description + tags)
  if (search) {
    const s = search.toLowerCase();
    platforms = platforms.filter(p =>
      p.name.toLowerCase().includes(s) ||
      p.description.toLowerCase().includes(s) ||
      (Array.isArray(p.tags) && p.tags.some((t: string) => t.toLowerCase().includes(s)))
    );
  }

  return c.json({ data: platforms });
});

// GET /api/platforms/:slug
app.get('/:slug', (c) => {
  const slug = c.req.param('slug');
  const platform = db.select().from(schema.platforms)
    .where(eq(schema.platforms.slug, slug)).get();

  if (!platform) {
    return c.json({ error: 'Platform not found' }, 404);
  }

  const promos = db.select().from(schema.promotions)
    .where(eq(schema.promotions.platform_id, platform.id)).all();

  return c.json({ data: { ...platform, promotions: promos } });
});

export default app;
