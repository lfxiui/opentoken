import { Link } from 'react-router-dom';

const GITHUB_URL = 'https://github.com/lfxiui/opentoken';

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="md:flex md:items-start md:justify-between gap-8">
          <div>
            <Link to="/" className="flex items-center gap-2">
              <span className="text-lg">🪙</span>
              <span className="font-bold text-indigo-600">OpenToken</span>
            </Link>
            <p className="mt-2 text-sm text-gray-500 max-w-xs">
              开源 AI Credits 信息聚合平台，帮助开发者发现免费 AI 额度和优惠活动。
            </p>
          </div>
          <div className="mt-8 md:mt-0 grid grid-cols-2 gap-8 sm:grid-cols-3">
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400">目录</h3>
              <ul className="mt-3 space-y-2">
                {[
                  { to: '/platforms', label: 'AI 平台' },
                  { to: '/promotions', label: '优惠活动' },
                ].map(({ to, label }) => (
                  <li key={to}>
                    <Link to={to} className="text-sm text-gray-500 hover:text-gray-700">{label}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400">项目</h3>
              <ul className="mt-3 space-y-2">
                <li><Link to="/contribute" className="text-sm text-gray-500 hover:text-gray-700">参与贡献</Link></li>
                <li><Link to="/about" className="text-sm text-gray-500 hover:text-gray-700">关于</Link></li>
                <li><a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="text-sm text-gray-500 hover:text-gray-700">GitHub ↗</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-200 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-gray-400">
            © {new Date().getFullYear()} OpenToken. MIT License. Data provided by community contributors.
          </p>
          <p className="text-xs text-gray-400">
            信息仅供参考，请以各平台官网为准。
          </p>
        </div>
      </div>
    </footer>
  );
}

