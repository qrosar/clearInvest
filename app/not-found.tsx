import { routing } from '@/i18n/routing';

// Root-level 404. This renders for requests that never reach the [locale]
// segment, so it has to supply its own <html>/<body> — the root layout is a
// pass-through and the locale layout is never entered here.
export default function NotFound() {
  return (
    <html lang={routing.defaultLocale}>
      <body
        style={{
          margin: 0,
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.75rem',
          background: '#faf8f3',
          color: '#2c2c2c',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          textAlign: 'center',
          padding: '2rem',
        }}
      >
        <h1 style={{ margin: 0, fontSize: '2rem', fontWeight: 600 }}>404</h1>
        <p style={{ margin: 0, opacity: 0.7 }}>Cette page n&apos;existe pas.</p>
        <a href={`/${routing.defaultLocale}`} style={{ color: '#2d5a35', fontWeight: 600 }}>
          Retour à l&apos;accueil
        </a>
      </body>
    </html>
  );
}
