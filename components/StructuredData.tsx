import { getMessages } from 'next-intl/server';
import { PAGE_UPDATED, SITE_URL, absoluteUrl } from '@/lib/site';

function JsonLdScript({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/**
 * FAQPage schema for /questions.
 *
 * The Q&A pairs are derived from the message keys rather than restated here:
 * every question is `<prefix>_q` and its answer is the `<prefix>_p*` /
 * `<prefix>_ul_*` siblings, in key order. That keeps the schema in step with
 * the rendered page automatically — a duplicated list would drift.
 */
export async function FaqJsonLd() {
  const messages = (await getMessages()) as Record<string, Record<string, string>>;
  const q = messages.questions ?? {};

  const entries = Object.keys(q)
    .filter(k => k.endsWith('_q'))
    .map(questionKey => {
      const prefix = questionKey.slice(0, -2);
      const answer = Object.keys(q)
        .filter(k => k !== questionKey && k.startsWith(`${prefix}_`))
        .map(k => q[k])
        .filter(v => typeof v === 'string')
        .join(' ');

      return { question: q[questionKey], answer };
    })
    .filter(e => e.question && e.answer);

  if (!entries.length) return null;

  return (
    <JsonLdScript
      data={{
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: entries.map(e => ({
          '@type': 'Question',
          name: e.question,
          acceptedAnswer: { '@type': 'Answer', text: e.answer },
        })),
      }}
    />
  );
}

/**
 * Article schema for the product analyses.
 *
 * `dateModified` comes from PAGE_UPDATED, the same map that feeds the on-page
 * "last updated" line and the sitemap, so all three can't disagree.
 */
export async function ArticleJsonLd({
  locale,
  path,
  namespace,
}: {
  locale: string;
  /** Route below the locale segment, e.g. '/analyse-produits/kbc-pricos' */
  path: string;
  /** Message namespace holding this page's hero_title / meta_description */
  namespace: string;
}) {
  const messages = (await getMessages()) as Record<string, Record<string, string>>;
  const ns = messages[namespace] ?? {};

  const headline = ns.hero_title;
  // Not every analysis has a meta_description; fall back to the page's own
  // summary rather than inventing one.
  const description = ns.meta_description ?? ns.hero_subtitle ?? ns.tldr_text ?? '';

  if (!headline) return null;

  const modified = PAGE_UPDATED[path];

  return (
    <JsonLdScript
      data={{
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline,
        ...(description ? { description: description.slice(0, 300) } : {}),
        inLanguage: locale,
        mainEntityOfPage: { '@type': 'WebPage', '@id': absoluteUrl(locale, path) },
        image: `${SITE_URL}/og-image.png`,
        author: { '@type': 'Organization', name: 'ClearInvest', url: SITE_URL },
        publisher: {
          '@type': 'Organization',
          name: 'ClearInvest',
          url: SITE_URL,
          logo: { '@type': 'ImageObject', url: `${SITE_URL}/og-image.png` },
        },
        ...(modified ? { dateModified: modified, datePublished: modified } : {}),
      }}
    />
  );
}
