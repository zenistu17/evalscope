import { modelResultsData } from "@/data/modelResultsData";

const BAR_COLORS = [
  "var(--accent)",
  "var(--ink-secondary)",
  "var(--ink-tertiary)",
  "var(--rule-strong)",
];

export function ModelPerformance() {
  const { models, oraclePassRate, totalTasks, attemptsPerTask, judge } =
    modelResultsData;

  return (
    <section className="mx-auto max-w-5xl px-6 py-10">
      <div className="flex items-center gap-3 mb-6">
        <span className="font-mono text-xs text-[var(--ink-tertiary)]">01</span>
        <div className="w-8 h-px bg-[var(--rule)]" />
      </div>

      <h2 className="font-serif text-[2rem] tracking-[-0.01em] mb-3">
        Model Performance on {totalTasks} Professional Tasks
      </h2>

      <p className="text-[var(--ink-secondary)] leading-relaxed max-w-2xl mb-10">
        Pass rate across {models[0].attempts} attempts ({attemptsPerTask} per
        task), binary pass/fail, {judge} rubric judge.
      </p>

      <div className="space-y-6">
        {/* Oracle baseline */}
        <div>
          <div className="flex items-center gap-4 mb-1">
            <span className="text-sm text-[var(--ink-secondary)] w-44 shrink-0">
              Oracle Baseline
            </span>
            <div className="flex-1 h-10 bg-[var(--surface-raised)] relative overflow-hidden">
              <div
                className="h-full bg-[var(--surface-sunken)]"
                style={{ width: `${oraclePassRate}%` }}
              />
            </div>
            <span className="font-mono text-sm font-semibold w-16 text-right shrink-0">
              {oraclePassRate}%
            </span>
          </div>
          <div className="ml-48 pl-4">
            <span className="font-mono text-[11px] text-[var(--ink-tertiary)]">
              Human expert solutions evaluated by same judge
            </span>
          </div>
        </div>

        {/* Separator */}
        <div className="border-b border-dashed border-[var(--rule)]" />

        {/* Model bars */}
        {models.map((model, i) => (
          <div key={model.name}>
            <div className="flex items-center gap-4 mb-1">
              <div className="w-44 shrink-0">
                <span className="text-sm font-medium">{model.name}</span>
                <span className="block font-mono text-[10px] text-[var(--ink-tertiary)]">
                  {model.provider}
                </span>
              </div>
              <div className="flex-1 h-10 bg-[var(--surface-raised)] relative overflow-hidden">
                <div
                  className="h-full"
                  style={{
                    width: `${model.passRate}%`,
                    backgroundColor: BAR_COLORS[i],
                  }}
                />
              </div>
              <span className="font-mono text-sm font-semibold w-16 text-right shrink-0">
                {model.passRate}%
              </span>
            </div>
            <div className="ml-48 pl-4">
              <span className="font-mono text-[11px] text-[var(--ink-tertiary)]">
                {model.passed} of {model.attempts} attempts
              </span>
            </div>
          </div>
        ))}
      </div>

      <p className="font-mono text-[11px] text-[var(--ink-tertiary)] mt-8">
        Fig. 1 - Pass rates on {totalTasks} Parsewave professional tasks. Each
        model given {attemptsPerTask} independent attempts per task. Binary
        pass/fail judged by {judge} against task-specific rubric criteria.
        Oracle: human expert solutions evaluated by same judge ({oraclePassRate}%
        pass rate). Evaluated December 2025.
      </p>
    </section>
  );
}
