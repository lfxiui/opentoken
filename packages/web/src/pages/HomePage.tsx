import { Link } from 'react-router-dom';
import { useApi } from '../hooks/useApi';
import { api } from '../lib/api';
import PlatformCard from '../components/platform/PlatformCard';
import PromoCard from '../components/promotion/PromoCard';

function Skeleton({ className }: { className?: string }) {
  return <div className={`animate-pulse rounded bg-gray-200 ${className}`} />;
}

function PlatformCardSkeleton() {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6">
      <Skeleton className="h-5 w-32 mb-2" />
      <Skeleton className="h-4 w-full mb-1" />
      <Skeleton className="h-4 w-3/4 mb-4" />
      <div className="flex gap-2">
        <Skeleton className="h-5 w-16 rounded-full" />
        <Skeleton className="h-5 w-20 rounded-full" />
      </div>
    </div>
  );
}

export default function HomePage() {
  const { data: platforms, loading: pLoading } = useApi(() => api.getPlatforms(), []);
  const { data: promos, loading: prLoading } = useApi(() => api.getPromotions(), []);

  const featuredPlatforms = platforms?.slice(0, 6) ?? [];
  const latestPromos = promos?.filter((p: any) => p.is_ongoing).slice(0, 3) ?? [];

  const stats = {
    platforms: platforms?.length ?? '—',
    freeTiers: platforms ? platforms.filter((p: any) => p.free_tier?.available).length : '—',
    promos: promos?.length ?? '—',
  };

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-800 text-white">
        {/* decorative background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-white blur-3xl" />
          <div className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-purple-300 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-4xl px-4 py-24 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/20 px-4 py-1.5 text-sm font-medium text-indigo-100 mb-6">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-green-400" />
            开源 · 社区维护 · 免费使用
          </div>
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
            发现免费 AI Credits
          </h1>
          <p className="mt-5 text-lg sm:text-xl text-indigo-100 max-w-2xl mx-auto leading-relaxed">
            聚合 OpenAI、Anthropic、Gemini、Groq 等主流 AI 平台的<br className="hidden sm:block" />
            免费额度、优惠活动和试用计划，助力 vibe coding 开发者。
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/platforms"
              className="rounded-lg bg-white px-6 py-3 text-sm font-semibold text-indigo-600 shadow-lg hover:bg-indigo-50 transition"
            >
              浏览 AI 平台 →
            </Link>
            <Link
              to="/promotions"
              className="rounded-lg border border-white/30 bg-white/10 px-6 py-3 text-sm font-semibold text-white hover:bg-white/20 transition"
            >
              查看优惠活动
            </Link>
            <a
              href="https://github.com/lfxiui/opentoken"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-white/30 bg-white/10 px-6 py-3 text-sm font-semibold text-white hover:bg-white/20 transition flex items-center justify-center gap-1.5"
            >
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
              Star on GitHub
            </a>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="grid grid-cols-3 gap-4 sm:gap-8 text-center">
            <div>
              <p className="text-3xl font-bold text-indigo-600">{pLoading ? '—' : stats.platforms}</p>
              <p className="mt-1 text-sm text-gray-500">AI 平台</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-green-600">{pLoading ? '—' : stats.freeTiers}</p>
              <p className="mt-1 text-sm text-gray-500">有免费额度</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-purple-600">{prLoading ? '—' : stats.promos}</p>
              <p className="mt-1 text-sm text-gray-500">进行中优惠</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Platforms */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">精选平台</h2>
          <Link to="/platforms" className="text-sm font-medium text-indigo-600 hover:text-indigo-700">
            查看全部 →
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {pLoading
            ? Array(6).fill(null).map((_, i) => <PlatformCardSkeleton key={i} />)
            : featuredPlatforms.map((p: any) => <PlatformCard key={p.slug} platform={p} />)
          }
        </div>
      </section>

      {/* Latest Promotions */}
      <section className="bg-white border-t border-gray-200">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">进行中优惠</h2>
            <Link to="/promotions" className="text-sm font-medium text-indigo-600 hover:text-indigo-700">
              查看全部 →
            </Link>
          </div>
          {prLoading ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {Array(3).fill(null).map((_, i) => (
                <div key={i} className="rounded-lg border border-gray-200 bg-white p-6">
                  <Skeleton className="h-4 w-24 mb-2" />
                  <Skeleton className="h-5 w-40 mb-2" />
                  <Skeleton className="h-4 w-full mb-1" />
                  <Skeleton className="h-4 w-3/4 mb-4" />
                  <Skeleton className="h-8 w-20 rounded-md" />
                </div>
              ))}
            </div>
          ) : latestPromos.length === 0 ? (
            <p className="text-gray-500">暂无进行中的优惠活动。</p>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {latestPromos.map((p: any, i: number) => (
                <PromoCard key={i} promo={p} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA - Contribute */}
      <section className="bg-indigo-50 border-t border-indigo-100">
        <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900">发现了新的优惠？</h2>
          <p className="mt-3 text-gray-600">
            OpenToken 由社区驱动，任何人都可以通过 PR 贡献或修正平台数据。
          </p>
          <div className="mt-6 flex gap-3 justify-center">
            <Link
              to="/contribute"
              className="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700 transition"
            >
              参与贡献
            </Link>
            <a
              href="https://github.com/lfxiui/opentoken/issues"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition"
            >
              提交 Issue
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

