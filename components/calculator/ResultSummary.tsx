'use client';

import { useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useTranslations } from 'next-intl';
import type { Product } from '@/lib/calculator/products';
import { formatEuro, type TaxBreakdown } from '@/lib/calculator/compute';

interface SummaryEntry {
  finalValueAfterTax: number;
  totalTaxPaid: number;
  taxBreakdown: TaxBreakdown;
}

interface Props {
  products: Product[];
  summaryData: Record<string, SummaryEntry>;
  rates: Record<string, number>;
  lumpSum: number;
  monthlyContribution: number;
  years: number;
  isPensionLocked?: boolean;
  pensionAnnual?: 1050 | 1350;
}

function formatPct(rate: number): string {
  return parseFloat((rate * 100).toFixed(3)) + '%';
}

// ── CGT info tooltip (portal-based, same pattern as TerInfoIcon) ─────────────
function CgtTooltip({ text }: { text: string }) {
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);
  const ref = useRef<HTMLSpanElement>(null);

  function show() {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    setPos({ x: r.left + r.width / 2, y: r.top });
  }

  return (
    <>
      <span
        ref={ref}
        onMouseEnter={show}
        onMouseLeave={() => setPos(null)}
        className="flex h-3.5 w-3.5 cursor-default select-none items-center justify-center rounded-full border border-[var(--charcoal)]/25 text-[9px] leading-none text-[var(--charcoal)]/40"
      >
        i
      </span>
      {pos && createPortal(
        <div
          role="tooltip"
          style={{
            position: 'fixed',
            left: `${pos.x}px`,
            top: `${pos.y - 10}px`,
            transform: 'translate(-50%, -100%)',
            zIndex: 9999,
            maxWidth: 'min(300px, calc(100vw - 2rem))',
          }}
          className="pointer-events-none rounded-lg bg-[var(--charcoal)] px-3 py-2 text-[11px] leading-relaxed text-white shadow-xl"
        >
          {text}
          <span
            aria-hidden
            style={{
              position: 'absolute', left: '50%', top: '100%',
              transform: 'translateX(-50%)',
              width: 0, height: 0,
              borderLeft: '5px solid transparent', borderRight: '5px solid transparent',
              borderTop: '5px solid var(--charcoal)',
            }}
          />
        </div>,
        document.body
      )}
    </>
  );
}

// ── Tax breakdown row ────────────────────────────────────────────────────────
function BreakdownRow({ label, amount }: { label: string; amount: number }) {
  return (
    <div className="flex items-baseline justify-between gap-3">
      <span className="whitespace-nowrap text-[var(--charcoal)]/45">{label}</span>
      <span className="text-right text-[var(--charcoal)]/65">{formatEuro(amount)}</span>
    </div>
  );
}

