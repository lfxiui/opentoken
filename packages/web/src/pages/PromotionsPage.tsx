import { useApi } from '../hooks/useApi';
import { api } from '../lib/api';
import PromoCard from '../components/promotion/PromoCard';

export default function PromotionsPage() {
  const { data: promos, loading, error } = useApi(() => api.getPromotions(), []);

  // Sort: ongoing first, then by end_date (soonest first), expired last
  const sorted = promos?.slice().sort((a: any, b: any) => {
    if (a.is_ongoing && !b.is_ongoing) return -1;
    if (!a.is_ongoing && b.is_ongoing) return 1;
    if (a.end_date && b.end_date) return new Date(a.end_date).getTime() - new Date(b.end_date).getTime();
    if (a.end_date && !b.end_date) return -1;
    return 0;
  }) ?? [];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Promotions & Free Credits</h1>
        <p className="mt-2 text-gray-500">
          Active promotions and free credit offers across AI platforms. Expiring soon items are highlighted.
        </p>
      </div>

      {loading ? (
        <p className="text-gray-500">Loading promotions...</p>
      ) : error ? (
        <p className="text-red-500">Error: {error}</p>
      ) : sorted.length === 0 ? (
        <p className="text-gray-500">No promotions found.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sorted.map((p: any, i: number) => (
            <PromoCard key={i} promo={p} />
          ))}
        </div>
      )}
    </div>
  );
}
