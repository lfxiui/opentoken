import { Link } from 'react-router-dom';
import { useApi } from '../hooks/useApi';
import { api } from '../lib/api';
import PlatformCard from '../components/platform/PlatformCard';
import PromoCard from '../components/promotion/PromoCard';

export default function HomePage() {
  const { data: platforms, loading: pLoading } = useApi(() => api.getPlatforms(), []);
  const { data: promos, loading: prLoading } = useApi(() => api.getPromotions(), []);

  const featuredPlatforms = platforms?.slice(0, 6) ?? [];
  const latestPromos = promos?.slice(0, 3) ?? [];

  const stats = {
    platforms: platforms?.length ?? 0,
    freeTiers: platforms?.filter((p: any) => p.free_tier?.available).length ?? 0,
    promos: promos?.length ?? 0,
  };

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-indigo-600 to-purple-700 text-white">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Discover Free AI Credits
          </h1>
          <p className="mt-4 text-lg text-indigo-100 max-w-2xl mx-auto">
            Your open-source directory for AI platform free tiers, credits, and promotions.
            Built for vibe coding developers.
          </p>
          <div className="mt-8 flex gap-4 justify-center">
            <Link
              to="/platforms"
              className="rounded-lg bg-white px-6 py-3 text-sm font-semibold text-indigo-600 shadow hover:bg-indigo-50 transition"
            >
              Browse Platforms
            </Link>
            <Link
              to="/promotions"
              className="rounded-lg border border-white/30 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10 transition"
            >
              View Promotions
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="grid grid-cols-3 gap-8 text-center">
            <div>
              <p className="text-3xl font-bold text-indigo-600">{stats.platforms}</p>
              <p className="mt-1 text-sm text-gray-500">AI Platforms</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-green-600">{stats.freeTiers}</p>
              <p className="mt-1 text-sm text-gray-500">Free Tiers</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-purple-600">{stats.promos}</p>
              <p className="mt-1 text-sm text-gray-500">Active Promotions</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Platforms */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Featured Platforms</h2>
          <Link to="/platforms" className="text-sm font-medium text-indigo-600 hover:text-indigo-700">
            View all &rarr;
          </Link>
        </div>
        {pLoading ? (
          <p className="text-gray-500">Loading platforms...</p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featuredPlatforms.map((p: any) => (
              <PlatformCard key={p.slug} platform={p} />
            ))}
          </div>
        )}
      </section>

      {/* Latest Promotions */}
      <section className="bg-white border-t border-gray-200">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Latest Promotions</h2>
            <Link to="/promotions" className="text-sm font-medium text-indigo-600 hover:text-indigo-700">
              View all &rarr;
            </Link>
          </div>
          {prLoading ? (
            <p className="text-gray-500">Loading promotions...</p>
          ) : latestPromos.length === 0 ? (
            <p className="text-gray-500">No promotions found.</p>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {latestPromos.map((p: any, i: number) => (
                <PromoCard key={i} promo={p} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
