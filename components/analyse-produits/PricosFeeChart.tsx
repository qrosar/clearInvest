'use client';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  ResponsiveContainer,
} from 'recharts';
import { useTranslations } from 'next-intl';

interface DataPoint {
  year: number;
  cumTaxBenefit: number;
  cumFees: number;
}

function buildChartData(): { data: DataPoint[]; crossoverYear: number } {
  const data: DataPoint[] = [];
  let cumFees = 0;
  let crossoverYear = 30;

  for (let year = 1; year <= 30; year++) {
    // Future value of annuity: 1 050 €/yr at 4.5% gross (end-of-year contributions)
    const fv = 1050 * ((Math.pow(1.045, year) - 1) / 0.045);
    const annualFee = fv * 0.0141;
    cumFees += annualFee;
    const cumTaxBenefit = 315 * year;

    data.push({
      year,
      cumTaxBenefit: Math.round(cumTaxBenefit),
      cumFees: Math.round(cumFees),
    });

    if (crossoverYear === 30 && cumFees > cumTaxBenefit) {
      crossoverYear = year;
    }
  }

  return { data, crossoverYear };
}

function yFormatter(value: number): string {
  if (value >= 1000) return `${Math.round(value / 1000)}k€`;
  return `${value}€`;
}

interface TooltipEntry {
  color?: string;
  name?: string;
  value?: number;
  dataKey?: string;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: TooltipEntry[];
  label?: string | number;
  lineALabel: string;
  lineBLabel: string;
}

function CustomTooltip({ active, payload, label, lineALabel, lineBLabel }: CustomTooltipProps) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-[var(--warm-tan)]/50 bg-[var(--warm-white)] p-3 shadow-lg text-xs">
      <p className="mb-2 font-semibold text-[var(--charcoal)]">Année {label}</p>
      {payload.map((entry, i) => {
        const name = entry.dataKey === 'cumTaxBenefit' ? lineALabel : lineBLabel;
        return (
          <div key={entry.dataKey ?? i} className="flex items-center gap-2 py-0.5">
            <span className="h-2 w-2 rounded-full flex-shrink-0" style={{ backgroundColor: entry.color }} />
            <span className="text-[var(--charcoal)]/60">{name}</span>
            <span className="ml-auto font-semibold text-[var(--charcoal)]">
              {(entry.value ?? 0).toLocaleString('fr-BE')} €
            </span>
          </div>
        );
      })}
    </div>
  );
}

export default function PricosFeeChart() {
  const t = useTranslations('kbcPricosAnalysis');
  const { data, crossoverYear } = buildChartData();

  const lineALabel = t('chart_line_a');
  const lineBLabel = t('chart_line_b');
  const crossoverLabel = t('chart_crossover_label', { n: crossoverYear });

  return (
    <div className="mt-8">
      <ResponsiveContainer width="100%" height={260}>
        <LineChart data={data} margin={{ top: 16, right: 16, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5dfd0" />
          <XAxis
            dataKey="year"
            tickLine={false}
            axisLine={false}
            tick={{ fontSize: 11, fill: '#2c2c2c', opacity: 0.5 }}
            interval="preserveStartEnd"
            label={{
              value: t('chart_years'),
              position: 'insideBottomRight',
              offset: -4,
              fontSize: 11,
              fill: '#2c2c2c',
              opacity: 0.5,
            }}
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            tick={{ fontSize: 11, fill: '#2c2c2c', opacity: 0.5 }}
            tickFormatter={yFormatter}
            width={48}
          />
          <Tooltip
            content={
              <CustomTooltip
                lineALabel={lineALabel}
                lineBLabel={lineBLabel}
              />
            }
          />
          <ReferenceLine
            x={crossoverYear}
            stroke="#2c2c2c"
            strokeOpacity={0.4}
            strokeDasharray="5 4"
            label={{
              value: crossoverLabel,
              position: 'top',
              fontSize: 10,
              fill: '#2c2c2c',
              opacity: 0.6,
            }}
          />
          {/* Line A — cumulative tax benefit (forest green) */}
          <Line
            type="monotone"
            dataKey="cumTaxBenefit"
            name={lineALabel}
            stroke="var(--forest)"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4, strokeWidth: 0 }}
          />
          {/* Line B — cumulative management fees (warm red) */}
          <Line
            type="monotone"
            dataKey="cumFees"
            name={lineBLabel}
            stroke="#e05252"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4, strokeWidth: 0 }}
          />
        </LineChart>
      </ResponsiveContainer>

      <p className="mt-2 text-center text-xs italic text-[var(--charcoal)]/40">
        {t('chart_caption')}
        {' '}
        <span className="not-italic">{t('chart_disclaimer')}</span>
      </p>
    </div>
  );
}
