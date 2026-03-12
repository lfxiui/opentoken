export const CATEGORIES = [
  'llm-api',
  'coding-assistant',
  'image-generation',
  'speech',
  'embedding',
  'multi-modal',
  'other',
] as const;

export type Category = (typeof CATEGORIES)[number];

export const CATEGORY_LABELS: Record<Category, string> = {
  'llm-api': 'LLM API',
  'coding-assistant': 'Coding Assistant',
  'image-generation': 'Image Generation',
  'speech': 'Speech',
  'embedding': 'Embedding',
  'multi-modal': 'Multi-Modal',
  'other': 'Other',
};

export const PLATFORM_STATUS = ['active', 'deprecated', 'beta'] as const;
export type PlatformStatus = (typeof PLATFORM_STATUS)[number];
