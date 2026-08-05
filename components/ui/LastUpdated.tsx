import { getTranslations, getLocale } from 'next-intl/server';
import { PAGE_UPDATED } from '@/lib/site';

interface Props {
  /**
   * Route below the locale segment, e.g. "/brokers". The date itself lives in
   * PAGE_UPDATED so this footer and the sitemap's lastModified can never
   * disagree — bump it there when you revise a page.
   */
  path: string;
}

export default async function LastUpdated({ path }: Props) {
  const t = await getTranslations('common');
  const locale = await getLocale();

  const isoDate = PAGE_UPDATED[path];
  if (!isoDate) return null;

  const formatted = new Intl.DateTimeFormat(locale, { month: 'long', year: 'numeric' }).format(
    new Date(isoDate),
  );

  return (
    <p className="mt-8 text-center text-xs text-[var(--charcoal)]/35">
      {t('last_updated', { date: formatted })}
    </p>
  );
}
