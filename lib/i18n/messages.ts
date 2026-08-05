import type { AbstractIntlMessages } from 'next-intl';

/**
 * Namespaces every route needs on the client.
 *
 * Nav and Footer render on every page; the rest are the client components used
 * by the homepage. Keep this list small — it is the floor for every response.
 */
export const BASE_CLIENT_NAMESPACES = [
  'nav',
  'footer',
  'common',
  'disclaimer',
  'home',
  'hero',
  'tools',
  'journey',
  'strategies',
] as const;

/**
 * Reduces the full message bundle to the namespaces a route actually needs.
 *
 * The FR bundle is ~380 KB across 50+ namespaces. `NextIntlClientProvider`
 * serialises whatever it is handed into the RSC payload of every response, so
 * passing the whole bundle put the guide, glossary and product-analysis copy
 * into the HTML of pages that never render a word of it.
 *
 * Note that nesting providers does not merge: use-intl's IntlProvider replaces
 * the parent's messages whenever a `messages` prop is present. Every scope
 * therefore has to carry the base namespaces as well, which `ScopedMessages`
 * handles.
 */
export function pickMessages(
  messages: AbstractIntlMessages,
  namespaces: readonly string[],
): AbstractIntlMessages {
  const picked: AbstractIntlMessages = {};

  for (const namespace of namespaces) {
    // A trailing '*' takes every namespace with that prefix — used for the
    // per-product `p_*` notes, which live at the message root.
    if (namespace.endsWith('*')) {
      const prefix = namespace.slice(0, -1);
      for (const key of Object.keys(messages)) {
        if (key.startsWith(prefix)) picked[key] = messages[key];
      }
      continue;
    }

    const value = messages[namespace];
    if (value !== undefined) {
      picked[namespace] = value;
    }
  }

  return picked;
}
