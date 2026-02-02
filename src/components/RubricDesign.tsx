import { taskQualityData } from "@/data/taskQualityData";

const LEVELS = [
  {
    label: "Needs Improvement",
    range: "1–3",
    color: "var(--surface-sunken)",
    textColor: "var(--ink-tertiary)",
  },
  {
    label: "Basic",
    range: "4–6",
    color: "var(--rule)",
    textColor: "var(--ink-secondary)",
  },
  {
    label: "Proficient",
    range: "7–8",
    color: "var(--accent-muted)",
    textColor: "var(--accent-strong)",
  },
  {
    label: "Exemplary",
    range: "9–10",
    color: "var(--accent)",
    textColor: "white",
  },
];

export function RubricDesign() {
  const { stats, keyMetrics } = taskQualityData;

  // Rubric criteria count distribution for visualization
  const criteriaEntries = Object.entries(stats.rubricCriteria.distribution)
    .map(([count, freq]) => ({ count: Number(count), freq: Number(freq) }))
    .filter((e) => e.count > 0)
    .sort((a, b) => a.count - b.count);
  const maxCriteriaFreq = Math.max(...criteriaEntries.map((e) => e.freq));

  return (
    <section className="mx-auto max-w-5xl px-6 py-10">
      <div className="flex items-center gap-3 mb-6">
        <span className="font-mono text-xs text-[var(--ink-tertiary)]">04</span>
        <div className="w-8 h-px bg-[var(--rule)]" />
      </div>

      <h2 className="font-serif text-[2rem] tracking-[-0.01em] mb-3">
        Scoring That Captures Work Quality
      </h2>

      <p className="text-[var(--ink-secondary)] leading-relaxed max-w-2xl mb-8">
        Instead of binary pass/fail, each task uses a multi-criteria rubric with
        four quality levels per criterion. This captures the quality gradients
        that define professional work.
      </p>

      {/* Side-by-side comparison */}
      <div className="grid md:grid-cols-2 gap-6 mb-10">
        <div className="p-5 bg-[var(--surface-raised)]">
          <h3 className="font-mono text-xs text-[var(--ink-tertiary)] uppercase tracking-wider mb-3">
            Industry Benchmarks
          </h3>
          <div className="space-y-2 text-sm text-[var(--ink-secondary)]">
            <div className="flex items-center gap-2">
              <span className="text-[var(--ink-tertiary)]">&bull;</span>
              Binary scoring: correct or incorrect
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[var(--ink-tertiary)]">&bull;</span>
              No partial credit
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[var(--ink-tertiary)]">&bull;</span>
              Single right answer
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[var(--ink-tertiary)]">&bull;</span>1 point
              per question
            </div>
          </div>
        </div>

        <div className="p-5 bg-[var(--accent-muted)] border border-[var(--accent)]">
          <h3 className="font-mono text-xs text-[var(--accent)] uppercase tracking-wider mb-3">
            Parsewave Rubrics
          </h3>
          <div className="space-y-2 text-sm text-[var(--ink)]">
            <div className="flex items-center gap-2">
              <span className="text-[var(--accent)]">&bull;</span>
              {keyMetrics.avgRubricPoints} avg points per task
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[var(--accent)]">&bull;</span>
              {keyMetrics.avgCriteriaCount} avg criteria per task
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[var(--accent)]">&bull;</span>4 quality
              levels per criterion
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[var(--accent)]">&bull;</span>
              Domain-specific professional standards
            </div>
          </div>
        </div>
      </div>

      {/* Example rubric structure */}
      <div className="mb-10">
        <h3 className="font-mono text-xs text-[var(--ink-tertiary)] uppercase tracking-wider mb-4">
          Rubric structure (anonymized)
        </h3>

        <div className="bg-[var(--surface-raised)] p-5">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium">
              Criterion: [Domain-Specific Requirement]
            </span>
            <span className="font-mono text-xs text-[var(--ink-tertiary)]">
              10 points
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {LEVELS.map((level) => (
              <div
                key={level.label}
                className="p-3 text-center"
                style={{
                  backgroundColor: level.color,
                  color: level.textColor,
                }}
              >
                <div className="text-xs font-medium">{level.label}</div>
                <div className="font-mono text-sm mt-1">{level.range}</div>
              </div>
            ))}
          </div>

          <p className="text-xs text-[var(--ink-tertiary)] mt-3 italic">
            &ldquo;Meets [PROFESSIONAL STANDARD] with accurate [DOMAIN METRIC]
            and complete [DELIVERABLE COMPONENT]...&rdquo;
          </p>
        </div>

        <p className="text-sm text-[var(--ink-secondary)] mt-3">
          &times; {keyMetrics.avgCriteriaCount} criteria per task average ={" "}
          {keyMetrics.avgRubricPoints} total points
        </p>
      </div>

      {/* Criteria count distribution */}
      <div>
        <h3 className="font-mono text-xs text-[var(--ink-tertiary)] uppercase tracking-wider mb-4">
          Criteria per task distribution
        </h3>

        <div className="flex items-end gap-1 h-24">
          {criteriaEntries.map(({ count, freq }) => (
            <div key={count} className="flex-1 flex flex-col items-center gap-1">
              <div
                className="w-full bg-[var(--accent)]"
                style={{
                  height: `${(freq / maxCriteriaFreq) * 80}px`,
                }}
              />
              <span className="font-mono text-[10px] text-[var(--ink-tertiary)]">
                {count}
              </span>
            </div>
          ))}
        </div>
        <p className="font-mono text-[10px] text-[var(--ink-tertiary)] mt-1">
          Number of scoring criteria per task
        </p>
      </div>

      <div className="mt-4 text-xs text-[var(--ink-tertiary)]">
        {stats.percent4LevelRubric}% of tasks use the standard 4-level rubric
        format.
      </div>

      <p className="font-mono text-[11px] text-[var(--ink-tertiary)] mt-6">
        Fig. 4 &mdash; Rubric structure and scoring methodology. Each criterion
        uses domain-specific professional standards as quality benchmarks.
      </p>
    </section>
  );
}
