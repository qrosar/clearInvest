import { getTranslations, getLocale } from 'next-intl/server';

interface Props {
  isoDate: string; // e.g. "2026-01-15"
}

export default async function LastUpdated({ isoDate }: Props) {
  const t = await getTranslations('common');
  const locale = await getLocale();
  const formatted = new Intl.DateTimeFormat(locale, { month: 'long', year: 'numeric' }).format(
    new Date(isoDate),
  );
  return (
    <p className="mt-8 text-center text-xs text-[var(--charcoal)]/35">
      {t('last_updated', { date: formatted })}
    </p>
  );
}
