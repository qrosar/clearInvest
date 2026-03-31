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
    fr: 'Immobilier ou ETF ? La comparaison pour investisseurs belges', 
    nl: 'Vastgoed of ETF? De vergelijking voor Belgische beleggers', 
    en: 'Real Estate or ETF? The comparison for Belgian investors' 
  }
  const descriptions = { 
    fr: 'Rendements, levier, frais cachés et fiscalité : tout ce qu\'il faut savoir avant de choisir entre la brique et la bourse.', 
    nl: 'Rendementen, hefboom, verborgen kosten en fiscaliteit: alles wat u moet weten voordat u kiest tussen stenen en de beurs.', 
    en: 'Returns, leverage, hidden fees and taxation: everything you need to know before choosing between bricks and the stock market.' 
  }
  return {
    title: titles[locale as keyof typeof titles] ?? titles.fr,
    description: descriptions[locale as keyof typeof descriptions] ?? descriptions.fr,
    alternates: {
      canonical: `https://clearinvest.be/${locale}/ressources/immobilier-vs-etf`,
    },
  }
}

// ── Sub-components ─────────────────────────────────────────────────────────────

async function ComparisonCard() {
  const t = await getTranslations('immobilierVsEtf');
  const items = [
    { label: 'yield', icon: '📈' },
    { label: 'liq', icon: '💧' },
    { label: 'div', icon: '🌐' },
    { label: 'levier', icon: '⚖️' },
    { label: 'mgmt', icon: '⏳' },
    { label: 'min', icon: '💰' },
  ];

  return (
    <div className="my-10 overflow-hidden rounded-2xl border border-[var(--warm-tan)]/50 bg-[var(--warm-white)] shadow-sm">
      <div className="grid grid-cols-2 divide-x divide-[var(--warm-tan)]/30">
        {/* Immobilier */}
        <div className="p-5 sm:p-6">
          <h3 className="mb-6 text-center font-heading text-lg font-bold text-[var(--charcoal)]">
            {t('comp_left_title')}
          </h3>
          <div className="space-y-5">
            {items.map(item => (
              <div key={item.label}>
                <p className="mb-1 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[var(--charcoal)]/35">
                  <span>{item.icon}</span>
                  {/* We reuse labels from right if they are the same category, or just use keys */}
                </p>
                <p className="text-sm font-medium text-[var(--charcoal)]">
                  {t(`comp_left_${item.label}` as any)}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ETF */}
        <div className="bg-[var(--forest)]/5 p-5 sm:p-6">
          <h3 className="mb-6 text-center font-heading text-lg font-bold text-[var(--forest)]">
            {t('comp_right_title')}
          </h3>
          <div className="space-y-5">
            {items.map(item => (
              <div key={item.label}>
                <p className="mb-1 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[var(--forest)]/40">
                  <span>{item.icon}</span>
                </p>
                <p className="text-sm font-medium text-[var(--charcoal)]">
                  {t(`comp_right_${item.label}` as any)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function WarningBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-8 rounded-xl border border-amber-300/60 bg-amber-50 px-5 py-4 text-sm leading-relaxed text-amber-900">
      {children}
    </div>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-5 mt-14 font-heading text-2xl font-bold text-[var(--charcoal)] first:mt-0">
      {children}
    </h2>
  );
}

function SubHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="mb-3 mt-8 font-heading text-lg font-bold text-[var(--charcoal)]">
      {children}
    </h3>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────────

export default async function ImmobilierVsEtfPage() {
  const t = await getTranslations('immobilierVsEtf');

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
          
          <div className="prose prose-sm max-w-none text-[var(--charcoal)]/80">
            <p className="text-lg leading-relaxed text-[var(--charcoal)]">
              {t('intro_p1')}
            </p>
            <p className="mt-4">
              {t('intro_p2')}
            </p>

            <SectionHeading>{t('s1_title')}</SectionHeading>
            <p>{t('s1_p1')}</p>
            <p className="mt-4">{t('s1_p2')}</p>
            <p className="mt-4">{t('s1_p3')}</p>

            <ComparisonCard />

            <SectionHeading>{t('s2_title')}</SectionHeading>
            <p>{t('s2_p1')}</p>
            <p className="mt-4">{t('s2_p2')}</p>
            
            <div className="my-8 rounded-xl border border-[var(--warm-tan)]/40 bg-[var(--warm-white)] p-6">
              <p className="mb-3 font-bold text-[var(--charcoal)]">{t('s2_example_title')}</p>
              <p className="text-sm leading-relaxed">{t('s2_example_p1')}</p>
            </div>

            <p>{t('s2_p3')}</p>
            <p className="mt-4">{t('s2_p4')}</p>

            <SectionHeading>{t('s2b_title')}</SectionHeading>
            <p>{t('s2b_p1')}</p>
            <div className="mt-6 space-y-2 rounded-xl border border-[var(--forest)]/20 bg-[var(--forest)]/5 p-5">
              <p className="font-bold text-[var(--charcoal)]">{t('s2b_rule_title')}</p>
              <ul className="space-y-2 text-sm">
                <li className="flex gap-2"><span>{t('s2b_rule_pos')}</span></li>
                <li className="flex gap-2"><span>{t('s2b_rule_neg')}</span></li>
              </ul>
            </div>

            <div className="my-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-[var(--warm-tan)]/40 bg-[var(--warm-white)] p-5">
                <p className="mb-3 text-xs font-bold uppercase tracking-wide text-[var(--forest)]">{t('s2b_scenario_a_title')}</p>
                <div className="space-y-2 text-sm leading-relaxed text-[var(--charcoal)]/70">
                  {t('s2b_scenario_a_content').split('|').map((line, i) => (
                    <p key={i}>{line.trim()}</p>
                  ))}
                </div>
              </div>
              <div className="rounded-xl border border-amber-200 bg-amber-50/50 p-5">
                <p className="mb-3 text-xs font-bold uppercase tracking-wide text-amber-700">{t('s2b_scenario_b_title')}</p>
                <div className="space-y-2 text-sm leading-relaxed text-amber-900/70">
                  {t('s2b_scenario_b_content').split('|').map((line, i) => (
                    <p key={i}>{line.trim()}</p>
                  ))}
                </div>
              </div>
            </div>

            <p>{t('s2b_p2')}</p>
            <p className="mt-4">{t('s2b_p3')}</p>
            <p className="mt-4">{t('s2b_p4')}</p>

            <div className="my-8 rounded-xl border border-amber-300/60 bg-amber-50 px-5 py-4 text-sm leading-relaxed text-amber-900">
              <p className="mb-1 font-semibold">💡 Conseil</p>
              {t('s2b_tip')}
            </div>

            <SectionHeading>{t('s3_title')}</SectionHeading>
            <p className="mb-6">{t('s3_intro')}</p>
            
            <SubHeading>{t('s3_item1_title')}</SubHeading>
            <p>{t('s3_item1_p')}</p>

            <SubHeading>{t('s3_item2_title')}</SubHeading>
            <p>{t('s3_item2_p')}</p>

            <SubHeading>{t('s3_item3_title')}</SubHeading>
            <p>{t('s3_item3_p')}</p>

            <SubHeading>{t('s3_item4_title')}</SubHeading>
            <p>{t('s3_item4_p')}</p>

            <SectionHeading>{t('s4_title')}</SectionHeading>
            <p className="mb-6">{t('s4_intro')}</p>

            <SubHeading>{t('s4_item1_title')}</SubHeading>
            <p>{t('s4_item1_p1')}</p>
            <p className="mt-2 font-medium text-[var(--forest)]">{t('s4_item1_p2')}</p>

            <SubHeading>{t('s4_item2_title')}</SubHeading>
            <p>{t('s4_item2_p')}</p>

            <SubHeading>{t('s4_item3_title')}</SubHeading>
            <p>{t('s4_item3_p')}</p>

            <SubHeading>{t('s4_item4_title')}</SubHeading>
            <p>{t('s4_item4_p')}</p>

            <WarningBox>
              {t('s4_warning')}
            </WarningBox>

            <SectionHeading>{t('s5_title')}</SectionHeading>
            <p className="mb-8">{t('s5_p1')}</p>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-xl border border-[var(--warm-tan)]/40 bg-[var(--warm-white)] p-5">
                <p className="mb-4 font-bold text-[var(--charcoal)]">{t('s5_immo_title')}</p>
                <ul className="space-y-3 text-xs leading-relaxed text-[var(--charcoal)]/70">
                  <li className="flex gap-2">
                    <span className="text-[var(--forest)]">→</span>
                    <span>{t('s5_immo_li1')}</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-[var(--forest)]">→</span>
                    <span>{t('s5_immo_li2')}</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-[var(--forest)]">→</span>
                    <span>{t('s5_immo_li3')}</span>
                  </li>
                </ul>
              </div>
              <div className="rounded-xl border border-[var(--forest)]/20 bg-[var(--forest)]/5 p-5">
                <p className="mb-4 font-bold text-[var(--forest)]">{t('s5_etf_title')}</p>
                <ul className="space-y-3 text-xs leading-relaxed text-[var(--charcoal)]/70">
                  <li className="flex gap-2">
                    <span className="text-[var(--forest)]">→</span>
                    <span>{t('s5_etf_li1')}</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-[var(--forest)]">→</span>
                    <span>{t('s5_etf_li2')}</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-[var(--forest)]">→</span>
                    <span>{t('s5_etf_li3')}</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-[var(--forest)]">→</span>
                    <span>{t('s5_etf_li4')}</span>
                  </li>
                </ul>
              </div>
            </div>

            <p className="mt-10 text-center font-medium italic">
              {t('s5_p2')}
            </p>
            <p className="mt-4 text-center">
              {t('s5_p3')}
            </p>
          </div>

          {/* CTA */}
          <div className="mt-16 border-t border-[var(--warm-tan)]/30 pt-12 text-center">
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link
                href="/strategies"
                className="rounded-full bg-[var(--forest)] px-8 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
              >
                {t('cta_strategies')}
              </Link>
              <Link
                href="/calculateur"
                className="rounded-full border border-[var(--forest)]/30 bg-transparent px-8 py-3 text-sm font-semibold text-[var(--forest)] transition-colors hover:bg-[var(--forest)]/5"
              >
                {t('cta_calc')}
              </Link>
            </div>
            <div className="mt-8">
              <Link
                href="/ressources"
                className="text-sm text-[var(--charcoal)]/40 transition-colors hover:text-[var(--charcoal)]"
              >
                {t('cta_back')}
              </Link>
            </div>
          </div>

          <LastUpdated isoDate="2026-03-01" />

        </div>
      </main>
    </>
  );
}
