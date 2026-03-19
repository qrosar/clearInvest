'use client';

import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';

const steps = [
  {
    num: '01',
    titleKey: 'step1_title',
    descKey: 'step1_desc',
    circleClass: 'bg-[var(--sage-pale)]',
    numClass: 'text-[var(--forest)] font-bold',
  },
  {
    num: '02',
    titleKey: 'step2_title',
    descKey: 'step2_desc',
    circleClass: 'bg-[var(--amber-light)]',
    numClass: 'text-[var(--forest-deep)] font-bold',
  },
  {
    num: '03',
    titleKey: 'step3_title',
    descKey: 'step3_desc',
    circleClass: 'bg-[var(--forest)]',
    numClass: 'text-[var(--warm-white)] font-bold',
  },
  {
    num: '04',
    titleKey: 'step4_title',
    descKey: 'step4_desc',
    circleClass: 'bg-[var(--forest-deep)]',
    numClass: 'text-[var(--warm-white)] font-bold',
  },
] as const;

export default function Journey() {
  const t = useTranslations('journey');
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
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
            {t('heading')}{' '}
            <em className="not-italic text-[var(--sage)]">{t('headingItalic')}</em>
          </h2>
        </div>

        {/* Steps */}
        <div className="relative mt-16">

          {/* Connector line — desktop only, sits behind the circles */}
          <div
            aria-hidden
            className="absolute top-[28px] hidden translate-y-[-50%] md:block"
            style={{ left: 'calc(12.5% + 28px)', right: 'calc(12.5% + 28px)' }}
          >
            <div className="h-px bg-gradient-to-r from-[var(--sage-pale)] via-[var(--warm-tan)] to-[var(--forest-deep)]/40" />
          </div>

          <div className="grid grid-cols-1 gap-10 md:grid-cols-4 md:gap-6">
            {steps.map((step, i) => (
              <div
                key={step.num}
                className={`flex flex-col items-center text-center transition-all duration-700 ${
                  visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                }`}
                style={{ transitionDelay: visible ? `${100 + i * 110}ms` : '0ms' }}
              >
                {/* Circle */}
                <div
                  className={`relative z-10 flex h-14 w-14 items-center justify-center rounded-full shadow-sm ${step.circleClass}`}
                >
                  <span className={`font-heading text-sm ${step.numClass}`}>
                    {step.num}
                  </span>
                </div>

                {/* Title */}
                <h3 className="mt-5 font-heading text-lg font-semibold text-[var(--forest)]">
                  {t(step.titleKey)}
                </h3>

                {/* Description */}
                <p className="mt-2 text-sm leading-relaxed text-[var(--charcoal)]/65">
                  {t(step.descKey)}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
