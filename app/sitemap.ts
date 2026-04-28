import { MetadataRoute } from 'next'

const locales = ['fr', 'nl', 'en']
const baseUrl = 'https://clearinvest.be'

const pages = [
  { path: '', priority: 1.0, changeFrequency: 'weekly' as const },
  { path: '/strategies', priority: 0.9, changeFrequency: 'monthly' as const },
  { path: '/calculateur', priority: 0.9, changeFrequency: 'monthly' as const },
  { path: '/brokers', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/analyse-produits', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/analyse-produits/ethias-savings-21', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/analyse-produits/kbc-pricos', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/analyse-produits/argenta-pensioenspaarfonds', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/analyse-produits/bnp-b-pension', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/analyse-produits/belfius-pension-high-equities', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/analyse-produits/nn-strategy', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/analyse-produits/nn-strategy', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/analyse-produits/ag-fund-plus', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/analyse-produits/baloise-invest', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/analyse-produits/axa-index4p', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/analyse-produits/vivium-selection', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/analyse-produits/crelan-invest-opportunities', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/analyse-produits/ag-safe-plus', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/analyse-produits/belfius-invest-capital-safe', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/questions', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/comprendre', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/comprendre/etf', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/comprendre/produits-bancaires', priority: 0.7, changeFrequency: 'monthly' as const },
  { path: '/comprendre/fiscalite', priority: 0.7, changeFrequency: 'monthly' as const },
  { path: '/ressources', priority: 0.6, changeFrequency: 'monthly' as const },
  { path: '/ressources/premier-achat', priority: 0.6, changeFrequency: 'monthly' as const },
  { path: '/ressources/declarer-compte-etranger', priority: 0.6, changeFrequency: 'monthly' as const },
  { path: '/ressources/immobilier-vs-etf', priority: 0.6, changeFrequency: 'monthly' as const },
  { path: '/ressources/glossaire', priority: 0.6, changeFrequency: 'monthly' as const },
  { path: '/a-propos', priority: 0.4, changeFrequency: 'yearly' as const },
  { path: '/mentions-legales', priority: 0.3, changeFrequency: 'yearly' as const },
  { path: '/politique-confidentialite', priority: 0.3, changeFrequency: 'yearly' as const },
]

const strategyIds = [
  'monde-simplifie',
  'monde-complet',
  'tout-en-un',
  'esg-mondiale',
  'biais-europe',
  'anti-us',
  'biais-chine',
  'biais-us',
  'dividendes',
  'tech-us',
  'epargne-liquide',
]

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = pages.flatMap(({ path, priority, changeFrequency }) =>
    locales.map(locale => ({
      url: `${baseUrl}/${locale}${path}`,
      lastModified: new Date(),
      changeFrequency,
      priority,
    }))
  )

  const strategyPages = strategyIds.flatMap(id =>
    locales.map(locale => ({
      url: `${baseUrl}/${locale}/strategies/${id}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }))
  )

  return [...staticPages, ...strategyPages]
}
