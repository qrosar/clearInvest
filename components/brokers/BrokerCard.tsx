'use client';

import { useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import type { Broker } from '@/lib/brokers/brokers';

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

function CgtBadge({ level }: { level: 'high' | 'low' }) {
  const t = useTranslations('brokers');
  if (level === 'high') {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2 py-0.5 text-[11px] font-semibold text-amber-700">
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

interface Props {
  broker: Broker;
}

export default function BrokerCard({ broker }: Props) {
  const t = useTranslations('brokers');
  const [expanded, setExpanded] = useState(false);

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
            {(!broker.tax.tobAutomated || !broker.tax.cgt2026Automated) && (
              <span className="rounded-full border border-amber-200 bg-amber-100 px-2.5 py-0.5 text-[11px] font-bold text-amber-700">
                ⚠️ {t('badge_warning')}
              </span>
            )}
          </div>
          <p className="mt-0.5 text-sm text-[var(--charcoal)]/60">{broker.tagline}</p>
        </div>
        <div className="shrink-0">
          {broker.regulatedInBelgium ? (
            <span className="rounded-full bg-[var(--forest)]/10 px-2 py-0.5 text-[10px] font-semibold text-[var(--forest)]">
              🔒 {t('regulated_be')}
            </span>
          ) : (
            <span className="rounded-full bg-[var(--warm-tan)]/40 px-2 py-0.5 text-[10px] font-semibold text-[var(--charcoal)]/50">
              {t('regulated_eu')}
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
          {broker.feeStory.map((item, i) => {
            const valueClass =
              item.highlight === 'good'
                ? 'text-[var(--forest)] font-semibold'
                : item.highlight === 'bad'
                  ? 'text-amber-700 font-semibold'
                  : 'text-[var(--charcoal)]';
            return (
              <div key={i} className="flex items-center justify-between gap-2">
                <span className="text-sm text-[var(--charcoal)]/60">{item.label}</span>
                <span className={`flex items-center text-sm ${valueClass}`}>
                  <span className="font-mono">{item.value}</span>
                  {item.note && <InfoTip text={item.note} />}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* CGT 2026 */}
      <div className="rounded-xl border border-[var(--warm-tan)]/40 bg-[var(--warm-cream)] px-3 py-2">
        <span className="block text-[10px] uppercase tracking-wide text-[var(--charcoal)]/40">{t('cgt_2026')}</span>
        <div className="mt-1">
          <CgtBadge level={broker.tax.cgt2026Level} />
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
                {pro}
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
                {con}
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

      {/* ETF availability note (MeDirect) */}
      {broker.etfAvailabilityNote && (
        <div className="flex gap-2 rounded-xl border border-[var(--warm-tan)]/40 bg-[var(--warm-cream)] px-3 py-2.5 text-xs text-[var(--charcoal)]/60">
          <span className="shrink-0">ℹ️</span>
          <span>{broker.etfAvailabilityNote}</span>
        </div>
      )}

      {/* Ideal for */}
      <p className="border-t border-[var(--warm-tan)]/40 pt-3 text-sm text-[var(--charcoal)]/70">
        <span className="mr-1 text-[11px] font-semibold uppercase not-italic tracking-wide text-[var(--charcoal)]/40">
          {t('ideal_for')}
        </span>
        <span className="italic">{broker.idealFor}</span>
      </p>

      {/* Warning note */}
      {broker.warningNote && (
        <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          <p>{broker.warningNote}</p>
          {broker.guideLink && (
            <p className="mt-2">
              <Link
                href={broker.guideLink.href}
                className="font-semibold underline underline-offset-2 hover:text-amber-900"
              >
                → {broker.guideLink.text}
              </Link>
            </p>
          )}
        </div>
      )}
    </div>
  );
}
