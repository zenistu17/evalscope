import { useState } from "react";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
} from "recharts";
import { benchmarks, comparisonDimensions } from "@/data/benchmarks";

export function RadarComparison() {
  const [selected, setSelected] = useState<string[]>(["apex-agents", "swe-bench-pro", "gaia"]);

  const data = comparisonDimensions.map((dim) => ({
    dimension: dim.label,
    ...Object.fromEntries(benchmarks.map((b) => [b.id, b.radarScores[dim.key]])),
  }));

  const gdpval = benchmarks.find((b) => b.isGDPVAL)!;
  const competitors = benchmarks.filter((b) => !b.isGDPVAL);

  function toggle(id: string) {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  }

  return (
    <section className="mx-auto max-w-5xl px-6 py-16">
      <div className="flex items-center gap-3 mb-6">
        <span className="font-mono text-xs text-[var(--ink-tertiary)]">04</span>
        <div className="w-8 h-px bg-[var(--rule)]" />
      </div>

      <h2 className="font-serif text-[2rem] tracking-[-0.01em] mb-4">
        Dimensional Analysis
      </h2>

      <p className="text-[var(--ink-secondary)] leading-relaxed max-w-2xl mb-10">
        Six evaluation dimensions, scored 0&ndash;100. Toggle benchmarks to compare
        against GDPVAL.
      </p>

      <div className="grid lg:grid-cols-[1fr_260px] gap-8">
        <div>
          <ResponsiveContainer width="100%" height={420}>
            <RadarChart data={data} cx="50%" cy="50%" outerRadius="75%">
              <PolarGrid stroke="var(--rule)" />
              <PolarAngleAxis
                dataKey="dimension"
                tick={{ fontSize: 11, fill: "var(--ink-secondary)" }}
              />
              <PolarRadiusAxis
                angle={30}
                domain={[0, 100]}
                tick={{ fontSize: 9, fill: "var(--ink-tertiary)" }}
                axisLine={false}
              />

              <Radar
                name={gdpval.name}
                dataKey={gdpval.id}
                stroke={gdpval.color}
                fill={gdpval.color}
                fillOpacity={0.1}
                strokeWidth={2}
              />

              {competitors
                .filter((b) => selected.includes(b.id))
                .map((b) => (
                  <Radar
                    key={b.id}
                    name={b.name}
                    dataKey={b.id}
                    stroke={b.color}
                    fill={b.color}
                    fillOpacity={0.04}
                    strokeWidth={1.5}
                    strokeDasharray="4 4"
                  />
                ))}
            </RadarChart>
          </ResponsiveContainer>

          <p className="font-mono text-[11px] text-[var(--ink-tertiary)] mt-2">
            Fig. 2 &mdash; Radar comparison across 6 evaluation dimensions. GDPVAL shown solid, competitors dashed.
          </p>
        </div>

        <div className="lg:border-l lg:border-[var(--rule)] lg:pl-6">
          <h3 className="text-xs font-medium text-[var(--ink-tertiary)] uppercase tracking-wider mb-4">
            Compare Against
          </h3>

          <div className="space-y-2">
            {competitors.map((b) => {
              const active = selected.includes(b.id);
              return (
                <button
                  key={b.id}
                  onClick={() => toggle(b.id)}
                  className={`flex items-center gap-3 w-full text-left px-3 py-2 rounded text-sm transition-colors ${
                    active
                      ? "bg-[var(--surface-raised)]"
                      : "hover:bg-[var(--surface-raised)]"
                  }`}
                >
                  <span
                    className="w-2.5 h-2.5 rounded-full shrink-0 transition-opacity"
                    style={{
                      backgroundColor: b.color,
                      opacity: active ? 1 : 0.25,
                    }}
                  />
                  <span className={active ? "font-medium" : "text-[var(--ink-tertiary)]"}>
                    {b.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
