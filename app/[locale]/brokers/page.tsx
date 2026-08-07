import BrokersPage from '@/components/brokers/BrokersPage';
import LastUpdated from '@/components/ui/LastUpdated';
import { setRequestLocale } from 'next-intl/server';
import { buildAlternates } from '@/lib/site';

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params;
  const titles = {
    fr: 'Meilleur Broker ETF Belgique 2026 — MeDirect, Saxo, Bolero, DEGIRO comparés',
    nl: 'Beste ETF Broker België 2026 — MeDirect, Saxo, Bolero, DEGIRO vergeleken',
    en: 'Best ETF Broker Belgium 2026 — MeDirect, Saxo, Bolero, DEGIRO Compared',
  }
  const descriptions = {
    fr: "Frais, fiscalité belge (TOB, CGT 2026), plan d'épargne automatique et parts fractionnées : comparatif indépendant de 13 brokers — MeDirect, Saxo, ING, Bolero, Re=Bel, DEGIRO, MEXEM, Keytrade, BUX, Trade Republic, Interactive Brokers, Revolut et Robinhood. Tarifs vérifiés en août 2026.",
    nl: "Kosten, Belgische fiscaliteit (beurstaks, meerwaardebelasting 2026), automatisch spaarplan en fractionele deelbewijzen: onafhankelijke vergelijking van 13 brokers — MeDirect, Saxo, ING, Bolero, Re=Bel, DEGIRO, MEXEM, Keytrade, BUX, Trade Republic, Interactive Brokers, Revolut en Robinhood. Tarieven geverifieerd in augustus 2026.",
    en: "Fees, Belgian taxation (TOB, CGT 2026), automatic savings plans and fractional shares: an independent comparison of 13 brokers — MeDirect, Saxo, ING, Bolero, Re=Bel, DEGIRO, MEXEM, Keytrade, BUX, Trade Republic, Interactive Brokers, Revolut and Robinhood. Fees verified August 2026.",
  }
  const title = titles[locale as keyof typeof titles] ?? titles.fr;
  const description = descriptions[locale as keyof typeof descriptions] ?? descriptions.fr;
  return {
    title,
    description,
    alternates: buildAlternates(locale, '/brokers'),
    openGraph: {
      title,
      description,
    },
    twitter: {
      card: 'summary_large_image' as const,
      title,
      description,
    },
  }
}

export default async function BrokersRoute({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <BrokersPage />
      <div className="mx-auto max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
        <LastUpdated path="/brokers" />
      </div>
    </>
  );
}
