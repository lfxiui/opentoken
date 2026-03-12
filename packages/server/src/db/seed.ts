import { db, schema, sqlite } from './index.js';
import { readFileSync, readdirSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { parse } from 'yaml';
import { PlatformSchema } from '@opentoken/shared';
import { eq } from 'drizzle-orm';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dataDir = resolve(__dirname, '../../../../data/platforms');

async function seed() {
  console.log('🌱 Creating tables...');

  sqlite.exec(`
    CREATE TABLE IF NOT EXISTS platforms (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      slug TEXT NOT NULL UNIQUE,
      logo TEXT,
      website TEXT NOT NULL,
      description TEXT NOT NULL,
      category TEXT NOT NULL,
      tags TEXT DEFAULT '[]',
      free_tier TEXT,
      pricing_url TEXT,
      docs_url TEXT,
      status TEXT NOT NULL DEFAULT 'active',
      last_verified TEXT NOT NULL,
      last_verified_by TEXT,
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      updated_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS promotions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      platform_id INTEGER NOT NULL REFERENCES platforms(id),
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      credit_amount TEXT NOT NULL,
      credit_amount_usd REAL,
      start_date TEXT,
      end_date TEXT,
      is_ongoing INTEGER NOT NULL DEFAULT 0,
      eligibility TEXT,
      promo_url TEXT NOT NULL,
      promo_code TEXT,
      verified_date TEXT NOT NULL,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS submissions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      platform_name TEXT NOT NULL,
      submitted_data TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'pending',
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );
  `);

  console.log('🌱 Seeding database...');

  const files = readdirSync(dataDir).filter(f => f.endsWith('.yaml') || f.endsWith('.yml'));

  for (const file of files) {
    const raw = readFileSync(resolve(dataDir, file), 'utf-8');
    const data = parse(raw);
    const parsed = PlatformSchema.parse(data);

    console.log(`  📦 ${parsed.name} (${file})`);

    // Upsert platform
    const existing = db.select().from(schema.platforms).where(eq(schema.platforms.slug, parsed.slug)).get();

    let platformId: number;

    if (existing) {
      db.update(schema.platforms).set({
        name: parsed.name,
        logo: parsed.logo,
        website: parsed.website,
        description: parsed.description,
        category: parsed.category,
        tags: parsed.tags,
        free_tier: parsed.free_tier ?? null,
        pricing_url: parsed.pricing_url,
        docs_url: parsed.docs_url,
        status: parsed.status,
        last_verified: parsed.last_verified,
        last_verified_by: parsed.last_verified_by,
        updated_at: new Date().toISOString(),
      }).where(eq(schema.platforms.slug, parsed.slug)).run();
      platformId = existing.id;
    } else {
      const result = db.insert(schema.platforms).values({
        name: parsed.name,
        slug: parsed.slug,
        logo: parsed.logo,
        website: parsed.website,
        description: parsed.description,
        category: parsed.category,
        tags: parsed.tags,
        free_tier: parsed.free_tier ?? null,
        pricing_url: parsed.pricing_url,
        docs_url: parsed.docs_url,
        status: parsed.status,
        last_verified: parsed.last_verified,
        last_verified_by: parsed.last_verified_by,
      }).returning().get();
      platformId = result.id;
    }

    // Clear existing promotions for this platform and re-insert
    db.delete(schema.promotions).where(eq(schema.promotions.platform_id, platformId)).run();

    for (const promo of parsed.promotions) {
      db.insert(schema.promotions).values({
        platform_id: platformId,
        title: promo.title,
        description: promo.description,
        credit_amount: promo.credit_amount,
        credit_amount_usd: promo.credit_amount_usd,
        start_date: promo.start_date,
        end_date: promo.end_date,
        is_ongoing: promo.is_ongoing,
        eligibility: promo.eligibility,
        promo_url: promo.promo_url,
        promo_code: promo.promo_code,
        verified_date: promo.verified_date,
      }).run();
    }
  }

  console.log(`✅ Seeded ${files.length} platforms`);
}

seed().catch(console.error);
