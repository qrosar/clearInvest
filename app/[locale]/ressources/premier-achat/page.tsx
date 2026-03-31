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
    fr: 'Comment passer son premier ordre d\'achat d\'ETF en Belgique', 
    nl: 'Hoe plaats je je eerste ETF-kooporder in België', 
    en: 'How to Place Your First ETF Buy Order in Belgium' 
  }
  const descriptions = { 
    fr: 'Guide pas à pas pour passer votre premier ordre de bourse : ISIN, type d\'ordre et vérifications.', 
    nl: 'Stapsgewijze gids voor het plaatsen van uw eerste beursorder: ISIN, ordertype en controles.', 
    en: 'Step-by-step guide to placing your first stock market order: ISIN, order type and checks.' 
  }
  return {
    title: titles[locale as keyof typeof titles] ?? titles.fr,
    description: descriptions[locale as keyof typeof descriptions] ?? descriptions.fr,
    alternates: {
      canonical: `https://clearinvest.be/${locale}/ressources/premier-achat`,
    },
  }
}

// ── Sub-components ─────────────────────────────────────────────────────────────

function TipBox({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="my-5 rounded-xl border border-[var(--forest)]/20 bg-[var(--sage-pale)] px-5 py-4 text-sm leading-relaxed text-[var(--charcoal)]/80">
      <p className="mb-1 font-semibold text-[var(--forest)]">{label}</p>
      {children}
    </div>
  );
}

function WarningBox({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="my-5 rounded-xl border border-amber-300/60 bg-amber-50 px-5 py-4 text-sm leading-relaxed text-amber-900">
      <p className="mb-1 font-semibold">{label}</p>
      {children}
    </div>
  );
}

function Step({ number, title, children }: { number: number; title: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-5">
      <div className="flex-shrink-0">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--forest)] text-sm font-bold text-white">
          {number}
        </div>
      </div>
      <div className="min-w-0">
        <h3 className="font-semibold text-[var(--charcoal)]">{title}</h3>
        <div className="mt-1 text-sm leading-relaxed text-[var(--charcoal)]/70">
          {children}
        </div>
      </div>
    </div>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────────

