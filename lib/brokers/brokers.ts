export type RecommendedBadge = 'meilleur_cout' | 'meilleur_automation';
export type Profile = 'debutant' | 'dca' | 'avance';
export type Tier = 'recommended' | 'situational' | 'not_recommended';

export type FeeItem = {
  label: string;
  value: string;
  highlight?: 'good' | 'bad' | 'neutral';
  note?: string;
};

export type Broker = {
  id: string;
  name: string;
  tagline: string;
  tier: Tier;
  regulatedInBelgium: boolean;
  investorProtection: string;
  recommendedBadge?: RecommendedBadge | null;
  profiles: Profile[];
  /** Narrative fee breakdown shown on the card */
  feeStory: FeeItem[];
  fees: {
    fixedFeePerTrade: string;
    percentFeePerTrade: string;
    savingsPlan?: string;
    custodyFee?: string;
    fxFee?: string;
    inactivityFee?: string;
    note?: string;
  };
  tax: {
    tobAutomated: boolean;
    dividendTaxAutomated: boolean;
    cgt2026Automated: boolean;
    cgt2026Level: 'high' | 'low';
    nbbDeclarationRequired: boolean;
  };
  features: {
    savingsPlan: boolean;
    savingsPlanDetails?: string;
    itsmeSupport: boolean;
    languages: string[];
    accountTypes: string[];
    mobileApp: boolean;
  };
  pros: string[];
  cons: string[];
  idealFor: string;
  warningNote?: string;
  guideLink?: { text: string; href: string };
  etfAvailabilityNote?: string;
};

