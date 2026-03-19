import { getTranslations } from 'next-intl/server';
import StrategiesPage from '@/components/strategies/StrategiesPage';

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
      </div>
    </>
  );
}
