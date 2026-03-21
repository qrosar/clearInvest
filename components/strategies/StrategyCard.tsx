import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import type { Strategy } from '@/lib/strategies/strategies';
import TerInfoIcon from './TerInfoIcon';
import StrategyReturnsBar from './StrategyReturnsBar';

interface Props {
  strategy: Strategy;
}

function Badge({ children, className }: { children: React.ReactNode; className: string }) {
  return (
    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold ${className}`}>
      {children}
    </span>
  );
}

export default function StrategyCard({ strategy }: Props) {
  const t = useTranslations('strategyCard');
  const ts = useTranslations('strategies');
  const td = useTranslations();

  const weightedTer = strategy.etfs.reduce(
    (sum, e) => sum + (e.ter * e.allocation) / 100,
    0
  );

  const name = strategy.name.startsWith('data.') ? td(strategy.name as any) : ts(strategy.name as any);
  const tagline = strategy.tagline.startsWith('data.') ? td(strategy.tagline as any) : ts(strategy.tagline as any);
  const description = strategy.description.startsWith('data.') ? td(strategy.description as any) : ts(strategy.description as any);

  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-[var(--warm-tan)]/40 bg-[var(--warm-white)] shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-xl">
      {/* Colored top bar */}
      <div className="h-1 w-full" style={{ backgroundColor: strategy.color }} />

      <div className="flex flex-1 flex-col p-6">
        {/* Header */}
        <div className="mb-4">
          <h3 className="font-heading text-lg font-bold leading-tight text-[var(--charcoal)]">
            <Link
              href={`/strategies/${strategy.id}`}
              className="hover:text-[var(--forest)] transition-colors"
            >
              {name}
            </Link>
          </h3>
          <p className="mt-0.5 text-sm text-[var(--charcoal)]/55">{tagline}</p>

          {/* Badges row */}
          <div className="mt-3 flex flex-wrap gap-1.5">
            <Badge className="bg-[var(--warm-tan)]/40 text-[var(--charcoal)]/60">
              {t(`complexity_${strategy.complexity}` as any)}
            </Badge>

            {strategy.horizon.map(h => (
              <Badge key={h} className="bg-[var(--warm-tan)]/40 text-[var(--charcoal)]/60">
                {t(`horizon_${h}` as any)}
              </Badge>
            ))}

            {strategy.esg && (
              <Badge className="bg-[var(--forest)]/10 text-[var(--forest)]">
                ESG
              </Badge>
            )}

            <Badge className="bg-[var(--sage-pale,#e8f0e9)] text-[var(--forest)]/70">
              TOB {(strategy.tob * 100).toFixed(2)}%
            </Badge>
          </div>
        </div>

        {/* Description */}
        <p className="mb-5 text-xs leading-relaxed text-[var(--charcoal)]/65">
          {description}
        </p>

        {/* ETF allocations */}
        <div className="mb-4 space-y-2">
          <p className="text-[10px] font-semibold uppercase tracking-wide text-[var(--charcoal)]/40">
            {t('composition')}
          </p>
          <div className="flex flex-wrap gap-2">
            {strategy.etfs.map(etf => (
              <div key={etf.ticker} className="flex flex-col">
                <span
                  title={etf.isin}
                  className="inline-flex cursor-default items-center gap-1.5 rounded-lg border border-[var(--warm-tan)]/60 bg-[var(--warm-cream,#faf6ef)] px-2.5 py-1.5 text-xs"
                >
                  <span className="font-mono font-semibold text-[var(--charcoal)]">{etf.ticker}</span>
                  <span className="text-[var(--charcoal)]/45">{etf.allocation}%</span>
                  {etf.accumulating ? (
                    <span className="rounded bg-[var(--forest)]/10 px-1 py-0.5 text-[9px] font-semibold text-[var(--forest)]">{t('acc_label')}</span>
                  ) : (
                    <span className="rounded bg-amber-100 px-1 py-0.5 text-[9px] font-semibold text-amber-700">{t('dist_label')}</span>
                  )}
                </span>
                <span className="mt-0.5 pl-2.5 text-[9px] text-[var(--charcoal)]/35">
                  TER {etf.ter.toFixed(2)}%
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Detail link */}
        <Link
          href={`/strategies/${strategy.id}`}
          className="mb-4 inline-flex items-center gap-1 text-xs font-medium text-[var(--forest)]/70 hover:text-[var(--forest)] hover:underline transition-colors"
        >
          {t('learn_more')}
        </Link>



        {/* Metrics */}
        <div className="mb-4 space-y-1.5 rounded-xl bg-[var(--warm-tan)]/10 px-4 py-3 text-xs">
          <div className="flex justify-between">
            <span className="flex items-center gap-1 text-[var(--charcoal)]/50">
              {t('weighted_ter')}
              <TerInfoIcon text={t('ter_tooltip')} />
            </span>
            <span className="font-medium text-[var(--charcoal)]">{weightedTer.toFixed(2)}%</span>
          </div>
          <div className="flex items-start justify-between gap-3">
            <span className="text-[var(--charcoal)]/50">
              {t('historical_return', { period: strategy.historicalReturnPeriod })}
            </span>
            <span className="shrink-0 font-semibold text-[var(--forest)]">
              ~{(strategy.historicalReturn * 100).toFixed(1)}{t('per_year')}
            </span>
          </div>
          {strategy.historicalReturnNote && (
            <p className="mt-1 text-[10px] italic leading-relaxed text-[var(--charcoal)]/40">
              {strategy.historicalReturnNote.startsWith('data.') ? td(strategy.historicalReturnNote as any) : ts(strategy.historicalReturnNote as any)}
            </p>
          )}
        </div>

        {/* Warnings */}
        {strategy.warnings && strategy.warnings.length > 0 && (
          <div className="mb-4 space-y-2">
            {strategy.warnings.map((w, i) => {
              const translated = w.startsWith('data.') ? td(w as any) : ts(w as any);
              const isAlert = translated.startsWith('⚠️');
              return (
                <div
                  key={i}
                  className={`rounded-lg px-3 py-2 text-[11px] leading-relaxed ${
                    isAlert
                      ? 'bg-amber-50 text-amber-800'
                      : 'bg-slate-50 text-slate-600'
                  }`}
                >
                  {translated}
                </div>
              );
            })}
          </div>
        )}

        <StrategyReturnsBar strategyId={strategy.id} variant="card" />

        {/* CTA — pushed to bottom */}
        <div className="mt-auto pt-2">
          <Link
            href={`/calculateur?strategy=${strategy.id}`}
            className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--forest)] hover:gap-2 transition-all duration-150"
          >
            {t('cta')}
            <span className="transition-transform duration-150 group-hover:translate-x-0.5">→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