export default async function PremierAchatPage() {
  const t = await getTranslations('premierAchat');

  const prereqs = [
    { label: t('s1_item1_label'), desc: t('s1_item1_desc') },
    { label: t('s1_item2_label'), desc: t('s1_item2_desc') },
    { label: t('s1_item3_label'), desc: t('s1_item3_desc') },
  ];

  const isins = [
    { ticker: 'IMIE', isin: 'IE00B3YLTY66', name: t('s2_imie_name') },
    { ticker: 'IWDA', isin: 'IE00B4L5Y983', name: t('s2_iwda_name') },
    { ticker: 'EMIM', isin: 'IE00BKM4GZ66', name: t('s2_emim_name') },
    { ticker: 'CSPX', isin: 'IE00B5BMR087', name: t('s2_cspx_name') },
    { ticker: 'CNDX', isin: 'IE00B53SZB19', name: t('s2_cndx_name') },
    { ticker: 'XMAW', isin: 'IE00BJ0KDQ92', name: t('s2_xmaw_name') },
    { ticker: 'XEON', isin: 'LU0290358497', name: t('s2_xeon_name') },
  ];

  const checks = [
    { label: t('s4_item1_label'), desc: t('s4_item1_desc') },
    { label: t('s4_item2_label'), desc: t('s4_item2_desc') },
    { label: t('s4_item3_label'), desc: t('s4_item3_desc') },
  ];

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

      <main className="bg-[var(--warm-cream)]">
        <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">

          {/* Section 1 — Prérequis */}
          <section className="mb-12">
            <h2 className="mb-4 font-heading text-xl font-bold text-[var(--charcoal)]">
              {t('s1_title')}
            </h2>
            <p className="mb-4 text-sm leading-relaxed text-[var(--charcoal)]/75">
              {t('s1_intro')}
            </p>
            <div className="space-y-3">
              {prereqs.map(({ label, desc }) => (
                <div key={label} className="flex gap-3 rounded-lg border border-[var(--warm-tan)]/50 bg-[var(--warm-white)] px-4 py-3">
                  <span className="mt-0.5 flex-shrink-0 text-[var(--forest)]">✓</span>
                  <div>
                    <span className="font-medium text-[var(--charcoal)]">{label}</span>
                    <span className="text-sm text-[var(--charcoal)]/60"> — {desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section 2 — ISIN */}
          <section className="mb-12">
            <h2 className="mb-4 font-heading text-xl font-bold text-[var(--charcoal)]">
              {t('s2_title')}
            </h2>
            <p className="mb-4 text-sm leading-relaxed text-[var(--charcoal)]/75">
              {t('s2_intro')}
            </p>

            <div className="rounded-xl border border-[var(--forest)]/25 bg-[var(--forest)]/5 p-5">
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[var(--forest)]/70">
                {t('s2_isin_label')}
              </p>
              <div className="divide-y divide-[var(--warm-tan)]/40">
                {isins.map(({ ticker, isin, name }) => (
                  <div key={isin} className="flex items-baseline justify-between gap-4 py-2.5 first:pt-0 last:pb-0">
                    <div>
                      <span className="font-mono text-sm font-semibold text-[var(--forest)]">{ticker}</span>
                      <span className="ml-2 text-xs text-[var(--charcoal)]/55">{name}</span>
                    </div>
                    <span className="flex-shrink-0 font-mono text-xs text-[var(--charcoal)]/50">{isin}</span>
                  </div>
                ))}
              </div>
            </div>

            <TipBox label={t('tip_label')}>
              {t('s2_tip')}
            </TipBox>
          </section>

          {/* Section 3 — Type d'ordre */}
          <section className="mb-12">
            <h2 className="mb-4 font-heading text-xl font-bold text-[var(--charcoal)]">
              {t('s3_title')}
            </h2>
            <p className="mb-4 text-sm leading-relaxed text-[var(--charcoal)]/75">
              {t('s3_intro')}
            </p>
            <div className="space-y-3">
              <div className="rounded-lg border border-[var(--warm-tan)]/50 bg-[var(--warm-white)] px-4 py-3">
                <p className="font-medium text-[var(--charcoal)]">
                  {t('s3_market_title')}{' '}
                  <span className="ml-1 text-xs font-normal text-[var(--charcoal)]/50">{t('s3_market_subtitle')}</span>
                </p>
                <p className="mt-1 text-sm text-[var(--charcoal)]/65">{t('s3_market_desc')}</p>
              </div>
              <div className="rounded-lg border border-[var(--forest)]/30 bg-[var(--forest)]/5 px-4 py-3">
                <p className="font-medium text-[var(--forest)]">
                  {t('s3_limit_title')}{' '}
                  <span className="ml-1 text-xs font-normal text-[var(--forest)]/50">{t('s3_limit_subtitle')}</span>
                </p>
                <p className="mt-1 text-sm text-[var(--charcoal)]/65">{t('s3_limit_desc')}</p>
              </div>
            </div>

            <TipBox label={t('tip_label')}>
              {t('s3_tip')}
            </TipBox>
          </section>

          {/* Section 4 — Vérifications */}
          <section className="mb-12">
            <h2 className="mb-4 font-heading text-xl font-bold text-[var(--charcoal)]">
              {t('s4_title')}
            </h2>
            <p className="mb-4 text-sm leading-relaxed text-[var(--charcoal)]/75">
              {t('s4_intro')}
            </p>
            <div className="space-y-3">
              {checks.map(({ label, desc }) => (
                <div key={label} className="flex gap-3 rounded-lg border border-[var(--warm-tan)]/50 bg-[var(--warm-white)] px-4 py-3">
                  <span className="mt-0.5 flex-shrink-0 font-bold text-[var(--forest)]">✓</span>
                  <div>
                    <span className="font-medium text-[var(--charcoal)]">{label}</span>
                    <p className="mt-0.5 text-sm text-[var(--charcoal)]/60">{desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <WarningBox label={t('warning_label')}>
              {t('s4_warning')}
            </WarningBox>
          </section>

          {/* Section 5 — Après l'achat */}
          <section className="mb-12">
            <h2 className="mb-4 font-heading text-xl font-bold text-[var(--charcoal)]">
              {t('s5_title')}
            </h2>
            <p className="mb-4 text-sm leading-relaxed text-[var(--charcoal)]/75">{t('s5_p1')}</p>
            <p className="mb-4 text-sm leading-relaxed text-[var(--charcoal)]/75">{t('s5_p2')}</p>
            <p className="text-sm leading-relaxed text-[var(--charcoal)]/75">{t('s5_p3')}</p>

            <TipBox label={t('tip_label')}>
              {t('s5_tip')}
            </TipBox>
          </section>

          {/* Section 6 — Quand passer */}
          <section className="mb-12">
            <h2 className="mb-4 font-heading text-xl font-bold text-[var(--charcoal)]">
              {t('s6_title')}
            </h2>
            <p className="mb-4 text-sm leading-relaxed text-[var(--charcoal)]/75">{t('s6_p1')}</p>
            <p className="text-sm leading-relaxed text-[var(--charcoal)]/75">{t('s6_p2')}</p>
          </section>

          {/* CTA */}
          <div className="mt-14 rounded-xl border border-[var(--warm-tan)]/50 bg-[var(--warm-white)] px-6 py-8 text-center">
            <p className="mb-5 text-sm font-medium text-[var(--charcoal)]/70">
              {t('cta_heading')}
            </p>
            <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Link
                href="/strategies"
                className="rounded-full bg-[var(--forest)] px-6 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
              >
                {t('cta_strategies')}
              </Link>
              <Link
                href="/brokers"
                className="rounded-full border border-[var(--forest)]/30 bg-transparent px-6 py-2.5 text-sm font-semibold text-[var(--forest)] transition-colors hover:bg-[var(--forest)]/5"
              >
                {t('cta_brokers')}
              </Link>
              <Link
                href="/questions"
                className="text-sm text-[var(--charcoal)]/50 transition-colors hover:text-[var(--charcoal)]"
              >
                {t('cta_back_questions')}
              </Link>
            </div>
          </div>

          {/* Disclaimer */}
          <p className="mt-10 text-center text-xs text-[var(--charcoal)]/35">
            {t('disclaimer')}
          </p>

          <LastUpdated isoDate="2026-03-01" />

        </div>
      </main>
    </>
  );
}
