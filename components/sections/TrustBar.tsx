// Trust signals: no login, MiFID disclaimer, Belgian focus, free
export default function TrustBar() {
  const items = [
    { icon: '🇧🇪', label: 'Conçu pour la Belgique' },
    { icon: '🔓', label: 'Sans inscription' },
    { icon: '📚', label: 'Éducatif uniquement' },
    { icon: '✓', label: 'Gratuit' },
  ];

  return (
    <section className="border-y border-warm-tan/30 bg-warm-cream py-6">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-8 px-6">
        {items.map((item) => (
          <div key={item.label} className="flex items-center gap-2 text-sm text-charcoal/70">
            <span>{item.icon}</span>
            <span>{item.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
