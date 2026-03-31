import { getTranslations } from 'next-intl/server';
import Calculator from '@/components/calculator/Calculator';
import LastUpdated from '@/components/ui/LastUpdated';

export const dynamic = 'force-static';

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }> 
}) {
  const { locale } = await params;
  const titles = { 
    fr: 'Calculateur ETF vs produits bancaires — Simulation sur 30 ans', 
    nl: 'ETF-rekenmachine vs bankproducten — Simulatie over 30 jaar', 
    en: 'ETF Calculator vs Banking Products — 30-year Simulation' 
  }
  const descriptions = { 
    fr: 'Simulez l\'impact des frais sur votre capital à long terme et comparez les ETF aux produits bancaires.', 
    nl: 'Simuleer de impact van kosten op uw kapitaal op lange termijn en vergelijk ETF\'s met bankproducten.', 
    en: 'Simulate the impact of fees on your long-term capital and compare ETFs with banking products.' 
  }
  return {
    title: titles[locale as keyof typeof titles] ?? titles.fr,
    description: descriptions[locale as keyof typeof descriptions] ?? descriptions.fr,
    alternates: {
      canonical: `https://clearinvest.be/${locale}/calculateur`,
    },
  }
}

export default async function CalculateurPage() {
  const t = await getTranslations('calculator');

  return (
    <main className="min-h-screen bg-[var(--warm-white)]">
      {/* Dark header strip */}
      <div className="bg-[var(--forest-deep)] px-6 pb-12 pt-28">
        <div className="mx-auto max-w-6xl">
          <h1 className="font-heading text-3xl font-semibold text-[var(--warm-white)] md:text-4xl">
            {t('heading')}
          </h1>
          <p className="mt-3 max-w-xl text-[var(--warm-white)]/55">
            {t('subtitle')}
          </p>
        </div>
      </div>

      {/* Calculator body */}
      <div className="mx-auto max-w-6xl px-6 py-12">
        <Calculator />
        <LastUpdated isoDate="2026-03-01" />
      </div>
    </main>
  );
}
