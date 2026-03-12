const API_BASE = '/api';

async function fetchApi<T>(path: string): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`);
  if (!res.ok) {
    throw new Error(`API error: ${res.status} ${res.statusText}`);
  }
  const json = await res.json();
  return json.data;
}

export const api = {
  getPlatforms: (params?: { category?: string; search?: string }) => {
    const sp = new URLSearchParams();
    if (params?.category) sp.set('category', params.category);
    if (params?.search) sp.set('search', params.search);
    const qs = sp.toString();
    return fetchApi<any[]>(`/platforms${qs ? `?${qs}` : ''}`);
  },

  getPlatform: (slug: string) => fetchApi<any>(`/platforms/${slug}`),

  getPromotions: () => fetchApi<any[]>('/promotions'),

  submitPlatform: async (data: any) => {
    const res = await fetch(`${API_BASE}/submissions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error(`Submit failed: ${res.status}`);
    return res.json();
  },
};
