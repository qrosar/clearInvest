'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

type AnswerBlock =
  | { type: 'p'; text: string }
  | { type: 'ul'; items: string[] }
  | { type: 'link'; text: string; href: string };

interface FaqItem {
  q: string;
  a: AnswerBlock[];
}

interface FaqGroup {
  theme: string;
  items: FaqItem[];
}

export default function FaqList() {
  const t = useTranslations('questions');
  const [openKey, setOpenKey] = useState<string | null>(null);

  const FAQ: FaqGroup[] = [
    {
      theme: t('theme_risque'),
      items: [
        {
          q: t('r1_q'),
          a: [
            { type: 'p', text: t('r1_p1') },
            { type: 'p', text: t('r1_p2') },
            { type: 'p', text: t('r1_p3') },
            { type: 'p', text: t('r1_p4') },
          ],
        },
        {
          q: t('r2_q'),
          a: [
            { type: 'p', text: t('r2_p1') },
            { type: 'p', text: t('r2_p2') },
            { type: 'p', text: t('r2_p3') },
            { type: 'p', text: t('r2_p4') },
            { type: 'p', text: t('r2_p5') },
          ],
        },
        {
          q: t('r3_q'),
          a: [
            { type: 'p', text: t('r3_p1') },
            { type: 'p', text: t('r3_p2') },
            { type: 'p', text: t('r3_p3') },
            { type: 'p', text: t('r3_p4') },
            { type: 'p', text: t('r3_p5') },
          ],
        },
        {
          q: t('r4_q'),
          a: [
            { type: 'p', text: t('r4_p1') },
            { type: 'p', text: t('r4_p2') },
            { type: 'p', text: t('r4_p3') },
            { type: 'p', text: t('r4_p4') },
            { type: 'p', text: t('r4_p5') },
          ],
        },
      ],
    },
    {
      theme: t('theme_debuter'),
      items: [
        {
          q: t('d1_q'),
          a: [
            { type: 'p', text: t('d1_p1') },
            { type: 'p', text: t('d1_p2') },
            { type: 'p', text: t('d1_p3') },
            { type: 'p', text: t('d1_p4') },
          ],
        },
        {
          q: t('d2_q'),
          a: [
            { type: 'p', text: t('d2_p1') },
            { type: 'p', text: t('d2_p2') },
            { type: 'ul', items: [t('d2_ul_1'), t('d2_ul_2'), t('d2_ul_3')] },
            { type: 'p', text: t('d2_p3') },
          ],
        },
        {
          q: t('d3_q'),
          a: [
            { type: 'p', text: t('d3_p1') },
            { type: 'p', text: t('d3_p2') },
            { type: 'p', text: t('d3_p3') },
            { type: 'p', text: t('d3_p4') },
            { type: 'p', text: t('d3_p5') },
          ],
        },
        {
          q: t('d4_q'),
          a: [
            { type: 'p', text: t('d4_p1') },
            { type: 'p', text: t('d4_p2') },
            { type: 'p', text: t('d4_p3') },
            { type: 'p', text: t('d4_p4') },
            { type: 'ul', items: [t('d4_ul_1'), t('d4_ul_2'), t('d4_ul_3')] },
          ],
        },
        {
          q: t('d5_q'),
          a: [
            { type: 'p', text: t('d5_p1') },
            { type: 'ul', items: [t('d5_ul_1'), t('d5_ul_2'), t('d5_ul_3')] },
            { type: 'p', text: t('d5_p2') },
            { type: 'link', text: t('d5_link'), href: '/ressources/premier-achat' },
          ],
        },
      ],
    },
    {
      theme: t('theme_strategie'),
      items: [
        {
          q: t('s1_q'),
          a: [
            { type: 'p', text: t('s1_p1') },
            { type: 'p', text: t('s1_p2') },
            { type: 'p', text: t('s1_p3') },
            { type: 'p', text: t('s1_p4') },
            { type: 'p', text: t('s1_p5') },
          ],
        },
        {
          q: t('s2_q'),
          a: [
            { type: 'p', text: t('s2_p1') },
            { type: 'p', text: t('s2_p2') },
            { type: 'p', text: t('s2_p3') },
          ],
        },
        {
          q: t('s3_q'),
          a: [
            { type: 'p', text: t('s3_p1') },
            { type: 'p', text: t('s3_p2') },
            { type: 'p', text: t('s3_p3') },
            { type: 'p', text: t('s3_p4') },
            { type: 'p', text: t('s3_p5') },
          ],
        },
        {
          q: t('s4_q'),
          a: [
            { type: 'p', text: t('s4_p1') },
            { type: 'p', text: t('s4_p2') },
            { type: 'p', text: t('s4_p3') },
            { type: 'p', text: t('s4_p4') },
            { type: 'p', text: t('s4_p5') },
            { type: 'link', text: t('s4_link'), href: '/ressources/immobilier-vs-etf' },
          ],
        },
      ],
    },
    {
      theme: t('theme_fiscalite'),
      items: [
        {
          q: t('f1_q'),
          a: [
            { type: 'p', text: t('f1_p1') },
            { type: 'p', text: t('f1_p2') },
            { type: 'p', text: t('f1_p3') },
            { type: 'p', text: t('f1_p4') },
            { type: 'p', text: t('f1_p5') },
          ],
        },
        {
          q: t('f2_q'),
          a: [
            { type: 'p', text: t('f2_p1') },
            { type: 'ul', items: [t('f2_ul_1'), t('f2_ul_2'), t('f2_ul_3')] },
            { type: 'p', text: t('f2_p2') },
          ],
        },
        {
          q: t('f3_q'),
          a: [
            { type: 'p', text: t('f3_p1') },
            { type: 'p', text: t('f3_p2') },
            { type: 'p', text: t('f3_p3') },
            { type: 'p', text: t('f3_p4') },
            { type: 'p', text: t('f3_p5') },
          ],
        },
      ],
    },
  ];

  function toggle(key: string) {
    setOpenKey(prev => prev === key ? null : key);
  }

  return (
    <>
      {FAQ.map((group, gi) => (
        <section key={gi} className={gi > 0 ? 'mt-14' : undefined}>
          <h2 className="font-heading text-xl font-semibold text-[var(--charcoal)] md:text-2xl">
            {group.theme}
          </h2>

          <div className="mt-5 divide-y divide-[var(--warm-tan)]/40 overflow-hidden rounded-xl border border-[var(--warm-tan)]/50 bg-[var(--warm-white)]">
            {group.items.map((item, ii) => {
              const key = `${gi}-${ii}`;
              const isOpen = openKey === key;
              return (
                <div key={ii}>
                  <button
                    type="button"
                    onClick={() => toggle(key)}
                    className="flex w-full items-start justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-[var(--warm-cream)]/50"
                    aria-expanded={isOpen}
                  >
                    <span className="text-sm font-medium leading-snug text-[var(--charcoal)] md:text-base">
                      {item.q}
                    </span>
                    <span
                      className="mt-0.5 flex-shrink-0 text-xs text-[var(--charcoal)]/35 transition-transform duration-300"
                      style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                      aria-hidden="true"
                    >
                      ▾
                    </span>
                  </button>

                  <div
                    className="overflow-hidden transition-all duration-300 ease-in-out"
                    style={{ maxHeight: isOpen ? '1600px' : '0px' }}
                  >
                    <div className="space-y-3 border-t border-[var(--warm-tan)]/30 bg-[var(--warm-cream)]/30 px-5 pb-6 pt-4 text-sm leading-relaxed text-[var(--charcoal)]/70">
                      {item.a.map((block, bi) =>
                        block.type === 'p' ? (
                          <p key={bi}>{block.text}</p>
                        ) : block.type === 'link' ? (
                          <p key={bi}>
                            <Link href={block.href} className="font-medium text-[var(--forest)] underline-offset-2 hover:underline">
                              {block.text}
                            </Link>
                          </p>
                        ) : (
                          <ul key={bi} className="ml-1 space-y-2">
                            {block.items.map((li: string, lii: number) => (
                              <li key={lii} className="flex gap-3">
                                <span aria-hidden="true" className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[var(--forest)]/50" />
                                <span>{li}</span>
                              </li>
                            ))}
                          </ul>
                        )
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      ))}
    </>
  );
}
