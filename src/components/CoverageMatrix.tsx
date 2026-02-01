import * as Tabs from "@radix-ui/react-tabs";
import { industryCoverage, fileTypeBuckets, benchmarks } from "@/data/benchmarks";

const benchmarkNames = benchmarks.map((b) => b.name);
const benchmarkColors = Object.fromEntries(benchmarks.map((b) => [b.name, b.color]));

export function CoverageMatrix() {
  const industryTotals = benchmarkNames.map((name) => ({
    name,
    count: industryCoverage.filter((row) => row.benchmarks[name]).length,
  }));

  const fileTypeCoverage = benchmarks
    .map((b) => ({
      name: b.shortName,
      fullName: b.name,
      color: b.color,
      count: fileTypeBuckets.filter((ft) => ft.benchmarks[b.name]).length,
      total: fileTypeBuckets.length,
    }))
    .sort((a, b) => b.count - a.count);

  return (
    <section className="mx-auto max-w-5xl px-6 py-10">
      <div className="flex items-center gap-3 mb-6">
        <span className="font-mono text-xs text-[var(--ink-tertiary)]">06</span>
        <div className="w-8 h-px bg-[var(--rule)]" />
      </div>

      <h2 className="font-serif text-[2rem] tracking-[-0.01em] mb-4">
        Coverage Analysis
      </h2>

      <p className="text-[var(--ink-secondary)] leading-relaxed max-w-2xl mb-6">
        Which industries and file formats does each benchmark actually test?
      </p>

      <Tabs.Root defaultValue="industry">
        <Tabs.List className="flex gap-1 mb-6 border-b border-[var(--rule)]">
          <Tabs.Trigger
            value="industry"
            className="px-4 py-2.5 text-sm transition-colors relative data-[state=active]:font-semibold data-[state=active]:text-[var(--ink)] data-[state=active]:border-b-2 data-[state=active]:border-[var(--ink)] data-[state=inactive]:text-[var(--ink-tertiary)] data-[state=inactive]:hover:text-[var(--ink-secondary)]"
          >
            By Industry
          </Tabs.Trigger>
          <Tabs.Trigger
            value="filetype"
            className="px-4 py-2.5 text-sm transition-colors relative data-[state=active]:font-semibold data-[state=active]:text-[var(--ink)] data-[state=active]:border-b-2 data-[state=active]:border-[var(--ink)] data-[state=inactive]:text-[var(--ink-tertiary)] data-[state=inactive]:hover:text-[var(--ink-secondary)]"
          >
            By File Format
          </Tabs.Trigger>
        </Tabs.List>

        <Tabs.Content value="industry">
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
                  {industryTotals.map((t) => (
                    <td key={t.name} className="py-3 px-2 text-center font-mono text-xs font-medium">
                      {t.count}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
          <p className="font-mono text-[11px] text-[var(--ink-tertiary)] mt-4">
            Fig. 5a - Industry coverage matrix across 12 sectors. GDPval (Parsewave tasks) covers 10 of 12.
          </p>
        </Tabs.Content>

        <Tabs.Content value="filetype">
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b-2 border-[var(--ink)]">
                  <th className="text-left py-3 pr-4 font-medium text-[var(--ink-secondary)] text-xs uppercase tracking-wider w-36">
                    Category
                  </th>
                  <th className="text-left py-3 pr-4 font-medium text-[var(--ink-tertiary)] text-xs w-32">
                    Formats
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
                {fileTypeBuckets.map((bucket, i) => (
                  <tr
                    key={bucket.category}
                    className={`border-b border-[var(--rule)] ${i % 2 === 1 ? "bg-[var(--surface-raised)]" : ""}`}
                  >
                    <td className="py-2.5 pr-4 text-sm font-medium">{bucket.category}</td>
                    <td className="py-2.5 pr-4 font-mono text-[11px] text-[var(--ink-tertiary)]">
                      {bucket.types.join(", ")}
                    </td>
                    {benchmarkNames.map((name) => (
                      <td key={name} className="py-2.5 px-2 text-center">
                        {bucket.benchmarks[name] ? (
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
              </tbody>
            </table>
          </div>

          <p className="font-mono text-[11px] text-[var(--ink-tertiary)] mt-4 mb-6">
            Fig. 5b - File format support across 8 media categories.
          </p>

          <h3 className="text-xs font-medium text-[var(--ink-tertiary)] uppercase tracking-wider mb-4">
            Coverage Score (out of {fileTypeBuckets.length})
          </h3>

          <div className="space-y-2.5">
            {fileTypeCoverage.map(({ name, color, count, total }) => (
              <div key={name} className="flex items-center gap-3">
                <div className="w-20 text-sm font-mono shrink-0">{name}</div>
                <div className="flex-1 h-1.5 bg-[var(--surface-raised)] relative">
                  <div
                    className="h-full absolute left-0 top-0"
                    style={{
                      width: `${(count / total) * 100}%`,
                      backgroundColor: color,
                    }}
                  />
                </div>
                <div className="font-mono text-xs text-[var(--ink-secondary)] w-8 text-right">
                  {count}/{total}
                </div>
              </div>
            ))}
          </div>
        </Tabs.Content>
      </Tabs.Root>
    </section>
  );
}