export const BROKERS: Broker[] = [
  {
    id: 'medirect',
    name: 'MeDirect',
    tagline: "0% commission — parmi les options les moins chères en Belgique pour l'investissement passif en ETF",
    tier: 'recommended',
    regulatedInBelgium: true,
    investorProtection: "Cash : garanti jusqu'à €100.000 (fonds de garantie belge). ETF : actifs ségrégués du bilan du broker — restitués en cas de faillite.",
    recommendedBadge: 'meilleur_cout',
    profiles: ['debutant', 'dca'],
    feeStory: [
      { label: 'Achat/vente ETF', value: 'Gratuit', highlight: 'good' },
    ],
    fees: {
      fixedFeePerTrade: 'Gratuit',
      percentFeePerTrade: '—',
      savingsPlan: "Manuel (pas de plan automatique)",
      custodyFee: 'Aucun',
      fxFee: 'Inclus dans le taux de change',
    },
    tax: {
      tobAutomated: true,
      dividendTaxAutomated: true,
      cgt2026Automated: false,
      cgt2026Level: 'high',
      nbbDeclarationRequired: false,
    },
    features: {
      savingsPlan: false,
      itsmeSupport: true,
      languages: ['NL', 'FR', 'EN'],
      accountTypes: ['standard', 'joint'],
      mobileApp: true,
    },
    pros: [
      "0% commission sur les ETFs — aucun frais à chaque achat",
      "Toutes les taxes belges gérées automatiquement (TOB, précompte, CGT 2026)",
    ],
    cons: [
      "Pas de plan d'épargne automatique — ordres manuels uniquement",
      "Sélection d'ETFs limitée — certains ETFs de niche peuvent être absents",
    ],
    idealFor: "L'investisseur discipliné qui place manuellement chaque mois et veut le coût le plus bas possible.",
    etfAvailabilityNote: "Couvre les principaux ETFs recommandés (IMIE, IWDA, CSPX, EMIM, IEUR). Disponibilité des ETFs de niche (ICHN, XMAW, etc.) à vérifier directement sur la plateforme.",
  },
  {
    id: 'saxo',
    name: 'Saxo Bank Belgium',
    tagline: "La meilleure automatisation pour l'investisseur DCA",
    tier: 'recommended',
    regulatedInBelgium: true,
    investorProtection: "Cash : garanti jusqu'à €100.000 (fonds de garantie belge). ETF : actifs ségrégués du bilan du broker — restitués en cas de faillite.",
    recommendedBadge: 'meilleur_automation',
    profiles: ['dca', 'avance'],
    feeStory: [
      { label: 'AutoInvest (plan automatique)', value: '€2/mois', highlight: 'good', note: "Couvre autant d'ETFs que souhaité en un seul forfait mensuel" },
      { label: 'Achat manuel ETF', value: '0,08% (min €2)', highlight: 'neutral' },
    ],
    fees: {
      fixedFeePerTrade: '€2,00',
      percentFeePerTrade: '—',
      note: 'Tarif AutoInvest flat/mois. Hors AutoInvest: min €2,00 + 0,08%.',
      savingsPlan: 'AutoInvest — €2/mois flat',
      custodyFee: 'Aucun',
      fxFee: '0,25%',
    },
    tax: {
      tobAutomated: true,
      dividendTaxAutomated: true,
      cgt2026Automated: false,
      cgt2026Level: 'high',
      nbbDeclarationRequired: false,
    },
    features: {
      savingsPlan: true,
      savingsPlanDetails: "AutoInvest — €2/mois pour autant d'ETFs que souhaité",
      itsmeSupport: true,
      languages: ['NL', 'FR', 'EN'],
      accountTypes: ['standard', 'joint', 'corporate'],
      mobileApp: true,
    },
    pros: [
      "AutoInvest — €2/mois pour autant d'ETFs que souhaité, sans frais par ordre",
      "Toutes les taxes belges gérées automatiquement (TOB, précompte, CGT 2026)",
    ],
    cons: [
      "Pas de compte mineur",
      "Plateforme premium — peut sembler complexe pour les débutants",
    ],
    idealFor: "L'investisseur DCA qui veut tout automatiser sans se soucier de la fiscalité.",
  },
  {
    id: 'bolero',
    name: 'Bolero',
    tagline: 'La solution KBC — intégrée et entièrement belge',
    tier: 'situational',
    regulatedInBelgium: true,
    investorProtection: "Cash : garanti jusqu'à €100.000 (fonds de garantie belge). ETF : actifs ségrégués du bilan du broker — restitués en cas de faillite.",
    recommendedBadge: null,
    profiles: ['debutant', 'dca'],
    feeStory: [
      { label: 'ETF Playlist', value: '€2,50 – €5,00', highlight: 'neutral', note: '€2,50 pour ordres ≤€250, €5,00 pour ≤€1.000' },
      { label: 'ETF hors Playlist', value: '€7,50 minimum', highlight: 'bad' },
      { label: 'Invest & Repeat (plan auto)', value: 'Même tarif Playlist', highlight: 'neutral' },
    ],
    fees: {
      fixedFeePerTrade: '€2,50',
      percentFeePerTrade: '—',
      note: 'Tarif ETF Playlist. Hors Playlist: €7,50 minimum.',
      savingsPlan: 'Invest & Repeat (ordres périodiques)',
      custodyFee: 'Aucun',
      fxFee: 'N/A',
    },
    tax: {
      tobAutomated: true,
      dividendTaxAutomated: true,
      cgt2026Automated: false,
      cgt2026Level: 'high',
      nbbDeclarationRequired: false,
    },
    features: {
      savingsPlan: true,
      savingsPlanDetails: 'Invest & Repeat (ordres périodiques)',
      itsmeSupport: true,
      languages: ['NL', 'FR'],
      accountTypes: ['standard', 'joint', 'minor', 'corporate'],
      mobileApp: true,
    },
    pros: [
      "Invest & Repeat — plans d'épargne automatiques sur les ETFs de la Playlist",
      "Toutes les taxes belges gérées automatiquement (TOB, précompte, CGT 2026)",
      "Comptes mineurs et entreprise disponibles",
    ],
    cons: [
      "Frais élevés hors Playlist (€7,50 minimum)",
      "Intégration optimale avec un compte KBC/CBC",
    ],
    idealFor: "Les clients KBC qui veulent une solution intégrée et automatisée avec support local.",
  },
  {
    id: 'degiro',
    name: 'DEGIRO',
    tagline: 'Frais ultra-bas, mais gestion fiscale partielle',
    tier: 'situational',
    regulatedInBelgium: false,
    investorProtection: "Cash : garanti jusqu'à €20.000 (Pays-Bas). ETF : actifs ségrégués — restitués en cas de faillite.",
    recommendedBadge: null,
    profiles: ['avance'],
    feeStory: [
      { label: 'ETF sélection core (Tradegate)', value: '€1,00 par achat', highlight: 'good' },
      { label: 'ETF hors core', value: '€3,00 + 0,02%', highlight: 'neutral' },
      { label: '⚠️ Précompte & CGT 2026', value: 'À déclarer manuellement', highlight: 'bad' },
    ],
    fees: {
      fixedFeePerTrade: '€1,00',
      percentFeePerTrade: '—',
      note: 'Sélection core uniquement. Hors core: €3,00 + 0,02%.',
      savingsPlan: 'Non disponible',
      custodyFee: 'Aucun',
      fxFee: '0,25% + €0,50',
    },
    tax: {
      tobAutomated: true,
      dividendTaxAutomated: false,
      cgt2026Automated: false,
      cgt2026Level: 'low',
      nbbDeclarationRequired: true,
    },
    features: {
      savingsPlan: false,
      itsmeSupport: false,
      languages: ['NL', 'FR'],
      accountTypes: ['standard', 'joint'],
      mobileApp: true,
    },
    pros: [
      "Frais ultra-bas — €1 pour les ETFs core sur Tradegate",
      "TOB automatisée malgré broker étranger",
    ],
    cons: [
      "Précompte mobilier et CGT 2026 à déclarer manuellement",
      "Pas de plan d'épargne automatique",
      "Déclaration NBB requise — compte étranger à déclarer au fisc belge",
      "Frais de connectivité €2,50/an par bourse utilisée",
    ],
    idealFor: "L'investisseur averti qui accepte la charge administrative pour minimiser les coûts.",
    warningNote: "La TOB est automatisée, mais le précompte mobilier sur dividendes et la taxe sur plus-values 2026 sont à déclarer manuellement.",
    guideLink: { text: "Guide : déclarer son compte étranger", href: "/ressources/declarer-compte-etranger" },
  },
  {
    id: 'rebel',
    name: 'Re=Bel (Belfius)',
    tagline: 'La solution Belfius — €1 pour les 18–24 ans',
    tier: 'situational',
    regulatedInBelgium: true,
    investorProtection: "Cash : garanti jusqu'à €100.000 (fonds de garantie belge). ETF : actifs ségrégués du bilan du broker — restitués en cas de faillite.",
    recommendedBadge: null,
    profiles: ['debutant'],
    feeStory: [
      { label: 'Achat ETF (18–24 ans)', value: '€1,00 fixe', highlight: 'good' },
      { label: 'Achat ETF (25 ans et +)', value: '€3,00 – €6,00', highlight: 'neutral' },
    ],
    fees: {
      fixedFeePerTrade: '€3,00',
      percentFeePerTrade: '—',
      savingsPlan: 'Non disponible',
      custodyFee: 'Aucun',
      fxFee: '1,00% (élevé)',
    },
    tax: {
      tobAutomated: true,
      dividendTaxAutomated: true,
      cgt2026Automated: false,
      cgt2026Level: 'high',
      nbbDeclarationRequired: false,
    },
    features: {
      savingsPlan: false,
      itsmeSupport: true,
      languages: ['NL', 'FR'],
      accountTypes: ['standard', 'joint'],
      mobileApp: true,
    },
    pros: [
      "€1 flat pour les investisseurs de 18 à 24 ans — tarif unique sur le marché",
      "Toutes les taxes belges gérées automatiquement (TOB, précompte, CGT 2026)",
    ],
    cons: [
      "Pas de plan d'épargne automatique",
      "Tarif moins attractif après 25 ans (€3–€6 selon montant)",
      "Nécessite un compte courant Belfius",
    ],
    idealFor: "Les clients Belfius, et particulièrement les jeunes investisseurs (18–24 ans) bénéficiant du tarif €1.",
  },
  {
    id: 'keytrade',
    name: 'Keytrade Bank',
    tagline: 'La banque belge classique — fiable mais parmi les plus chères',
    tier: 'situational',
    regulatedInBelgium: true,
    investorProtection: "Cash : garanti jusqu'à €100.000 (fonds de garantie belge). ETF : actifs ségrégués du bilan du broker — restitués en cas de faillite.",
    recommendedBadge: null,
    profiles: ['debutant'],
    feeStory: [
      { label: 'Achat ETF (≤€250)', value: '€2,45', highlight: 'neutral' },
      { label: 'Achat ETF (≤€2.500)', value: '€5,95', highlight: 'bad' },
    ],
    fees: {
      fixedFeePerTrade: '€2,45',
      percentFeePerTrade: '—',
      note: "Pour ordres jusqu'à €250. De €250 à €2.500: €5,95.",
      savingsPlan: 'Keyplan (fonds uniquement, pas ETFs individuels)',
      custodyFee: 'Aucun',
      fxFee: 'N/A',
    },
    tax: {
      tobAutomated: true,
      dividendTaxAutomated: true,
      cgt2026Automated: false,
      cgt2026Level: 'high',
      nbbDeclarationRequired: false,
    },
    features: {
      savingsPlan: false,
      itsmeSupport: false,
      languages: ['NL', 'FR', 'EN'],
      accountTypes: ['standard', 'joint', 'minor', 'corporate'],
      mobileApp: true,
    },
    pros: [
      "Toutes les taxes belges gérées automatiquement (TOB, précompte, CGT 2026)",
      "Comptes mineurs et entreprise disponibles",
    ],
    cons: [
      "Frais de transaction parmi les plus élevés (jusqu'à €5,95 par ordre)",
      "Pas de plan d'épargne pour ETFs — Keyplan limité aux fonds",
    ],
    idealFor: "Les investisseurs cherchant une banque belge fiable avec comptes mineurs, acceptant des frais légèrement plus élevés.",
  },
  {
    id: 'trade-republic',
    name: 'Trade Republic',
    tagline: "Plans d'épargne à €0, mais fiscalité 100% manuelle",
    tier: 'situational',
    regulatedInBelgium: false,
    investorProtection: "Cash : garanti jusqu'à €100.000 (Allemagne). ETF : actifs ségrégués — restitués en cas de faillite.",
    recommendedBadge: null,
    profiles: ['avance'],
    feeStory: [
      { label: "Plan d'épargne automatique", value: 'Gratuit', highlight: 'good' },
      { label: 'Achat manuel', value: '€1,00 fixe', highlight: 'good' },
      { label: '⚠️ TOB, précompte, CGT 2026', value: 'Entièrement en manuel', highlight: 'bad' },
    ],
    fees: {
      fixedFeePerTrade: 'Gratuit',
      percentFeePerTrade: '—',
      note: "Plan d'épargne uniquement. Achat manuel: €1,00 fixe.",
      savingsPlan: "Plans d'épargne automatiques — €0 commission",
      custodyFee: 'Aucun',
      fxFee: 'N/A',
    },
    tax: {
      tobAutomated: false,
      dividendTaxAutomated: false,
      cgt2026Automated: false,
      cgt2026Level: 'low',
      nbbDeclarationRequired: true,
    },
    features: {
      savingsPlan: true,
      savingsPlanDetails: "Plans d'épargne automatiques à €0",
      itsmeSupport: false,
      languages: ['NL', 'FR', 'EN'],
      accountTypes: ['standard', 'enfant'],
      mobileApp: true,
    },
    pros: [
      "Plans d'épargne automatiques entièrement gratuits",
      "2% d'intérêts sur les liquidités (jusqu'à €50.000)",
      "Compte enfant disponible",
    ],
    cons: [
      "⚠️ TOB à déclarer au plus tard à la fin du 2e mois suivant la transaction — risque d'amende",
      "Précompte mobilier et CGT 2026 à déclarer manuellement",
      "Les intérêts sur liquidités (2% jusqu'à €50.000) sont versés bruts — à déclarer manuellement dans votre déclaration fiscale annuelle",
      "Déclaration NBB requise — compte étranger à déclarer au fisc belge",
    ],
    idealFor: "Uniquement pour investisseurs rigoureusement organisés qui gèrent eux-mêmes toute leur fiscalité belge.",
    warningNote: "⚠️ La TOB doit être payée manuellement au Trésor belge au plus tard à la fin du 2e mois suivant chaque transaction. La CGT 2026, le précompte mobilier et les intérêts sur liquidités sont également à déclarer manuellement. Des amendes s'appliquent en cas de non-déclaration.",
    guideLink: { text: "Guide : déclarer son compte étranger", href: "/ressources/declarer-compte-etranger" },
  },
  {
    id: 'ing',
    name: 'ING Self Invest',
    tagline: 'La solution ING — intégrée mais attention aux frais de garde',
    tier: 'not_recommended',
    regulatedInBelgium: true,
    investorProtection: "Cash : garanti jusqu'à €100.000 (fonds de garantie belge). ETF : actifs ségrégués du bilan du broker — restitués en cas de faillite.",
    recommendedBadge: null,
    profiles: ['debutant'],
    feeStory: [
      { label: 'Achat ETF', value: '0,35% (min €1)', highlight: 'neutral' },
      { label: '⚠️ Frais de garde', value: '0,0242%/mois (~0,29%/an)', highlight: 'bad', note: '€290/an pour €100.000 investis — rare parmi les brokers comparés ici' },
    ],
    fees: {
      fixedFeePerTrade: '€1,00',
      percentFeePerTrade: '0,35%',
      note: 'Frais de garde 0,29%/an en plus sur la valeur totale du portefeuille.',
      savingsPlan: 'ING Easy Invest (fonds uniquement, pas ETFs)',
      custodyFee: '0,0242%/mois (~0,29%/an — soit €290/an pour €100.000 investis)',
      fxFee: '1,00% (élevé)',
    },
    tax: {
      tobAutomated: true,
      dividendTaxAutomated: true,
      cgt2026Automated: false,
      cgt2026Level: 'high',
      nbbDeclarationRequired: false,
    },
    features: {
      savingsPlan: false,
      itsmeSupport: true,
      languages: ['NL', 'FR', 'EN'],
      accountTypes: ['standard', 'joint', 'minor'],
      mobileApp: true,
    },
    pros: [
      "Toutes les taxes belges gérées automatiquement (TOB, précompte, CGT 2026)",
      "Compte mineur disponible",
      "Intégré à l'application ING — gestion depuis l'environnement bancaire",
    ],
    cons: [
      "⚠️ Frais de garde de 0,29%/an — rare parmi les brokers comparés ici",
      "Pas de plan d'épargne ETF automatique",
      "Frais de transaction élevés (0,35% par ordre)",
    ],
    idealFor: "Les clients ING cherchant une solution intégrée, mais attention aux frais de garde sur les gros portefeuilles.",
    warningNote: "Les frais de garde représentent €290/an sur un portefeuille de €100.000 — rare parmi les brokers comparés ici, à prendre en compte sur le long terme.",
  },
  {
    id: 'ibkr',
    name: 'Interactive Brokers',
    tagline: 'La plateforme des professionnels — puissante mais complexe',
    tier: 'not_recommended',
    regulatedInBelgium: false,
    investorProtection: "Cash : garanti jusqu'à €20.000 (Irlande). ETF : actifs ségrégués — restitués en cas de faillite.",
    recommendedBadge: null,
    profiles: ['avance'],
    feeStory: [
      { label: 'Achat ETF (Tiered)', value: '0,05% (min ~€1,25)', highlight: 'neutral' },
      { label: '⚠️ Fiscalité belge', value: 'Entièrement en manuel', highlight: 'bad' },
    ],
    fees: {
      fixedFeePerTrade: '—',
      percentFeePerTrade: '0,05%',
      note: 'Minimum ~€1,25 par ordre (tarif Tiered).',
      savingsPlan: 'Non disponible',
      custodyFee: 'Aucun',
      fxFee: 'Quasi nul (taux spot)',
    },
    tax: {
      tobAutomated: false,
      dividendTaxAutomated: false,
      cgt2026Automated: false,
      cgt2026Level: 'low',
      nbbDeclarationRequired: true,
    },
    features: {
      savingsPlan: false,
      itsmeSupport: false,
      languages: ['FR', 'EN'],
      accountTypes: ['standard', 'joint', 'corporate', 'family'],
      mobileApp: true,
    },
    pros: [
      "Accès mondial — marchés US, obligations, options, et plus",
      "Frais de transaction parmi les plus bas pour grandes sommes (0,05%)",
    ],
    cons: [
      "Aucune taxe belge automatisée — TOB, précompte et CGT 2026 entièrement en manuel",
      "Pas de plan d'épargne automatique",
      "Déclaration NBB requise — compte étranger à déclarer au fisc belge",
      "Interface professionnelle complexe — pas pour débutants",
    ],
    idealFor: "Investisseurs avancés avec portefeuilles complexes ou besoins multi-devises, prêts à gérer leur fiscalité belge eux-mêmes.",
    warningNote: "⚠️ Aucune taxe belge n'est automatisée. Réservé aux investisseurs expérimentés capables de gérer leur fiscalité belge de façon autonome.",
    guideLink: { text: "Guide : déclarer son compte étranger", href: "/ressources/declarer-compte-etranger" },
  },
];
