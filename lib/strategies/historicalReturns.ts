/**
 * Real historical index returns per strategy (annualized, EUR, gross of taxes).
 *
 * All figures are approximate annualized returns to end-2024 / early 2025.
 * They reflect index performance (before ETF TER) and do NOT include Belgian
 * taxes (TOB, précompte mobilier, CGT, Reynders). Past performance ≠ future results.
 */

export interface PeriodReturns {
  /** Annualized return over ~1 year (2024) */
  y1: number;
  /** Annualized return over ~3 years (2022–2024) */
  y3: number;
  /** Annualized return over ~5 years (2020–2024) */
  y5: number;
  /** Annualized return over ~10 years (2015–2024) */
  y10: number;
  /** Translation key for source label */
  source: string;
}

export const STRATEGY_RETURNS: Record<string, PeriodReturns> = {
  // ── Single MSCI World ────────────────────────────────────────────────────────
  'monde-simplifie': {
    y1: 0.243,
    y3: 0.095,
    y5: 0.142,
    y10: 0.118,
    source: 'source_msci_world',
  },

  // ── MSCI World 89% + EM IMI 11% ─────────────────────────────────────────────
  'monde-complet': {
    y1: 0.221,
    y3: 0.087,
    y5: 0.133,
    y10: 0.110,
    source: 'source_msci_world_em',
  },

  // ── MSCI ACWI IMI ────────────────────────────────────────────────────────────
  'tout-en-un': {
    y1: 0.227,
    y3: 0.090,
    y5: 0.137,
    y10: 0.113,
    source: 'source_msci_acwi_imi',
  },

  // ── MSCI World ESG Screened ──────────────────────────────────────────────────
  'esg-mondiale': {
    y1: 0.233,
    y3: 0.092,
    y5: 0.139,
    y10: 0.115,
    source: 'source_msci_world_esg',
  },

  // ── MSCI World 60% + MSCI Europe 40% ─────────────────────────────────────────
  'biais-europe': {
    y1: 0.196,
    y3: 0.082,
    y5: 0.122,
    y10: 0.098,
    source: 'source_msci_world_europe',
  },

  // ── MSCI World 60% + MSCI Europe 20% + MSCI China 20% ───────────────────────
  'anti-us': {
    y1: 0.163,
    y3: 0.059,
    y5: 0.093,
    y10: 0.072,
    source: 'source_msci_world_europe_china',
  },

  // ── MSCI World 70% + MSCI China 30% ─────────────────────────────────────────
  'biais-chine': {
    y1: 0.186,
    y3: 0.053,
    y5: 0.097,
    y10: 0.076,
    source: 'source_msci_world_china',
  },

  // ── S&P 500 (CSPX) ───────────────────────────────────────────────────────────
  'biais-us': {
    y1: 0.292,
    y3: 0.112,
    y5: 0.159,
    y10: 0.133,
    source: 'source_sp500',
  },

  // ── FTSE All-World High Dividend Yield ───────────────────────────────────────
  'dividendes': {
    y1: 0.152,
    y3: 0.082,
    y5: 0.103,
    y10: 0.087,
    source: 'source_high_dividend',
  },

  // ── Nasdaq-100 ───────────────────────────────────────────────────────────────
  'tech-us': {
    y1: 0.318,
    y3: 0.098,
    y5: 0.213,
    y10: 0.183,
    source: 'source_nasdaq',
  },

  // ── Short-duration bond blend ─────────────────────────────────────────────────
  'obligations': {
    y1: 0.048,
    y3: 0.023,
    y5: 0.025,
    y10: 0.021,
    source: 'source_bonds',
  },

  // ── Overnight Rate (XEON) ───────────────────────────────────────────────────
  'epargne-liquide': {
    y1: 0.038,   // €STR approx 2024
    y3: 0.018,
    y5: 0.011,
    y10: 0.006,
    source: 'source_estr',
  },
};
