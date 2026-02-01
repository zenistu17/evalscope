const stats = [
  { value: "214", label: "professional-grade tasks delivered" },
  { value: "14yr", label: "average expert experience" },
  { value: "36", label: "occupations across 9 industries" },
];

export function KeyInsights() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-10">
      <div className="flex items-center gap-3 mb-6">
        <span className="font-mono text-xs text-[var(--ink-tertiary)]">01</span>
        <div className="w-8 h-px bg-[var(--rule)]" />
      </div>

      <h2 className="font-serif text-[2rem] tracking-[-0.01em] mb-4">
        The Landscape at a Glance
      </h2>

      <p className="text-[var(--ink-secondary)] leading-relaxed max-w-2xl mb-6">
        As AI systems move from answering trivia to performing professional work,
        the question shifts from "how smart is it?" to "can it do my job?"
        GDPVAL is the first benchmark designed to answer the latter across the
        full breadth of the economy. Parsewave built every one of its 214 tasks.
        Here is how it compares.
      </p>

      <div className="flex items-stretch divide-x divide-[var(--rule)]">
        {stats.map((s) => (
          <div key={s.value} className="flex-1 px-8 first:pl-0 last:pr-0">
            <div className="font-mono text-4xl font-medium tracking-tight mb-2">
              {s.value}
            </div>
            <div className="text-sm text-[var(--ink-secondary)] leading-snug">
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
