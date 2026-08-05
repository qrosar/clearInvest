/**
 * Regenerates the OpenGraph cards in public/.
 *
 * Run with:  npx tsx scripts/generate-og-image.tsx
 *
 * Writes one card per locale (og-image-fr/nl/en.png) plus og-image.png, which
 * is the French card duplicated under a stable name. The stable name is what
 * backs the JSON-LD Organization logo, which must not change per page.
 *
 * These are committed build artefacts rather than a route so the same file can
 * serve OpenGraph, the Twitter card and the logo.
 */
import { ImageResponse } from 'next/og';
import { writeFileSync } from 'node:fs';
import { join } from 'node:path';

const FOREST_DEEP = '#1a3a20';
const SAGE = '#7a9e7e';
const WARM_WHITE = '#faf8f3';
const AMBER = '#e8a94a';

const COPY = {
  fr: {
    line1: 'Investir simplement',
    line2: 'en Belgique',
    tagline: 'Guides · Calculateur · Comparatif brokers — indépendant et gratuit',
  },
  nl: {
    line1: 'Eenvoudig beleggen',
    line2: 'in België',
    tagline: 'Gidsen · Rekenmachine · Brokervergelijking — onafhankelijk en gratis',
  },
  en: {
    line1: 'Simple ETF investing',
    line2: 'in Belgium',
    tagline: 'Guides · Calculator · Broker comparison — independent and free',
  },
} as const;

function card({ line1, line2, tagline }: { line1: string; line2: string; tagline: string }) {
  return (
    <div
      style={{
        width: '1200px',
        height: '630px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        background: FOREST_DEEP,
        padding: '72px',
        fontFamily: 'sans-serif',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <div
          style={{
            width: '18px',
            height: '18px',
            borderRadius: '50%',
            background: AMBER,
            display: 'flex',
          }}
        />
        <div style={{ display: 'flex', fontSize: '34px', color: WARM_WHITE, fontWeight: 600 }}>
          Clear
          <span style={{ color: SAGE }}>Invest</span>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div
          style={{
            display: 'flex',
            fontSize: '76px',
            lineHeight: 1.1,
            color: WARM_WHITE,
            fontWeight: 700,
            letterSpacing: '-0.02em',
          }}
        >
          {line1}
        </div>
        <div
          style={{
            display: 'flex',
            fontSize: '76px',
            lineHeight: 1.1,
            color: SAGE,
            fontWeight: 700,
            letterSpacing: '-0.02em',
          }}
        >
          {line2}
        </div>
      </div>

      <div style={{ display: 'flex', fontSize: '28px', color: 'rgba(250,248,243,0.65)' }}>
        {tagline}
      </div>
    </div>
  );
}

async function write(name: string, copy: (typeof COPY)[keyof typeof COPY]) {
  const image = new ImageResponse(card(copy), { width: 1200, height: 630 });
  const buffer = Buffer.from(await image.arrayBuffer());
  const out = join(process.cwd(), 'public', name);
  writeFileSync(out, buffer);
  console.log(`wrote ${name} (${buffer.length} bytes)`);
}

async function main() {
  for (const [locale, copy] of Object.entries(COPY)) {
    await write(`og-image-${locale}.png`, copy);
  }
  // Stable fallback used by the JSON-LD logo and any locale-less reference.
  await write('og-image.png', COPY.fr);
}

main();
