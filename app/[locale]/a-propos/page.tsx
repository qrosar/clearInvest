import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ locale: string }> 
}) {
  const { locale } = await params;
  const titles = { 
    fr: 'À propos de ClearInvest — Mission et indépendance', 
    nl: 'Over ClearInvest — Missie en onafhankelijkheid', 
    en: 'About ClearInvest — Mission and Independence' 
  }
  const descriptions = { 
    fr: 'Découvrez qui est derrière ClearInvest et pourquoi nous prônons l\'investissement passif indépendant.', 
    nl: 'Ontdek wie er achter ClearInvest zit en waarom we pleiten voor onafhankelijk passief beleggen.', 
    en: 'Discover who is behind ClearInvest and why we advocate for independent passive investing.' 
  }
  return {
    title: titles[locale as keyof typeof titles] ?? titles.fr,
    description: descriptions[locale as keyof typeof descriptions] ?? descriptions.fr,
    alternates: {
      canonical: `https://clearinvest.be/${locale}/a-propos`,
    },
  }
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-10">
      <h2 className="mb-3 font-heading text-lg font-bold text-[var(--charcoal)]">{title}</h2>
      <div className="space-y-3 text-sm leading-relaxed text-[var(--charcoal)]/70">
        {children}
      </div>
    </section>
  );
}

export default async function AProposPage() {
  const t = await getTranslations('aPropos');

  return (
    <>
      {/* Hero */}
      <div className="bg-[var(--forest-deep)] px-6 py-14 text-center text-white md:py-20">
        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-white/40">
          {t('hero_tag')}
        </p>
        <h1 className="font-heading text-3xl font-bold md:text-4xl">
          {t('title')}
        </h1>
      </div>

      <div className="min-h-screen bg-[var(--warm-cream)]">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6">

        <Section title={t('s1_title')}>
          <p>{t('s1_p1')}</p>
          <p>{t('s1_p2')}</p>
          <p>{t('s1_p3')}</p>
        </Section>

        <Section title={t('s2_title')}>
          <p>{t('s2_p1')}</p>
          <p>{t('s2_p2')}</p>
        </Section>

        <Section title={t('s3_title')}>
          <p>
            {t('s3_p1')}{' '}
            <a
              href="mailto:contact@clearinvest.be"
              className="text-[var(--forest)] underline-offset-2 hover:underline"
            >
              contact@clearinvest.be
            </a>
          </p>
        </Section>

        <div className="mt-12 border-t border-[var(--warm-tan)]/40 pt-8">
          <Link
            href="/"
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
