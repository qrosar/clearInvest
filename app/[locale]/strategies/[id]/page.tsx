import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { STRATEGIES } from '@/lib/strategies/strategies';
import { STRATEGY_CONTENT } from '@/lib/strategies/strategyContent';
import StrategyDetail from '@/components/strategies/StrategyDetail';
import { buildAlternates } from '@/lib/site';
import { asDynamic } from '@/lib/i18n/dynamicKeys';

interface Props {
  params: Promise<{ locale: string; id: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { id, locale } = await params;
  const t = await getTranslations({ locale, namespace: 'data.strategies' });
  const tDyn = asDynamic(t);
  
  const strategy = STRATEGIES.find(s => s.id === id);
  if (!strategy) return {};

  const name = tDyn(`${id}.name`);
  const tagline = tDyn(`${id}.tagline`);

  return {
    // The locale layout's title template already appends "| ClearInvest".
    title: name,
    description: tagline,
    alternates: buildAlternates(locale, `/strategies/${id}`),
  }
}

export async function generateStaticParams() {
  const locales = ['fr', 'nl', 'en'];
  return locales.flatMap(locale =>
    STRATEGIES.map(s => ({ locale, id: s.id }))
  );
}

export default async function StrategyDetailRoute({ params }: Props) {
  const { id, locale } = await params;
  setRequestLocale(locale);

  const strategy = STRATEGIES.find(s => s.id === id);
  if (!strategy) notFound();

  const content = STRATEGY_CONTENT[id] ?? null;

  return <StrategyDetail strategy={strategy} content={content} />;
}
