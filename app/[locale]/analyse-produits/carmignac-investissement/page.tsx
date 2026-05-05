import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import LastUpdated from '@/components/ui/LastUpdated';

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params;
  const t = await getTranslations('analyseCarmignacInvestissement');

  return {
    title: t('meta_title'),
    description: t('meta_description'),
    alternates: {
      canonical: `https://clearinvest.be/${locale}/analyse-produits/carmignac-investissement`,
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

function SageCallout({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mt-6 rounded-xl border border-[var(--sage-pale)]/60 bg-[var(--sage-pale)]/20 px-5 py-4">
      <p className="mb-1 text-xs font-bold uppercase tracking-widest text-[var(--forest)]/60">{label}</p>
      <p className="text-sm leading-relaxed text-[var(--charcoal)]/75">{children}</p>
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

export default async function CarmignacInvestissementPage() {
  const t = await getTranslations('analyseCarmignacInvestissement');

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

        {/* Section 1: Fiche Produit */}
        <section className="mt-14">
          <SectionHeading>{t('s1_title')}</SectionHeading>
          <div className="mt-8 rounded-2xl border border-[var(--warm-tan)]/50 bg-[var(--warm-white)] p-6">
            <InfoRow label={t('s1_label_product')} value={t('s1_val_product')} />
            <InfoRow label={t('s1_label_isin')} value={t('s1_val_isin')} />
            <InfoRow label={t('s1_label_type')} value={t('s1_val_type')} />
            <InfoRow label={t('s1_label_manager')} value={t('s1_val_manager')} />
            <InfoRow label={t('s1_label_style')} value={t('s1_val_style')} />
            <InfoRow label={t('s1_label_risk')} value={t('s1_val_risk')} />
            <InfoRow label={t('s1_label_aum')} value={t('s1_val_aum')} />
            <InfoRow label={t('s1_label_entry')} value={t('s1_val_entry')} />
            <InfoRow label={t('s1_label_management')} value={t('s1_val_management')} />
            <InfoRow label={t('s1_label_ter')} value={t('s1_val_ter')} />
            <InfoRow label={t('s1_label_perf_fee')} value={t('s1_val_perf_fee')} />
            <InfoRow label={t('s1_label_tob_buy')} value={t('s1_val_tob_buy')} />
            <InfoRow label={t('s1_label_tob_sell')} value={t('s1_val_tob_sell')} />
            <InfoRow label={t('s1_label_reynders')} value={t('s1_val_reynders')} />
            <InfoRow label={t('s1_label_cgt')} value={t('s1_val_cgt')} />
            <InfoRow label={t('s1_label_precompte')} value={t('s1_val_precompte')} />
          </div>
          <p className="mt-3 text-xs italic leading-relaxed text-[var(--charcoal)]/40">
            {t('s1_source')}
          </p>
        </section>

        <Divider />

        {/* Section 2: 37 Ans de Track Record */}
        <section>
          <SectionHeading>{t('s2_title')}</SectionHeading>
          <Body>{t('s2_p1')}</Body>

          {/* Performance table */}
          <div className="mt-8 overflow-x-auto rounded-2xl border border-[var(--warm-tan)]/50">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-[var(--warm-tan)]/10">
                  <th className="px-3 py-3 font-semibold text-[var(--charcoal)]/40"></th>
                  <th className="px-3 py-3 font-bold text-[var(--forest)]">{t('s2_col_fund')}</th>
                  <th className="px-3 py-3 font-semibold text-[var(--charcoal)]/60">{t('s2_col_benchmark')}</th>
                  <th className="px-3 py-3 font-semibold text-[var(--charcoal)]/60">{t('s2_col_category')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--warm-tan)]/20">
                <tr>
                  <td className="px-3 py-2 text-[var(--charcoal)]/60">{t('s2_row_1y')}</td>
                  <td className="px-3 py-2 font-semibold text-green-600">{t('s2_fund_1y')}</td>
                  <td className="px-3 py-2 text-[var(--charcoal)]">{t('s2_bench_1y')}</td>
                  <td className="px-3 py-2 text-[var(--charcoal)]">{t('s2_cat_1y')}</td>
                </tr>
                <tr className="bg-[var(--warm-white)]/50">
                  <td className="px-3 py-2 text-[var(--charcoal)]/60">{t('s2_row_3y')}</td>
                  <td className="px-3 py-2 font-semibold text-green-600">{t('s2_fund_3y')}</td>
                  <td className="px-3 py-2 text-[var(--charcoal)]">{t('s2_bench_3y')}</td>
                  <td className="px-3 py-2 text-[var(--charcoal)]">{t('s2_cat_3y')}</td>
                </tr>
                <tr>
                  <td className="px-3 py-2 text-[var(--charcoal)]/60">{t('s2_row_5y')}</td>
                  <td className="px-3 py-2 font-semibold text-amber-600">{t('s2_fund_5y')}</td>
                  <td className="px-3 py-2 text-[var(--charcoal)]">{t('s2_bench_5y')}</td>
                  <td className="px-3 py-2 text-[var(--charcoal)]">{t('s2_cat_5y')}</td>
                </tr>
                <tr className="bg-[var(--warm-white)]/50">
                  <td className="px-3 py-2 text-[var(--charcoal)]/60">{t('s2_row_10y')}</td>
                  <td className="px-3 py-2 font-semibold text-amber-600">{t('s2_fund_10y')}</td>
                  <td className="px-3 py-2 text-[var(--charcoal)]">{t('s2_bench_10y')}</td>
                  <td className="px-3 py-2 text-[var(--charcoal)]">{t('s2_cat_10y')}</td>
                </tr>
                <tr>
                  <td className="px-3 py-2 text-[var(--charcoal)]/60">{t('s2_row_since')}</td>
                  <td className="px-3 py-2 font-bold text-green-600">{t('s2_fund_since')}</td>
                  <td className="px-3 py-2 text-[var(--charcoal)]/40">—</td>
                  <td className="px-3 py-2 text-[var(--charcoal)]/40">—</td>
                </tr>
                <tr className="bg-[var(--warm-white)]/50">
                  <td className="px-3 py-2 text-[var(--charcoal)]/60">{t('s2_row_rank')}</td>
                  <td className="px-3 py-2 font-bold text-green-600" colSpan={3}>{t('s2_fund_rank')}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-2 text-xs text-[var(--charcoal)]/40">{t('s2_source')}</p>

          <NeutralCallout>{t('s2_callout')}</NeutralCallout>

          <Body>{t('s2_p2')}</Body>
        </section>

        <Divider />

        {/* Section 3: La Structure de Coûts */}
        <section>
          <SectionHeading>{t('s3_title')}</SectionHeading>
          <div className="mt-6 space-y-6">
            <NumberedPoint n={1} heading={t('s3_point1_heading')}>
              {t('s3_point1_desc')}
            </NumberedPoint>
            <div className="ml-12">
              <NeutralCallout>{t('s3_point1_recovery')}</NeutralCallout>
            </div>
            <NumberedPoint n={2} heading={t('s3_point2_heading')}>
              {t('s3_point2_desc')}
            </NumberedPoint>
            <NumberedPoint n={3} heading={t('s3_point3_heading')}>
              {t('s3_point3_desc')}
            </NumberedPoint>
          </div>

          <SageCallout label={t('s3_reynders_label')}>
            {t('s3_reynders_body')}
          </SageCallout>
        </section>

        <Divider />

        {/* Section 4: Le Match sur 30 ans */}
        <section>
          <SectionHeading>{t('s4_title')}</SectionHeading>
          <Body>{t('s4_basis')}</Body>

          {/* Main comparison table */}
          <div className="mt-8 overflow-x-auto rounded-2xl border border-[var(--warm-tan)]/50">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-[var(--warm-tan)]/10">
                  <th className="px-3 py-3 font-semibold text-[var(--charcoal)]/40"></th>
                  <th className="px-3 py-3 font-bold text-[var(--forest)]">{t('s4_col_carmignac')}</th>
                  <th className="px-3 py-3 font-bold text-[var(--forest)]">{t('s4_col_etf')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--warm-tan)]/20">
                <tr>
                  <td className="px-3 py-2 text-[var(--charcoal)]/60">{t('s4_row_entry')}</td>
                  <td className="px-3 py-2 text-amber-600">{t('s4_carm_entry')}</td>
                  <td className="px-3 py-2 text-[var(--charcoal)]">{t('s4_etf_entry')}</td>
                </tr>
                <tr className="bg-[var(--warm-white)]/50">
                  <td className="px-3 py-2 text-[var(--charcoal)]/60">{t('s4_row_return')}</td>
                  <td className="px-3 py-2 font-semibold text-green-600">{t('s4_carm_return')}</td>
                  <td className="px-3 py-2 text-[var(--charcoal)]">{t('s4_etf_return')}</td>
                </tr>
                <tr>
                  <td className="px-3 py-2 text-[var(--charcoal)]/60">{t('s4_row_gross')}</td>
                  <td className="px-3 py-2 text-[var(--charcoal)]">{t('s4_carm_gross')}</td>
                  <td className="px-3 py-2 text-[var(--charcoal)]">{t('s4_etf_gross')}</td>
                </tr>
                <tr className="bg-[var(--warm-white)]/50">
                  <td className="px-3 py-2 text-[var(--charcoal)]/60">{t('s4_row_tob')}</td>
                  <td className="px-3 py-2 text-amber-600">{t('s4_carm_tob')}</td>
                  <td className="px-3 py-2 text-[var(--charcoal)]">{t('s4_etf_tob')}</td>
                </tr>
                <tr>
                  <td className="px-3 py-2 text-[var(--charcoal)]/60">{t('s4_row_cgt')}</td>
                  <td className="px-3 py-2 text-amber-600">{t('s4_carm_cgt')}</td>
                  <td className="px-3 py-2 text-[var(--charcoal)]">{t('s4_etf_cgt')}</td>
                </tr>
                <tr className="border-t-2 border-[var(--warm-tan)]/40">
                  <td className="px-3 py-2 font-bold text-[var(--charcoal)]">{t('s4_row_net_total')}</td>
                  <td className="px-3 py-2 font-bold text-green-600">{t('s4_carm_net_total')}</td>
                  <td className="px-3 py-2 font-bold text-[var(--charcoal)]">{t('s4_etf_net_total')}</td>
                </tr>
                <tr className="bg-[var(--warm-white)]/50">
                  <td className="px-3 py-2 font-bold text-[var(--charcoal)]">{t('s4_row_net_gain')}</td>
                  <td className="px-3 py-2 font-bold text-green-600">{t('s4_carm_net_gain')}</td>
                  <td className="px-3 py-2 font-bold text-[var(--charcoal)]">{t('s4_etf_net_gain')}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <NeutralCallout>{t('s4_callout')}</NeutralCallout>

          {/* Sensitivity table */}
          <div className="mt-10">
            <p className="mb-3 text-sm font-semibold text-[var(--charcoal)]/60">{t('s4_sens_title')}</p>
            <div className="overflow-x-auto rounded-2xl border border-[var(--warm-tan)]/50">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-[var(--warm-tan)]/10">
                    <th className="px-3 py-3 font-semibold text-[var(--charcoal)]/40">{t('s4_sens_col_etf_rate')}</th>
                    <th className="px-3 py-3 font-semibold text-[var(--charcoal)]/40">{t('s4_sens_col_carm_net')}</th>
                    <th className="px-3 py-3 font-semibold text-[var(--charcoal)]/40">{t('s4_sens_col_etf_net')}</th>
                    <th className="px-3 py-3 font-semibold text-[var(--charcoal)]/40">{t('s4_sens_col_winner')}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--warm-tan)]/20">
                  <tr>
                    <td className="px-3 py-2 font-semibold text-[var(--charcoal)]">{t('s4_sens_r1_etf')}</td>
                    <td className="px-3 py-2 font-semibold text-green-600">{t('s4_sens_r1_carm')}</td>
                    <td className="px-3 py-2 text-[var(--charcoal)]">{t('s4_sens_r1_etfnet')}</td>
                    <td className="px-3 py-2 font-bold text-green-700">{t('s4_sens_r1_winner')}</td>
                  </tr>
                  <tr className="bg-[var(--warm-white)]/50">
                    <td className="px-3 py-2 font-semibold text-[var(--charcoal)]">{t('s4_sens_r2_etf')}</td>
                    <td className="px-3 py-2 text-[var(--charcoal)]">{t('s4_sens_r2_carm')}</td>
                    <td className="px-3 py-2 font-semibold text-green-600">{t('s4_sens_r2_etfnet')}</td>
                    <td className="px-3 py-2 font-bold text-green-700">{t('s4_sens_r2_winner')}</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 font-semibold text-[var(--charcoal)]">{t('s4_sens_r3_etf')}</td>
                    <td className="px-3 py-2 text-[var(--charcoal)]">{t('s4_sens_r3_carm')}</td>
                    <td className="px-3 py-2 font-semibold text-green-600">{t('s4_sens_r3_etfnet')}</td>
                    <td className="px-3 py-2 font-bold text-green-700">{t('s4_sens_r3_winner')}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-2 text-xs leading-relaxed text-[var(--charcoal)]/40">{t('s4_sens_note1')}</p>
            <p className="mt-1 text-xs leading-relaxed text-[var(--charcoal)]/40">{t('s4_sens_note2')}</p>
            <p className="mt-1 text-xs leading-relaxed text-[var(--charcoal)]/40">{t('s4_sens_note3')}</p>
          </div>

          <p className="mt-6 text-sm italic leading-relaxed text-[var(--charcoal)]/45">
            {t('s4_methodology')}
          </p>
        </section>

        <Divider />

        {/* Section 5: L'Aiguille dans la Botte de Foin */}
        <section>
          <SectionHeading>{t('s5_title')}</SectionHeading>
          <Body>{t('s5_intro')}</Body>
          <Body>{t('s5_problem_label')}</Body>
          <div className="mt-6 space-y-6">
            <NumberedPoint n={1} heading={t('s5_point1_heading')}>
              {t('s5_point1_desc')}
            </NumberedPoint>
            <NumberedPoint n={2} heading={t('s5_point2_heading')}>
              {t('s5_point2_desc')}
            </NumberedPoint>
            <NumberedPoint n={3} heading={t('s5_point3_heading')}>
              {t('s5_point3_desc')}
            </NumberedPoint>
          </div>
          <NeutralCallout>{t('s5_callout')}</NeutralCallout>
        </section>

        <Divider />

        {/* Section 6: Verdict */}
        <section className="rounded-3xl bg-[var(--forest-deep)] p-8 text-white md:p-12">
          <h2 className="font-heading text-2xl font-bold md:text-3xl">
            {t('s6_title')}
          </h2>

          <div className="mt-6 space-y-4 opacity-90 text-sm leading-relaxed">
            <p><span className="font-bold">1.</span> {t('s6_p1')}</p>
            <p><span className="font-bold">2.</span> {t('s6_p2')}</p>
            <p><span className="font-bold">3.</span> {t('s6_p3')}</p>
            <p><span className="font-bold">4.</span> {t('s6_p4')}</p>
            <p><span className="font-bold">5.</span> {t('s6_p5')}</p>
            <p><span className="font-bold">6.</span> {t('s6_p6')}</p>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="rounded-xl bg-white/5 p-4">
              <p className="font-bold text-sm uppercase tracking-wide text-white/50">{t('s6_justify_title')}</p>
              <p className="mt-2 text-sm leading-relaxed">{t('s6_justify_desc')}</p>
            </div>
            <div className="rounded-xl bg-white/5 p-4">
              <p className="font-bold text-sm uppercase tracking-wide text-white/50">{t('s6_avoid_title')}</p>
              <p className="mt-2 text-sm leading-relaxed">{t('s6_avoid_desc')}</p>
            </div>
          </div>
        </section>

        {/* CTAs */}
        <div className="mt-12 space-y-4">
          <Link
            href="/calculateur"
            className="flex w-full items-center justify-center rounded-2xl bg-[var(--forest)] px-8 py-4 text-center font-bold text-white transition-transform hover:scale-[1.01] active:scale-[0.99]"
          >
            {t('cta_calculator')}
          </Link>
          <Link
            href="/analyse-produits/bnp-comfort-equity"
            className="flex w-full items-center justify-center rounded-2xl border border-[var(--forest)]/20 bg-white px-8 py-4 text-center font-bold text-[var(--forest)] transition-colors hover:bg-[var(--sage-pale)]/20"
          >
            {t('cta_bnp')}
          </Link>
          <div className="text-center">
            <Link
              href="/analyse-produits"
              className="text-sm text-[var(--charcoal)]/40 transition-colors hover:text-[var(--charcoal)]"
            >
              {t('cta_back')}
            </Link>
          </div>
        </div>

        <LastUpdated isoDate="2026-04-30" />

        <p className="mt-8 text-center text-xs italic leading-relaxed text-[var(--charcoal)]/30">
          {t('disclaimer')}
        </p>

      </div>
    </>
  );
}
