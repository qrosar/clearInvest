'use client';

import { useState, useRef } from 'react';
import { createPortal } from 'react-dom';

interface Props {
  text: string;
}

export default function TerInfoIcon({ text }: Props) {
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);
  const iconRef = useRef<HTMLSpanElement>(null);

  function show() {
    if (!iconRef.current) return;
    const r = iconRef.current.getBoundingClientRect();
    setPos({ x: r.left + r.width / 2, y: r.top });
  }

  function hide() {
    setPos(null);
  }

  return (
    <>
      <span
        ref={iconRef}
        onMouseEnter={show}
        onMouseLeave={hide}
        className="flex h-3.5 w-3.5 cursor-default select-none items-center justify-center rounded-full border border-[var(--charcoal)]/25 text-[9px] leading-none text-[var(--charcoal)]/40"
      >
        i
      </span>

      {pos &&
        createPortal(
          <div
            role="tooltip"
            style={{
              position: 'fixed',
              left: `${pos.x}px`,
              top: `${pos.y - 10}px`,
              transform: 'translate(-50%, -100%)',
              zIndex: 9999,
              maxWidth: 'min(280px, calc(100vw - 2rem))',
            }}
            className="pointer-events-none whitespace-pre-wrap rounded-lg bg-[var(--charcoal)] px-3 py-2 text-[11px] leading-relaxed text-white shadow-xl"
          >
            {text}
            {/* Arrow pointing down toward icon */}
            <span
              aria-hidden
              style={{
                position: 'absolute',
                left: '50%',
                top: '100%',
                transform: 'translateX(-50%)',
                width: 0,
                height: 0,
                borderLeft: '5px solid transparent',
                borderRight: '5px solid transparent',
                borderTop: `5px solid var(--charcoal)`,
              }}
            />
          </div>,
          document.body
        )}
    </>
  );
}
