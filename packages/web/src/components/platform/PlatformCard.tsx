import { Link } from 'react-router-dom';
import Badge from '../common/Badge';
import { CATEGORY_LABELS, type Category } from '@opentoken/shared';

interface PlatformCardProps {
  platform: {
    slug: string;
    name: string;
    description: string;
    category: string;
    tags: string[];
    free_tier: { available: boolean; description: string } | null;
    website: string;
    status: string;
  };
}

export default function PlatformCard({ platform }: PlatformCardProps) {
  return (
    <Link
      to={`/platforms/${platform.slug}`}
      className="group block rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md hover:border-indigo-300"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="text-base font-semibold text-gray-900 group-hover:text-indigo-600 transition">
            {platform.name}
          </h3>
          <p className="mt-1.5 text-sm text-gray-500 line-clamp-2 leading-relaxed">{platform.description}</p>
        </div>
        {platform.free_tier?.available && (
          <span className="shrink-0 rounded-full bg-green-50 border border-green-200 px-2 py-0.5 text-xs font-medium text-green-700 whitespace-nowrap">
            免费可用
          </span>
        )}
      </div>
      <div className="mt-4 flex flex-wrap gap-1.5">
        <Badge variant="info">
          {CATEGORY_LABELS[platform.category as Category] || platform.category}
        </Badge>
        {platform.status === 'beta' && <Badge variant="warning">Beta</Badge>}
        {platform.tags.slice(0, 2).map((tag) => (
          <Badge key={tag}>{tag}</Badge>
        ))}
      </div>
    </Link>
  );
}

