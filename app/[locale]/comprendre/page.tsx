import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }> 
}) {
  const { locale } = await params;
  const titles = { 
    fr: 'Comprendre l\'investissement en ETF — Guides pour Belges', 
    nl: 'ETF-beleggen begrijpen — Gidsen voor Belgen', 
    en: 'Understanding ETF Investing — Guides for Belgian Investors' 
  }
  const descriptions = { 
    fr: 'Trois guides clairs pour prendre les bonnes décisions d\'investissement en Belgique, sans jargon.', 
    nl: 'Drie heldere gidsen om de juiste beleggingsbeslissingen te nemen in België, zonder jargon.', 
    en: 'Three clear guides to make the right investment decisions in Belgium, without jargon.' 
  }
  return {
    title: titles[locale as keyof typeof titles] ?? titles.fr,
    description: descriptions[locale as keyof typeof descriptions] ?? descriptions.fr,
    alternates: {
      canonical: `https://clearinvest.be/${locale}/comprendre`,
    },
  }
}

const CARD_HREFS = [
  { href: '/comprendre/etf',              icon: '📈', tagClass: 'bg-amber-100 text-amber-700',                          titleKey: 'card1_title', descKey: 'card1_desc', tagKey: 'card1_tag' },
  { href: '/comprendre/produits-bancaires', icon: '🏦', tagClass: 'bg-[var(--warm-tan)]/40 text-[var(--charcoal)]/60', titleKey: 'card2_title', descKey: 'card2_desc', tagKey: 'card2_tag' },
  { href: '/comprendre/fiscalite',         icon: '📋', tagClass: 'bg-[var(--warm-tan)]/40 text-[var(--charcoal)]/60', titleKey: 'card3_title', descKey: 'card3_desc', tagKey: 'card3_tag' },
] as const;

export default async function ComprendrePage() {
  const t = await getTranslations('comprendre');

  return (
    <>
      {/* Hero */}
      <div className="bg-[var(--forest-deep)] px-6 py-14 text-center text-white md:py-20">
        <h1 className="font-heading text-3xl font-bold md:text-4xl">
          {t('hero_title')}
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-sm text-white/65 md:text-base">
          {t('hero_subtitle')}
        </p>
      </div>

      {/* Cards */}
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          {CARD_HREFS.map(({ href, icon, tagClass, titleKey, descKey, tagKey }) => (
            <Link
              key={href}
              href={href}
              className="group relative flex flex-col rounded-2xl border border-[var(--warm-tan)]/50 bg-[var(--warm-cream)] p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="flex items-start justify-between">
                <span className="text-3xl">{icon}</span>
                <span className="translate-x-0 text-[var(--charcoal)]/30 transition-transform duration-300 group-hover:translate-x-1.5">
                  →
                </span>
              </div>
              <div className="mt-4">
                <span className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase leading-none ${tagClass}`}>
                  {t(tagKey)}
                </span>
              </div>
              <h2 className="mt-3 font-heading text-lg font-semibold text-[var(--charcoal)]">
                {t(titleKey)}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-[var(--charcoal)]/60">
                {t(descKey)}
              </p>
            </Link>
          ))}
        </div>

        {/* Disclaimer */}
        <p className="mt-12 text-center text-xs text-[var(--charcoal)]/30">
          {t('disclaimer')}
        </p>
      </div>
    </>
  );
}
