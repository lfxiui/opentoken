import { useState } from 'react';
import { useApi } from '../hooks/useApi';
import { api } from '../lib/api';
import PlatformCard from '../components/platform/PlatformCard';
import PlatformFilter from '../components/platform/PlatformFilter';
import SearchInput from '../components/common/SearchInput';

export default function PlatformsPage() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');

  const { data: platforms, loading, error } = useApi(
    () => api.getPlatforms({ search: search || undefined, category: category || undefined }),
    [search, category]
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">AI Platforms</h1>
        <p className="mt-2 text-gray-500">
          Browse and compare free tiers and credits across AI platforms.
        </p>
      </div>

      <div className="mb-6 space-y-4">
        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder="Search platforms..."
        />
        <PlatformFilter selected={category} onChange={setCategory} />
      </div>

      {loading ? (
        <p className="text-gray-500">Loading platforms...</p>
      ) : error ? (
        <p className="text-red-500">Error: {error}</p>
      ) : platforms?.length === 0 ? (
        <p className="text-gray-500">No platforms found matching your criteria.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {platforms?.map((p: any) => (
            <PlatformCard key={p.slug} platform={p} />
          ))}
        </div>
      )}
    </div>
  );
}
