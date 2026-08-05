/**
 * Regenerates the app icons.
 *
 * Run with:  npx tsx scripts/generate-icons.tsx
 *
 * Writes public/icon.png (512, referenced by the web manifest) and
 * app/apple-icon.png (180, picked up by Next's file convention and emitted as
 * <link rel="apple-touch-icon">). app/favicon.ico is maintained separately.
 */
import { ImageResponse } from 'next/og';
import { writeFileSync } from 'node:fs';
import { join } from 'node:path';

const FOREST_DEEP = '#1a3a20';
const SAGE = '#7a9e7e';
const WARM_WHITE = '#faf8f3';

function mark(size: number) {
  return (
    <div
      style={{
        width: `${size}px`,
        height: `${size}px`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: FOREST_DEEP,
        fontFamily: 'sans-serif',
      }}
    >
      <div
        style={{
          display: 'flex',
          fontSize: `${size * 0.52}px`,
          fontWeight: 700,
          color: WARM_WHITE,
          letterSpacing: '-0.04em',
        }}
      >
        C
        <span style={{ color: SAGE }}>i</span>
      </div>
    </div>
  );
}

async function write(target: string, size: number) {
  const image = new ImageResponse(mark(size), { width: size, height: size });
  const buffer = Buffer.from(await image.arrayBuffer());
  const out = join(process.cwd(), target);
  writeFileSync(out, buffer);
  console.log(`wrote ${target} (${size}x${size}, ${buffer.length} bytes)`);
}

async function main() {
  await write(join('public', 'icon.png'), 512);
  await write(join('app', 'apple-icon.png'), 180);
}

main();
