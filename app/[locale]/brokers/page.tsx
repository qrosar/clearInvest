import BrokersPage from '@/components/brokers/BrokersPage';
import LastUpdated from '@/components/ui/LastUpdated';

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
    fr: "Frais, fiscalité belge (TOB, CGT 2026), plan d'épargne automatique : comparatif indépendant de MeDirect, Saxo, Bolero, DEGIRO, Trade Republic, Interactive Brokers et Robinhood. Quel broker pour votre profil ?",
    nl: "Kosten, Belgische fiscaliteit (beurstaks, meerwaardebelasting 2026), automatisch spaarplan: onafhankelijke vergelijking van MeDirect, Saxo, Bolero, DEGIRO, Trade Republic, Interactive Brokers en Robinhood. Welke broker past bij u?",
    en: "Fees, Belgian taxation (TOB, CGT 2026), automatic savings plan: independent comparison of MeDirect, Saxo, Bolero, DEGIRO, Trade Republic, Interactive Brokers and Robinhood. Which broker fits your profile?",
  }
  const title = titles[locale as keyof typeof titles] ?? titles.fr;
  const description = descriptions[locale as keyof typeof descriptions] ?? descriptions.fr;
  return {
    title,
    description,
    alternates: {
      canonical: `https://clearinvest.be/${locale}/brokers`,
    },
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

export default async function BrokersRoute() {
  return (
    <>
      <BrokersPage />
      <div className="mx-auto max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
        <LastUpdated isoDate="2026-05-01" />
      </div>
    </>
  );
}
