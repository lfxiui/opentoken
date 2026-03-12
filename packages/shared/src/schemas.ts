import { z } from 'zod';

export const CategoryEnum = z.enum([
  'llm-api',
  'coding-assistant',
  'image-generation',
  'speech',
  'embedding',
  'multi-modal',
  'other',
]);

export const FreeTierSchema = z.object({
  available: z.boolean(),
  description: z.string(),
  models_included: z.array(z.string()).optional(),
  limits: z.record(z.string(), z.string()).optional(),
  signup_url: z.string().url(),
  requires_credit_card: z.boolean(),
});

export const PromotionSchema = z.object({
  title: z.string(),
  description: z.string(),
  credit_amount: z.string(),
  credit_amount_usd: z.number().optional(),
  start_date: z.string().optional(),
  end_date: z.string().optional(),
  is_ongoing: z.boolean().default(false),
  eligibility: z.string().optional(),
  promo_url: z.string().url(),
  promo_code: z.string().optional(),
  verified_date: z.string(),
});

export const PlatformSchema = z.object({
  name: z.string(),
  slug: z.string(),
  logo: z.string().optional(),
  website: z.string().url(),
  description: z.string(),
  category: CategoryEnum,
  tags: z.array(z.string()).default([]),
  free_tier: FreeTierSchema.optional(),
  promotions: z.array(PromotionSchema).default([]),
  pricing_url: z.string().url().optional(),
  docs_url: z.string().url().optional(),
  status: z.enum(['active', 'deprecated', 'beta']).default('active'),
  last_verified: z.string(),
  last_verified_by: z.string().optional(),
});

export type FreeTier = z.infer<typeof FreeTierSchema>;
export type Promotion = z.infer<typeof PromotionSchema>;
export type Platform = z.infer<typeof PlatformSchema>;
