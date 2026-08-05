import ScopedMessages from '@/components/i18n/ScopedMessages';

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // 'p_*' covers the per-product cap notes and warnings, which live as
  // top-level namespaces rather than under 'calculator'.
  return (
    <ScopedMessages locale={locale} namespaces={['calculator', 'data', 'p_*']}>
      {children}
    </ScopedMessages>
  );
}
