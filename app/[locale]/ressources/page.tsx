import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ locale: string }> 
}) {
  const { locale } = await params;
  const titles = { 
    fr: 'Ressources pour investisseurs belges — Guides pratiques', 
    nl: 'Bronnen voor Belgische beleggers — Praktische gidsen', 
    en: 'Resources for Belgian Investors — Practical Guides' 
  }
  const descriptions = { 
    fr: 'Tout ce dont vous avez besoin pour passer à l\'action : premier achat, déclaration fiscale et glossaire.', 
    nl: 'Alles wat u nodig heeft om in actie te komen: eerste aankoop, belastingaangifte en woordenlijst.', 
    en: 'Everything you need to take action: first purchase, tax declaration and glossary.' 
  }
  return {
    title: titles[locale as keyof typeof titles] ?? titles.fr,
    description: descriptions[locale as keyof typeof descriptions] ?? descriptions.fr,
    alternates: {
      canonical: `https://clearinvest.be/${locale}/ressources`,
    },
  }
}

export default async function RessourcesPage() {
  const t = await getTranslations('ressourcesPage');

  return (
    <>
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

      <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Link
            href="/ressources/premier-achat"
            className="group flex flex-col rounded-2xl border border-[var(--warm-tan)]/50 bg-[var(--warm-white)] p-6 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className="flex items-start justify-between">
              <span className="text-3xl">🛒</span>
              <span className="text-[var(--charcoal)]/30 transition-transform duration-200 group-hover:translate-x-1">→</span>
            </div>
            <h2 className="mt-4 font-heading text-lg font-semibold text-[var(--charcoal)]">
              {t('card_premier_achat_title')}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-[var(--charcoal)]/60">
              {t('card_premier_achat_desc')}
            </p>
          </Link>
          <Link
            href="/ressources/declarer-compte-etranger"
            className="group flex flex-col rounded-2xl border border-[var(--warm-tan)]/50 bg-[var(--warm-white)] p-6 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className="flex items-start justify-between">
              <span className="text-3xl">📋</span>
              <span className="text-[var(--charcoal)]/30 transition-transform duration-200 group-hover:translate-x-1">→</span>
            </div>
            <h2 className="mt-4 font-heading text-lg font-semibold text-[var(--charcoal)]">
              {t('card_declarer_title')}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-[var(--charcoal)]/60">
              {t('card_declarer_desc')}
            </p>
          </Link>
          <Link
            href="/ressources/immobilier-vs-etf"
            className="group flex flex-col rounded-2xl border border-[var(--warm-tan)]/50 bg-[var(--warm-white)] p-6 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className="flex items-start justify-between">
              <span className="text-3xl">🏠</span>
              <span className="text-[var(--charcoal)]/30 transition-transform duration-200 group-hover:translate-x-1">→</span>
            </div>
            <h2 className="mt-4 font-heading text-lg font-semibold text-[var(--charcoal)]">
              {t('card_immo_title')}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-[var(--charcoal)]/60">
              {t('card_immo_desc')}
            </p>
          </Link>
          <Link
            href="/ressources/glossaire"
            className="group flex flex-col rounded-2xl border border-[var(--warm-tan)]/50 bg-[var(--warm-white)] p-6 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className="flex items-start justify-between">
              <span className="text-3xl">📖</span>
              <span className="text-[var(--charcoal)]/30 transition-transform duration-200 group-hover:translate-x-1">→</span>
            </div>
            <h2 className="mt-4 font-heading text-lg font-semibold text-[var(--charcoal)]">
              {t('card_glossaire_title')}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-[var(--charcoal)]/60">
              {t('card_glossaire_desc')}
            </p>
          </Link>
        </div>

        <div className="mt-14">
          <Link
            href="/"
            className="text-sm text-[var(--charcoal)]/40 transition-colors hover:text-[var(--charcoal)]"
          >
            {t('back')}
          </Link>
        </div>
      </div>
    </>
  );
}
