import { useState } from 'react';
import { useApi } from '../hooks/useApi';
import { api } from '../lib/api';
import PlatformCard from '../components/platform/PlatformCard';
import PlatformFilter from '../components/platform/PlatformFilter';
import SearchInput from '../components/common/SearchInput';

function CardSkeleton() {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 animate-pulse">
      <div className="flex justify-between gap-3 mb-3">
        <div className="h-4 bg-gray-200 rounded w-28" />
        <div className="h-5 bg-gray-200 rounded-full w-16" />
      </div>
      <div className="h-3 bg-gray-200 rounded w-full mb-1.5" />
      <div className="h-3 bg-gray-200 rounded w-3/4 mb-4" />
      <div className="flex gap-2">
        <div className="h-5 bg-gray-200 rounded-full w-20" />
        <div className="h-5 bg-gray-200 rounded-full w-14" />
      </div>
    </div>
  );
}

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
        <h1 className="text-3xl font-bold text-gray-900">AI 平台目录</h1>
        <p className="mt-2 text-gray-500">
          浏览并比较各主流 AI 平台的免费额度和 API Credits。
        </p>
      </div>

      <div className="mb-6 space-y-4">
        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder="搜索平台名称、描述或标签..."
        />
        <PlatformFilter selected={category} onChange={setCategory} />
      </div>

      {error ? (
        <div className="rounded-lg border border-red-200 bg-red-50 p-6 text-center">
          <p className="text-red-600">加载失败：{error}</p>
          <p className="mt-1 text-sm text-red-400">请确保后端服务已启动（npm run dev -w @opentoken/server）</p>
        </div>
      ) : loading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array(6).fill(null).map((_, i) => <CardSkeleton key={i} />)}
        </div>
      ) : platforms?.length === 0 ? (
        <div className="py-16 text-center">
          <p className="text-lg text-gray-500">没有找到匹配的平台</p>
          <button
            onClick={() => { setSearch(''); setCategory(''); }}
            className="mt-3 text-sm text-indigo-600 hover:text-indigo-700"
          >
            清除筛选条件
          </button>
        </div>
      ) : (
        <>
          <p className="mb-4 text-sm text-gray-400">共 {platforms?.length} 个平台</p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {platforms?.map((p: any) => (
              <PlatformCard key={p.slug} platform={p} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

