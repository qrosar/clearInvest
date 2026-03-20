'use client';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { useTranslations } from 'next-intl';
import type { Product } from '@/lib/calculator/products';
import { formatEuro } from '@/lib/calculator/compute';

interface Props {
  data: Record<string, number>[];
  products: Product[];
}

interface TooltipEntry {
  dataKey?: string;
  color?: string;
  name?: string;
  value?: number;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: TooltipEntry[];
  label?: string | number;
}

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  const t = useTranslations('calculator');
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-[var(--warm-tan)]/50 bg-[var(--warm-white)] p-3 shadow-lg text-xs">
      <p className="mb-2 font-semibold text-[var(--charcoal)]">
        {t('chart_after_years', { count: Number(label) })}
      </p>
      {payload.map((entry, i) => (
        <div key={entry.dataKey ?? i} className="flex items-center gap-2 py-0.5">
          <span className="h-2 w-2 rounded-full flex-shrink-0" style={{ backgroundColor: entry.color }} />
          <span className="text-[var(--charcoal)]/60 truncate">{entry.name}</span>
          <span className="ml-auto font-semibold text-[var(--charcoal)]">
            {formatEuro(entry.value ?? 0)}
          </span>
        </div>
      ))}
    </div>
  );
}

function yFormatter(value: number): string {
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}M€`;
  if (value >= 1_000) return `${Math.round(value / 1_000)}k€`;
  return `${value}€`;
}

export default function ResultChart({ data, products }: Props) {
  if (!data.length || !products.length) return null;

  return (
    <ResponsiveContainer width="100%" height={320}>
      <LineChart data={data} margin={{ top: 5, right: 8, left: 0, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e5dfd0" />
        <XAxis
          dataKey="year"
          tickLine={false}
          axisLine={false}
          tick={{ fontSize: 11, fill: '#2c2c2c', opacity: 0.45 }}
          tickFormatter={v => `${v} ans`}
          interval="preserveStartEnd"
        />
        <YAxis
          tickLine={false}
          axisLine={false}
          tick={{ fontSize: 11, fill: '#2c2c2c', opacity: 0.45 }}
          tickFormatter={yFormatter}
          width={52}
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend
          formatter={(value: string) => (
            <span style={{ fontSize: 11, color: '#2c2c2c', opacity: 0.6 }}>{value}</span>
          )}
        />
        {products.map(product => (
          <Line
            key={product.id}
            type="monotone"
            dataKey={product.id}
            name={product.name}
            stroke={product.color}
            strokeWidth={2.5}
            dot={false}
            activeDot={{ r: 4, strokeWidth: 0 }}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
}
