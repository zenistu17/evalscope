import { benchmarks } from "@/data/benchmarks";

export function ComparisonTable() {
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
        Eight benchmarks, ten dimensions, side by side. Leading values in each column are set in bold.
      </p>

      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="border-b-2 border-[var(--ink)]">
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
            {sorted.map((b, i) => (
              <tr
                key={b.id}
                className={`border-b border-[var(--rule)] ${i % 2 === 1 ? "bg-[var(--surface-raised)]" : ""}`}
              >
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
            ))}
          </tbody>
        </table>
      </div>

      <p className="font-mono text-[11px] text-[var(--ink-tertiary)] mt-4">
        Fig. 1 - Comparison of 8 AI evaluation benchmarks across key dimensions.
        Leading value in each numeric column is bold. Dash indicates not applicable.
      </p>
    </section>
  );
}
