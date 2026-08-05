import { Playfair_Display, DM_Sans } from 'next/font/google';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { Analytics } from "@vercel/analytics/react";
import JsonLd from '@/components/JsonLd';
import { BASE_CLIENT_NAMESPACES, pickMessages } from '@/lib/i18n/messages';
import { SITE_URL, absoluteUrl, buildAlternates } from '@/lib/site';
import '../globals.css';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
});

export async function generateStaticParams() {
  return [{ locale: 'fr' }, { locale: 'nl' }, { locale: 'en' }];
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  
  const titles = {
    fr: 'ClearInvest — Investir simplement en Belgique',
    nl: 'ClearInvest — Eenvoudig beleggen in België',
    en: 'ClearInvest — Simple ETF Investing in Belgium',
  }
  
  const descriptions = {
    fr: 'Guides, calculateur et comparatifs pour investir en ETF en Belgique. Indépendant, gratuit, sans jargon.',
    nl: 'Gidsen, rekenmachine en vergelijkingen voor ETF-beleggen in België. Onafhankelijk, gratis, zonder jargon.',
    en: 'Guides, calculator and comparisons for ETF investing in Belgium. Independent, free, no jargon.',
  }
  
  // Per-locale social card; falls back to the French one for anything unknown.
  const ogImage = hasLocale(routing.locales, locale)
    ? `/og-image-${locale}.png`
    : '/og-image.png';

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: titles[locale as keyof typeof titles] ?? titles.fr,
      template: '%s | ClearInvest',
    },
    description: descriptions[locale as keyof typeof descriptions] ?? descriptions.fr,
    alternates: buildAlternates(locale),
    openGraph: {
      siteName: 'ClearInvest',
      locale: locale,
      type: 'website',
      url: absoluteUrl(locale),
      title: titles[locale as keyof typeof titles] ?? titles.fr,
      description: descriptions[locale as keyof typeof descriptions] ?? descriptions.fr,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: titles[locale as keyof typeof titles] ?? titles.fr,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: titles[locale as keyof typeof titles] ?? titles.fr,
      description: descriptions[locale as keyof typeof descriptions] ?? descriptions.fr,
      images: [ogImage],
    },
    robots: {
      index: true,
      follow: true,
    },
  }
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Required for static rendering: without it next-intl resolves the locale
  // from the request, which opts the whole route out of prerendering.
  setRequestLocale(locale);

  const messages = await getMessages();
  const t = await getTranslations('common');

  // Only the base namespaces cross into the client bundle here. Routes with
  // client components that need more re-provide via <ScopedMessages> in their
  // own segment layout — see lib/i18n/messages.ts.
  return (
    <html lang={locale}>
      <body className={`${playfair.variable} ${dmSans.variable} antialiased font-sans`}>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-[var(--forest)] focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-[var(--warm-white)]"
        >
          {t('skip_to_content')}
        </a>
        <NextIntlClientProvider messages={pickMessages(messages, BASE_CLIENT_NAMESPACES)}>
          <JsonLd />
          <Nav />
          <main id="main">{children}</main>
          <Footer />
          <Analytics />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
