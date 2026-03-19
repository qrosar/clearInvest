'use client';

import { useState, type ReactNode } from 'react';
import { useTranslations } from 'next-intl';
import type { Product, TaxConfig } from '@/lib/calculator/products';

// ── Constants ─────────────────────────────────────────────────────────────────

const SWATCHES = [
  '#2d5a35', '#7a9e7e', '#e8a94a', '#b8a98a',
  '#3a6ab8', '#c84b4b', '#8a5ab8', '#4a8a8a',
];

type FormMode = 'simple' | 'advanced';
type CustomCat = 'etf' | 'savings' | 'bonds' | 'branche21' | 'pension' | 'active';

const CAT_DEFS: { key: CustomCat; icon: string; label: string }[] = [
  { key: 'etf',       icon: '📈', label: 'ETF / Stratégie indicielle' },
  { key: 'savings',   icon: '🏦', label: 'Compte épargne' },
  { key: 'bonds',     icon: '📄', label: 'Bon de caisse / Compte à terme' },
  { key: 'branche21', icon: '🛡️', label: 'Branche 21' },
  { key: 'pension',   icon: '🏛️', label: 'Épargne-pension' },
  { key: 'active',    icon: '📊', label: 'Fonds actif' },
];

// ── Form state ────────────────────────────────────────────────────────────────

interface FormState {
  name: string;
  category: CustomCat | null;
  color: string;
  // Simple
  rate: string;
  entryFee: string;
  annualFee: string;
  // Advanced — savings
  baseRate: string;
  loyaltyRate: string;
  monthlyCap: string;
  // Advanced — branche21
  guaranteedRate: string;
  profitShare: string;
  premiumTax: string;
  minYears: string;
  // Advanced — pension
  taxRelief: string;
  pensionTax: string;
  annualCap: string;
  // Advanced — performance (ETF + active)
  bondAllocation: string;
  grossBaseline: string;
  tob: string;
  // Advanced — general
  provider: string;
  warningNote: string;
}

const INITIAL_FORM: FormState = {
  name: '', category: null, color: SWATCHES[0],
  rate: '', entryFee: '0', annualFee: '0',
  baseRate: '', loyaltyRate: '', monthlyCap: '',
  guaranteedRate: '', profitShare: '0', premiumTax: '2.00', minYears: '8',
  taxRelief: '30', pensionTax: '8', annualCap: '1050',
  bondAllocation: '0', grossBaseline: '', tob: '0.12',
  provider: '', warningNote: '',
};

const ADVANCED_KEYS: (keyof FormState)[] = [
  'baseRate', 'loyaltyRate', 'monthlyCap',
  'guaranteedRate', 'profitShare', 'premiumTax', 'minYears',
  'taxRelief', 'pensionTax', 'annualCap',
  'bondAllocation', 'grossBaseline', 'tob',
  'provider', 'warningNote',
];

// ── Sub-components ────────────────────────────────────────────────────────────

function Field({ label, hint, children }: { label: string; hint?: string; children: ReactNode }) {
  return (
    <div>
      <label className="mb-1 block min-h-[40px] text-xs font-medium text-[var(--charcoal)]/55">{label}</label>
      {children}
      {hint && <p className="mt-0.5 text-[10px] leading-snug text-[var(--charcoal)]/35">{hint}</p>}
    </div>
  );
}

function NumInput({
  value, onChange, step = '0.1', suffix = '%', min = '0', max,
}: {
  value: string; onChange: (v: string) => void;
  step?: string; suffix?: string; min?: string; max?: string;
}) {
  return (
    <div className="flex items-center gap-1">
      <input
        type="number"
        value={value}
        step={step}
        min={min}
        max={max}
        onChange={e => onChange(e.target.value)}
        className="w-full rounded-lg border border-[var(--warm-tan)] bg-[var(--warm-white)]
          px-2 py-1.5 text-right text-sm focus:outline-none focus:ring-1 focus:ring-[var(--forest)]"
      />
      <span className="flex-shrink-0 text-xs text-[var(--charcoal)]/40">{suffix}</span>
    </div>
  );
}

