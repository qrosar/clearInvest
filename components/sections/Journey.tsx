// Narrative flow: why invest → inflation → ETFs → action
export default function Journey() {
  return (
    <section className="bg-warm-white px-6 py-24">
      <div className="mx-auto max-w-4xl">
        <h2 className="text-center text-3xl font-heading font-semibold text-forest md:text-4xl">
          Pourquoi investir maintenant ?
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-charcoal/70">
          {/* placeholder — narrative content goes here */}
          Section narrative à compléter.
        </p>

        {/* Steps placeholder */}
        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {['Le problème', 'La solution', 'Le plan'].map((step, i) => (
            <div key={step} className="rounded-2xl bg-sage-pale p-8">
              <span className="text-3xl font-heading font-bold text-sage">
                0{i + 1}
              </span>
              <h3 className="mt-3 text-lg font-semibold text-forest">{step}</h3>
              <p className="mt-2 text-sm text-charcoal/60">Contenu à venir.</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
