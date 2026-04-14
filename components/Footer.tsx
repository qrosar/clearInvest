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
  { href: '/analyse-produits',         labelKey: 'analyse_products' },
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
              href="https://github.com/qrosar/clearinvest"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 transition-colors hover:text-[var(--sage-light)]"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
              </svg>
              {t('sourceCode')}
            </a>
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
