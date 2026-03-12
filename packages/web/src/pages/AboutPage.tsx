export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900">About OpenToken</h1>
      <div className="mt-6 prose prose-gray max-w-none">
        <p className="text-gray-600 text-lg">
          OpenToken is an open-source platform that aggregates free AI credits, free tiers,
          and promotional offers from various AI service providers. Built for vibe coding
          developers who want to discover and leverage free AI resources.
        </p>

        <h2 className="mt-8 text-xl font-semibold text-gray-900">Why OpenToken?</h2>
        <ul className="mt-4 space-y-3 text-gray-600">
          <li className="flex gap-2">
            <span className="text-indigo-600 font-bold">Platform Agnostic</span> &mdash;
            We cover all major AI platforms without bias.
          </li>
          <li className="flex gap-2">
            <span className="text-indigo-600 font-bold">Open Source</span> &mdash;
            All data is community-maintained via YAML files and Pull Requests.
          </li>
          <li className="flex gap-2">
            <span className="text-indigo-600 font-bold">Always Fresh</span> &mdash;
            Community contributions and automated crawlers keep data up to date.
          </li>
          <li className="flex gap-2">
            <span className="text-indigo-600 font-bold">Developer Friendly</span> &mdash;
            Built with modern tech stack, easy to deploy and contribute to.
          </li>
        </ul>

        <h2 className="mt-8 text-xl font-semibold text-gray-900">Tech Stack</h2>
        <div className="mt-4 grid grid-cols-2 gap-4">
          {[
            ['Frontend', 'React 19 + Vite + Tailwind CSS 4'],
            ['Backend', 'Hono (multi-runtime)'],
            ['Database', 'SQLite + Drizzle ORM'],
            ['Validation', 'Zod (shared schemas)'],
            ['Monorepo', 'npm workspaces'],
            ['Data Format', 'YAML'],
          ].map(([label, value]) => (
            <div key={label} className="rounded-lg border border-gray-200 bg-white p-4">
              <p className="text-sm font-medium text-gray-500">{label}</p>
              <p className="mt-1 text-sm text-gray-900">{value}</p>
            </div>
          ))}
        </div>

        <h2 className="mt-8 text-xl font-semibold text-gray-900">License</h2>
        <p className="mt-2 text-gray-600">
          OpenToken is released under the MIT License. Feel free to use, modify, and distribute.
        </p>
      </div>
    </div>
  );
}
