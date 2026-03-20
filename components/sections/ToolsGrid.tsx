'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

export default function ToolsGrid() {
  const t = useTranslations('tools');

  const tools = [
    {
      href: '/calculateur',
      title: t('calc_title'),
      description: t('calc_desc_short'),
      accent: 'bg-amber/10 text-amber',
      icon: '📈',
    },
    {
      href: '/brokers',
      title: t('brokers_title'),
      description: t('brokers_desc_short'),
      accent: 'bg-forest/10 text-forest',
      icon: '🏦',
    },
    {
      href: '/strategies',
      title: t('strategies_title'),
      description: t('strategies_desc_short'),
      accent: 'bg-sage/10 text-sage',
      icon: '🎯',
    },
    {
      href: '/ressources',
      title: t('guides_title'),
      description: t('guides_desc_short'),
      accent: 'bg-warm-tan/30 text-charcoal',
      icon: '📖',
    },
  ];

  return (
    <section className="bg-warm-cream px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-center text-3xl font-heading font-semibold text-forest md:text-4xl">
          {t('grid_heading')}
        </h2>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {tools.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href as any}
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
