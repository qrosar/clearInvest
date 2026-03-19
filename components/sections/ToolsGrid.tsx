import Link from 'next/link';

const tools = [
  {
    href: '/calculator',
    title: 'Calculateur de rendement',
    description: 'Comparez votre épargne bancaire avec un ETF sur 10, 20 ou 30 ans.',
    accent: 'bg-amber/10 text-amber',
    icon: '📈',
  },
  {
    href: '/brokers',
    title: 'Comparateur de brokers',
    description: 'Frais, fiscalité, interface — trouvez le broker adapté à votre profil.',
    accent: 'bg-forest/10 text-forest',
    icon: '🏦',
  },
  {
    href: '/strategies',
    title: 'Stratégies ETF',
    description: 'Trois portefeuilles simples adaptés à différents objectifs et horizons.',
    accent: 'bg-sage/10 text-sage',
    icon: '🎯',
  },
  {
    href: '/guides',
    title: 'Guides pratiques',
    description: 'Fiscalité belge des ETFs, ouvrir un compte, comprendre les frais.',
    accent: 'bg-warm-tan/30 text-charcoal',
    icon: '📖',
  },
];

export default function ToolsGrid() {
  return (
    <section className="bg-warm-cream px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-center text-3xl font-heading font-semibold text-forest md:text-4xl">
          Tous les outils, au même endroit
        </h2>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {tools.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="group rounded-2xl bg-warm-white p-8 shadow-sm transition-shadow hover:shadow-md"
            >
              <span className={`inline-flex h-12 w-12 items-center justify-center rounded-xl text-2xl ${tool.accent}`}>
                {tool.icon}
              </span>
              <h3 className="mt-4 text-lg font-semibold text-charcoal group-hover:text-forest">
                {tool.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-charcoal/60">
                {tool.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
