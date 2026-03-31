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
    fr: 'Les produits bancaires belges expliqués — Épargne, Branche 21, Pension', 
    nl: 'Belgische bankproducten uitgelegd — Sparen, Tak 21, Pensioen', 
    en: 'Belgian Banking Products Explained — Savings, Branch 21, Pension' 
  }
  const descriptions = { 
    fr: 'Comptes épargne, bons de caisse, branche 21 et épargne-pension : comment ils fonctionnent réellement.', 
    nl: 'Spaarrekeningen, kasbons, tak 21 en pensioensparen: hoe ze echt werken.', 
    en: 'Savings accounts, savings bonds, branch 21 and pension savings: how they really work.' 
  }
  return {
    title: titles[locale as keyof typeof titles] ?? titles.fr,
    description: descriptions[locale as keyof typeof descriptions] ?? descriptions.fr,
    alternates: {
      canonical: `https://clearinvest.be/${locale}/comprendre/produits-bancaires`,
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

function WarningBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 px-5 py-4">
      <p className="text-sm leading-relaxed text-amber-800">{children}</p>
    </div>
  );
}

function NumberedPoint({ n, title, children }: { n: string; title: string; children: React.ReactNode }) {
  return (
    <div className="mt-6 flex gap-4">
      <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-[var(--forest)] text-xs font-bold text-white">
        {n}
      </span>
      <div>
        <p className="font-semibold text-[var(--charcoal)]">{title}</p>
        <p className="mt-1 text-sm leading-relaxed text-[var(--charcoal)]/70">{children}</p>
      </div>
    </div>
  );
}

