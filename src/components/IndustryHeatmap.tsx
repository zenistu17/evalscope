import { industryCoverage, benchmarks } from "@/data/benchmarks";

const benchmarkNames = benchmarks.map((b) => b.name);
const benchmarkColors = Object.fromEntries(benchmarks.map((b) => [b.name, b.color]));

export function IndustryHeatmap() {
  // Count industries covered per benchmark
  const coverageCount = benchmarkNames.map((name) => ({
    name,
    count: industryCoverage.filter((ic) => ic.benchmarks[name]).length,
  }));

  return (
    <section id="heatmap" className="mx-auto max-w-7xl px-6 py-20">
      <div className="mb-10">
        <h2 className="text-3xl font-bold mb-2">Industry Coverage Map</h2>
        <p className="text-muted-foreground max-w-2xl">
          Which industries does each benchmark actually cover? GDPVAL spans{" "}
          <strong>10 of 12 industry categories</strong> — more than any
          competitor combined.
        </p>
      </div>

      <div className="overflow-x-auto rounded-2xl border bg-card shadow-sm">
        <div className="min-w-[800px]">
          {/* Header row */}
          <div className="grid gap-0" style={{ gridTemplateColumns: `200px repeat(${benchmarkNames.length}, 1fr)` }}>
            <div className="p-3 text-xs font-semibold text-muted-foreground border-b bg-muted/30" />
            {benchmarkNames.map((name) => (
              <div
                key={name}
                className="p-3 text-center text-xs font-semibold border-b border-l bg-muted/30"
              >
                <div
                  className="inline-block w-2 h-2 rounded-full mr-1.5"
                  style={{ backgroundColor: benchmarkColors[name] }}
                />
                {name}
              </div>
            ))}
          </div>

          {/* Data rows */}
          {industryCoverage.map((row, i) => (
            <div
              key={row.industry}
              className="grid gap-0"
              style={{ gridTemplateColumns: `200px repeat(${benchmarkNames.length}, 1fr)` }}
            >
              <div className={`p-3 text-sm font-medium ${i < industryCoverage.length - 1 ? "border-b" : ""}`}>
                {row.industry}
              </div>
              {benchmarkNames.map((name) => {
                const covered = row.benchmarks[name];
                return (
                  <div
                    key={name}
                    className={`flex items-center justify-center border-l ${i < industryCoverage.length - 1 ? "border-b" : ""} transition-colors`}
                    style={{
                      backgroundColor: covered ? `${benchmarkColors[name]}18` : "transparent",
                    }}
                  >
                    {covered ? (
                      <div
                        className="w-5 h-5 rounded-md flex items-center justify-center text-white text-xs font-bold"
                        style={{ backgroundColor: benchmarkColors[name] }}
                      >
                        &#10003;
                      </div>
                    ) : (
                      <div className="w-5 h-5 rounded-md bg-muted/40 flex items-center justify-center text-muted-foreground/30 text-xs">
                        -
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ))}

          {/* Summary row */}
          <div
            className="grid gap-0 bg-muted/50 border-t-2"
            style={{ gridTemplateColumns: `200px repeat(${benchmarkNames.length}, 1fr)` }}
          >
            <div className="p-3 text-sm font-bold">Total Coverage</div>
            {coverageCount.map(({ name, count }) => (
              <div key={name} className="p-3 text-center border-l">
                <span
                  className="inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold text-white"
                  style={{ backgroundColor: benchmarkColors[name] }}
                >
                  {count}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
