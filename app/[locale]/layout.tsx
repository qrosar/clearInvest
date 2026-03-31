import type { Metadata } from 'next';
import { Playfair_Display, DM_Sans } from 'next/font/google';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { Analytics } from "@vercel/analytics/react";
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
  
  return {
    metadataBase: new URL('https://clearinvest.be'),
    title: {
      default: titles[locale as keyof typeof titles] ?? titles.fr,
      template: '%s | ClearInvest',
    },
    description: descriptions[locale as keyof typeof descriptions] ?? descriptions.fr,
    alternates: {
      canonical: `https://clearinvest.be/${locale}`,
      languages: {
        'fr-BE': 'https://clearinvest.be/fr',
        'nl-BE': 'https://clearinvest.be/nl',
        'en': 'https://clearinvest.be/en',
      },
    },
    openGraph: {
      siteName: 'ClearInvest',
      locale: locale,
      type: 'website',
      url: `https://clearinvest.be/${locale}`,
      title: titles[locale as keyof typeof titles] ?? titles.fr,
      description: descriptions[locale as keyof typeof descriptions] ?? descriptions.fr,
    },
    twitter: {
      card: 'summary_large_image',
      title: titles[locale as keyof typeof titles] ?? titles.fr,
      description: descriptions[locale as keyof typeof descriptions] ?? descriptions.fr,
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

  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`${playfair.variable} ${dmSans.variable}`}
    >
      <body className="antialiased font-sans">
        <NextIntlClientProvider messages={messages}>
          <Nav />
          {children}
          <Footer />
          <Analytics />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
