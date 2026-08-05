import { MetadataRoute } from 'next';

// Served at /manifest.webmanifest. Deliberately minimal: the site is a reading
// experience, not an installable app, so this exists mainly to give Android
// browsers a name, colours and an icon.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'ClearInvest — Investir simplement en Belgique',
    short_name: 'ClearInvest',
    description:
      'Guides, calculateur et comparatifs pour investir en ETF en Belgique. Indépendant, gratuit, sans jargon.',
    start_url: '/fr',
    display: 'browser',
    background_color: '#faf8f3',
    theme_color: '#1a3a20',
    icons: [
      {
        src: '/icon.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
    ],
  };
}
