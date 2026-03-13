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
  'coding-assistant': '编程助手',
  'image-generation': '图像生成',
  'speech': '语音',
  'embedding': '向量嵌入',
  'multi-modal': '多模态',
  'other': '其他',
};

export const PLATFORM_STATUS = ['active', 'deprecated', 'beta'] as const;
export type PlatformStatus = (typeof PLATFORM_STATUS)[number];
