import { getTranslations } from 'next-intl/server';
import Link from 'next/link';

export default async function Hero() {
  const t = await getTranslations('hero');

  return (
    <section className="relative flex min-h-[90vh] flex-col items-center justify-center bg-forest-deep px-6 py-24 text-center">
      {/* Tag */}
      <span className="mb-6 inline-block rounded-full border border-sage/40 bg-sage/10 px-4 py-1.5 text-sm font-medium text-sage-light">
        {t('tag')}
      </span>

      {/* Headline */}
      <h1 className="max-w-3xl text-5xl font-heading font-semibold leading-tight text-warm-white md:text-6xl lg:text-7xl">
        {t('title')}{' '}
        <em className="not-italic text-amber">{t('titleItalic')}</em>
      </h1>

      {/* Subtitle */}
      <p className="mt-6 max-w-2xl text-lg leading-relaxed text-warm-tan md:text-xl">
        {t('subtitle')}
      </p>

      {/* CTAs */}
      <div className="mt-10 flex flex-col gap-4 sm:flex-row">
        <Link
          href="/strategies"
          className="rounded-full bg-amber px-8 py-3.5 text-base font-semibold text-forest-deep transition-opacity hover:opacity-90"
        >
          {t('cta_primary')}
        </Link>
        <Link
          href="/calculateur"
          className="rounded-full border border-warm-tan/40 px-8 py-3.5 text-base font-semibold text-warm-white transition-colors hover:bg-white/10"
        >
          {t('cta_secondary')}
        </Link>
      </div>
    </section>
  );
}
