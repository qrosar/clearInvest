export type ETFAllocation = {
  ticker: string;
  isin: string;
  name: string;
  allocation: number;      // percentage, e.g. 60 means 60%
  ter: number;             // percentage, e.g. 0.20 means 0.20% TER
  accumulating: boolean;
};

export type Strategy = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  complexity: 'simple' | 'intermediate';
  horizon: ('short' | 'long')[];
  esg: boolean;
  geographic: ('global' | 'europe' | 'us' | 'china' | 'emerging')[];
  etfs: ETFAllocation[];
  historicalReturn: number;         // decimal fraction, e.g. 0.085 = 8.5%
  historicalReturnPeriod: string;   // e.g. "2005–2025"
  historicalReturnNote?: string;    // optional explanatory note
  tob: number;                      // decimal fraction, e.g. 0.0012 = 0.12%
  color: string;
  warnings?: string[];
};

export const STRATEGIES: Strategy[] = [
  {
    id: 'monde-simplifie',
    name: 'Monde Simplifié',
    tagline: 'La solution la plus simple',
    description:
      'Un seul ETF qui réplique les performances des plus grandes entreprises mondiales. La stratégie la plus simple pour s\'exposer aux marchés développés — aucun rééquilibrage nécessaire.',
    complexity: 'simple',
    horizon: ['long'],
    esg: false,
    geographic: ['global'],
    etfs: [
      { ticker: 'IWDA', isin: 'IE00B4L5Y983', name: 'iShares Core MSCI World', allocation: 100, ter: 0.20, accumulating: true },
    ],
    historicalReturn: 0.085,
    historicalReturnPeriod: '2005–2025',
    historicalReturnNote: 'Basé sur l\'indice MSCI World en EUR, dividendes réinvestis',
    tob: 0.0012,
    color: '#2d5a35',
  },

  {
    id: 'monde-complet',
    name: 'Monde Complet',
    tagline: 'Développés + émergents',
    description:
      'Combine les marchés développés (89%) et émergents (11%) pour une exposition véritablement mondiale, y compris la Chine, l\'Inde et le Brésil. Légèrement plus volatile mais plus représentatif de l\'économie mondiale.',
    complexity: 'simple',
    horizon: ['long'],
    esg: false,
    geographic: ['global', 'emerging'],
    etfs: [
      { ticker: 'IWDA', isin: 'IE00B4L5Y983', name: 'iShares Core MSCI World', allocation: 89, ter: 0.20, accumulating: true },
      { ticker: 'EMIM', isin: 'IE00BKM4GZ66', name: 'iShares Core MSCI EM IMI', allocation: 11, ter: 0.18, accumulating: true },
    ],
    historicalReturn: 0.082,
    historicalReturnPeriod: '2005–2025',
    historicalReturnNote: 'Légèrement supérieur à IMIE grâce à l\'absence de small caps, qui ont sous-performé les large/mid caps sur la période 2005–2025. La composante émergente (11%) pèse peu sur le rendement global.',
    tob: 0.0012,
    color: '#3d7a45',
  },

  {
    id: 'tout-en-un',
    name: 'Tout-en-un',
    tagline: 'Le monde entier en un seul ETF',
    description:
      'Un unique ETF qui couvre développés et émergents dans leurs proportions naturelles. Idéal pour ceux qui veulent la simplicité absolue : un seul achat, zéro rééquilibrage.',
    complexity: 'simple',
    horizon: ['long'],
    esg: false,
    geographic: ['global', 'emerging'],
    etfs: [
      { ticker: 'IMIE', isin: 'IE00B3YLTY66', name: 'State Street SPDR MSCI All Country World Investable Market UCITS ETF (Acc)', allocation: 100, ter: 0.17, accumulating: true },
    ],
    historicalReturn: 0.08,
    historicalReturnPeriod: '2005–2025',
    historicalReturnNote: 'Légèrement inférieur à Monde Complet car IMIE inclut les small caps (large, mid ET small cap mondiaux), qui ont marginalement sous-performé sur la période 2005–2025. En contrepartie, IMIE offre une diversification plus complète (~99% de la capitalisation mondiale).',
    tob: 0.0012,
    color: '#4d8a55',
  },

  {
    id: 'esg-mondiale',
    name: 'ESG Mondiale',
    tagline: 'Investir selon ses valeurs',
    description:
      'Exposition mondiale aux marchés développés avec un filtre ESG qui exclut les entreprises controversées (armes, tabac, charbon thermique). Performance historique proche du marché global non filtré.',
    complexity: 'simple',
    horizon: ['long'],
    esg: true,
    geographic: ['global'],
    etfs: [
      { ticker: 'XMAW', isin: 'IE00BGHQ0G80', name: 'iShares MSCI World ESG Screened', allocation: 100, ter: 0.20, accumulating: true },
    ],
    historicalReturn: 0.083,
    historicalReturnPeriod: '2005–2025',
    historicalReturnNote: 'Suit de près le MSCI World avec une légère variation due aux exclusions ESG',
    tob: 0.0012,
    color: '#7a9e7e',
  },

  {
    id: 'biais-europe',
    name: 'Biais Europe',
    tagline: 'Surpondérer l\'Europe',
    description:
      'Combine une base mondiale (60%) avec une surpondération de l\'Europe (40%). Réduit l\'exposition aux États-Unis par rapport à un ETF Monde pur, avec un potentiel de rattrapage si les marchés européens surperforment.',
    complexity: 'intermediate',
    horizon: ['long'],
    esg: false,
    geographic: ['global', 'europe'],
    etfs: [
      { ticker: 'IWDA', isin: 'IE00B4L5Y983', name: 'iShares Core MSCI World', allocation: 60, ter: 0.20, accumulating: true },
      { ticker: 'IEUR', isin: 'IE00B4K48X80', name: 'iShares Core MSCI Europe', allocation: 40, ter: 0.12, accumulating: true },
    ],
    historicalReturn: 0.083,
    historicalReturnPeriod: '2005–2025',
    historicalReturnNote: 'L\'Europe a légèrement sous-performé les États-Unis sur cette période mais offre une meilleure valorisation actuelle',
    tob: 0.0012,
    color: '#1a5276',
  },

  {
    id: 'anti-us',
    name: 'Anti-US',
    tagline: 'Réduire l\'exposition aux États-Unis',
    description:
      'Pour les investisseurs qui souhaitent réduire significativement leur dépendance aux États-Unis (qui représentent ~65% d\'un ETF Monde). Diversifie vers l\'Europe et la Chine.',
    complexity: 'intermediate',
    horizon: ['long'],
    esg: false,
    geographic: ['global', 'europe', 'china'],
    etfs: [
      { ticker: 'IWDA', isin: 'IE00B4L5Y983', name: 'iShares Core MSCI World', allocation: 60, ter: 0.20, accumulating: true },
      { ticker: 'IEUR', isin: 'IE00B4K48X80', name: 'iShares Core MSCI Europe', allocation: 20, ter: 0.12, accumulating: true },
      { ticker: 'ICHN', isin: 'IE00BJ5JPG56', name: 'iShares MSCI China', allocation: 20, ter: 0.28, accumulating: true },
    ],
    historicalReturn: 0.065,
    historicalReturnPeriod: '2005–2025',
    historicalReturnNote: 'La Chine a pesé sur les rendements sur cette période (~4%/an). Cette stratégie est orientée vers l\'avenir et non optimisée pour la performance passée',
    tob: 0.0012,
    color: '#922b21',
  },

  {
    id: 'biais-chine',
    name: 'Biais Chine',
    tagline: 'Surpondérer la Chine',
    description:
      'Ajoute une exposition significative à la Chine (30%) au-delà de ce qu\'inclut un ETF Monde standard (~3%). Convient aux investisseurs convaincus du potentiel de rattrapage des marchés chinois à long terme.',
    complexity: 'intermediate',
    horizon: ['long'],
    esg: false,
    geographic: ['global', 'china'],
    etfs: [
      { ticker: 'IWDA', isin: 'IE00B4L5Y983', name: 'iShares Core MSCI World', allocation: 70, ter: 0.20, accumulating: true },
      { ticker: 'ICHN', isin: 'IE00BJ5JPG56', name: 'iShares MSCI China', allocation: 30, ter: 0.28, accumulating: true },
    ],
    historicalReturn: 0.068,
    historicalReturnPeriod: '2005–2025',
    historicalReturnNote: 'La Chine a sous-performé sur les 20 dernières années. Cette stratégie comporte un risque pays significatif',
    tob: 0.0012,
    color: '#c0392b',
  },

  {
    id: 'biais-us',
    name: 'Biais US',
    tagline: 'Miser sur les États-Unis',
    description:
      'Exposition concentrée sur les 500 plus grandes entreprises américaines via le S&P 500. L\'un des indices les plus performants historiquement, avec un TER très bas. Concentration géographique élevée.',
    complexity: 'simple',
    horizon: ['long'],
    esg: false,
    geographic: ['us'],
    etfs: [
      { ticker: 'CSPX', isin: 'IE00B5BMR087', name: 'iShares Core S&P 500', allocation: 100, ter: 0.07, accumulating: true },
    ],
    historicalReturn: 0.115,
    historicalReturnPeriod: '2005–2025',
    historicalReturnNote: 'Inclut un effet de change USD/EUR favorable sur cette période. Les performances passées ne préjugent pas des performances futures',
    tob: 0.0012,
    color: '#1a3a5c',
  },

  {
    id: 'tech-us',
    name: 'Tech US / Nasdaq',
    tagline: 'Miser sur la technologie américaine',
    description:
      'Exposition aux 100 plus grandes entreprises technologiques du Nasdaq. Rendements historiques élevés mais volatilité supérieure à un ETF mondial.',
    complexity: 'simple',
    horizon: ['long'],
    esg: false,
    geographic: ['us'],
    etfs: [
      { ticker: 'CNDX', isin: 'IE00B53SZB19', name: 'iShares Nasdaq-100 UCITS ETF', allocation: 100, ter: 0.33, accumulating: true },
    ],
    historicalReturn: 0.13,
    historicalReturnPeriod: '2005–2025',
    historicalReturnNote: 'Performance exceptionnelle portée par les géants tech américains. Volatilité élevée (-33% en 2022). Les performances passées ne préjugent pas des performances futures',
    tob: 0.0012,
    color: '#1a3a5c',
    warnings: [
      '⚠️ Concentration sectorielle élevée : ce fonds investit principalement dans la tech américaine. La volatilité est significativement plus élevée qu\'un ETF mondial. Les rendements passés exceptionnels (~13%/an) ne garantissent pas les performances futures.',
    ],
  },

  {
    id: 'dividendes',
    name: 'Revenu & Dividendes',
    tagline: 'Percevoir un revenu régulier',
    description:
      'Sélection d\'entreprises mondiales à dividendes élevés. Distribue les dividendes régulièrement, ce qui procure un flux de revenus. Fiscalement moins efficace qu\'un ETF accumulant en Belgique.',
    complexity: 'simple',
    horizon: ['long'],
    esg: false,
    geographic: ['global'],
    etfs: [
      { ticker: 'VHYL', isin: 'IE00B8GKDB10', name: 'Vanguard FTSE All-World High Div. Yield', allocation: 100, ter: 0.29, accumulating: false },
    ],
    historicalReturn: 0.075,
    historicalReturnPeriod: '2005–2025',
    historicalReturnNote: 'Rendement total avant la taxe de 30% sur les dividendes. Après fiscalité belge, le rendement effectif est significativement inférieur',
    tob: 0.0012,
    color: '#e8a94a',
    warnings: [
      '⚠️ ETF distributif : les dividendes perçus sont soumis à une taxe de 30% en Belgique. Cette stratégie convient aux investisseurs souhaitant un revenu régulier, mais elle est fiscalement moins efficace qu\'un ETF accumulant.',
    ],
  },

  {
    id: 'epargne-liquide',
    name: 'Épargne Liquide',
    tagline: 'Battre le compte épargne, sans risque',
    description:
      'Une alternative intelligente au compte épargne belge. XEON suit le taux interbancaire européen (€STR), offrant des rendements proches du taux directeur de la BCE avec une volatilité quasi nulle et une liquidité totale.',
    complexity: 'simple',
    horizon: ['short'],
    esg: false,
    geographic: ['europe'],
    etfs: [
      { ticker: 'XEON', isin: 'LU0290358497', name: 'Xtrackers II EUR Overnight Rate Swap UCITS ETF', allocation: 100, ter: 0.10, accumulating: true },
    ],
    historicalReturn: 0.029,
    historicalReturnPeriod: '2024–2025',
    historicalReturnNote: 'Suit le taux €STR (anciennement EONIA). Rendement variable selon le taux directeur BCE',
    tob: 0.0012,
    color: '#5b8fa8',
    warnings: [
      '⚠️ Le rendement suit le taux directeur BCE — il baissera si la BCE réduit ses taux.',
      '⚠️ L\'exemption Reynders repose sur la pratique fiscale actuelle, pas sur une loi codifiée. Ce traitement pourrait évoluer.',
      'ℹ️ Ne convient pas comme stratégie long terme — pour la croissance, préférez une stratégie actions.',
    ],
  },
];
