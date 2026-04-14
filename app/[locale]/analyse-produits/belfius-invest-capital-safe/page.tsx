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
    fr: "Belfius Invest Capital Safe analyse \u2014 4,5\u00a0% de frais pour un rendement de 2,8\u00a0%",
    nl: "Belfius Invest Capital Safe analyse \u2014 4,5\u00a0% kosten voor 2,8\u00a0% rendement",
    en: "Belfius Invest Capital Safe Review \u2014 4.5% Entry Costs for a 2.8% Return"
  }
  const descriptions = {
    fr: "Analyse compl\u00e8te de Belfius Invest Capital Safe (Branche 21, Belfius Insurance). 4,5\u00a0% de friction \u00e0 l\u2019entr\u00e9e, 20\u00a0mois pour retrouver sa mise. L\u2019\u00e9cart avec un ETF Monde d\u00e9passe 220\u00a0000\u00a0\u20ac m\u00eame apr\u00e8s cr\u00e9dit de l\u2019exon\u00e9ration CGT.",
    nl: "Volledige analyse van Belfius Invest Capital Safe (Tak 21, Belfius Insurance). 4,5\u00a0% instapwrijving, 20\u00a0maanden om de kosten terug te verdienen. Het verschil met een wereld-ETF bedraagt meer dan 220\u00a0000\u00a0\u20ac, zelfs na aftrek van de CGT-vrijstelling.",
    en: "Full review of Belfius Invest Capital Safe (Branch 21, Belfius Insurance). 4.5% entry friction, 20 months to recover costs. The gap with a World ETF exceeds \u20ac220,000 even after full credit for the CGT exemption."
  }
  return {
    title: titles[locale as keyof typeof titles] ?? titles.fr,
    description: descriptions[locale as keyof typeof descriptions] ?? descriptions.fr,
    alternates: {
      canonical: `https://clearinvest.be/${locale}/analyse-produits/belfius-invest-capital-safe`,
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

function InfoRow({ label, value, valueClassName }: { label: string; value: string; valueClassName?: string }) {
  return (
    <div className="flex justify-between gap-4 border-b border-[var(--warm-tan)]/20 py-3 last:border-0">
      <span className="text-sm font-medium text-[var(--charcoal)]/50">{label}</span>
      <span className={`text-right text-sm font-bold ${valueClassName ?? 'text-[var(--charcoal)]'}`}>{value}</span>
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

function LabelledCallout({
  label,
  children,
  variant,
}: {
  label: string;
  children: React.ReactNode;
  variant: 'amber' | 'sage';
}) {
  const styles =
    variant === 'amber'
      ? { wrap: 'border-amber-200 bg-amber-50', label: 'text-amber-600', body: 'text-amber-800' }
      : { wrap: 'border-[var(--forest)]/20 bg-[var(--sage-pale)]/40', label: 'text-[var(--forest)]/70', body: 'text-[var(--charcoal)]/75' };
  return (
    <div className={`mt-6 rounded-xl border px-5 py-4 ${styles.wrap}`}>
      <p className={`mb-2 text-xs font-bold uppercase tracking-widest ${styles.label}`}>{label}</p>
      <p className={`text-sm leading-relaxed ${styles.body}`}>{children}</p>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default async function BelfiusCapitalSafeAnalysisPage() {
  const t = await getTranslations('analyseBelfiusCapitalSafe');

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

        <Divider />

        {/* Section 1: Fiche produit */}
        <section>
          <SectionHeading>{t('s1_title')}</SectionHeading>

          <div className="mt-8 rounded-2xl border border-[var(--warm-tan)]/50 bg-[var(--warm-white)] p-6">
            <InfoRow label={t('s1_label_product')} value={t('s1_val_product')} />
            <InfoRow label={t('s1_label_type')} value={t('s1_val_type')} />
            <InfoRow label={t('s1_label_insurer')} value={t('s1_val_insurer')} />
            <InfoRow label={t('s1_label_rate')} value={t('s1_val_rate')} />
            <InfoRow label={t('s1_label_premium_tax')} value={t('s1_val_premium_tax')} valueClassName="text-red-600" />
            <InfoRow label={t('s1_label_entry')} value={t('s1_val_entry')} valueClassName="text-red-600" />
            <InfoRow label={t('s1_label_total_friction')} value={t('s1_val_total_friction')} valueClassName="text-red-600" />
            <InfoRow label={t('s1_label_annual_fees')} value={t('s1_val_annual_fees')} />
            <InfoRow label={t('s1_label_net_return')} value={t('s1_val_net_return')} />
            <InfoRow label={t('s1_label_liquidity')} value={t('s1_val_liquidity')} />
            <InfoRow label={t('s1_label_cgt')} value={t('s1_val_cgt')} valueClassName="text-[var(--forest)]" />
            <InfoRow label={t('s1_label_pm')} value={t('s1_val_pm')} valueClassName="text-[var(--forest)]" />
          </div>

          <p className="mt-3 text-xs italic leading-relaxed text-[var(--charcoal)]/40">
            {t('s1_source')}
          </p>
        </section>

        <Divider />

        {/* Section 2: Les frais */}
        <section>
          <SectionHeading>{t('s2_title')}</SectionHeading>
          <Body>{t('s2_p1')}</Body>
          <Body>{t('s2_p2')}</Body>
          <Body>{t('s2_p3')}</Body>
          <Body>{t('s2_p4')}</Body>
          <NeutralCallout>{t('s2_recovery_callout')}</NeutralCallout>
          <NeutralCallout>{t('s2_comparison_note')}</NeutralCallout>
          <WarningBox>{t('s2_warning')}</WarningBox>
          <WarningBox>{t('s2_exit_fees_warning')}</WarningBox>
        </section>

        <Divider />

        {/* Section 3: Avantages fiscaux */}
        <section>
          <SectionHeading>{t('s3_title')}</SectionHeading>

          {/* Point A — Précompte mobilier */}
          <h3 className="mt-8 font-heading text-xl font-bold text-[var(--charcoal)]">
            {t('s3_point_a_title')}
          </h3>
          <Body>{t('s3_point_a_p1')}</Body>
          <Body>{t('s3_point_a_p2')}</Body>
          <LabelledCallout variant="amber" label={t('s3_callout_a_label')}>
            {t('s3_callout_a')}
          </LabelledCallout>

          {/* Point B — CGT */}
          <h3 className="mt-10 font-heading text-xl font-bold text-[var(--charcoal)]">
            {t('s3_point_b_title')}
          </h3>
          <Body>{t('s3_point_b_p1')}</Body>
          <Body>{t('s3_point_b_p2')}</Body>
          <LabelledCallout variant="sage" label={t('s3_callout_b_label')}>
            {t('s3_callout_b')}
          </LabelledCallout>
        </section>

        <Divider />

        {/* Section 4: Horizon 9 ans */}
        <section>
          <SectionHeading>{t('s4_title')}</SectionHeading>
          <Body>{t('s4_intro')}</Body>

          <div className="mt-8 overflow-hidden rounded-2xl border border-[var(--warm-tan)]/50">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="bg-[var(--warm-tan)]/10">
                  <th className="px-3 py-3 font-semibold text-[var(--charcoal)]/40"></th>
                  <th className="px-3 py-3 font-bold text-[var(--charcoal)]">{t('s4_table_col1')}</th>
                  <th className="px-3 py-3 font-bold text-[var(--forest)]">{t('s4_table_col2')}</th>
                  <th className="px-3 py-3 font-bold text-blue-700">{t('s4_table_col3')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--warm-tan)]/20">
                <tr>
                  <td className="px-3 py-3 text-[var(--charcoal)]/60">{t('s4_table_row1')}</td>
                  <td className="px-3 py-3 font-medium text-red-600">{t('s4_table_row1_val1')}</td>
                  <td className="px-3 py-3 font-medium text-green-600">{t('s4_table_row1_val2')}</td>
                  <td className="px-3 py-3 font-medium text-green-600">{t('s4_table_row1_val3')}</td>
                </tr>
                <tr>
                  <td className="px-3 py-3 text-[var(--charcoal)]/60">{t('s4_table_row2')}</td>
                  <td className="px-3 py-3 font-medium text-[var(--charcoal)]">{t('s4_table_row2_val1')}</td>
                  <td className="px-3 py-3 font-medium text-green-600">{t('s4_table_row2_val2')}</td>
                  <td className="px-3 py-3 font-medium text-green-600">{t('s4_table_row2_val3')}</td>
                </tr>
                <tr>
                  <td className="px-3 py-3 text-[var(--charcoal)]/60">{t('s4_table_row3')}</td>
                  <td className="px-3 py-3 font-medium text-[var(--charcoal)]">{t('s4_table_row3_val1')}</td>
                  <td className="px-3 py-3 font-medium text-[var(--forest)]">{t('s4_table_row3_val2')}</td>
                  <td className="px-3 py-3 font-medium text-[var(--charcoal)]">{t('s4_table_row3_val3')}</td>
                </tr>
                <tr className="border-t-2 border-[var(--warm-tan)]/40 bg-[var(--sage-pale)]/30">
                  <td className="px-3 py-4 font-bold text-[var(--charcoal)]">{t('s4_table_row4')}</td>
                  <td className="px-3 py-4 font-bold text-[var(--charcoal)]">{t('s4_table_row4_val1')}</td>
                  <td className="px-3 py-4 font-bold text-[var(--forest)]">{t('s4_table_row4_val2')}</td>
                  <td className="px-3 py-4 font-bold text-green-700">{t('s4_table_row4_val3')}</td>
                </tr>
                <tr>
                  <td className="px-3 py-3 text-[var(--charcoal)]/60">{t('s4_table_row5')}</td>
                  <td className="px-3 py-3 font-medium text-red-600">{t('s4_table_row5_val1')}</td>
                  <td className="px-3 py-3 font-medium text-green-600">{t('s4_table_row5_val2')}</td>
                  <td className="px-3 py-3 font-medium text-green-600">{t('s4_table_row5_val3')}</td>
                </tr>
                <tr>
                  <td className="px-3 py-3 text-[var(--charcoal)]/60">{t('s4_table_row6')}</td>
                  <td className="px-3 py-3 font-medium text-green-600">{t('s4_table_row6_val1')}</td>
                  <td className="px-3 py-3 font-medium text-red-600">{t('s4_table_row6_val2')}</td>
                  <td className="px-3 py-3 font-medium text-green-600">{t('s4_table_row6_val3')}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-6 rounded-xl bg-[var(--sage-pale)]/20 p-4 text-center">
            <p className="text-sm font-bold text-[var(--forest)]">{t('s4_callout')}</p>
          </div>

          <div className="mt-6 rounded-xl bg-[var(--warm-tan)]/10 p-5">
            <p className="text-sm font-semibold italic text-[var(--charcoal)]/70">{t('s4_bridge')}</p>
          </div>

          <p className="mt-6 text-sm italic leading-relaxed text-[var(--charcoal)]/45">
            {t('s4_methodology_note')}
          </p>

          <div className="mt-8 rounded-2xl bg-[var(--forest)] p-6 text-white sm:p-8">
            <p className="text-base leading-relaxed opacity-90">{t('s4_cta_text')}</p>
            <Link
              href="/calculateur"
              className="mt-6 inline-flex items-center rounded-xl bg-white px-6 py-3 text-sm font-bold text-[var(--forest)] transition-transform hover:scale-[1.02]"
            >
              {t('s4_cta_btn')}
            </Link>
          </div>
        </section>

        <Divider />

        {/* Section 5: Horizon 30 ans */}
        <section>
          <SectionHeading>{t('s5_title')}</SectionHeading>
          <Body>{t('s5_p1')}</Body>

          <div className="mt-8 overflow-hidden rounded-2xl border border-[var(--warm-tan)]/50">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="bg-[var(--warm-tan)]/10">
                  <th className="px-4 py-3 font-semibold text-[var(--charcoal)]/40"></th>
                  <th className="px-4 py-3 font-bold text-[var(--charcoal)]">{t('s5_table_col1')}</th>
                  <th className="px-4 py-3 font-bold text-[var(--forest)]">{t('s5_table_col2')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--warm-tan)]/20">
                <tr>
                  <td className="px-4 py-3 text-[var(--charcoal)]/60">{t('s5_table_row1')}</td>
                  <td className="px-4 py-3 font-medium text-red-600">{t('s5_table_row1_val1')}</td>
                  <td className="px-4 py-3 font-medium text-green-600">{t('s5_table_row1_val2')}</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-[var(--charcoal)]/60">{t('s5_table_row2')}</td>
                  <td className="px-4 py-3 font-medium text-[var(--charcoal)]">{t('s5_table_row2_val1')}</td>
                  <td className="px-4 py-3 font-medium text-[var(--forest)]">{t('s5_table_row2_val2')}</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-[var(--charcoal)]/60">{t('s5_table_row3')}</td>
                  <td className="px-4 py-3 font-medium text-[var(--charcoal)]">{t('s5_table_row3_val1')}</td>
                  <td className="px-4 py-3 font-medium text-[var(--forest)]">{t('s5_table_row3_val2')}</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-[var(--charcoal)]/60">{t('s5_table_row4')}</td>
                  <td className="px-4 py-3 font-medium text-green-600">{t('s5_table_row4_val1')}</td>
                  <td className="px-4 py-3 font-medium text-red-600">{t('s5_table_row4_val2')}</td>
                </tr>
                <tr className="border-t-2 border-[var(--warm-tan)]/40 bg-[var(--sage-pale)]/30">
                  <td className="px-4 py-4 font-bold text-[var(--charcoal)]">{t('s5_table_row5')}</td>
                  <td className="px-4 py-4 font-bold text-[var(--charcoal)]">{t('s5_table_row5_val1')}</td>
                  <td className="px-4 py-4 font-bold text-[var(--forest)]">{t('s5_table_row5_val2')}</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-bold text-[var(--charcoal)]">{t('s5_table_row6')}</td>
                  <td className="px-4 py-3 font-bold text-[var(--charcoal)]/60">{t('s5_table_row6_val1')}</td>
                  <td className="px-4 py-3 font-bold text-[var(--forest)]">{t('s5_table_row6_val2')}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-6 rounded-xl bg-[var(--sage-pale)]/20 p-4 text-center">
            <p className="text-sm font-bold text-[var(--forest)]">{t('s5_callout')}</p>
          </div>

          <p className="mt-6 text-sm italic leading-relaxed text-[var(--charcoal)]/45">
            {t('s5_methodology')}
          </p>

          <p className="mt-6 text-sm leading-relaxed text-[var(--charcoal)]/55">
            {t('s5_xref')}{' '}
            <Link
              href="/analyse-produits/ethias-savings-21"
              className="font-semibold text-[var(--forest)] hover:underline"
            >
              {t('s5_xref_link')}
            </Link>
          </p>
        </section>

        <Divider />

        {/* Section 6: Verdict */}
        <section className="rounded-3xl bg-[var(--forest-deep)] p-8 text-white md:p-12">
          <h2 className="font-heading text-2xl font-bold md:text-3xl">
            {t('s6_title')}
          </h2>
          <ul className="mt-8 space-y-6">
            {[
              t('s6_verdict_1'),
              t('s6_verdict_2'),
              t('s6_verdict_3'),
              t('s6_verdict_4'),
            ].map((verdict, i) => (
              <li key={i} className="flex gap-4">
                <span className="flex-shrink-0 text-white/30">—</span>
                <p className="text-base leading-relaxed opacity-90">{verdict}</p>
              </li>
            ))}
            <li className="mt-8 border-t border-white/10 pt-8">
              <p className="text-lg font-bold leading-relaxed">{t('s6_verdict_5')}</p>
            </li>
          </ul>

          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <p className="text-sm font-bold uppercase tracking-wide text-white/50">{t('s6_case_legit_title')}</p>
              <p className="mt-2 text-sm leading-relaxed">{t('s6_case_legit_desc')}</p>
            </div>
            <div>
              <p className="text-sm font-bold uppercase tracking-wide text-white/50">{t('s6_avoid_title')}</p>
              <p className="mt-2 text-sm leading-relaxed">{t('s6_avoid_desc')}</p>
            </div>
          </div>
        </section>

        <div className="mt-12 space-y-4">
          <Link
            href="/calculateur"
            className="flex w-full items-center justify-center rounded-2xl bg-[var(--forest)] px-8 py-4 text-center font-bold text-white transition-transform hover:scale-[1.01] active:scale-[0.99]"
          >
            {t('cta_primary')}
          </Link>
          <Link
            href="/analyse-produits/ag-safe-plus"
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

        <LastUpdated isoDate="2026-04-13" />

        <p className="mt-8 text-center text-xs italic leading-relaxed text-[var(--charcoal)]/30">
          {t('disclaimer')}
        </p>

      </div>
    </>
  );
}
