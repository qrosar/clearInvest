import { MetadataRoute } from 'next'

const locales = ['fr', 'nl', 'en']
const baseUrl = 'https://clearinvest.be'

const pages = [
  '',
  '/strategies',
  '/calculateur', 
  '/brokers',
  '/questions',
  '/comprendre',
  '/comprendre/etf',
  '/comprendre/produits-bancaires',
  '/comprendre/fiscalite',
  '/ressources',
  '/ressources/premier-achat',
  '/ressources/declarer-compte-etranger',
  '/ressources/glossaire',
  '/a-propos',
  '/mentions-legales',
  '/politique-confidentialite',
]

// Add strategy detail pages
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
  const staticPages = pages.flatMap(page =>
    locales.map(locale => ({
      url: `${baseUrl}/${locale}${page}`,
      lastModified: new Date(),
      changeFrequency: page === '' ? 'weekly' : 'monthly' as const,
      priority: page === '' ? 1 : page.includes('comprendre') || 
                page === '/strategies' || 
                page === '/calculateur' ? 0.8 : 0.6,
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
