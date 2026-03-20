'use client';

import { useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useTranslations } from 'next-intl';
import type { Product } from '@/lib/calculator/products';
import CustomProductForm from './CustomProductForm';

// ── Category definitions ──────────────────────────────────────────────────────

type CategoryKey = 'etf' | 'savings' | 'bonds' | 'branche21' | 'pension' | 'active' | 'custom';

interface CategoryDef {
  key: CategoryKey;
  icon: string;
  labelKey: string;
  filter: (p: Product) => boolean;
  isCustom?: boolean;
}

const CATEGORY_DEFS: CategoryDef[] = [
  {
    key: 'etf',
    icon: '📈',
    labelKey: 'cat_etf',
    filter: p => p.subcategory === 'etf-strategy',
  },
  {
    key: 'savings',
    icon: '🏦',
    labelKey: 'cat_savings',
    filter: p => (p.taxConfig?.interestExemption ?? 0) > 0,
  },
  {
    key: 'bonds',
    icon: '📄',
    labelKey: 'cat_bonds',
    filter: p =>
      p.subcategory === 'bank-common' &&
      (p.taxConfig?.interestExemption ?? 0) === 0 &&
      !p.taxConfig?.pensionTax &&
      !p.taxConfig?.branche21WithholdingTax,
  },
  {
    key: 'branche21',
    icon: '🛡️',
    labelKey: 'cat_branche21',
    filter: p => !!p.taxConfig?.branche21WithholdingTax,
  },
  {
    key: 'pension',
    icon: '🏛️',
    labelKey: 'cat_pension',
    filter: p => !!p.taxConfig?.pensionTax,
  },
  {
    key: 'active',
    icon: '📊',
    labelKey: 'cat_active',
    filter: p => p.subcategory === 'active-fund',
  },
  {
    key: 'custom',
    icon: '⚙️',
    labelKey: 'cat_custom',
    filter: () => false,
    isCustom: true,
  },
];


export interface Props {
  allProducts: Product[];
  selectedIds: string[];
  rates: Record<string, number>;
  monthlyContribution: number;
  onSelect: (id: string) => void;
  onDeselect: (id: string) => void;
  onRateChange: (id: string, rate: number) => void;
  onAddCustom: (product: Product) => void;
}

// ── Chip tooltip ──────────────────────────────────────────────────────────────

function ChipNoteTooltip({ text }: { text: string }) {
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);
  const ref = useRef<HTMLSpanElement>(null);
  return (
    <>
      <span
        ref={ref}
        onMouseEnter={() => {
          if (!ref.current) return;
          const r = ref.current.getBoundingClientRect();
          setPos({ x: r.left + r.width / 2, y: r.top });
        }}
        onMouseLeave={() => setPos(null)}
        className="flex h-3 w-3 flex-shrink-0 cursor-default select-none items-center justify-center rounded-full border border-[var(--charcoal)]/20 text-[8px] leading-none text-[var(--charcoal)]/35"
      >
        i
      </span>
      {pos && createPortal(
        <div
          role="tooltip"
          style={{
            position: 'fixed',
            left: `${pos.x}px`,
            top: `${pos.y - 8}px`,
            transform: 'translate(-50%, -100%)',
            zIndex: 9999,
            maxWidth: 'min(260px, calc(100vw - 2rem))',
          }}
          className="pointer-events-none rounded-lg bg-[var(--charcoal)] px-3 py-2 text-[11px] leading-relaxed text-white shadow-xl"
        >
          {text}
          <span aria-hidden style={{ position: 'absolute', left: '50%', top: '100%', transform: 'translateX(-50%)', width: 0, height: 0, borderLeft: '5px solid transparent', borderRight: '5px solid transparent', borderTop: '5px solid var(--charcoal)' }} />
        </div>,
        document.body
      )}
    </>
  );
}

// ── Key stat helper ───────────────────────────────────────────────────────────

