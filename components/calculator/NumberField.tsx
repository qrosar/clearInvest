'use client';

import { useState } from 'react';

interface Props {
  value: number;
  min: number;
  max: number;
  onCommit: (value: number) => void;
  /** Render 0 as an empty field with this placeholder */
  zeroPlaceholder?: string;
  /** Decimal places kept when normalising on blur (0 = integers only) */
  decimals?: number;
  className?: string;
  ariaLabel?: string;
}

/**
 * Numeric text field that lets you finish typing before it clamps.
 *
 * A plain `<input type="number">` with min/max clamped on every keystroke makes
 * multi-digit entry impossible on mobile: typing "25" into a min-5 field turns
 * the first keystroke ("2") into 5, so you end up with 55. Here the draft string
 * is kept as-is while editing and only committed once it parses inside the
 * allowed range; the min bound is enforced on blur instead of per-keystroke.
 */
export default function NumberField({
  value, min, max, onCommit, zeroPlaceholder, decimals = 0, className, ariaLabel,
}: Props) {
  const format = (n: number) => (n === 0 && zeroPlaceholder ? '' : String(Number(n.toFixed(decimals))));

  const [draft, setDraft] = useState(() => format(value));
  // Focus lives in state, not a ref, so the sync-on-prop-change below can read
  // it during render without reaching into a ref.
  const [focused, setFocused] = useState(false);

  // Keep in sync when the value changes elsewhere (slider, stepper, pension lock).
  // Adjusting during render rather than in an effect is React's documented
  // pattern for deriving state from a changed prop: it re-renders before the
  // browser paints, so the field never shows a stale figure, and it avoids the
  // extra commit an effect would cost on every slider tick.
  const [lastValue, setLastValue] = useState(value);
  if (value !== lastValue) {
    setLastValue(value);
    if (!focused) setDraft(format(value));
  }

  function handleChange(raw: string) {
    // Accept digits plus one separator; normalise comma for fr-BE keyboards
    const cleaned = raw.replace(',', '.').replace(/[^0-9.]/g, '');
    setDraft(cleaned);

    if (cleaned === '') return;
    const n = Number(cleaned);
    if (!Number.isFinite(n)) return;

    if (n > max) {
      // Above the ceiling there is nothing sensible left to type — snap now
      setDraft(format(max));
      onCommit(max);
    } else if (n >= min) {
      onCommit(Number(n.toFixed(decimals)));
    }
    // Below min: hold the draft, let the user keep typing digits
  }

  function handleBlur() {
    setFocused(false);
    const n = Number(draft);
    if (draft === '' || !Number.isFinite(n)) {
      // Empty is a real value only when zero is allowed
      const fallback = min === 0 ? 0 : value;
      setDraft(format(fallback));
      onCommit(fallback);
      return;
    }
    const clamped = Number(Math.min(max, Math.max(min, n)).toFixed(decimals));
    setDraft(format(clamped));
    onCommit(clamped);
  }

  return (
    <input
      type="text"
      inputMode={decimals > 0 ? 'decimal' : 'numeric'}
      enterKeyHint="done"
      aria-label={ariaLabel}
      value={draft}
      placeholder={zeroPlaceholder}
      onFocus={e => { setFocused(true); e.currentTarget.select(); }}
      onChange={e => handleChange(e.target.value)}
      onBlur={handleBlur}
      onKeyDown={e => { if (e.key === 'Enter') e.currentTarget.blur(); }}
      className={className}
    />
  );
}
