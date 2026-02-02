import { evaluationData } from "@/data/evaluationData";

export function ScoreDistribution() {
  const { models, modelLabels, tasks } = evaluationData;

  // For each model, count tasks at each score level
  const scoreLevels = [0, 0.33, 0.67, 1];
  const labelMap: Record<number, string> = { 0: "0%", 0.33: "33%", 0.67: "67%", 1: "100%" };

  return (
    <section className="mx-auto max-w-5xl px-6 py-10">
      <div className="flex items-center gap-3 mb-6">
        <span className="font-mono text-xs text-[var(--ink-tertiary)]">04</span>
        <div className="w-8 h-px bg-[var(--rule)]" />
      </div>

      <h2 className="font-serif text-[2rem] tracking-[-0.01em] mb-4">
        Score Distribution by Model
      </h2>

      <p className="text-[var(--ink-secondary)] leading-relaxed max-w-2xl mb-8">
        Each dot represents one task. Scores reflect the pass rate across 3
        independent runs (0%, 33%, 67%, or 100%). The clustering reveals how
        consistently each model succeeds or fails.
      </p>

      <div className="space-y-6">
        {models.map((model) => {
          const label = modelLabels[model] || model;
          const scores = tasks.map((t) => t.scores[model]);

          // Count at each level
          const counts: Record<number, number> = {};
          for (const level of scoreLevels) counts[level] = 0;
          for (const s of scores) {
            // Round to nearest level
            const nearest = scoreLevels.reduce((a, b) =>
              Math.abs(b - s) < Math.abs(a - s) ? b : a
            );
            counts[nearest]++;
          }

          return (
            <div key={model}>
              <div className="flex items-baseline gap-3 mb-2">
                <span className="text-sm font-medium w-36 sm:w-44 shrink-0">
                  {label}
                </span>
                <span className="font-mono text-xs text-[var(--ink-tertiary)]">
                  {Math.round(
                    (scores.reduce((a, b) => a + b, 0) / scores.length) * 100
                  )}% avg
                </span>
              </div>

              <div className="flex items-end gap-px h-16">
                {scoreLevels.map((level) => {
                  const count = counts[level];
                  const maxCount = Math.max(
                    ...Object.values(counts),
                    1
                  );
                  const heightPct = (count / maxCount) * 100;

                  return (
                    <div key={level} className="flex-1 flex flex-col items-center gap-1">
                      <div className="w-full flex justify-center">
                        <div className="relative w-full max-w-16 h-16 flex items-end justify-center">
                          <div
                            className="w-full transition-all"
                            style={{
                              height: `${heightPct}%`,
                              backgroundColor:
                                level === 0
                                  ? "var(--rule)"
                                  : level < 0.5
                                    ? "var(--rule-strong)"
                                    : level < 0.8
                                      ? "var(--accent-muted)"
                                      : "var(--accent)",
                              minHeight: count > 0 ? "4px" : "0px",
                            }}
                          />
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="font-mono text-[10px] text-[var(--ink-tertiary)]">
                          {labelMap[level]}
                        </div>
                        <div className="font-mono text-xs font-medium">
                          {count}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      <p className="font-mono text-[11px] text-[var(--ink-tertiary)] mt-6">
        Fig. 4 — Distribution of task-level pass rates per model. Each bar shows
        the count of tasks at that score level (0/3, 1/3, 2/3, 3/3 runs passed).
      </p>
    </section>
  );
}
