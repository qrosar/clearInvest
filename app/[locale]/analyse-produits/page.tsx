import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params;
  const t = await getTranslations('analyseProductsPage');

  return {
    title: t('meta_title'),
    description: t('meta_description'),
    alternates: {
      canonical: `https://clearinvest.be/${locale}/analyse-produits`,
    },
  }
}

type Verdict = 'avoid' | 'avoid_conditions' | 'niche';

interface ProductCardProps {
  name: string;
  provider: string;
  link: string;
  teaser?: string;
  verdict?: Verdict;
  verdictLabel?: string;
  readAnalysisLabel?: string;
}

function ProductCard({ name, provider, link, teaser, verdict, verdictLabel, readAnalysisLabel }: ProductCardProps) {
  const verdictStyles: Record<Verdict, string> = {
    avoid: 'bg-red-50 text-red-700 border border-red-200',
    avoid_conditions: 'bg-amber-50 text-amber-700 border border-amber-200',
    niche: 'bg-[var(--warm-tan)]/30 text-[var(--charcoal)]/60',
  };

  return (
    <Link href={link} className="group flex flex-col rounded-xl border border-[var(--warm-tan)]/40 bg-white p-5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md cursor-pointer">
      <div>
        <h3 className="font-heading text-base font-bold text-[var(--charcoal)]">
          {name}
        </h3>
        <p className="text-xs text-[var(--charcoal)]/45">
          {provider}
        </p>
        {verdict && verdictLabel && (
          <span className={`mt-2 inline-flex rounded px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${verdictStyles[verdict]}`}>
            {verdictLabel}
          </span>
        )}
      </div>

      {teaser && (
        <p className="mt-3 text-xs leading-relaxed text-[var(--charcoal)]/65">
          {teaser}
        </p>
      )}

      <div className="mt-4 flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-[var(--forest)]">
        <span>{readAnalysisLabel || "Lire l'analyse"}</span>
        <span className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
      </div>
    </Link>
  );
}

function CategorySection({
  title,
  subtitle,
  icon,
  children,
}: {
  title: string;
  subtitle: string;
  icon: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-16">
      <div className="mb-8">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--warm-tan)]/20 text-xl">
            {icon}
          </span>
          <h2 className="font-heading text-xl font-bold text-[var(--charcoal)] md:text-2xl">
            {title}
          </h2>
        </div>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[var(--charcoal)]/60">
          {subtitle}
        </p>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {children}
      </div>
    </section>
  );
}

interface ComingSoonProduct {
  name: string;
  provider: string;
}

function ComingSoonSection({ heading, products }: { heading: string; products: ComingSoonProduct[] }) {
  return (
    <div className="mb-12">
      <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-[var(--charcoal)]/35">
        {heading}
      </p>
      <div className="flex flex-wrap gap-2">
        {products.map(({ name, provider }) => (
          <span key={name} className="rounded-full bg-[var(--warm-tan)]/20 px-3 py-1 text-xs text-[var(--charcoal)]/50">
            {provider} · {name}
          </span>
        ))}
      </div>
    </div>
  );
}

