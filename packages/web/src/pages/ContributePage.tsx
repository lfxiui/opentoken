export default function ContributePage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900">Contribute</h1>
      <p className="mt-2 text-gray-500">
        OpenToken is an open-source project. We welcome contributions from the community!
      </p>

      <div className="mt-8 space-y-8">
        <section>
          <h2 className="text-xl font-semibold text-gray-900">How to Contribute</h2>
          <div className="mt-4 space-y-4">
            <div className="rounded-lg border border-gray-200 bg-white p-6">
              <h3 className="font-medium text-gray-900">1. Add or Update Platform Data</h3>
              <p className="mt-2 text-sm text-gray-500">
                Platform data is stored as YAML files in the <code className="bg-gray-100 px-1 py-0.5 rounded text-sm">data/platforms/</code> directory.
                Fork the repo, add or update a YAML file, and submit a Pull Request.
              </p>
            </div>
            <div className="rounded-lg border border-gray-200 bg-white p-6">
              <h3 className="font-medium text-gray-900">2. Report Outdated Information</h3>
              <p className="mt-2 text-sm text-gray-500">
                Found outdated or incorrect information? Open a GitHub Issue with the details
                and we'll update it promptly.
              </p>
            </div>
            <div className="rounded-lg border border-gray-200 bg-white p-6">
              <h3 className="font-medium text-gray-900">3. Improve the Platform</h3>
              <p className="mt-2 text-sm text-gray-500">
                Check out the GitHub repo for open issues, feature requests, and the roadmap.
                Code contributions are always welcome!
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900">YAML Format</h2>
          <div className="mt-4 rounded-lg bg-gray-900 p-6 overflow-x-auto">
            <pre className="text-sm text-green-400">{`name: Platform Name
slug: platform-name
website: https://platform.com
description: A brief description of the platform
category: llm-api  # Options: llm-api, coding-assistant, image-generation, speech, embedding, multi-modal, other
tags:
  - tag1
  - tag2
free_tier:
  available: true
  description: Description of the free tier
  models_included:
    - model-name
  limits:
    requests: "100/day"
    tokens: "1M/month"
  signup_url: https://platform.com/signup
  requires_credit_card: false
promotions:
  - title: Promo Title
    description: Promo description
    credit_amount: "$100"
    credit_amount_usd: 100
    is_ongoing: true
    promo_url: https://platform.com/promo
    verified_date: "2025-03-01"
pricing_url: https://platform.com/pricing
docs_url: https://platform.com/docs
status: active
last_verified: "2025-03-01"`}</pre>
          </div>
        </section>

        <div className="rounded-lg bg-indigo-50 border border-indigo-200 p-6 text-center">
          <p className="text-indigo-700 font-medium">Ready to contribute?</p>
          <a
            href="https://github.com/opentoken-inc/opentoken"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-block rounded-md bg-indigo-600 px-6 py-2 text-sm font-medium text-white hover:bg-indigo-700 transition"
          >
            View on GitHub
          </a>
        </div>
      </div>
    </div>
  );
}
