import { evaluationData } from "@/data/evaluationData";

export function HeadlineFinding() {
  const { models, modelLabels, aggregateScores } = evaluationData;

  // Sort models by score descending for display
  const sorted = [...models].sort(
    (a, b) => aggregateScores[b] - aggregateScores[a]
  );

  const maxScore = Math.max(...sorted.map((m) => aggregateScores[m]));

  // Count occupations where each model leads
  const leaderCounts: Record<string, number> = {};
  for (const m of models) leaderCounts[m] = 0;
  for (const occ of evaluationData.occupations) {
    if (occ.bestModel) leaderCounts[occ.bestModel]++;
  }

  return (
    <section className="mx-auto max-w-5xl px-6 py-10">
      <div className="flex items-center gap-3 mb-6">
        <span className="font-mono text-xs text-[var(--ink-tertiary)]">01</span>
        <div className="w-8 h-px bg-[var(--rule)]" />
      </div>

      <h2 className="font-serif text-[2rem] tracking-[-0.01em] mb-4">
        The best AI model depends on what work you need done.
      </h2>

      <p className="text-[var(--ink-secondary)] leading-relaxed max-w-2xl mb-8">
        Across 26 professional tasks, GPT-5.2 and Claude Sonnet 4.5 are
        statistically tied at ~32%. But Gemini 3 Pro leads in the most
        individual occupations despite ranking third overall. No single model
        dominates.
      </p>

      <div className="space-y-4">
        {sorted.map((model) => {
          const score = aggregateScores[model];
          const pct = Math.round(score * 100);
          const label = modelLabels[model] || model;
          const leads = leaderCounts[model];

          return (
            <div key={model} className="flex items-center gap-4">
              <div className="w-36 sm:w-44 shrink-0">
                <div className="text-sm font-medium truncate">{label}</div>
                <div className="text-[11px] font-mono text-[var(--ink-tertiary)]">
                  {leads > 0 ? `leads ${leads} occupation${leads > 1 ? "s" : ""}` : "leads 0 occupations"}
                </div>
              </div>
              <div className="flex-1 h-5 bg-[var(--surface-raised)] relative">
                <div
                  className="h-full absolute left-0 top-0 transition-all"
                  style={{
                    width: `${(score / maxScore) * 100}%`,
                    backgroundColor: score === maxScore ? "var(--accent)" : "var(--rule-strong)",
                  }}
                />
              </div>
              <div className="font-mono text-sm w-10 text-right shrink-0">
                {pct}%
              </div>
            </div>
          );
        })}
      </div>

      <p className="font-mono text-[11px] text-[var(--ink-tertiary)] mt-6">
        Fig. 1 — Aggregate pass rates across 26 professional tasks. Scores represent
        the proportion of 3 independent evaluation runs each task was passed.
      </p>
    </section>
  );
}
