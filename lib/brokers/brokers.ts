export type RecommendedBadge = 'meilleur_cout' | 'meilleur_automation';
export type Profile = 'debutant' | 'dca' | 'avance';
export type Tier = 'recommended' | 'situational' | 'not_recommended' | 'avoid';

export type FeeItem = {
  label: string; // i18n key
  value: string; // i18n key or literal
  note?: string; // i18n key
  highlight?: 'good' | 'neutral' | 'bad';
};

export type Broker = {
  id: string;
  name: string;
  tagline: string; // i18n key
  recommendedBadge?: RecommendedBadge;
  tier: Tier;
  regulatedIn: string; // i18n key
  fees: {
    fixedFeePerTrade: string; // i18n key or literal
    percentFeePerTrade: string; // i18n key or literal
    fxFee: string; // i18n key or literal
    custodyFee: string; // i18n key or literal
    savingsPlanFee: string; // i18n key or literal
    note?: string; // i18n key
  };
  automation: {
    savingsPlan: boolean;
    tobAuto: boolean;
    cgtAuto: string; // i18n key: 'cgt_auto' | 'cgt_manual'
  };
  protection: string; // i18n key
  protectionAmount: string; // literal amount or i18n key
  pros: string[]; // array of i18n keys
  cons: string[]; // array of i18n keys
  idealFor?: string; // i18n key
  warningNote?: string; // i18n key
  feeStory: FeeItem[];
  guideLink?: { text: string; href: string };
};

