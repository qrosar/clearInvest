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
    fr: 'Fiscalité des ETF en Belgique 2026 — TOB, Reynders, CGT', 
    nl: 'Belasting op ETF\'s in België 2026 — TOB, Reynders, CGT', 
    en: 'ETF Taxation in Belgium 2026 — TOB, Reynders, CGT' 
  }
  const descriptions = { 
    fr: 'TOB, précompte mobilier, taxe Reynders et taxe sur les plus-values : tout savoir sur la fiscalité belge.', 
    nl: 'TOB, roerende voorheffing, Reynders-taks en meerwaardebelasting: alles over de Belgische fiscaliteit.', 
    en: 'TOB, withholding tax, Reynders tax and capital gains tax: everything you need to know about Belgian taxation.' 
  }
  return {
    title: titles[locale as keyof typeof titles] ?? titles.fr,
    description: descriptions[locale as keyof typeof descriptions] ?? descriptions.fr,
    alternates: {
      canonical: `https://clearinvest.be/${locale}/comprendre/fiscalite`,
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

function Divider() {
  return <div className="my-12 border-t border-[var(--warm-tan)]/40" />;
}

// ── Tax card ──────────────────────────────────────────────────────────────────

interface TaxCardProps {
  name: string;
  rate: string;
  appliesLabel: string;
  appliesTo: string;
  whenLabel: string;
  when: string;
  insightLabel: string;
  insight: string;
  highlight?: boolean;
}

function TaxCard({ name, rate, appliesLabel, appliesTo, whenLabel, when, insightLabel, insight, highlight }: TaxCardProps) {
  return (
    <div className={`rounded-xl border p-5 ${
      highlight
        ? 'border-[var(--forest)]/25 bg-[var(--sage-pale)]'
        : 'border-[var(--warm-tan)]/50 bg-[var(--warm-white)]'
    }`}>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <h3 className="font-heading text-lg font-semibold text-[var(--charcoal)]">{name}</h3>
        <span className={`flex-shrink-0 rounded-full px-2.5 py-0.5 font-mono text-xs font-bold ${
          highlight
            ? 'bg-[var(--forest)]/10 text-[var(--forest)]'
            : 'bg-[var(--warm-tan)]/40 text-[var(--charcoal)]/60'
        }`}>
          {rate}
        </span>
      </div>
      <dl className="mt-3 space-y-1.5 text-sm">
        <div className="flex gap-2">
          <dt className="w-28 flex-shrink-0 text-[var(--charcoal)]/40">{appliesLabel}</dt>
          <dd className="text-[var(--charcoal)]/70">{appliesTo}</dd>
        </div>
        <div className="flex gap-2">
          <dt className="w-28 flex-shrink-0 text-[var(--charcoal)]/40">{whenLabel}</dt>
          <dd className="text-[var(--charcoal)]/70">{when}</dd>
        </div>
      </dl>
      <div className="mt-4 border-t border-[var(--warm-tan)]/30 pt-3">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-[var(--charcoal)]/35">
          {insightLabel}
        </p>
        <p className="mt-1.5 text-sm leading-relaxed text-[var(--charcoal)]/70">{insight}</p>
      </div>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default async function FiscalitePage() {
  const t = await getTranslations('comprFiscalite');
  const tc = await getTranslations('common');

  const TABLE_ROWS = [
    { product: t('table_row1'), tob: '0,12%',  precompte: '✗',                          reynders: '✗',    pv: t('table_val_pv'), other: '—',                       etf: true },
    { product: t('table_row2'), tob: '0,12%',  precompte: t('table_val_dividends'),      reynders: '✗',    pv: t('table_val_pv'), other: '—',                       etf: true },
    { product: t('table_row3'), tob: '0,12%',  precompte: '✗',                          reynders: '⚠️',   pv: t('table_val_pv'), other: '—',                       etf: true },
    { product: t('table_row4'), tob: '—',       precompte: t('table_val_above_threshold'), reynders: '—',   pv: '—',               other: '—',                       etf: false },
    { product: t('table_row5'), tob: '—',       precompte: t('table_val_from_first'),     reynders: '—',   pv: '—',               other: '—',                       etf: false },
    { product: t('table_row6'), tob: '—',       precompte: t('table_val_lt8'),            reynders: '—',   pv: '—',               other: t('table_val_prime_tax'),  etf: false },
    { product: t('table_row_lt'), tob: '—',    precompte: t('table_val_lt_precompte'),   reynders: t('table_val_lt_reynders'), pv: t('table_val_lt_pv'), other: t('table_val_lt_other'), etf: false },
    { product: t('table_row7'), tob: '—',       precompte: '—',                           reynders: '—',   pv: '—',               other: t('table_val_tax_60'),     etf: false },
    { product: t('table_row8'), tob: '0,12%',  precompte: t('table_val_dividends'),      reynders: t('table_val_bond_portion'), pv: t('table_val_pv'), other: '—', etf: false },
  ];

  const cols = [
    t('table_col_product'),
    t('table_col_tob'),
    t('table_col_precompte'),
    t('table_col_reynders'),
    t('table_col_pv'),
    t('table_col_other'),
  ];

  const taxes = [
    { key: 'tax1', highlight: true },
    { key: 'tax2', highlight: true },
    { key: 'tax3', highlight: false },
    { key: 'tax4', highlight: true },
    { key: 'tax5', highlight: false },
    { key: 'tax6', highlight: false },
  ] as const;

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

        {/* Glossary prompt */}
        <p className="mb-10 text-right text-sm text-[var(--charcoal)]/45">
          {tc('glossaryPrompt')}{' '}
          <Link href="/ressources/glossaire" className="text-[var(--forest)] underline-offset-2 hover:underline">
            {tc('glossaryLink')}
          </Link>
        </p>

        {/* Intro */}
        <p className="text-base leading-relaxed text-[var(--charcoal)]/75">
          {t('intro')}
        </p>

        <Divider />

        {/* ── Tax cards ── */}
        <section>
          <SectionHeading>{t('s1_title')}</SectionHeading>
          <Body>{t('s1_p1')}</Body>

          <div className="mt-8 space-y-5">
            {taxes.map(({ key, highlight }) => (
              <TaxCard
                key={key}
                name={t(`${key}_name` as any)}
                rate={t(`${key}_rate` as any)}
                appliesLabel={t('applies_label')}
                appliesTo={t(`${key}_applies` as any)}
                whenLabel={t('when_label')}
                when={t(`${key}_when` as any)}
                insightLabel={t('insight_label')}
                insight={t(`${key}_insight` as any)}
                highlight={highlight}
              />
            ))}
          </div>
        </section>

        <Divider />

        {/* ── Summary table ── */}
        <section>
          <SectionHeading>{t('s2_title')}</SectionHeading>
          <Body>{t('s2_p1')}</Body>
          <div className="mt-6 overflow-x-auto rounded-xl border border-[var(--warm-tan)]/50">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[var(--warm-tan)]/50 bg-[var(--warm-cream)]">
                  {cols.map(col => (
                    <th key={col} className="px-4 py-3 text-left text-[10px] font-semibold uppercase tracking-wide text-[var(--charcoal)]/50">
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {TABLE_ROWS.map((row, i) => (
                  <tr
                    key={row.product}
                    className={`border-b border-[var(--warm-tan)]/30 last:border-0 ${
                      row.etf
                        ? 'bg-[var(--sage-pale)]/60'
                        : i % 2 === 0 ? 'bg-[var(--warm-white)]' : 'bg-[var(--warm-cream)]/40'
                    }`}
                  >
                    <td className={`px-4 py-3 font-medium ${row.etf ? 'text-[var(--forest)]' : 'text-[var(--charcoal)]'}`}>
                      {row.product}
                    </td>
                    <td className="px-4 py-3 text-[var(--charcoal)]/65">{row.tob}</td>
                    <td className="px-4 py-3 text-[var(--charcoal)]/65">{row.precompte}</td>
                    <td className="px-4 py-3 text-[var(--charcoal)]/65">{row.reynders}</td>
                    <td className="px-4 py-3 text-[var(--charcoal)]/65">{row.pv}</td>
                    <td className="px-4 py-3 text-[var(--charcoal)]/65">{row.other}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="space-y-1.5 border-t border-[var(--warm-tan)]/30 bg-[var(--warm-cream)] px-4 py-2.5">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 flex-shrink-0 rounded-sm bg-[var(--sage-pale)]" />
                <p className="text-[11px] text-[var(--charcoal)]/45">{t('table_legend')}</p>
              </div>
              <p className="text-[11px] text-[var(--charcoal)]/40">{t('table_note1')}</p>
              <p className="text-[11px] text-[var(--charcoal)]/40">{t('table_note2')}</p>
              <p className="text-[11px] text-[var(--charcoal)]/40">{t('table_note3')}</p>
            </div>
          </div>
        </section>

        <Divider />

        {/* ── Disclaimer ── */}
        <div className="rounded-xl border border-[var(--warm-tan)]/50 bg-[var(--warm-white)] px-5 py-4">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-[var(--charcoal)]/35">
            {t('disclaimer_label')}
          </p>
          <p className="mt-2 text-sm leading-relaxed text-[var(--charcoal)]/60">
            {t('disclaimer_text')}
          </p>
        </div>

        <Divider />

        {/* ── CTA ── */}
        <section className="rounded-2xl border border-[var(--warm-tan)]/50 bg-[var(--warm-cream)] px-6 py-8 text-center md:px-10 md:py-10">
          <p className="font-heading text-xl font-semibold text-[var(--charcoal)]">
            {t('cta_title')}
          </p>
          <p className="mx-auto mt-2 max-w-sm text-sm text-[var(--charcoal)]/55">
            {t('cta_subtitle')}
          </p>
          <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/calculateur"
              className="inline-flex items-center gap-2 rounded-xl bg-[var(--forest)] px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            >
              {t('cta_btn')}
            </Link>
          </div>
          <div className="mt-4">
            <Link
              href="/strategies"
              className="text-sm text-[var(--forest)] underline-offset-2 hover:underline"
            >
              {t('cta_link')}
            </Link>
          </div>
        </section>

        <LastUpdated isoDate="2026-03-01" />

        {/* Back link */}
        <div className="mt-6 text-center">
          <Link
            href="/comprendre"
            className="text-sm text-[var(--charcoal)]/40 transition-colors hover:text-[var(--charcoal)]"
          >
            {t('back')}
          </Link>
        </div>

      </div>
    </>
  );
}
