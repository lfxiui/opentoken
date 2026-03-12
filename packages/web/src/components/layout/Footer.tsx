export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="md:flex md:items-center md:justify-between">
          <p className="text-sm text-gray-500">
            OpenToken &mdash; Open-source AI Credits Directory
          </p>
          <div className="mt-4 flex gap-6 md:mt-0">
            <a
              href="https://github.com/opentoken-inc/opentoken"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              GitHub
            </a>
            <a href="/about" className="text-sm text-gray-500 hover:text-gray-700">
              About
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
