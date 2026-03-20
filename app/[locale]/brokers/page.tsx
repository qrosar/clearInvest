import BrokersPage from '@/components/brokers/BrokersPage';

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ locale: string }> 
}) {
  const { locale } = await params;
  const titles = { 
    fr: 'Quel broker choisir en Belgique ? Comparatif 2026', 
    nl: 'Welke broker kiezen in België? Vergelijking 2026', 
    en: 'Which Broker to Choose in Belgium? 2026 Comparison' 
  }
  const descriptions = { 
    fr: 'Comparez les frais, la fiscalité et la sécurité des meilleurs brokers disponibles en Belgique.', 
    nl: 'Vergelijk de kosten, fiscaliteit en veiligheid van de beste brokers beschikbaar in België.', 
    en: 'Compare the fees, taxation and security of the best brokers available in Belgium.' 
  }
  return {
    title: titles[locale as keyof typeof titles] ?? titles.fr,
    description: descriptions[locale as keyof typeof descriptions] ?? descriptions.fr,
    alternates: {
      canonical: `https://clearinvest.be/${locale}/brokers`,
    },
  }
}

export default function BrokersRoute() {
  return <BrokersPage />;
}
