import { headers, cookies } from 'next/headers';
import type { Viewport } from 'next';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

// Root layout — required by Next.js 16.
// lang is derived from the request headers to ensure the <html> tag
// carries the correct locale for SEO (Google uses <html lang> for language detection).
// suppressHydrationWarning prevents the mismatch warning from attributes
// set by the nested [locale]/layout.tsx.
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headersList = await headers();
  const cookieStore = await cookies();

  // Try locale from next-intl cookie first (most reliable)
  let lang = cookieStore.get('NEXT_LOCALE')?.value || '';

  // Fallback: extract locale from URL path
  if (!lang) {
    const pathname = headersList.get('x-invoke-path') || '';
    const candidate = pathname.split('/')[1];
    if (candidate && ['fr', 'nl', 'en'].includes(candidate)) {
      lang = candidate;
    }
  }

  // Final fallback
  if (!lang || !['fr', 'nl', 'en'].includes(lang)) {
    lang = 'fr';
  }

  return (
    <html lang={lang} suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
