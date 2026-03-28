'use client';

import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

const strategyConfig = [
  {
    nameKey: 'simple_name',
    taglineKey: 'simple_tagline',
    descKey: 'simple_desc',
    href: '/strategies/tout-en-un',
    // sage-pale (#e8f0e9)
    cardClass: 'bg-[#e8f0e9] border border-[#c4d9c6]',
    tagClass: 'bg-[#c4d9c6] text-[var(--forest)]',
    textClass: 'text-[var(--forest)]',
    descClass: 'text-[#2d5a35]/65',
    etfTag: 'IMIE',
  },
  {
    nameKey: 'balanced_name',
    taglineKey: 'balanced_tagline',
    descKey: 'balanced_desc',
    href: '/strategies/tech-us',
    // amber-light (#f5d49a)
    cardClass: 'bg-[#f5d49a] border border-[#e8c070]',
    tagClass: 'bg-[#e8c070] text-[#5a3e00]',
    textClass: 'text-[#5a3e00]',
    descClass: 'text-[#5a3e00]/65',
    etfTag: 'CNDX',
  },
  {
    nameKey: 'esg_name',
    taglineKey: 'esg_tagline',
    descKey: 'esg_desc',
    href: '/strategies/esg-mondiale',
    // soft blue-grey (#e8edf2)
    cardClass: 'bg-[#e8edf2] border border-[#c8d4de]',
    tagClass: 'bg-[#c8d4de] text-[#3a4a5a]',
    textClass: 'text-[#3a4a5a]',
    descClass: 'text-[#3a4a5a]/65',
    etfTag: 'XMAW',
  },
] as const;

export default function StrategiesPreview() {
  const t = useTranslations('strategies');
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="bg-[var(--warm-cream)] px-6 py-24">
      <div className="mx-auto max-w-5xl">

        {/* Heading */}
        <div
          className={`text-center transition-all duration-700 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
          }`}
        >
          <h2 className="font-heading text-3xl font-semibold text-[var(--charcoal)] md:text-4xl">
            {t('heading')}
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-base text-[var(--charcoal)]/60">
            {t('subtitle')}
          </p>
        </div>

        {/* Cards */}
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {strategyConfig.map((s, i) => (
            <div
              key={s.nameKey}
              className={`transition-all duration-700 ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
              style={{ transitionDelay: visible ? `${100 + i * 110}ms` : '0ms' }}
            >
              <Link
                href={s.href}
                className={`group flex h-full flex-col rounded-2xl p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${s.cardClass}`}
              >
                {/* Name badge */}
                <span className={`self-start rounded-full px-3 py-1 text-xs font-semibold ${s.tagClass}`}>
                  {t(s.nameKey)}
                </span>

                {/* Tagline */}
                <p className={`mt-5 font-heading text-lg font-semibold leading-snug ${s.textClass}`}>
                  {t(s.taglineKey)}
                </p>

                {/* Description */}
                <p className={`mt-2 text-sm leading-relaxed ${s.descClass}`}>
                  {t(s.descKey)}
                </p>

                {/* ETF ticker */}
                <p className={`mt-5 font-mono text-xs ${s.descClass}`}>
                  {s.etfTag}
                </p>
              </Link>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div
          className={`mt-10 text-center transition-all duration-700 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
          style={{ transitionDelay: visible ? '450ms' : '0ms' }}
        >
          <Link
            href="/strategies"
            className="inline-block text-sm font-semibold text-[var(--forest)] transition-colors hover:text-[var(--forest-deep)]"
          >
            {t('cta')}
          </Link>
        </div>

      </div>
    </section>
  );
}
