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
    fr: 'Pourquoi investir en ETF ? La réponse honnête', 
    nl: 'Waarom beleggen in ETF\'s? Het eerlijke antwoord', 
    en: 'Why Invest in ETFs? The Honest Answer' 
  }
  const descriptions = { 
    fr: 'Découvrez les avantages structurels des ETF par rapport aux fonds bancaires : frais, diversification et performance.', 
    nl: 'Ontdek de structurele voordelen van ETF\'s ten opzichte van bankfondsen: kosten, diversificatie en prestaties.', 
    en: 'Discover the structural advantages of ETFs compared to banking funds: fees, diversification and performance.' 
  }
  return {
    title: titles[locale as keyof typeof titles] ?? titles.fr,
    description: descriptions[locale as keyof typeof descriptions] ?? descriptions.fr,
    alternates: {
      canonical: `https://clearinvest.be/${locale}/comprendre/etf`,
    },
  }
}

// ── Reusable editorial primitives ─────────────────────────────────────────────

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

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="mt-4 space-y-2">
      {items.map((item, i) => (
        <li key={i} className="flex gap-3 text-base leading-relaxed text-[var(--charcoal)]/75">
          <span aria-hidden="true" className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[var(--forest)]" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function HandicapBlock({ label, title, children }: { label: string; title: string; children: React.ReactNode }) {
  return (
    <div className="mt-6 rounded-xl border-l-4 border-[var(--warm-tan)] bg-[var(--warm-white)] px-5 py-4">
      <p className="text-[10px] font-semibold uppercase tracking-widest text-[var(--charcoal)]/35">
        {label}
      </p>
      <p className="mt-1 font-heading text-lg font-semibold text-[var(--charcoal)]">{title}</p>
      <p className="mt-2 text-sm leading-relaxed text-[var(--charcoal)]/70">{children}</p>
    </div>
  );
}

function Divider() {
  return <div className="my-12 border-t border-[var(--warm-tan)]/40" />;
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default async function EtfGuidePage() {
  const t = await getTranslations('comprendreEtf');
  const tc = await getTranslations('common');

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

        {/* ── Section 1 ── */}
        <section>
          <SectionHeading>{t('s1_title')}</SectionHeading>
          <Body>{t('s1_p1')}</Body>
          <Body>{t('s1_p2')}</Body>
          <Body>{t('s1_p3')}</Body>
          <BulletList items={[t('s1_bullet1'), t('s1_bullet2')]} />
        </section>

        <Divider />

        {/* ── Section 2 ── */}
        <section>
          <SectionHeading>{t('s2_title')}</SectionHeading>
          <Body>{t('s2_p1')}</Body>

          {/* Comparison card */}
          <div className="mt-6 rounded-2xl bg-[var(--forest)] p-6 text-[var(--warm-white)] md:p-8">
            <p className="text-sm font-semibold uppercase tracking-widest text-white/50">
              {t('sim_label')}
            </p>
            <div className="mt-5 space-y-4">
              <div className="flex items-baseline justify-between gap-4 border-b border-white/10 pb-4">
                <div>
                  <p className="text-sm font-medium text-white/80">{t('etf_name')}</p>
                  <p className="mt-0.5 text-[11px] text-white/45">{t('etf_detail')}</p>
                </div>
                <p className="flex-shrink-0 font-heading text-2xl font-bold">{t('etf_value')}</p>
              </div>
              <div className="flex items-baseline justify-between gap-4 border-b border-white/10 pb-4">
                <div>
                  <p className="text-sm font-medium text-white/80">{t('fund_name')}</p>
                  <p className="mt-0.5 text-[11px] text-white/45">{t('fund_detail')}</p>
                </div>
                <p className="flex-shrink-0 font-heading text-2xl font-bold text-white/60">{t('fund_value')}</p>
              </div>
              <div className="flex items-baseline justify-between gap-4">
                <p className="text-sm font-semibold text-[var(--amber-light)]">{t('diff_label')}</p>
                <p className="flex-shrink-0 font-heading text-2xl font-bold text-[var(--amber-light)]">{t('diff_value')}</p>
              </div>
            </div>
            <p className="mt-5 text-[11px] leading-relaxed text-white/35">
              {t('sim_note')}
            </p>
          </div>

          <Body>{t('s2_p2')}</Body>
        </section>

        <Divider />

        {/* ── Section 3 ── */}
        <section>
          <SectionHeading>{t('s3_title')}</SectionHeading>
          <Body>{t('s3_p1')}</Body>
          <Body>{t('s3_p2')}</Body>
          <Body>{t('s3_p3')}</Body>
        </section>

        <Divider />

        {/* ── Section 4 ── */}
        <section>
          <SectionHeading>{t('s4_title')}</SectionHeading>
          <Body>{t('s4_p1')}</Body>

          <HandicapBlock label={t('h1_label')} title={t('h1_title')}>{t('h1_body')}</HandicapBlock>
          <HandicapBlock label={t('h2_label')} title={t('h2_title')}>{t('h2_body')}</HandicapBlock>
          <HandicapBlock label={t('h3_label')} title={t('h3_title')}>{t('h3_body')}</HandicapBlock>
        </section>

        <Divider />

        {/* ── Section 5 ── */}
        <section>
          <SectionHeading>{t('s5_title')}</SectionHeading>
          <Body>{t('s5_p1')}</Body>
          <Body>{t('s5_p2')}</Body>
          <Body>{t('s5_p3')}</Body>

          {/* Pull-quote */}
          <blockquote className="mt-8 border-l-4 border-[var(--forest)] pl-5">
            <p className="font-heading text-lg italic leading-relaxed text-[var(--charcoal)]/70">
              &laquo;&nbsp;{t('s5_quote')}&nbsp;&raquo;
            </p>
          </blockquote>
        </section>

        <Divider />

        {/* ── Section 6 ── */}
        <section>
          <SectionHeading>{t('s6_title')}</SectionHeading>
          <Body>{t('s6_p1')}</Body>
          <BulletList items={[t('s6_bullet1'), t('s6_bullet2'), t('s6_bullet3'), t('s6_bullet4')]} />
        </section>

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
              href="/strategies"
              className="inline-flex items-center gap-2 rounded-xl bg-[var(--forest)] px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            >
              {t('cta_btn_strategies')}
            </Link>
            <Link
              href="/calculateur"
              className="inline-flex items-center gap-2 rounded-xl border border-[var(--warm-tan)] bg-[var(--warm-white)] px-6 py-3 text-sm font-semibold text-[var(--charcoal)] transition-colors hover:border-[var(--forest)]/40"
            >
              {t('cta_btn_calc')}
            </Link>
          </div>
          <div className="mt-4">
            <Link
              href="/comprendre/fiscalite"
              className="text-sm text-[var(--forest)] underline-offset-2 hover:underline"
            >
              {t('cta_link_fiscalite')}
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
