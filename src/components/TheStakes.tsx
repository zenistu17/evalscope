import { stakes, expertQuotes } from "@/data/research";

export function TheStakes() {
  const openaiQuote = expertQuotes.find((q) => q.attribution === "OpenAI")!;

  return (
    <section className="mx-auto max-w-5xl px-6 py-10">
      <div className="flex items-center gap-3 mb-6">
        <span className="font-mono text-xs text-[var(--ink-tertiary)]">08</span>
        <div className="w-8 h-px bg-[var(--rule)]" />
      </div>

      <h2 className="font-serif text-[2rem] tracking-[-0.01em] mb-4">
        The Stakes
      </h2>

      <p className="text-[var(--ink-secondary)] leading-relaxed max-w-2xl mb-8">
        The AI evaluation market is massive and growing. Parsewave builds the
        professional-grade tasks that measure real AI capability.
      </p>

      <div className="grid md:grid-cols-2 gap-x-12 gap-y-8 mb-10">
        {stakes.map((s) => (
          <div key={s.value}>
            <div className="font-mono text-3xl font-medium tracking-tight text-[var(--ink)] mb-2">
              {s.value}
            </div>
            <p className="text-sm text-[var(--ink-secondary)] leading-relaxed mb-1">
              {s.description}
            </p>
            <a
              href={s.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[11px] text-[var(--ink-tertiary)] hover:text-[var(--accent)] transition-colors"
            >
              {s.source}
            </a>
          </div>
        ))}
      </div>

      <blockquote className="border-l-2 border-[var(--accent)] pl-6 py-2">
        <p className="font-serif italic text-lg text-[var(--ink)] leading-relaxed mb-2">
          "{openaiQuote.quote}"
        </p>
        <cite className="text-sm text-[var(--ink-tertiary)] not-italic">
          -- {openaiQuote.attribution},{" "}
          <a
            href={openaiQuote.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[var(--accent)] transition-colors"
          >
            {openaiQuote.source}
          </a>
        </cite>
        <p className="text-xs text-[var(--ink-tertiary)] mt-3">
          This is why OpenAI chose Parsewave to build GDPVAL's 214 professional evaluation tasks.
        </p>
      </blockquote>
    </section>
  );
}
