'use client';

import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import dynamic from 'next/dynamic';
import { useTranslations } from 'next-intl';
import { PRODUCTS, type Product } from '@/lib/calculator/products';
import { computeGrowth, type TaxBreakdown } from '@/lib/calculator/compute';
import ProductSelector from './ProductSelector';
import ResultSummary from './ResultSummary';

// Recharts must not render server-side (uses DOM APIs)
const ResultChart = dynamic(() => import('./ResultChart'), { ssr: false });

const fmtPension = (n: number) =>
  new Intl.NumberFormat('fr-BE', { style: 'currency', currency: 'EUR', minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(n);

export default function Calculator() {
  const t = useTranslations('calculator');

  const [lumpSum, setLumpSum] = useState(0);
  const [monthlyContribution, setMonthlyContribution] = useState(200);
  const [years, setYears] = useState(20);

  // All available products (static defaults + user-added custom products)
  const [allProducts, setAllProducts] = useState<Product[]>(PRODUCTS);

  // Which products are currently selected (by ID)
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // Pre-select strategy from ?strategy= URL param — runs once on mount only
  const searchParams = useSearchParams();
  useEffect(() => {
    const strategyId = searchParams.get('strategy');
    if (!strategyId) return;
    if (PRODUCTS.some(p => p.id === strategyId)) {
      setSelectedIds([strategyId]);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

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

    const summaryData: Record<string, { finalValueAfterTax: number; totalTaxPaid: number; taxBreakdown: TaxBreakdown }> = {};
    activeProducts.forEach(p => {
      const result = growthResults.get(p.id)!;
      summaryData[p.id] = {
        finalValueAfterTax: result.finalValueAfterTax,
        totalTaxPaid: result.taxBreakdown.total,
        taxBreakdown: result.taxBreakdown,
      };
    });

    return { chartData, activeProducts, summaryData };
  }, [allProducts, selectedIds, rates, effectiveMonthly, effectiveLumpSum, years]);

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
              <input
                type="number"
                min={0}
                max={2000000}
                step={1000}
                value={effectiveLumpSum === 0 ? '' : effectiveLumpSum}
                placeholder={t('lump_sum_none')}
                onChange={e => {
                  const v = Number(e.target.value);
                  setLumpSum(Math.min(2000000, Math.max(0, isNaN(v) ? 0 : v)));
                }}
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
                <input
                  type="number"
                  min={50}
                  max={5000}
                  step={50}
                  value={monthlyContribution}
                  onChange={e =>
                    setMonthlyContribution(Math.min(5000, Math.max(50, Number(e.target.value) || 50)))
                  }
                  className="w-20 rounded border border-[var(--warm-tan)] bg-[var(--warm-white)]
                    px-2 py-1 text-right text-sm font-bold text-[var(--charcoal)]
                    focus:outline-none focus:ring-1 focus:ring-[var(--forest)]"
                />
              </div>
            </div>
            <input
              type="range" min={50} max={5000} step={50} value={monthlyContribution}
              onChange={e => setMonthlyContribution(Number(e.target.value))}
              className="w-full" style={{ accentColor: 'var(--forest)' }}
            />
            <div className="mt-1 flex justify-between text-[10px] text-[var(--charcoal)]/35">
              <span>€50</span><span>€5.000</span>
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
              <input
                type="number"
                min={5}
                max={60}
                step={1}
                value={years}
                onChange={e => setYears(Math.min(60, Math.max(5, Number(e.target.value) || 5)))}
                className="w-14 rounded border border-[var(--warm-tan)] bg-[var(--warm-white)]
                  px-2 py-1 text-right text-sm font-bold text-[var(--charcoal)]
                  focus:outline-none focus:ring-1 focus:ring-[var(--forest)]"
              />
              <span className="text-sm text-[var(--charcoal)]/40">{t('years_unit')}</span>
            </div>
          </div>
          <input
            type="range" min={5} max={60} step={1} value={years}
            onChange={e => setYears(Number(e.target.value))}
            className="w-full" style={{ accentColor: 'var(--forest)' }}
          />
          <div className="mt-1 flex justify-between text-[10px] text-[var(--charcoal)]/35">
            <span>5 {t('years_unit')}</span><span>60 {t('years_unit')}</span>
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