export default async function AnalyseProduitsPage() {
  const t = await getTranslations('analyseProductsPage');

  const comingSoon: ComingSoonProduct[] = [
    { name: 'KBC Sivek', provider: 'KBC' },
    { name: 'Carmignac Patrimoine', provider: 'Carmignac' },
    { name: 'ING Easy Invest', provider: 'ING' },
    { name: 'Belfius Flex Invest', provider: 'Belfius' },
    { name: "KBC Plan d'investissement", provider: 'KBC' },
  ];

  return (
    <>
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

      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">

        <p className="mb-16 text-center text-base text-[var(--charcoal)]/70">
          {t('intro')}
        </p>

        {/* Category 1 — Pension savings */}
        <CategorySection
          title={t('cat_pension_title')}
          subtitle={t('cat_pension_subtitle')}
          icon="🏦"
        >
          <ProductCard
            name="KBC Pricos"
            provider="KBC"
            link="/analyse-produits/kbc-pricos"
            teaser={t('card_kbc_teaser')}
            verdict="avoid"
            verdictLabel={t('verdict_avoid')}
            readAnalysisLabel={t('read_analysis')}
          />
          <ProductCard
            name="BNP Paribas B Pension Sustainable"
            provider="BNP Paribas"
            link="/analyse-produits/bnp-b-pension"
            teaser={t('card_bnp_teaser')}
            verdict="avoid"
            verdictLabel={t('verdict_avoid')}
            readAnalysisLabel={t('read_analysis')}
          />
          <ProductCard
            name="Belfius Pension Fund High Equities"
            provider="Belfius"
            link="/analyse-produits/belfius-pension-high-equities"
            teaser={t('card_belfius_teaser')}
            verdict="avoid"
            verdictLabel={t('verdict_avoid')}
            readAnalysisLabel={t('read_analysis')}
          />
          <ProductCard
            name="Argenta Pensioenspaarfonds"
            provider="Argenta"
            link="/analyse-produits/argenta-pensioenspaarfonds"
            teaser={t('card_argenta_teaser')}
            verdict="avoid_conditions"
            verdictLabel={t('verdict_avoid_conditions')}
            readAnalysisLabel={t('read_analysis')}
          />
        </CategorySection>

        {/* Category 2 — Branch 21 */}
        <CategorySection
          title={t('cat_insurance_guaranteed_title')}
          subtitle={t('cat_insurance_guaranteed_subtitle')}
          icon="🔒"
        >
          <ProductCard
            name="Ethias Savings 21+"
            provider="Ethias"
            link="/analyse-produits/ethias-savings-21"
            teaser={t('card_ethias_teaser')}
            verdict="avoid"
            verdictLabel={t('verdict_avoid')}
            readAnalysisLabel={t('read_analysis')}
          />
          <ProductCard
            name="AG Safe+"
            provider="AG Insurance"
            link="/analyse-produits/ag-safe-plus"
            teaser={t('card_ag_safe_teaser')}
            verdict="avoid"
            verdictLabel={t('verdict_avoid')}
            readAnalysisLabel={t('read_analysis')}
          />
          <ProductCard
            name="Belfius Invest Capital Safe"
            provider="Belfius"
            link="/analyse-produits/belfius-invest-capital-safe"
            teaser={t('card_belfius_capital_safe_teaser')}
            verdict="avoid"
            verdictLabel={t('verdict_avoid')}
            readAnalysisLabel={t('read_analysis')}
          />
        </CategorySection>

        {/* Category 3 — Branch 23 */}
        <CategorySection
          title={t('cat_insurance_funds_title')}
          subtitle={t('cat_insurance_funds_subtitle')}
          icon="📋"
        >
          <ProductCard
            name="NN Strategy"
            provider="NN"
            link="/analyse-produits/nn-strategy"
            teaser={t('card_nn_teaser')}
            verdict="avoid"
            verdictLabel={t('verdict_avoid')}
            readAnalysisLabel={t('read_analysis')}
          />
          <ProductCard
            name="AG Fund+"
            provider="AG Insurance"
            link="/analyse-produits/ag-fund-plus"
            teaser={t('card_ag_teaser')}
            verdict="avoid"
            verdictLabel={t('verdict_avoid')}
            readAnalysisLabel={t('read_analysis')}
          />
          <ProductCard
            name="Baloise Invest 23"
            provider="Baloise"
            link="/analyse-produits/baloise-invest"
            teaser={t('card_baloise_teaser')}
            verdict="avoid"
            verdictLabel={t('verdict_avoid')}
            readAnalysisLabel={t('read_analysis')}
          />
          <ProductCard
            name="AXA Index4P Global Equity"
            provider="AXA Belgium"
            link="/analyse-produits/axa-index4p"
            teaser={t('card_axa_teaser')}
            verdict="avoid_conditions"
            verdictLabel={t('verdict_avoid_conditions')}
            readAnalysisLabel={t('read_analysis')}
          />
          <ProductCard
            name="Vivium Selection Dynamic plus Passive"
            provider="P&V / Vivium"
            link="/analyse-produits/vivium-selection"
            teaser={t('card_vivium_teaser')}
            verdict="avoid_conditions"
            verdictLabel={t('verdict_avoid_conditions')}
            readAnalysisLabel={t('read_analysis')}
          />
        </CategorySection>

        {/* Category 4 — Active funds */}
        <CategorySection
          title={t('cat_active_funds_title')}
          subtitle={t('cat_active_funds_subtitle')}
          icon="📊"
        >
          <ProductCard
            name="Crelan Invest Opportunities"
            provider="Crelan"
            link="/analyse-produits/crelan-invest-opportunities"
            teaser={t('card_crelan_opps_teaser')}
            verdict="avoid"
            verdictLabel={t('verdict_avoid')}
            readAnalysisLabel={t('read_analysis')}
          />
          <ProductCard
            name="BNP Comfort Sustainable Equity World"
            provider="BNP Paribas"
            link="/analyse-produits/bnp-comfort-equity"
            teaser={t('card_bnp_comfort_teaser')}
            verdict="avoid"
            verdictLabel={t('verdict_avoid')}
            readAnalysisLabel={t('read_analysis')}
          />
          <ProductCard
            name="Carmignac Investissement"
            provider="Carmignac"
            link="/analyse-produits/carmignac-investissement"
            teaser={t('card_carmignac_inv_teaser')}
            verdict="avoid_conditions"
            verdictLabel={t('verdict_avoid_conditions')}
            readAnalysisLabel={t('read_analysis')}
          />
        </CategorySection>

        {/* Coming soon — analyses in progress */}
        <ComingSoonSection
          heading={t('coming_soon_heading')}
          products={comingSoon}
        />

        <p className="mt-20 text-center text-sm text-[var(--charcoal)]/50 italic">
          {t.rich('note', {
            email: (chunks) => <a href="mailto:contact@clearinvest.be" className="text-[var(--forest)] hover:underline">{chunks}</a>
          })}
        </p>

        <div className="mt-14 border-t border-[var(--warm-tan)]/30 pt-8 text-center">
          <Link
            href="/"
            className="text-sm text-[var(--charcoal)]/40 transition-colors hover:text-[var(--charcoal)]"
          >
            {t('back')}
          </Link>
        </div>
      </div>
    </>
  );
}
