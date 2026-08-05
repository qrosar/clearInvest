import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { BASE_CLIENT_NAMESPACES, pickMessages } from '@/lib/i18n/messages';

interface Props {
  /** Namespaces this subtree needs on top of BASE_CLIENT_NAMESPACES */
  namespaces: readonly string[];
  /** Locale segment — required so this layout stays statically prerenderable */
  locale: string;
  children: React.ReactNode;
}

/**
 * Re-provides messages for a route subtree that needs more than the base set.
 *
 * Drop this into a segment `layout.tsx` and list only the extra namespaces —
 * the base ones are added here, because a nested provider replaces the parent's
 * messages rather than merging with them.
 */
export default async function ScopedMessages({ namespaces, locale, children }: Props) {
  // Without this the segment resolves its locale from the request and drops out
  // of static rendering, even though the parent layout already set it.
  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <NextIntlClientProvider
      messages={pickMessages(messages, [...BASE_CLIENT_NAMESPACES, ...namespaces])}
    >
      {children}
    </NextIntlClientProvider>
  );
}
