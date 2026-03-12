import { useParams, Link } from 'react-router-dom';
import { useApi } from '../hooks/useApi';
import { api } from '../lib/api';
import { CATEGORY_LABELS, type Category } from '@opentoken/shared';
import Badge from '../components/common/Badge';
import PromoCard from '../components/promotion/PromoCard';

export default function PlatformDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { data: platform, loading, error } = useApi(
    () => api.getPlatform(slug!),
    [slug]
  );

  if (loading) return <div className="mx-auto max-w-4xl px-4 py-8"><p className="text-gray-500">Loading...</p></div>;
  if (error) return <div className="mx-auto max-w-4xl px-4 py-8"><p className="text-red-500">Error: {error}</p></div>;
  if (!platform) return <div className="mx-auto max-w-4xl px-4 py-8"><p className="text-gray-500">Platform not found.</p></div>;

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <Link to="/platforms" className="text-sm text-indigo-600 hover:text-indigo-700">&larr; Back to Platforms</Link>

      <div className="mt-6">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{platform.name}</h1>
            <p className="mt-2 text-gray-500">{platform.description}</p>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <Badge variant="info">{CATEGORY_LABELS[platform.category as Category] || platform.category}</Badge>
          {platform.status === 'beta' && <Badge variant="warning">Beta</Badge>}
          {platform.tags?.map((tag: string) => <Badge key={tag}>{tag}</Badge>)}
        </div>

        <div className="mt-6 flex gap-3">
          <a href={platform.website} target="_blank" rel="noopener noreferrer"
            className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 transition">
            Visit Website
          </a>
          {platform.docs_url && (
            <a href={platform.docs_url} target="_blank" rel="noopener noreferrer"
              className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition">
              Documentation
            </a>
          )}
          {platform.pricing_url && (
            <a href={platform.pricing_url} target="_blank" rel="noopener noreferrer"
              className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition">
              Pricing
            </a>
          )}
        </div>
      </div>

      {/* Free Tier */}
      {platform.free_tier && (
        <div className="mt-8 rounded-lg border border-green-200 bg-green-50 p-6">
          <h2 className="text-xl font-semibold text-green-800">Free Tier</h2>
          <p className="mt-2 text-green-700">{platform.free_tier.description}</p>

          {platform.free_tier.models_included?.length > 0 && (
            <div className="mt-4">
              <h3 className="text-sm font-medium text-green-800">Models Included</h3>
              <div className="mt-1 flex flex-wrap gap-1">
                {platform.free_tier.models_included.map((m: string) => (
                  <Badge key={m} variant="success">{m}</Badge>
                ))}
              </div>
            </div>
          )}

          {platform.free_tier.limits && Object.keys(platform.free_tier.limits).length > 0 && (
            <div className="mt-4">
              <h3 className="text-sm font-medium text-green-800">Limits</h3>
              <dl className="mt-1 space-y-1">
                {Object.entries(platform.free_tier.limits).map(([k, v]) => (
                  <div key={k} className="flex gap-2 text-sm">
                    <dt className="font-medium text-green-700">{k}:</dt>
                    <dd className="text-green-600">{v as string}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}

          <div className="mt-4 flex items-center gap-4">
            <a href={platform.free_tier.signup_url} target="_blank" rel="noopener noreferrer"
              className="rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 transition">
              Sign Up Free
            </a>
            <span className="text-sm text-green-600">
              {platform.free_tier.requires_credit_card ? 'Credit card required' : 'No credit card required'}
            </span>
          </div>
        </div>
      )}

      {/* Promotions */}
      {platform.promotions?.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Promotions</h2>
          <div className="space-y-4">
            {platform.promotions.map((p: any, i: number) => (
              <PromoCard key={i} promo={p} />
            ))}
          </div>
        </div>
      )}

      <div className="mt-8 text-sm text-gray-400">
        Last verified: {platform.last_verified}
        {platform.last_verified_by && ` by ${platform.last_verified_by}`}
      </div>
    </div>
  );
}
