'use client';

import { useTranslations, useLocale } from 'next-intl';
import { usePathname, useRouter, Link } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';

const toolLinks = [
  { href: '/calculateur', labelKey: 'calc' },
  { href: '/brokers',     labelKey: 'brokers' },
  { href: '/strategies',  labelKey: 'strategies' },
] as const;

const learnLinks = [
  { href: '/comprendre',               labelKey: 'comprendre' },
  { href: '/questions',                labelKey: 'questions_faq' },
  { href: '/comprendre/fiscalite',     labelKey: 'tax' },
  { href: '/ressources/glossaire',     labelKey: 'glossaire' },
  { href: '/ressources/premier-achat', labelKey: 'premier_achat' },
] as const;

const ressourcesLinks = [
  { href: '/ressources/declarer-compte-etranger', labelKey: 'declarer_compte' },
  { href: '/ressources', labelKey: 'ressources' },
  { href: '/a-propos', labelKey: 'a_propos' },
] as const;

export default function Footer() {
  const t = useTranslations('footer');
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  function switchLocale(next: string) {
    router.replace(pathname, { locale: next });
  }

  const linkClass =
    'text-sm text-[var(--sage-light)]/70 transition-colors hover:text-[var(--warm-white)] hover:underline underline-offset-2';

  return (
    <footer className="bg-[var(--forest-deep)]">

      {/* Main content */}
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-6 py-16 md:grid-cols-[auto_1fr_auto] md:gap-12">

        {/* Left — logo + tagline */}
        <div>
          <Link href="/" className="font-heading text-xl font-semibold text-[var(--warm-white)]">
            Clear<span className="text-[var(--sage)]">Invest</span>
          </Link>
          <p className="mt-3 max-w-[220px] text-sm leading-relaxed text-[var(--sage-light)]/60">
            {t('tagline')}
          </p>
        </div>

        {/* Center — link columns */}
        <div className="grid grid-cols-3 gap-8">
          {/* Outils */}
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-[var(--sage-light)]/40">
              {t('col_tools')}
            </p>
            <ul className="space-y-3">
              {toolLinks.map(({ href, labelKey }) => (
                <li key={href}>
                  <Link href={href} className={linkClass}>
                    {t(labelKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Apprendre */}
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-[var(--sage-light)]/40">
              {t('col_learn')}
            </p>
            <ul className="space-y-3">
              {learnLinks.map(({ href, labelKey }) => (
                <li key={href}>
                  <Link href={href} className={linkClass}>
                    {t(labelKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Ressources */}
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-[var(--sage-light)]/40">
              {t('col_ressources')}
            </p>
            <ul className="space-y-3">
              {ressourcesLinks.map(({ href, labelKey }) => (
                <li key={href}>
                  <Link href={href} className={linkClass}>
                    {t(labelKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right — language switcher */}
        <div className="md:text-right">
          <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-[var(--sage-light)]/40">
            {t('col_lang')}
          </p>
          <div className="flex items-center gap-1 md:justify-end">
            {routing.locales.map((loc, i) => (
              <span key={loc} className="flex items-center">
                {i > 0 && (
                  <span className="mx-2 text-[var(--sage-light)]/25">/</span>
                )}
                <button
                  onClick={() => switchLocale(loc)}
                  className={`text-sm uppercase transition-colors hover:text-[var(--warm-white)] ${
                    locale === loc
                      ? 'font-bold text-[var(--warm-white)]'
                      : 'text-[var(--sage-light)]/50'
                  }`}
                >
                  {loc}
                </button>
              </span>
            ))}
          </div>
        </div>

      </div>

      {/* Bottom bar */}
      <div className="border-t border-[var(--sage)]/10 bg-[var(--forest-deep)] px-6 py-5">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 text-xs text-[var(--sage-light)]/40 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5">
            <span>{t('copyright')}</span>
            <Link href="/mentions-legales" className="transition-colors hover:text-[var(--sage-light)]">
              {t('mentions_legales')}
            </Link>
            <Link href="/politique-confidentialite" className="transition-colors hover:text-[var(--sage-light)]">
              {t('politique_confidentialite')}
            </Link>
            <a
              href="mailto:contact@clearinvest.be"
              className="transition-colors hover:text-[var(--sage-light)]"
            >
              contact@clearinvest.be
            </a>
          </div>
          <span className="max-w-lg md:text-right">{t('legal')}</span>
        </div>
      </div>

    </footer>
  );
}
