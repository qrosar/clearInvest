'use client';

import { useTranslations } from 'next-intl';
import { STRATEGY_RETURNS, type PeriodReturns } from '@/lib/strategies/historicalReturns';

interface Props {
  strategyId: string;
  /** 'card' = compact strip for StrategyCard, 'detail' = fuller block for StrategyDetail */
  variant?: 'card' | 'detail';
}

type PeriodKey = keyof Omit<PeriodReturns, 'source' | 'estimated'>;

const PERIODS: { key: PeriodKey; labelKey: string }[] = [
  { key: 'y1',  labelKey: 'label_y1'  },
  { key: 'y3',  labelKey: 'label_y3' },
  { key: 'y5',  labelKey: 'label_y5' },
  { key: 'y10', labelKey: 'label_y10' },
];

function fmt(v: number): string {
  const sign = v >= 0 ? '+' : '';
  return `${sign}${(v * 100).toFixed(1)}%`;
}

function colorFor(v: number): string {
  if (v >= 0.18) return 'var(--forest)';
  if (v >= 0.10) return '#2d7a3a';
  if (v >= 0.05) return '#5a8a3f';
  if (v >= 0.00) return '#8aab6a';
  return '#c0392b';
}

function ReturnPill({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex flex-col items-center gap-0.5">
      <span
        className="text-[13px] font-bold tabular-nums leading-none"
        style={{ color: colorFor(value) }}
      >
        {fmt(value)}
      </span>
      <span className="text-[9px] font-medium uppercase tracking-wide text-[var(--charcoal)]/40 leading-none">
        {label}
      </span>
    </div>
  );
}

export default function StrategyReturnsBar({ strategyId, variant = 'card' }: Props) {
  const t = useTranslations('strategies_returns');
  const returns = STRATEGY_RETURNS[strategyId];
  if (!returns) return null;

  const translatedSource = t(returns.source as any);

  /* ── Card variant: compact pill strip ─────────────────────────── */
  if (variant === 'card') {
    // Extract prefix for card (first part before parenthesis)
    const sourcePrefix = translatedSource.split('(')[0].trim();

    return (
      <div className="mt-4 rounded-xl border border-[var(--warm-tan)]/40 bg-[var(--warm-cream,#faf6ef)] px-3 py-2.5">
        <p className="mb-2 text-[9px] font-semibold uppercase tracking-widest text-[var(--charcoal)]/35">
          {t('title_card')}
        </p>
        <div className="grid grid-cols-4 divide-x divide-[var(--warm-tan)]/40">
          {PERIODS.map(({ key, labelKey }) => (
            <ReturnPill key={key} label={t(labelKey as any)} value={returns[key]} />
          ))}
        </div>
        <p className="mt-2 text-[8px] leading-relaxed text-[var(--charcoal)]/30">
          {t('disclaimer_card', { source: sourcePrefix })}
        </p>
        {returns.estimated && (
          <p className="mt-1 text-[8px] leading-relaxed text-[var(--charcoal)]/25 italic">
            {t('disclaimer_estimated')}
          </p>
        )}
      </div>
    );
  }

  /* ── Detail variant: horizontal bar chart ─────────────────────── */
  const max = Math.max(returns.y1, returns.y3, returns.y5, returns.y10);

  return (
    <div className="rounded-2xl border border-[var(--warm-tan)]/40 bg-[var(--warm-cream,#faf6ef)] px-5 py-4">
      <div className="mb-4 flex items-baseline justify-between gap-2">
        <h3 className="text-sm font-bold text-[var(--charcoal)]">
          {t('title_detail')}
        </h3>
        <span className="text-[10px] text-[var(--charcoal)]/40">
          {t('subtitle_detail')}
        </span>
      </div>

      <div className="space-y-3">
        {PERIODS.map(({ key, labelKey }) => {
          const value = returns[key];
          const barWidth = max > 0 ? Math.max(4, (value / max) * 100) : 4;
          return (
            <div key={key} className="flex items-center gap-3">
              <span className="w-12 shrink-0 text-right text-[10px] font-semibold text-[var(--charcoal)]/50">
                {t(labelKey as any)}
              </span>
              <div className="relative h-5 flex-1 overflow-hidden rounded-full bg-[var(--warm-tan)]/25">
                <div
                  className="absolute inset-y-0 left-0 rounded-full transition-all duration-700"
                  style={{
                    width: `${barWidth}%`,
                    backgroundColor: colorFor(value),
                    opacity: 0.75,
                  }}
                />
              </div>
              <span
                className="w-14 shrink-0 text-right text-[13px] font-bold tabular-nums"
                style={{ color: colorFor(value) }}
              >
                {fmt(value)}
              </span>
            </div>
          );
        })}
      </div>

      <p className="mt-4 text-[9px] leading-relaxed text-[var(--charcoal)]/35">
        {t('disclaimer_detail', { source: translatedSource })}
      </p>
      {returns.estimated && (
        <p className="mt-1 text-[9px] leading-relaxed text-[var(--charcoal)]/30 italic">
          {t('disclaimer_estimated')}
        </p>
      )}
    </div>
  );
}
