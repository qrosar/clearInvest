/**
 * Real historical index returns per strategy (annualized, EUR, gross of taxes).
 *
 * All figures are approximate annualized returns to end-2025.
 * They reflect index performance (before ETF TER) and do NOT include Belgian
 * taxes (TOB, précompte mobilier, CGT, Reynders). Past performance ≠ future results.
 *
 * Sources: monthly index series in EUR via Curvo Backtest — MSCI indices with
 * net dividends, S&P 500 total return, Nasdaq-100 net, FTSE All-World High
 * Dividend Yield net — computed from year-end levels (recomputed Oct 2026);
 * ECB (epargne-liquide); ETF calendar-year returns (esg-mondiale — see below).
 * Strategies marked estimated:true are blends of those index series, rebalanced
 * annually, rather than a single published index.
 */

export interface PeriodReturns {
  /** Annualized return over ~1 year (2025) */
  y1: number;
  /** Annualized return over ~3 years (2023–2025) */
  y3: number;
  /** Annualized return over ~5 years (2021–2025) */
  y5: number;
  /** Annualized return over ~10 years (2016–2025) */
  y10: number;
  /** Translation key for source label */
  source: string;
  /**
   * True for blend strategies whose multi-year figures are weighted calculations
   * rather than direct index factsheet data. A small disclaimer is shown in the UI.
   */
  estimated?: boolean;
  /**
   * True when the figures are ETF returns (already net of the TER) rather than
   * index returns. A small disclaimer is shown in the UI, since the generic one
   * states figures are gross of ETF fees.
   */
  netOfFees?: boolean;
}

export const STRATEGY_RETURNS: Record<string, PeriodReturns> = {
  // ── Single MSCI World ────────────────────────────────────────────────────────
  // Source: MSCI World EUR factsheet, December 31 2025
  'monde-simplifie': {
    y1: 0.071,
    y3: 0.173,
    y5: 0.131,
    y10: 0.113,
    source: 'source_msci_world',
  },

  // ── MSCI World 89% + EM IMI 11% ─────────────────────────────────────────────
  // Source: MSCI factsheets weighted 89/11
  'monde-complet': {
    y1: 0.081,
    y3: 0.168,
    y5: 0.123,
    y10: 0.109,
    source: 'source_msci_world_em',
  },

  // ── MSCI ACWI IMI ────────────────────────────────────────────────────────────
  // Source: MSCI ACWI IMI EUR factsheet, December 31 2025
  'tout-en-un': {
    y1: 0.079,
    y3: 0.162,
    y5: 0.117,
    y10: 0.106,
    source: 'source_msci_acwi_imi',
  },

  // ── MSCI ACWI Select Screened ────────────────────────────────────────────────
  // Source: Xtrackers MSCI AC World Screened (IE00BGHQ0G80) calendar-year returns
  // in EUR, net of TER, 2016–2025. The ETF only tracks the MSCI ACWI Select
  // Screened index since 20 October 2021; before that it tracked MSCI ACWI.
  'esg-mondiale': {
    y1: 0.077,
    y3: 0.174,
    y5: 0.121,
    y10: 0.107,
    source: 'source_msci_acwi_screened',
    netOfFees: true,
  },

  // ── MSCI World 60% + MSCI Europe 40% ─────────────────────────────────────────
  // Weighted blend: confirmed index data
  'biais-europe': {
    y1: 0.121,
    y3: 0.163,
    y5: 0.125,
    y10: 0.099,
    source: 'source_msci_world_europe',
    estimated: true,
  },

  // ── MSCI World 60% + MSCI Europe 20% + MSCI China 20% ───────────────────────
  // Weighted blend: confirmed index data (China EUR approx +18% in 2025)
  'anti-us': {
    y1: 0.113,
    y3: 0.153,
    y5: 0.100,
    y10: 0.096,
    source: 'source_msci_world_europe_china',
    estimated: true,
  },

  // ── MSCI World 70% + MSCI China 30% ─────────────────────────────────────────
  // Weighted blend: confirmed index data
  'biais-chine': {
    y1: 0.096,
    y3: 0.149,
    y5: 0.089,
    y10: 0.097,
    source: 'source_msci_world_china',
    estimated: true,
  },

  // ── S&P 500 (CSPX) ───────────────────────────────────────────────────────────
  // Source: S&P 500 EUR factsheet, December 31 2025 (USD weakness reduces EUR return)
  'biais-us': {
    y1: 0.042,
    y3: 0.191,
    y5: 0.154,
    y10: 0.139,
    source: 'source_sp500',
  },

  // ── FTSE All-World High Dividend Yield ───────────────────────────────────────
  // Weighted blend based on confirmed dividend-tilt index data
  'dividendes': {
    y1: 0.117,
    y3: 0.117,
    y5: 0.123,
    y10: 0.083,
    source: 'source_high_dividend',
  },

  // ── Nasdaq-100 ───────────────────────────────────────────────────────────────
  // Source: Nasdaq-100 EUR return, December 31 2025 (USD weakness reduces EUR return)
  'tech-us': {
    y1: 0.068,
    y3: 0.287,
    y5: 0.160,
    y10: 0.184,
    source: 'source_nasdaq',
  },

  // ── Overnight Rate (CSH2) ───────────────────────────────────────────────────
  // Tracks ECB €STR rate
  'epargne-liquide': {
    y1: 0.022,   // €STR average 2025 (ECB deposit rate 3.00% → 2.00% during the year)
    y3: 0.031,
    y5: 0.021,
    y10: 0.012,
    source: 'source_estr',
  },
};
