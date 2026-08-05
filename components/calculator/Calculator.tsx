'use client';

import { useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import dynamic from 'next/dynamic';
import { useTranslations } from 'next-intl';
import { PRODUCTS, type Product } from '@/lib/calculator/products';
import { computeGrowth, type TaxBreakdown, type DividendBreakdown } from '@/lib/calculator/compute';
import ProductSelector from './ProductSelector';
import ResultSummary from './ResultSummary';
import NumberField from './NumberField';

const MIN_YEARS = 1;
const MAX_YEARS = 60;

// Recharts must not render server-side (uses DOM APIs)
const ResultChart = dynamic(() => import('./ResultChart'), { ssr: false });

const fmtPension = (n: number) =>
  new Intl.NumberFormat('fr-BE', { style: 'currency', currency: 'EUR', minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(n);

export default function Calculator() {
  const t = useTranslations('calculator');

  // "1 an" vs "20 ans" — NL/EN fall back gracefully via their own singular key
  const yearsUnit = (n: number) => (n === 1 ? t('years_unit_one') : t('years_unit'));

  const [lumpSum, setLumpSum] = useState(0);
  const [monthlyContribution, setMonthlyContribution] = useState(200);
  const [years, setYears] = useState(20);

  // All available products (static defaults + user-added custom products)
  const [allProducts, setAllProducts] = useState<Product[]>(PRODUCTS);

  // Which products are currently selected (by ID), pre-seeded from ?strategy=.
  // Reading the param in the initialiser rather than a mount effect means the
  // right product is selected on the very first render — no flash of an empty
  // comparison, and no cascading re-render.
  const searchParams = useSearchParams();
  const [selectedIds, setSelectedIds] = useState<string[]>(() => {
    const strategyId = searchParams.get('strategy');
    return strategyId && PRODUCTS.some(p => p.id === strategyId) ? [strategyId] : [];
  });

  // Per-product rate overrides (initialised from defaultRate, editable inline)
  const [rates, setRates] = useState<Record<string, number>>(
    Object.fromEntries(PRODUCTS.map(p => [p.id, p.defaultRate ?? 0]))
  );

  // Pension savings lock: when ANY pension product is selected, contributions are fixed to legal limits
  const [pensionAnnual, setPensionAnnual] = useState<1050 | 1350>(1050);
  const selectedPensionIds = selectedIds.filter(id =>
    allProducts.find(p => p.id === id)?.taxConfig?.pensionTax !== undefined
  );
  const isPensionLocked = selectedPensionIds.length > 0;
  const hasMultiplePensionProducts = selectedPensionIds.length > 1;
  const effectiveMonthly = isPensionLocked ? pensionAnnual / 12 : monthlyContribution;
  const effectiveLumpSum = isPensionLocked ? 0 : lumpSum;

  function handleSelect(id: string) {
    setSelectedIds(prev => (prev.includes(id) ? prev : [...prev, id]));
  }

  function handleDeselect(id: string) {
    setSelectedIds(prev => prev.filter(x => x !== id));
  }

  function handleRateChange(id: string, rate: number) {
    setRates(prev => ({ ...prev, [id]: rate }));
  }

  function handleAddCustom(product: Product) {
    setAllProducts(prev => [...prev, product]);
    setSelectedIds(prev => [...prev, product.id]);
    setRates(prev => ({ ...prev, [product.id]: product.defaultRate ?? 0 }));
  }

  const { chartData, activeProducts, summaryData } = useMemo(() => {
    const activeProducts = allProducts.filter(p => selectedIds.includes(p.id));

    const growthResults = new Map(
      activeProducts.map(p => [
        p.id,
        computeGrowth(p, effectiveMonthly, years, effectiveLumpSum, rates[p.id] ?? p.defaultRate, isPensionLocked ? pensionAnnual : undefined),
      ])
    );

    const chartData: Record<string, number>[] = Array.from({ length: years + 1 }, (_, year) => {
      const row: Record<string, number> = { year };
      activeProducts.forEach(p => {
        row[p.id] = growthResults.get(p.id)!.points[year]?.value ?? 0;
      });
      return row;
    });

    const summaryData: Record<string, { finalValueAfterTax: number; totalTaxPaid: number; taxBreakdown: TaxBreakdown; dividends?: DividendBreakdown }> = {};
    activeProducts.forEach(p => {
      const result = growthResults.get(p.id)!;
      summaryData[p.id] = {
        finalValueAfterTax: result.finalValueAfterTax,
        totalTaxPaid: result.taxBreakdown.total,
        taxBreakdown: result.taxBreakdown,
        dividends: result.dividends,
      };
    });

    return { chartData, activeProducts, summaryData };
  }, [allProducts, selectedIds, rates, effectiveMonthly, effectiveLumpSum, years, isPensionLocked, pensionAnnual]);

  return (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">

      {/* ── Inputs panel ───────────────────────────────────── */}
      <div className="space-y-8 lg:col-span-1">

        {/* Lump sum — disabled when pension locked */}
        <div className={isPensionLocked ? 'pointer-events-none select-none opacity-40' : ''}>
          <div className="mb-2 flex items-center justify-between">
            <label className="text-sm font-semibold text-[var(--charcoal)]">
              {t('lump_sum_label')}
            </label>
            <div className="flex items-center gap-1">
              {effectiveLumpSum > 0 && <span className="text-sm text-[var(--charcoal)]/40">€</span>}
              <NumberField
                value={effectiveLumpSum}
                min={0}
                max={2000000}
                onCommit={setLumpSum}
                zeroPlaceholder={t('lump_sum_none')}
                ariaLabel={t('lump_sum_label')}
                className="w-24 rounded border border-[var(--warm-tan)] bg-[var(--warm-white)]
                  px-2 py-1 text-right text-sm font-bold text-[var(--charcoal)]
                  placeholder:font-normal placeholder:text-[var(--charcoal)]/35
                  focus:outline-none focus:ring-1 focus:ring-[var(--forest)]"
              />
            </div>
          </div>
          <input
            type="range" min={0} max={2000000} step={1000} value={effectiveLumpSum}
            onChange={e => setLumpSum(Number(e.target.value))}
            className="w-full" style={{ accentColor: 'var(--forest)' }}
          />
          <div className="mt-1 flex justify-between text-[10px] text-[var(--charcoal)]/35">
            <span>{t('lump_sum_none')}</span><span>€2.000.000</span>
          </div>
        </div>

        {/* Monthly contribution — pill selector when pension locked, slider otherwise */}
        {isPensionLocked ? (
          <div>
            <label className="mb-3 block text-sm font-semibold text-[var(--charcoal)]">
              {t('monthly_label')}
            </label>
            <div className="flex gap-2">
              {([1050, 1350] as const).map(annual => (
                <button
                  key={annual}
                  type="button"
                  onClick={() => setPensionAnnual(annual)}
                  className={`flex flex-1 flex-col rounded-xl border-2 px-3 py-3 text-left transition-colors ${
                    pensionAnnual === annual
                      ? 'border-[var(--forest)] bg-[var(--forest)] text-white'
                      : 'border-[var(--warm-tan)] bg-[var(--warm-white)] text-[var(--charcoal)] hover:border-[var(--forest)]/50'
                  }`}
                >
                  <span className="text-sm font-bold">€{annual.toLocaleString('fr-BE')} / an</span>
                  <span className={`mt-0.5 text-[10px] leading-snug ${pensionAnnual === annual ? 'text-white/75' : 'text-[var(--charcoal)]/45'}`}>
                    {t(annual === 1050 ? 'pension_pill_rate_30' : 'pension_pill_rate_25')}
                  </span>
                </button>
              ))}
            </div>
            <p className="mt-2 text-[10px] text-[var(--charcoal)]/45">
              → {fmtPension(pensionAnnual / 12)}/mois
            </p>
          </div>
        ) : (
          <div>
            <div className="mb-2 flex items-center justify-between">
              <label className="text-sm font-semibold text-[var(--charcoal)]">
                {t('monthly_label')}
              </label>
              <div className="flex items-center gap-1">
                <span className="text-sm text-[var(--charcoal)]/40">€</span>
                <NumberField
                  value={monthlyContribution}
                  min={0}
                  max={10000}
                  onCommit={setMonthlyContribution}
                  ariaLabel={t('monthly_label')}
                  className="w-20 rounded border border-[var(--warm-tan)] bg-[var(--warm-white)]
                    px-2 py-1 text-right text-sm font-bold text-[var(--charcoal)]
                    focus:outline-none focus:ring-1 focus:ring-[var(--forest)]"
                />
              </div>
            </div>
            <input
              type="range" min={0} max={10000} step={50} value={monthlyContribution}
              onChange={e => setMonthlyContribution(Number(e.target.value))}
              className="w-full" style={{ accentColor: 'var(--forest)' }}
            />
            <div className="mt-1 flex justify-between text-[10px] text-[var(--charcoal)]/35">
              <span>€0</span><span>€10.000</span>
            </div>
          </div>
        )}

        {/* Duration */}
        <div>
          <div className="mb-2 flex items-center justify-between">
            <label className="text-sm font-semibold text-[var(--charcoal)]">
              {t('years_label')}
            </label>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                aria-label={t('years_decrease')}
                onClick={() => setYears(y => Math.max(MIN_YEARS, y - 1))}
                disabled={years <= MIN_YEARS}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--warm-tan)]
                  bg-[var(--warm-white)] text-base leading-none text-[var(--charcoal)]/70 transition-colors
                  hover:border-[var(--forest)]/50 hover:text-[var(--forest)] disabled:opacity-30"
              >
                −
              </button>
              <NumberField
                value={years}
                min={MIN_YEARS}
                max={MAX_YEARS}
                onCommit={setYears}
                ariaLabel={t('years_label')}
                className="w-12 rounded border border-[var(--warm-tan)] bg-[var(--warm-white)]
                  px-2 py-1 text-center text-sm font-bold text-[var(--charcoal)]
                  focus:outline-none focus:ring-1 focus:ring-[var(--forest)]"
              />
              <button
                type="button"
                aria-label={t('years_increase')}
                onClick={() => setYears(y => Math.min(MAX_YEARS, y + 1))}
                disabled={years >= MAX_YEARS}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--warm-tan)]
                  bg-[var(--warm-white)] text-base leading-none text-[var(--charcoal)]/70 transition-colors
                  hover:border-[var(--forest)]/50 hover:text-[var(--forest)] disabled:opacity-30"
              >
                +
              </button>
              <span className="text-sm text-[var(--charcoal)]/40">{t('years_unit')}</span>
            </div>
          </div>
          <input
            type="range" min={MIN_YEARS} max={MAX_YEARS} step={1} value={years}
            onChange={e => setYears(Number(e.target.value))}
            className="w-full" style={{ accentColor: 'var(--forest)' }}
          />
          <div className="mt-1 flex justify-between text-[10px] text-[var(--charcoal)]/35">
            <span>{MIN_YEARS} {yearsUnit(MIN_YEARS)}</span><span>{MAX_YEARS} {yearsUnit(MAX_YEARS)}</span>
          </div>
          {/* Quick presets — faster than the slider on touch screens */}
          <div className="mt-2 flex flex-wrap gap-1.5">
            {[1, 3, 5, 10, 20, 30].map(preset => (
              <button
                key={preset}
                type="button"
                onClick={() => setYears(preset)}
                className={`rounded-full border px-2.5 py-1 text-[11px] font-medium transition-colors ${
                  years === preset
                    ? 'border-[var(--forest)] bg-[var(--forest)] text-white'
                    : 'border-[var(--warm-tan)]/60 bg-[var(--warm-cream)] text-[var(--charcoal)]/60 hover:border-[var(--forest)]/50'
                }`}
              >
                {preset} {yearsUnit(preset)}
              </button>
            ))}
          </div>
        </div>

        {/* Pension locked notice */}
        {isPensionLocked && (
          <div className="rounded-xl border border-[#fde68a] bg-[#fef3c7] p-4 text-xs leading-relaxed text-[#92400e]">
            {t('pension_locked_notice')}
            {hasMultiplePensionProducts && (
              <p className="mt-2 border-t border-[#fde68a] pt-2">
                {t('pension_multi_note')}
              </p>
            )}
          </div>
        )}

        {/* Product selector */}
        <div>
          <p className="mb-3 text-sm font-semibold text-[var(--charcoal)]">
            {t('select_products')}
          </p>
          <ProductSelector
            allProducts={allProducts}
            selectedIds={selectedIds}
            rates={rates}
            monthlyContribution={effectiveMonthly}
            onSelect={handleSelect}
            onDeselect={handleDeselect}
            onRateChange={handleRateChange}
            onAddCustom={handleAddCustom}
          />
        </div>
      </div>

      {/* ── Results panel ──────────────────────────────────── */}
      <div className="lg:col-span-2">
        {activeProducts.length > 0 ? (
          <>
            <div className="rounded-2xl border border-[var(--warm-tan)]/40 bg-[var(--warm-white)] p-6 shadow-sm">
              <ResultChart data={chartData} products={activeProducts} />
            </div>
            <ResultSummary
              products={activeProducts}
              summaryData={summaryData}
              rates={rates}
              lumpSum={effectiveLumpSum}
              monthlyContribution={effectiveMonthly}
              years={years}
              isPensionLocked={isPensionLocked}
              pensionAnnual={pensionAnnual}
            />
          </>
        ) : (
          <div className="flex h-64 items-center justify-center rounded-2xl border border-dashed border-[var(--warm-tan)] text-sm text-[var(--charcoal)]/40">
            {t('no_results')}
          </div>
        )}

        <p className="mt-6 text-center text-xs leading-relaxed text-[var(--charcoal)]/35">
          {t('tax_note')}
        </p>
      </div>

    </div>
  );
}