function Section({
  id, title, open, onToggle, children,
}: {
  id: string; title: string; open: boolean;
  onToggle: (id: string) => void; children: ReactNode;
}) {
  return (
    <div className="mt-3 overflow-hidden rounded-lg border border-[var(--warm-tan)]/60">
      <button
        type="button"
        onClick={() => onToggle(id)}
        className="flex w-full items-center justify-between px-3 py-2 text-left
          text-xs font-semibold text-[var(--charcoal)]/65 transition-colors hover:bg-[var(--warm-cream)]"
      >
        {title}
        <svg
          className={`h-3.5 w-3.5 flex-shrink-0 transition-transform ${open ? 'rotate-180' : ''}`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div className="space-y-3 border-t border-[var(--warm-tan)]/40 p-3">
          {children}
        </div>
      )}
    </div>
  );
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function sectionsForCat(cat: CustomCat | null): string[] {
  const s: string[] = ['general'];
  if (cat === 'savings')   s.push('savings-rates');
  if (cat === 'branche21') s.push('branche21-rates');
  if (cat === 'bonds')     s.push('bonds-fiscal');
  if (cat === 'pension')   s.push('pension-fiscal');
  if (cat === 'etf' || cat === 'active') s.push('performance');
  return s;
}

function rateLabel(cat: CustomCat | null): string {
  if (cat === 'savings')                 return 'Taux global (base + fidélité) *';
  if (cat === 'bonds' || cat === 'branche21') return 'Taux brut garanti *';
  return 'Rendement annuel estimé *';
}

