import { benchmarks } from "@/data/benchmarks";

const sorted = [...benchmarks]
  .map((b) => ({
    shortName: b.shortName,
    topModelScore: b.topModelScore,
    topModel: b.topModel,
    color: b.color,
    isGDPVAL: b.isGDPVAL,
  }))
  .sort((a, b) => b.topModelScore - a.topModelScore);

export function KeyInsights() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-10">
      <div className="flex items-center gap-3 mb-6">
        <span className="font-mono text-xs text-[var(--ink-tertiary)]">01</span>
        <div className="w-8 h-px bg-[var(--rule)]" />
      </div>

      <h2 className="font-serif text-[2rem] tracking-[-0.01em] mb-4">
        What Our Tasks Revealed
      </h2>

      <p className="text-[var(--ink-secondary)] leading-relaxed max-w-2xl mb-8">
        Parsewave's 214 tasks for GDPVAL showed that the best AI model scores
        just 51.6%. Here is how that compares across benchmarks -- our tasks
        take 7-10 hours and test real professional deliverables, not
        multiple-choice questions.
      </p>

      <div className="space-y-3">
        {sorted.map((b) => (
          <div key={b.shortName} className="flex items-center gap-4">
            <div className="w-16 text-sm font-mono shrink-0 text-right">
              {b.shortName}
            </div>
            <div className="flex-1 h-2 bg-[var(--surface-raised)] relative">
              <div
                className="h-full absolute left-0 top-0"
                style={{
                  width: `${b.topModelScore}%`,
                  backgroundColor: b.isGDPVAL ? "var(--accent)" : "#bbb",
                }}
              />
            </div>
            <div className="shrink-0 flex items-baseline gap-2">
              <span className={`font-mono text-sm ${b.isGDPVAL ? "font-semibold" : ""}`}>
                {b.topModelScore}%
              </span>
              <span className="text-xs text-[var(--ink-tertiary)] hidden sm:inline">
                {b.topModel}
              </span>
            </div>
          </div>
        ))}
      </div>

      <p className="font-mono text-[11px] text-[var(--ink-tertiary)] mt-6">
        Fig. 0 - Top model scores across 8 benchmarks. Higher is better.
        GDPVAL (Parsewave) highlighted in blue.
      </p>
    </section>
  );
}
