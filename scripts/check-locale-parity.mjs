/**
 * Fails if the three locale bundles don't carry exactly the same keys.
 *
 * A missing key used to surface as a MISSING_MESSAGE at prerender time, which
 * means it reached a build (or a reader) before anyone noticed. This turns it
 * into a failed check instead.
 *
 * Run with:  node scripts/check-locale-parity.mjs
 */
import { readFileSync } from 'node:fs';

const LOCALES = ['fr', 'nl', 'en'];
const REFERENCE = 'fr';

function flatten(obj, prefix = '', out = new Set()) {
  for (const [k, v] of Object.entries(obj)) {
    const key = prefix ? `${prefix}.${k}` : k;
    if (v && typeof v === 'object') flatten(v, key, out);
    else out.add(key);
  }
  return out;
}

const keys = Object.fromEntries(
  LOCALES.map(l => [
    l,
    flatten(JSON.parse(readFileSync(new URL(`../messages/${l}.json`, import.meta.url), 'utf8'))),
  ]),
);

let failed = false;

for (const locale of LOCALES) {
  if (locale === REFERENCE) continue;

  const missing = [...keys[REFERENCE]].filter(k => !keys[locale].has(k));
  const extra = [...keys[locale]].filter(k => !keys[REFERENCE].has(k));

  if (missing.length) {
    failed = true;
    console.error(`\n${locale}: ${missing.length} key(s) missing vs ${REFERENCE}`);
    missing.forEach(k => console.error(`  - ${k}`));
  }
  if (extra.length) {
    failed = true;
    console.error(`\n${locale}: ${extra.length} key(s) not present in ${REFERENCE}`);
    extra.forEach(k => console.error(`  + ${k}`));
  }
}

if (failed) process.exit(1);

console.log(`locale parity ok — ${keys[REFERENCE].size} keys in ${LOCALES.join(', ')}`);
