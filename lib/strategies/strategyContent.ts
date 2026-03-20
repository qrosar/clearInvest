export interface Alternative {
  ticker: string;   // may include '+' for multi-ETF suggestions like "IWDA + EMIM"
  isin: string;     // may include '+' for multi-ETF
  name: string;
  ter: number;      // percentage like 0.20 (= 0.20%)
  tob: number;      // decimal fraction like 0.0012 (= 0.12%)
  accumulating: boolean;
  pros: string[];
  cons: string[];
  verdict: string;
}

export interface StrategyContent {
  /** Approximate number of underlying securities */
  numberOfSecurities: number;
  /** Whether Reynders tax (30%) applies at redemption */
  hasReynders: boolean;
  /** Whether the strategy has any distributing ETFs */
  hasDistributing: boolean;
  /** 3–4 bullet points explaining the Belgian tax advantages & rationale */
  whyPoints: string[];
  /** 3–4 comparable alternatives with honest pros/cons */
  alternatives: Alternative[];
  /** Strategy-specific fiscal disclaimer shown in the "Avertissement" section */
  fiscalNote: string;
}

const FISCAL_STANDARD = 'data.fiscal.standard';
const FISCAL_DISTRIBUTING = 'data.fiscal.distributing';
const FISCAL_REYNDERS = 'data.fiscal.reynders';

