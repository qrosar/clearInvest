import { routing } from '@/i18n/routing';

/**
 * Canonical origin for the site.
 *
 * Set NEXT_PUBLIC_SITE_URL on preview deployments so they don't emit
 * production canonicals and hreflang tags that point away from themselves.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://clearinvest.be'
).replace(/\/$/, '');

/** Absolute URL for a locale + path, e.g. absoluteUrl('nl', '/brokers'). */
export function absoluteUrl(locale: string, path = ''): string {
  return `${SITE_URL}/${locale}${path}`;
}

/**
 * When each route was last reviewed, keyed by path below the locale segment.
 *
 * Single source of truth: the <LastUpdated> footer and the sitemap's
 * `lastModified` both read from here, so the date Google sees can no longer
 * drift from the date the page shows. Bump the entry when you revise a page.
 */
export const PAGE_UPDATED: Record<string, string> = {
  '': '2026-08-02',
  '/strategies': '2026-08-04',
  '/calculateur': '2026-08-04',
  '/brokers': '2026-08-02',
  '/questions': '2026-08-02',
  '/comprendre': '2026-05-01',
  '/comprendre/etf': '2026-08-04',
  '/comprendre/fiscalite': '2026-08-02',
  '/comprendre/produits-bancaires': '2026-08-04',
  '/ressources': '2026-08-02',
  '/ressources/premier-achat': '2026-08-02',
  '/ressources/declarer-compte-etranger': '2026-08-02',
  '/ressources/immobilier-vs-etf': '2026-08-04',
  '/ressources/glossaire': '2026-08-02',
  '/analyse-produits': '2026-04-30',
  '/analyse-produits/ethias-savings-21': '2026-04-12',
  '/analyse-produits/kbc-pricos': '2026-04-08',
  '/analyse-produits/argenta-pensioenspaarfonds': '2026-04-08',
  '/analyse-produits/bnp-b-pension': '2026-04-09',
  '/analyse-produits/belfius-pension-high-equities': '2026-04-10',
  '/analyse-produits/nn-strategy': '2026-04-12',
  '/analyse-produits/ag-fund-plus': '2026-04-12',
  '/analyse-produits/baloise-invest': '2026-04-12',
  '/analyse-produits/axa-index4p': '2026-04-17',
  '/analyse-produits/vivium-selection': '2026-04-18',
  '/analyse-produits/crelan-invest-opportunities': '2026-04-27',
  '/analyse-produits/bnp-comfort-equity': '2026-04-30',
  '/analyse-produits/carmignac-investissement': '2026-04-30',
  '/analyse-produits/ag-safe-plus': '2026-04-12',
  '/analyse-produits/belfius-invest-capital-safe': '2026-04-13',
  '/a-propos': '2026-08-04',
  '/mentions-legales': '2026-08-04',
  '/politique-confidentialite': '2026-08-04',
};

/** Static routes for the sitemap, with their crawl hints. */
export const ROUTE_META: {
  path: string;
  priority: number;
  changeFrequency: 'weekly' | 'monthly' | 'yearly';
}[] = [
  { path: '', priority: 1.0, changeFrequency: 'weekly' },
  { path: '/strategies', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/calculateur', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/brokers', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/analyse-produits', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/questions', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/comprendre', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/comprendre/etf', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/comprendre/produits-bancaires', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/comprendre/fiscalite', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/ressources', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/ressources/premier-achat', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/ressources/declarer-compte-etranger', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/ressources/immobilier-vs-etf', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/ressources/glossaire', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/a-propos', priority: 0.4, changeFrequency: 'yearly' },
  { path: '/mentions-legales', priority: 0.3, changeFrequency: 'yearly' },
  { path: '/politique-confidentialite', priority: 0.3, changeFrequency: 'yearly' },
  // Product analyses — every entry in PAGE_UPDATED under /analyse-produits/
  ...Object.keys(PAGE_UPDATED)
    .filter(p => p.startsWith('/analyse-produits/'))
    .map(path => ({ path, priority: 0.8, changeFrequency: 'monthly' as const })),
];

/**
 * Canonical + hreflang block for a page.
 *
 * `path` is the route below the locale segment ('' for the locale root,
 * '/comprendre/fiscalite' otherwise). Every locale gets an alternate pointing
 * at the *same* page rather than at its locale root, which is what tells Google
 * that /fr/brokers and /nl/brokers are translations of one another.
 */
export function buildAlternates(locale: string, path = '') {
  const languages: Record<string, string> = {};

  for (const l of routing.locales) {
    languages[l] = absoluteUrl(l, path);
  }
  languages['x-default'] = absoluteUrl(routing.defaultLocale, path);

  return {
    canonical: absoluteUrl(locale, path),
    languages,
  };
}
