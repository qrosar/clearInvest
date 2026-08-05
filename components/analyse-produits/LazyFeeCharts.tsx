'use client';

import dynamic from 'next/dynamic';

// Recharts is the heaviest client dependency on the site. These charts sit far
// below the fold on long-form product analyses, so the library is fetched only
// once the page is actually being read rather than on first paint.
//
// Server components can't pass `ssr: false` to next/dynamic, hence this thin
// client boundary.

const ChartSkeleton = () => (
  <div
    aria-hidden
    className="h-[320px] w-full animate-pulse rounded-xl bg-[var(--warm-cream)]"
  />
);

export const PensionFeeChart = dynamic(() => import('./PensionFeeChart'), {
  ssr: false,
  loading: ChartSkeleton,
});
