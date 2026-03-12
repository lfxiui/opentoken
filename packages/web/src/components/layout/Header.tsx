import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold text-indigo-600">OpenToken</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/platforms" className="text-sm font-medium text-gray-700 hover:text-indigo-600">
              Platforms
            </Link>
            <Link to="/promotions" className="text-sm font-medium text-gray-700 hover:text-indigo-600">
              Promotions
            </Link>
            <Link to="/contribute" className="text-sm font-medium text-gray-700 hover:text-indigo-600">
              Contribute
            </Link>
            <Link to="/about" className="text-sm font-medium text-gray-700 hover:text-indigo-600">
              About
            </Link>
            <a
              href="https://github.com/opentoken-inc/opentoken"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-gray-500 hover:text-gray-700"
            >
              GitHub
            </a>
          </nav>
          <button className="md:hidden text-gray-700" aria-label="Menu">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
