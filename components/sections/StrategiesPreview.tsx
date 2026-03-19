import Link from 'next/link';

const strategies = [
  {
    slug: 'simple',
    name: 'Simple',
    tagline: '1 ETF monde. Facile à démarrer.',
    risk: 'Modéré',
    horizon: '10+ ans',
    accent: 'border-sage bg-sage-pale',
    badge: 'bg-sage text-white',
  },
  {
    slug: 'balanced',
    name: 'Équilibré',
    tagline: 'Actions + obligations. Moins de volatilité.',
    risk: 'Faible–Modéré',
    horizon: '5–10 ans',
    accent: 'border-forest bg-forest/5',
    badge: 'bg-forest text-white',
  },
  {
    slug: 'esg',
    name: 'ESG',
    tagline: 'Impact positif sans sacrifier le rendement.',
    risk: 'Modéré',
    horizon: '10+ ans',
    accent: 'border-amber bg-amber/5',
    badge: 'bg-amber text-forest-deep',
  },
];

export default function StrategiesPreview() {
  return (
    <section className="bg-warm-white px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-center text-3xl font-heading font-semibold text-forest md:text-4xl">
          Trois stratégies pour commencer
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-center text-charcoal/60">
          Choisissez celle qui correspond à votre horizon et votre tolérance au risque.
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {strategies.map((s) => (
            <div
              key={s.slug}
              className={`rounded-2xl border-2 p-8 ${s.accent}`}
            >
              <span className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${s.badge}`}>
                {s.name}
              </span>
              <p className="mt-4 text-base font-medium text-charcoal">{s.tagline}</p>
              <dl className="mt-6 space-y-2 text-sm text-charcoal/70">
                <div className="flex justify-between">
                  <dt>Risque</dt>
                  <dd className="font-medium">{s.risk}</dd>
                </div>
                <div className="flex justify-between">
                  <dt>Horizon</dt>
                  <dd className="font-medium">{s.horizon}</dd>
                </div>
              </dl>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/strategies"
            className="inline-block rounded-full bg-forest px-8 py-3.5 text-sm font-semibold text-warm-white transition-opacity hover:opacity-90"
          >
            Voir les stratégies en détail →
          </Link>
        </div>
      </div>
    </section>
  );
}
