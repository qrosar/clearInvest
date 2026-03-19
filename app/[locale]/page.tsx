import { getTranslations } from 'next-intl/server';
import Hero from '@/components/home/Hero';
import ToolsGrid from '@/components/home/ToolsGrid';
import StrategiesPreview from '@/components/home/StrategiesPreview';

export default async function HomePage() {
  const t = await getTranslations('home');
  const trustItems = [t('trust_1'), t('trust_2'), t('trust_3')];

  return (
    <main>
      <Hero />

      {/* Trust banner */}
      <div className="bg-[var(--warm-cream)] py-5">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-2 px-6 sm:flex-row sm:justify-center sm:gap-0">
          {trustItems.map((item, i) => (
            <span key={item} className="flex items-center">
              {i > 0 && (
                <span className="mx-4 hidden h-3 w-px bg-[var(--charcoal)]/20 sm:block" />
              )}
              <span className="text-xs text-[var(--charcoal)]/55">{item}</span>
            </span>
          ))}
        </div>
      </div>

      <ToolsGrid />
      <StrategiesPreview />
    </main>
  );
}