function keyStat(product: Product): string {
  if (product.subcategory === 'active-fund') {
    const ter = product.taxConfig?.annualFee;
    if (ter) return `TER ${(ter * 100).toFixed(2)}%/an`;
  }
  if (product.defaultRate != null) {
    return `${(product.defaultRate * 100).toFixed(2)}%/an`;
  }
  return 'N/D';
}

// ── Main component ────────────────────────────────────────────────────────────

export default function ProductSelector({
  allProducts, selectedIds, rates, monthlyContribution, onSelect, onDeselect, onRateChange, onAddCustom,
}: Props) {
  const t = useTranslations('calculator');
  const td = useTranslations();
  const [selectedCategory, setSelectedCategory] = useState<CategoryKey | null>(null);
  const [showCustomForm, setShowCustomForm] = useState(false);

  const atMax = selectedIds.length >= 4;

  function handleCategoryClick(cat: CategoryDef) {
    if (atMax) return;
    if (cat.isCustom) {
      setShowCustomForm(true);
      setSelectedCategory(null);
      return;
    }
    setSelectedCategory(prev => prev === cat.key ? null : cat.key);
  }

  function handleProductClick(product: Product) {
    if (selectedIds.includes(product.id)) return;
    onSelect(product.id);
    setSelectedCategory(null);
  }


  const categoryProducts = selectedCategory
    ? allProducts.filter(CATEGORY_DEFS.find(c => c.key === selectedCategory)!.filter)
    : [];

  return (
    <div className="space-y-3">

      {/* ── Selected chips ───────────────────────────────────────────────────── */}
      {selectedIds.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selectedIds.map(id => {
            const product = allProducts.find(p => p.id === id);
            if (!product) return null;
            const rate = rates[id] ?? product.defaultRate ?? 0;
            const name = product.name.startsWith('data.') ? td(product.name as any) : product.name;
            return (
              <div
                key={id}
                className="flex items-center gap-1.5 rounded-full border border-[var(--warm-tan)]/50
                  bg-[var(--warm-cream)] py-1 pl-2.5 pr-1.5 text-xs"
              >
                <span className="h-2 w-2 flex-shrink-0 rounded-full" style={{ backgroundColor: product.color }} />
                <span className="font-medium text-[var(--charcoal)]">{name}</span>
                {product.isCustom && (
                  <span className="rounded bg-[#f5d49a] px-1 py-0.5 text-[9px] font-bold uppercase text-[#5a3e00]">
                    {t('badge_custom')}
                  </span>
                )}
                {product.monthlyContributionCap !== undefined && monthlyContribution > product.monthlyContributionCap && (
                  <span className="rounded bg-[#fef3c7] px-1 py-0.5 text-[9px] font-semibold text-[#92400e]">
                    {t('contribution_cap_warning')}
                  </span>
                )}
                {product.contributionCapNote && (
                  <ChipNoteTooltip text={t(product.contributionCapNote as any)} />
                )}
                {product.rateEditable && (
                  <div className="flex items-center gap-0.5" onClick={e => e.stopPropagation()}>
                    <input
                      type="number"
                      min="0"
                      max="20"
                      step="0.1"
                      value={(rate * 100).toFixed(1)}
                      onChange={e => {
                        const v = parseFloat(e.target.value);
                        if (!isNaN(v) && v >= 0 && v <= 20) onRateChange(id, v / 100);
                      }}
                      className="w-10 border-b border-[var(--warm-tan)]/60 bg-transparent text-right
                        text-xs font-medium text-[var(--charcoal)] focus:outline-none
                        focus:border-[var(--forest)]"
                    />
                    <span className="text-[10px] text-[var(--charcoal)]/40">%</span>
                  </div>
                )}
                <button
                  type="button"
                  onClick={() => onDeselect(id)}
                  className="ml-0.5 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full
                    text-sm leading-none text-[var(--charcoal)]/35 transition-colors
                    hover:bg-[var(--charcoal)]/10 hover:text-[var(--charcoal)]"
                >
                  ×
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* ── Custom form ──────────────────────────────────────────────────────── */}
      {showCustomForm && !atMax && (
        <CustomProductForm
          onSubmit={product => {
            onAddCustom(product);
            setShowCustomForm(false);
          }}
          onCancel={() => setShowCustomForm(false)}
        />
      )}

      {/* ── Category + product selector ──────────────────────────────────────── */}
      {!showCustomForm && (
        atMax ? (
          <p className="rounded-xl border border-[var(--warm-tan)]/40 bg-[var(--warm-cream)] px-4 py-3
            text-center text-sm text-[var(--charcoal)]/50">
            {t('max_products')}
          </p>
        ) : (
          <div className="space-y-2">

            {/* Step 1 — category grid */}
            <div className="grid grid-cols-3 gap-1.5">
              {CATEGORY_DEFS.map(cat => {
                const isActive = selectedCategory === cat.key;
                return (
                  <button
                    key={cat.key}
                    type="button"
                    onClick={() => handleCategoryClick(cat)}
                    className={`flex flex-col items-center gap-1 rounded-xl border px-2 py-2.5
                      text-center transition-colors
                      ${isActive
                        ? 'border-[var(--forest)] bg-[var(--forest)] text-white'
                        : 'border-[var(--warm-tan)]/60 bg-[var(--warm-cream)] text-[var(--charcoal)] hover:border-[var(--forest)]/50 hover:bg-[var(--sage-pale)]'
                      }`}
                  >
                    <span className="text-base leading-none">{cat.icon}</span>
                    <span className={`text-[10px] font-medium leading-tight ${isActive ? 'text-white' : 'text-[var(--charcoal)]/70'}`}>
                      {t(cat.labelKey as Parameters<typeof t>[0])}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Step 2 — product list for selected category */}
            {selectedCategory && (
              <div className="rounded-xl border border-[var(--warm-tan)]/50 bg-[var(--warm-white)] overflow-hidden">

                {/* Back button */}
                <div className="border-b border-[var(--warm-tan)]/30 px-3 py-2">
                  <button
                    type="button"
                    onClick={() => setSelectedCategory(null)}
                    className="text-[11px] font-medium text-[var(--charcoal)]/45 transition-colors hover:text-[var(--forest)]"
                  >
                    ← {t('cat_back')}
                  </button>
                </div>

                {/* Product rows */}
                <div className="max-h-52 overflow-y-auto">
                  {categoryProducts.length === 0 ? (
                    <p className="px-4 py-3 text-sm text-[var(--charcoal)]/40">{t('cat_empty')}</p>
                  ) : (
                    categoryProducts.map(product => {
                      const isSelected = selectedIds.includes(product.id);
                      const name = product.name.startsWith('data.') ? td(product.name as any) : product.name;
                      const provider = product.provider?.startsWith('data.') ? td(product.provider as any) : product.provider;
                      return (
                        <button
                          key={product.id}
                          type="button"
                          disabled={isSelected}
                          onClick={() => handleProductClick(product)}
                          className={`flex w-full items-center gap-3 px-4 py-2.5 text-left transition-colors
                            ${isSelected
                              ? 'cursor-default opacity-30'
                              : 'hover:bg-[var(--warm-cream)]'
                            }`}
                        >
                          <span
                            className="h-2.5 w-2.5 flex-shrink-0 rounded-full"
                            style={{ backgroundColor: product.color }}
                          />
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-medium text-[var(--charcoal)]">
                              {name}
                            </p>
                            {provider && (
                              <p className="truncate text-[11px] text-[var(--charcoal)]/45">
                                {provider}
                              </p>
                            )}
                          </div>
                          <span className="flex-shrink-0 font-mono text-[11px] text-[var(--charcoal)]/45">
                            {keyStat(product)}
                          </span>
                        </button>
                      );
                    })
                  )}
                </div>
              </div>
            )}
          </div>
        )
      )}
    </div>
  );
}
