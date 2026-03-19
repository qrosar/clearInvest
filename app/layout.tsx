// Root layout — required by Next.js but kept minimal.
// The [locale] segment layout provides <html> and <body>.
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