function buildProduct(form: FormState, mode: FormMode): Product {
  const cat = form.category!;
  const rate = parseFloat(form.rate) / 100 || 0;
  const entryFee = parseFloat(form.entryFee) / 100 || 0;
  const annualFee = parseFloat(form.annualFee) / 100 || 0;

  let taxConfig: TaxConfig;

  if (cat === 'etf') {
    const tob = mode === 'advanced' ? (parseFloat(form.tob) / 100 || 0.0012) : 0.0012;
    const bondAlloc = mode === 'advanced' ? (parseFloat(form.bondAllocation) / 100 || 0) : 0;
    taxConfig = {
      tob, tobOnSale: tob, entryFee: 0, premiumTax: 0, annualFee,
      capitalGainsTax: 0.10, capitalGainsExemption: 10000,
    };
    if (bondAlloc > 0) taxConfig.reyndersTax = 0.30;

  } else if (cat === 'savings') {
    taxConfig = { tob: 0, tobOnSale: 0, entryFee: 0, premiumTax: 0, interestTax: 0.30, interestExemption: 1020 };

  } else if (cat === 'bonds') {
    taxConfig = { tob: 0, tobOnSale: 0, entryFee: 0, premiumTax: 0, interestTax: 0.30, interestExemption: 0 };

  } else if (cat === 'branche21') {
    const premiumTax = mode === 'advanced' ? (parseFloat(form.premiumTax) / 100 || 0.02) : 0.02;
    const minYears = mode === 'advanced' ? (parseInt(form.minYears) || 8) : 8;
    taxConfig = {
      tob: 0, tobOnSale: 0, entryFee, premiumTax,
      branche21WithholdingTax: 0.30, branche21FictiveRate: 0.0475, branche21MinYears: minYears,
      capitalGainsTax: 0.10, capitalGainsExemption: 10000,
    };

  } else if (cat === 'pension') {
    const taxRelief = mode === 'advanced' ? (parseFloat(form.taxRelief) / 100 || 0.30) : 0.30;
    const pTax = mode === 'advanced' ? (parseFloat(form.pensionTax) / 100 || 0.08) : 0.08;
    const annualCap = mode === 'advanced' ? (parseFloat(form.annualCap) || 1050) : 1050;
    taxConfig = {
      tob: 0, tobOnSale: 0, entryFee, premiumTax: 0, annualFee,
      pensionTax: pTax, upfrontTaxRelief: taxRelief, upfrontTaxReliefCap: annualCap,
    };

  } else { // active
    const tob = mode === 'advanced' ? (parseFloat(form.tob) / 100 || 0.0012) : 0.0012;
    const bondAlloc = mode === 'advanced' ? (parseFloat(form.bondAllocation) / 100 || 0) : 0;
    taxConfig = {
      tob, tobOnSale: tob, entryFee, premiumTax: 0, annualFee,
      capitalGainsTax: 0.10, capitalGainsExemption: 10000,
    };
    if (bondAlloc > 0) taxConfig.reyndersTax = 0.30;
  }

  // bondAllocation must always be set on Product — compute.ts defaults to 1.0 (pure bond fund) if absent
  const bondAllocation = (cat === 'etf' || cat === 'active')
    ? (mode === 'advanced' ? (parseFloat(form.bondAllocation) / 100 || 0) : 0)
    : 0;

  const product: Product = {
    id: `custom-${Date.now()}`,
    name: form.name.trim(),
    category: cat === 'etf' ? 'etf' : 'bank',
    subcategory: 'custom',
    isCustom: true,
    defaultRate: rate,
    rateEditable: true,
    color: form.color,
    description: 'Produit personnalisé.',
    taxConfig,
    bondAllocation,
  };

  if (mode === 'advanced') {
    if (cat === 'savings') {
      const br = parseFloat(form.baseRate) / 100;
      const lr = parseFloat(form.loyaltyRate) / 100;
      if (br > 0) product.baseRate = br;
      if (lr > 0) product.loyaltyRate = lr;
      const cap = parseFloat(form.monthlyCap);
      if (cap > 0) product.monthlyContributionCap = cap;
    }
    if (cat === 'pension') {
      const annualCap = parseFloat(form.annualCap) || 1050;
      product.monthlyContributionCap = annualCap / 12;
    }
    if (cat === 'etf' || cat === 'active') {
      const gb = parseFloat(form.grossBaseline) / 100;
      if (gb > 0) product.grossBaseline = gb;
      if (annualFee > 0) product.ter = annualFee;
    }
    if (form.provider.trim()) product.provider = form.provider.trim();
    if (form.warningNote.trim()) product.warningNote = form.warningNote.trim();
  }

  return product;
}

// ── Main component ────────────────────────────────────────────────────────────

