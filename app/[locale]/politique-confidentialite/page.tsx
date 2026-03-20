import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ locale: string }> 
}) {
  const { locale } = await params;
  const titles = { 
    fr: 'Politique de Confidentialité — ClearInvest', 
    nl: 'Privacybeleid — ClearInvest', 
    en: 'Privacy Policy — ClearInvest' 
  }
  return {
    title: titles[locale as keyof typeof titles] ?? titles.fr,
    alternates: {
      canonical: `https://clearinvest.be/${locale}/politique-confidentialite`,
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

export default async function PolitiqueConfidentialitePage() {
  const t = await getTranslations('politiqueConfidentialite');
  const bullets = [t('s1_bullet_1'), t('s1_bullet_2'), t('s1_bullet_3')];

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

        <p className="mb-10 text-sm leading-relaxed text-[var(--charcoal)]/70">
          {t('intro')}
        </p>

        <Section title={t('s1_title')}>
          <p>{t('s1_p1')}</p>
          <p>{t('s1_p2')}</p>
          <ul className="ml-1 space-y-1.5">
            {bullets.map((item) => (
              <li key={item} className="flex gap-2.5">
                <span aria-hidden="true" className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[var(--charcoal)]/30" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p>
            {t('s1_p3_before')}{' '}
            <a
              href="https://vercel.com/legal/privacy-policy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--forest)] underline-offset-2 hover:underline"
            >
              vercel.com/legal/privacy-policy
            </a>
            .
          </p>
          <p>{t('s1_p4')}</p>
        </Section>

        <Section title={t('s2_title')}>
          <p>{t('s2_p1')}</p>
          <p>{t('s2_p2')}</p>
          <p>{t('s2_p3')}</p>
        </Section>

        <Section title={t('s3_title')}>
          <p>{t('s3_p1')}</p>
          <p>{t('s3_p2')}</p>
          <p>
            {t('s3_p3')}{' '}
            <a
              href="mailto:contact@clearinvest.be"
              className="text-[var(--forest)] underline-offset-2 hover:underline"
            >
              contact@clearinvest.be
            </a>
          </p>
        </Section>

        <Section title={t('s4_title')}>
          <p>{t('s4_p1')}</p>
          <p className="text-[var(--charcoal)]/45">{t('s4_date')}</p>
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