export const BROKERS: Broker[] = [
  {
    id: 'medirect',
    name: 'MeDirect',
    tagline: 'medirect_tagline',
    recommendedBadge: 'meilleur_cout',
    tier: 'recommended',
    regulatedIn: 'regulated_be',
    fees: {
      fixedFeePerTrade: 'fees_free',
      percentFeePerTrade: '—',
      fxFee: 'medirect_fee_fx',
      custodyFee: 'fees_none',
      savingsPlanFee: 'fees_not_available',
    },
    automation: {
      savingsPlan: false,
      tobAuto: true,
      cgtAuto: 'cgt_auto',
    },
    protection: 'protection_be_100',
    protectionAmount: '€100.000',
    pros: ['medirect_pro_0', 'common_taxes_auto'],
    cons: ['medirect_con_0', 'medirect_con_1'],
    idealFor: 'medirect_ideal',
    warningNote: 'medirect_etf_note',
    feeStory: [
      { label: 'medirect_fs0_label', value: 'fees_free' },
    ],
  },
  {
    id: 'saxo',
    name: 'Saxo Bank',
    tagline: 'saxo_tagline',
    recommendedBadge: 'meilleur_automation',
    tier: 'recommended',
    regulatedIn: 'regulated_be',
    fees: {
      fixedFeePerTrade: '—',
      percentFeePerTrade: '0,08% (min €2)',
      fxFee: '0,25%',
      custodyFee: 'fees_none',
      savingsPlanFee: 'saxo_fee_savings',
    },
    automation: {
      savingsPlan: true,
      tobAuto: true,
      cgtAuto: 'cgt_auto',
    },
    protection: 'protection_be_100',
    protectionAmount: '€100.000',
    pros: ['saxo_pro_0', 'common_taxes_auto'],
    cons: ['saxo_con_0', 'saxo_con_1'],
    idealFor: 'saxo_ideal',
    feeStory: [
      { label: 'saxo_fs0_label', value: 'saxo_fs0_value', note: 'saxo_fs0_note' },
      { label: 'saxo_fs1_label', value: 'saxo_fs1_value' },
    ],
  },
  {
    id: 'bolero',
    name: 'Bolero',
    tagline: 'bolero_tagline',
    tier: 'situational',
    regulatedIn: 'regulated_be',
    fees: {
      fixedFeePerTrade: '€2,50',
      percentFeePerTrade: '—',
      fxFee: 'fees_none',
      custodyFee: 'fees_none',
      savingsPlanFee: 'bolero_fee_savings',
    },
    automation: {
      savingsPlan: true,
      tobAuto: true,
      cgtAuto: 'cgt_auto',
    },
    protection: 'protection_be_100',
    protectionAmount: '€100.000',
    pros: ['bolero_pro_0', 'common_taxes_auto', 'bolero_pro_2'],
    cons: ['bolero_con_0', 'bolero_con_1'],
    idealFor: 'bolero_ideal',
    feeStory: [
      { label: 'bolero_fs0_label', value: '€2,50 – €5,00', note: 'bolero_fs0_note' },
      { label: 'bolero_fs1_label', value: '€7,50 minimum' },
      { label: 'bolero_fs2_label', value: 'bolero_fs2_value' },
    ],
  },
  {
    id: 'degiro',
    name: 'DEGIRO',
    tagline: 'degiro_tagline',
    tier: 'situational',
    regulatedIn: 'regulated_eu',
    fees: {
      fixedFeePerTrade: '€1,00',
      percentFeePerTrade: '—',
      fxFee: '0,25% + €0,50',
      custodyFee: 'fees_none',
      savingsPlanFee: 'fees_not_available',
    },
    automation: {
      savingsPlan: false,
      tobAuto: true,
      cgtAuto: 'cgt_manual',
    },
    protection: 'protection_nl_20',
    protectionAmount: '€20.000',
    pros: ['degiro_pro_0', 'degiro_pro_1'],
    cons: ['degiro_con_0', 'degiro_con_1', 'degiro_con_3'],
    idealFor: 'degiro_ideal',
    warningNote: 'degiro_warning',
    feeStory: [
      { label: 'degiro_fs0_label', value: 'degiro_fs0_value' },
      { label: 'degiro_fs1_label', value: '€3,00 + 0,02%' },
      { label: 'degiro_fs2_label', value: 'fees_declare_manual' },
    ],
    guideLink: { text: 'guide_foreign_account', href: '/ressources/declarer-compte-etranger' },
  },
  {
    id: 'rebel',
    name: 'Re=Bel',
    tagline: 'rebel_tagline',
    tier: 'situational',
    regulatedIn: 'regulated_be',
    fees: {
      fixedFeePerTrade: '€1,00',
      percentFeePerTrade: '—',
      fxFee: '1,00%',
      custodyFee: 'fees_none',
      savingsPlanFee: 'fees_not_available',
      note: 'rebel_fees_table_note',
    },
    automation: {
      savingsPlan: false,
      tobAuto: true,
      cgtAuto: 'cgt_auto',
    },
    protection: 'protection_be_100',
    protectionAmount: '€100.000',
    pros: ['rebel_pro_0', 'common_taxes_auto'],
    cons: ['rebel_con_0', 'rebel_con_1', 'rebel_con_2'],
    idealFor: 'rebel_ideal',
    feeStory: [
      { label: 'rebel_fs0_label', value: 'rebel_fs0_value', highlight: 'good' },
      { label: 'rebel_fs1_label', value: 'rebel_fs1_value', note: 'rebel_fs1_note', highlight: 'neutral' },
    ],
  },
  {
    id: 'keytrade',
    name: 'Keytrade Bank',
    tagline: 'keytrade_tagline',
    tier: 'situational',
    regulatedIn: 'regulated_be',
    fees: {
      fixedFeePerTrade: '€2,45',
      percentFeePerTrade: '—',
      fxFee: 'fees_none',
      custodyFee: 'fees_none',
      savingsPlanFee: 'keytrade_fee_savings',
    },
    automation: {
      savingsPlan: false,
      tobAuto: true,
      cgtAuto: 'cgt_auto',
    },
    protection: 'protection_be_100',
    protectionAmount: '€100.000',
    pros: ['keytrade_pro_1', 'common_taxes_auto'],
    cons: ['keytrade_con_0', 'keytrade_con_1'],
    idealFor: 'keytrade_ideal',
    feeStory: [
      { label: 'keytrade_fs0_label', value: '€2,45' },
      { label: 'keytrade_fs1_label', value: '€5,95' },
    ],
  },
  {
    id: 'trade_republic',
    name: 'Trade Republic',
    tagline: 'trade_republic_tagline',
    tier: 'not_recommended',
    regulatedIn: 'regulated_eu',
    fees: {
      fixedFeePerTrade: '€1,00',
      percentFeePerTrade: '—',
      fxFee: 'fees_none',
      custodyFee: 'fees_none',
      savingsPlanFee: 'trade_republic_fee_savings',
    },
    automation: {
      savingsPlan: true,
      tobAuto: false,
      cgtAuto: 'cgt_manual',
    },
    protection: 'protection_de_100',
    protectionAmount: '€100.000',
    pros: ['trade_republic_pro_0', 'trade_republic_pro_1', 'trade_republic_pro_2'],
    cons: ['trade_republic_con_0', 'trade_republic_con_1', 'trade_republic_con_2'],
    idealFor: 'trade_republic_ideal',
    warningNote: 'trade_republic_warning',
    feeStory: [
      { label: 'trade_republic_fs0_label', value: 'fees_free' },
      { label: 'trade_republic_fs1_label', value: '€1,00' },
      { label: 'trade_republic_fs2_label', value: 'fees_declare_manual' },
    ],
    guideLink: { text: 'guide_foreign_account', href: '/ressources/declarer-compte-etranger' },
  },
  {
    id: 'ing',
    name: 'ING Belgique',
    tagline: 'ing_tagline',
    tier: 'not_recommended',
    regulatedIn: 'regulated_be',
    fees: {
      fixedFeePerTrade: '€1,00',
      percentFeePerTrade: '0,35%',
      fxFee: '1,00%',
      custodyFee: '0,0242%/mois',
      savingsPlanFee: 'ing_fee_savings',
    },
    automation: {
      savingsPlan: false,
      tobAuto: true,
      cgtAuto: 'cgt_auto',
    },
    protection: 'protection_be_100',
    protectionAmount: '€100.000',
    pros: ['ing_pro_1', 'ing_pro_2'],
    cons: ['ing_con_0', 'ing_con_1', 'ing_con_2'],
    idealFor: 'ing_ideal',
    warningNote: 'ing_warning',
    feeStory: [
      { label: 'ing_fs0_label', value: '0,35%' },
      { label: 'ing_fs1_label', value: 'ing_fs1_value', note: 'ing_fs1_note' },
    ],
  },
  {
    id: 'ibkr',
    name: 'Interactive Brokers',
    tagline: 'ibkr_tagline',
    tier: 'not_recommended',
    regulatedIn: 'regulated_eu',
    fees: {
      fixedFeePerTrade: '~€1,25',
      percentFeePerTrade: '0,05%',
      fxFee: 'ibkr_fee_fx',
      custodyFee: 'fees_none',
      savingsPlanFee: 'fees_not_available',
    },
    automation: {
      savingsPlan: false,
      tobAuto: false,
      cgtAuto: 'cgt_manual',
    },
    protection: 'protection_ie_20',
    protectionAmount: '€20.000',
    pros: ['ibkr_pro_0', 'ibkr_pro_1'],
    cons: [
      'ibkr_con_0',
      'ibkr_con_1',
      'common_nbb_required',
      'ibkr_con_3',
    ],
    idealFor: 'ibkr_ideal',
    warningNote: 'ibkr_warning',
    feeStory: [
      { label: 'ibkr_fs0_label', value: '~€1,25' },
      { label: 'ibkr_fs1_label', value: '0,05%' },
      { label: 'ibkr_fs2_label', value: 'fees_declare_manual' },
    ],
    guideLink: { text: 'guide_foreign_account', href: '/ressources/declarer-compte-etranger' },
  },
  {
    id: 'robinhood',
    name: 'Robinhood EU',
    tagline: 'robinhood_tagline',
    tier: 'avoid',
    regulatedIn: 'regulated_lt',
    fees: {
      fixedFeePerTrade: '—',
      percentFeePerTrade: '0,10% FX',
      fxFee: '0,10%',
      custodyFee: 'fees_none',
      savingsPlanFee: 'fees_not_available',
    },
    automation: {
      savingsPlan: false,
      tobAuto: false,
      cgtAuto: 'cgt_manual',
    },
    protection: 'protection_none',
    protectionAmount: '—',
    pros: ['robinhood_pro_0', 'robinhood_pro_1'],
    cons: ['robinhood_con_0', 'robinhood_con_1', 'robinhood_con_2', 'common_nbb_required', 'robinhood_con_4'],
    warningNote: 'robinhood_warning',
    feeStory: [
      { label: 'robinhood_fs0_label', value: '0,10%', note: 'robinhood_fs0_note' },
      { label: 'robinhood_fs1_label', value: 'fees_declare_manual', note: 'robinhood_fs1_note' },
    ],
  },
];
