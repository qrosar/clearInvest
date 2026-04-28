import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import LastUpdated from '@/components/ui/LastUpdated';

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params;
  const t = await getTranslations('analyseCrelanOpportunities');

  return {
    title: t('meta_title'),
    description: t('meta_description'),
    alternates: {
      canonical: `https://clearinvest.be/${locale}/analyse-produits/crelan-invest-opportunities`,
    },
  }
}

// ── Editorial primitives ───────────────────────────────────────────────────────

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-heading text-2xl font-bold text-[var(--charcoal)] md:text-3xl">
      {children}
    </h2>
  );
}

function Body({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-4 text-base leading-relaxed text-[var(--charcoal)]/75">
      {children}
    </p>
  );
}

function WarningBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 px-5 py-4">
      <p className="text-sm leading-relaxed text-amber-800">{children}</p>
    </div>
  );
}

function Divider() {
  return <div className="my-12 border-t border-[var(--warm-tan)]/40" />;
}

function TldrBox({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mt-8 rounded-xl border border-amber-200 bg-amber-50 px-5 py-5">
      <p className="mb-2 text-xs font-bold uppercase tracking-widest text-amber-600">{label}</p>
      <p className="text-sm leading-relaxed text-amber-800">{children}</p>
    </div>
  );
}

function NumberedPoint({ n, heading, children }: { n: number; heading: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-4">
      <div className="flex-shrink-0 flex h-8 w-8 items-center justify-center rounded-full bg-[var(--forest)]/10 text-sm font-bold text-[var(--forest)]">
        {n}
      </div>
      <div className="pt-0.5">
        <p className="font-semibold text-[var(--charcoal)]">{heading}</p>
        <p className="mt-1 text-sm leading-relaxed text-[var(--charcoal)]/70">{children}</p>
      </div>
    </div>
  );
}

