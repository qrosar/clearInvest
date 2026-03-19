'use client';

import { useState, useMemo, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { STRATEGIES } from '@/lib/strategies/strategies';
import StrategyFilter, { type FilterState, EMPTY_FILTERS } from './StrategyFilter';
import StrategyCard from './StrategyCard';

function ReturnsDisclosure() {
  const t = useTranslations('strategiesPage');
  const [open, setOpen] = useState(false);

  return (
    <div className="overflow-hidden rounded-xl border border-[var(--warm-tan)]/50 bg-[var(--warm-cream,#faf6ef)]">
      <button
        type="button"
        onClick={() => setOpen(v => !v)}
        className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left"
      >
        <span className="text-xs font-semibold text-[var(--charcoal)]/70">
          {t('returns_disclosure_title')}
        </span>
        <span
          className="text-[var(--charcoal)]/40 transition-transform duration-200"
          style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}
          aria-hidden
        >
          ▾
        </span>
      </button>

      <div
        className="transition-all duration-300 ease-in-out"
        style={{ maxHeight: open ? '600px' : '0px', overflow: 'hidden' }}
      >
        <div className="space-y-3 px-4 pb-4 text-xs leading-relaxed text-[var(--charcoal)]/60">
          <p>{t('returns_disclosure_intro')}</p>
          <p>{t('returns_disclosure_high')}</p>
          <p>{t('returns_disclosure_low')}</p>
          <p className="font-medium text-[var(--charcoal)]/75">{t('returns_disclosure_summary')}</p>
        </div>
      </div>
    </div>
  );
}

export default function StrategiesPage() {
  const t = useTranslations('strategiesPage');
  const [filters, setFilters] = useState<FilterState>(EMPTY_FILTERS);
  const toutEnUnRef = useRef<HTMLDivElement>(null);

  const filtered = useMemo(() => {
    return STRATEGIES.filter(s => {
      if (filters.horizon !== null && !s.horizon.includes(filters.horizon)) return false;
      if (filters.esg !== null && s.esg !== filters.esg) return false;
      if (filters.complexity !== null && s.complexity !== filters.complexity) return false;
      if (filters.geographic.length > 0) {
        for (const geo of filters.geographic) {
          if (!s.geographic.includes(geo)) return false;
        }
      }
      return true;
    });
  }, [filters]);

  const hasActiveFilter =
    filters.horizon !== null ||
    filters.esg !== null ||
    filters.complexity !== null ||
    filters.geographic.length > 0;

  return (
    <div className="space-y-6">

      {/* ── Simple recommendation callout ─────────────────── */}
      <div className="rounded-xl border border-[var(--forest)]/15 bg-[#f0f5f0] py-4 pl-5 pr-5"
        style={{ borderLeftWidth: '3px', borderLeftColor: 'var(--forest)' }}>
        <p className="mb-1 text-[10px] font-semibold uppercase tracking-wide text-[var(--forest)]/60">
          {t('recommendation_label')}
        </p>
        <p className="mb-2 font-heading text-sm font-bold text-[var(--charcoal)]">
          {t('recommendation_heading')}
        </p>
        <p className="mb-3 text-xs leading-relaxed text-[var(--charcoal)]/65">
          {t('recommendation_body')}
        </p>
        <button
          type="button"
          onClick={() => {
            setFilters(EMPTY_FILTERS);
            setTimeout(() => {
              toutEnUnRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 50);
          }}
          className="text-xs font-semibold text-[var(--forest)] hover:underline hover:underline-offset-2"
        >
          {t('recommendation_cta')} →
        </button>
      </div>

      {/* ── Filter ────────────────────────────────────────── */}
      <StrategyFilter filters={filters} onChange={setFilters} />

      {/* ── Returns disclosure (collapsible) ──────────────── */}
      <ReturnsDisclosure />

      {/* ── Cards grid ────────────────────────────────────── */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center gap-3 py-16 text-center">
          <p className="text-sm text-[var(--charcoal)]/50">{t('no_results')}</p>
          {hasActiveFilter && (
            <button
              type="button"
              onClick={() => setFilters(EMPTY_FILTERS)}
              className="text-xs font-semibold text-[var(--forest)] underline underline-offset-2 hover:no-underline"
            >
              {t('reset_filters')}
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map(strategy => (
            <div
              key={strategy.id}
              ref={strategy.id === 'tout-en-un' ? toutEnUnRef : undefined}
            >
              <StrategyCard strategy={strategy} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