export const STRATEGY_CONTENT: Record<string, StrategyContent> = {

  'monde-simplifie': {
    numberOfSecurities: 1400,
    hasReynders: false,
    hasDistributing: false,
    whyPoints: [
      'data.strategies.monde-simplifie.why_0',
      'data.strategies.monde-simplifie.why_1',
      'data.strategies.monde-simplifie.why_2',
      'data.strategies.monde-simplifie.why_3',
    ],
    alternatives: [
      {
        ticker: 'SWRD',
        isin: 'IE00BFY0GT14',
        name: 'SPDR MSCI World UCITS ETF Acc',
        ter: 0.12,
        tob: 0.0012,
        accumulating: true,
        pros: ['data.strategies.monde-simplifie.alt_0_pro_0', 'data.strategies.monde-simplifie.alt_0_pro_1', 'data.strategies.monde-simplifie.alt_0_pro_2'],
        cons: ['data.strategies.monde-simplifie.alt_0_con_0', 'data.strategies.monde-simplifie.alt_0_con_1'],
        verdict: 'data.strategies.monde-simplifie.alt_0_verdict',
      },
      {
        ticker: 'IMIE',
        isin: 'IE00B3YLTY66',
        name: 'State Street SPDR MSCI All Country World Investable Market UCITS ETF (Acc)',
        ter: 0.17,
        tob: 0.0012,
        accumulating: true,
        pros: ['data.strategies.monde-simplifie.alt_1_pro_0', 'data.strategies.monde-simplifie.alt_1_pro_1', 'data.strategies.monde-simplifie.alt_1_pro_2'],
        cons: ['data.strategies.monde-simplifie.alt_1_con_0', 'data.strategies.monde-simplifie.alt_1_con_1'],
        verdict: 'data.strategies.monde-simplifie.alt_1_verdict',
      },
      {
        ticker: 'VWCE',
        isin: 'IE00BK5BQT80',
        name: 'Vanguard FTSE All-World UCITS ETF Acc',
        ter: 0.19,
        tob: 0.0132,
        accumulating: true,
        pros: ['data.strategies.monde-simplifie.alt_2_pro_0', 'data.strategies.monde-simplifie.alt_2_pro_1', 'data.strategies.monde-simplifie.alt_2_pro_2'],
        cons: ['data.strategies.monde-simplifie.alt_2_con_0', 'data.strategies.monde-simplifie.alt_2_con_1', 'data.strategies.monde-simplifie.alt_2_con_2'],
        verdict: 'data.strategies.monde-simplifie.alt_2_verdict',
      },
    ],
    fiscalNote: FISCAL_STANDARD,
  },

  'monde-complet': {
    numberOfSecurities: 3600,
    hasReynders: false,
    hasDistributing: false,
    whyPoints: [
      'data.strategies.monde-complet.why_0',
      'data.strategies.monde-complet.why_1',
      'data.strategies.monde-complet.why_2',
      'data.strategies.monde-complet.why_3',
    ],
    alternatives: [
      {
        ticker: 'IMIE',
        isin: 'IE00B3YLTY66',
        name: 'State Street SPDR MSCI All Country World Investable Market UCITS ETF (Acc)',
        ter: 0.17,
        tob: 0.0012,
        accumulating: true,
        pros: ['data.strategies.monde-complet.alt_0_pro_0', 'data.strategies.monde-complet.alt_0_pro_1', 'data.strategies.monde-complet.alt_0_pro_2'],
        cons: ['data.strategies.monde-complet.alt_0_con_0', 'data.strategies.monde-complet.alt_0_con_1'],
        verdict: 'data.strategies.monde-complet.alt_0_verdict',
      },
      {
        ticker: 'FWRA',
        isin: 'IE000716YHJ7',
        name: 'Invesco FTSE All-World UCITS ETF Acc',
        ter: 0.15,
        tob: 0.0012,
        accumulating: true,
        pros: ['data.strategies.monde-complet.alt_1_pro_0', 'data.strategies.monde-complet.alt_1_pro_1', 'data.strategies.monde-complet.alt_1_pro_2', 'data.strategies.monde-complet.alt_1_pro_3'],
        cons: ['data.strategies.monde-complet.alt_1_con_0', 'data.strategies.monde-complet.alt_1_con_1', 'data.strategies.monde-complet.alt_1_con_2'],
        verdict: 'data.strategies.monde-complet.alt_1_verdict',
      },
      {
        ticker: 'VWCE',
        isin: 'IE00BK5BQT80',
        name: 'Vanguard FTSE All-World UCITS ETF Acc',
        ter: 0.19,
        tob: 0.0132,
        accumulating: true,
        pros: ['data.strategies.monde-complet.alt_2_pro_0', 'data.strategies.monde-complet.alt_2_pro_1'],
        cons: ['data.strategies.monde-complet.alt_2_con_0', 'data.strategies.monde-complet.alt_2_con_1', 'data.strategies.monde-complet.alt_2_con_2'],
        verdict: 'data.strategies.monde-complet.alt_2_verdict',
      },
    ],
    fiscalNote: FISCAL_STANDARD,
  },

  'tout-en-un': {
    numberOfSecurities: 9000,
    hasReynders: false,
    hasDistributing: false,
    whyPoints: [
      'data.strategies.tout-en-un.why_0',
      'data.strategies.tout-en-un.why_1',
      'data.strategies.tout-en-un.why_2',
      'data.strategies.tout-en-un.why_3',
    ],
    alternatives: [
      {
        ticker: 'WEBN',
        isin: 'IE0003XJA0J9',
        name: 'Amundi Prime All Country World UCITS ETF Acc',
        ter: 0.07,
        tob: 0.0012,
        accumulating: true,
        pros: ['data.strategies.tout-en-un.alt_0_pro_0', 'data.strategies.tout-en-un.alt_0_pro_1', 'data.strategies.tout-en-un.alt_0_pro_2'],
        cons: ['data.strategies.tout-en-un.alt_0_con_0', 'data.strategies.tout-en-un.alt_0_con_1', 'data.strategies.tout-en-un.alt_0_con_2', 'data.strategies.tout-en-un.alt_0_con_3', 'data.strategies.tout-en-un.alt_0_con_4'],
        verdict: 'data.strategies.tout-en-un.alt_0_verdict',
      },
      {
        ticker: 'IWDA + EMIM',
        isin: 'IE00B4L5Y983 + IE00BKM4GZ66',
        name: 'iShares MSCI World + iShares Core MSCI EM IMI',
        ter: 0.198,
        tob: 0.0012,
        accumulating: true,
        pros: ['data.strategies.tout-en-un.alt_1_pro_0', 'data.strategies.tout-en-un.alt_1_pro_1', 'data.strategies.tout-en-un.alt_1_pro_2'],
        cons: ['data.strategies.tout-en-un.alt_1_con_0', 'data.strategies.tout-en-un.alt_1_con_1', 'data.strategies.tout-en-un.alt_1_con_2'],
        verdict: 'data.strategies.tout-en-un.alt_1_verdict',
      },
      {
        ticker: 'FWRA',
        isin: 'IE000716YHJ7',
        name: 'Invesco FTSE All-World UCITS ETF Acc',
        ter: 0.15,
        tob: 0.0012,
        accumulating: true,
        pros: ['data.strategies.tout-en-un.alt_2_pro_0', 'data.strategies.tout-en-un.alt_2_pro_1', 'data.strategies.tout-en-un.alt_2_pro_2'],
        cons: ['data.strategies.tout-en-un.alt_2_con_0', 'data.strategies.tout-en-un.alt_2_con_1', 'data.strategies.tout-en-un.alt_2_con_2'],
        verdict: 'data.strategies.tout-en-un.alt_2_verdict',
      },
      {
        ticker: 'VWCE',
        isin: 'IE00BK5BQT80',
        name: 'Vanguard FTSE All-World UCITS ETF Acc',
        ter: 0.19,
        tob: 0.0132,
        accumulating: true,
        pros: ['data.strategies.tout-en-un.alt_3_pro_0', 'data.strategies.tout-en-un.alt_3_pro_1', 'data.strategies.tout-en-un.alt_3_pro_2'],
        cons: ['data.strategies.tout-en-un.alt_3_con_0', 'data.strategies.tout-en-un.alt_3_con_1', 'data.strategies.tout-en-un.alt_3_con_2'],
        verdict: 'data.strategies.tout-en-un.alt_3_verdict',
      },
    ],
    fiscalNote: FISCAL_STANDARD,
  },

  'esg-mondiale': {
    numberOfSecurities: 700,
    hasReynders: false,
    hasDistributing: false,
    whyPoints: [
      'data.strategies.esg-mondiale.why_0',
      'data.strategies.esg-mondiale.why_1',
      'data.strategies.esg-mondiale.why_2',
      'data.strategies.esg-mondiale.why_3',
    ],
    alternatives: [
      {
        ticker: 'SUWS',
        isin: 'IE00BYX2JD69',
        name: 'iShares MSCI World SRI UCITS ETF Acc',
        ter: 0.20,
        tob: 0.0012,
        accumulating: true,
        pros: ['data.strategies.esg-mondiale.alt_0_pro_0', 'data.strategies.esg-mondiale.alt_0_pro_1', 'data.strategies.esg-mondiale.alt_0_pro_2'],
        cons: ['data.strategies.esg-mondiale.alt_0_con_0', 'data.strategies.esg-mondiale.alt_0_con_1', 'data.strategies.esg-mondiale.alt_0_con_2'],
        verdict: 'data.strategies.esg-mondiale.alt_0_verdict',
      },
      {
        ticker: 'XDEQ',
        isin: 'IE00BZ0PKT83',
        name: 'Xtrackers MSCI World ESG Screened Swap UCITS ETF Acc',
        ter: 0.07,
        tob: 0.0012,
        accumulating: true,
        pros: ['data.strategies.esg-mondiale.alt_1_pro_0', 'data.strategies.esg-mondiale.alt_1_pro_1', 'data.strategies.esg-mondiale.alt_1_pro_2'],
        cons: ['data.strategies.esg-mondiale.alt_1_con_0', 'data.strategies.esg-mondiale.alt_1_con_1', 'data.strategies.esg-mondiale.alt_1_con_2'],
        verdict: 'data.strategies.esg-mondiale.alt_1_verdict',
      },
      {
        ticker: 'IWDA',
        isin: 'IE00B4L5Y983',
        name: 'iShares Core MSCI World UCITS ETF Acc',
        ter: 0.20,
        tob: 0.0012,
        accumulating: true,
        pros: ['data.strategies.esg-mondiale.alt_2_pro_0', 'data.strategies.esg-mondiale.alt_2_pro_1'],
        cons: ['data.strategies.esg-mondiale.alt_2_con_0', 'data.strategies.esg-mondiale.alt_2_con_1'],
        verdict: 'data.strategies.esg-mondiale.alt_2_verdict',
      },
    ],
    fiscalNote: FISCAL_STANDARD,
  },

  'biais-europe': {
    numberOfSecurities: 1800,
    hasReynders: false,
    hasDistributing: false,
    whyPoints: [
      'data.strategies.biais-europe.why_0',
      'data.strategies.biais-europe.why_1',
      'data.strategies.biais-europe.why_2',
      'data.strategies.biais-europe.why_3',
    ],
    alternatives: [
      {
        ticker: 'IWDA + XESX',
        isin: 'IE00B4L5Y983 + IE00B0M62Q58',
        name: 'iShares MSCI World + iShares Core EURO STOXX 50',
        ter: 0.165,
        tob: 0.0012,
        accumulating: true,
        pros: ['data.strategies.biais-europe.alt_0_pro_0', 'data.strategies.biais-europe.alt_0_pro_1', 'data.strategies.biais-europe.alt_0_pro_2'],
        cons: ['data.strategies.biais-europe.alt_0_con_0', 'data.strategies.biais-europe.alt_0_con_1', 'data.strategies.biais-europe.alt_0_con_2', 'data.strategies.biais-europe.alt_0_con_3'],
        verdict: 'data.strategies.biais-europe.alt_0_verdict',
      },
      {
        ticker: 'IMIE',
        isin: 'IE00B3YLTY66',
        name: 'State Street SPDR MSCI All Country World Investable Market UCITS ETF (Acc)',
        ter: 0.17,
        tob: 0.0012,
        accumulating: true,
        pros: ['data.strategies.biais-europe.alt_1_pro_0', 'data.strategies.biais-europe.alt_1_pro_1', 'data.strategies.biais-europe.alt_1_pro_2'],
        cons: ['data.strategies.biais-europe.alt_1_con_0', 'data.strategies.biais-europe.alt_1_con_1'],
        verdict: 'data.strategies.biais-europe.alt_1_verdict',
      },
      {
        ticker: 'VEUR',
        isin: 'IE00B945VV12',
        name: 'Vanguard FTSE Developed Europe UCITS ETF',
        ter: 0.10,
        tob: 0.0012,
        accumulating: false,
        pros: ['data.strategies.biais-europe.alt_2_pro_0', 'data.strategies.biais-europe.alt_2_pro_1', 'data.strategies.biais-europe.alt_2_pro_2'],
        cons: ['data.strategies.biais-europe.alt_2_con_0', 'data.strategies.biais-europe.alt_2_con_1', 'data.strategies.biais-europe.alt_2_con_2'],
        verdict: 'data.strategies.biais-europe.alt_2_verdict',
      },
    ],
    fiscalNote: FISCAL_STANDARD,
  },

  'anti-us': {
    numberOfSecurities: 2200,
    hasReynders: false,
    hasDistributing: false,
    whyPoints: [
      'data.strategies.anti-us.why_0',
      'data.strategies.anti-us.why_1',
      'data.strategies.anti-us.why_2',
      'data.strategies.anti-us.why_3',
    ],
    alternatives: [
      {
        ticker: 'IWDA + EMIM',
        isin: 'IE00B4L5Y983 + IE00BKM4GZ66',
        name: 'iShares MSCI World + iShares Core MSCI EM IMI',
        ter: 0.198,
        tob: 0.0012,
        accumulating: true,
        pros: ['data.strategies.anti-us.alt_0_pro_0', 'data.strategies.anti-us.alt_0_pro_1', 'data.strategies.anti-us.alt_0_pro_2'],
        cons: ['data.strategies.anti-us.alt_0_con_0', 'data.strategies.anti-us.alt_0_con_1'],
        verdict: 'data.strategies.anti-us.alt_0_verdict',
      },
      {
        ticker: 'IMIE',
        isin: 'IE00B3YLTY66',
        name: 'State Street SPDR MSCI All Country World Investable Market UCITS ETF (Acc)',
        ter: 0.17,
        tob: 0.0012,
        accumulating: true,
        pros: ['data.strategies.anti-us.alt_1_pro_0', 'data.strategies.anti-us.alt_1_pro_1'],
        cons: ['data.strategies.anti-us.alt_1_con_0', 'data.strategies.anti-us.alt_1_con_1'],
        verdict: 'data.strategies.anti-us.alt_1_verdict',
      },
    ],
    fiscalNote: FISCAL_STANDARD,
  },

  'biais-chine': {
    numberOfSecurities: 2000,
    hasReynders: false,
    hasDistributing: false,
    whyPoints: [
      'data.strategies.biais-chine.why_0',
      'data.strategies.biais-chine.why_1',
      'data.strategies.biais-chine.why_2',
      'data.strategies.biais-chine.why_3',
    ],
    alternatives: [
      {
        ticker: 'IWDA + EMIM',
        isin: 'IE00B4L5Y983 + IE00BKM4GZ66',
        name: 'iShares MSCI World + iShares Core MSCI EM IMI',
        ter: 0.198,
        tob: 0.0012,
        accumulating: true,
        pros: ['data.strategies.biais-chine.alt_0_pro_0', 'data.strategies.biais-chine.alt_0_pro_1', 'data.strategies.biais-chine.alt_0_pro_2'],
        cons: ['data.strategies.biais-chine.alt_0_con_0', 'data.strategies.biais-chine.alt_0_con_1'],
        verdict: 'data.strategies.biais-chine.alt_0_verdict',
      },
      {
        ticker: 'ICHN',
        isin: 'IE00BJ5JPG56',
        name: 'iShares MSCI China UCITS ETF Acc',
        ter: 0.28,
        tob: 0.0012,
        accumulating: true,
        pros: ['data.strategies.biais-chine.alt_1_pro_0', 'data.strategies.biais-chine.alt_1_pro_1'],
        cons: ['data.strategies.biais-chine.alt_1_con_0', 'data.strategies.biais-chine.alt_1_con_1', 'data.strategies.biais-chine.alt_1_con_2'],
        verdict: 'data.strategies.biais-chine.alt_1_verdict',
      },
    ],
    fiscalNote: FISCAL_STANDARD,
  },

  'biais-us': {
    numberOfSecurities: 500,
    hasReynders: false,
    hasDistributing: false,
    whyPoints: [
      'data.strategies.biais-us.why_0',
      'data.strategies.biais-us.why_1',
      'data.strategies.biais-us.why_2',
      'data.strategies.biais-us.why_3',
    ],
    alternatives: [
      {
        ticker: 'VUAA',
        isin: 'IE00B3XXRP09',
        name: 'Vanguard S&P 500 UCITS ETF Acc',
        ter: 0.07,
        tob: 0.0012,
        accumulating: true,
        pros: ['data.strategies.biais-us.alt_0_pro_0', 'data.strategies.biais-us.alt_0_pro_1', 'data.strategies.biais-us.alt_0_pro_2', 'data.strategies.biais-us.alt_0_pro_3'],
        cons: ['data.strategies.biais-us.alt_0_con_0'],
        verdict: 'data.strategies.biais-us.alt_0_verdict',
      },
      {
        ticker: 'SXR8',
        isin: 'IE00B5BMR087',
        name: 'iShares Core S&P 500 UCITS ETF EUR (Acc)',
        ter: 0.07,
        tob: 0.0012,
        accumulating: true,
        pros: ['data.strategies.biais-us.alt_1_pro_0', 'data.strategies.biais-us.alt_1_pro_1', 'data.strategies.biais-us.alt_1_pro_2'],
        cons: ['data.strategies.biais-us.alt_1_con_0', 'data.strategies.biais-us.alt_1_con_1'],
        verdict: 'data.strategies.biais-us.alt_1_verdict',
      },
      {
        ticker: 'IWDA',
        isin: 'IE00B4L5Y983',
        name: 'iShares Core MSCI World UCITS ETF Acc',
        ter: 0.20,
        tob: 0.0012,
        accumulating: true,
        pros: ['data.strategies.biais-us.alt_2_pro_0', 'data.strategies.biais-us.alt_2_pro_1'],
        cons: ['data.strategies.biais-us.alt_2_con_0', 'data.strategies.biais-us.alt_2_con_1'],
        verdict: 'data.strategies.biais-us.alt_2_verdict',
      },
    ],
    fiscalNote: FISCAL_STANDARD,
  },

  'tech-us': {
    numberOfSecurities: 100,
    hasReynders: false,
    hasDistributing: false,
    whyPoints: [
      'data.strategies.tech-us.why_0',
      'data.strategies.tech-us.why_1',
      'data.strategies.tech-us.why_2',
      'data.strategies.tech-us.why_3',
    ],
    alternatives: [
      {
        ticker: 'EQQQ',
        isin: 'IE0032077012',
        name: 'Invesco EQQQ Nasdaq-100 UCITS ETF',
        ter: 0.30,
        tob: 0.0012,
        accumulating: false,
        pros: ['data.strategies.tech-us.alt_0_pro_0', 'data.strategies.tech-us.alt_0_pro_1', 'data.strategies.tech-us.alt_0_pro_2'],
        cons: ['data.strategies.tech-us.alt_0_con_0', 'data.strategies.tech-us.alt_0_con_1', 'data.strategies.tech-us.alt_0_con_2'],
        verdict: 'data.strategies.tech-us.alt_0_verdict',
      },
      {
        ticker: 'XNAS',
        isin: 'IE000CNSFAR2',
        name: 'Xtrackers Nasdaq-100 UCITS ETF 1C',
        ter: 0.20,
        tob: 0.0012,
        accumulating: true,
        pros: ['data.strategies.tech-us.alt_1_pro_0', 'data.strategies.tech-us.alt_1_pro_1', 'data.strategies.tech-us.alt_1_pro_2'],
        cons: ['data.strategies.tech-us.alt_1_con_0', 'data.strategies.tech-us.alt_1_con_1'],
        verdict: 'data.strategies.tech-us.alt_1_verdict',
      },
      {
        ticker: 'CSPX',
        isin: 'IE00B5BMR087',
        name: 'iShares Core S&P 500 UCITS ETF Acc',
        ter: 0.07,
        tob: 0.0012,
        accumulating: true,
        pros: ['data.strategies.tech-us.alt_2_pro_0', 'data.strategies.tech-us.alt_2_pro_1', 'data.strategies.tech-us.alt_2_pro_2'],
        cons: ['data.strategies.tech-us.alt_2_con_0', 'data.strategies.tech-us.alt_2_con_1'],
        verdict: 'data.strategies.tech-us.alt_2_verdict',
      },
    ],
    fiscalNote: FISCAL_STANDARD,
  },

  'dividendes': {
    numberOfSecurities: 1500,
    hasReynders: false,
    hasDistributing: true,
    whyPoints: [
      'data.strategies.dividendes.why_0',
      'data.strategies.dividendes.why_1',
      'data.strategies.dividendes.why_2',
      'data.strategies.dividendes.why_3',
    ],
    alternatives: [
      {
        ticker: 'IWDA',
        isin: 'IE00B4L5Y983',
        name: 'iShares Core MSCI World UCITS ETF Acc',
        ter: 0.20,
        tob: 0.0012,
        accumulating: true,
        pros: ['data.strategies.dividendes.alt_0_pro_0', 'data.strategies.dividendes.alt_0_pro_1', 'data.strategies.dividendes.alt_0_pro_2'],
        cons: ['data.strategies.dividendes.alt_0_con_0', 'data.strategies.dividendes.alt_0_con_1'],
        verdict: 'data.strategies.dividendes.alt_0_verdict',
      },
      {
        ticker: 'VHYA',
        isin: 'IE00BK5BR626',
        name: 'Vanguard FTSE All-World High Dividend Yield UCITS ETF (USD) Accumulating',
        ter: 0.29,
        tob: 0.0012,
        accumulating: true,
        pros: ['data.strategies.dividendes.alt_1_pro_0', 'data.strategies.dividendes.alt_1_pro_1', 'data.strategies.dividendes.alt_1_pro_2'],
        cons: ['data.strategies.dividendes.alt_1_con_0', 'data.strategies.dividendes.alt_1_con_1'],
        verdict: 'data.strategies.dividendes.alt_1_verdict',
      },
    ],
    fiscalNote: FISCAL_DISTRIBUTING,
  },

  'epargne-liquide': {
    numberOfSecurities: 1,
    hasReynders: false,
    hasDistributing: false,
    whyPoints: [
      'data.strategies.epargne-liquide.why_0',
      'data.strategies.epargne-liquide.why_1',
      'data.strategies.epargne-liquide.why_2',
      'data.strategies.epargne-liquide.why_3',
      'data.strategies.epargne-liquide.why_4',
    ],
    alternatives: [
      {
        ticker: 'ERNA',
        isin: 'IE00BKG6Z746',
        name: 'iShares € Ultrashort Bond UCITS ETF',
        ter: 0.09,
        tob: 0.0012,
        accumulating: true,
        pros: ['data.strategies.epargne-liquide.alt_0_pro_0', 'data.strategies.epargne-liquide.alt_0_pro_1'],
        cons: ['data.strategies.epargne-liquide.alt_0_con_0', 'data.strategies.epargne-liquide.alt_0_con_1'],
        verdict: 'data.strategies.epargne-liquide.alt_0_verdict',
      },
      {
        ticker: 'CSH2',
        isin: 'LU1190417599',
        name: 'Lyxor Smart Overnight Return ETF',
        ter: 0.07,
        tob: 0.0012,
        accumulating: true,
        pros: ['data.strategies.epargne-liquide.alt_1_pro_0', 'data.strategies.epargne-liquide.alt_1_pro_1'],
        cons: ['data.strategies.epargne-liquide.alt_1_con_0', 'data.strategies.epargne-liquide.alt_1_con_1'],
        verdict: 'data.strategies.epargne-liquide.alt_1_verdict',
      },
    ],
    fiscalNote: 'data.fiscal.epargne_liquide',
  },
};
