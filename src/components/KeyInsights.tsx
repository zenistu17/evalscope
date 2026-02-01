import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  ReferenceLine,
  Cell,
  Label,
} from "recharts";
import { benchmarks } from "@/data/benchmarks";

const data = benchmarks.map((b) => ({
  name: b.shortName,
  x: b.topModelScore,
  y: b.avgTaskHours,
  isGDPVAL: b.isGDPVAL,
}));

function CustomLabel({
  cx,
  cy,
  index,
}: {
  cx?: number;
  cy?: number;
  index?: number;
}) {
  if (cx == null || cy == null || index == null) return null;
  const d = data[index];
  const isGDPVAL = d.isGDPVAL;
  return (
    <text
      x={cx}
      y={cy - 12}
      textAnchor="middle"
      fontSize={isGDPVAL ? 12 : 10}
      fontFamily="JetBrains Mono, monospace"
      fontWeight={isGDPVAL ? 600 : 400}
      fill={isGDPVAL ? "var(--accent)" : "var(--ink-secondary)"}
    >
      {d.name}
    </text>
  );
}

export function KeyInsights() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-10">
      <div className="flex items-center gap-3 mb-6">
        <span className="font-mono text-xs text-[var(--ink-tertiary)]">01</span>
        <div className="w-8 h-px bg-[var(--rule)]" />
      </div>

      <h2 className="font-serif text-[2rem] tracking-[-0.01em] mb-4">
        What Our Tasks Revealed
      </h2>

      <p className="text-[var(--ink-secondary)] leading-relaxed max-w-2xl mb-8">
        Each dot is a benchmark. The X-axis shows how much the best AI model
        solved it. The Y-axis shows how long each task takes. The ideal
        benchmark is top-left: complex professional tasks that AI still
        cannot solve.
      </p>

      <div className="relative">
        <ResponsiveContainer width="100%" height={420}>
          <ScatterChart margin={{ top: 30, right: 30, bottom: 40, left: 20 }}>
            <CartesianGrid
              stroke="var(--rule)"
              strokeDasharray="3 3"
              strokeOpacity={0.5}
            />
            <XAxis
              type="number"
              dataKey="x"
              domain={[0, 100]}
              tick={{ fontSize: 11, fill: "var(--ink-tertiary)", fontFamily: "JetBrains Mono" }}
              axisLine={{ stroke: "var(--rule)" }}
              tickLine={false}
              tickFormatter={(v) => `${v}%`}
            >
              <Label
                value="Easier to solve →"
                position="bottom"
                offset={15}
                style={{ fontSize: 11, fill: "var(--ink-tertiary)", fontFamily: "JetBrains Mono" }}
              />
            </XAxis>
            <YAxis
              type="number"
              dataKey="y"
              domain={[0, 8]}
              tick={{ fontSize: 11, fill: "var(--ink-tertiary)", fontFamily: "JetBrains Mono" }}
              axisLine={{ stroke: "var(--rule)" }}
              tickLine={false}
              tickFormatter={(v) => `${v}h`}
            >
              <Label
                value="More complex ↑"
                angle={-90}
                position="insideLeft"
                offset={-5}
                style={{ fontSize: 11, fill: "var(--ink-tertiary)", fontFamily: "JetBrains Mono", textAnchor: "middle" }}
              />
            </YAxis>

            <ReferenceLine
              x={55}
              stroke="var(--rule)"
              strokeDasharray="6 4"
              strokeOpacity={0.6}
            />
            <ReferenceLine
              y={2}
              stroke="var(--rule)"
              strokeDasharray="6 4"
              strokeOpacity={0.6}
            />

            <Scatter data={data} label={<CustomLabel />}>
              {data.map((d, i) => (
                <Cell
                  key={i}
                  fill={d.isGDPVAL ? "var(--accent)" : "#bbb"}
                  r={d.isGDPVAL ? 8 : 5}
                />
              ))}
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>

        {/* Quadrant labels */}
        <div className="absolute top-2 left-8 text-[10px] font-mono text-[var(--accent)] font-medium uppercase tracking-wider">
          Hard & Complex
        </div>
        <div className="absolute top-2 right-8 text-[10px] font-mono text-[var(--ink-tertiary)] uppercase tracking-wider">
          Easy & Complex
        </div>
        <div className="absolute bottom-12 left-8 text-[10px] font-mono text-[var(--ink-tertiary)] uppercase tracking-wider">
          Hard but Trivial
        </div>
        <div className="absolute bottom-12 right-8 text-[10px] font-mono text-[var(--ink-tertiary)] uppercase tracking-wider">
          Easy & Trivial
        </div>
      </div>

      <p className="font-mono text-[11px] text-[var(--ink-tertiary)] mt-2">
        Fig. 0 - Task complexity vs solvability. Each point is a benchmark.
        GDPVAL (Parsewave) in blue.
      </p>

      <div className="mt-6 p-5 bg-[var(--surface-raised)] border-l-2 border-l-[var(--accent)]">
        <p className="text-sm text-[var(--ink-secondary)] leading-relaxed">
          GDPVAL is the only benchmark that is both genuinely unsolved (51.6%
          top score) and deeply complex (7-hour professional tasks). Academic
          benchmarks like HLE are hard but test short-answer questions.
          Agent benchmarks like GAIA are nearly saturated. Parsewave's tasks
          remain the definitive test of real AI capability.
        </p>
      </div>
    </section>
  );
}
