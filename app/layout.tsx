import type { Viewport } from 'next';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

// Root layout — required by Next.js 16, but deliberately minimal.
//
// <html> and <body> live in app/[locale]/layout.tsx, the first layout with
// access to the locale segment. Deriving `lang` there rather than here is what
// keeps the tree statically prerenderable: any dynamic API in this file
// (headers(), cookies()) opts every route out of static generation.
//
// app/not-found.tsx carries its own <html>/<body> for requests that never
// reach the [locale] segment.
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
