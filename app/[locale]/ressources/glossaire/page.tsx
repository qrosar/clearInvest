import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import LastUpdated from '@/components/ui/LastUpdated';

export const dynamic = 'force-static';

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }> 
}) {
  const { locale } = await params;
  const titles = { 
    fr: 'Glossaire de l\'investissement — Termes ETF expliqués', 
    nl: 'Beleggingswoordenlijst — ETF-termen uitgelegd', 
    en: 'Investment Glossary — ETF Terms Explained' 
  }
  const descriptions = { 
    fr: 'Retrouvez la définition des termes techniques de l\'investissement passif et des ETF.', 
    nl: 'Vind de definitie van de technische termen van passief beleggen en ETF\'s.', 
    en: 'Find the definition of technical terms for passive investing and ETFs.' 
  }
  return {
    title: titles[locale as keyof typeof titles] ?? titles.fr,
    description: descriptions[locale as keyof typeof descriptions] ?? descriptions.fr,
    alternates: {
      canonical: `https://clearinvest.be/${locale}/ressources/glossaire`,
    },
  }
}

// ── Types ──────────────────────────────────────────────────────────────────────

interface Term {
  id: string;
  name: string;
  defs: string[];
  link?: { href: string; label: string };
}

interface Theme {
  title: string;
  terms: Term[];
}

// ── Helpers ────────────────────────────────────────────────────────────────────

/** Normalise first letter to ASCII uppercase (É → E, etc.) */
function firstLetter(name: string): string {
  return name.normalize('NFD').replace(/[\u0300-\u036f]/g, '')[0].toUpperCase();
}

/** Build a map from letter → first term id in page order */
function buildLetterMap(themes: Theme[]): Map<string, string> {
  const map = new Map<string, string>();
  for (const theme of themes) {
    for (const term of theme.terms) {
      const letter = firstLetter(term.name);
      if (!map.has(letter)) {
        map.set(letter, term.id);
      }
    }
  }
  return map;
}

// ── Page ───────────────────────────────────────────────────────────────────────

