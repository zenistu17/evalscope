import { useState } from "react";
import { benchmarks } from "@/data/benchmarks";

export function ComparisonTable() {
  const [expanded, setExpanded] = useState<string | null>(null);

  const sorted = [...benchmarks].sort((a, b) => {
    if (a.isGDPVAL) return -1;
    if (b.isGDPVAL) return 1;
    return b.totalTasks - a.totalTasks;
  });

  const maxTasks = Math.max(...benchmarks.map((b) => b.totalTasks));
  const maxOccupations = Math.max(...benchmarks.filter((b) => b.occupations > 0).map((b) => b.occupations));
  const maxIndustries = Math.max(...benchmarks.filter((b) => b.industries > 0).map((b) => b.industries));
  const maxExpert = Math.max(...benchmarks.filter((b) => b.expertYears).map((b) => b.expertYears!));
  const maxHours = Math.max(...benchmarks.map((b) => b.avgTaskHours));

  function isMax(val: number, max: number) {
    return val === max;
  }

  function toggle(id: string) {
    setExpanded((prev) => (prev === id ? null : id));
  }

  return (
    <section className="mx-auto max-w-5xl px-6 py-10">
      <div className="flex items-center gap-3 mb-6">
        <span className="font-mono text-xs text-[var(--ink-tertiary)]">02</span>
        <div className="w-8 h-px bg-[var(--rule)]" />
      </div>

      <h2 className="font-serif text-[2rem] tracking-[-0.01em] mb-4">
        The Landscape
      </h2>

      <p className="text-[var(--ink-secondary)] leading-relaxed max-w-2xl mb-6">
        Eight benchmarks, ten dimensions, side by side. Leading values in each
        column are set in bold. Click any row to expand.
      </p>

      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="border-b-2 border-[var(--ink)]">
              <th className="text-left py-3 pr-4 font-medium text-[var(--ink-secondary)] text-xs uppercase tracking-wider w-5" />
              <th className="text-left py-3 pr-4 font-medium text-[var(--ink-secondary)] text-xs uppercase tracking-wider">Benchmark</th>
              <th className="text-left py-3 px-3 font-medium text-[var(--ink-secondary)] text-xs uppercase tracking-wider">Creator</th>
              <th className="text-right py-3 px-3 font-medium text-[var(--ink-secondary)] text-xs uppercase tracking-wider">Tasks</th>
              <th className="text-right py-3 px-3 font-medium text-[var(--ink-secondary)] text-xs uppercase tracking-wider">Occup.</th>
              <th className="text-right py-3 px-3 font-medium text-[var(--ink-secondary)] text-xs uppercase tracking-wider">Indust.</th>
              <th className="text-right py-3 px-3 font-medium text-[var(--ink-secondary)] text-xs uppercase tracking-wider whitespace-nowrap">Exp. (yr)</th>
              <th className="text-right py-3 px-3 font-medium text-[var(--ink-secondary)] text-xs uppercase tracking-wider whitespace-nowrap">Avg Time</th>
              <th className="text-left py-3 px-3 font-medium text-[var(--ink-secondary)] text-xs uppercase tracking-wider">Scoring</th>
              <th className="text-center py-3 px-3 font-medium text-[var(--ink-secondary)] text-xs uppercase tracking-wider whitespace-nowrap">Multi-Modal</th>
              <th className="text-right py-3 pl-3 font-medium text-[var(--ink-secondary)] text-xs uppercase tracking-wider whitespace-nowrap">File Types</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((b, i) => {
              const isOpen = expanded === b.id;
              return (
                <tr
                  key={b.id}
                  onClick={() => toggle(b.id)}
                  className={`border-b border-[var(--rule)] cursor-pointer transition-colors ${
                    isOpen
                      ? "bg-[var(--surface-raised)]"
                      : i % 2 === 1
                        ? "bg-[var(--surface-raised)]"
                        : "hover:bg-[var(--surface-raised)]"
                  }`}
                >
                  <td className="py-3 pr-1 text-center">
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      className={`inline-block transition-transform ${isOpen ? "rotate-180" : ""}`}
                      fill="none"
                      stroke="var(--ink-tertiary)"
                      strokeWidth="1.5"
                    >
                      <path d="M3 4.5L6 7.5L9 4.5" />
                    </svg>
                  </td>
                  <td className={`py-3 pr-4 ${b.isGDPVAL ? "border-l-2 border-l-[var(--accent)] pl-3" : ""}`}>
                    <span className={b.isGDPVAL ? "font-semibold" : ""}>{b.name}</span>
                  </td>
                  <td className="py-3 px-3 text-[var(--ink-secondary)]">{b.creator}</td>
                  <td className={`py-3 px-3 text-right font-mono ${isMax(b.totalTasks, maxTasks) ? "font-semibold" : ""}`}>
                    {b.totalTasks.toLocaleString()}
                  </td>
                  <td className={`py-3 px-3 text-right font-mono ${b.occupations > 0 && isMax(b.occupations, maxOccupations) ? "font-semibold" : ""}`}>
                    {b.occupations === 0 ? <span className="text-[var(--ink-tertiary)]">-</span> : b.occupations}
                  </td>
                  <td className={`py-3 px-3 text-right font-mono ${b.industries > 0 && isMax(b.industries, maxIndustries) ? "font-semibold" : ""}`}>
                    {b.industries === 0 ? <span className="text-[var(--ink-tertiary)]">-</span> : b.industries}
                  </td>
                  <td className={`py-3 px-3 text-right font-mono ${b.expertYears && isMax(b.expertYears, maxExpert) ? "font-semibold" : ""}`}>
                    {b.expertYears ? b.expertYears : <span className="text-[var(--ink-tertiary)]">-</span>}
                  </td>
                  <td className={`py-3 px-3 text-right font-mono ${isMax(b.avgTaskHours, maxHours) ? "font-semibold" : ""}`}>
                    {b.avgTaskHours < 1 ? `${Math.round(b.avgTaskHours * 60)}m` : `${b.avgTaskHours}h`}
                  </td>
                  <td className="py-3 px-3 text-[var(--ink-secondary)] text-xs">
                    {b.scoring}
                  </td>
                  <td className="py-3 px-3 text-center text-[var(--ink-secondary)]">
                    {b.multiModal ? "Yes" : "No"}
                  </td>
                  <td className="py-3 pl-3 text-right font-mono text-xs">
                    {b.fileTypes.length > 3
                      ? `${b.fileTypes.length} types`
                      : b.fileTypes.join(", ")}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {expanded && (() => {
        const b = benchmarks.find((x) => x.id === expanded);
        if (!b) return null;
        return (
          <div className="mt-4 p-5 bg-[var(--surface-raised)] border border-[var(--rule)]">
            <p className="font-serif italic text-[var(--ink)] mb-3">
              {b.tagline}
            </p>

            <div className="flex items-center gap-3 mb-3">
              <span className="text-sm text-[var(--ink-secondary)]">Top model:</span>
              <span className="font-mono text-sm font-medium">{b.topModel}</span>
              <div className="flex-1 max-w-48 h-1.5 bg-[var(--surface)] relative">
                <div
                  className="h-full absolute left-0 top-0"
                  style={{
                    width: `${b.topModelScore}%`,
                    backgroundColor: b.isGDPVAL ? "var(--accent)" : b.color,
                  }}
                />
              </div>
              <span className="font-mono text-sm">{b.topModelScore}%</span>
            </div>

            <p className="text-sm text-[var(--ink-secondary)] leading-relaxed mb-3">
              {b.scoringDetail}
            </p>

            {b.strengths.length > 0 && (
              <div className="mb-3">
                <span className="text-xs font-medium text-[var(--ink-tertiary)] uppercase tracking-wider">Strengths: </span>
                <span className="text-xs text-[var(--ink-secondary)]">
                  {b.strengths.join(". ")}.
                </span>
              </div>
            )}

            {b.domains.length > 0 && (
              <div>
                <span className="text-xs font-medium text-[var(--ink-tertiary)] uppercase tracking-wider">Domains: </span>
                <span className="text-xs text-[var(--ink-secondary)]">
                  {b.domains.join(", ")}
                </span>
              </div>
            )}
          </div>
        );
      })()}

      <p className="font-mono text-[11px] text-[var(--ink-tertiary)] mt-4">
        Fig. 1 - Comparison of 8 AI evaluation benchmarks across key dimensions.
        Leading value in each numeric column is bold. Dash indicates not applicable.
      </p>
    </section>
  );
}
