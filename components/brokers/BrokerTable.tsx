'use client';

import React, { useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useTranslations } from 'next-intl';
import type { Broker } from '@/lib/brokers/brokers';
import { asDynamic, type DynamicTranslator } from '@/lib/i18n/dynamicKeys';

// ── Portal tooltip — same pattern as TerInfoIcon ──────────────────────────────
function Tip({ text, children }: { text: string; children: React.ReactNode }) {
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
      <span ref={ref} onMouseEnter={show} onMouseLeave={hide} className="cursor-help">
        {children}
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

// ── Helpers ───────────────────────────────────────────────────────────────────

// Explicit display order, grouped by tier
const DISPLAY_ORDER = [
  'medirect', 'saxo',                                              // recommended
  'ing', 'bolero', 'rebel', 'degiro', 'mexem', 'keytrade', 'bux',  // situational
  'trade_republic', 'ibkr', 'revolut',                             // not_recommended
  'robinhood',                                                     // avoid
];

// ── Cell components ───────────────────────────────────────────────────────────
function Yes() {
  return (
    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[var(--forest)]/10 text-sm font-bold text-[var(--forest)]">
      ✓
    </span>
  );
}
function No() {
  return (
    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-red-50 text-sm font-bold text-red-500">
      ✗
    </span>
  );
}
function YesStar({ href }: { href: string }) {
  return (
    <span className="inline-flex items-center gap-0.5">
      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[var(--forest)]/10 text-sm font-bold text-[var(--forest)]">
        ✓
      </span>
      <a href={href} className="text-[10px] font-semibold text-[var(--charcoal)]/40 no-underline">
        †
      </a>
    </span>
  );
}

function CgtAuto() {
  const t = useTranslations('brokers');
  return (
    <span className="inline-flex h-6 items-center justify-center whitespace-nowrap rounded-full bg-[var(--forest)]/10 px-2 text-[10px] font-semibold text-[var(--forest)]">
      {t('cgt_auto')}
    </span>
  );
}

/**
 * Fee fields hold either a message key or a ready-to-display literal ("€2,50").
 * Bare snake_case is the key shape; anything else is already display text.
 */
function resolve(t: DynamicTranslator, value: string) {
  return /^[a-z][a-z0-9_]*$/.test(value) ? t(value) : value;
}

function FeeCell({ value, note }: { value: string; note?: string }) {
  const isEmpty = value === '—';
  const baseClass = `font-mono text-xs ${isEmpty ? 'text-[var(--charcoal)]/30' : 'text-[var(--charcoal)]'}`;
  if (!note) return <span className={baseClass}>{value}</span>;
  return (
    <Tip text={note}>
      <span className={baseClass}>
        {value}
        <sup className="ml-px text-[9px] font-semibold not-italic text-[var(--charcoal)]/40">*</sup>
      </span>
    </Tip>
  );
}

function ColHeader({ label, tooltip }: { label: string; tooltip: string }) {
  return (
    <Tip text={tooltip}>
      <span className="inline-flex items-center justify-center gap-1">
        {label}
        <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-[var(--charcoal)]/25 text-[9px] text-[var(--charcoal)]/40">
          i
        </span>
      </span>
    </Tip>
  );
}

// Shared cell padding constants
const TH = 'px-3 py-3 text-[11px] font-semibold uppercase tracking-wide text-[var(--charcoal)]/50';
const TD = 'px-3 py-2.5';

// ── Main component ────────────────────────────────────────────────────────────
interface Props {
  brokers: Broker[];
  highlightIds: string[];
}

type TierKey = 'recommended' | 'situational' | 'not_recommended' | 'avoid';

export default function BrokerTable({ brokers, highlightIds }: Props) {
  const t = useTranslations('brokers');
  const tDyn = asDynamic(t);

  // Sort brokers by display order
  const sorted = [...brokers].sort((a, b) => {
    const ai = DISPLAY_ORDER.indexOf(a.id);
    const bi = DISPLAY_ORDER.indexOf(b.id);
    return (ai === -1 ? 999 : ai) - (bi === -1 ? 999 : bi);
  });

  const tierGroups: Array<{ key: TierKey; label: string; rows: Broker[] }> = [
    {
      key: 'recommended',
      label: t('tier_label_recommended'),
      rows: sorted.filter((b) => b.tier === 'recommended'),
    },
    {
      key: 'situational',
      label: t('tier_label_situational'),
      rows: sorted.filter((b) => b.tier === 'situational'),
    },
    {
      key: 'not_recommended',
      label: t('tier_label_not_recommended'),
      rows: sorted.filter((b) => b.tier === 'not_recommended'),
    },
    {
      key: 'avoid',
      label: t('tier_label_avoid'),
      rows: sorted.filter((b) => b.tier === 'avoid'),
    },
  ];

  // Left border color per tier
  const tierBorderColor: Record<TierKey, string> = {
    recommended: 'bg-[var(--sage)]',
    situational: '',
    not_recommended: 'bg-[var(--warm-tan)]',
    avoid: 'bg-red-400',
  };

  return (
    <div>
      <div className="overflow-x-auto rounded-2xl border border-[var(--warm-tan)]/40">
        <div className="h-1 rounded-t-2xl bg-[var(--forest)]" />

        <table className="w-full min-w-[780px] table-fixed bg-[var(--warm-white)] text-sm">
          {/* Column widths: Broker | Fixed | % | Savings | Fractional | TOB | CGT | Protection */}
          <colgroup>
            <col style={{ width: '23%' }} />
            <col style={{ width: '12%' }} />
            <col style={{ width: '12%' }} />
            <col style={{ width: '11%' }} />
            <col style={{ width: '11%' }} />
            <col style={{ width: '9%' }} />
            <col style={{ width: '9%' }} />
            <col style={{ width: '13%' }} />
          </colgroup>

          {/* ── Header ─────────────────────────────────────────────────── */}
          <thead>
            <tr className="border-b border-[var(--warm-tan)]/40 bg-[var(--warm-cream)]">
              <th className={`sticky left-0 z-10 bg-[var(--warm-cream)] ${TH} text-left`}>
                {t('col_broker')}
              </th>
              <th className={`${TH} text-center`}>
                <ColHeader label={t('col_fixed_fee')} tooltip={t('fee_tooltip')} />
              </th>
              <th className={`${TH} text-center`}>
                <ColHeader label={t('col_percent_fee')} tooltip={t('fee_tooltip')} />
              </th>
              <th className={`${TH} text-center`}>
                {t('col_savings_plan')}
              </th>
              <th className={`${TH} text-center`}>
                <ColHeader label={t('col_fractional')} tooltip={t('fractional_tooltip')} />
              </th>
              <th className={`${TH} text-center`}>
                {t('col_tob_auto')}
              </th>
              <th className={`${TH} text-center`}>
                <ColHeader label={t('col_cgt_2026')} tooltip={t('cgt_2026_tooltip')} />
              </th>
              <th className={`${TH} text-center`}>
                <ColHeader label={t('col_protection_cash')} tooltip={t('protection_cash_tooltip')} />
              </th>
            </tr>
          </thead>

          {/* ── Body — grouped by tier ──────────────────────────────────── */}
          <tbody>
            {tierGroups.map(({ key, label, rows }) => (
              rows.length === 0 ? null : (
                <React.Fragment key={key}>
                  {/* Tier divider row */}
                  <tr key={`divider-${key}`} className="border-b border-[var(--warm-tan)]/20 bg-[var(--warm-cream)]/60">
                    <td colSpan={8} className="px-4 py-1.5">
                      <span className="text-[10px] font-semibold uppercase tracking-widest text-[var(--charcoal)]/40">
                        {label}
                      </span>
                    </td>
                  </tr>

                  {/* Broker rows */}
                  {rows.map((broker, idx) => {
                    const dimmed = highlightIds.length > 0 && !highlightIds.includes(broker.id);
                    const rowBg = idx % 2 === 0 ? 'bg-[var(--warm-white)]' : 'bg-[var(--warm-cream)]';
                    const leftBorder = tierBorderColor[key];

                    return (
                      <tr
                        key={broker.id}
                        className={`border-b border-[var(--warm-tan)]/30 last:border-0 transition-opacity ${
                          dimmed ? 'opacity-25' : ''
                        } ${rowBg}`}
                      >
                        {/* Sticky broker name */}
                        <td className={`relative sticky left-0 z-10 ${TD} ${rowBg}`}>
                          {leftBorder && (
                            <div className={`absolute left-0 top-0 h-full w-0.5 ${leftBorder}`} />
                          )}
                          <div className="flex flex-wrap items-center gap-1.5">
                            <span className="whitespace-nowrap font-semibold text-[var(--charcoal)]">
                              {broker.name}
                            </span>
                            {broker.recommendedBadge && (
                              <span
                                className={`rounded-full px-1.5 py-0.5 text-[10px] font-bold ${
                                  broker.recommendedBadge === 'meilleur_cout'
                                    ? 'bg-[var(--sage)]/20 text-[var(--sage)]'
                                    : 'bg-[var(--forest)]/10 text-[var(--forest)]'
                                }`}
                              >
                                {broker.recommendedBadge === 'meilleur_cout' ? '🏆' : '🤖'}
                              </span>
                            )}
                            {/*
                              ⚠️ is reserved for a real tax risk — a broker that
                              leaves the TOB or the 2026 withholding to you. Other
                              notes (deposit-scheme jurisdiction, ETF coverage) get
                              a neutral ℹ️ so the alarm keeps its meaning.
                            */}
                            {broker.warningNote &&
                              (!broker.automation.tobAuto ||
                              broker.automation.cgtAuto === 'cgt_manual' ? (
                                <a
                                  href={`#broker-${broker.id}`}
                                  className="no-underline text-amber-400 hover:text-amber-500"
                                  title={t('warning_scroll_hint')}
                                >
                                  ⚠️
                                </a>
                              ) : (
                                <a
                                  href={`#broker-${broker.id}`}
                                  className="text-[10px] text-[var(--charcoal)]/35 no-underline hover:text-[var(--charcoal)]/60"
                                  title={t('note_scroll_hint')}
                                >
                                  ℹ️
                                </a>
                              ))}
                          </div>
                        </td>

                        <td className={`${TD} text-center`}>
                          <FeeCell
                            value={resolve(tDyn, broker.fees.fixedFeePerTrade)}
                            note={broker.fees.note ? tDyn(broker.fees.note) : undefined}
                          />
                        </td>
                        <td className={`${TD} text-center`}>
                          <FeeCell
                            value={resolve(tDyn, broker.fees.percentFeePerTrade)}
                            note={broker.id === 'robinhood' ? tDyn('robinhood_fs0_note') : undefined}
                          />
                        </td>

                        <td className={`${TD} text-center`}>
                          {broker.automation.savingsPlan ? (
                            !broker.automation.tobAuto ? (
                              // An automatic plan that still leaves the TOB to you
                              // is not the same product — flag it in the cell.
                              <YesStar href="#fn-tr-savings" />
                            ) : broker.id === 'saxo' ? (
                              <Tip text={tDyn('saxo_fs0_note')}>
                                <span className="cursor-help"><Yes /></span>
                              </Tip>
                            ) : (
                              <Yes />
                            )
                          ) : (
                            <No />
                          )}
                        </td>

                        <td className={`${TD} text-center`}>
                          {broker.automation.fractionalShares ? <Yes /> : <No />}
                        </td>

                        <td className={`${TD} text-center`}>
                          {broker.automation.tobAuto ? <Yes /> : <No />}
                        </td>

                        <td className={`${TD} text-center`}>
                          {broker.automation.cgtAuto !== 'cgt_manual' ? <CgtAuto /> : <No />}
                        </td>

                        {/* Cash protection column */}
                        <td className={`${TD} text-center`}>
                          <span className={`whitespace-nowrap font-mono text-xs ${
                            broker.protectionCash === '—'
                              ? 'text-[var(--charcoal)]/30'
                              : 'text-[var(--charcoal)]'
                          }`}>
                            {broker.protectionCash}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </React.Fragment>
              )
            ))}
          </tbody>
        </table>
      </div>

      {/* Footnote */}
      <div className="mt-2.5 px-1 text-xs text-[var(--charcoal)]/45">
        <p id="fn-tr-savings">
          <span className="font-semibold">†</span>{' '}
          {t('fn_tr_savings')}
        </p>
      </div>
    </div>
  );
}
