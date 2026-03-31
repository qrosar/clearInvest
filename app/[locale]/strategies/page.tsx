import { getTranslations } from 'next-intl/server';
import StrategiesPage from '@/components/strategies/StrategiesPage';
import LastUpdated from '@/components/ui/LastUpdated';

export const dynamic = 'force-static';

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }> 
}) {
  const { locale } = await params;
  const titles = { 
    fr: 'Stratégies ETF pour investisseurs belges — IMIE, IWDA, CSPX', 
    nl: 'ETF-strategieën voor Belgische beleggers — IMIE, IWDA, CSPX', 
    en: 'ETF Strategies for Belgian Investors — IMIE, IWDA, CSPX' 
  }
  const descriptions = { 
    fr: 'Découvrez les meilleures stratégies passives adaptées à la fiscalité belge.', 
    nl: 'Ontdek de beste passieve strategieën aangepast aan de Belgische fiscaliteit.', 
    en: 'Discover the best passive strategies adapted to Belgian taxation.' 
  }
  return {
    title: titles[locale as keyof typeof titles] ?? titles.fr,
    description: descriptions[locale as keyof typeof descriptions] ?? descriptions.fr,
    alternates: {
      canonical: `https://clearinvest.be/${locale}/strategies`,
    },
  }
}

export default async function StrategiesRoute() {
  const t = await getTranslations('strategiesPage');

  return (
    <>
      {/* Page header */}
      <div className="bg-[var(--forest-deep)] px-6 py-14 text-center text-white md:py-20">
        <h1 className="font-heading text-3xl font-bold md:text-4xl">{t('heading')}</h1>
        <p className="mx-auto mt-4 max-w-2xl text-sm text-white/65 md:text-base">
          {t('subtitle')}
        </p>
      </div>

      {/* Main content */}
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <StrategiesPage />
        <p className="mt-12 text-center text-xs text-[var(--charcoal)]/30">
          {t('disclaimer')}
        </p>
        <LastUpdated isoDate="2026-03-01" />
      </div>
    </>
  );
}
