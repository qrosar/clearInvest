import { notFound } from 'next/navigation';
import { STRATEGIES } from '@/lib/strategies/strategies';
import { STRATEGY_CONTENT } from '@/lib/strategies/strategyContent';
import StrategyDetail from '@/components/strategies/StrategyDetail';

interface Props {
  params: Promise<{ locale: string; id: string }>;
}

export async function generateStaticParams() {
  return STRATEGIES.map(s => ({ id: s.id }));
}

export default async function StrategyDetailRoute({ params }: Props) {
  const { id } = await params;
  const strategy = STRATEGIES.find(s => s.id === id);
  if (!strategy) notFound();

  const content = STRATEGY_CONTENT[id] ?? null;

  return <StrategyDetail strategy={strategy} content={content} />;
}