export default async function GlossairePage() {
  const t = await getTranslations('glossaire');

  const THEMES: Theme[] = [
    {
      title: t('theme_bases'),
      terms: [
        { id: 'etf',                   name: t('term_etf_name'),             defs: [t('term_etf_def')] },
        { id: 'indice-boursier',        name: t('term_indice_name'),          defs: [t('term_indice_def')] },
        { id: 'diversification',        name: t('term_diversification_name'), defs: [t('term_diversification_def')] },
        { id: 'volatilite',             name: t('term_volatilite_name'),      defs: [t('term_volatilite_def')] },
        { id: 'dividende',              name: t('term_dividende_name'),       defs: [t('term_dividende_def')] },
        { id: 'plus-value',             name: t('term_plus_value_name'),      defs: [t('term_plus_value_def')] },
        { id: 'moins-value',            name: t('term_moins_value_name'),     defs: [t('term_moins_value_def')] },
        { id: 'capitalisation-boursiere', name: t('term_capitalisation_name'), defs: [t('term_capitalisation_def')] },
      ],
    },
    {
      title: t('theme_caracteristiques'),
      terms: [
        { id: 'accumulant',  name: t('term_accumulant_name'),  defs: [t('term_accumulant_def')] },
        { id: 'distribuant', name: t('term_distribuant_name'), defs: [t('term_distribuant_def')] },
        { id: 'ter',         name: t('term_ter_name'),         defs: [t('term_ter_def')] },
        { id: 'isin',        name: t('term_isin_name'),        defs: [t('term_isin_def')] },
      ],
    },
    {
      title: t('theme_strategies'),
      terms: [
        { id: 'dca',           name: t('term_dca_name'),           defs: [t('term_dca_def')] },
        { id: 'lump-sum',      name: t('term_lump_sum_name'),      defs: [t('term_lump_sum_def')] },
        { id: 'reequilibrage', name: t('term_reequilibrage_name'), defs: [t('term_reequilibrage_def')] },
        { id: 'fonds-actif',   name: t('term_fonds_actif_name'),   defs: [t('term_fonds_actif_def')] },
        { id: 'fonds-indiciel', name: t('term_fonds_indiciel_name'), defs: [t('term_fonds_indiciel_def')] },
      ],
    },
    {
      title: t('theme_fiscalite'),
      terms: [
        { id: 'tob',               name: t('term_tob_name'),       defs: [t('term_tob_def')],       link: { href: '/comprendre/fiscalite', label: t('term_tob_link') } },
        { id: 'precompte-mobilier', name: t('term_precompte_name'), defs: [t('term_precompte_def')] },
        { id: 'taxe-reynders',     name: t('term_reynders_name'),  defs: [t('term_reynders_def')],  link: { href: '/comprendre/fiscalite', label: t('term_reynders_link') } },
        { id: 'cgt',               name: t('term_cgt_name'),       defs: [t('term_cgt_def')],       link: { href: '/comprendre/fiscalite', label: t('term_cgt_link') } },
      ],
    },
    {
      title: t('theme_produits'),
      terms: [
        { id: 'broker',        name: t('term_broker_name'),          defs: [t('term_broker_def')],          link: { href: '/brokers', label: t('term_broker_link') } },
        { id: 'branche-21',    name: t('term_branche21_name'),       defs: [t('term_branche21_def')] },
        { id: 'branche-23',    name: t('term_branche23_name'),       defs: [t('term_branche23_def')] },
        { id: 'epargne-pension', name: t('term_epargne_pension_name'), defs: [t('term_epargne_pension_def')], link: { href: '/comprendre/produits-bancaires', label: t('term_epargne_pension_link') } },
      ],
    },
  ];

  const LETTER_MAP = buildLetterMap(THEMES);
  const ACTIVE_LETTERS = [...LETTER_MAP.keys()].sort();

  return (
    <>
      {/* Hero */}
      <div className="bg-[var(--forest-deep)] px-6 py-14 text-center text-white md:py-20">
        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-white/40">
          {t('hero_tag')}
        </p>
        <h1 className="font-heading text-3xl font-bold md:text-4xl">
          {t('hero_title')}
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-sm text-white/65 md:text-base">
          {t('hero_subtitle')}
        </p>
      </div>

      <div className="bg-[var(--warm-cream)]">
        <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">

          {/* Alphabetical index */}
          <div className="mb-10 flex flex-wrap gap-1.5">
            {ACTIVE_LETTERS.map((letter) => (
              <a
                key={letter}
                href={`#term-${LETTER_MAP.get(letter)}`}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--warm-tan)]/50 bg-[var(--warm-white)] text-sm font-semibold text-[var(--forest)] transition-colors hover:bg-[var(--forest)] hover:text-white"
              >
                {letter}
              </a>
            ))}
          </div>

          {/* Themes + Terms */}
          <div className="space-y-14">
            {THEMES.map((theme) => (
              <section key={theme.title}>
                <h2 className="mb-6 font-heading text-xl font-bold text-[var(--charcoal)]">
                  {theme.title}
                </h2>
                <div className="space-y-6">
                  {theme.terms.map((term) => (
                    <div
                      key={term.id}
                      id={`term-${term.id}`}
                      className="rounded-xl border border-[var(--warm-tan)]/50 bg-[var(--warm-white)] px-5 py-4 scroll-mt-24"
                    >
                      <h3 className="font-heading text-base font-bold text-[var(--charcoal)]">
                        {term.name}
                      </h3>
                      <div className="mt-2 space-y-2">
                        {term.defs.map((def, i) => (
                          <p key={i} className="text-sm leading-relaxed text-[var(--charcoal)]/70">
                            {def}
                          </p>
                        ))}
                      </div>
                      {term.link && (
                        <p className="mt-3">
                          <Link
                            href={term.link.href}
                            className="text-xs font-semibold text-[var(--forest)] underline-offset-2 hover:underline"
                          >
                            → {term.link.label}
                          </Link>
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>

          <LastUpdated isoDate="2026-03-01" />

          {/* Back link */}
          <div className="mt-8 border-t border-[var(--warm-tan)]/40 pt-6">
            <Link
              href="/ressources"
              className="text-sm text-[var(--charcoal)]/40 transition-colors hover:text-[var(--charcoal)]"
            >
              {t('back')}
            </Link>
          </div>

        </div>
      </div>
    </>
  );
}
