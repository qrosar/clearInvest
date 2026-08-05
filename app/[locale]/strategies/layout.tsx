import ScopedMessages from '@/components/i18n/ScopedMessages';

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <ScopedMessages locale={locale} namespaces={['strategiesPage', 'strategiesFilter', 'strategyCard', 'strategyDetail', 'strategies_returns', 'data']}>
      {children}
    </ScopedMessages>
  );
}