function NeutralCallout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-6 rounded-xl border border-[var(--warm-tan)]/50 bg-[var(--warm-white)] px-5 py-4">
      <p className="text-sm leading-relaxed text-[var(--charcoal)]/70">{children}</p>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4 border-b border-[var(--warm-tan)]/20 py-3 last:border-0">
      <span className="text-sm font-medium text-[var(--charcoal)]/50">{label}</span>
      <span className="text-right text-sm font-bold text-[var(--charcoal)]">{value}</span>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default async function CrelanInvestOpportunitiesPage() {
  const t = await getTranslations('analyseCrelanOpportunities');

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

      {/* Article body */}
      <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">

        {/* TL;DR */}
        <TldrBox label={t('tldr_label')}>{t('tldr_text')}</TldrBox>

        {/* Section 1: Fiche produit */}
        <section className="mt-14">
          <SectionHeading>{t('s1_title')}</SectionHeading>
          <div className="mt-8 rounded-2xl border border-[var(--warm-tan)]/50 bg-[var(--warm-white)] p-6">
            <InfoRow label={t('s1_label_product')} value={t('s1_val_product')} />
            <InfoRow label={t('s1_label_isin')} value={t('s1_val_isin')} />
            <InfoRow label={t('s1_label_type')} value={t('s1_val_type')} />
            <InfoRow label={t('s1_label_manager')} value={t('s1_val_manager')} />
            <InfoRow label={t('s1_label_portfolio_mgr')} value={t('s1_val_portfolio_mgr')} />
            <InfoRow label={t('s1_label_distributor')} value={t('s1_val_distributor')} />
            <InfoRow label={t('s1_label_style')} value={t('s1_val_style')} />
            <InfoRow label={t('s1_label_horizon')} value={t('s1_val_horizon')} />
            <InfoRow label={t('s1_label_risk')} value={t('s1_val_risk')} />
            <InfoRow label={t('s1_label_entry')} value={t('s1_val_entry')} />
            <InfoRow label={t('s1_label_mgmt')} value={t('s1_val_mgmt')} />
            <InfoRow label={t('s1_label_transaction')} value={t('s1_val_transaction')} />
            <InfoRow label={t('s1_label_riy')} value={t('s1_val_riy')} />
            <InfoRow label={t('s1_label_exit')} value={t('s1_val_exit')} />
            <InfoRow label={t('s1_label_tob')} value={t('s1_val_tob')} />
            <InfoRow label={t('s1_label_reynders')} value={t('s1_val_reynders')} />
            <InfoRow label={t('s1_label_cgt')} value={t('s1_val_cgt')} />
            <InfoRow label={t('s1_label_gross')} value={t('s1_val_gross')} />
            <InfoRow label={t('s1_label_net')} value={t('s1_val_net')} />
          </div>
          <p className="mt-3 text-xs italic leading-relaxed text-[var(--charcoal)]/40">
            {t('s1_source')}
          </p>
        </section>

        <Divider />

        {/* Section 2: La structure fonds-de-fonds */}
        <section>
          <SectionHeading>{t('s2_title')}</SectionHeading>
          <Body>{t('s2_intro')}</Body>
          <div className="mt-6 space-y-6">
            <NumberedPoint n={1} heading={t('s2_layer1_title')}>
              {t('s2_layer1_desc')}
            </NumberedPoint>
            <NumberedPoint n={2} heading={t('s2_layer2_title')}>
              {t('s2_layer2_desc')}
            </NumberedPoint>
          </div>
          <Body>{t('s2_result')}</Body>
          <WarningBox>{t('s2_warning')}</WarningBox>
        </section>

        <Divider />

        {/* Section 3: La fiscalité — trois couches */}
        <section>
          <SectionHeading>{t('s3_title')}</SectionHeading>
          <div className="mt-8 space-y-6">
            <NumberedPoint n={1} heading={t('s3_point1_title')}>
              {t('s3_point1_desc')}
            </NumberedPoint>
            <NumberedPoint n={2} heading={t('s3_point2_title')}>
              {t('s3_point2_desc')}
            </NumberedPoint>
            <NumberedPoint n={3} heading={t('s3_point3_title')}>
              {t('s3_point3_desc')}
            </NumberedPoint>
          </div>
          <WarningBox>{t('s3_warning')}</WarningBox>
        </section>

        <Divider />

        {/* Section 4: Le match sur 30 ans */}
        <section>
          <SectionHeading>{t('s4_title')}</SectionHeading>
          <Body>{t('s4_intro')}</Body>

          {/* Two comparison tables — side by side on md+, stacked on mobile */}
          <div className="mt-8 grid gap-6 md:grid-cols-2">

            {/* Scenario A: monthly contributions */}
            <div>
              <p className="mb-3 text-sm font-bold text-[var(--charcoal)]">{t('s4a_header')}</p>
              <div className="overflow-x-auto rounded-2xl border border-[var(--warm-tan)]/50">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="bg-[var(--warm-tan)]/10">
                      <th className="px-3 py-3 font-semibold text-[var(--charcoal)]/40"></th>
                      <th className="px-3 py-3 font-bold text-red-700">{t('s4_col_crelan')}</th>
                      <th className="px-3 py-3 font-bold text-[var(--forest)]">{t('s4_col_etf')}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[var(--warm-tan)]/20">
                    <tr>
                      <td className="px-3 py-2 text-[var(--charcoal)]/60">{t('s4_row1')}</td>
                      <td className="px-3 py-2 text-red-600">{t('s4a_c1_r1')}</td>
                      <td className="px-3 py-2 text-[var(--charcoal)]">{t('s4a_c2_r1')}</td>
                    </tr>
                    <tr className="bg-[var(--warm-white)]/50">
                      <td className="px-3 py-2 text-[var(--charcoal)]/60">{t('s4_row2')}</td>
                      <td className="px-3 py-2 text-red-600">{t('s4a_c1_r2')}</td>
                      <td className="px-3 py-2 text-green-600">{t('s4a_c2_r2')}</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2 text-[var(--charcoal)]/60">{t('s4_row3')}</td>
                      <td className="px-3 py-2 text-[var(--charcoal)]">{t('s4a_c1_r3')}</td>
                      <td className="px-3 py-2 text-[var(--charcoal)]">{t('s4a_c2_r3')}</td>
                    </tr>
                    <tr className="bg-[var(--warm-white)]/50">
                      <td className="px-3 py-2 text-[var(--charcoal)]/60">{t('s4_row4')}</td>
                      <td className="px-3 py-2 text-red-600">{t('s4a_c1_r4')}</td>
                      <td className="px-3 py-2 text-green-600">{t('s4a_c2_r4')}</td>
                    </tr>
                    <tr className="border-t-2 border-[var(--warm-tan)]/40">
                      <td className="px-3 py-2 font-bold text-[var(--charcoal)]">{t('s4_row5')}</td>
                      <td className="px-3 py-2 font-bold text-red-600">{t('s4a_c1_r5')}</td>
                      <td className="px-3 py-2 font-bold text-green-600">{t('s4a_c2_r5')}</td>
                    </tr>
                    <tr className="bg-[var(--warm-white)]/50">
                      <td className="px-3 py-2 font-bold text-[var(--charcoal)]">{t('s4_row6')}</td>
                      <td className="px-3 py-2 font-bold text-red-600">{t('s4a_c1_r6')}</td>
                      <td className="px-3 py-2 font-bold text-green-600">{t('s4a_c2_r6')}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Scenario B: lump sum */}
            <div>
              <p className="mb-3 text-sm font-bold text-[var(--charcoal)]">{t('s4b_header')}</p>
              <div className="overflow-x-auto rounded-2xl border border-[var(--warm-tan)]/50">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="bg-[var(--warm-tan)]/10">
                      <th className="px-3 py-3 font-semibold text-[var(--charcoal)]/40"></th>
                      <th className="px-3 py-3 font-bold text-red-700">{t('s4_col_crelan')}</th>
                      <th className="px-3 py-3 font-bold text-[var(--forest)]">{t('s4_col_etf')}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[var(--warm-tan)]/20">
                    <tr>
                      <td className="px-3 py-2 text-[var(--charcoal)]/60">{t('s4_row1')}</td>
                      <td className="px-3 py-2 text-red-600">{t('s4b_c1_r1')}</td>
                      <td className="px-3 py-2 text-[var(--charcoal)]">{t('s4b_c2_r1')}</td>
                    </tr>
                    <tr className="bg-[var(--warm-white)]/50">
                      <td className="px-3 py-2 text-[var(--charcoal)]/60">{t('s4_row2')}</td>
                      <td className="px-3 py-2 text-red-600">{t('s4b_c1_r2')}</td>
                      <td className="px-3 py-2 text-green-600">{t('s4b_c2_r2')}</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2 text-[var(--charcoal)]/60">{t('s4_row3')}</td>
                      <td className="px-3 py-2 text-[var(--charcoal)]">{t('s4b_c1_r3')}</td>
                      <td className="px-3 py-2 text-[var(--charcoal)]">{t('s4b_c2_r3')}</td>
                    </tr>
                    <tr className="bg-[var(--warm-white)]/50">
                      <td className="px-3 py-2 text-[var(--charcoal)]/60">{t('s4_row4')}</td>
                      <td className="px-3 py-2 text-red-600">{t('s4b_c1_r4')}</td>
                      <td className="px-3 py-2 text-green-600">{t('s4b_c2_r4')}</td>
                    </tr>
                    <tr className="border-t-2 border-[var(--warm-tan)]/40">
                      <td className="px-3 py-2 font-bold text-[var(--charcoal)]">{t('s4_row5')}</td>
                      <td className="px-3 py-2 font-bold text-red-600">{t('s4b_c1_r5')}</td>
                      <td className="px-3 py-2 font-bold text-green-600">{t('s4b_c2_r5')}</td>
                    </tr>
                    <tr className="bg-[var(--warm-white)]/50">
                      <td className="px-3 py-2 font-bold text-[var(--charcoal)]">{t('s4_row6')}</td>
                      <td className="px-3 py-2 font-bold text-red-600">{t('s4b_c1_r6')}</td>
                      <td className="px-3 py-2 font-bold text-green-600">{t('s4b_c2_r6')}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <NeutralCallout>{t('s4_callout')}</NeutralCallout>

          <p className="mt-6 text-sm italic leading-relaxed text-[var(--charcoal)]/45">
            {t('s4_methodology')}
          </p>

          <div className="mt-8 rounded-2xl bg-[var(--forest)] p-6 text-white sm:p-8">
            <p className="text-base leading-relaxed opacity-90">
              {t('s4_cta_text')}
            </p>
            <Link
              href="/calculateur"
              className="mt-6 inline-flex items-center rounded-xl bg-white px-6 py-3 text-sm font-bold text-[var(--forest)] transition-transform hover:scale-[1.02]"
            >
              {t('s4_cta_btn')}
            </Link>
          </div>
        </section>

        <Divider />

        {/* Section 6: Cas d'usage légitime */}
        <section>
          <SectionHeading>{t('s6_title')}</SectionHeading>
          <Body>{t('s6_p1')}</Body>
        </section>

        <Divider />

        {/* Verdict */}
        <section className="rounded-3xl bg-[var(--forest-deep)] p-8 text-white md:p-12">
          <h2 className="font-heading text-2xl font-bold md:text-3xl">
            {t('s7_title')}
          </h2>
          <div className="mt-6 space-y-4 opacity-90 text-base leading-relaxed">
            <p>{t('s7_p1')}</p>
            <p>{t('s7_p2')}</p>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <p className="font-bold text-sm uppercase tracking-wide text-white/50">{t('s7_ideal_title')}</p>
              <p className="mt-2 text-sm leading-relaxed">{t('s7_ideal_desc')}</p>
            </div>
            <div>
              <p className="font-bold text-sm uppercase tracking-wide text-white/50">{t('s7_avoid_title')}</p>
              <p className="mt-2 text-sm leading-relaxed">{t('s7_avoid_desc')}</p>
            </div>
          </div>
        </section>

        {/* CTAs */}
        <div className="mt-12 space-y-4">
          <Link
            href="/calculateur"
            className="flex w-full items-center justify-center rounded-2xl bg-[var(--forest)] px-8 py-4 text-center font-bold text-white transition-transform hover:scale-[1.01] active:scale-[0.99]"
          >
            {t('cta_primary')}
          </Link>
          <Link
            href="/strategies/epargne-liquide"
            className="flex w-full items-center justify-center rounded-2xl border border-[var(--forest)]/20 bg-white px-8 py-4 text-center font-bold text-[var(--forest)] transition-colors hover:bg-[var(--sage-pale)]/20"
          >
            {t('cta_secondary')}
          </Link>
          <div className="text-center">
            <Link
              href="/analyse-produits"
              className="text-sm text-[var(--charcoal)]/40 transition-colors hover:text-[var(--charcoal)]"
            >
              {t('cta_tertiary')}
            </Link>
          </div>
        </div>

        <LastUpdated isoDate="2026-04-27" />

        <p className="mt-8 text-center text-xs italic leading-relaxed text-[var(--charcoal)]/30">
          {t('disclaimer')}
        </p>

      </div>
    </>
  );
}