function Divider() {
  return <div className="my-12 border-t border-[var(--warm-tan)]/40" />;
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default async function ProduitsBancairesPage() {
  const t = await getTranslations('comprProduits');
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

        {/* Intro */}
        <p className="text-base leading-relaxed text-[var(--charcoal)]/75">
          {t('intro')}
        </p>

        <Divider />

        {/* ── Section 1 — Compte épargne ── */}
        <section>
          <SectionHeading>{t('s1_title')}</SectionHeading>
          <Body>{t('s1_p1')}</Body>
          <Body>{t('s1_p2')}</Body>

          {/* Fiscal highlight */}
          <div className="mt-6 rounded-xl border border-[var(--warm-tan)]/50 bg-[var(--warm-white)] px-5 py-4">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-[var(--charcoal)]/35">
              {t('s1_fiscal_label')}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-[var(--charcoal)]/70">
              {t('s1_fiscal_text')}
            </p>
          </div>

          <div className="mt-6 rounded-xl border border-[var(--forest)]/20 bg-[var(--sage-pale)] px-5 py-4">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-[var(--forest)]/60">
              {t('s1_verdict_label')}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-[var(--charcoal)]/70">
              {t('s1_verdict_p1')}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-[var(--charcoal)]/70">
              {t('s1_verdict_p2')}
            </p>
          </div>
        </section>

        <Divider />

        {/* ── Section 2 — Bon de caisse ── */}
        <section>
          <SectionHeading>{t('s2_title')}</SectionHeading>
          <Body>{t('s2_p1')}</Body>

          <NumberedPoint n="1" title={t('s2_pt1_title')}>{t('s2_pt1_body')}</NumberedPoint>
          <NumberedPoint n="2" title={t('s2_pt2_title')}>{t('s2_pt2_body')}</NumberedPoint>

          <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 px-5 py-4">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-amber-700/70">
              {t('s2_verdict_label')}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-amber-900/75">{t('s2_verdict_p1')}</p>
            <p className="mt-2 text-sm leading-relaxed text-amber-900/75">{t('s2_verdict_p2')}</p>
            <p className="mt-2 text-sm leading-relaxed text-amber-900/75">{t('s2_verdict_p3')}</p>
          </div>
        </section>

        <Divider />

        {/* ── Section 3 — Branche 21 ── */}
        <section>
          <SectionHeading>
            {t('s3_title')}{' '}
            <span className="text-base font-normal text-[var(--charcoal)]/45">{t('s3_title_sub')}</span>
          </SectionHeading>
          <Body>{t('s3_p1')}</Body>
          <BulletList items={[t('s3_bullet1'), t('s3_bullet2'), t('s3_bullet3')]} />

          <WarningBox>{t('s3_warning')}</WarningBox>

          {/* Concrete example */}
          <div className="mt-6 rounded-xl border border-[var(--warm-tan)]/50 bg-[var(--warm-white)] px-5 py-4">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-[var(--charcoal)]/35">
              {t('s3_example_label')}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-[var(--charcoal)]/70">
              {t('s3_example_text')}
            </p>
          </div>

          <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 px-5 py-4">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-amber-700/70">
              {t('s3_verdict_label')}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-amber-900/75">{t('s3_verdict_p1')}</p>
            <ul className="mt-2 space-y-1.5">
              {[t('s3_b1'), t('s3_b2'), t('s3_b3')].map((item, i) => (
                <li key={i} className="flex gap-2 text-sm leading-relaxed text-amber-900/75">
                  <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-amber-600/50" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-sm leading-relaxed text-amber-900/75">{t('s3_verdict_p2')}</p>
            <p className="mt-2 text-sm font-medium leading-relaxed text-amber-900/80">{t('s3_verdict_p3')}</p>
          </div>
        </section>

        <Divider />

        {/* ── Section 4 — Épargne-pension ── */}
        <section>
          <SectionHeading>{t('s4_title')}</SectionHeading>
          <Body>{t('s4_p1')}</Body>
          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="rounded-xl border border-[var(--warm-tan)]/50 bg-[var(--warm-white)] px-4 py-3">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-[var(--charcoal)]/35">{t('s4_opt1_label')}</p>
              <p className="mt-1.5 text-sm leading-relaxed text-[var(--charcoal)]/70">{t('s4_opt1_text')}</p>
            </div>
            <div className="rounded-xl border border-[var(--warm-tan)]/50 bg-[var(--warm-white)] px-4 py-3">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-[var(--charcoal)]/35">{t('s4_opt2_label')}</p>
              <p className="mt-1.5 text-sm leading-relaxed text-[var(--charcoal)]/70">{t('s4_opt2_text')}</p>
            </div>
          </div>
          <p className="mt-2 text-xs leading-relaxed text-[var(--charcoal)]/45">
            {t('s4_threshold')}
          </p>
          <Body>{t('s4_p2')}</Body>

          <NumberedPoint n="1" title={t('s4_pt1_title')}>{t('s4_pt1_body')}</NumberedPoint>
          <NumberedPoint n="2" title={t('s4_pt2_title')}>{t('s4_pt2_body')}</NumberedPoint>
          <NumberedPoint n="3" title={t('s4_pt3_title')}>{t('s4_pt3_body')}</NumberedPoint>

          <div className="mt-8 rounded-xl border border-amber-200 bg-amber-50 px-5 py-4">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-amber-700/70">
              {t('s4_verdict_label')}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-amber-900/75">{t('s4_verdict_p1')}</p>
            <p className="mt-2 text-sm leading-relaxed text-amber-900/75">{t('s4_verdict_p2')}</p>
            <p className="mt-2 text-sm leading-relaxed text-amber-900/75">{t('s4_verdict_p3')}</p>
            <p className="mt-2 text-sm leading-relaxed text-amber-900/75">{t('s4_verdict_p4')}</p>
            <p className="mt-3 text-sm font-medium leading-relaxed text-amber-900/85">{t('s4_verdict_p5')}</p>
          </div>
        </section>

        <Divider />

        {/* ── Section 5 — Fonds actifs ── */}
        <section>
          <SectionHeading>{t('s5_title')}</SectionHeading>
          <Body>{t('s5_p1')}</Body>
          <Body>{t('s5_p2')}</Body>

          <blockquote className="mt-8 border-l-4 border-[var(--warm-tan)] pl-5">
            <p className="font-heading text-lg italic leading-relaxed text-[var(--charcoal)]/65">
              &laquo;&nbsp;{t('s5_quote')}&nbsp;&raquo;
            </p>
          </blockquote>

          <div className="mt-8 rounded-xl border border-red-200 bg-red-50 px-5 py-4">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-red-700/70">
              {t('s5_verdict_label')}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-red-900/75">{t('s5_verdict_p1')}</p>
            <p className="mt-2 text-sm leading-relaxed text-red-900/75">{t('s5_verdict_p2')}</p>
            <p className="mt-2 text-sm leading-relaxed text-red-900/75">{t('s5_verdict_p3')}</p>
          </div>
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
              href="/calculateur"
              className="inline-flex items-center gap-2 rounded-xl bg-[var(--forest)] px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            >
              {t('cta_btn')}
            </Link>
          </div>
          <div className="mt-4">
            <Link
              href="/comprendre/fiscalite"
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
