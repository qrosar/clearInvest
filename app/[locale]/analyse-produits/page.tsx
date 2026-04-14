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

interface ProductCardProps {
  name: string;
  provider: string;
  status: 'available' | 'in_progress';
  link?: string;
  teaser?: string;
  statusLabel: string;
  readAnalysisLabel?: string;
}

function ProductCard({ name, provider, status, link, teaser, statusLabel, readAnalysisLabel }: ProductCardProps) {
  const isAvailable = status === 'available' && link;
  
  const content = (
    <>
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="font-heading text-base font-bold text-[var(--charcoal)]">
            {name}
          </h3>
          <p className="text-xs text-[var(--charcoal)]/45">
            {provider}
          </p>
        </div>
        <span className={`flex-shrink-0 whitespace-nowrap rounded px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
          isAvailable 
            ? 'bg-green-100 text-green-700' 
            : 'bg-amber-100 text-amber-700'
        }`}>
          {statusLabel}
        </span>
      </div>
      
      {teaser && (
        <p className="mt-3 text-xs leading-relaxed text-[var(--charcoal)]/65">
          {teaser}
        </p>
      )}
      
      {isAvailable && (
        <div className="mt-4 flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-[var(--forest)]">
          <span>{readAnalysisLabel || "Lire l'analyse"}</span>
          <span className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
        </div>
      )}
    </>
  );

  const className = `group flex flex-col rounded-xl border border-[var(--warm-tan)]/40 bg-white p-5 transition-all duration-200 ${
    isAvailable 
      ? 'hover:-translate-y-0.5 hover:shadow-md cursor-pointer' 
      : 'opacity-60 cursor-default'
  }`;

  if (isAvailable) {
    return (
      <Link href={link} className={className}>
        {content}
      </Link>
    );
  }

  return (
    <div className={className}>
      {content}
    </div>
  );
}

function CategorySection({ title, subtitle, icon, children }: { title: string; subtitle: string; icon: string; children: React.ReactNode }) {
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

export default async function AnalyseProduitsPage() {
  const t = await getTranslations('analyseProductsPage');

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

        {/* Category 1 */}
        <CategorySection 
          title={t('cat_pension_title')} 
          subtitle={t('cat_pension_subtitle')} 
          icon="🏦"
        >
          <ProductCard 
            name="KBC Pricos" 
            provider="KBC" 
            status="available" 
            link="/analyse-produits/kbc-pricos"
            teaser={t('card_kbc_teaser')}
            statusLabel={t('status_available')}
            readAnalysisLabel={t('read_analysis')}
          />
          <ProductCard 
            name="Argenta Pensioenspaarfonds" 
            provider="Argenta" 
            status="available" 
            link="/analyse-produits/argenta-pensioenspaarfonds"
            teaser={t('card_argenta_teaser')}
            statusLabel={t('status_available')}
            readAnalysisLabel={t('read_analysis')}
          />
          <ProductCard 
            name="BNP Paribas B Pension Sustainable" 
            provider="BNP Paribas" 
            status="available" 
            link="/analyse-produits/bnp-b-pension"
            teaser={t('card_bnp_teaser')}
            statusLabel={t('status_available')}
            readAnalysisLabel={t('read_analysis')}
          />
          <ProductCard 
            name="Belfius Pension Fund High Equities" 
            provider="Belfius" 
            status="available" 
            link="/analyse-produits/belfius-pension-high-equities"
            teaser={t('card_belfius_teaser')}
            statusLabel={t('status_available')}
            readAnalysisLabel={t('read_analysis')}
          />
        </CategorySection>

        {/* Category 2 */}
        <CategorySection 
          title={t('cat_insurance_guaranteed_title')} 
          subtitle={t('cat_insurance_guaranteed_subtitle')} 
          icon="🔒"
        >
          <ProductCard 
            name="Ethias Savings 21+" 
            provider="Ethias" 
            status="available" 
            link="/analyse-produits/ethias-savings-21"
            teaser={t('card_ethias_teaser')}
            statusLabel={t('status_available')}
            readAnalysisLabel={t('read_analysis')}
          />
          <ProductCard
            name="AG Safe+"
            provider="AG Insurance"
            status="available"
            link="/analyse-produits/ag-safe-plus"
            teaser={t('card_ag_safe_teaser')}
            statusLabel={t('status_available')}
            readAnalysisLabel={t('read_analysis')}
          />
          <ProductCard
            name="Belfius Invest Capital Safe"
            provider="Belfius"
            status="available"
            link="/analyse-produits/belfius-invest-capital-safe"
            teaser={t('card_belfius_capital_safe_teaser')}
            statusLabel={t('status_available')}
            readAnalysisLabel={t('read_analysis')}
          />
        </CategorySection>

        {/* Category 3 */}
        <CategorySection 
          title={t('cat_insurance_funds_title')} 
          subtitle={t('cat_insurance_funds_subtitle')} 
          icon="📋"
        >
          <ProductCard 
            name="NN Strategy" 
            provider="NN" 
            status="available" 
            link="/analyse-produits/nn-strategy"
            teaser={t('card_nn_teaser')}
            statusLabel={t('status_available')}
            readAnalysisLabel={t('read_analysis')}
          />
          <ProductCard 
            name="AG Fund+" 
            provider="AG Insurance" 
            status="available" 
            link="/analyse-produits/ag-fund-plus"
            teaser={t('card_ag_teaser')}
            statusLabel={t('status_available')}
            readAnalysisLabel={t('read_analysis')}
          />
          <ProductCard
            name="Baloise Invest 23"
            provider="Baloise"
            status="available"
            link="/analyse-produits/baloise-invest"
            teaser={t('card_baloise_teaser')}
            statusLabel={t('status_available')}
            readAnalysisLabel={t('read_analysis')}
          />
        </CategorySection>

        {/* Category 4 */}
        <CategorySection 
          title={t('cat_active_funds_title')} 
          subtitle={t('cat_active_funds_subtitle')} 
          icon="📊"
        >
          <ProductCard 
            name="BNP Comfort Sustainable Equity World" 
            provider="BNP Paribas" 
            status="in_progress" 
            statusLabel={t('status_in_progress')}
          />
          <ProductCard 
            name="KBC Sivek" 
            provider="KBC" 
            status="in_progress" 
            statusLabel={t('status_in_progress')}
          />
          <ProductCard 
            name="Carmignac Patrimoine" 
            provider="Carmignac" 
            status="in_progress" 
            statusLabel={t('status_in_progress')}
          />
        </CategorySection>

        {/* Category 5 */}
        <CategorySection 
          title={t('cat_investment_plans_title')} 
          subtitle={t('cat_investment_plans_subtitle')} 
          icon="📱"
        >
          <ProductCard 
            name="ING Easy Invest" 
            provider="ING" 
            status="in_progress" 
            statusLabel={t('status_in_progress')}
          />
          <ProductCard 
            name="Belfius Flex Invest" 
            provider="Belfius" 
            status="in_progress" 
            statusLabel={t('status_in_progress')}
          />
          <ProductCard 
            name="KBC Plan d'investissement" 
            provider="KBC" 
            status="in_progress" 
            statusLabel={t('status_in_progress')}
          />
        </CategorySection>

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
