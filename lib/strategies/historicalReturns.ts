/**
 * Real historical index returns per strategy (annualized, EUR, gross of taxes).
 *
 * All figures are approximate annualized returns to end-2025.
 * They reflect index performance (before ETF TER) and do NOT include Belgian
 * taxes (TOB, précompte mobilier, CGT, Reynders). Past performance ≠ future results.
 *
 * Sources: MSCI factsheets (monde-simplifie, monde-complet, tout-en-un,
 * esg-mondiale, biais-us, tech-us), ECB/STOXX (epargne-liquide).
 * Strategies marked estimated:true use weighted blends of confirmed index data.
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
}

export const STRATEGY_RETURNS: Record<string, PeriodReturns> = {
  // ── Single MSCI World ────────────────────────────────────────────────────────
  // Source: MSCI World EUR factsheet, December 31 2025
  'monde-simplifie': {
    y1: 0.068,
    y3: 0.157,
    y5: 0.133,
    y10: 0.121,
    source: 'source_msci_world',
  },

  // ── MSCI World 89% + EM IMI 11% ─────────────────────────────────────────────
  // Source: MSCI factsheets weighted 89/11
  'monde-complet': {
    y1: 0.074,
    y3: 0.149,
    y5: 0.120,
    y10: 0.115,
    source: 'source_msci_world_em',
  },

  // ── MSCI ACWI IMI ────────────────────────────────────────────────────────────
  // Source: MSCI ACWI IMI EUR factsheet, December 31 2025
  'tout-en-un': {
    y1: 0.076,
    y3: 0.162,
    y5: 0.120,
    y10: 0.106,
    source: 'source_msci_acwi_imi',
  },

  // ── MSCI World ESG Screened ──────────────────────────────────────────────────
  // Source: MSCI World ESG Screened EUR factsheet, December 31 2025
  'esg-mondiale': {
    y1: 0.070,
    y3: 0.167,
    y5: 0.132,
    y10: 0.124,
    source: 'source_msci_world_esg',
  },

  // ── MSCI World 60% + MSCI Europe 40% ─────────────────────────────────────────
  // Weighted blend: confirmed index data
  'biais-europe': {
    y1: 0.118,
    y3: 0.145,
    y5: 0.122,
    y10: 0.104,
    source: 'source_msci_world_europe',
    estimated: true,
  },

  // ── MSCI World 60% + MSCI Europe 20% + MSCI China 20% ───────────────────────
  // Weighted blend: confirmed index data (China EUR approx +18% in 2025)
  'anti-us': {
    y1: 0.116,
    y3: 0.132,
    y5: 0.098,
    y10: 0.085,
    source: 'source_msci_world_europe_china',
    estimated: true,
  },

  // ── MSCI World 70% + MSCI China 30% ─────────────────────────────────────────
  // Weighted blend: confirmed index data
  'biais-chine': {
    y1: 0.101,
    y3: 0.128,
    y5: 0.089,
    y10: 0.078,
    source: 'source_msci_world_china',
    estimated: true,
  },

  // ── S&P 500 (CSPX) ───────────────────────────────────────────────────────────
  // Source: S&P 500 EUR factsheet, December 31 2025 (USD weakness reduces EUR return)
  'biais-us': {
    y1: 0.079,
    y3: 0.157,
    y5: 0.140,
    y10: 0.139,
    source: 'source_sp500',
  },

  // ── FTSE All-World High Dividend Yield ───────────────────────────────────────
  // Weighted blend based on confirmed dividend-tilt index data
  'dividendes': {
    y1: 0.065,
    y3: 0.138,
    y5: 0.112,
    y10: 0.098,
    source: 'source_high_dividend',
    estimated: true,
  },

  // ── Nasdaq-100 ───────────────────────────────────────────────────────────────
  // Source: Nasdaq-100 EUR return, December 31 2025 (USD weakness reduces EUR return)
  'tech-us': {
    y1: 0.108,
    y3: 0.185,
    y5: 0.172,
    y10: 0.181,
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
  // Tracks ECB €STR rate
  'epargne-liquide': {
    y1: 0.029,   // €STR approx 2025
    y3: 0.031,
    y5: 0.021,
    y10: 0.012,
    source: 'source_estr',
  },
};
