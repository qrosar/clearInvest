'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import type { Strategy } from '@/lib/strategies/strategies';
import type { StrategyContent, Alternative } from '@/lib/strategies/strategyContent';

interface Props {
  strategy: Strategy;
  content: StrategyContent | null;
}

function Badge({ children, className }: { children: React.ReactNode; className: string }) {
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${className}`}>
      {children}
    </span>
  );
}

// ── Key fact box ──────────────────────────────────────────────────────────────
function FactBox({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="flex flex-col rounded-xl border border-[var(--warm-tan)]/40 bg-[var(--warm-white)] px-4 py-3">
      <span className="text-[10px] uppercase tracking-wide text-[var(--charcoal)]/40">{label}</span>
      <span className="mt-1 text-lg font-bold leading-tight text-[var(--charcoal)]">{value}</span>
      {sub && <span className="mt-0.5 text-[10px] text-[var(--charcoal)]/40">{sub}</span>}
    </div>
  );
}

// ── Single alternative card ───────────────────────────────────────────────────
function AlternativeCard({ alt, t }: { alt: Alternative; t: ReturnType<typeof useTranslations<'strategyDetail'>> }) {
  const tickers = alt.ticker.split(' + ');
  const isins = alt.isin.split(' + ');

  return (
    <div className="flex flex-col rounded-xl border border-[var(--warm-tan)]/40 bg-[var(--warm-white)] p-5">
      {/* Header */}
      <div className="mb-3 flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="flex flex-wrap items-center gap-1.5">
            {tickers.map((tk, i) => (
              <span key={tk} className="font-mono text-base font-bold text-[var(--charcoal)]">
                {tk}{i < tickers.length - 1 && <span className="font-sans font-normal text-[var(--charcoal)]/40"> + </span>}
              </span>
            ))}
          </div>
          <p className="mt-0.5 text-xs text-[var(--charcoal)]/55">{alt.name}</p>
        </div>
        <div className="flex shrink-0 flex-wrap gap-1.5">
          <span className="rounded-full bg-[var(--warm-tan)]/30 px-2 py-0.5 text-[10px] font-semibold text-[var(--charcoal)]/60">
            TER {alt.ter.toFixed(2)}%
          </span>
          <span className="rounded-full bg-[var(--warm-tan)]/30 px-2 py-0.5 text-[10px] font-semibold text-[var(--charcoal)]/60">
            TOB {(alt.tob * 100).toFixed(2)}%
          </span>
          {alt.accumulating ? (
            <span className="rounded-full bg-[var(--forest)]/10 px-2 py-0.5 text-[10px] font-semibold text-[var(--forest)]">
              {t('acc_label')}
            </span>
          ) : (
            <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-semibold text-amber-700">
              {t('dist_label')}
            </span>
          )}
        </div>
      </div>

      {/* ISINs + justETF links */}
      <div className="mb-3 flex flex-wrap gap-2">
        {isins.map((isin, i) => (
          <a
            key={isin}
            href={`https://www.justetf.com/en/etf-profile.html?isin=${isin.trim()}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 rounded border border-[var(--warm-tan)]/60 px-2 py-0.5 text-[10px] text-[var(--charcoal)]/50 hover:border-[var(--forest)]/40 hover:text-[var(--forest)] transition-colors"
          >
            <span className="font-mono">{isin.trim()}</span>
            <span>↗</span>
          </a>
        ))}
      </div>

      {/* Pros / Cons */}
      <div className="mb-3 grid gap-3 sm:grid-cols-2">
        <div>
          <p className="mb-1 text-[10px] font-semibold uppercase tracking-wide text-[var(--forest)]/60">{t('alt_pros')}</p>
          <ul className="space-y-0.5">
            {alt.pros.map((p, i) => (
              <li key={i} className="flex gap-1.5 text-[11px] leading-snug text-[var(--charcoal)]/65">
                <span className="mt-0.5 shrink-0 text-[var(--forest)]/60">+</span>
                {p}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="mb-1 text-[10px] font-semibold uppercase tracking-wide text-red-400/70">{t('alt_cons')}</p>
          <ul className="space-y-0.5">
            {alt.cons.map((c, i) => (
              <li key={i} className="flex gap-1.5 text-[11px] leading-snug text-[var(--charcoal)]/65">
                <span className="mt-0.5 shrink-0 text-red-400/60">−</span>
                {c}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Verdict */}
      <div className="rounded-lg bg-[var(--warm-tan)]/15 px-3 py-2 text-[11px] leading-relaxed text-[var(--charcoal)]/70">
        <span className="font-semibold text-[var(--charcoal)]/50">{t('alt_verdict')} : </span>
        {alt.verdict}
      </div>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export default function StrategyDetail({ strategy, content }: Props) {
  const t = useTranslations('strategyDetail');
  const tc = useTranslations('strategyCard');

  const weightedTer = strategy.etfs.reduce(
    (sum, e) => sum + (e.ter * e.allocation) / 100,
    0
  );

  const hasDistributing = content?.hasDistributing ?? strategy.etfs.some(e => !e.accumulating);
  const hasReynders = content?.hasReynders ?? false;

  return (
    <div className="mx-auto max-w-4xl px-4 pb-16 sm:px-6">

      {/* ── Back button ──────────────────────────────────────────── */}
      <div className="py-6">
        <Link
          href="/strategies"
          className="inline-flex items-center gap-1.5 text-sm text-[var(--charcoal)]/50 hover:text-[var(--charcoal)] transition-colors"
        >
          <span>←</span>
          {t('back')}
        </Link>
      </div>

      {/* ── Header ───────────────────────────────────────────────── */}
      <div className="mb-8 overflow-hidden rounded-2xl border border-[var(--warm-tan)]/40 bg-[var(--warm-white)]">
        {/* Colored accent bar */}
        <div className="h-2 w-full" style={{ backgroundColor: strategy.color }} />

        <div className="p-6 sm:p-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h1 className="font-heading text-3xl font-bold leading-tight text-[var(--charcoal)]">
                {strategy.name}
              </h1>
              <p className="mt-1 text-base text-[var(--charcoal)]/55">{strategy.tagline}</p>
            </div>
          </div>

          {/* Badges */}
          <div className="mt-4 flex flex-wrap gap-2">
            <Badge className="bg-[var(--warm-tan)]/40 text-[var(--charcoal)]/60">
              {t(`complexity_${strategy.complexity}` as any)}
            </Badge>
            {strategy.horizon.map(h => (
              <Badge key={h} className="bg-[var(--warm-tan)]/40 text-[var(--charcoal)]/60">
                {t(`horizon_${h}` as any)}
              </Badge>
            ))}
            {strategy.esg && (
              <Badge className="bg-[var(--forest)]/10 text-[var(--forest)]">ESG</Badge>
            )}
            <Badge className="bg-[var(--warm-tan)]/20 text-[var(--forest)]/70">
              TOB {(strategy.tob * 100).toFixed(2)}%
            </Badge>
          </div>

          <p className="mt-5 text-sm leading-relaxed text-[var(--charcoal)]/65">
            {strategy.description}
          </p>

          {strategy.warnings && strategy.warnings.length > 0 && (
            <div className="mt-4 space-y-2">
              {strategy.warnings.map((w, i) => (
                <div
                  key={i}
                  className={`rounded-lg px-4 py-3 text-xs leading-relaxed ${
                    w.startsWith('⚠️') ? 'bg-amber-50 text-amber-800' : 'bg-slate-50 text-slate-600'
                  }`}
                >
                  {w}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── Key facts grid ───────────────────────────────────────── */}
      <section className="mb-10">
        <h2 className="mb-4 font-heading text-xl font-bold text-[var(--charcoal)]">{t('key_facts')}</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          <FactBox label={t('fact_tob')} value={`${(strategy.tob * 100).toFixed(2)}%`} sub={t('fact_tob_sub')} />
          <FactBox label={t('fact_ter')} value={`${weightedTer.toFixed(2)}%`} sub={t('fact_ter_sub')} />
          {content && (
            <FactBox
              label={t('fact_securities')}
              value={`~${content.numberOfSecurities.toLocaleString('fr-BE')}`}
              sub={t('fact_securities_sub')}
            />
          )}
          <FactBox
            label={t('fact_return')}
            value={`~${(strategy.historicalReturn * 100).toFixed(1)}${t('per_year')}`}
            sub={strategy.historicalReturnPeriod}
          />
          <FactBox
            label={t('fact_reynders')}
            value={hasReynders ? t('fact_reynders_yes') : t('fact_reynders_no')}
          />
          <FactBox
            label={t('fact_dividends')}
            value={hasDistributing ? t('fact_dividends_distributing') : t('fact_dividends_accumulating')}
          />
        </div>
        {strategy.historicalReturnNote && (
          <p className="mt-2 text-[11px] italic leading-relaxed text-[var(--charcoal)]/40">
            {strategy.historicalReturnNote}
          </p>
        )}
      </section>

      {/* ── ETF composition ──────────────────────────────────────── */}
      <section className="mb-10">
        <h2 className="mb-4 font-heading text-xl font-bold text-[var(--charcoal)]">{t('composition')}</h2>
        <div className="space-y-3">
          {strategy.etfs.map(etf => (
            <div
              key={etf.ticker}
              className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-[var(--warm-tan)]/40 bg-[var(--warm-white)] px-5 py-4"
            >
              <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono text-base font-bold text-[var(--charcoal)]">{etf.ticker}</span>
                  <span className="rounded-full bg-[var(--warm-tan)]/30 px-2 py-0.5 text-[10px] font-semibold text-[var(--charcoal)]/55">
                    {etf.allocation}%
                  </span>
                  {etf.accumulating ? (
                    <span className="rounded bg-[var(--forest)]/10 px-1.5 py-0.5 text-[10px] font-semibold text-[var(--forest)]">{t('acc_label')}</span>
                  ) : (
                    <span className="rounded bg-amber-100 px-1.5 py-0.5 text-[10px] font-semibold text-amber-700">{t('dist_label')}</span>
                  )}
                </div>
                <p className="text-xs text-[var(--charcoal)]/60">{etf.name}</p>
                <p className="text-[10px] text-[var(--charcoal)]/35">{t('isin_label')} {etf.isin}</p>
              </div>
              <div className="flex shrink-0 flex-col items-end gap-2">
                <span className="text-sm font-semibold text-[var(--charcoal)]/70">TER {etf.ter.toFixed(2)}%</span>
                <a
                  href={`https://www.justetf.com/en/etf-profile.html?isin=${etf.isin}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[11px] font-medium text-[var(--forest)]/70 hover:text-[var(--forest)] transition-colors"
                >
                  {t('justetf_link')}
                  <span>↗</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Why this strategy ────────────────────────────────────── */}
      {content?.whyPoints && content.whyPoints.length > 0 && (
        <section className="mb-10">
          <h2 className="mb-4 font-heading text-xl font-bold text-[var(--charcoal)]">{t('why_title')}</h2>
          <div className="rounded-xl border border-[var(--warm-tan)]/40 bg-[var(--warm-white)] p-6">
            <ul className="space-y-4">
              {content.whyPoints.map((point, i) => (
                <li key={i} className="flex gap-3 text-sm leading-relaxed text-[var(--charcoal)]/70">
                  <span
                    className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-white"
                    style={{ backgroundColor: strategy.color }}
                  >
                    {i + 1}
                  </span>
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* ── Alternatives ─────────────────────────────────────────── */}
      {content?.alternatives && content.alternatives.length > 0 && (
        <section className="mb-10">
          <h2 className="mb-4 font-heading text-xl font-bold text-[var(--charcoal)]">{t('alternatives_title')}</h2>
          <div className="space-y-4">
            {content.alternatives.map(alt => (
              <AlternativeCard key={alt.ticker} alt={alt} t={t} />
            ))}
          </div>
        </section>
      )}

      {/* ── Fiscal disclaimer ────────────────────────────────────── */}
      {content?.fiscalNote && (
        <section className="mb-10">
          <h2 className="mb-3 font-heading text-xl font-bold text-[var(--charcoal)]">{t('disclaimer_title')}</h2>
          <div className="rounded-xl border border-amber-200 bg-amber-50 px-5 py-4 text-sm leading-relaxed text-amber-900/80">
            {content.fiscalNote}
          </div>
        </section>
      )}

      {/* ── CTA ──────────────────────────────────────────────────── */}
      <div className="flex flex-wrap items-center gap-4">
        <Link
          href={`/calculateur?strategy=${strategy.id}`}
          className="inline-flex items-center gap-2 rounded-xl bg-[var(--forest)] px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:opacity-90 hover:shadow-md"
        >
          {t('cta_simulate')}
          <span>→</span>
        </Link>
        <Link
          href="/ressources/premier-achat"
          className="inline-flex items-center gap-2 rounded-xl border border-[var(--forest)]/30 px-6 py-3 text-sm font-semibold text-[var(--forest)] transition-colors hover:bg-[var(--forest)]/5"
        >
          {t('cta_buy')}
        </Link>
        <Link
          href="/strategies"
          className="text-sm text-[var(--charcoal)]/50 hover:text-[var(--charcoal)] transition-colors"
        >
          {t('back')}
        </Link>
      </div>

    </div>
  );
}
