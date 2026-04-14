import { STRATEGIES } from '@/lib/strategies/strategies';

export type Subcategory = 'etf-strategy' | 'bank-common' | 'bank-specific' | 'active-fund' | 'custom';

export interface TaxConfig {
  tob?: number;                        // TOB on each buy (fraction)
  tobOnSale?: number;                  // TOB on sale (fraction, defaults to tob)
  tobExit?: number;                    // TOB on final exit (fraction)
  tobExitCap?: number;                 // Cap on TOB on final exit (EUR)
  entryFee?: number;                   // one-time entry fee per purchase
  annualFee?: number;                  // annual management fee / TER (fraction); already in rate, tracked for breakdown only
  dividendTax?: number;                // précompte on dividends
  dividendYield?: number;              // estimated annual dividend yield
  reyndersTax?: number;                // Reynders tax rate (30%); applied to bond portion of gains (see Product.bondAllocation)
  capitalGainsTax?: number;            // CGT rate (10% for Belgian equity ETFs)
  capitalGainsExemption?: number;      // CGT annual exemption in EUR
  interestTax?: number;                // tax on savings interest above exemption; applied to gross rate
  interestExemption?: number;          // annual interest exemption in EUR (1020 for regulated savings; 0 for term deposits)
  pensionTax?: number;                 // lump tax at end (pilier 3: 8%)
  premiumTax?: number;                 // Belgian government tax on every insurance deposit (2%)
  branche21WithholdingTax?: number;    // 30% withholding on fictive return if sold before branche21MinYears
  branche21FictiveRate?: number;       // fictive annual return used for early-exit withholding calc (4.75%)
  branche21MinYears?: number;          // years after which withholding tax is exempt (8; use 999 to always apply)
  upfrontTaxRelief?: number;           // annual government tax reduction rate on contributions (e.g. 0.30 for pension savings)
  upfrontTaxReliefCap?: number;        // annual contribution cap eligible for upfrontTaxRelief (e.g. 1050)
}

export interface Product {
  id: string;
  name: string;                        // i18n key (data.products.[id].name)
  category: 'bank' | 'etf' | 'branche21';
  subcategory: Subcategory;
  provider?: string;
  isCustom?: boolean;
  defaultRate: number | null;       // gross rate (before interestTax); base + loyalty for savings accounts
  baseRate?: number;                // daily accruing base rate (savings accounts only)
  loyaltyRate?: number;             // bonus rate after 12 consecutive months without withdrawal
  bondAllocation?: number;          // fraction of portfolio in bonds (0–1); drives Reynders vs CGT split
  rateEditable: boolean;
  color: string;
  description: string;                 // i18n key (data.products.[id].description)
  taxConfig?: TaxConfig;
  /** Hard legal cap on monthly contribution (show warning if exceeded) */
  monthlyContributionCap?: number;
  /** Informational note about contribution limits, shown as tooltip on chip (i18n key) */
  contributionCapNote?: string;
  /** Product-specific warning shown on the result card (e.g. underperformance note) (i18n key) */
  warningNote?: string;
  /** Gross benchmark return before TER (display only — not used in compute.ts) */
  grossBaseline?: number;
  /** Total Expense Ratio for display in result card formula (mirrors taxConfig.annualFee) */
  ter?: number;
  // Legacy fields — kept for custom products created via ProductSelector form
  taxRate?: number;
  entryFee?: number;
}

const ETF_PRODUCTS: Product[] = STRATEGIES.filter(s => s.id !== 'epargne-liquide').map(s => {
  const hasDistributing = s.etfs.some(e => !e.accumulating);
  // Weighted average TER in fraction form (e.g. 0.0020 = 0.20%)
  // ter in strategies is stored as percentage like 0.20, allocation as 100
  const weightedTer = s.etfs.reduce((acc, e) => acc + e.ter * e.allocation, 0) / 10000;

  let taxConfig: TaxConfig;
  if (hasDistributing) {
    // Distributing equity ETF: TOB 0.12%, 30% précompte on dividends, CGT 10% on gains above €10k
    taxConfig = { tob: 0.0012, dividendTax: 0.30, dividendYield: 0.04, annualFee: weightedTer, capitalGainsTax: 0.10, capitalGainsExemption: 10000 };
  } else {
    // Accumulating equity ETF: TOB 0.12%, CGT 10% on gains above €10k (Belgium, effective 1 Jan 2026)
    taxConfig = { tob: 0.0012, annualFee: weightedTer, capitalGainsTax: 0.10, capitalGainsExemption: 10000 };
  }

  return {
    id: s.id,
    name: s.name,
    category: 'etf',
    subcategory: 'etf-strategy',
    defaultRate: s.historicalReturn,
    rateEditable: true,
    color: s.color,
    description: s.tagline,
    taxConfig,
  };
});

