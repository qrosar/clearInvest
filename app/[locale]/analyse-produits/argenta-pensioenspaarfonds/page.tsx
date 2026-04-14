import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import LastUpdated from '@/components/ui/LastUpdated';
import PensionFeeChart from '@/components/analyse-produits/PensionFeeChart';

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params;
  const titles = {
    fr: 'Argenta Pensioenspaarfonds analyse — ARPE vs ETF Monde sur 30 ans',
    nl: 'Argenta Pensioenspaarfonds analyse — ARPE vs wereld-ETF over 30 jaar',
    en: 'Argenta Pensioenspaarfonds Review — ARPE vs World ETF over 30 years'
  }
  const descriptions = {
    fr: 'Argenta ARPE est-il le meilleur fonds d\'épargne-pension ? Analyse des frais réels, fiscalité et comparaison avec un ETF Monde sur 30 ans.',
    nl: 'Is Argenta ARPE het beste pensioenspaarfonds? Analyse van echte kosten, fiscaliteit en vergelijking met een wereld-ETF over 30 jaar.',
    en: 'Is Argenta ARPE the best pension savings fund? Analysis of real costs, taxation, and comparison with a World ETF over 30 years.'
  }
  return {
    title: titles[locale as keyof typeof titles] ?? titles.fr,
    description: descriptions[locale as keyof typeof descriptions] ?? descriptions.fr,
    alternates: {
      canonical: `https://clearinvest.be/${locale}/analyse-produits/argenta-pensioenspaarfonds`,
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

function AdvantageBox({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mt-6 rounded-xl border border-[var(--forest)]/20 bg-[var(--sage-pale)]/40 px-5 py-4">
      <p className="mb-2 text-xs font-bold uppercase tracking-widest text-[var(--forest)]/70">{label}</p>
      <p className="text-sm leading-relaxed text-[var(--charcoal)]/75">{children}</p>
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

export default async function ArgentaAnalysisPage() {
  const t = await getTranslations('analyseArgenta');

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

        {/* Intro */}
        <Body>{t('intro_p1')}</Body>
        <Body>{t('intro_p2')}</Body>

        <Divider />

        {/* Section 1: Fiche produit */}
        <section>
          <SectionHeading>{t('s1_title')}</SectionHeading>
          <div className="mt-8 rounded-2xl border border-[var(--warm-tan)]/50 bg-[var(--warm-white)] p-6">
            <InfoRow label={t('s1_label_product')} value={t('s1_val_product')} />
            <InfoRow label={t('s1_label_type')} value={t('s1_val_type')} />
            <InfoRow label={t('s1_label_manager')} value={t('s1_val_manager')} />
            <InfoRow label={t('s1_label_cap')} value={t('s1_val_cap')} />
            <InfoRow label={t('s1_label_entry')} value={t('s1_val_entry')} />
            <InfoRow label={t('s1_label_ter')} value={t('s1_val_ter')} />
            <InfoRow label={t('s1_label_return')} value={t('s1_val_return')} />
            <InfoRow label={t('s1_label_availability')} value={t('s1_val_availability')} />
            <InfoRow label={t('s1_label_exit_tax')} value={t('s1_val_exit_tax')} />
          </div>
        </section>

        <Divider />

        {/* Section 2: L'anatomie des frais */}
        <section>
          <SectionHeading>{t('s2_title')}</SectionHeading>
          <Body>{t('s2_p1')}</Body>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-[var(--warm-tan)]/50 bg-[var(--warm-white)] p-6">
              <p className="font-heading text-lg font-bold text-[var(--charcoal)]">{t('s2_entry_title')}</p>
              <p className="mt-2 text-sm leading-relaxed text-[var(--charcoal)]/60">{t('s2_entry_desc')}</p>
            </div>
            <div className="rounded-2xl border border-[var(--warm-tan)]/50 bg-[var(--warm-white)] p-6">
              <p className="font-heading text-lg font-bold text-[var(--charcoal)]">{t('s2_ter_title')}</p>
              <p className="mt-2 text-sm leading-relaxed text-[var(--charcoal)]/60">{t('s2_ter_desc')}</p>
            </div>
          </div>

          <Body>{t('s2_effect_desc')}</Body>

          <WarningBox>{t('s2_warning')}</WarningBox>
        </section>

        <Divider />

        {/* Section 3: La fiscalité réelle */}
        <section>
          <SectionHeading>{t('s3_title')}</SectionHeading>
          <Body>{t('s3_p1')}</Body>
          <Body>{t('s3_p2')}</Body>
          <Body>{t('s3_p3')}</Body>

          <div className="mt-8 rounded-2xl bg-slate-50 p-6 text-slate-800 border border-slate-200">
            <p className="font-bold text-sm uppercase tracking-wide opacity-60">{t('s3_example_title')}</p>
            <ul className="mt-4 space-y-2 text-sm">
              <li>• {t('s3_example_p1')}</li>
              <li>• {t('s3_example_p2')}</li>
              <li>• {t('s3_example_p3')}</li>
              <li>• {t('s3_example_p4')}</li>
              <li className="mt-2 pt-2 border-t border-slate-200 font-bold text-base">{t('s3_example_p5')}</li>
            </ul>
          </div>

          <Body>{t('s3_p4')}</Body>

          <AdvantageBox label={t('s3_etf_flex_label')}>{t('s3_etf_flex_text')}</AdvantageBox>
        </section>

        <Divider />

        {/* Section 4: Match 30 ans */}
        <section>
          <SectionHeading>{t('s4_title')}</SectionHeading>
          <Body>{t('s4_intro')}</Body>

          {/* Table */}
          <div className="mt-8 overflow-hidden rounded-2xl border border-[var(--warm-tan)]/50">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="bg-[var(--warm-tan)]/10">
                  <th className="px-4 py-3 font-semibold text-[var(--charcoal)]/40"></th>
                  <th className="px-4 py-3 font-bold text-[var(--charcoal)]">{t('s4_col_argenta')}</th>
                  <th className="px-4 py-3 font-bold text-[var(--forest)]">{t('s4_col_etf')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--warm-tan)]/20">
                <tr>
                  <td className="px-4 py-3 text-[var(--charcoal)]/60">{t('s4_row_entry')}</td>
                  <td className="px-4 py-3 font-medium text-green-600">0,00%</td>
                  <td className="px-4 py-3 font-medium text-green-600">0%</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-[var(--charcoal)]/60">{t('s4_row_ter')}</td>
                  <td className="px-4 py-3 font-medium text-red-600">~1,44%</td>
                  <td className="px-4 py-3 font-medium text-green-600">0,17%</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-[var(--charcoal)]/60">{t('s4_row_return')}</td>
                  <td className="px-4 py-3 font-medium text-[var(--charcoal)]">{t('s4_val_argenta_return')}</td>
                  <td className="px-4 py-3 font-medium text-[var(--charcoal)]">{t('s4_val_etf_return')}</td>
                </tr>
                <tr className="bg-[var(--warm-white)]/50">
                  <td className="px-4 py-3 text-[var(--charcoal)]/60">{t('s4_row_gross')}</td>
                  <td className="px-4 py-3 font-medium text-[var(--charcoal)]">{t('s4_val_argenta_gross')}</td>
                  <td className="px-4 py-3 font-medium text-[var(--charcoal)]">{t('s4_val_etf_gross')}</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-[var(--charcoal)]/60">{t('s4_row_exit_tax')}</td>
                  <td className="px-4 py-3 font-medium text-red-600">{t('s4_val_argenta_exit')}</td>
                  <td className="px-4 py-3 font-medium text-[var(--charcoal)]">—</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-[var(--charcoal)]/60">{t('s4_row_tob')}</td>
                  <td className="px-4 py-3 font-medium text-[var(--charcoal)]">—</td>
                  <td className="px-4 py-3 font-medium text-red-600">{t('s4_val_etf_tob')}</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-[var(--charcoal)]/60">{t('s4_row_cgt')}</td>
                  <td className="px-4 py-3 font-medium text-[var(--charcoal)]">—</td>
                  <td className="px-4 py-3 font-medium text-red-600">{t('s4_val_etf_cgt')}</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-[var(--charcoal)]/60">{t('s4_row_tax_benefit')}</td>
                  <td className="px-4 py-3 font-medium text-green-600">+9 450 €</td>
                  <td className="px-4 py-3 font-medium text-[var(--charcoal)]">0 €</td>
                </tr>
                <tr className="border-t-2 border-[var(--warm-tan)]/40 bg-[var(--sage-pale)]/30">
                  <td className="px-4 py-4 font-bold text-[var(--charcoal)]">{t('s4_row_final_net')}</td>
                  <td className="px-4 py-4 font-bold text-[var(--charcoal)]">{t('s4_val_argenta_final')}</td>
                  <td className="px-4 py-4 font-bold text-[var(--forest)]">{t('s4_val_etf_final')}</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-bold text-[var(--charcoal)]">{t('s4_row_net_gain')}</td>
                  <td className="px-4 py-3 font-bold text-[var(--forest)]">{t('s4_val_argenta_gain')}</td>
                  <td className="px-4 py-3 font-bold text-[var(--forest)]">{t('s4_val_etf_gain')}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-6 rounded-xl bg-[var(--sage-pale)]/20 p-4 text-center">
            <p className="text-sm font-bold text-[var(--forest)]">
              {t('s4_key_callout')}
            </p>
          </div>

          <PensionFeeChart namespace="analyseArgenta" grossReturn={0.045} ter={0.0144} />

          <p className="mt-6 text-sm italic leading-relaxed text-[var(--charcoal)]/45">
            {t('s4_methodology_note')}
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

        {/* Section: La Stratégie Hybride */}
        <section>
          <SectionHeading>{t('s_hybrid_title')}</SectionHeading>
          <Body>{t('s_hybrid_intro')}</Body>

          <h3 className="mt-8 font-heading text-xl font-bold text-[var(--charcoal)]">{t('s_hybrid_verdict_title')}</h3>
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="rounded-2xl border border-[var(--warm-tan)]/30 bg-[var(--warm-white)] p-6">
              <p className="text-xs font-bold uppercase tracking-widest text-[var(--charcoal)]/40">{t('s_hybrid_option_a_name')}</p>
              <p className="mt-2 text-2xl font-bold text-[var(--charcoal)]">{t('s_hybrid_option_a_val')}</p>
            </div>
            <div className="rounded-2xl border border-[var(--forest)]/20 bg-[var(--sage-pale)]/30 p-6">
              <p className="text-xs font-bold uppercase tracking-widest text-[var(--forest)]/60">{t('s_hybrid_option_b_name')}</p>
              <p className="mt-2 text-2xl font-bold text-[var(--forest)]">{t('s_hybrid_option_b_val')}</p>
            </div>
          </div>
          <p className="mt-4 text-center text-sm font-semibold text-[var(--forest)]">{t('s_hybrid_gap_note')}</p>

          <Divider />

          <h3 className="font-heading text-xl font-bold text-[var(--charcoal)]">{t('s_hybrid_why_title')}</h3>
          <Body>{t('s_hybrid_why_p')}</Body>

          <div className="mt-8 overflow-hidden rounded-2xl border border-[var(--warm-tan)]/50 bg-[var(--warm-white)]">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="bg-[var(--warm-tan)]/10 text-[var(--charcoal)]/50">
                  <th className="px-4 py-3 font-semibold">{t('s_hybrid_table_year')}</th>
                  <th className="px-4 py-3 font-semibold">{t('s_hybrid_table_advantage')}</th>
                  <th className="px-4 py-3 font-semibold">{t('s_hybrid_table_bonus')}</th>
                  <th className="px-4 py-3 font-semibold">{t('s_hybrid_table_diff')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--warm-tan)]/20 tabular-nums">
                <tr>
                  <td className="px-4 py-3 text-[var(--charcoal)]/60">1</td>
                  <td className="px-4 py-3 font-medium text-red-600">{t('s_hybrid_row_y1_adv')}</td>
                  <td className="px-4 py-3 font-medium text-green-600">315 €</td>
                  <td className="px-4 py-3 font-bold text-green-700">{t('s_hybrid_row_y1_diff')}</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-[var(--charcoal)]/60">5</td>
                  <td className="px-4 py-3 font-medium text-red-600">{t('s_hybrid_row_y5_adv')}</td>
                  <td className="px-4 py-3 font-medium text-green-600">315 €</td>
                  <td className="px-4 py-3 font-bold text-green-700">{t('s_hybrid_row_y5_diff')}</td>
                </tr>
                <tr className="bg-amber-50/50">
                  <td className="px-4 py-3 text-[var(--charcoal)]/60">8</td>
                  <td className="px-4 py-3 font-medium text-red-600">{t('s_hybrid_row_y8_adv')}</td>
                  <td className="px-4 py-3 font-medium text-green-600">315 €</td>
                  <td className="px-4 py-3 font-bold text-amber-700 flex items-center gap-2">
                    {t('s_hybrid_row_y8_diff')}
                    <span className="hidden text-[10px] font-normal uppercase tracking-tighter sm:inline">← {t('s_hybrid_crossover_label')}</span>
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-[var(--charcoal)]/60">10</td>
                  <td className="px-4 py-3 font-medium text-red-600">{t('s_hybrid_row_y10_adv')}</td>
                  <td className="px-4 py-3 font-medium text-green-600">315 €</td>
                  <td className="px-4 py-3 font-bold text-red-700">{t('s_hybrid_row_y10_diff')}</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-[var(--charcoal)]/60">15</td>
                  <td className="px-4 py-3 font-medium text-red-600">{t('s_hybrid_row_y15_adv')}</td>
                  <td className="px-4 py-3 font-medium text-green-600">315 €</td>
                  <td className="px-4 py-3 font-bold text-red-700">{t('s_hybrid_row_y15_diff')}</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-[var(--charcoal)]/60">20</td>
                  <td className="px-4 py-3 font-medium text-red-600">{t('s_hybrid_row_y20_adv')}</td>
                  <td className="px-4 py-3 font-medium text-green-600">315 €</td>
                  <td className="px-4 py-3 font-bold text-red-700">{t('s_hybrid_row_y20_diff')}</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-[var(--charcoal)]/60">30</td>
                  <td className="px-4 py-3 font-medium text-red-600">{t('s_hybrid_row_y30_adv')}</td>
                  <td className="px-4 py-3 font-medium text-green-600">315 €</td>
                  <td className="px-4 py-3 font-bold text-red-700">{t('s_hybrid_row_y30_diff')}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <AdvantageBox label={t('s_hybrid_horizon_title')}>{t('s_hybrid_horizon_desc')}</AdvantageBox>

          <div className="mt-8 border-l-4 border-[var(--forest)]/30 py-2 pl-6 italic">
            <p className="text-lg leading-relaxed text-[var(--charcoal)]/80">
              {t('s_hybrid_conclusion')}
            </p>
          </div>
        </section>

        <Divider />

        {/* Impasse section */}
        <section>
          <Body>{t('s5_intro')}</Body>
          <ul className="mt-6 space-y-4">
            {[t('s5_point1'), t('s5_point2'), t('s5_point3')].map((point, i) => (
              <li key={i} className="flex gap-3 text-base leading-relaxed text-[var(--charcoal)]/75">
                <span className="flex-shrink-0 text-[var(--charcoal)]/30">—</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
          <Body>{t('s5_outro')}</Body>
          <div className="mt-6">
            <Link href="/calculateur" className="text-[var(--forest)] font-semibold hover:underline">
              {t('s5_link')}
            </Link>
          </div>
        </section>

        <Divider />

        {/* Verdict */}
        <section className="rounded-3xl bg-[var(--forest-deep)] p-8 text-white md:p-12">
          <h2 className="font-heading text-2xl font-bold md:text-3xl">
            {t('s5_title')}
          </h2>
          <div className="mt-6 space-y-4 opacity-90 text-base leading-relaxed">
            <p>{t('s5_verdict_p1')}</p>
            <p>{t('s5_verdict_p2')}</p>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <p className="font-bold text-sm uppercase tracking-wide text-white/50">{t('s5_ideal_title')}</p>
              <p className="mt-2 text-sm leading-relaxed">{t('s5_ideal_desc')}</p>
            </div>
            <div>
              <p className="font-bold text-sm uppercase tracking-wide text-white/50">{t('s5_avoid_title')}</p>
              <p className="mt-2 text-sm leading-relaxed">{t('s5_avoid_desc')}</p>
            </div>
          </div>
        </section>

        <Divider />

        {/* Action steps */}
        <section>
          <SectionHeading>{t('s6_title')}</SectionHeading>
          <div className="mt-8 space-y-6">
            <NumberedPoint n={1} heading={t('s6_step1_heading')}>
              {t('s6_step1_desc')}
            </NumberedPoint>
            <NumberedPoint n={2} heading={t('s6_step2_heading')}>
              {t('s6_step2_desc')}
            </NumberedPoint>
          </div>
          <NeutralCallout>{t('s6_summary')}</NeutralCallout>
        </section>

        {/* CTA Area */}
        <section className="mt-16 rounded-3xl border border-[var(--warm-tan)]/50 bg-[var(--warm-cream)] px-6 py-10 text-center md:px-12 md:py-14">
          <div className="flex flex-col items-center gap-4">
            <Link
              href="/calculateur"
              className="w-full rounded-xl bg-[var(--forest)] py-4 text-center text-sm font-bold text-white transition-opacity hover:opacity-90 sm:w-auto sm:px-10"
            >
              {t('cta_primary')}
            </Link>
            <Link
              href="/comprendre/produits-bancaires"
              className="text-sm font-semibold text-[var(--forest)] hover:underline"
            >
              {t('cta_secondary')}
            </Link>
          </div>
        </section>

        <LastUpdated isoDate="2026-04-08" />

        {/* Back link */}
        <div className="mt-10 text-center">
          <Link
            href="/analyse-produits"
            className="text-sm text-[var(--charcoal)]/40 transition-colors hover:text-[var(--charcoal)]"
          >
            {t('cta_tertiary')}
          </Link>
        </div>

      </div>
    </>
  );
}
