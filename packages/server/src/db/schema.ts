import { sqliteTable, text, integer, real } from 'drizzle-orm/sqlite-core';

export const platforms = sqliteTable('platforms', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  slug: text('slug').notNull().unique(),
  logo: text('logo'),
  website: text('website').notNull(),
  description: text('description').notNull(),
  category: text('category').notNull(),
  tags: text('tags', { mode: 'json' }).$type<string[]>().default([]),
  free_tier: text('free_tier', { mode: 'json' }).$type<{
    available: boolean;
    description: string;
    models_included?: string[];
    limits?: Record<string, string>;
    signup_url: string;
    requires_credit_card: boolean;
  } | null>(),
  pricing_url: text('pricing_url'),
  docs_url: text('docs_url'),
  status: text('status').notNull().default('active'),
  last_verified: text('last_verified').notNull(),
  last_verified_by: text('last_verified_by'),
  created_at: text('created_at').notNull().$defaultFn(() => new Date().toISOString()),
  updated_at: text('updated_at').notNull().$defaultFn(() => new Date().toISOString()),
});

export const promotions = sqliteTable('promotions', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  platform_id: integer('platform_id').notNull().references(() => platforms.id),
  title: text('title').notNull(),
  description: text('description').notNull(),
  credit_amount: text('credit_amount').notNull(),
  credit_amount_usd: real('credit_amount_usd'),
  start_date: text('start_date'),
  end_date: text('end_date'),
  is_ongoing: integer('is_ongoing', { mode: 'boolean' }).notNull().default(false),
  eligibility: text('eligibility'),
  promo_url: text('promo_url').notNull(),
  promo_code: text('promo_code'),
  verified_date: text('verified_date').notNull(),
  created_at: text('created_at').notNull().$defaultFn(() => new Date().toISOString()),
});

export const submissions = sqliteTable('submissions', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  platform_name: text('platform_name').notNull(),
  submitted_data: text('submitted_data', { mode: 'json' }).notNull(),
  status: text('status').notNull().default('pending'),
  created_at: text('created_at').notNull().$defaultFn(() => new Date().toISOString()),
});
