import { Hono } from 'hono';
import { db, schema } from '../db/index.js';
import { eq, desc } from 'drizzle-orm';

const app = new Hono();

// GET /api/promotions
app.get('/', (c) => {
  const promos = db.select({
    id: schema.promotions.id,
    title: schema.promotions.title,
    description: schema.promotions.description,
    credit_amount: schema.promotions.credit_amount,
    credit_amount_usd: schema.promotions.credit_amount_usd,
    start_date: schema.promotions.start_date,
    end_date: schema.promotions.end_date,
    is_ongoing: schema.promotions.is_ongoing,
    eligibility: schema.promotions.eligibility,
    promo_url: schema.promotions.promo_url,
    promo_code: schema.promotions.promo_code,
    verified_date: schema.promotions.verified_date,
    platform_id: schema.promotions.platform_id,
    platform_name: schema.platforms.name,
    platform_slug: schema.platforms.slug,
    platform_logo: schema.platforms.logo,
  })
    .from(schema.promotions)
    .innerJoin(schema.platforms, eq(schema.promotions.platform_id, schema.platforms.id))
    .orderBy(desc(schema.promotions.end_date))
    .all();

  return c.json({ data: promos });
});

export default app;
