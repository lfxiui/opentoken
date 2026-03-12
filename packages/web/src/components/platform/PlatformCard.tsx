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
      className="block rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md hover:border-indigo-300"
    >
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{platform.name}</h3>
          <p className="mt-1 text-sm text-gray-500 line-clamp-2">{platform.description}</p>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        <Badge variant="info">
          {CATEGORY_LABELS[platform.category as Category] || platform.category}
        </Badge>
        {platform.free_tier?.available && (
          <Badge variant="success">Free Tier</Badge>
        )}
        {platform.status === 'beta' && (
          <Badge variant="warning">Beta</Badge>
        )}
        {platform.tags.slice(0, 3).map((tag) => (
          <Badge key={tag}>{tag}</Badge>
        ))}
      </div>
    </Link>
  );
}
