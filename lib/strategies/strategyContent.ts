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

const FISCAL_STANDARD =
  'TOB de 0,12% à l\'achat et à la vente. Taxe sur plus-values de 10% sur les gains nets annuels dépassant la franchise de 10\u202F000\u00A0€ — la totalité des gains est taxée à 10% dès que le seuil est franchi (pas seulement l\'excédent). La franchise non utilisée est reportable jusqu\'à 15\u202F000\u00A0€ sur 5 ans. Fonds accumulants : pas de précompte mobilier annuel sur les dividendes réinvestis automatiquement. Les taux utilisés sont indicatifs — les performances passées ne garantissent pas les performances futures.';

const FISCAL_DISTRIBUTING =
  'TOB de 0,12% à l\'achat et à la vente. Taxe de 30% (précompte mobilier) sur chaque versement de dividende. Cette charge fiscale récurrente réduit significativement le rendement net par rapport à un ETF accumulant équivalent. Les taux utilisés sont indicatifs — les performances passées ne garantissent pas les performances futures.';

const FISCAL_REYNDERS =
  'TOB de 0,12% à l\'achat et à la vente. Taxe Reynders de 30% sur les plus-values à la vente, applicable car ce fonds détient plus de 10% d\'obligations. Cette taxe s\'applique à la totalité des gains — aucune exemption de €10.000. Les taux utilisés sont indicatifs — les performances passées ne garantissent pas les performances futures.';

