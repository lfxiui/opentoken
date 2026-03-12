import Badge from '../common/Badge';

interface PromoCardProps {
  promo: {
    title: string;
    description: string;
    credit_amount: string;
    credit_amount_usd?: number | null;
    end_date?: string | null;
    is_ongoing: boolean;
    eligibility?: string | null;
    promo_url: string;
    promo_code?: string | null;
    verified_date: string;
    platform_name?: string;
    platform_slug?: string;
  };
}

export default function PromoCard({ promo }: PromoCardProps) {
  const isExpiringSoon = promo.end_date && !promo.is_ongoing &&
    new Date(promo.end_date).getTime() - Date.now() < 7 * 24 * 60 * 60 * 1000 &&
    new Date(promo.end_date).getTime() > Date.now();

  const isExpired = promo.end_date && !promo.is_ongoing &&
    new Date(promo.end_date).getTime() < Date.now();

  return (
    <div className={`rounded-lg border bg-white p-6 shadow-sm ${
      isExpiringSoon ? 'border-yellow-300 ring-1 ring-yellow-200' :
      isExpired ? 'border-gray-200 opacity-60' : 'border-gray-200'
    }`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          {promo.platform_name && (
            <p className="text-xs font-medium text-indigo-600 uppercase tracking-wide">
              {promo.platform_name}
            </p>
          )}
          <h3 className="mt-1 text-lg font-semibold text-gray-900">{promo.title}</h3>
          <p className="mt-1 text-sm text-gray-500">{promo.description}</p>
        </div>
        <div className="ml-4 text-right">
          <p className="text-lg font-bold text-green-600">{promo.credit_amount}</p>
          {promo.credit_amount_usd && (
            <p className="text-xs text-gray-400">${promo.credit_amount_usd} USD</p>
          )}
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        {promo.is_ongoing && <Badge variant="success">Ongoing</Badge>}
        {isExpiringSoon && <Badge variant="warning">Expiring Soon</Badge>}
        {isExpired && <Badge variant="danger">Expired</Badge>}
        {promo.promo_code && (
          <Badge variant="info">Code: {promo.promo_code}</Badge>
        )}
        {promo.eligibility && (
          <span className="text-xs text-gray-500">{promo.eligibility}</span>
        )}
      </div>

      <div className="mt-4 flex items-center justify-between">
        <span className="text-xs text-gray-400">Verified: {promo.verified_date}</span>
        <a
          href={promo.promo_url}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-indigo-700 transition"
        >
          Get Offer
        </a>
      </div>
    </div>
  );
}
