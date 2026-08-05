/**
 * Escape hatch for message keys that are assembled at runtime.
 *
 * next-intl types `t()` against a union of literal message keys. That is a real
 * benefit for static keys, but it rejects keys built from data — product ids,
 * broker ids, table row keys — which the site does in a lot of places.
 *
 * The previous workaround was `t(\`${id}.name\` as any)` at every call site
 * (70 of them). Widening the translator once per component keeps the literal-key
 * checking everywhere else and keeps `any` out of the codebase entirely.
 */
export type DynamicTranslator = (
  key: string,
  values?: Record<string, string | number | Date>,
) => string;

/** Widens a next-intl translator to accept runtime-built keys. */
export function asDynamic(t: unknown): DynamicTranslator {
  return t as DynamicTranslator;
}
