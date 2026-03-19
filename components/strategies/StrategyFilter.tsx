'use client';

import { useTranslations } from 'next-intl';
import TerInfoIcon from './TerInfoIcon';

export type GeographicValue = 'global' | 'europe' | 'us' | 'china' | 'emerging';

export interface FilterState {
  horizon: 'short' | 'long' | null;
  esg: boolean | null;            // null = indifférent
  complexity: 'simple' | 'intermediate' | null;
  geographic: GeographicValue[];  // AND logic when multiple selected
}

export const EMPTY_FILTERS: FilterState = {
  horizon: null,
  esg: null,
  complexity: null,
  geographic: [],
};

interface Props {
  filters: FilterState;
  onChange: (f: FilterState) => void;
}

function Pill({
  label,
  active,
  disabled,
  onClick,
}: {
  label: string;
  active: boolean;
  disabled?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
        active
          ? 'border-[var(--forest)] bg-[var(--forest)] text-white'
          : 'border-[var(--warm-tan)] bg-transparent text-[var(--charcoal)]/65 hover:border-[var(--forest)]/60 hover:text-[var(--charcoal)]'
      } disabled:cursor-not-allowed disabled:opacity-40`}
    >
      {label}
    </button>
  );
}

export default function StrategyFilter({ filters, onChange }: Props) {
  const t = useTranslations('strategiesFilter');

  const hasAnyFilter =
    filters.horizon !== null ||
    filters.esg !== null ||
    filters.complexity !== null ||
    filters.geographic.length > 0;

  function setHorizon(v: 'short' | 'long') {
    onChange({ ...filters, horizon: filters.horizon === v ? null : v });
  }

  function setEsg(v: boolean | null) {
    onChange({ ...filters, esg: filters.esg === v ? null : v });
  }

  function setComplexity(v: 'simple' | 'intermediate') {
    onChange({ ...filters, complexity: filters.complexity === v ? null : v });
  }

  function toggleGeo(v: GeographicValue) {
    const already = filters.geographic.includes(v);
    onChange({
      ...filters,
      geographic: already
        ? filters.geographic.filter(g => g !== v)
        : [...filters.geographic, v],
    });
  }

  return (
    <div className="space-y-4 rounded-2xl border border-[var(--warm-tan)]/40 bg-[var(--warm-white)] p-5">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-[var(--charcoal)]">{t('heading')}</p>
        {hasAnyFilter && (
          <button
            type="button"
            onClick={() => onChange(EMPTY_FILTERS)}
            className="text-xs text-[var(--forest)] underline underline-offset-2 hover:no-underline"
          >
            {t('reset')}
          </button>
        )}
      </div>

      {/* Row 1: Horizon */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        <span className="flex w-36 shrink-0 items-center gap-1.5 text-xs text-[var(--charcoal)]/50">
          {t('q_horizon')}
          <TerInfoIcon text={t('horizon_tooltip')} />
        </span>
        <div className="flex flex-wrap gap-2">
          <Pill label={t('horizon_short')} active={filters.horizon === 'short'} onClick={() => setHorizon('short')} />
          <Pill label={t('horizon_long')}  active={filters.horizon === 'long'}  onClick={() => setHorizon('long')} />
        </div>
      </div>

      {/* Row 2: ESG */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        <span className="w-36 shrink-0 text-xs text-[var(--charcoal)]/50">{t('q_esg')}</span>
        <div className="flex flex-wrap gap-2">
          <Pill label={t('esg_yes')}         active={filters.esg === true} onClick={() => setEsg(true)} />
          <Pill label={t('esg_indifferent')} active={false}                onClick={() => onChange({ ...filters, esg: null })} />
        </div>
      </div>

      {/* Row 3: Complexity */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        <span className="w-36 shrink-0 text-xs text-[var(--charcoal)]/50">{t('q_complexity')}</span>
        <div className="flex flex-wrap gap-2">
          <Pill label={t('complexity_simple')}       active={filters.complexity === 'simple'}       onClick={() => setComplexity('simple')} />
          <Pill label={t('complexity_intermediate')} active={filters.complexity === 'intermediate'} onClick={() => setComplexity('intermediate')} />
        </div>
      </div>

      {/* Row 4: Geography (multi-select) */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        <span className="w-36 shrink-0 text-xs text-[var(--charcoal)]/50">{t('q_geographic')}</span>
        <div className="flex flex-wrap gap-2">
          <Pill label={t('geo_global')}    active={filters.geographic.includes('global')}    onClick={() => toggleGeo('global')} />
          <Pill label={t('geo_europe')}    active={filters.geographic.includes('europe')}    onClick={() => toggleGeo('europe')} />
          <Pill label={t('geo_us')}        active={filters.geographic.includes('us')}        onClick={() => toggleGeo('us')} />
          <Pill label={t('geo_china')}     active={filters.geographic.includes('china')}     onClick={() => toggleGeo('china')} />
          <Pill label={t('geo_emerging')}  active={filters.geographic.includes('emerging')}  onClick={() => toggleGeo('emerging')} />
        </div>
      </div>
    </div>
  );
}
