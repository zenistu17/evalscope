import { modelResultsData } from "@/data/modelResultsData";

export function PerformanceGap() {
  const { gdpvalComparison, gdpvalMethodNote, gdpvalSource } =
    modelResultsData;

  return (
    <section className="mx-auto max-w-5xl px-6 py-10">
      <div className="flex items-center gap-3 mb-6">
        <span className="font-mono text-xs text-[var(--ink-tertiary)]">02</span>
        <div className="w-8 h-px bg-[var(--rule)]" />
      </div>

      <h2 className="font-serif text-[2rem] tracking-[-0.01em] mb-3">
        Same Models. Harder Tasks.
      </h2>

      <p className="text-[var(--ink-secondary)] leading-relaxed max-w-2xl mb-10">
        Two models appear in both the GDPval benchmark (OpenAI, 2025) and
        Parsewave's professional task set. Both score substantially lower on
        Parsewave tasks.
      </p>

      <div className="space-y-8 mb-8">
        {gdpvalComparison.map((entry) => (
          <div key={entry.model}>
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium">{entry.model}</span>
              <span className="font-mono text-sm font-semibold text-[var(--accent)]">
                {entry.delta > 0 ? "+" : ""}
                {entry.delta} pp
              </span>
            </div>

            {/* GDPval bar */}
            <div className="flex items-center gap-4 mb-2">
              <span className="font-mono text-[11px] text-[var(--ink-tertiary)] w-28 shrink-0">
                GDPval
              </span>
              <div className="flex-1 h-8 bg-[var(--surface-raised)] relative overflow-hidden">
                <div
                  className="h-full bg-[var(--rule-strong)]"
                  style={{ width: `${entry.gdpvalScore}%` }}
                />
              </div>
              <span className="font-mono text-xs text-[var(--ink-secondary)] w-20 text-right shrink-0">
                {entry.gdpvalScore}%
              </span>
            </div>

            {/* Parsewave bar */}
            <div className="flex items-center gap-4">
              <span className="font-mono text-[11px] text-[var(--ink-tertiary)] w-28 shrink-0">
                Parsewave
              </span>
              <div className="flex-1 h-8 bg-[var(--surface-raised)] relative overflow-hidden">
                <div
                  className="h-full bg-[var(--accent)]"
                  style={{ width: `${entry.parsewaveRate}%` }}
                />
              </div>
              <span className="font-mono text-xs text-[var(--ink-secondary)] w-20 text-right shrink-0">
                {entry.parsewaveRate}%
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Methodology disclosure */}
      <div className="border-l-2 border-[var(--accent)] p-4 mb-6">
        <h3 className="text-sm font-semibold text-[var(--ink)] mb-2">
          Different metrics - directional comparison only
        </h3>
        <p className="text-sm text-[var(--ink-secondary)] leading-relaxed">
          {gdpvalMethodNote}
        </p>
      </div>

      <p className="font-mono text-[11px] text-[var(--ink-tertiary)]">
        Fig. 2 - Performance gap for models appearing in both evaluations.
        GDPval scores from{" "}
        <a
          href={gdpvalSource}
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-[var(--ink-secondary)]"
        >
          arXiv:2510.04374
        </a>
        . Parsewave scores from internal evaluation, December 2025.
      </p>
    </section>
  );
}
