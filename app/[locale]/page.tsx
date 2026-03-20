import { getTranslations } from 'next-intl/server';
import Hero from '@/components/home/Hero';
import ToolsGrid from '@/components/home/ToolsGrid';
import StrategiesPreview from '@/components/home/StrategiesPreview';

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ locale: string }> 
}) {
  const { locale } = await params;
  const titles = { 
    fr: 'Investir en ETF en Belgique — Guides et calculateur', 
    nl: 'Beleggen in ETF\'s in België — Gidsen en rekenmachine', 
    en: 'ETF Investing in Belgium — Guides and Calculator' 
  }
  const descriptions = { 
    fr: 'Comparez ETFs et produits bancaires, découvrez les meilleures stratégies et brokers pour investir en Belgique.', 
    nl: 'Vergelijk ETF\'s en bankproducten, ontdek de beste strategieën en brokers om in België te beleggen.', 
    en: 'Compare ETFs and banking products, discover the best strategies and brokers for investing in Belgium.' 
  }
  return {
    title: titles[locale as keyof typeof titles] ?? titles.fr,
    description: descriptions[locale as keyof typeof descriptions] ?? descriptions.fr,
    alternates: {
      canonical: `https://clearinvest.be/${locale}`,
    },
  }
}

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
