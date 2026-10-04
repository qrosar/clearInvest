'use client';

import { useTranslations } from 'next-intl';
import { BROKERS, taxLevel, type Broker } from '@/lib/brokers/brokers';
import { asDynamic } from '@/lib/i18n/dynamicKeys';
import BrokerTable from './BrokerTable';
import BrokerCard from './BrokerCard';

/**
 * Which brokers actually run a recurring ETF plan, split by whether the plan
 * also settles your Belgian taxes. Derived from BROKERS so the prose and the
 * table can never disagree.
 */
function SavingsPlanSection() {
  const t = useTranslations('brokers');
  const tDyn = asDynamic(t);

  const withPlan = BROKERS.filter((b) => b.automation.savingsPlan);
  const taxHandled = withPlan.filter((b) => taxLevel(b) === 'all');
  const taxManual = withPlan.filter((b) => taxLevel(b) !== 'all');
  const withoutPlan = BROKERS.filter((b) => !b.automation.savingsPlan && b.tier !== 'avoid');

  return (
    <section className="mb-8 rounded-2xl border border-[var(--warm-tan)]/40 bg-[var(--warm-white)] px-5 py-5">
      <h2 className="text-base font-bold text-[var(--charcoal)]">{t('plans_title')}</h2>
      <p className="mt-1 text-sm leading-relaxed text-[var(--charcoal)]/65">{t('plans_intro')}</p>

      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {[
          { key: 'auto', rows: taxHandled, label: t('plans_col_auto') },
          { key: 'manual', rows: taxManual, label: t('plans_col_manual') },
        ].map(({ key, rows, label }) => (
          <div key={key}>
            <p
              className={`mb-2 text-[11px] font-semibold uppercase tracking-wide ${
                key === 'auto' ? 'text-[var(--forest)]' : 'text-amber-700'
              }`}
            >
              {label}
            </p>
            <ul className="space-y-1.5">
              {rows.map((b) => (
                <li key={b.id} className="flex flex-wrap items-baseline gap-x-2 text-sm">
                  <a
                    href={`#broker-${b.id}`}
                    className="font-semibold text-[var(--charcoal)] no-underline hover:underline"
                  >
                    {b.name}
                  </a>
                  <span className="text-[var(--charcoal)]/55">{tDyn(b.fees.savingsPlanFee)}</span>
                  {b.automation.fractionalShares && (
                    <span className="rounded-full bg-[var(--forest)]/10 px-1.5 py-0.5 text-[10px] font-semibold text-[var(--forest)]">
                      {t('col_fractional')}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <p className="mt-4 text-xs leading-relaxed text-[var(--charcoal)]/45">
        {t('plans_note', { brokers: withoutPlan.map((b) => b.name).join(', ') })}
      </p>
    </section>
  );
}

/** Disclosure chevron for <details> cards; rotates when the parent `group` is open. */
function Chevron() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      fill="currentColor"
      className="h-4 w-4 shrink-0 opacity-60 transition-transform group-open:rotate-180"
    >
      <path
        fillRule="evenodd"
        d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.17l3.71-3.94a.75.75 0 1 1 1.08 1.04l-4.25 4.5a.75.75 0 0 1-1.08 0l-4.25-4.5a.75.75 0 0 1 .02-1.06Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

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

      <div className="min-h-screen bg-[var(--warm-cream)]">
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16">

        {/* Independence note */}
        <p className="mb-8 text-xs italic text-[var(--charcoal)]/50">
          {t('independence_note')}
        </p>

        {/* 2 — Introduction: what actually separates brokers for a passive ETF investor */}
        <div className="mb-10 space-y-4">
          <p className="text-base leading-relaxed text-[var(--charcoal)]/80">
            {t('intro')}
          </p>
          <p className="text-sm leading-relaxed text-[var(--charcoal)]/55">
            {t('intro_scope')}
          </p>

          {/* CGT 2026 — who withholds the capital-gains tax since 1 June 2026 */}
          <details className="group rounded-xl border border-amber-200 bg-amber-50">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-5 py-4 text-sm font-semibold text-amber-900 [&::-webkit-details-marker]:hidden">
              {t('cgt_regime_title')}
              <Chevron />
            </summary>
            <div className="space-y-2 px-5 pb-4 text-sm leading-relaxed text-amber-800">
              <p>{t('cgt_regime_p1')}</p>
              <p>{t('cgt_regime_p3')}</p>
            </div>
          </details>
        </div>

        {/* 3 — Comparison table */}
        <section className="mb-8">
          <h2 className="mb-4 text-xl font-bold text-[var(--charcoal)]">{t('table_title')}</h2>
          <BrokerTable brokers={BROKERS} highlightIds={[]} />
        </section>

        {/* 4b — Savings plans: the dimension that separates brokers in 2026 */}
        <SavingsPlanSection />

        {/* 4c — Fee-vs-tax framing */}
        <div className="mb-12 rounded-xl border border-[var(--warm-tan)]/40 bg-[var(--warm-white)] px-5 py-4 text-sm leading-relaxed text-[var(--charcoal)]/70">
          <p className="mb-1 font-semibold text-[var(--charcoal)]">{t('cost_reality_title')}</p>
          <p>{t('cost_reality_body')}</p>
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
      </div>
    </div>
    </>
  );
}