const BANK_PRODUCTS: Product[] = [
  // ── Comptes épargne ────────────────────────────────────────────────────────
  {
    id: 'savings-belfius-flow',
    name: 'data.products.savings-belfius-flow.name',
    category: 'bank',
    subcategory: 'bank-common',
    provider: 'Belfius',
    defaultRate: 0.0280,
    baseRate: 0.0130,
    loyaltyRate: 0.0150,
    rateEditable: true,
    color: '#7a5ab8',
    description: 'data.products.savings-belfius-flow.description',
    taxConfig: { interestTax: 0.30, interestExemption: 1020 },
  },
  {
    id: 'savings-argenta',
    name: 'data.products.savings-argenta.name',
    category: 'bank',
    subcategory: 'bank-common',
    provider: 'Argenta',
    defaultRate: 0.0260,
    baseRate: 0.0110,
    loyaltyRate: 0.0150,
    rateEditable: true,
    color: '#5a8c4a',
    description: 'data.products.savings-argenta.description',
    taxConfig: { interestTax: 0.30, interestExemption: 1020 },
  },
  {
    id: 'savings-ing-tempo',
    name: 'data.products.savings-ing-tempo.name',
    category: 'bank',
    subcategory: 'bank-common',
    provider: 'ING',
    defaultRate: 0.0225,
    baseRate: 0.0075,
    loyaltyRate: 0.0150,
    rateEditable: true,
    color: '#c87c3a',
    description: 'data.products.savings-ing-tempo.description',
    taxConfig: { interestTax: 0.30, interestExemption: 1020 },
    monthlyContributionCap: 500,
    contributionCapNote: "p_savings_ing_tempo_cap_note",
  },
  {
    id: 'savings-kbc',
    name: 'data.products.savings-kbc.name',
    category: 'bank',
    subcategory: 'bank-common',
    provider: 'KBC',
    defaultRate: 0.0225,
    baseRate: 0.0075,
    loyaltyRate: 0.0150,
    rateEditable: true,
    color: '#1a5fa8',
    description: 'data.products.savings-kbc.description',
    taxConfig: { interestTax: 0.30, interestExemption: 1020 },
  },
  {
    id: 'savings-vdk',
    name: 'data.products.savings-vdk.name',
    category: 'bank',
    subcategory: 'bank-common',
    provider: 'vdk banque',
    defaultRate: 0.0285,
    baseRate: 0.0135,
    loyaltyRate: 0.0150,
    rateEditable: true,
    color: '#2a8a7a',
    description: 'data.products.savings-vdk.description',
    taxConfig: { interestTax: 0.30, interestExemption: 1020 },
    monthlyContributionCap: 500,
    contributionCapNote: "p_savings_vdk_cap_note",
  },
  {
    id: 'savings-crelan',
    name: 'data.products.savings-crelan.name',
    category: 'bank',
    subcategory: 'bank-common',
    provider: 'Crelan',
    defaultRate: 0.0200,
    baseRate: 0.0050,
    loyaltyRate: 0.0150,
    rateEditable: true,
    color: '#c04a28',
    description: 'data.products.savings-crelan.description',
    taxConfig: { interestTax: 0.30, interestExemption: 1020 },
  },
  {
    id: 'savings-keytrade',
    name: 'data.products.savings-keytrade.name',
    category: 'bank',
    subcategory: 'bank-common',
    provider: 'Keytrade',
    defaultRate: 0.0160,
    baseRate: 0.0030,
    loyaltyRate: 0.0130,
    rateEditable: true,
    color: '#2a6a9a',
    description: 'data.products.savings-keytrade.description',
    taxConfig: { interestTax: 0.30, interestExemption: 1020 },
  },
  {
    id: 'savings-medirect',
    name: 'data.products.savings-medirect.name',
    category: 'bank',
    subcategory: 'bank-common',
    provider: 'MeDirect',
    defaultRate: 0.0160,
    baseRate: 0.0020,
    loyaltyRate: 0.0140,
    rateEditable: true,
    color: '#4a7a5a',
    description: 'data.products.savings-medirect.description',
    taxConfig: { interestTax: 0.30, interestExemption: 1020 },
  },

  // ── Bons de caisse / Comptes à terme ──────────────────────────────────────
  {
    id: 'bon-caisse-kbc-1yr',
    name: 'data.products.bon-caisse-kbc-1yr.name',
    category: 'bank',
    subcategory: 'bank-common',
    provider: 'KBC',
    defaultRate: 0.0294,
    rateEditable: true,
    color: '#2d7dd2',
    description: 'data.products.bon-caisse-kbc-1yr.description',
    taxConfig: { interestTax: 0.30, interestExemption: 0, tob: 0, entryFee: 0 },
  },
  {
    id: 'bon-caisse-kbc-3yr',
    name: 'data.products.bon-caisse-kbc-3yr.name',
    category: 'bank',
    subcategory: 'bank-common',
    provider: 'KBC',
    defaultRate: 0.0364,
    rateEditable: true,
    color: '#1d5ca2',
    description: 'data.products.bon-caisse-kbc-3yr.description',
    taxConfig: { interestTax: 0.30, interestExemption: 0, tob: 0, entryFee: 0 },
  },
  {
    id: 'bon-caisse-kbc-5yr',
    name: 'data.products.bon-caisse-kbc-5yr.name',
    category: 'bank',
    subcategory: 'bank-common',
    provider: 'KBC',
    defaultRate: 0.0374,
    rateEditable: true,
    color: '#0d4c82',
    description: 'data.products.bon-caisse-kbc-5yr.description',
    taxConfig: { interestTax: 0.30, interestExemption: 0, tob: 0, entryFee: 0 },
  },
  {
    id: 'bon-caisse-argenta-1yr',
    name: 'data.products.bon-caisse-argenta-1yr.name',
    category: 'bank',
    subcategory: 'bank-common',
    provider: 'Argenta',
    defaultRate: 0.0210,
    rateEditable: true,
    color: '#5fa832',
    description: 'data.products.bon-caisse-argenta-1yr.description',
    taxConfig: { interestTax: 0.30, interestExemption: 0, tob: 0, entryFee: 0 },
  },
  {
    id: 'bon-caisse-argenta-5yr',
    name: 'data.products.bon-caisse-argenta-5yr.name',
    category: 'bank',
    subcategory: 'bank-common',
    provider: 'Argenta',
    defaultRate: 0.0245,
    rateEditable: true,
    color: '#3d8810',
    description: 'data.products.bon-caisse-argenta-5yr.description',
    taxConfig: { interestTax: 0.30, interestExemption: 0, tob: 0, entryFee: 0 },
  },
  {
    id: 'bon-caisse-ing-1yr',
    name: 'data.products.bon-caisse-ing-1yr.name',
    category: 'bank',
    subcategory: 'bank-common',
    provider: 'ING',
    defaultRate: 0.0220,
    rateEditable: true,
    color: '#d4700a',
    description: 'data.products.bon-caisse-ing-1yr.description',
    taxConfig: { interestTax: 0.30, interestExemption: 0, tob: 0, entryFee: 0 },
  },
  {
    id: 'bon-caisse-beobank-1yr',
    name: 'data.products.bon-caisse-beobank-1yr.name',
    category: 'bank',
    subcategory: 'bank-common',
    provider: 'Beobank',
    defaultRate: 0.0310,
    rateEditable: true,
    color: '#7a4a8a',
    description: 'data.products.bon-caisse-beobank-1yr.description',
    taxConfig: { interestTax: 0.30, interestExemption: 0, tob: 0, entryFee: 0 },
  },

  // ── Branche 21 ────────────────────────────────────────────────────────────
  {
    id: 'branche21',
    name: 'data.products.branche21.name',
    category: 'branche21',
    subcategory: 'bank-common',
    provider: 'AG Insurance',
    defaultRate: 0.031,
    rateEditable: true,
    color: '#e8a94a',
    description: 'data.products.branche21.description',
    taxConfig: {
      premiumTax: 0.02,
      entryFee: 0.03,
      tob: 0,
      tobOnSale: 0,
      branche21WithholdingTax: 0.30,
      branche21FictiveRate: 0.0475,
      branche21MinYears: 8,
    },
    contributionCapNote: "p_branche21_cap_note",
  },
  {
    id: 'branche21-ethias-9yr',
    name: 'data.products.branche21-ethias-9yr.name',
    category: 'branche21',
    subcategory: 'bank-specific',
    provider: 'Ethias',
    defaultRate: 0.029,
    rateEditable: true,
    color: '#c86820',
    description: 'data.products.branche21-ethias-9yr.description',
    taxConfig: {
      premiumTax: 0.02,
      entryFee: 0,
      tob: 0,
      tobOnSale: 0,
      branche21WithholdingTax: 0.30,
      branche21FictiveRate: 0.0475,
      branche21MinYears: 8,
    },
  },
  {
    id: 'branche21-ethias-3yr',
    name: 'data.products.branche21-ethias-3yr.name',
    category: 'branche21',
    subcategory: 'bank-specific',
    provider: 'Ethias',
    defaultRate: 0.023,
    rateEditable: true,
    color: '#b05818',
    description: 'data.products.branche21-ethias-3yr.description',
    taxConfig: {
      premiumTax: 0.02,
      entryFee: 0,
      tob: 0,
      tobOnSale: 0,
      branche21WithholdingTax: 0.30,
      branche21FictiveRate: 0.0475,
      branche21MinYears: 999,  // contract always matures before 8yr threshold
    },
  },
  {
    id: 'bnp-future-invest-bon',
    name: 'data.products.bnp-future-invest-bon.name',
    category: 'branche21',
    subcategory: 'bank-specific',
    provider: 'BNP Paribas Fortis',
    defaultRate: 0.0310,
    rateEditable: true,
    color: '#1a4a8a',
    description: 'data.products.bnp-future-invest-bon.description',
    taxConfig: {
      premiumTax: 0.02,
      entryFee: 0.02,
      tob: 0,
      tobOnSale: 0,
      branche21WithholdingTax: 0.30,
      branche21FictiveRate: 0.0475,
      branche21MinYears: 8,
    },
  },
  {
    id: 'beobank-invest-21',
    name: 'data.products.beobank-invest-21.name',
    category: 'branche21',
    subcategory: 'bank-specific',
    provider: 'Beobank',
    defaultRate: 0.0250,
    rateEditable: true,
    color: '#4a3a7a',
    description: 'data.products.beobank-invest-21.description',
    taxConfig: {
      premiumTax: 0.02,
      entryFee: 0.025,
      tob: 0,
      tobOnSale: 0,
      branche21WithholdingTax: 0.30,
      branche21FictiveRate: 0.0475,
      branche21MinYears: 8,
    },
  },

  // ── Fonds épargne-pension ─────────────────────────────────────────────────
  {
    id: 'pension-kbc-pricos',
    name: 'data.products.pension-kbc-pricos.name',
    category: 'bank',
    subcategory: 'bank-specific',
    provider: 'KBC',
    defaultRate: 0.0409,
    grossBaseline: 0.0550,
    ter: 0.0153,
    rateEditable: true,
    color: '#4a6eb8',
    description: 'data.products.pension-kbc-pricos.description',
    taxConfig: { pensionTax: 0.08, upfrontTaxRelief: 0.30, upfrontTaxReliefCap: 1050, entryFee: 0.02, annualFee: 0.0153 },
    monthlyContributionCap: 112.5,
    contributionCapNote: "p_pension_cap_note",
  },
  {
    id: 'pension-belfius-equities',
    name: 'data.products.pension-belfius-equities.name',
    category: 'bank',
    subcategory: 'bank-specific',
    provider: 'Belfius',
    defaultRate: 0.0401,
    grossBaseline: 0.0550,
    ter: 0.0149,
    rateEditable: true,
    color: '#6a4a7e',
    description: 'data.products.pension-belfius-equities.description',
    taxConfig: { pensionTax: 0.08, upfrontTaxRelief: 0.30, upfrontTaxReliefCap: 1050, entryFee: 0.03, annualFee: 0.0149 },
    monthlyContributionCap: 112.5,
    contributionCapNote: "p_pension_cap_note",
  },
  {
    id: 'pension-bnp-growth',
    name: 'data.products.pension-bnp-growth.name',
    category: 'bank',
    subcategory: 'bank-specific',
    provider: 'BNP Paribas',
    defaultRate: 0.0425,
    grossBaseline: 0.0550,
    ter: 0.0125,
    rateEditable: true,
    color: '#3a5a9e',
    description: 'data.products.pension-bnp-growth.description',
    taxConfig: { pensionTax: 0.08, upfrontTaxRelief: 0.30, upfrontTaxReliefCap: 1050, entryFee: 0.03, annualFee: 0.0125 },
    monthlyContributionCap: 112.5,
    contributionCapNote: "p_pension_cap_note",
  },
  {
    id: 'pension-ing-star',
    name: 'data.products.pension-ing-star.name',
    category: 'bank',
    subcategory: 'bank-specific',
    provider: 'ING',
    defaultRate: 0.0372,
    grossBaseline: 0.0500,
    ter: 0.0128,
    bondAllocation: 0.4,
    rateEditable: true,
    color: '#9e3a2a',
    description: 'data.products.pension-ing-star.description',
    taxConfig: { pensionTax: 0.08, upfrontTaxRelief: 0.30, upfrontTaxReliefCap: 1050, entryFee: 0.03, annualFee: 0.0128 },
    monthlyContributionCap: 112.5,
    contributionCapNote: "p_pension_cap_note",
  },
  {
    id: 'pension-argenta',
    name: 'data.products.pension-argenta.name',
    category: 'bank',
    subcategory: 'bank-specific',
    provider: 'Argenta',
    defaultRate: 0.0406,
    grossBaseline: 0.0550,
    ter: 0.0144,
    rateEditable: true,
    color: '#3a7a4a',
    description: 'data.products.pension-argenta.description',
    taxConfig: { pensionTax: 0.08, upfrontTaxRelief: 0.30, upfrontTaxReliefCap: 1050, entryFee: 0.00, annualFee: 0.0144 },
    monthlyContributionCap: 112.5,
    contributionCapNote: "p_pension_cap_note",
  },
  {
    id: 'pension-vdk',
    name: 'data.products.pension-vdk.name',
    category: 'bank',
    subcategory: 'bank-specific',
    provider: 'vdk banque',
    defaultRate: 0.0400,
    grossBaseline: 0.0550,
    ter: 0.0150,
    rateEditable: true,
    color: '#2a6a7a',
    description: 'data.products.pension-vdk.description',
    taxConfig: { pensionTax: 0.08, upfrontTaxRelief: 0.30, upfrontTaxReliefCap: 1050, entryFee: 0.02, annualFee: 0.0150 },
    monthlyContributionCap: 112.5,
    contributionCapNote: "p_pension_cap_note",
  },
  {
    id: 'pension-crelan',
    name: 'data.products.pension-crelan.name',
    category: 'bank',
    subcategory: 'bank-specific',
    provider: 'Crelan',
    defaultRate: 0.0400,
    grossBaseline: 0.0550,
    ter: 0.0150,
    rateEditable: true,
    color: '#9a4a28',
    description: 'data.products.pension-crelan.description',
    taxConfig: { pensionTax: 0.08, upfrontTaxRelief: 0.30, upfrontTaxReliefCap: 1050, entryFee: 0.03, annualFee: 0.0150 },
    monthlyContributionCap: 112.5,
    contributionCapNote: "p_pension_cap_note",
  },

  // ── Fonds actifs ──────────────────────────────────────────────────────────
  {
    id: 'fonds-bnp-equity-world',
    name: 'data.products.fonds-bnp-equity-world.name',
    category: 'bank',
    subcategory: 'active-fund',
    provider: 'BNP Paribas',
    defaultRate: 0.0650,
    grossBaseline: 0.0800,
    ter: 0.0150,
    bondAllocation: 0,
    rateEditable: true,
    color: '#2a4a7a',
    description: 'data.products.fonds-bnp-equity-world.description',
    warningNote: "p_fonds_bnp_warning",
    taxConfig: {
      capitalGainsTax: 0.10,
      capitalGainsExemption: 10000,
      entryFee: 0.03,
      annualFee: 0.0150,
      tob: 0,
      tobExit: 0.0132,
      tobExitCap: 4000,
    },
  },
  {
    id: 'fonds-belfius-equity-world',
    name: 'data.products.fonds-belfius-equity-world.name',
    category: 'bank',
    subcategory: 'active-fund',
    provider: 'Belfius',
    defaultRate: 0.0651,
    grossBaseline: 0.0800,
    ter: 0.0149,
    bondAllocation: 0,
    rateEditable: true,
    color: '#6a2a5a',
    description: 'data.products.fonds-belfius-equity-world.description',
    taxConfig: {
      capitalGainsTax: 0.10,
      capitalGainsExemption: 10000,
      entryFee: 0.03,
      annualFee: 0.0149,
      tob: 0,
      tobExit: 0.0132,
      tobExitCap: 4000,
    },
  },
  {
    id: 'fonds-axa-belgium-equity',
    name: 'data.products.fonds-axa-belgium-equity.name',
    category: 'bank',
    subcategory: 'active-fund',
    provider: 'AXA',
    defaultRate: 0.0653,
    grossBaseline: 0.0800,
    ter: 0.0147,
    bondAllocation: 0,
    rateEditable: true,
    color: '#5a3a8a',
    description: 'data.products.fonds-axa-belgium-equity.description',
    taxConfig: {
      capitalGainsTax: 0.10,
      capitalGainsExemption: 10000,
      entryFee: 0.03,
      annualFee: 0.0147,
      tob: 0,
      tobExit: 0.0132,
      tobExitCap: 4000,
    },
  },
  {
    id: 'fonds-nagelmackers-growth',
    name: 'data.products.fonds-nagelmackers-growth.name',
    category: 'bank',
    subcategory: 'active-fund',
    provider: 'Nagelmackers',
    defaultRate: 0.0465,
    grossBaseline: 0.0675,
    ter: 0.0210,
    bondAllocation: 0.25,
    rateEditable: true,
    color: '#7a6a5a',
    description: 'data.products.fonds-nagelmackers-growth.description',
    taxConfig: {
      capitalGainsTax: 0.10,
      capitalGainsExemption: 10000,
      reyndersTax: 0.30,
      entryFee: 0.025,
      annualFee: 0.0210,
      tob: 0,
      tobExit: 0.0132,
      tobExitCap: 4000,
    },
  },
  {
    id: 'fonds-ing-star-active',
    name: 'data.products.fonds-ing-star-active.name',
    category: 'bank',
    subcategory: 'active-fund',
    provider: 'ING',
    defaultRate: 0.0472,
    grossBaseline: 0.0600,
    ter: 0.0128,
    bondAllocation: 0.40,
    rateEditable: true,
    color: '#9e4a2a',
    description: 'data.products.fonds-ing-star-active.description',
    taxConfig: {
      capitalGainsTax: 0.10,
      capitalGainsExemption: 10000,
      reyndersTax: 0.30,
      entryFee: 0.03,
      annualFee: 0.0128,
      tob: 0,
      tobExit: 0.0132,
      tobExitCap: 4000,
    },
  },
  {
    id: 'fonds-beobank-equities',
    name: 'data.products.fonds-beobank-equities.name',
    category: 'bank',
    subcategory: 'active-fund',
    provider: 'Beobank',
    defaultRate: 0.0580,
    grossBaseline: 0.0800,
    ter: 0.0220,
    bondAllocation: 0,
    rateEditable: true,
    color: '#6a3a7a',
    description: 'data.products.fonds-beobank-equities.description',
    taxConfig: {
      capitalGainsTax: 0.10,
      capitalGainsExemption: 10000,
      entryFee: 0.025,
      annualFee: 0.0220,
      tob: 0,
      tobExit: 0.0132,
      tobExitCap: 4000,
    },
  },
];

export const PRODUCTS: Product[] = [...ETF_PRODUCTS, ...BANK_PRODUCTS];
