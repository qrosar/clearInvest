import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import LastUpdated from '@/components/ui/LastUpdated';

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ locale: string }> 
}) {
  const { locale } = await params;
  const titles = { 
    fr: 'Mentions Légales — ClearInvest', 
    nl: 'Juridische informatie — ClearInvest', 
    en: 'Legal Mentions — ClearInvest' 
  }
  return {
    title: titles[locale as keyof typeof titles] ?? titles.fr,
    alternates: {
      canonical: `https://clearinvest.be/${locale}/mentions-legales`,
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

export default async function MentionsLegalesPage() {
  const t = await getTranslations('mentionsLegales');

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
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">

        <Section title={t('s1_title')}>
          <p>
            <strong className="text-[var(--charcoal)]">ClearInvest</strong>
          </p>
          <p>{t('s1_p1')}</p>
          <p>
            {t('s1_email_label')}{' '}
            <a
              href="mailto:contact@clearinvest.be"
              className="text-[var(--forest)] underline-offset-2 hover:underline"
            >
              contact@clearinvest.be
            </a>
          </p>
        </Section>

        <Section title={t('s2_title')}>
          <p>{t('s2_p1')}</p>
          <p className="rounded-lg border border-[var(--warm-tan)]/50 bg-[var(--warm-white)] px-4 py-3">
            Vercel Inc.<br />
            440 N Barranca Ave #4133<br />
            Covina, CA 91723, {t('s2_vercel_country')}<br />
            <a
              href="https://vercel.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--forest)] underline-offset-2 hover:underline"
            >
              vercel.com
            </a>
          </p>
          <p>{t('s2_p2')}</p>
          <p className="rounded-lg border border-[var(--warm-tan)]/50 bg-[var(--warm-white)] px-4 py-3">
            Infomaniak Network SA<br />
            Rue Eugène-Marziano 25<br />
            1227 Les Acacias, Genève, {t('s2_infomaniak_country')}<br />
            <a
              href="https://www.infomaniak.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--forest)] underline-offset-2 hover:underline"
            >
              infomaniak.com
            </a>
          </p>
        </Section>

        <Section title={t('s3_title')}>
          <p>{t('s3_p1')}</p>
          <p>{t('s3_p2')}</p>
        </Section>

        <Section title={t('s4_title')}>
          <p>{t('s4_p1')}</p>
          <p>{t('s4_p2')}</p>
        </Section>

        <Section title={t('s5_title')}>
          <p>{t('s5_p1')}</p>
        </Section>

        <LastUpdated isoDate="2026-03-01" />

        <div className="mt-8 border-t border-[var(--warm-tan)]/40 pt-6">
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
