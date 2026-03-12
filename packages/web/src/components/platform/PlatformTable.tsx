import { Link } from 'react-router-dom';
import { CATEGORY_LABELS, type Category } from '@opentoken/shared';

interface PlatformTableProps {
  platforms: any[];
}

export default function PlatformTable({ platforms }: PlatformTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Platform</th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Category</th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Free Tier</th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {platforms.map((p) => (
            <tr key={p.slug} className="hover:bg-gray-50">
              <td className="px-6 py-4">
                <Link to={`/platforms/${p.slug}`} className="text-sm font-medium text-indigo-600 hover:text-indigo-700">
                  {p.name}
                </Link>
              </td>
              <td className="px-6 py-4 text-sm text-gray-500">
                {CATEGORY_LABELS[p.category as Category] || p.category}
              </td>
              <td className="px-6 py-4 text-sm">
                {p.free_tier?.available ? (
                  <span className="text-green-600">Available</span>
                ) : (
                  <span className="text-gray-400">N/A</span>
                )}
              </td>
              <td className="px-6 py-4 text-sm text-gray-500 capitalize">{p.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
