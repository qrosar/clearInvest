import { STRATEGIES } from '@/lib/strategies/strategies';

export type Subcategory = 'etf-strategy' | 'bank-common' | 'bank-specific' | 'active-fund' | 'custom';

export interface TaxConfig {
  tob?: number;                        // TOB on each buy (fraction)
  tobOnSale?: number;                  // TOB on sale (defaults to tob)
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
  name: string;
  category: 'bank' | 'etf';
  subcategory: Subcategory;
  provider?: string;
  isCustom?: boolean;
  defaultRate: number | null;       // gross rate (before interestTax); base + loyalty for savings accounts
  baseRate?: number;                // daily accruing base rate (savings accounts only)
  loyaltyRate?: number;             // bonus rate after 12 consecutive months without withdrawal
  bondAllocation?: number;          // fraction of portfolio in bonds (0–1); drives Reynders vs CGT split
  rateEditable: boolean;
  color: string;
  description: string;
  taxConfig?: TaxConfig;
  /** Hard legal cap on monthly contribution (show warning if exceeded) */
  monthlyContributionCap?: number;
  /** Informational note about contribution limits, shown as tooltip on chip */
  contributionCapNote?: string;
  /** Product-specific warning shown on the result card (e.g. underperformance note) */
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
    name: 'Compte Épargne Belfius (Flow)',
    category: 'bank',
    subcategory: 'bank-common',
    provider: 'Belfius',
    defaultRate: 0.0280,
    baseRate: 0.0130,
    loyaltyRate: 0.0150,
    rateEditable: true,
    color: '#7a5ab8',
    description:
      "Taux de base 1,30% + prime de fidélité 1,50%. Prime acquise après 12 mois consécutifs sans retrait. Premiers €1.020 d'intérêts/an exonérés du précompte de 30%.",
    taxConfig: { interestTax: 0.30, interestExemption: 1020 },
  },
  {
    id: 'savings-argenta',
    name: 'Compte Épargne Argenta (Groeirekening)',
    category: 'bank',
    subcategory: 'bank-common',
    provider: 'Argenta',
    defaultRate: 0.0260,
    baseRate: 0.0110,
    loyaltyRate: 0.0150,
    rateEditable: true,
    color: '#5a8c4a',
    description:
      "Taux de base 1,10% + prime de fidélité 1,50%. Premiers €1.020 d'intérêts/an exonérés du précompte de 30%.",
    taxConfig: { interestTax: 0.30, interestExemption: 1020 },
  },
  {
    id: 'savings-ing-tempo',
    name: 'Compte Épargne ING (Tempo Sparen)',
    category: 'bank',
    subcategory: 'bank-common',
    provider: 'ING',
    defaultRate: 0.0225,
    baseRate: 0.0075,
    loyaltyRate: 0.0150,
    rateEditable: true,
    color: '#c87c3a',
    description:
      "Taux de base 0,75% + prime de fidélité 1,50%. Versements limités à €500/mois. Premiers €1.020 d'intérêts/an exonérés du précompte de 30%.",
    taxConfig: { interestTax: 0.30, interestExemption: 1020 },
    monthlyContributionCap: 500,
    contributionCapNote: "Le versement mensuel sur ce compte est plafonné à €500/mois.",
  },
  {
    id: 'savings-kbc',
    name: 'Compte Épargne KBC (Start2Save)',
    category: 'bank',
    subcategory: 'bank-common',
    provider: 'KBC',
    defaultRate: 0.0225,
    baseRate: 0.0075,
    loyaltyRate: 0.0150,
    rateEditable: true,
    color: '#1a5fa8',
    description:
      "Taux de base 0,75% + prime de fidélité 1,50%. Premiers €1.020 d'intérêts/an exonérés du précompte de 30%.",
    taxConfig: { interestTax: 0.30, interestExemption: 1020 },
  },
  {
    id: 'savings-vdk',
    name: 'Compte Épargne vdk banque (Compte Rythme)',
    category: 'bank',
    subcategory: 'bank-common',
    provider: 'vdk banque',
    defaultRate: 0.0285,
    baseRate: 0.0135,
    loyaltyRate: 0.0150,
    rateEditable: true,
    color: '#2a8a7a',
    description:
      "Taux de base 1,35% + prime de fidélité 1,50%. Parmi les meilleurs taux du marché. Versements limités à €500/mois. Premiers €1.020 d'intérêts/an exonérés du précompte de 30%.",
    taxConfig: { interestTax: 0.30, interestExemption: 1020 },
    monthlyContributionCap: 500,
    contributionCapNote: "Versements limités à €500/mois. Capital déposé au-delà non pris en compte.",
  },
  {
    id: 'savings-crelan',
    name: 'Compte Épargne Crelan (GoSave)',
    category: 'bank',
    subcategory: 'bank-common',
    provider: 'Crelan',
    defaultRate: 0.0200,
    baseRate: 0.0050,
    loyaltyRate: 0.0150,
    rateEditable: true,
    color: '#c04a28',
    description:
      "Taux de base 0,50% + prime de fidélité 1,50%. Premiers €1.020 d'intérêts/an exonérés du précompte de 30%.",
    taxConfig: { interestTax: 0.30, interestExemption: 1020 },
  },
  {
    id: 'savings-keytrade',
    name: 'Compte Épargne Keytrade (High Fidelity)',
    category: 'bank',
    subcategory: 'bank-common',
    provider: 'Keytrade',
    defaultRate: 0.0160,
    baseRate: 0.0030,
    loyaltyRate: 0.0130,
    rateEditable: true,
    color: '#2a6a9a',
    description:
      "Taux de base 0,30% + prime de fidélité 1,30%. Banque en ligne. Premiers €1.020 d'intérêts/an exonérés du précompte de 30%.",
    taxConfig: { interestTax: 0.30, interestExemption: 1020 },
  },
  {
    id: 'savings-medirect',
    name: 'Compte Épargne MeDirect (Fidelity Épargne)',
    category: 'bank',
    subcategory: 'bank-common',
    provider: 'MeDirect',
    defaultRate: 0.0160,
    baseRate: 0.0020,
    loyaltyRate: 0.0140,
    rateEditable: true,
    color: '#4a7a5a',
    description:
      "Taux de base 0,20% + prime de fidélité 1,40%. Banque en ligne. Premiers €1.020 d'intérêts/an exonérés du précompte de 30%.",
    taxConfig: { interestTax: 0.30, interestExemption: 1020 },
  },

  // ── Bons de caisse / Comptes à terme ──────────────────────────────────────
  // defaultRate is the GROSS rate. compute.ts applies interestTax: 0.30 annually.
  // No €1,020 exemption on term deposits.
  {
    id: 'bon-caisse-kbc-1yr',
    name: 'Bon de Caisse KBC (1 an)',
    category: 'bank',
    subcategory: 'bank-common',
    provider: 'KBC',
    defaultRate: 0.0294,
    rateEditable: true,
    color: '#2d7dd2',
    description:
      "Taux brut 2,94% — précompte de 30% déduit automatiquement à la source. Min €1.000. Capital bloqué 1 an.",
    taxConfig: { interestTax: 0.30, interestExemption: 0, tob: 0, entryFee: 0 },
  },
  {
    id: 'bon-caisse-kbc-3yr',
    name: 'Bon de Caisse KBC (3 ans)',
    category: 'bank',
    subcategory: 'bank-common',
    provider: 'KBC',
    defaultRate: 0.0364,
    rateEditable: true,
    color: '#1d5ca2',
    description:
      "Taux brut 3,64% — précompte de 30% déduit automatiquement. Capital bloqué 3 ans. Retrait anticipé : pénalités importantes.",
    taxConfig: { interestTax: 0.30, interestExemption: 0, tob: 0, entryFee: 0 },
  },
  {
    id: 'bon-caisse-kbc-5yr',
    name: 'Bon de Caisse KBC (5 ans)',
    category: 'bank',
    subcategory: 'bank-common',
    provider: 'KBC',
    defaultRate: 0.0374,
    rateEditable: true,
    color: '#0d4c82',
    description:
      "Taux brut 3,74% — précompte de 30% déduit automatiquement. Capital bloqué 5 ans.",
    taxConfig: { interestTax: 0.30, interestExemption: 0, tob: 0, entryFee: 0 },
  },
  {
    id: 'bon-caisse-argenta-1yr',
    name: 'Bon de Caisse Argenta (1 an)',
    category: 'bank',
    subcategory: 'bank-common',
    provider: 'Argenta',
    defaultRate: 0.0210,
    rateEditable: true,
    color: '#5fa832',
    description:
      "Taux brut 2,10% — précompte de 30% déduit automatiquement. Min €250.",
    taxConfig: { interestTax: 0.30, interestExemption: 0, tob: 0, entryFee: 0 },
  },
  {
    id: 'bon-caisse-argenta-5yr',
    name: 'Bon de Caisse Argenta (5 ans)',
    category: 'bank',
    subcategory: 'bank-common',
    provider: 'Argenta',
    defaultRate: 0.0245,
    rateEditable: true,
    color: '#3d8810',
    description:
      "Taux brut 2,45% — précompte de 30% déduit automatiquement.",
    taxConfig: { interestTax: 0.30, interestExemption: 0, tob: 0, entryFee: 0 },
  },
  {
    id: 'bon-caisse-ing-1yr',
    name: 'Bon de Caisse ING (1 an)',
    category: 'bank',
    subcategory: 'bank-common',
    provider: 'ING',
    defaultRate: 0.0220,
    rateEditable: true,
    color: '#d4700a',
    description:
      "Taux brut 2,20% — précompte de 30% déduit automatiquement. Durées de 2–3 ans disponibles sur demande en agence.",
    taxConfig: { interestTax: 0.30, interestExemption: 0, tob: 0, entryFee: 0 },
  },
  {
    id: 'bon-caisse-beobank-1yr',
    name: 'Compte à Terme Beobank (1 an)',
    category: 'bank',
    subcategory: 'bank-common',
    provider: 'Beobank',
    defaultRate: 0.0310,
    rateEditable: true,
    color: '#7a4a8a',
    description:
      "Taux brut 3,10% — précompte de 30% déduit automatiquement. Capital bloqué 1 an.",
    taxConfig: { interestTax: 0.30, interestExemption: 0, tob: 0, entryFee: 0 },
  },

  // ── Branche 21 ────────────────────────────────────────────────────────────
  {
    id: 'branche21',
    name: 'Assurance-vie Branche 21 (AG Insurance)',
    category: 'bank',
    subcategory: 'bank-common',
    provider: 'AG Insurance',
    defaultRate: 0.031,
    rateEditable: true,
    color: '#e8a94a',
    description:
      "Taux garanti 1,75% + participation bénéficiaire. Rendement total 2025 : ~3,10% (non garanti). Taxe sur prime 2% + frais d'entrée ~3%. Précompte de 30% sur rendement fictif (4,75%/an) si rachat avant 8 ans ; exonéré après 8 ans.",
    taxConfig: {
      premiumTax: 0.02,
      entryFee: 0.03,
      tob: 0,
      tobOnSale: 0,
      branche21WithholdingTax: 0.30,
      branche21FictiveRate: 0.0475,
      branche21MinYears: 8,
      capitalGainsTax: 0.10,
      capitalGainsExemption: 10000,
    },
    contributionCapNote:
      "La déductibilité fiscale est limitée à €2.450/an. Au-delà, les versements restent possibles mais sans avantage fiscal supplémentaire.",
  },
  {
    id: 'branche21-ethias-9yr',
    name: 'Assurance-vie Branche 21 Ethias (9 ans)',
    category: 'bank',
    subcategory: 'bank-specific',
    provider: 'Ethias',
    defaultRate: 0.029,
    rateEditable: true,
    color: '#c86820',
    description:
      "Taux garanti 2,90% pour toute la durée du contrat. 0% frais d'entrée — aucuns frais de gestion. Taxe sur prime 2%. Exonéré du précompte après 8 ans.",
    taxConfig: {
      premiumTax: 0.02,
      entryFee: 0,
      tob: 0,
      tobOnSale: 0,
      branche21WithholdingTax: 0.30,
      branche21FictiveRate: 0.0475,
      branche21MinYears: 8,
      capitalGainsTax: 0.10,
      capitalGainsExemption: 10000,
    },
  },
  {
    id: 'branche21-ethias-3yr',
    name: 'Assurance-vie Branche 21 Ethias (3 ans)',
    category: 'bank',
    subcategory: 'bank-specific',
    provider: 'Ethias',
    defaultRate: 0.023,
    rateEditable: true,
    color: '#b05818',
    description:
      "Taux garanti 2,30% pour la durée de 3 ans. 0% frais d'entrée. Taxe sur prime 2%. Ce contrat de 3 ans ne peut jamais atteindre l'exonération des 8 ans — le précompte fictif de 30% s'applique toujours à l'échéance.",
    taxConfig: {
      premiumTax: 0.02,
      entryFee: 0,
      tob: 0,
      tobOnSale: 0,
      branche21WithholdingTax: 0.30,
      branche21FictiveRate: 0.0475,
      branche21MinYears: 999,  // contract always matures before 8yr threshold
      capitalGainsTax: 0.10,
      capitalGainsExemption: 10000,
    },
  },
  {
    id: 'bnp-future-invest-bon',
    name: 'Future Invest Bon',
    category: 'bank',
    subcategory: 'bank-specific',
    provider: 'BNP Paribas Fortis',
    defaultRate: 0.0310,
    rateEditable: true,
    color: '#1a4a8a',
    description:
      "Taux double : 3,00% la 1ère année, 2,60% les 7 années suivantes (blended ~2,64%). Rendement global 2025 : ~3,10% (participation bénéficiaire incluse). Distribué par BNP Paribas Fortis, sous-jacent assuré par AG Insurance. Durée fixe de 8 ans et 1 mois. Taxe sur prime 2%, frais d'entrée ~2%.",
    taxConfig: {
      premiumTax: 0.02,
      entryFee: 0.02,
      tob: 0,
      tobOnSale: 0,
      branche21WithholdingTax: 0.30,
      branche21FictiveRate: 0.0475,
      branche21MinYears: 8,
      capitalGainsTax: 0.10,
      capitalGainsExemption: 10000,
    },
  },
  {
    id: 'beobank-invest-21',
    name: 'Invest 21',
    category: 'bank',
    subcategory: 'bank-specific',
    provider: 'Beobank',
    defaultRate: 0.0250,
    rateEditable: true,
    color: '#4a3a7a',
    description:
      "Taux garanti 2,50%. Frais d'entrée jusqu'à 2,50% (parfois réduits à 1,00% lors de campagnes promotionnelles). Capital garanti à l'échéance hors frais et taxes. Taxe sur prime 2%. Exonéré du précompte après 8 ans.",
    taxConfig: {
      premiumTax: 0.02,
      entryFee: 0.025,
      tob: 0,
      tobOnSale: 0,
      branche21WithholdingTax: 0.30,
      branche21FictiveRate: 0.0475,
      branche21MinYears: 8,
      capitalGainsTax: 0.10,
      capitalGainsExemption: 10000,
    },
  },

  // ── Fonds épargne-pension ─────────────────────────────────────────────────
  // Rates net of TER, gross of entry fee. Gross baseline 6.75% (dynamic 75/25 benchmark).
  {
    id: 'pension-kbc-pricos',
    name: 'Épargne-pension KBC (Pricos)',
    category: 'bank',
    subcategory: 'bank-specific',
    provider: 'KBC',
    defaultRate: 0.0409,
    grossBaseline: 0.0550,
    ter: 0.0141,
    rateEditable: true,
    color: '#4a6eb8',
    description:
      "Rendement annualisé sur 10 ans : ~5,34% (net de TER 1,41%). Fonds à dominante actions. Frais d'entrée 2%. Avantage fiscal de 30% sur versements jusqu'à €1.050/an.",
    taxConfig: { pensionTax: 0.08, upfrontTaxRelief: 0.30, upfrontTaxReliefCap: 1050, entryFee: 0.02, annualFee: 0.0141 },
    monthlyContributionCap: 112.5,
    contributionCapNote:
      "L'épargne-pension est limitée à €1.050/an. Avantage fiscal de 30% sur les versements (max €315/an de réduction d'impôt).",
  },
  {
    id: 'pension-belfius-equities',
    name: 'Épargne-pension Belfius (High Equities, Candriam)',
    category: 'bank',
    subcategory: 'bank-specific',
    provider: 'Belfius',
    defaultRate: 0.0401,
    grossBaseline: 0.0550,
    ter: 0.0149,
    rateEditable: true,
    color: '#6a4a7e',
    description:
      "Rendement annualisé sur 10 ans : ~5,26% (net de TER 1,49%). Fonds à dominante actions. Frais d'entrée 3%. Avantage fiscal de 30% sur versements jusqu'à €1.050/an.",
    taxConfig: { pensionTax: 0.08, upfrontTaxRelief: 0.30, upfrontTaxReliefCap: 1050, entryFee: 0.03, annualFee: 0.0149 },
    monthlyContributionCap: 112.5,
    contributionCapNote:
      "L'épargne-pension est limitée à €1.050/an. Avantage fiscal de 30% sur les versements (max €315/an de réduction d'impôt).",
  },
  {
    id: 'pension-bnp-growth',
    name: 'Épargne-pension BNP Paribas (B Pension Sust. Growth)',
    category: 'bank',
    subcategory: 'bank-specific',
    provider: 'BNP Paribas',
    defaultRate: 0.0425,
    grossBaseline: 0.0550,
    ter: 0.0125,
    rateEditable: true,
    color: '#3a5a9e',
    description:
      "Rendement annualisé sur 10 ans : ~5,50% (net de TER 1,25%). Frais d'entrée 3%. Avantage fiscal de 30% sur versements jusqu'à €1.050/an.",
    taxConfig: { pensionTax: 0.08, upfrontTaxRelief: 0.30, upfrontTaxReliefCap: 1050, entryFee: 0.03, annualFee: 0.0125 },
    monthlyContributionCap: 112.5,
    contributionCapNote:
      "L'épargne-pension est limitée à €1.050/an. Avantage fiscal de 30% sur les versements (max €315/an de réduction d'impôt).",
  },
  {
    id: 'pension-ing-star',
    name: 'Épargne-pension ING (Star Fund)',
    category: 'bank',
    subcategory: 'bank-specific',
    provider: 'ING',
    defaultRate: 0.0372,
    grossBaseline: 0.0500,
    ter: 0.0128,
    bondAllocation: 0.4,
    rateEditable: true,
    color: '#9e3a2a',
    description:
      "Rendement annualisé sur 10 ans : ~4,72% (net de TER 1,28%). Fonds mixte (~40% obligations). Frais d'entrée 3%. Avantage fiscal de 30% sur versements jusqu'à €1.050/an.",
    taxConfig: { pensionTax: 0.08, upfrontTaxRelief: 0.30, upfrontTaxReliefCap: 1050, entryFee: 0.03, annualFee: 0.0128 },
    monthlyContributionCap: 112.5,
    contributionCapNote:
      "L'épargne-pension est limitée à €1.050/an. Avantage fiscal de 30% sur les versements (max €315/an de réduction d'impôt).",
  },
  {
    id: 'pension-argenta',
    name: 'Épargne-pension Argenta (Pension Fund)',
    category: 'bank',
    subcategory: 'bank-specific',
    provider: 'Argenta',
    defaultRate: 0.0406,
    grossBaseline: 0.0550,
    ter: 0.0144,
    rateEditable: true,
    color: '#3a7a4a',
    description:
      "Rendement annualisé sur 10 ans : ~5,31% (net de TER 1,44%). Fonds à dominante actions. Aucuns frais d'entrée. Avantage fiscal de 30% sur versements jusqu'à €1.050/an.",
    taxConfig: { pensionTax: 0.08, upfrontTaxRelief: 0.30, upfrontTaxReliefCap: 1050, entryFee: 0.00, annualFee: 0.0144 },
    monthlyContributionCap: 112.5,
    contributionCapNote:
      "L'épargne-pension est limitée à €1.050/an. Avantage fiscal de 30% sur les versements (max €315/an de réduction d'impôt).",
  },
  {
    id: 'pension-vdk',
    name: 'Épargne-pension vdk banque (Pension Fund)',
    category: 'bank',
    subcategory: 'bank-specific',
    provider: 'vdk banque',
    defaultRate: 0.0400,
    grossBaseline: 0.0550,
    ter: 0.0150,
    rateEditable: true,
    color: '#2a6a7a',
    description:
      "Rendement annualisé sur 10 ans : ~5,25% (net de TER 1,50%). Fonds à dominante actions, orienté ESG. Frais d'entrée 2%. Avantage fiscal de 30% sur versements jusqu'à €1.050/an.",
    taxConfig: { pensionTax: 0.08, upfrontTaxRelief: 0.30, upfrontTaxReliefCap: 1050, entryFee: 0.02, annualFee: 0.0150 },
    monthlyContributionCap: 112.5,
    contributionCapNote:
      "L'épargne-pension est limitée à €1.050/an. Avantage fiscal de 30% sur les versements (max €315/an de réduction d'impôt).",
  },
  {
    id: 'pension-crelan',
    name: 'Épargne-pension Crelan (Pension Fund Sust. Growth)',
    category: 'bank',
    subcategory: 'bank-specific',
    provider: 'Crelan',
    defaultRate: 0.0400,
    grossBaseline: 0.0550,
    ter: 0.0150,
    rateEditable: true,
    color: '#9a4a28',
    description:
      "Rendement annualisé sur 10 ans : ~5,25% (net de TER 1,50%). Fonds à dominante actions avec critères durables. Frais d'entrée 3%. Avantage fiscal de 30% sur versements jusqu'à €1.050/an.",
    taxConfig: { pensionTax: 0.08, upfrontTaxRelief: 0.30, upfrontTaxReliefCap: 1050, entryFee: 0.03, annualFee: 0.0150 },
    monthlyContributionCap: 112.5,
    contributionCapNote:
      "L'épargne-pension est limitée à €1.050/an. Avantage fiscal de 30% sur les versements (max €315/an de réduction d'impôt).",
  },

  // ── Fonds actifs ──────────────────────────────────────────────────────────
  // Rates net of TER, gross of entry fee.
  {
    id: 'fonds-bnp-equity-world',
    name: 'Fonds BNP Comfort Sust. Equity World',
    category: 'bank',
    subcategory: 'active-fund',
    provider: 'BNP Paribas',
    defaultRate: 0.0650,
    grossBaseline: 0.0800,
    ter: 0.0150,
    bondAllocation: 0,
    rateEditable: true,
    color: '#2a4a7a',
    description:
      "Rendement annualisé sur 10 ans (2016–2025), net de TER 1,50%. Le fonds a sous-performé son indice de référence sur la majorité des années. Frais d'entrée 3%.",
    warningNote: "Ce fonds a sous-performé son indice de référence sur 9 des 10 dernières années.",
    taxConfig: {
      capitalGainsTax: 0.10,
      capitalGainsExemption: 10000,
      entryFee: 0.03,
      annualFee: 0.0150,
      tob: 0.0012,
    },
  },
  {
    id: 'fonds-belfius-equity-world',
    name: 'Fonds Belfius Managed Portfolio Equity World',
    category: 'bank',
    subcategory: 'active-fund',
    provider: 'Belfius',
    defaultRate: 0.0651,
    grossBaseline: 0.0800,
    ter: 0.0149,
    bondAllocation: 0,
    rateEditable: true,
    color: '#6a2a5a',
    description:
      "Rendement annualisé ~6,51% (net de TER 1,49%). Frais d'entrée 3%, TER 1,49%.",
    taxConfig: {
      capitalGainsTax: 0.10,
      capitalGainsExemption: 10000,
      entryFee: 0.03,
      annualFee: 0.0149,
      tob: 0.0012,
    },
  },
  {
    id: 'fonds-axa-belgium-equity',
    name: 'Fonds AXA B Fund Equity Belgium',
    category: 'bank',
    subcategory: 'active-fund',
    provider: 'AXA',
    defaultRate: 0.0653,
    grossBaseline: 0.0800,
    ter: 0.0147,
    bondAllocation: 0,
    rateEditable: true,
    color: '#5a3a8a',
    description:
      "Rendement annualisé ~6,53% (net de TER 1,47%). Exposition uniquement aux actions belges — risque de concentration géographique élevé. Drawdown de -26% en 2022. Frais d'entrée 3%.",
    taxConfig: {
      capitalGainsTax: 0.10,
      capitalGainsExemption: 10000,
      entryFee: 0.03,
      annualFee: 0.0147,
      tob: 0.0012,
    },
  },
  {
    id: 'fonds-nagelmackers-growth',
    name: 'Fonds Nagelmackers MultiFund Growth',
    category: 'bank',
    subcategory: 'active-fund',
    provider: 'Nagelmackers',
    defaultRate: 0.0465,
    grossBaseline: 0.0675,
    ter: 0.0210,
    bondAllocation: 0.25,
    rateEditable: true,
    color: '#7a6a5a',
    description:
      "Rendement annualisé estimé ~4,65% (net de TER 2,10%/an). TER parmi les plus élevés du marché. Fonds mixte (~25% obligations, ~75% actions). Frais d'entrée 2,5%.",
    taxConfig: {
      capitalGainsTax: 0.10,
      capitalGainsExemption: 10000,
      reyndersTax: 0.30,
      entryFee: 0.025,
      annualFee: 0.0210,
      tob: 0.0012,
    },
  },
  {
    id: 'fonds-ing-star-active',
    name: 'Fonds ING (Star Fund)',
    category: 'bank',
    subcategory: 'active-fund',
    provider: 'ING',
    defaultRate: 0.0472,
    grossBaseline: 0.0600,
    ter: 0.0128,
    bondAllocation: 0.40,
    rateEditable: true,
    color: '#9e4a2a',
    description:
      "Rendement annualisé ~4,72% (net de TER 1,28%). Fonds mixte (~40% obligations, ~60% actions). Frais d'entrée 3%.",
    taxConfig: {
      capitalGainsTax: 0.10,
      capitalGainsExemption: 10000,
      reyndersTax: 0.30,
      entryFee: 0.03,
      annualFee: 0.0128,
      tob: 0.0012,
    },
  },
  {
    id: 'fonds-beobank-equities',
    name: 'Fonds Beobank Full Equities Strategy Fund B',
    category: 'bank',
    subcategory: 'active-fund',
    provider: 'Beobank',
    defaultRate: 0.0580,
    grossBaseline: 0.0800,
    ter: 0.0220,
    bondAllocation: 0,
    rateEditable: true,
    color: '#6a3a7a',
    description:
      "Rendement annualisé ~5,80% (net de TER 2,20%). Fonds 100% actions mondiales. TER élevé. Frais d'entrée 2,5%.",
    taxConfig: {
      capitalGainsTax: 0.10,
      capitalGainsExemption: 10000,
      entryFee: 0.025,
      annualFee: 0.0220,
      tob: 0.0012,
    },
  },
];

export const PRODUCTS: Product[] = [...ETF_PRODUCTS, ...BANK_PRODUCTS];
