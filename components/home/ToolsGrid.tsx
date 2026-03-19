'use client';

import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

export default function ToolsGrid() {
  const t = useTranslations('tools');
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

  const cardBase =
    'group relative flex flex-col rounded-2xl p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl';

  return (
    <section ref={sectionRef} className="bg-[var(--warm-white)] px-6 py-24">
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
        <div className="mt-12 flex flex-col gap-5">

          {/* Featured card — full width, forest bg */}
          <div
            className={`transition-all duration-700 ${
              visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
            style={{ transitionDelay: visible ? '100ms' : '0ms' }}
          >
            <Link
              href="/calculateur"
              className={`${cardBase} bg-[var(--forest)] text-[var(--warm-white)] shadow-md`}
            >
              <div className="flex items-start justify-between">
                <span className="text-3xl">📊</span>
                <span className="translate-x-0 text-[var(--warm-white)]/50 transition-transform duration-300 group-hover:translate-x-1.5">
                  →
                </span>
              </div>
              <h3 className="mt-5 font-heading text-xl font-semibold">
                {t('calc_title')}
              </h3>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-[var(--warm-white)]/70">
                {t('calc_desc')}
              </p>
            </Link>
          </div>

          {/* Four smaller cards — 2×2 grid */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

            {[
              { href: '/strategies', icon: '🌍', titleKey: 'strategies_title', descKey: 'strategies_desc', delay: '200ms' },
              { href: '/brokers',    icon: '🏦', titleKey: 'brokers_title',    descKey: 'brokers_desc',    delay: '300ms' },
              { href: '/comprendre', icon: '📖', titleKey: 'understand_title', descKey: 'understand_desc', delay: '400ms' },
              { href: '/questions',  icon: '💬', titleKey: 'questions_title',  descKey: 'questions_desc',  delay: '500ms' },
            ].map(({ href, icon, titleKey, descKey, delay }) => (
              <div
                key={href}
                className={`transition-all duration-700 ${
                  visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                }`}
                style={{ transitionDelay: visible ? delay : '0ms' }}
              >
                <Link
                  href={href}
                  className={`${cardBase} h-full border border-[var(--warm-tan)]/50 bg-[var(--warm-cream)] shadow-sm`}
                >
                  <div className="flex items-start justify-between">
                    <span className="text-3xl">{icon}</span>
                    <span className="translate-x-0 text-[var(--charcoal)]/30 transition-transform duration-300 group-hover:translate-x-1.5">
                      →
                    </span>
                  </div>
                  <h3 className="mt-5 font-heading text-lg font-semibold text-[var(--charcoal)]">
                    {t(titleKey as Parameters<typeof t>[0])}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--charcoal)]/60">
                    {t(descKey as Parameters<typeof t>[0])}
                  </p>
                </Link>
              </div>
            ))}

          </div>
        </div>
      </div>
    </section>
  );
}