export default function CustomProductForm({
  onSubmit, onCancel,
}: {
  onSubmit: (product: Product) => void;
  onCancel: () => void;
}) {
  const t = useTranslations('calculator');
  const [formMode, setFormMode] = useState<FormMode>('simple');
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [openSections, setOpenSections] = useState<string[]>([]);

  const cat = form.category;
  const rateNum = parseFloat(form.rate);
  const isValid = form.name.trim().length > 0 && cat !== null && !isNaN(rateNum) && rateNum > 0;
  const rateError = cat !== null && form.rate !== '' && !isNaN(rateNum) && rateNum <= 0;

  const showEntryFee = cat !== 'etf';
  const showAnnualFee = !['savings', 'bonds', 'branche21'].includes(cat ?? '');

  function switchMode(newMode: FormMode) {
    if (newMode === 'simple') {
      const cleared = Object.fromEntries(ADVANCED_KEYS.map(k => [k, INITIAL_FORM[k]])) as Partial<FormState>;
      setForm(f => ({ ...f, ...cleared }));
      setOpenSections([]);
    } else {
      setOpenSections(sectionsForCat(cat));
    }
    setFormMode(newMode);
  }

  function handleCatChange(c: CustomCat) {
    setForm(f => ({ ...f, category: c }));
    if (formMode === 'advanced') setOpenSections(sectionsForCat(c));
  }

  function toggleSection(id: string) {
    setOpenSections(s => s.includes(id) ? s.filter(x => x !== id) : [...s, id]);
  }

  // Auto-fill rate from sub-rates (advanced mode)
  function handleBaseRate(v: string) {
    const br = parseFloat(v) || 0;
    const lr = parseFloat(form.loyaltyRate) || 0;
    setForm(f => ({ ...f, baseRate: v, rate: String(+(br + lr).toFixed(2)) }));
  }
  function handleLoyaltyRate(v: string) {
    const lr = parseFloat(v) || 0;
    const br = parseFloat(form.baseRate) || 0;
    setForm(f => ({ ...f, loyaltyRate: v, rate: String(+(br + lr).toFixed(2)) }));
  }
  function handleGuaranteedRate(v: string) {
    const gr = parseFloat(v) || 0;
    const ps = parseFloat(form.profitShare) || 0;
    setForm(f => ({ ...f, guaranteedRate: v, rate: String(+(gr + ps).toFixed(2)) }));
  }
  function handleProfitShare(v: string) {
    const ps = parseFloat(v) || 0;
    const gr = parseFloat(form.guaranteedRate) || 0;
    setForm(f => ({ ...f, profitShare: v, rate: String(+(gr + ps).toFixed(2)) }));
  }

  function handleSubmit() {
    if (!isValid) return;
    onSubmit(buildProduct(form, formMode));
  }

  return (
    <div className="rounded-xl border border-[var(--warm-tan)]/50 bg-[var(--warm-cream)] p-5">

      {/* Header: title + mode toggle */}
      <div className="mb-1 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <p className="text-sm font-semibold text-[var(--charcoal)]">Créer un produit personnalisé</p>
          <span className="rounded-full bg-amber-100 px-1.5 py-0.5 text-[10px] font-semibold uppercase leading-none text-amber-700">
            Beta
          </span>
        </div>
        <div className="flex gap-0.5 rounded-full border border-[var(--warm-tan)] bg-[var(--warm-white)] p-0.5">
          {(['simple', 'advanced'] as FormMode[]).map(m => (
            <button
              key={m}
              type="button"
              onClick={() => switchMode(m)}
              className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                formMode === m
                  ? 'bg-[var(--forest)] text-white'
                  : 'text-[var(--charcoal)]/55 hover:text-[var(--charcoal)]'
              }`}
            >
              {m === 'simple' ? 'Simple' : 'Avancé'}
            </button>
          ))}
        </div>
      </div>
      <p className="mb-4 text-[10px] leading-snug text-[var(--charcoal)]/40">
        Les calculs des produits personnalisés sont expérimentaux et peuvent ne pas refléter fidèlement tous les cas fiscaux. À utiliser à titre indicatif.
      </p>

      {/* Nom */}
      <div className="mb-4">
        <Field label="Nom du produit *">
          <input
            type="text"
            value={form.name}
            onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
            placeholder="Ex : ETF S&P 500"
            className="w-full rounded-lg border border-[var(--warm-tan)] bg-[var(--warm-white)]
              px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[var(--forest)]"
          />
        </Field>
      </div>

      {/* Catégorie */}
      <div className="mb-4">
        <p className="mb-2 text-xs font-medium text-[var(--charcoal)]/55">Catégorie *</p>
        <div className="grid grid-cols-3 gap-1.5">
          {CAT_DEFS.map(({ key, icon, label }) => (
            <button
              key={key}
              type="button"
              onClick={() => handleCatChange(key)}
              className={`flex items-center gap-1.5 rounded-lg border px-2.5 py-2 text-left
                text-xs transition-colors ${
                  cat === key
                    ? 'border-[var(--forest)] bg-[var(--forest)] text-white'
                    : 'border-[var(--warm-tan)]/60 bg-[var(--warm-white)] text-[var(--charcoal)]/70 hover:border-[var(--forest)]/40'
                }`}
            >
              <span className="flex-shrink-0">{icon}</span>
              <span className="leading-tight">{label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Core rate + fee fields */}
      <div className="mb-4 space-y-3">
        {/* Rate + TER on the same row when TER is visible */}
        <div className={showAnnualFee ? 'grid grid-cols-2 gap-3 items-start' : undefined}>
          <Field label={rateLabel(cat)}>
            <NumInput
              value={form.rate}
              onChange={v => setForm(f => ({ ...f, rate: v }))}
              max="30"
            />
            {rateError && (
              <p className="mt-0.5 text-[10px] text-red-500">Le rendement doit être supérieur à 0%</p>
            )}
          </Field>
          {showAnnualFee && (
            <Field label="Frais annuels / TER (%)">
              <NumInput value={form.annualFee} onChange={v => setForm(f => ({ ...f, annualFee: v }))} step="0.01" max="5" />
            </Field>
          )}
        </div>
        {/* Entry fee on its own row */}
        {showEntryFee && (
          <Field label="Frais d'entrée (%)">
            <NumInput value={form.entryFee} onChange={v => setForm(f => ({ ...f, entryFee: v }))} max="10" />
          </Field>
        )}
      </div>

      {/* ── Advanced sections ─────────────────────────────────────────────── */}
      {formMode === 'advanced' && (
        <>
          {/* Savings rates */}
          {cat === 'savings' && (
            <Section
              id="savings-rates" title="Taux"
              open={openSections.includes('savings-rates')} onToggle={toggleSection}
            >
              <div className="grid grid-cols-2 gap-3">
                <Field label="Taux de base (%)">
                  <NumInput value={form.baseRate} onChange={handleBaseRate} step="0.01" />
                </Field>
                <Field label="Prime de fidélité (%)">
                  <NumInput value={form.loyaltyRate} onChange={handleLoyaltyRate} step="0.01" />
                </Field>
              </div>
              <Field label="Plafond mensuel (€)" hint="Laisser vide si aucun plafond">
                <NumInput value={form.monthlyCap} onChange={v => setForm(f => ({ ...f, monthlyCap: v }))} suffix="€" />
              </Field>
            </Section>
          )}

          {/* Branche 21 rates */}
          {cat === 'branche21' && (
            <Section
              id="branche21-rates" title="Rendement"
              open={openSections.includes('branche21-rates')} onToggle={toggleSection}
            >
              <div className="grid grid-cols-2 gap-3">
                <Field label="Taux garanti (%)">
                  <NumInput value={form.guaranteedRate} onChange={handleGuaranteedRate} step="0.01" />
                </Field>
                <Field label="Participation bénéficiaire (%)" hint="Non garantie — simulation uniquement">
                  <NumInput value={form.profitShare} onChange={handleProfitShare} step="0.01" />
                </Field>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Taxe sur prime (%)">
                  <NumInput value={form.premiumTax} onChange={v => setForm(f => ({ ...f, premiumTax: v }))} step="0.01" />
                </Field>
                <Field label="Durée min. exonération (ans)" hint="Rachat avant → précompte 30% appliqué">
                  <NumInput value={form.minYears} onChange={v => setForm(f => ({ ...f, minYears: v }))} suffix="ans" step="1" />
                </Field>
              </div>
            </Section>
          )}

          {/* Bonds fiscal */}
          {cat === 'bonds' && (
            <Section
              id="bonds-fiscal" title="Fiscalité"
              open={openSections.includes('bonds-fiscal')} onToggle={toggleSection}
            >
              <label className="flex cursor-default select-none items-center gap-2">
                <input type="checkbox" checked readOnly className="rounded accent-[var(--forest)]" />
                <span className="text-xs text-[var(--charcoal)]/70">
                  Taux saisi en brut (précompte 30% sera déduit)
                </span>
              </label>
            </Section>
          )}

          {/* Pension */}
          {cat === 'pension' && (
            <Section
              id="pension-fiscal" title="Épargne-pension"
              open={openSections.includes('pension-fiscal')} onToggle={toggleSection}
            >
              <div className="grid grid-cols-3 gap-3">
                <Field label="Réduction d'impôt (%)">
                  <NumInput value={form.taxRelief} onChange={v => setForm(f => ({ ...f, taxRelief: v }))} max="50" />
                </Field>
                <Field label="Taxe anticipative (%)">
                  <NumInput value={form.pensionTax} onChange={v => setForm(f => ({ ...f, pensionTax: v }))} max="30" />
                </Field>
                <Field label="Plafond annuel (€)">
                  <NumInput value={form.annualCap} onChange={v => setForm(f => ({ ...f, annualCap: v }))} suffix="€" />
                </Field>
              </div>
            </Section>
          )}

          {/* Performance (ETF + active) */}
          {(cat === 'etf' || cat === 'active') && (
            <Section
              id="performance" title="Performance"
              open={openSections.includes('performance')} onToggle={toggleSection}
            >
              <div className="grid grid-cols-2 gap-3">
                <Field label="Allocation obligataire (%)" hint="Pour le calcul de la taxe Reynders">
                  <NumInput value={form.bondAllocation} onChange={v => setForm(f => ({ ...f, bondAllocation: v }))} max="100" />
                </Field>
                <Field label="Rendement brut de réf. (%)" hint="Optionnel — affiché à titre informatif">
                  <NumInput value={form.grossBaseline} onChange={v => setForm(f => ({ ...f, grossBaseline: v }))} max="30" />
                </Field>
              </div>
              <Field label="TOB (%)" hint="0,12% pour la plupart des ETF et fonds ; 1,32% pour fonds domiciliés en Belgique">
                <NumInput value={form.tob} onChange={v => setForm(f => ({ ...f, tob: v }))} step="0.01" max="5" />
              </Field>
            </Section>
          )}

          {/* Général (always shown in advanced) */}
          <Section
            id="general" title="Général"
            open={openSections.includes('general')} onToggle={toggleSection}
          >
            <Field label="Fournisseur / Banque" hint="Affiché sur la carte résultat">
              <input
                type="text"
                value={form.provider}
                onChange={e => setForm(f => ({ ...f, provider: e.target.value }))}
                placeholder="Ex : Belfius"
                className="w-full rounded-lg border border-[var(--warm-tan)] bg-[var(--warm-white)]
                  px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-[var(--forest)]"
              />
            </Field>
            <Field label="Note / Avertissement" hint="Affiché en bas de la carte résultat (200 car. max)">
              <textarea
                value={form.warningNote}
                onChange={e => setForm(f => ({ ...f, warningNote: e.target.value.slice(0, 200) }))}
                rows={2}
                className="w-full resize-none rounded-lg border border-[var(--warm-tan)] bg-[var(--warm-white)]
                  px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-[var(--forest)]"
              />
              <p className="mt-0.5 text-right text-[10px] text-[var(--charcoal)]/30">
                {form.warningNote.length}/200
              </p>
            </Field>
          </Section>
        </>
      )}

      {/* Couleur */}
      <div className="mb-4 mt-4">
        <p className="mb-2 text-xs font-medium text-[var(--charcoal)]/55">Couleur</p>
        <div className="flex gap-1.5">
          {SWATCHES.map(color => (
            <button
              key={color}
              type="button"
              onClick={() => setForm(f => ({ ...f, color }))}
              className={`h-6 w-6 rounded-full transition-transform hover:scale-110 ${
                form.color === color ? 'ring-2 ring-[var(--charcoal)] ring-offset-1' : ''
              }`}
              style={{ backgroundColor: color }}
              aria-label={color}
            />
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-lg px-4 py-2 text-sm text-[var(--charcoal)]/55
            transition-colors hover:text-[var(--charcoal)]"
        >
          {t('custom_cancel')}
        </button>
        <button
          type="button"
          disabled={!isValid}
          onClick={handleSubmit}
          className="rounded-lg bg-[var(--forest)] px-5 py-2 text-sm font-semibold
            text-[var(--warm-white)] transition-opacity hover:opacity-90 disabled:opacity-35"
        >
          Ajouter le produit
        </button>
      </div>
    </div>
  );
}
