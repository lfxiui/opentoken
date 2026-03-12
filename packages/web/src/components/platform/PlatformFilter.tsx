import { CATEGORIES, CATEGORY_LABELS, type Category } from '@opentoken/shared';

interface PlatformFilterProps {
  selected: string;
  onChange: (category: string) => void;
}

export default function PlatformFilter({ selected, onChange }: PlatformFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => onChange('')}
        className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
          selected === ''
            ? 'bg-indigo-600 text-white'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
      >
        All
      </button>
      {CATEGORIES.map((cat) => (
        <button
          key={cat}
          onClick={() => onChange(cat)}
          className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
            selected === cat
              ? 'bg-indigo-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {CATEGORY_LABELS[cat as Category]}
        </button>
      ))}
    </div>
  );
}
