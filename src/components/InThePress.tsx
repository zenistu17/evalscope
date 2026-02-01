import { pressQuotes } from "@/data/research";

export function InThePress() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-10">
      <div className="flex items-center gap-3 mb-6">
        <span className="font-mono text-xs text-[var(--ink-tertiary)]">09</span>
        <div className="w-8 h-px bg-[var(--rule)]" />
      </div>

      <h2 className="font-serif text-[2rem] tracking-[-0.01em] mb-4">
        In the Press
      </h2>

      <p className="text-[var(--ink-secondary)] leading-relaxed max-w-2xl mb-8">
        What industry observers are saying about GDPVAL.
      </p>

      <div className="space-y-8">
        {pressQuotes.map((pq, i) => (
          <article key={i} className="border-l border-[var(--rule)] pl-6">
            <p className="font-serif italic text-[var(--ink)] leading-relaxed mb-2">
              "{pq.quote}"
            </p>
            {pq.attribution && (
              <p className="text-xs text-[var(--ink-secondary)] mb-1">
                -- {pq.attribution}
              </p>
            )}
            <a
              href={pq.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[11px] text-[var(--ink-tertiary)] hover:text-[var(--accent)] transition-colors"
            >
              {pq.publication}, {pq.date}
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}
