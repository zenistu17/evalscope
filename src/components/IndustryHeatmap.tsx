import { industryCoverage, benchmarks } from "@/data/benchmarks";

const benchmarkNames = benchmarks.map((b) => b.name);
const benchmarkColors = Object.fromEntries(benchmarks.map((b) => [b.name, b.color]));

export function IndustryHeatmap() {
  const totals = benchmarkNames.map((name) => ({
    name,
    count: industryCoverage.filter((row) => row.benchmarks[name]).length,
  }));

  return (
    <section className="mx-auto max-w-5xl px-6 py-10">
      <div className="flex items-center gap-3 mb-6">
        <span className="font-mono text-xs text-[var(--ink-tertiary)]">05</span>
        <div className="w-8 h-px bg-[var(--rule)]" />
      </div>

      <h2 className="font-serif text-[2rem] tracking-[-0.01em] mb-4">
        Industry Coverage
      </h2>

      <p className="text-[var(--ink-secondary)] leading-relaxed max-w-2xl mb-6">
        Which industries does each benchmark actually test? Filled dots indicate coverage.
      </p>

      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="border-b-2 border-[var(--ink)]">
              <th className="text-left py-3 pr-4 font-medium text-[var(--ink-secondary)] text-xs uppercase tracking-wider w-40">
                Industry
              </th>
              {benchmarkNames.map((name) => {
                const short = benchmarks.find((b) => b.name === name)?.shortName ?? name;
                return (
                  <th
                    key={name}
                    className="py-3 px-2 font-medium text-[var(--ink-secondary)] text-[10px] uppercase tracking-wider text-center"
                  >
                    {short}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {industryCoverage.map((row, i) => (
              <tr
                key={row.industry}
                className={`border-b border-[var(--rule)] ${i % 2 === 1 ? "bg-[var(--surface-raised)]" : ""}`}
              >
                <td className="py-2.5 pr-4 text-sm">{row.industry}</td>
                {benchmarkNames.map((name) => (
                  <td key={name} className="py-2.5 px-2 text-center">
                    {row.benchmarks[name] ? (
                      <span
                        className="inline-block w-2 h-2 rounded-full"
                        style={{ backgroundColor: benchmarkColors[name] }}
                      />
                    ) : (
                      <span className="inline-block w-2 h-2 rounded-full bg-[var(--rule)] opacity-30" />
                    )}
                  </td>
                ))}
              </tr>
            ))}

            <tr className="border-t-2 border-[var(--ink)]">
              <td className="py-3 pr-4 font-medium text-xs uppercase tracking-wider text-[var(--ink-secondary)]">
                Total
              </td>
              {totals.map((t) => (
                <td key={t.name} className="py-3 px-2 text-center font-mono text-xs font-medium">
                  {t.count}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      <p className="font-mono text-[11px] text-[var(--ink-tertiary)] mt-4">
        Fig. 3 &mdash; Industry coverage matrix across 12 sectors. GDPVAL covers 10 of 12.
      </p>
    </section>
  );
}
