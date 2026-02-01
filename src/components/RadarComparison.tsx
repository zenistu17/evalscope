import { useState } from "react";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { benchmarks, comparisonDimensions } from "@/data/benchmarks";
import type { Benchmark } from "@/data/benchmarks";
import { Card, CardContent } from "@/components/ui/card";

export function RadarComparison() {
  const gdpval = benchmarks.find((b) => b.isGDPVAL)!;
  const others = benchmarks.filter((b) => !b.isGDPVAL);
  const [selected, setSelected] = useState<string[]>([
    "apex-agents",
    "swe-bench-pro",
    "gaia",
  ]);

  const selectedBenchmarks = others.filter((b) => selected.includes(b.id));

  const data = comparisonDimensions.map((dim) => {
    const point: Record<string, string | number> = {
      dimension: dim.label,
      GDPVAL: gdpval.radarScores[dim.key],
    };
    selectedBenchmarks.forEach((b) => {
      point[b.name] = b.radarScores[dim.key];
    });
    return point;
  });

  const toggleBenchmark = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <h2 className="text-3xl font-bold mb-2">Multi-Dimensional Comparison</h2>
      <p className="text-muted-foreground mb-8 max-w-2xl">
        Compare benchmarks across 6 key dimensions. Click benchmarks below to
        toggle them on/off.
      </p>

      <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
        <Card>
          <CardContent className="pt-6">
            <ResponsiveContainer width="100%" height={450}>
              <RadarChart data={data}>
                <PolarGrid stroke="#e2e8f0" />
                <PolarAngleAxis
                  dataKey="dimension"
                  tick={{ fontSize: 12, fill: "#64748b" }}
                />
                <PolarRadiusAxis
                  angle={30}
                  domain={[0, 100]}
                  tick={{ fontSize: 10, fill: "#94a3b8" }}
                />

                {/* GDPVAL always shown */}
                <Radar
                  name="GDPVAL"
                  dataKey="GDPVAL"
                  stroke={gdpval.color}
                  fill={gdpval.color}
                  fillOpacity={0.15}
                  strokeWidth={2.5}
                />

                {selectedBenchmarks.map((b) => (
                  <Radar
                    key={b.id}
                    name={b.name}
                    dataKey={b.name}
                    stroke={b.color}
                    fill={b.color}
                    fillOpacity={0.06}
                    strokeWidth={1.5}
                    strokeDasharray="4 4"
                  />
                ))}

                <Legend />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <div className="space-y-3">
          <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider">
            Compare with
          </h3>
          {others.map((b) => (
            <BenchmarkToggle
              key={b.id}
              benchmark={b}
              active={selected.includes(b.id)}
              onToggle={() => toggleBenchmark(b.id)}
            />
          ))}

          <div className="pt-4 border-t">
            <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider mb-3">
              Dimensions
            </h3>
            {comparisonDimensions.map((dim) => (
              <div key={dim.key} className="mb-2">
                <div className="text-sm font-medium">{dim.label}</div>
                <div className="text-xs text-muted-foreground">
                  {dim.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function BenchmarkToggle({
  benchmark: b,
  active,
  onToggle,
}: {
  benchmark: Benchmark;
  active: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      onClick={onToggle}
      className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-all border ${
        active
          ? "bg-accent border-border"
          : "bg-transparent border-transparent hover:bg-accent/50"
      }`}
    >
      <div
        className={`h-3 w-3 rounded-full shrink-0 transition-opacity ${
          active ? "opacity-100" : "opacity-30"
        }`}
        style={{ backgroundColor: b.color }}
      />
      <div>
        <div className="text-sm font-medium">{b.name}</div>
        <div className="text-xs text-muted-foreground">{b.creator}</div>
      </div>
    </button>
  );
}