// ── Single result card ───────────────────────────────────────────────────────
function ResultCard({
  product, sd, rate, totalContributed, years, t,
}: {
  product: Product;
  sd: SummaryEntry;
  rate: number;
  totalContributed: number;
  years: number;
  t: ReturnType<typeof useTranslations<'calculator'>>;
}) {
  const [showBreakdown, setShowBreakdown] = useState(false);
  const isEtf = product.category === 'etf';
  const isBankProduct = !isEtf;
  const isActiveFund = product.subcategory === 'active-fund';
  const isPensionOnCard = !!(product.taxConfig?.pensionTax);
  const gain = sd.finalValueAfterTax - totalContributed;
  const gainPositive = gain >= 0;
  const bd = sd.taxBreakdown;
  const hasCgt = bd.capitalGainsTax > 0;
  const hasPrecompte = bd.precompte > 0;
  const isInterestProduct = !!(product.taxConfig?.interestTax);
  const hasTer = bd.annualFeesCumulative > 0 && product.category === 'etf';
  const hasBenefit = (bd.taxBenefit ?? 0) > 0;
  const isBranche21 = !!(product.taxConfig?.branche21WithholdingTax);
  const isBranche21Exempt = isBranche21 && years >= (product.taxConfig?.branche21MinYears ?? 8);

  return (
    <div className="flex min-w-0 flex-col rounded-xl border border-[var(--warm-tan)]/40 bg-[var(--warm-white)] p-5">

      {/* ── Card header ─────────────────────────────────────── */}
      <div className="mb-4">
        <div className="flex min-w-0 items-center gap-2">
          <span className="h-2.5 w-2.5 flex-shrink-0 rounded-full" style={{ backgroundColor: product.color }} />
          <p className="min-w-0 truncate text-sm font-bold leading-tight text-[var(--charcoal)]" title={product.name}>
            {product.name}
          </p>
          {product.isCustom && (
            <span className="flex-shrink-0 text-xs leading-none" title="Produit personnalisé">✏️</span>
          )}
        </div>
        <div className="mt-1.5 flex min-w-0 items-center justify-between gap-2 pl-[18px]">
          {product.provider
            ? <p className="min-w-0 truncate text-[10px] leading-tight text-[var(--charcoal)]/45" title={product.provider}>{product.provider}</p>
            : <span />
          }
          <span className={`flex-shrink-0 rounded px-1.5 py-0.5 text-[10px] font-semibold uppercase ${
            isEtf ? 'bg-[var(--forest)]/10 text-[var(--forest)]' : 'bg-[var(--warm-tan)]/50 text-[var(--charcoal)]/55'
          }`}>
            {isEtf ? t('badge_etf') : t('badge_bank')}
          </span>
        </div>
      </div>

      {/* ── Parameter rows ───────────────────────────────────── */}
      <div className="space-y-2 text-xs">
        <div className="flex items-baseline justify-between gap-3">
          <span className="whitespace-nowrap text-[var(--charcoal)]/45">{t('param_gross_rate')}</span>
          <span className="text-right text-[var(--charcoal)]/70">{formatPct(rate)}</span>
        </div>
        {isBankProduct && (
          <p className="text-[10px] italic leading-relaxed text-[var(--charcoal)]/35">
            {t('bank_rate_note')}
          </p>
        )}
        {(isActiveFund || isPensionOnCard) && product.grossBaseline !== undefined && product.ter !== undefined && (
          <p className="text-[10px] leading-relaxed text-[var(--charcoal)]/35">
            {t('rate_formula', { grossBaseline: formatPct(product.grossBaseline), ter: formatPct(product.ter) })}
          </p>
        )}
        {isActiveFund && (
          <div className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-[10px] leading-relaxed text-amber-800">
            {t('active_fund_warning', { rate: formatPct(rate) })}
            {product.warningNote && (
              <p className="mt-1 font-medium">{product.warningNote}</p>
            )}
          </div>
        )}

        <div className="my-1 border-t border-[var(--warm-tan)]/30" />

        <div className="flex items-baseline justify-between gap-3">
          <span className="whitespace-nowrap text-[var(--charcoal)]/45">{t('total_contributed')}</span>
          <span className="text-right font-medium text-[var(--charcoal)]">{formatEuro(totalContributed)}</span>
        </div>
        <div className="flex items-center justify-between gap-3">
          <span className="flex items-center gap-1 whitespace-nowrap text-[var(--charcoal)]/45">
            {t('total_tax')}
            {hasCgt && <CgtTooltip text={t('cgt_tooltip')} />}
          </span>
          <span className="text-right font-medium text-[var(--charcoal)]/65">{formatEuro(sd.totalTaxPaid)}</span>
        </div>
        <div className="flex items-baseline justify-between gap-3">
          <span className="whitespace-nowrap text-[var(--charcoal)]/45">{t('total_gain')}</span>
          <span className="text-right font-semibold" style={{ color: gainPositive ? 'var(--forest)' : '#dc2626' }}>
            {gainPositive ? '+' : ''}{formatEuro(gain)}
          </span>
        </div>
      </div>

      {/* ── Final value — pushed to bottom ───────────────────── */}
      <div className="mt-auto border-t border-[var(--warm-tan)]/30 pt-4">
        <p className="text-[10px] uppercase tracking-wide text-[var(--charcoal)]/35">{t('final_value')}</p>
        <p className="mt-1 font-heading text-2xl font-bold leading-none text-[var(--charcoal)]">
          {formatEuro(sd.finalValueAfterTax)}
        </p>
      </div>

      {/* ── Expandable breakdown ─────────────────────────────── */}
      <div className="mt-3 border-t border-[var(--warm-tan)]/30 pt-2">
        <button
          type="button"
          onClick={() => setShowBreakdown(v => !v)}
          className="flex w-full items-center justify-between text-left"
        >
          <span className="text-[11px] font-medium text-[var(--charcoal)]/45">
            {t('tax_detail_label')}
          </span>
          <span
            className="text-[10px] text-[var(--charcoal)]/30 transition-transform duration-200"
            style={{ transform: showBreakdown ? 'rotate(180deg)' : 'rotate(0deg)' }}
            aria-hidden
          >
            ▾
          </span>
        </button>

        <div
          className="overflow-hidden transition-all duration-300 ease-in-out"
          style={{ maxHeight: showBreakdown ? '400px' : '0px' }}
        >
          <div className="mt-2 space-y-1.5 text-xs">
            {bd.tobBuy > 0 && <BreakdownRow label={t('tax_detail_tob_buy')} amount={bd.tobBuy} />}
            {bd.tobSell > 0 && <BreakdownRow label={t('tax_detail_tob_sell')} amount={bd.tobSell} />}
            {/* Précompte: branche 21 shows context-sensitive label; others show normal label */}
            {isBranche21Exempt ? (
              <div className="flex items-baseline justify-between gap-3">
                <span className="whitespace-nowrap text-[var(--charcoal)]/45">{t('tax_detail_precompte_interest')}</span>
                <span className="text-right text-[var(--forest)]/70">{t('tax_detail_branche21_exempt')}</span>
              </div>
            ) : hasPrecompte && (
              <BreakdownRow
                label={isBranche21 ? t('tax_detail_precompte_branche21_early') : isInterestProduct ? t('tax_detail_precompte_interest') : t('tax_detail_precompte_div')}
                amount={bd.precompte}
              />
            )}
            {bd.reynders > 0 && <BreakdownRow label={t('tax_detail_reynders')} amount={bd.reynders} />}
            {bd.capitalGainsTax > 0 && <BreakdownRow label={t('tax_detail_cgt')} amount={bd.capitalGainsTax} />}
            {bd.premiumTax > 0 && <BreakdownRow label={t('tax_detail_premium_tax')} amount={bd.premiumTax} />}
            {bd.entryFees > 0 && <BreakdownRow
              label={isBranche21 ? t('tax_detail_entry_fee_assureur') : (isPensionOnCard || isActiveFund) ? t('tax_detail_entry_fee_fund') : t('tax_detail_entry_fee')}
              amount={bd.entryFees}
            />}
            {bd.pensionTax > 0 && <BreakdownRow label={t('tax_detail_pension')} amount={bd.pensionTax} />}

            {/* Pension savings tax benefit — shown as negative (green) */}
            {hasBenefit && (
              <div className="flex items-baseline justify-between gap-3">
                <span className="whitespace-nowrap text-[var(--forest)]/70">{t('tax_detail_pension_benefit')}</span>
                <span className="text-right font-medium text-[var(--forest)]">−{formatEuro(bd.taxBenefit)}</span>
              </div>
            )}

            {/* TER — shown separately, already in rate */}
            {hasTer && (
              <div className="flex items-baseline justify-between gap-3 pt-1">
                <span className="whitespace-nowrap text-[var(--charcoal)]/30">{t('tax_detail_ter')}</span>
                <span className="text-right text-[var(--charcoal)]/30">{formatEuro(bd.annualFeesCumulative)}</span>
              </div>
            )}

            {/* Total */}
            <div className="flex items-baseline justify-between gap-3 border-t border-[var(--warm-tan)]/30 pt-1.5">
              <span className="whitespace-nowrap font-semibold text-[var(--charcoal)]/70">{t('tax_detail_total')}</span>
              <span className="text-right font-semibold text-[var(--charcoal)]">{formatEuro(bd.total)}</span>
            </div>

            {hasTer && (
              <p className="text-[10px] leading-relaxed text-[var(--charcoal)]/30">
                {t('tax_detail_ter_note')}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Main export ──────────────────────────────────────────────────────────────
export default function ResultSummary({ products, summaryData, rates, lumpSum, monthlyContribution, years, isPensionLocked, pensionAnnual }: Props) {
  const t = useTranslations('calculator');
  const totalContributed = lumpSum + monthlyContribution * 12 * years;

  if (!products.length) return null;

  const single = products.length === 1;

  return (
    <div className="mt-5 space-y-4">
      <div
        className={single ? 'mx-auto w-full max-w-[420px]' : 'grid grid-cols-2 gap-4'}
      >
        {products.map(product => {
          const sd = summaryData[product.id] ?? { finalValueAfterTax: 0, totalTaxPaid: 0, taxBreakdown: { tobBuy: 0, tobSell: 0, precompte: 0, reynders: 0, capitalGainsTax: 0, entryFees: 0, premiumTax: 0, annualFeesCumulative: 0, pensionTax: 0, taxBenefit: 0, total: 0 } };
          return (
            <ResultCard
              key={product.id}
              product={product}
              sd={sd}
              rate={rates[product.id] ?? product.defaultRate}
              totalContributed={totalContributed}
              years={years}
              t={t}
            />
          );
        })}
      </div>

      {/* ── Bank data horizon note ───────────────────────────── */}
      {products.some(p => p.category === 'bank') && (
        <p className="text-[11px] leading-relaxed text-[var(--charcoal)]/40">
          {t('bank_data_note')}
        </p>
      )}

      {/* ── Branche 21 note ──────────────────────────────────── */}
      {products.some(p => p.taxConfig?.branche21WithholdingTax) && (
        <p className="text-[11px] leading-relaxed text-[var(--charcoal)]/40">
          {t('branche21_note')}
        </p>
      )}

      {/* ── Pension comparison note ───────────────────────────── */}
      {isPensionLocked && pensionAnnual && (
        <p className="text-[11px] leading-relaxed text-[#92400e]/70">
          {t('pension_comparison_note', {
            monthly: new Intl.NumberFormat('fr-BE', { style: 'currency', currency: 'EUR', minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(pensionAnnual / 12),
            annual: new Intl.NumberFormat('fr-BE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(pensionAnnual),
            rate: pensionAnnual === 1050 ? 30 : 25,
          })}
        </p>
      )}

    </div>
  );
}
