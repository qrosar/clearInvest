import { MetadataRoute } from 'next'
import { routing } from '@/i18n/routing'
import { STRATEGIES } from '@/lib/strategies/strategies'
import { PAGE_UPDATED, ROUTE_META, absoluteUrl } from '@/lib/site'

// Route list, dates and strategy IDs all come from shared sources, so the
// sitemap cannot drift from what the site actually serves. Per-entry
// `alternates` declare the three locales as translations of one another —
// without them Google sees three unrelated URLs.
function alternatesFor(path: string) {
  const languages: Record<string, string> = {}
  for (const locale of routing.locales) {
    languages[locale] = absoluteUrl(locale, path)
  }
  return { languages }
}

export default function sitemap(): MetadataRoute.Sitemap {
  const strategyRoutes = STRATEGIES.map(s => ({
    path: `/strategies/${s.id}`,
    priority: 0.7,
    changeFrequency: 'monthly' as const,
  }))

  return [...ROUTE_META, ...strategyRoutes].flatMap(
    ({ path, priority, changeFrequency }) =>
      routing.locales.map(locale => ({
        url: absoluteUrl(locale, path),
        lastModified: new Date(
          PAGE_UPDATED[path] ?? PAGE_UPDATED['/strategies'] ?? PAGE_UPDATED[''],
        ),
        changeFrequency,
        priority,
        alternates: alternatesFor(path),
      })),
  )
}