export const STRATEGY_CONTENT: Record<string, StrategyContent> = {

  'monde-simplifie': {
    numberOfSecurities: 1400,
    hasReynders: false,
    hasDistributing: false,
    whyPoints: [
      'TOB de 0,12% : le compartiment accumulant d\'IWDA n\'est pas enregistré en Belgique auprès de la FSMA — la taxe boursière réduite de 0,12% s\'applique à l\'achat et à la vente.',
      'Pas de précompte mobilier annuel sur les dividendes : IWDA est un fonds accumulant — les dividendes sont réinvestis automatiquement dans le fonds, sans prélèvement du précompte mobilier belge de 30%.',
      'Diversification en 1 clic : l\'indice MSCI World couvre environ 1.400 des plus grandes entreprises dans 23 pays développés — États-Unis, Europe, Japon, etc. — dans leurs proportions naturelles.',
      'TER compétitif : à 0,20%/an, c\'est l\'un des ETFs monde les plus accessibles du marché belge.',
    ],
    alternatives: [
      {
        ticker: 'SWRD',
        isin: 'IE00BFY0GT14',
        name: 'SPDR MSCI World UCITS ETF Acc',
        ter: 0.12,
        tob: 0.0012,
        accumulating: true,
        pros: ['TER de 0,12% — 40% moins cher qu\'IWDA', 'Même indice MSCI World', 'TOB 0,12%'],
        cons: ['Liquidité légèrement inférieure à IWDA', 'AUM plus faible (~€6 mrd vs ~€80 mrd pour IWDA)'],
        verdict: 'Excellent choix si votre broker propose des transactions gratuites sur SPDR. Le TER plus bas compense la liquidité légèrement inférieure sur le long terme.',
      },
      {
        ticker: 'IMIE',
        isin: 'IE00B3YLTY66',
        name: 'State Street SPDR MSCI All Country World Investable Market UCITS ETF (Acc)',
        ter: 0.17,
        tob: 0.0012,
        accumulating: true,
        pros: ['Inclut les marchés émergents + small caps (~9\u202F000 entreprises selon l\'indice MSCI ACWI IMI, ~4\u202F500 détenues via échantillonnage représentatif)', 'TER légèrement inférieur (0,17%)', 'TOB 0,12%'],
        cons: ['Un seul émetteur gère tout (SPDR)', 'Légèrement plus volatile (exposition aux émergents)'],
        verdict: 'L\'upgrade naturel si vous voulez une diversification mondiale complète. C\'est la stratégie "Tout-en-un" de ce site.',
      },
      {
        ticker: 'VWCE',
        isin: 'IE00BK5BQT80',
        name: 'Vanguard FTSE All-World UCITS ETF Acc',
        ter: 0.19,
        tob: 0.0132,
        accumulating: true,
        pros: ['Grande liquidité (~€30 mrd d\'AUM)', 'Marque Vanguard reconnue', 'Inclut les marchés émergents'],
        cons: ['TOB potentiellement de 1,32% selon le broker — certains appliquent 0,12%, d\'autres 1,32%. À vérifier avant d\'investir', 'TER de 0,19% — plus élevé', 'Pas de small caps'],
        verdict: 'À éviter pour les investisseurs belges — le TOB applicable varie selon le broker — de 0,12% à 1,32%. Dans le pire cas, vous payez €132 en taxes sur €10.000 contre €12 avec IMIE. À vérifier impérativement auprès de votre broker avant tout achat.',
      },
    ],
    fiscalNote: FISCAL_STANDARD,
  },

  'monde-complet': {
    numberOfSecurities: 3600,
    hasReynders: false,
    hasDistributing: false,
    whyPoints: [
      'TOB de 0,12% sur les deux ETFs : IWDA (marchés développés) et EMIM (marchés émergents) sont tous les deux soumis au TOB réduit de 0,12%, contrairement à certains ETFs monde tout-en-un.',
      'Exposition aux marchés émergents : en ajoutant EMIM (11%), vous investissez dans des économies à forte croissance — Inde, Brésil, Taiwan, Corée — sous-représentées dans un ETF monde pur.',
      'Fonds 100% accumulants : pas de précompte mobilier annuel sur les dividendes (fonds accumulants — dividendes réinvestis automatiquement dans les deux fonds).',
      'Contrôle de l\'allocation : vous pouvez ajuster la pondération émergents/développés selon vos convictions (ex. 80/20 plutôt que 89/11) — impossible avec un ETF tout-en-un.',
    ],
    alternatives: [
      {
        ticker: 'IMIE',
        isin: 'IE00B3YLTY66',
        name: 'State Street SPDR MSCI All Country World Investable Market UCITS ETF (Acc)',
        ter: 0.17,
        tob: 0.0012,
        accumulating: true,
        pros: ['Un seul ETF — zéro rééquilibrage', 'Inclut aussi les small caps (~9.000 titres)', 'TER compétitif à 0,17%'],
        cons: ['Pas de flexibilité sur la pondération émergents', 'Un seul émetteur (concentration émetteur)'],
        verdict: 'Si vous voulez la même exposition mais en 1 seul ETF, IMIE est plus simple et pas plus cher.',
      },
      {
        ticker: 'FWRA',
        isin: 'IE000716YHJ7',
        name: 'Invesco FTSE All-World UCITS ETF Acc',
        ter: 0.15,
        tob: 0.0012,
        accumulating: true,
        pros: ['TER de 0,15% — moins cher que IWDA + EMIM combinés', 'Un seul ETF', 'Inclut les émergents', 'TOB 0,12%'],
        cons: ['Lancé en 2023 — historique limité', 'Suit l\'indice FTSE (pas MSCI) — légères différences de composition', 'Pas de small caps'],
        verdict: 'Bonne alternative si vous cherchez un tout-en-un moins cher que IMIE sans les small caps.',
      },
      {
        ticker: 'VWCE',
        isin: 'IE00BK5BQT80',
        name: 'Vanguard FTSE All-World UCITS ETF Acc',
        ter: 0.19,
        tob: 0.0132,
        accumulating: true,
        pros: ['Très grande liquidité', 'Un seul ETF incluant développés + émergents'],
        cons: ['TOB potentiellement de 1,32% selon le broker — certains appliquent 0,12%, d\'autres 1,32%. À vérifier avant d\'investir', 'TER plus élevé', 'Pas de small caps'],
        verdict: 'À éviter pour les investisseurs belges — le TOB applicable varie selon le broker — de 0,12% à 1,32%. Dans le pire cas, vous payez €132 en taxes sur €10.000 contre €12 avec IMIE. À vérifier impérativement auprès de votre broker avant tout achat.',
      },
    ],
    fiscalNote: FISCAL_STANDARD,
  },

  'tout-en-un': {
    numberOfSecurities: 9000,
    hasReynders: false,
    hasDistributing: false,
    whyPoints: [
      'TOB de 0,12% : contrairement à VWCE qui est enregistré en Belgique et soumis à 1,32% de TOB, IMIE n\'est pas enregistré en Belgique — vous ne payez que 0,12% à l\'achat et à la vente.',
      'Pas de précompte mobilier annuel sur les dividendes : IMIE est un fonds accumulant — les dividendes sont réinvestis automatiquement, sans déclenchement du précompte mobilier de 30%.',
      'Pas de taxe Reynders (ETF purement actions, 0% d\'obligations) : cette taxe s\'applique uniquement aux fonds détenant plus de 10% d\'obligations — IMIE en est exempt.',
      'Diversification maximale : l\'indice MSCI ACWI IMI couvre ~9\u202F000 entreprises selon l\'indice (l\'ETF en détient ~4\u202F500 via échantillonnage représentatif — la diversification effective est équivalente), couvrant les marchés développés, émergents, et small caps — environ 99% du marché boursier mondial investissable.',
    ],
    alternatives: [
      {
        ticker: 'WEBN',
        isin: 'IE0003XJA0J9',
        name: 'Amundi Prime All Country World UCITS ETF Acc',
        ter: 0.07,
        tob: 0.0012,
        accumulating: true,
        pros: ['TER extrêmement bas (0,07%) — le moins cher du marché', 'Réplication physique complète', 'TOB 0,12%'],
        cons: ['Lancé en juin 2024 — très court historique', 'Suit l\'indice Solactive (moins connu que MSCI)', 'Pas de small caps', 'Amundi a un historique de fusions et changements de règles d\'indice', 'AUM plus faible (~€1,2 mrd vs €4,4 mrd pour IMIE)'],
        verdict: 'Intéressant pour son coût, mais manque de track record et exclut les small caps.',
      },
      {
        ticker: 'IWDA + EMIM',
        isin: 'IE00B4L5Y983 + IE00BKM4GZ66',
        name: 'iShares MSCI World + iShares Core MSCI EM IMI',
        ter: 0.198,
        tob: 0.0012,
        accumulating: true,
        pros: ['IWDA est l\'ETF le plus liquide d\'Europe', 'Flexibilité pour ajuster l\'exposition aux émergents', 'TOB 0,12% sur les deux'],
        cons: ['Requiert un rééquilibrage manuel (split ~89/11)', 'Deux transactions = deux frais de courtage à chaque achat', 'Pas de small caps'],
        verdict: 'Bonne alternative si votre broker favorise IWDA, mais IMIE fait tout ça automatiquement.',
      },
      {
        ticker: 'FWRA',
        isin: 'IE000716YHJ7',
        name: 'Invesco FTSE All-World UCITS ETF Acc',
        ter: 0.15,
        tob: 0.0012,
        accumulating: true,
        pros: ['TER de 0,15% — moins cher qu\'IMIE', 'Suit l\'indice FTSE All-World (reconnu)', 'TOB 0,12%'],
        cons: ['Lancé en 2023 — historique limité', 'Pas de small caps (large & mid cap uniquement)', 'AUM encore modeste'],
        verdict: 'Bonne option budget si les small caps ne vous importent pas.',
      },
      {
        ticker: 'VWCE',
        isin: 'IE00BK5BQT80',
        name: 'Vanguard FTSE All-World UCITS ETF Acc',
        ter: 0.19,
        tob: 0.0132,
        accumulating: true,
        pros: ['Très grande liquidité (~€31 mrd d\'AUM)', 'Marque Vanguard réputée', 'Long historique'],
        cons: ['TOB potentiellement de 1,32% selon le broker — certains appliquent 0,12%, d\'autres 1,32%. À vérifier avant d\'investir', 'Pas de small caps', 'TER de 0,19% — plus élevé'],
        verdict: 'À éviter pour les investisseurs belges — le TOB applicable varie selon le broker — de 0,12% à 1,32%. Dans le pire cas, vous payez €132 en taxes sur €10.000 contre €12 avec IMIE. À vérifier impérativement auprès de votre broker avant tout achat.',
      },
    ],
    fiscalNote: FISCAL_STANDARD,
  },

  'esg-mondiale': {
    numberOfSecurities: 700,
    hasReynders: false,
    hasDistributing: false,
    whyPoints: [
      'Exclusions ESG Screened : XMAW exclut les entreprises impliquées dans les armes controversées, le tabac, le charbon thermique et les sociétés ayant des violations graves des normes ESG — environ 10 à 15% des entreprises du MSCI World sont filtrées.',
      'Performance proche du marché : l\'indice MSCI World ESG Screened a historiquement suivi de très près le MSCI World classique — les exclusions n\'ont pas significativement pénalisé le rendement sur 20 ans.',
      'TOB de 0,12% et fonds accumulant : mêmes avantages fiscaux que IWDA — pas de précompte sur dividendes, TOB réduit.',
      'Approche "screened" vs "SRI" : XMAW applique un filtre d\'exclusion léger (controverses majeures) plutôt qu\'un score ESG positif strict — ce qui conserve une large diversification tout en excluant les cas les plus problématiques.',
    ],
    alternatives: [
      {
        ticker: 'SUWS',
        isin: 'IE00BYX2JD69',
        name: 'iShares MSCI World SRI UCITS ETF Acc',
        ter: 0.20,
        tob: 0.0012,
        accumulating: true,
        pros: ['Critères SRI plus stricts (score ESG positif requis)', 'Même émetteur iShares = fiabilité', 'TOB 0,12%'],
        cons: ['Univers d\'investissement plus réduit (~400 titres)', 'Historiquement plus volatile que XMAW', 'Performance peut dévier davantage du marché'],
        verdict: 'Pour les investisseurs souhaitant des critères ESG plus exigeants, au prix d\'une moindre diversification.',
      },
      {
        ticker: 'XDEQ',
        isin: 'IE00BZ0PKT83',
        name: 'Xtrackers MSCI World ESG Screened Swap UCITS ETF Acc',
        ter: 0.07,
        tob: 0.0012,
        accumulating: true,
        pros: ['TER très bas (0,07%) — le moins cher parmi les ETFs ESG monde', 'Mêmes exclusions ESG Screened que XMAW', 'TOB 0,12%'],
        cons: ['Réplication synthétique (swap) — risque de contrepartie résiduel', 'AUM plus faible', 'Historique limité'],
        verdict: 'Excellent pour réduire les coûts tout en gardant un filtre ESG similaire — si vous êtes à l\'aise avec la réplication synthétique.',
      },
      {
        ticker: 'IWDA',
        isin: 'IE00B4L5Y983',
        name: 'iShares Core MSCI World UCITS ETF Acc',
        ter: 0.20,
        tob: 0.0012,
        accumulating: true,
        pros: ['Plus grande liquidité (~€80 mrd AUM)', 'Aucune contrainte de sélection ESG'],
        cons: ['Aucun filtre ESG — inclut toutes les industries', 'Même TER que XMAW pour une exposition plus large'],
        verdict: 'Si les critères ESG sont accessoires pour vous, IWDA offre la liquidité maximale au même coût.',
      },
    ],
    fiscalNote: FISCAL_STANDARD,
  },

  'biais-europe': {
    numberOfSecurities: 1800,
    hasReynders: false,
    hasDistributing: false,
    whyPoints: [
      'Réduction de la concentration US : un ETF monde classique alloue ~70% aux États-Unis. Cette stratégie ramène cette exposition à ~45% via la surpondération de l\'Europe (40%), offrant plus d\'équilibre géographique.',
      'TOB de 0,12% sur les deux ETFs : IWDA et IEUR sont tous deux soumis au TOB réduit de 0,12% en Belgique.',
      'Valorisation européenne attractive : historiquement, les marchés européens se négocient à des niveaux de valorisation inférieurs aux marchés américains — ce qui peut représenter un potentiel de rattrapage.',
      'Fonds 100% accumulants : les dividendes sont réinvestis automatiquement dans les deux ETFs, sans précompte mobilier.',
    ],
    alternatives: [
      {
        ticker: 'IWDA + XESX',
        isin: 'IE00B4L5Y983 + IE00B0M62Q58',
        name: 'iShares MSCI World + iShares Core EURO STOXX 50',
        ter: 0.165,
        tob: 0.0012,
        accumulating: true,
        pros: ['Concentration sur les 50 plus grandes entreprises européennes', 'TER inférieur sur la partie européenne (0,10%)', 'Très liquide'],
        cons: ['Seulement 50 entreprises = moins diversifié que IEUR', 'Forte pondération financières/énergie', 'Requiert un rééquilibrage', 'Couverture zone euro uniquement — exclut UK, Suisse, Suède (contrairement à IEUR qui couvre toute l\'Europe développée)'],
        verdict: 'Pour les investisseurs préférant les blue chips européennes aux mid caps.',
      },
      {
        ticker: 'IMIE',
        isin: 'IE00B3YLTY66',
        name: 'State Street SPDR MSCI All Country World Investable Market UCITS ETF (Acc)',
        ter: 0.17,
        tob: 0.0012,
        accumulating: true,
        pros: ['Un seul ETF, zéro rééquilibrage', 'Diversification mondiale complète y compris small caps', 'TER compétitif'],
        cons: ['Pondération Europe fixe (dictée par l\'indice)', 'Pas de flexibilité pour surpondérer l\'Europe'],
        verdict: 'Si vous ne souhaitez pas gérer deux ETFs, IMIE offre une exposition mondiale sans biais actif.',
      },
      {
        ticker: 'VEUR',
        isin: 'IE00B945VV12',
        name: 'Vanguard FTSE Developed Europe UCITS ETF',
        ter: 0.10,
        tob: 0.0012,
        accumulating: false,
        pros: ['TER très bas (0,10%)', 'Bonne couverture des marchés européens développés', 'Marque Vanguard'],
        cons: ['Fonds distributif — dividendes soumis au précompte mobilier de 30%', 'Peut être couplé avec IWDA uniquement — nécessite rééquilibrage', 'Légère différence de composition vs IEUR (FTSE vs MSCI)'],
        verdict: 'TER inférieur à IEUR, mais le caractère distributif génère une friction fiscale (précompte 30% sur dividendes). Pour un investisseur en phase d\'accumulation, IEUR est généralement préférable.',
      },
    ],
    fiscalNote: FISCAL_STANDARD,
  },

  'anti-us': {
    numberOfSecurities: 2200,
    hasReynders: false,
    hasDistributing: false,
    whyPoints: [
      'Réduction drastique de l\'exposition US : dans un ETF monde classique, les États-Unis représentent ~70%. Ici, via IWDA (60%) + surpondération Europe (20%) + Chine (20%), la part effective des États-Unis descend à environ 42%.',
      'TOB de 0,12% sur les trois ETFs : IWDA, IEUR et ICHN sont tous soumis au TOB réduit de 0,12% en Belgique.',
      'Diversification multi-régionale : cette stratégie mise sur la convergence entre économies développées (Europe, Japon via IWDA) et économies en rattrapage (Chine) pour réduire la dépendance à un seul marché.',
      'Fonds 100% accumulants : tous les dividendes sont réinvestis automatiquement, sans précompte mobilier.',
    ],
    alternatives: [
      {
        ticker: 'IWDA + EMIM',
        isin: 'IE00B4L5Y983 + IE00BKM4GZ66',
        name: 'iShares MSCI World + iShares Core MSCI EM IMI',
        ter: 0.198,
        tob: 0.0012,
        accumulating: true,
        pros: ['Exposition aux émergents plus large (pas seulement Chine)', 'Seulement 2 ETFs à gérer', 'Meilleur historique sur 20 ans'],
        cons: ['Chine moins surpondérée (~6% vs 20% ici)', 'Moins de contrôle géographique précis'],
        verdict: 'Si vous voulez réduire l\'exposition US sans parier spécifiquement sur la Chine, IWDA + EMIM est plus simple.',
      },
      {
        ticker: 'IMIE',
        isin: 'IE00B3YLTY66',
        name: 'State Street SPDR MSCI All Country World Investable Market UCITS ETF (Acc)',
        ter: 0.17,
        tob: 0.0012,
        accumulating: true,
        pros: ['Solution tout-en-un, zéro gestion', 'Inclut small caps et émergents dans les proportions naturelles'],
        cons: ['US à ~65% — moins de réduction que cette stratégie', 'Aucune surpondération régionale possible'],
        verdict: 'Pour ceux qui souhaitent simplement éviter VWCE/IWDA pur sans biais actif prononcé.',
      },
    ],
    fiscalNote: FISCAL_STANDARD,
  },

  'biais-chine': {
    numberOfSecurities: 2000,
    hasReynders: false,
    hasDistributing: false,
    whyPoints: [
      'Surpondération délibérée de la Chine : un ETF monde classique n\'alloue que ~3% à la Chine. Cette stratégie en alloue 30% — soit 10× plus — pour les investisseurs convaincus du rattrapage des marchés chinois.',
      'TOB de 0,12% sur les deux ETFs : IWDA et ICHN sont tous deux soumis au TOB réduit de 0,12% en Belgique.',
      'Fonds 100% accumulants : dividendes réinvestis automatiquement sans précompte mobilier.',
      'Exposition au marché actions chinois via ICHN : l\'ETF iShares MSCI China couvre les H-shares (cotées à Hong Kong) et A-shares accessibles, donnant une exposition directe aux sociétés chinoises cotées.',
    ],
    alternatives: [
      {
        ticker: 'IWDA + EMIM',
        isin: 'IE00B4L5Y983 + IE00BKM4GZ66',
        name: 'iShares MSCI World + iShares Core MSCI EM IMI',
        ter: 0.198,
        tob: 0.0012,
        accumulating: true,
        pros: ['Exposure aux émergents diversifiée (Inde, Brésil, Taiwan + Chine)', 'Moins de concentration sur un seul pays', 'TOB 0,12%'],
        cons: ['Chine à ~6% seulement — bien moins que 30% ici', 'Pas de contrôle fin de la pondération Chine'],
        verdict: 'Si vous souhaitez de l\'exposition aux émergents sans miser autant sur la Chine seule.',
      },
      {
        ticker: 'ICHN',
        isin: 'IE00BJ5JPG56',
        name: 'iShares MSCI China UCITS ETF Acc',
        ter: 0.28,
        tob: 0.0012,
        accumulating: true,
        pros: ['Exposition pure à la Chine (100%)', 'Pour les investisseurs avec une forte conviction Chine'],
        cons: ['Risque pays extrêmement concentré', 'Haute volatilité, forte sensibilité à la réglementation gouvernementale', 'Sous-performance marquée ces 5 dernières années'],
        verdict: 'Uniquement si vous souhaitez une exposition 100% Chine. Risque très élevé — à réserver à une petite fraction du portefeuille.',
      },
    ],
    fiscalNote: FISCAL_STANDARD,
  },

  'biais-us': {
    numberOfSecurities: 500,
    hasReynders: false,
    hasDistributing: false,
    whyPoints: [
      'TER parmi les plus bas du marché : à 0,07%/an, CSPX (iShares Core S&P 500) est l\'un des ETFs les moins coûteux disponibles en Europe — soit €7 de frais annuels par €10.000 investis.',
      'TOB de 0,12% et fonds accumulant : dividendes réinvestis automatiquement, TOB réduit à l\'achat et à la vente.',
      'Le S&P 500 : 500 des plus grandes entreprises cotées aux États-Unis, soit environ 80% de la capitalisation boursière américaine totale. L\'indice a délivré ~11,5%/an entre 2005 et 2025.',
      'Concentration assumée : cette stratégie est un pari explicite sur la domination des entreprises américaines — technologie, finance, santé. Elle comporte un risque de change USD/EUR et un risque de concentration géographique.',
    ],
    alternatives: [
      {
        ticker: 'VUAA',
        isin: 'IE00B3XXRP09',
        name: 'Vanguard S&P 500 UCITS ETF Acc',
        ter: 0.07,
        tob: 0.0012,
        accumulating: true,
        pros: ['TER identique (0,07%)', 'Marque Vanguard réputée pour la stabilité', 'Même indice S&P 500', 'Bonne liquidité'],
        cons: ['AUM plus faible que CSPX (~€45 mrd vs ~€80 mrd)'],
        verdict: 'Alternative équivalente à CSPX — le choix entre les deux dépend de votre broker et des frais de transaction.',
      },
      {
        ticker: 'SXR8',
        isin: 'IE00B5BMR087',
        name: 'iShares Core S&P 500 UCITS ETF EUR (Acc)',
        ter: 0.07,
        tob: 0.0012,
        accumulating: true,
        pros: ['Même fonds que CSPX, libellé en EUR', 'Même TER (0,07%)', 'Très liquide sur Xetra'],
        cons: ['Cotation en EUR — la valeur reflète quand même les variations USD/EUR', 'Légèrement moins liquide que CSPX sur certains brokers'],
        verdict: 'Identique à CSPX en pratique — choisissez selon la cotation préférée de votre broker (USD sur LSE vs EUR sur Xetra).',
      },
      {
        ticker: 'IWDA',
        isin: 'IE00B4L5Y983',
        name: 'iShares Core MSCI World UCITS ETF Acc',
        ter: 0.20,
        tob: 0.0012,
        accumulating: true,
        pros: ['Diversification mondiale (23 pays)', 'Réduit la concentration US à ~70%'],
        cons: ['TER plus élevé (0,20%)', 'Performance historique inférieure au S&P 500 sur 20 ans (mais plus stable)'],
        verdict: 'Si vous souhaitez réduire le risque de concentration US tout en gardant une exposition globale aux marchés développés.',
      },
    ],
    fiscalNote: FISCAL_STANDARD,
  },

  'tech-us': {
    numberOfSecurities: 100,
    hasReynders: false,
    hasDistributing: false,
    whyPoints: [
      'Le Nasdaq-100 en détail : CNDX réplique les 100 plus grandes entreprises non-financières cotées sur le Nasdaq — dominé par Apple, Microsoft, Nvidia, Amazon, Meta, Alphabet. Ces 10 premières valeurs représentent ~50% de l\'indice.',
      'TOB de 0,12% et fonds accumulant : dividendes réinvestis automatiquement, TOB réduit à l\'achat et à la vente.',
      'Performance historique exceptionnelle mais volatile : ~13%/an entre 2005 et 2025, mais aussi -33% en 2022 seul. Cette stratégie est à réserver aux investisseurs avec un horizon long et une tolérance élevée à la volatilité.',
      'Concentration sectorielle : environ 65% du fonds est dans le secteur technologique — exposition très forte à un seul secteur et à un seul pays (États-Unis).',
    ],
    alternatives: [
      {
        ticker: 'EQQQ',
        isin: 'IE0032077012',
        name: 'Invesco EQQQ Nasdaq-100 UCITS ETF',
        ter: 0.30,
        tob: 0.0012,
        accumulating: false,
        pros: ['Même indice Nasdaq-100', 'L\'un des ETFs Nasdaq les plus anciens en Europe (lancé en 2002)', 'Très grande liquidité'],
        cons: ['ETF distributif — précompte mobilier de 30% sur les dividendes versés', 'TER de 0,30% — légèrement plus élevé que CNDX', 'Distributing = fiscalement moins efficace en Belgique'],
        verdict: 'Même indice, mais distributing = précompte 30% sur dividendes. Préférez CNDX pour l\'efficacité fiscale belge.',
      },
      {
        ticker: 'XNAS',
        isin: 'IE000CNSFAR2',
        name: 'Xtrackers Nasdaq-100 UCITS ETF 1C',
        ter: 0.20,
        tob: 0.0012,
        accumulating: true,
        pros: ['TER de 0,20% — inférieur à EQQQ', 'Fonds accumulant', 'TOB 0,12%'],
        cons: ['Liquidité inférieure à CNDX et EQQQ', 'Plus récent, historique plus court'],
        verdict: 'Bonne alternative accumulante avec un TER intermédiaire si CNDX n\'est pas disponible sur votre broker.',
      },
      {
        ticker: 'CSPX',
        isin: 'IE00B5BMR087',
        name: 'iShares Core S&P 500 UCITS ETF Acc',
        ter: 0.07,
        tob: 0.0012,
        accumulating: true,
        pros: ['Exposition US élargie (500 entreprises vs 100)', 'TER très bas (0,07%)', 'Moins volatile que le Nasdaq'],
        cons: ['Moins de concentration tech — rendements potentiels inférieurs', 'Inclut secteurs financiers, énergie, etc.'],
        verdict: 'Si vous voulez l\'exposition US mais avec moins de concentration sectorielle tech — un S&P 500 diversifie davantage au même coût total.',
      },
    ],
    fiscalNote: FISCAL_STANDARD,
  },

  'dividendes': {
    numberOfSecurities: 1500,
    hasReynders: false,
    hasDistributing: true,
    whyPoints: [
      'Revenu passif régulier : VHYL verse des dividendes trimestriellement (~4%/an de rendement en dividendes) — utile pour les investisseurs ayant besoin de liquidités régulières sans vendre leurs parts.',
      'Diversification mondiale orientée revenus : l\'ETF sélectionne des entreprises mondiales à dividendes élevés — utilities, financières, énergie — dans ~50 pays développés et émergents.',
      'TOB de 0,12% : VHYL bénéficie du TOB réduit de 0,12%, contrairement à certains ETFs équivalents.',
      'Avertissement fiscal important : en Belgique, chaque dividende perçu est soumis au précompte mobilier de 30%. Sur un rendement dividende de 4%, cela représente 1,2% de frais fiscaux annuels supplémentaires vs un ETF accumulant équivalent — un impact significatif sur 20 ans.',
    ],
    alternatives: [
      {
        ticker: 'IWDA',
        isin: 'IE00B4L5Y983',
        name: 'iShares Core MSCI World UCITS ETF Acc',
        ter: 0.20,
        tob: 0.0012,
        accumulating: true,
        pros: ['Zéro précompte sur les dividendes (accumulant)', 'Rendement total historiquement supérieur (croissance + dividendes réinvestis)', 'Même exposition mondiale développée'],
        cons: ['Pas de revenu régulier — il faut vendre des parts pour obtenir des liquidités', 'Dividendes moins visibles'],
        verdict: 'Pour la quasi-totalité des investisseurs belges en phase d\'accumulation, IWDA est fiscalement plus efficace que VHYL sur le long terme.',
      },
      {
        ticker: 'VHYA',
        isin: 'IE00BK5BR626',
        name: 'Vanguard FTSE All-World High Dividend Yield UCITS ETF (USD) Accumulating',
        ter: 0.29,
        tob: 0.0012,
        accumulating: true,
        pros: ['Même stratégie dividendes élevés mais accumulant', 'Pas de précompte sur les dividendes', 'AUM solide (~€3 mrd)'],
        cons: ['TER identique à VHYL (0,29%)', 'Moins liquide que VHYL'],
        verdict: 'Si vous appréciez la sélection dividendes de VHYL mais préférez éviter le précompte, VHYA est la version accumulante officielle — fiscalement plus adaptée pour les investisseurs belges.',
      },
    ],
    fiscalNote: FISCAL_DISTRIBUTING,
  },

  'epargne-liquide': {
    numberOfSecurities: 1,
    hasReynders: false,
    hasDistributing: false,
    whyPoints: [
      'Rendement actuel ~3% brut, supérieur aux meilleurs comptes épargne belges (taux de base + prime de fidélité)',
      'Totalement liquide — vendable n\'importe quel jour de bourse sans perte d\'intérêts courus, contrairement aux bons de caisse',
      'Structure synthétique : XEON détient physiquement des actions et reçoit le taux €STR via un swap — fiscalité actuellement avantageuse : la taxe Reynders ne s\'applique en principe pas (structure synthétique), mais ce traitement fait l\'objet d\'une interprétation fiscale évolutive',
      'Taxe principale : TOB 0,12% à l\'achat et à la vente — pas de précompte mobilier annuel, pas de taxe sur plus-values (sous le seuil de 10\u202F000\u00A0€). Reynders : en principe non applicable, mais traitement fiscal à surveiller.',
      'Volatilité quasi nulle — la courbe de valeur liquidative est une ligne quasi droite ascendante',
    ],
    alternatives: [
      {
        ticker: 'ERNA',
        isin: 'IE00BKG6Z746',
        name: 'iShares € Ultrashort Bond UCITS ETF',
        ter: 0.09,
        tob: 0.0012,
        accumulating: true,
        pros: ['Rendement légèrement supérieur (~3,2% brut)', 'Exposition à du risque crédit corporate diversifié — potentiel de surperformance'],
        cons: ['Détient des obligations physiques → taxe Reynders 30% sur les gains à la vente', 'Moins efficace fiscalement que XEON pour la plupart des investisseurs belges'],
        verdict: 'L\'écart de rendement brut (+0,2%) est effacé par la taxe Reynders pour la quasi-totalité des investisseurs belges. XEON reste préférable.',
      },
      {
        ticker: 'CSH2',
        isin: 'LU1190417599',
        name: 'Lyxor Smart Overnight Return ETF',
        ter: 0.07,
        tob: 0.0012,
        accumulating: true,
        pros: ['Même structure synthétique €STR que XEON', 'TER légèrement inférieur (0,07% vs 0,10%)'],
        cons: ['Volume de transactions inférieur à XEON', 'Liquidité légèrement moindre sur les marchés belges'],
        verdict: 'Alternative directe à XEON avec le même mécanisme €STR. XEON reste préférable pour sa liquidité supérieure sur Euronext.',
      },
    ],
    fiscalNote: 'TOB de 0,12% à l\'achat et à la vente. Taxe Reynders : en principe non applicable (structure synthétique — pas de détention directe d\'obligations), mais ce traitement fait l\'objet d\'une interprétation fiscale évolutive — à traiter comme potentiellement soumis. Pas de précompte mobilier annuel (fonds accumulant). Le traitement fiscal de la structure synthétique est basé sur la pratique administrative belge actuelle — il pourrait évoluer si l\'administration fiscale modifie sa doctrine.',
  },
};
