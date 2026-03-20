import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import FaqList from './FaqList';

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ locale: string }> 
}) {
  const { locale } = await params;
  const titles = { 
    fr: 'Questions fréquentes sur l\'investissement en ETF en Belgique', 
    nl: 'Veelgestelde vragen over ETF-beleggen in België', 
    en: 'Frequently Asked Questions about ETF Investing in Belgium' 
  }
  const descriptions = { 
    fr: 'Trouvez les réponses à vos questions sur le risque, les brokers, la fiscalité et les stratégies ETF en Belgique.', 
    nl: 'Vind antwoorden op uw vragen over risico, brokers, fiscaliteit en ETF-strategieën in België.', 
    en: 'Find answers to your questions about risk, brokers, taxation and ETF strategies in Belgium.' 
  }
  return {
    title: titles[locale as keyof typeof titles] ?? titles.fr,
    description: descriptions[locale as keyof typeof descriptions] ?? descriptions.fr,
    alternates: {
      canonical: `https://clearinvest.be/${locale}/questions`,
    },
  }
}

export default async function QuestionsPage() {
  const t = await getTranslations('questions');

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

      {/* Content */}
      <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">

        <FaqList />

        {/* Footer */}
        <div className="mt-16 border-t border-[var(--warm-tan)]/40 pt-10 text-center">
          <p className="text-sm text-[var(--charcoal)]/60">
            {t('footer_suggest')}{' '}
            <a
              href="#"
              className="text-[var(--forest)] underline-offset-2 hover:underline"
            >
              {t('footer_suggest_link')}
            </a>
          </p>
          <p className="mt-4 text-xs leading-relaxed text-[var(--charcoal)]/35">
            {t('footer_disclaimer')}
          </p>
        </div>

        {/* Back link */}
        <div className="mt-8 text-center">
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
