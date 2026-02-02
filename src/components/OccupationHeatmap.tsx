import { useState } from "react";
import { evaluationData } from "@/data/evaluationData";

function pctColor(value: number): string {
  if (value === 0) return "var(--surface-raised)";
  // Scale from light blue to dark blue
  const intensity = Math.min(value, 1);
  const r = Math.round(26 + (250 - 26) * (1 - intensity));
  const g = Math.round(86 + (250 - 86) * (1 - intensity));
  const b = Math.round(219 + (250 - 219) * (1 - intensity));
  return `rgb(${r}, ${g}, ${b})`;
}

function textColor(value: number): string {
  return value > 0.6 ? "#fff" : "var(--ink)";
}

export function OccupationHeatmap() {
  const { models, modelLabels, occupations, tasks } = evaluationData;
  const [expanded, setExpanded] = useState<string | null>(null);

  // Only show occupations with at least some non-zero scores
  const activeOccupations = occupations.filter(
    (o) => Object.values(o.scores).some((s) => s > 0)
  );
  const zeroOccupations = occupations.filter(
    (o) => Object.values(o.scores).every((s) => s === 0)
  );

  // Find overall best model
  const overallBest = models.reduce((a, b) =>
    evaluationData.aggregateScores[a] >= evaluationData.aggregateScores[b] ? a : b
  );

  return (
    <section className="mx-auto max-w-5xl px-6 py-10">
      <div className="flex items-center gap-3 mb-6">
        <span className="font-mono text-xs text-[var(--ink-tertiary)]">02</span>
        <div className="w-8 h-px bg-[var(--rule)]" />
      </div>

      <h2 className="font-serif text-[2rem] tracking-[-0.01em] mb-4">
        How AI Performance Varies by Occupation
      </h2>

      <p className="text-[var(--ink-secondary)] leading-relaxed max-w-2xl mb-8">
        Each cell shows the average pass rate for a model on tasks in that
        occupation. Darker cells indicate higher performance. Click a row to see
        individual task scores.
      </p>

      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="border-b-2 border-[var(--ink)]">
              <th className="text-left py-3 pr-4 font-medium text-[var(--ink-secondary)] text-xs uppercase tracking-wider w-56">
                Occupation
              </th>
              <th className="py-3 px-1 text-center font-medium text-[var(--ink-secondary)] text-[10px] uppercase tracking-wider w-8">
                n
              </th>
              {models.map((m) => (
                <th
                  key={m}
                  className="py-3 px-2 font-medium text-[var(--ink-secondary)] text-[10px] uppercase tracking-wider text-center"
                >
                  {(modelLabels[m] || m).split(" ").slice(0, 2).join(" ")}
                </th>
              ))}
              <th className="py-3 pl-3 text-left font-medium text-[var(--ink-secondary)] text-[10px] uppercase tracking-wider">
                Leader
              </th>
            </tr>
          </thead>
          <tbody>
            {activeOccupations.map((occ) => {
              const isExpanded = expanded === occ.occupation;
              const occTasks = tasks.filter(
                (t) => t.occupation === occ.occupation && Object.values(t.scores).some((s) => s > 0)
              );

              return (
                <OccupationRow
                  key={occ.occupation}
                  occ={occ}
                  models={models}
                  modelLabels={modelLabels}
                  overallBest={overallBest}
                  isExpanded={isExpanded}
                  onToggle={() => setExpanded(isExpanded ? null : occ.occupation)}
                  occTasks={occTasks}
                />
              );
            })}

            {zeroOccupations.length > 0 && (
              <tr className="border-t-2 border-[var(--rule-strong)]">
                <td
                  colSpan={models.length + 3}
                  className="py-3 text-sm text-[var(--ink-tertiary)]"
                >
                  {zeroOccupations.length} occupation{zeroOccupations.length > 1 ? "s" : ""} with
                  0% across all models:{" "}
                  <span className="font-mono text-xs">
                    {zeroOccupations.map((o) => o.occupation).join(", ")}
                  </span>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <p className="font-mono text-[11px] text-[var(--ink-tertiary)] mt-4">
        Fig. 2 — Per-occupation pass rates across 4 frontier models.
        n = number of tasks. Cells shaded by intensity.
      </p>
    </section>
  );
}

function OccupationRow({
  occ,
  models,
  modelLabels,
  overallBest,
  isExpanded,
  onToggle,
  occTasks,
}: {
  occ: (typeof evaluationData.occupations)[number];
  models: string[];
  modelLabels: Record<string, string>;
  overallBest: string;
  isExpanded: boolean;
  onToggle: () => void;
  occTasks: (typeof evaluationData.tasks);
}) {
  return (
    <>
      <tr
        className="border-b border-[var(--rule)] cursor-pointer hover:bg-[var(--surface-raised)] transition-colors"
        onClick={onToggle}
        tabIndex={0}
        role="button"
        aria-expanded={isExpanded}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onToggle();
          }
        }}
      >
        <td className="py-2.5 pr-4 text-sm font-medium">
          <span className="flex items-center gap-2">
            <svg
              className={`w-3 h-3 shrink-0 transition-transform ${isExpanded ? "rotate-90" : ""}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
            {occ.occupation}
          </span>
        </td>
        <td className="py-2.5 px-1 text-center font-mono text-xs text-[var(--ink-tertiary)]">
          {occ.taskCount}
        </td>
        {models.map((m) => {
          const score = occ.scores[m];
          const pct = Math.round(score * 100);
          const isLeader = m === occ.bestModel;
          const beatsOverall = m !== overallBest && isLeader;

          return (
            <td key={m} className="py-2.5 px-1 text-center">
              <div
                className="inline-flex items-center justify-center w-14 h-7 font-mono text-xs"
                style={{
                  backgroundColor: pctColor(score),
                  color: textColor(score),
                  outline: beatsOverall ? "2px solid var(--accent)" : undefined,
                  outlineOffset: beatsOverall ? "-2px" : undefined,
                }}
                title={`${modelLabels[m]}: ${pct}%`}
              >
                {pct}%
              </div>
            </td>
          );
        })}
        <td className="py-2.5 pl-3">
          <span className="font-mono text-xs text-[var(--ink-secondary)]">
            {occ.bestModel
              ? (modelLabels[occ.bestModel] || occ.bestModel).split(" ")[0]
              : "—"}
          </span>
        </td>
      </tr>

      {isExpanded && occTasks.length > 0 && (
        <tr>
          <td colSpan={models.length + 3} className="p-0">
            <div className="bg-[var(--surface-raised)] px-6 py-4 border-b border-[var(--rule)]">
              <div className="text-xs font-medium text-[var(--ink-tertiary)] uppercase tracking-wider mb-3">
                Individual tasks
              </div>
              <div className="space-y-2">
                {occTasks.map((task) => (
                  <div key={task.id} className="flex items-center gap-3">
                    <div className="w-48 sm:w-64 text-xs font-mono text-[var(--ink-secondary)] truncate shrink-0">
                      {task.id}
                    </div>
                    {models.map((m) => {
                      const score = task.scores[m];
                      const pct = Math.round(score * 100);
                      return (
                        <div
                          key={m}
                          className="w-14 h-6 flex items-center justify-center font-mono text-[10px]"
                          style={{
                            backgroundColor: pctColor(score),
                            color: textColor(score),
                          }}
                        >
                          {pct}%
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  );
}
