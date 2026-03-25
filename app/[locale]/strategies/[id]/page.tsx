import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { STRATEGIES } from '@/lib/strategies/strategies';
import { STRATEGY_CONTENT } from '@/lib/strategies/strategyContent';
import StrategyDetail from '@/components/strategies/StrategyDetail';

interface Props {
  params: Promise<{ locale: string; id: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { id, locale } = await params;
  const t = await getTranslations({ locale, namespace: 'data.strategies' });
  
  const strategy = STRATEGIES.find(s => s.id === id);
  if (!strategy) return {};

  const name = t(`${id}.name` as any);
  const tagline = t(`${id}.tagline` as any);

  return {
    title: `${name} | ClearInvest`,
    description: tagline,
    alternates: {
      canonical: `https://clearinvest.be/${locale}/strategies/${id}`,
    },
  }
}

export async function generateStaticParams() {
  const locales = ['fr', 'nl', 'en'];
  return locales.flatMap(locale =>
    STRATEGIES.map(s => ({ locale, id: s.id }))
  );
}

export default async function StrategyDetailRoute({ params }: Props) {
  const { id } = await params;
  const strategy = STRATEGIES.find(s => s.id === id);
  if (!strategy) notFound();

  const content = STRATEGY_CONTENT[id] ?? null;

  return <StrategyDetail strategy={strategy} content={content} />;
}
