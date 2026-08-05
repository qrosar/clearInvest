import { SITE_URL } from '@/lib/site';

export default function JsonLd() {
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'ClearInvest',
    url: SITE_URL,
    description:
      'Independent guides, calculator and comparisons for ETF investing in Belgium. Free, no jargon.',
    inLanguage: ['fr', 'nl', 'en'],
  };

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'ClearInvest',
    url: SITE_URL,
    logo: `${SITE_URL}/og-image.png`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
    </>
  );
}
