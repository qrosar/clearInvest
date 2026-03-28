'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

const chartPoints = [
  { count: 5,  bank: 5,  etf: 5  },
  { count: 10, bank: 9,  etf: 13 },
  { count: 15, bank: 14, etf: 24 },
  { count: 20, bank: 20, etf: 42 },
  { count: 25, bank: 26, etf: 67 },
  { count: 30, bank: 35, etf: 96 },
];

export default function Hero() {
  const t = useTranslations('hero');
  const chartData = chartPoints.map(p => ({ ...p, label: t('chart_year_label', { count: p.count }) }));

  return (
    <section className="relative min-h-screen overflow-hidden bg-[var(--forest-deep)]">
      {/* Radial glow on right half */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 60% 70% at 80% 35%, rgba(45,90,53,0.55) 0%, transparent 70%)',
        }}
      />

      <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-6 pb-20 pt-32 lg:grid-cols-2 lg:gap-16">

        {/* ── Left: text ───────────────────────────────────── */}
        <div>
          {/* Pill tag */}
          <span
            className="fade-up inline-block rounded-full border border-[var(--sage)]/25 bg-[var(--sage)]/15 px-4 py-1.5 text-sm font-medium text-[var(--sage-light)]"
            style={{ animationDelay: '0ms' }}
          >
            {t('tag')}
          </span>

          {/* H1 */}
          <h1
            className="fade-up mt-6 font-heading text-5xl font-semibold leading-snug text-[var(--warm-white)] lg:text-6xl xl:text-[4.5rem]"
            style={{ animationDelay: '80ms' }}
          >
            {t('title')}{' '}
            <span className="text-[var(--amber)]">{t('titleItalic')}</span>
          </h1>

          {/* Subtitle */}
          <p
            className="fade-up mt-6 max-w-lg text-lg leading-relaxed text-[var(--warm-tan)]"
            style={{ animationDelay: '160ms' }}
          >
            {t('subtitle')}
          </p>

          {/* CTAs */}
          <div
            className="fade-up mt-10 flex flex-wrap items-center gap-5"
            style={{ animationDelay: '240ms' }}
          >
            <Link
              href="/strategies"
              className="rounded-full bg-[var(--amber)] px-7 py-3.5 text-sm font-semibold text-[var(--forest-deep)] shadow-md transition-opacity hover:opacity-90"
            >
              {t('cta_primary')}
            </Link>
            <Link
              href="/calculateur"
              className="group flex items-center gap-1.5 text-sm font-medium text-[var(--warm-white)]/70 transition-colors hover:text-[var(--warm-white)]"
            >
              {t('cta_secondary')}
              <span className="transition-transform group-hover:translate-x-0.5">→</span>
            </Link>
          </div>
        </div>

        {/* ── Right: chart card ─────────────────────────────── */}
        <div
          className="fade-up relative"
          style={{ animationDelay: '180ms' }}
        >
          {/* Floating badge */}
          <div className="badge-float absolute -right-3 -top-5 z-10 rounded-xl bg-[var(--amber)] px-4 py-2.5 shadow-xl lg:-right-6">
            <p className="text-sm font-bold leading-none text-[var(--forest-deep)]">
              {t('chart_badge_rate')}
            </p>
            <p className="mt-0.5 text-xs text-[var(--forest-deep)]/70">
              {t('chart_badge_label')}
            </p>
          </div>

          {/* Card */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-6 shadow-2xl backdrop-blur-sm">
            {/* Legend */}
            <div className="mb-5 flex items-center gap-5 text-xs">
              <span className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-sm bg-[#8a9ba8]" />
                <span className="text-[var(--warm-white)]/55">{t('chart_savings')}</span>
              </span>
              <span className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-sm bg-[var(--sage)]" />
                <span className="text-[var(--warm-white)]/55">{t('chart_etf')}</span>
              </span>
            </div>

            {/* Bar chart */}
            <div className="flex items-end justify-between gap-2" style={{ height: '160px' }}>
              {chartData.map(({ label, bank, etf }, i) => (
                <div
                  key={label}
                  className="bar-group flex flex-1 flex-col items-center gap-1.5"
                  style={{ animationDelay: `${300 + i * 60}ms` }}
                >
                  <div className="flex w-full items-end justify-center gap-1" style={{ height: '148px' }}>
                    <div
                      className="w-[42%] rounded-t-sm bg-[#8a9ba8] transition-all"
                      style={{ height: `${bank}%` }}
                    />
                    <div
                      className="w-[42%] rounded-t-sm bg-[var(--sage)] transition-all"
                      style={{ height: `${etf}%` }}
                    />
                  </div>
                  <span className="text-[10px] leading-none text-[var(--warm-white)]/35">
                    {label}
                  </span>
                </div>
              ))}
            </div>

            {/* Summary row */}
            <div className="mt-5 border-t border-white/10 pt-5">
              <p className="text-xs text-[var(--warm-white)]/45">
                {t('chart_subtitle')}
              </p>
              <div className="mt-2 flex items-center justify-between">
                <p className="font-heading text-2xl font-bold text-[var(--warm-white)]">
                  {t('chart_value')}
                </p>
                <span className="rounded-full bg-[var(--sage)]/20 px-3 py-1 text-xs font-semibold text-[var(--sage-light)]">
                  {t('chart_delta')}
                </span>
              </div>
            </div>
          </div>
          <p className="mt-2.5 text-left text-[10px] text-[var(--warm-white)]/35">
            {t('chart_disclaimer')}
          </p>
        </div>
      </div>
    </section>
  );
}
