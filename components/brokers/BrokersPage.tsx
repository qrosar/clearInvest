'use client';

import { useTranslations } from 'next-intl';
import { BROKERS } from '@/lib/brokers/brokers';
import type { Broker } from '@/lib/brokers/brokers';
import BrokerTable from './BrokerTable';
import BrokerCard from './BrokerCard';

function TierSection({
  title,
  subtitle,
  brokers,
  titleClass,
}: {
  title: string;
  subtitle: string;
  brokers: Broker[];
  titleClass: string;
}) {
  return (
    <section className="mb-12">
      <div className="mb-5">
        <h2 className={`text-xl font-bold ${titleClass}`}>{title}</h2>
        <p className="mt-1 text-sm text-[var(--charcoal)]/60">{subtitle}</p>
      </div>
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        {brokers.map((broker) => (
          <BrokerCard key={broker.id} broker={broker} />
        ))}
      </div>
    </section>
  );
}

export default function BrokersPage() {
  const t = useTranslations('brokers');

  const recommended = BROKERS.filter((b) => b.tier === 'recommended');
  const situational = BROKERS.filter((b) => b.tier === 'situational');
  const notRecommended = BROKERS.filter((b) => b.tier === 'not_recommended');
  const avoid = BROKERS.filter((b) => b.tier === 'avoid');

  return (
    <>
      {/* Hero */}
      <div className="bg-[var(--forest-deep)] px-6 py-14 text-center text-white md:py-20">
        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-white/40">
          {t('hero_tag')}
        </p>
        <h1 className="font-heading text-3xl font-bold md:text-4xl">
          {t('page_title')}
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-sm text-white/65 md:text-base">
          {t('page_subtitle')}
        </p>
      </div>

      <main className="min-h-screen bg-[var(--warm-cream)]">
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16">

        {/* 2 — Introduction */}
        <div className="mb-10 space-y-4">
          <p className="text-base leading-relaxed text-[var(--charcoal)]/80">
            {t('intro_market')}
          </p>
          {/* Scope callout — informative, not alarming */}
          <div className="rounded-xl border border-[var(--warm-tan)] bg-[var(--warm-cream)] px-5 py-4 text-sm leading-relaxed text-[var(--charcoal)]/65">
            {t('intro_scope')}
          </div>

        </div>

        {/* 3 — Comparison table */}
        <section className="mb-4">
          <h2 className="mb-4 text-xl font-bold text-[var(--charcoal)]">{t('table_title')}</h2>
          <BrokerTable brokers={BROKERS} highlightIds={[]} />
        </section>

        {/* 4 — Legend */}
        <div className="mb-12 rounded-xl border border-[var(--warm-tan)]/40 bg-[var(--warm-white)] px-5 py-4 text-sm text-[var(--charcoal)]/70">
          <p className="mb-1 font-semibold text-[var(--charcoal)]">{t('legend_title')}</p>
          <p>{t('legend_body')}</p>
        </div>

        {/* 5 — Tier card sections */}
        <TierSection
          title={t('tier_recommended_title')}
          subtitle={t('tier_recommended_subtitle')}
          brokers={recommended}
          titleClass="text-[var(--forest)]"
        />
        <TierSection
          title={t('tier_situational_title')}
          subtitle={t('tier_situational_subtitle')}
          brokers={situational}
          titleClass="text-[var(--charcoal)]"
        />
        <TierSection
          title={t('tier_not_recommended_title')}
          subtitle={t('tier_not_recommended_subtitle')}
          brokers={notRecommended}
          titleClass="text-amber-700"
        />
        {avoid.length > 0 && (
          <TierSection
            title={t('tier_avoid_title')}
            subtitle={t('tier_avoid_subtitle')}
            brokers={avoid}
            titleClass="text-red-600"
          />
        )}

        {/* 6 — FX note */}
        <p className="mt-8 text-xs text-[var(--charcoal)]/45">
          {t('fx_note')}
        </p>

        {/* 7 — Data disclaimer */}
        <p className="mt-3 text-xs text-[var(--charcoal)]/40">{t('page_disclaimer')}</p>

        {/* 8 — Footer disclaimer */}
        <p className="mt-2 text-center text-xs text-[var(--charcoal)]/35">
          {t('footer_disclaimer')}
        </p>
      </div>
    </main>
    </>
  );
}
