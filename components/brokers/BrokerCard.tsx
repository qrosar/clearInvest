'use client';

import { useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import type { Broker } from '@/lib/brokers/brokers';
import { asDynamic, type DynamicTranslator } from '@/lib/i18n/dynamicKeys';

// ── Portal tooltip for fee notes ──────────────────────────────────────────────
function InfoTip({ text }: { text: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);

  function show() {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    setPos({ x: r.left + r.width / 2, y: r.top });
  }
  function hide() {
    setPos(null);
  }

  return (
    <>
      <span
        ref={ref}
        onMouseEnter={show}
        onMouseLeave={hide}
        className="ml-1 inline-flex h-4 w-4 cursor-help items-center justify-center rounded-full border border-[var(--charcoal)]/25 text-[9px] text-[var(--charcoal)]/40 hover:border-[var(--charcoal)]/40 hover:text-[var(--charcoal)]/60"
      >
        i
      </span>
      {pos &&
        createPortal(
          <div
            role="tooltip"
            style={{
              position: 'fixed',
              left: `${pos.x}px`,
              top: `${pos.y - 10}px`,
              transform: 'translate(-50%, -100%)',
              zIndex: 9999,
              maxWidth: 'min(260px, calc(100vw - 2rem))',
            }}
            className="pointer-events-none rounded-lg bg-[var(--charcoal)] px-3 py-2 text-[11px] leading-relaxed text-white shadow-xl"
          >
            {text}
            <span
              aria-hidden
              style={{
                position: 'absolute',
                left: '50%',
                top: '100%',
                transform: 'translateX(-50%)',
                width: 0,
                height: 0,
                borderLeft: '5px solid transparent',
                borderRight: '5px solid transparent',
                borderTop: '5px solid var(--charcoal)',
              }}
            />
          </div>,
          document.body,
        )}
    </>
  );
}

function CgtBadge({ cgtKey }: { cgtKey: string }) {
  const t = useTranslations('brokers');
  if (cgtKey !== 'cgt_manual') {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-[var(--forest)]/10 px-2 py-0.5 text-[11px] font-semibold text-[var(--forest)]">
        {t('cgt_auto')}
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-red-100 px-2 py-0.5 text-[11px] font-semibold text-red-700">
      ✗ {t('cgt_manual')}
    </span>
  );
}

/**
 * Fee fields hold either a message key or a ready-to-display literal ("0,25%").
 * Bare snake_case is the key shape; anything else is already display text.
 */
function resolve(t: DynamicTranslator, value: string) {
  return /^[a-z][a-z0-9_]*$/.test(value) ? t(value) : value;
}

/** Neutral on/off pill for a binary feature (savings plan, fractional shares). */
function TraitBadge({ on, label }: { on: boolean; label: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold ${
        on
          ? 'bg-[var(--forest)]/10 text-[var(--forest)]'
          : 'bg-[var(--warm-tan)]/30 text-[var(--charcoal)]/45'
      }`}
    >
      {on ? '✓' : '✗'} {label}
    </span>
  );
}

interface Props {
  broker: Broker;
}

export default function BrokerCard({ broker }: Props) {
  const t = useTranslations('brokers');
  const tDyn = asDynamic(t);
  const [expanded, setExpanded] = useState(false);

  // A Belgian tax the broker leaves to you — the only thing worth an amber alarm.
  const taxRisk =
    !broker.automation.tobAuto || broker.automation.cgtAuto === 'cgt_manual';

  const maxItems = 4;
  const prosToShow = expanded ? broker.pros : broker.pros.slice(0, maxItems);
  const consToShow = expanded ? broker.cons : broker.cons.slice(0, maxItems);
  const hasMore = broker.pros.length > maxItems || broker.cons.length > maxItems;

  return (
    <div
      id={`broker-${broker.id}`}
      className={`relative flex flex-col gap-4 rounded-2xl border bg-[var(--warm-white)] p-5 ${
        broker.recommendedBadge
          ? 'border-[var(--forest)]/40 shadow-sm'
          : 'border-[var(--warm-tan)]/40'
      }`}
    >
      {/* Recommended accent bar */}
      {broker.recommendedBadge && (
        <div
          className={`absolute left-0 top-0 h-full w-1 rounded-l-2xl ${
            broker.recommendedBadge === 'meilleur_cout'
              ? 'bg-[var(--sage)]'
              : 'bg-[var(--forest)]'
          }`}
        />
      )}

      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-lg font-bold text-[var(--charcoal)]">{broker.name}</h3>
            {broker.recommendedBadge === 'meilleur_cout' && (
              <span className="rounded-full border border-[var(--sage)]/30 bg-[var(--sage)]/20 px-2.5 py-0.5 text-[11px] font-bold text-[var(--sage)]">
                🏆 {t('badge_meilleur_cout')}
              </span>
            )}
            {broker.recommendedBadge === 'meilleur_automation' && (
              <span className="rounded-full border border-[var(--forest)]/30 bg-[var(--forest)]/10 px-2.5 py-0.5 text-[11px] font-bold text-[var(--forest)]">
                🤖 {t('badge_meilleur_automation')}
              </span>
            )}
            {taxRisk && (
              <span className="rounded-full border border-amber-200 bg-amber-100 px-2.5 py-0.5 text-[11px] font-bold text-amber-700">
                ⚠️ {t('badge_warning')}
              </span>
            )}
          </div>
          <p className="mt-0.5 text-sm text-[var(--charcoal)]/60">{tDyn(broker.tagline)}</p>
        </div>
        <div className="shrink-0">
          {broker.regulatedIn === 'regulated_be' ? (
            <span className="rounded-full bg-[var(--forest)]/10 px-2 py-0.5 text-[10px] font-semibold text-[var(--forest)]">
              🔒 {t('regulated_be')}
            </span>
          ) : (
            <span className="rounded-full bg-[var(--warm-tan)]/40 px-2 py-0.5 text-[10px] font-semibold text-[var(--charcoal)]/50">
              {tDyn(broker.regulatedIn)}
            </span>
          )}
        </div>
      </div>

      {/* Fee story */}
      <div>
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-[var(--charcoal)]/40">
          {t('fee_story_label')}
        </p>
        <div className="space-y-1.5">
          {broker.feeStory.map((item, i) => (
            <div key={i} className="flex items-center justify-between gap-2">
              <span className={`text-sm ${
                item.highlight === 'good' ? 'text-[var(--forest)] font-medium' : 
                item.highlight === 'bad' ? 'text-red-600 font-medium' : 
                'text-[var(--charcoal)]/60'
              }`}>{tDyn(item.label)}</span>
              <span className="flex items-center text-sm text-[var(--charcoal)]">
                <span className={`font-mono ${
                  item.highlight === 'good' ? 'text-[var(--forest)] font-bold' : 
                  item.highlight === 'bad' ? 'text-red-600 font-bold' : 
                  ''
                }`}>{resolve(tDyn, item.value)}</span>
                {item.note && <InfoTip text={tDyn(item.note)} />}
              </span>
            </div>
          ))}
        </div>

        {/* Recurring costs — invisible on a per-order comparison, decisive over a decade */}
        <div className="mt-2.5 flex flex-wrap gap-x-4 gap-y-1 border-t border-[var(--warm-tan)]/40 pt-2 text-[11px] text-[var(--charcoal)]/50">
          <span>
            {t('fee_fx_label')}{' '}
            <span className="font-mono text-[var(--charcoal)]/75">
              {resolve(tDyn, broker.fees.fxFee)}
            </span>
          </span>
          <span>
            {t('fee_custody_label')}{' '}
            <span
              className={`font-mono ${
                broker.fees.custodyFee === 'fees_none'
                  ? 'text-[var(--charcoal)]/75'
                  : 'font-semibold text-amber-700'
              }`}
            >
              {resolve(tDyn, broker.fees.custodyFee)}
            </span>
          </span>
        </div>
      </div>

      {/* Automation at a glance — CGT withholding, plan, fractional shares */}
      <div className="rounded-xl border border-[var(--warm-tan)]/40 bg-[var(--warm-cream)] px-3 py-2">
        <span className="block text-[10px] uppercase tracking-wide text-[var(--charcoal)]/40">
          {t('automation_label')}
        </span>
        <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
          <CgtBadge cgtKey={broker.automation.cgtAuto} />
          <TraitBadge on={broker.automation.savingsPlan} label={t('savings_plan')} />
          <TraitBadge on={broker.automation.fractionalShares} label={t('col_fractional')} />
        </div>
      </div>

      {/* Pros & cons */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div>
          <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-wide text-[var(--forest)]">
            {t('pros')}
          </p>
          <ul className="space-y-1">
            {prosToShow.map((pro, i) => (
              <li key={i} className="flex gap-2 text-sm text-[var(--charcoal)]">
                <span className="mt-0.5 shrink-0 text-[var(--forest)]">●</span>
                {tDyn(pro)}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-wide text-red-500">
            {t('cons')}
          </p>
          <ul className="space-y-1">
            {consToShow.map((con, i) => (
              <li key={i} className="flex gap-2 text-sm text-[var(--charcoal)]">
                <span className="mt-0.5 shrink-0 text-red-400">●</span>
                {tDyn(con)}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {hasMore && (
        <button
          onClick={() => setExpanded((e) => !e)}
          className="self-start text-xs text-[var(--forest)] underline underline-offset-2 hover:no-underline"
        >
          {expanded ? t('show_less') : t('show_more')}
        </button>
      )}

      {/* Ideal for */}
      {broker.idealFor && (
        <p className="border-t border-[var(--warm-tan)]/40 pt-3 text-sm text-[var(--charcoal)]/70">
          <span className="mr-1 text-[11px] font-semibold uppercase not-italic tracking-wide text-[var(--charcoal)]/40">
            {t('ideal_for')}
          </span>
          <span className="italic">{tDyn(broker.idealFor)}</span>
        </p>
      )}

      {/* Trailing note — amber only when it flags a real tax risk */}
      {broker.warningNote && (
        <div
          className={`rounded-xl border px-4 py-3 text-sm ${
            taxRisk
              ? 'border-amber-200 bg-amber-50 text-amber-800'
              : 'border-[var(--warm-tan)]/50 bg-[var(--warm-cream)] text-[var(--charcoal)]/70'
          }`}
        >
          {tDyn(broker.warningNote).split(' | ').map((para, i) => (
            <p key={i} className={i > 0 ? 'mt-2' : ''}>{para}</p>
          ))}
          {broker.guideLink && (
            <p className="mt-2">
              <Link
                href={broker.guideLink.href}
                className="font-semibold underline underline-offset-2 hover:text-amber-900"
              >
                → {tDyn(broker.guideLink.text)}
              </Link>
            </p>
          )}
        </div>
      )}
    </div>
  );
}
