'use client';

import { useTranslations, useLocale } from 'next-intl';
import { usePathname, useRouter, Link } from '@/i18n/navigation';
import { useEffect, useState } from 'react';
import { routing } from '@/i18n/routing';

type NavKey = 'understand' | 'strategies' | 'calculator' | 'brokers' | 'analyseProducts' | 'questions' | 'ressources';

const navLinks: { href: string; key: NavKey }[] = [
  { href: '/comprendre', key: 'understand' },
  { href: '/strategies', key: 'strategies' },
  { href: '/calculateur', key: 'calculator' },
  { href: '/brokers', key: 'brokers' },
  { href: '/analyse-produits', key: 'analyseProducts' },
  { href: '/questions', key: 'questions' },
  { href: '/ressources', key: 'ressources' },
];

export default function Nav() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const pathname = usePathname(); // locale-stripped, e.g. "/strategies"
  const router = useRouter();

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  function switchLocale(next: string) {
    router.replace(pathname, { locale: next });
  }

  // The transparent nav only works over a dark hero. Every page template opens
  // with a --forest-deep band for exactly that reason — except the strategy
  // detail pages, which start on the page background, where white-on-black/20
  // measures 1.7:1 against 14.6:1 everywhere else. Those get the solid
  // treatment from the top instead.
  //
  // If you add a template without a dark hero, add it here too.
  const hasDarkHero = !/^\/strategies\/[^/]+$/.test(pathname);
  const solid = scrolled || !hasDarkHero;

  const navBg = solid
    ? 'border-b border-[var(--warm-tan)]/30 bg-[var(--warm-white)]/80 backdrop-blur-md shadow-sm'
    : 'bg-black/20 backdrop-blur-sm';

  const isDark = !solid;

  return (
    <nav className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${navBg}`}>
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">

        {/* Logo */}
        <Link href="/" className={`font-heading text-xl font-semibold transition-colors ${isDark ? 'text-[var(--warm-white)]' : 'text-[var(--forest)]'}`}>
          Clear<span className={isDark ? 'text-[var(--sage)]' : 'text-[var(--sage)]'}>Invest</span>
        </Link>

        {/* Desktop links */}
        <div className="hidden items-center gap-7 md:flex">
          {navLinks.map(({ href, key }) => {
            const isActive = pathname === href || pathname.startsWith(href + '/');
            return (
              <Link
                key={href}
                href={href}
                className={`text-sm transition-colors ${
                  isDark
                    ? isActive
                      ? 'font-semibold text-white hover:text-white'
                      : 'text-white/70 hover:text-white'
                    : isActive
                      ? 'font-semibold text-[var(--forest)] hover:text-[var(--forest)]'
                      : 'text-[var(--charcoal)]/70 hover:text-[var(--forest)]'
                }`}
              >
                {t(key)}
              </Link>
            );
          })}
        </div>

        {/* Desktop right: locale switcher */}
        <div className="hidden items-center md:flex">
          <div className="flex items-center gap-0.5 text-xs font-medium">
            {routing.locales.map((loc, i) => (
              <span key={loc} className="flex items-center">
                {i > 0 && (
                  <span className={`mx-1.5 ${isDark ? 'text-white/30' : 'text-[var(--warm-tan)]'}`}>/</span>
                )}
                <button
                  onClick={() => switchLocale(loc)}
                  aria-current={locale === loc ? 'true' : undefined}
                  // Inactive locales sit at /70 rather than /50: at /50 they
                  // measured 2.9:1 on the solid nav, below the 4.5:1 AA floor.
                  // The active locale still reads as active via weight+colour.
                  className={`uppercase transition-colors ${
                    isDark
                      ? locale === loc
                        ? 'font-bold text-white'
                        : 'text-white/70 hover:text-white'
                      : locale === loc
                        ? 'font-bold text-[var(--forest)]'
                        : 'text-[var(--charcoal)]/70 hover:text-[var(--forest)]'
                  }`}
                >
                  {loc}
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen((o) => !o)}
          className="flex flex-col justify-center gap-1.5 p-2 md:hidden"
          aria-label={menuOpen ? t('menu_close') : t('menu_open')}
          aria-expanded={menuOpen}
        >
          <span
            className={`block h-0.5 w-5 transition-all duration-200 ${isDark ? 'bg-white' : 'bg-[var(--charcoal)]'} ${menuOpen ? 'translate-y-2 rotate-45' : ''}`}
          />
          <span
            className={`block h-0.5 w-5 transition-all duration-200 ${isDark ? 'bg-white' : 'bg-[var(--charcoal)]'} ${menuOpen ? 'opacity-0' : ''}`}
          />
          <span
            className={`block h-0.5 w-5 transition-all duration-200 ${isDark ? 'bg-white' : 'bg-[var(--charcoal)]'} ${menuOpen ? '-translate-y-2 -rotate-45' : ''}`}
          />
        </button>
      </div>

      {/* Mobile dropdown */}
      <div
        className={`overflow-hidden transition-all duration-300 md:hidden ${
          menuOpen ? 'max-h-screen' : 'max-h-0'
        }`}
      >
        <div className="border-t border-[var(--warm-tan)]/30 bg-[var(--warm-white)]/95 backdrop-blur-md">
          <div className="flex flex-col gap-4 px-6 py-5">
            {navLinks.map(({ href, key }) => {
              const isActive = pathname === href || pathname.startsWith(href + '/');
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className={`text-sm transition-colors ${
                    isActive
                      ? 'font-semibold text-[var(--forest)]'
                      : 'text-[var(--charcoal)]/70'
                  }`}
                >
                  {t(key)}
                </Link>
              );
            })}

            {/* Locale switcher (mobile) */}
            <div className="flex items-center gap-3 border-t border-[var(--warm-tan)]/30 pt-4">
              {routing.locales.map((loc) => (
                <button
                  key={loc}
                  onClick={() => { switchLocale(loc); setMenuOpen(false); }}
                  aria-current={locale === loc ? 'true' : undefined}
                  className={`text-xs font-medium uppercase transition-colors hover:text-[var(--forest)] ${
                    locale === loc
                      ? 'font-bold text-[var(--forest)]'
                      : 'text-[var(--charcoal)]/70'
                  }`}
                >
                  {loc}
                </button>
              ))}
            </div>

          </div>
        </div>
      </div>
    </nav>
  );
}
