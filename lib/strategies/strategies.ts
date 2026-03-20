export type ETFAllocation = {
  ticker: string;
  isin: string;
  name: string;            // literal name
  allocation: number;      // percentage, e.g. 60 means 60%
  ter: number;             // percentage, e.g. 0.20 means 0.20% TER
  accumulating: boolean;
};

export type Strategy = {
  id: string;
  name: string;            // i18n key (data.strategies.[id].name)
  tagline: string;         // i18n key (data.strategies.[id].tagline)
  description: string;     // i18n key (data.strategies.[id].description)
  etfs: ETFAllocation[];
  historicalReturn: number; // annual return, e.g. 0.08 for 8%
  historicalReturnPeriod: string;
  historicalReturnNote: string; // i18n key (data.strategies.[id].historicalReturnNote)
  tob: number;             // fraction, e.g. 0.0012 for 0.12%
  color: string;           // hex color for UI
  warnings?: string[];     // array of i18n keys
};

export const STRATEGIES: Strategy[] = [
  {
    id: 'monde-simplifie',
    name: 'data.strategies.monde-simplifie.name',
    tagline: 'data.strategies.monde-simplifie.tagline',
    description: 'data.strategies.monde-simplifie.description',
    etfs: [
      { ticker: 'IWDA', isin: 'IE00B4L5Y983', name: 'iShares Core MSCI World UCITS ETF (Acc)', allocation: 100, ter: 0.20, accumulating: true },
    ],
    historicalReturn: 0.082,
    historicalReturnPeriod: '2005–2025',
    historicalReturnNote: 'data.strategies.monde-simplifie.historicalReturnNote',
    tob: 0.0012,
    color: '#2d5a27',
  },
  {
    id: 'monde-complet',
    name: 'data.strategies.monde-complet.name',
    tagline: 'data.strategies.monde-complet.tagline',
    description: 'data.strategies.monde-complet.description',
    etfs: [
      { ticker: 'IWDA', isin: 'IE00B4L5Y983', name: 'iShares Core MSCI World UCITS ETF (Acc)', allocation: 89, ter: 0.20, accumulating: true },
      { ticker: 'EMIM', isin: 'IE00BKM4GZ66', name: 'iShares Core MSCI EM IMI UCITS ETF (Acc)', allocation: 11, ter: 0.18, accumulating: true },
    ],
    historicalReturn: 0.081,
    historicalReturnPeriod: '2005–2025',
    historicalReturnNote: 'data.strategies.monde-complet.historicalReturnNote',
    tob: 0.0012,
    color: '#4a7c44',
  },
  {
    id: 'tout-en-un',
    name: 'data.strategies.tout-en-un.name',
    tagline: 'data.strategies.tout-en-un.tagline',
    description: 'data.strategies.tout-en-un.description',
    etfs: [
      { ticker: 'IMIE', isin: 'IE00B3YLTY66', name: 'State Street SPDR MSCI All Country World Investable Market UCITS ETF (Acc)', allocation: 100, ter: 0.17, accumulating: true },
    ],
    historicalReturn: 0.08,
    historicalReturnPeriod: '2005–2025',
    historicalReturnNote: 'data.strategies.tout-en-un.historicalReturnNote',
    tob: 0.0012,
    color: '#1a4a16',
  },
  {
    id: 'esg-mondiale',
    name: 'data.strategies.esg-mondiale.name',
    tagline: 'data.strategies.esg-mondiale.tagline',
    description: 'data.strategies.esg-mondiale.description',
    etfs: [
      { ticker: 'XMAW', isin: 'IE00BK5BQV03', name: 'Xtrackers MSCI World ESG Screened UCITS ETF (Acc)', allocation: 100, ter: 0.20, accumulating: true },
    ],
    historicalReturn: 0.083,
    historicalReturnPeriod: '2005–2025',
    historicalReturnNote: 'data.strategies.esg-mondiale.historicalReturnNote',
    tob: 0.0012,
    color: '#6b8e23',
  },
  {
    id: 'biais-europe',
    name: 'data.strategies.biais-europe.name',
    tagline: 'data.strategies.biais-europe.tagline',
    description: 'data.strategies.biais-europe.description',
    etfs: [
      { ticker: 'IWDA', isin: 'IE00B4L5Y983', name: 'iShares Core MSCI World UCITS ETF (Acc)', allocation: 60, ter: 0.20, accumulating: true },
      { ticker: 'IEUR', isin: 'IE00B1YZSC51', name: 'iShares Core MSCI Europe UCITS ETF (Acc)', allocation: 40, ter: 0.12, accumulating: true },
    ],
    historicalReturn: 0.075,
    historicalReturnPeriod: '2005–2025',
    historicalReturnNote: 'data.strategies.biais-europe.historicalReturnNote',
    tob: 0.0012,
    color: '#3e5c76',
  },
  {
    id: 'anti-us',
    name: 'data.strategies.anti-us.name',
    tagline: 'data.strategies.anti-us.tagline',
    description: 'data.strategies.anti-us.description',
    etfs: [
      { ticker: 'IWDA', isin: 'IE00B4L5Y983', name: 'iShares Core MSCI World UCITS ETF (Acc)', allocation: 60, ter: 0.20, accumulating: true },
      { ticker: 'IEUR', isin: 'IE00B1YZSC51', name: 'iShares Core MSCI Europe UCITS ETF (Acc)', allocation: 20, ter: 0.12, accumulating: true },
      { ticker: 'ICHN', isin: 'IE00BQT38270', name: 'iShares MSCI China UCITS ETF (Acc)', allocation: 20, ter: 0.28, accumulating: true },
    ],
    historicalReturn: 0.068,
    historicalReturnPeriod: '2005–2025',
    historicalReturnNote: 'data.strategies.anti-us.historicalReturnNote',
    tob: 0.0012,
    color: '#778da9',
  },
  {
    id: 'biais-chine',
    name: 'data.strategies.biais-chine.name',
    tagline: 'data.strategies.biais-chine.tagline',
    description: 'data.strategies.biais-chine.description',
    etfs: [
      { ticker: 'IWDA', isin: 'IE00B4L5Y983', name: 'iShares Core MSCI World UCITS ETF (Acc)', allocation: 70, ter: 0.20, accumulating: true },
      { ticker: 'ICHN', isin: 'IE00BQT38270', name: 'iShares MSCI China UCITS ETF (Acc)', allocation: 30, ter: 0.28, accumulating: true },
    ],
    historicalReturn: 0.065,
    historicalReturnPeriod: '2005–2025',
    historicalReturnNote: 'data.strategies.biais-chine.historicalReturnNote',
    tob: 0.0012,
    color: '#c1121f',
  },
  {
    id: 'biais-us',
    name: 'data.strategies.biais-us.name',
    tagline: 'data.strategies.biais-us.tagline',
    description: 'data.strategies.biais-us.description',
    etfs: [
      { ticker: 'CSPX', isin: 'IE00B5BMR087', name: 'iShares Core S&P 500 UCITS ETF (Acc)', allocation: 100, ter: 0.07, accumulating: true },
    ],
    historicalReturn: 0.115,
    historicalReturnPeriod: '2005–2025',
    historicalReturnNote: 'data.strategies.biais-us.historicalReturnNote',
    tob: 0.0012,
    color: '#003049',
  },
  {
    id: 'tech-us',
    name: 'data.strategies.tech-us.name',
    tagline: 'data.strategies.tech-us.tagline',
    description: 'data.strategies.tech-us.description',
    etfs: [
      { ticker: 'CNDX', isin: 'IE00B53SZB19', name: 'iShares Nasdaq 100 UCITS ETF (Acc)', allocation: 100, ter: 0.33, accumulating: true },
    ],
    historicalReturn: 0.132,
    historicalReturnPeriod: '2005–2025',
    historicalReturnNote: 'data.strategies.tech-us.historicalReturnNote',
    tob: 0.0012,
    color: '#0077b6',
    warnings: [
      'data.strategies.tech-us.warning_0',
    ],
  },
  {
    id: 'dividendes',
    name: 'data.strategies.dividendes.name',
    tagline: 'data.strategies.dividendes.tagline',
    description: 'data.strategies.dividendes.description',
    etfs: [
      { ticker: 'VHYL', isin: 'IE00B8GKDB10', name: 'Vanguard FTSE All-World High Dividend Yield UCITS ETF (Dist)', allocation: 100, ter: 0.29, accumulating: false },
    ],
    historicalReturn: 0.078,
    historicalReturnPeriod: '2005–2025',
    historicalReturnNote: 'data.strategies.dividendes.historicalReturnNote',
    tob: 0.0012,
    color: '#ffd166',
    warnings: [
      'data.strategies.dividendes.warning_0',
    ],
  },
  {
    id: 'epargne-liquide',
    name: 'data.strategies.epargne-liquide.name',
    tagline: 'data.strategies.epargne-liquide.tagline',
    description: 'data.strategies.epargne-liquide.description',
    etfs: [
      { ticker: 'XEON', isin: 'LU0290358497', name: 'Xtrackers II EUR Overnight Rate Swap UCITS ETF (Acc)', allocation: 100, ter: 0.10, accumulating: true },
    ],
    historicalReturn: 0.03,
    historicalReturnPeriod: '2024–2025',
    historicalReturnNote: 'data.strategies.epargne-liquide.historicalReturnNote',
    tob: 0.0012,
    color: '#5b8fa8',
    warnings: [
      'data.strategies.epargne-liquide.warning_0',
      'data.strategies.epargne-liquide.warning_1',
      'data.strategies.epargne-liquide.warning_2',
    ],
  },
];
