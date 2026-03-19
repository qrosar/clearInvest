import { getTranslations } from 'next-intl/server';
import Calculator from '@/components/calculator/Calculator';

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
      </div>
    </main>
  );
}
