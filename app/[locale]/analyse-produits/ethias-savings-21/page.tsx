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
    fr: 'Ethias Savings 21+ analyse — Pourquoi la garantie vous coûte cher',
    nl: 'Ethias Savings 21+ analyse — Waarom de garantie u duur komt te staan',
    en: 'Ethias Savings 21+ Review — Why the Guarantee Costs You Dearly'
  }
  const descriptions = {
    fr: 'Analyse complète d\'Ethias Savings 21+. La taxe sur prime de 2% sur chaque versement détruit le rendement réel. XEON offre mieux pour un horizon court, un ETF Monde 3x mieux sur le long terme.',
    nl: 'Volledige analyse van Ethias Savings 21+. De premietaks van 2% op elke storting vernietigt het werkelijk rendement. XEON biedt beter voor een korte horizon, een wereld-ETF 3x beter op lange termijn.',
    en: 'Full analysis of Ethias Savings 21+. The 2% premium tax on every payment destroys the real return. XEON does better for a short horizon, a World ETF nearly 3x better long-term.'
  }
  return {
    title: titles[locale as keyof typeof titles] ?? titles.fr,
    description: descriptions[locale as keyof typeof descriptions] ?? descriptions.fr,
    alternates: {
      canonical: `https://clearinvest.be/${locale}/analyse-produits/ethias-savings-21`,
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

// ── Page ──────────────────────────────────────────────────────────────────────

export default async function EthiasAnalysisPage() {
  const t = await getTranslations('ethiasAnalysis');

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

        {/* Section 1: Le Problème Structurel */}
        <section>
          <SectionHeading>{t('s1_title')}</SectionHeading>
          <Body>{t('s1_p1')}</Body>
          <Body>{t('s1_p2')}</Body>
          <Body>{t('s1_p3')}</Body>

          <div className="mt-8 rounded-2xl border border-[var(--warm-tan)]/50 bg-[var(--warm-white)] p-6">
            <p className="mb-2 text-xs font-bold uppercase tracking-widest text-[var(--charcoal)]/40">
              {t('s1_sheet_title')}
            </p>
            <InfoRow label={t('s1_label_product')} value={t('s1_val_product')} />
            <InfoRow label={t('s1_label_type')} value={t('s1_val_type')} />
            <InfoRow label={t('s1_label_insurer')} value={t('s1_val_insurer')} />
            <InfoRow label={t('s1_label_rate')} value={t('s1_val_rate')} />
            <InfoRow label={t('s1_label_tax')} value={t('s1_val_tax')} valueClassName="text-red-600" />
            <InfoRow label={t('s1_label_net_rate')} value={t('s1_val_net_rate')} />
            <InfoRow label={t('s1_label_duration')} value={t('s1_val_duration')} />
            <InfoRow label={t('s1_label_min')} value={t('s1_val_min')} />
            <InfoRow label={t('s1_label_final')} value={t('s1_val_final')} valueClassName="text-[var(--forest)]" />
          </div>

          <WarningBox>{t('s1_warning')}</WarningBox>
        </section>

        <Divider />

        {/* Section 2: Court terme — XEON */}
        <section>
          <SectionHeading>{t('s2_title')}</SectionHeading>
          <Body>{t('s2_intro')}</Body>

          <div className="mt-8 overflow-hidden rounded-2xl border border-[var(--warm-tan)]/50">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="bg-[var(--warm-tan)]/10">
                  <th className="px-3 py-3 font-semibold text-[var(--charcoal)]/40"></th>
                  <th className="px-3 py-3 font-bold text-[var(--charcoal)]">{t('s2_table_col1')}</th>
                  <th className="px-3 py-3 font-bold text-[var(--forest)]">{t('s2_table_col2')}</th>
                  <th className="px-3 py-3 font-bold text-blue-700">{t('s2_table_col3')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--warm-tan)]/20">
                <tr>
                  <td className="px-3 py-3 text-[var(--charcoal)]/60">{t('s2_table_row1')}</td>
                  <td className="px-3 py-3 font-medium text-red-600">{t('s2_table_row1_val1')}</td>
                  <td className="px-3 py-3 font-medium text-green-600">{t('s2_table_row1_val2')}</td>
                  <td className="px-3 py-3 font-medium text-green-600">{t('s2_table_row1_val3')}</td>
                </tr>
                <tr>
                  <td className="px-3 py-3 text-[var(--charcoal)]/60">{t('s2_table_row2')}</td>
                  <td className="px-3 py-3 font-medium text-[var(--charcoal)]">{t('s2_table_row2_val1')}</td>
                  <td className="px-3 py-3 font-medium text-green-600">{t('s2_table_row2_val2')}</td>
                  <td className="px-3 py-3 font-medium text-green-600">{t('s2_table_row2_val3')}</td>
                </tr>
                <tr>
                  <td className="px-3 py-3 text-[var(--charcoal)]/60">{t('s2_table_row3')}</td>
                  <td className="px-3 py-3 font-medium text-[var(--charcoal)]">{t('s2_table_row3_val1')}</td>
                  <td className="px-3 py-3 font-medium text-[var(--forest)]">{t('s2_table_row3_val2')}</td>
                  <td className="px-3 py-3 font-medium text-[var(--charcoal)]">{t('s2_table_row3_val3')}</td>
                </tr>
                <tr className="bg-[var(--sage-pale)]/30">
                  <td className="px-3 py-3 font-semibold text-[var(--charcoal)]/60">{t('s2_table_row4')}</td>
                  <td className="px-3 py-3 font-bold text-[var(--charcoal)]">{t('s2_table_row4_val1')}</td>
                  <td className="px-3 py-3 font-bold text-[var(--forest)]">{t('s2_table_row4_val2')}</td>
                  <td className="px-3 py-3 font-bold text-green-700">{t('s2_table_row4_val3')}</td>
                </tr>
                <tr>
                  <td className="px-3 py-3 text-[var(--charcoal)]/60">{t('s2_table_row5')}</td>
                  <td className="px-3 py-3 font-medium text-red-600">{t('s2_table_row5_val1')}</td>
                  <td className="px-3 py-3 font-medium text-green-600">{t('s2_table_row5_val2')}</td>
                  <td className="px-3 py-3 font-medium text-green-600">{t('s2_table_row5_val3')}</td>
                </tr>
                <tr>
                  <td className="px-3 py-3 text-[var(--charcoal)]/60">{t('s2_table_row6')}</td>
                  <td className="px-3 py-3 font-medium text-red-600">{t('s2_table_row6_val1')}</td>
                  <td className="px-3 py-3 font-medium text-green-600">{t('s2_table_row6_val2')}</td>
                  <td className="px-3 py-3 font-medium text-green-600">{t('s2_table_row6_val3')}</td>
                </tr>
                <tr>
                  <td className="px-3 py-3 text-[var(--charcoal)]/60">{t('s2_table_row7')}</td>
                  <td className="px-3 py-3 font-medium text-green-600">{t('s2_table_row7_val1')}</td>
                  <td className="px-3 py-3 font-medium text-red-600">{t('s2_table_row7_val2')}</td>
                  <td className="px-3 py-3 font-medium text-green-600">{t('s2_table_row7_val3')}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-6 rounded-xl bg-[var(--sage-pale)]/20 p-4 text-center">
            <p className="text-sm font-bold text-[var(--forest)]">{t('s2_callout')}</p>
          </div>

          <div className="mt-6 rounded-xl bg-[var(--warm-tan)]/10 p-5">
            <p className="text-sm font-semibold italic text-[var(--charcoal)]/70">{t('s2_bridge')}</p>
          </div>

          <h3 className="mt-10 font-heading text-xl font-bold text-[var(--charcoal)]">
            {t('s2_objection_title')}
          </h3>
          <Body>{t('s2_objection_p')}</Body>
          <Body>{t('s2_caveat')}</Body>

          <WarningBox>{t('s2_warning')}</WarningBox>
        </section>

        <Divider />

        {/* Section 3: Long terme — ETF Monde */}
        <section>
          <SectionHeading>{t('s3_title')}</SectionHeading>
          <Body>{t('s3_intro')}</Body>

          <div className="mt-8 overflow-hidden rounded-2xl border border-[var(--warm-tan)]/50">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="bg-[var(--warm-tan)]/10">
                  <th className="px-4 py-3 font-semibold text-[var(--charcoal)]/40"></th>
                  <th className="px-4 py-3 font-bold text-[var(--charcoal)]">{t('s3_table_col1')}</th>
                  <th className="px-4 py-3 font-bold text-[var(--forest)]">{t('s3_table_col2')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--warm-tan)]/20">
                <tr>
                  <td className="px-4 py-3 text-[var(--charcoal)]/60">{t('s3_table_row1')}</td>
                  <td className="px-4 py-3 font-medium text-red-600">{t('s3_table_row1_val1')}</td>
                  <td className="px-4 py-3 font-medium text-green-600">{t('s3_table_row1_val2')}</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-[var(--charcoal)]/60">{t('s3_table_row2')}</td>
                  <td className="px-4 py-3 font-medium text-[var(--charcoal)]">{t('s3_table_row2_val1')}</td>
                  <td className="px-4 py-3 font-medium text-green-600">{t('s3_table_row2_val2')}</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-[var(--charcoal)]/60">{t('s3_table_row3')}</td>
                  <td className="px-4 py-3 font-medium text-[var(--charcoal)]">{t('s3_table_row3_val1')}</td>
                  <td className="px-4 py-3 font-medium text-[var(--charcoal)]">{t('s3_table_row3_val2')}</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-[var(--charcoal)]/60">{t('s3_table_row4')}</td>
                  <td className="px-4 py-3 font-medium text-green-600">{t('s3_table_row4_val1')}</td>
                  <td className="px-4 py-3 font-medium text-red-600">{t('s3_table_row4_val2')}</td>
                </tr>
                <tr className="border-t-2 border-[var(--warm-tan)]/40 bg-[var(--sage-pale)]/30">
                  <td className="px-4 py-4 font-bold text-[var(--charcoal)]">{t('s3_table_row5')}</td>
                  <td className="px-4 py-4 font-bold text-[var(--charcoal)]">{t('s3_table_row5_val1')}</td>
                  <td className="px-4 py-4 font-bold text-[var(--forest)]">{t('s3_table_row5_val2')}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-6 rounded-xl bg-[var(--warm-tan)]/10 p-4 text-center">
            <p className="text-sm font-semibold italic text-[var(--charcoal)]/70">
              {t('s3_callout')}
            </p>
          </div>

          <p className="mt-6 text-sm italic leading-relaxed text-[var(--charcoal)]/45">
            {t('s3_methodology')}
          </p>
        </section>

        <Divider />

        {/* Section 4: Verdict */}
        <section className="rounded-3xl bg-[var(--forest-deep)] p-8 text-white md:p-12">
          <h2 className="font-heading text-2xl font-bold md:text-3xl">
            {t('s4_title')}
          </h2>
          <ul className="mt-8 space-y-6">
            {[
              t('s4_verdict_1'),
              t('s4_verdict_2'),
              t('s4_verdict_3'),
              t('s4_verdict_4'),
            ].map((verdict, i) => (
              <li key={i} className="flex gap-4">
                <span className="flex-shrink-0 text-white/30">—</span>
                <p className="text-base leading-relaxed opacity-90">{verdict}</p>
              </li>
            ))}
            <li className="mt-8 border-t border-white/10 pt-8">
              <p className="text-lg font-bold leading-relaxed">{t('s4_verdict_5')}</p>
            </li>
          </ul>
        </section>

        {/* CTA */}
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
        </div>

        <LastUpdated isoDate="2026-04-12" />

        <p className="mt-8 text-center text-xs italic leading-relaxed text-[var(--charcoal)]/30">
          {t('disclaimer')}
        </p>

        <div className="mt-6 text-center">
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
