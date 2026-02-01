import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  ReferenceLine,
  ReferenceArea,
  Tooltip,
  Label,
} from "recharts";
import { benchmarks } from "@/data/benchmarks";

interface DataPoint {
  name: string;
  fullName: string;
  x: number;
  y: number;
  topModel: string;
  isGDPVAL: boolean;
}

const chartData: DataPoint[] = benchmarks.map((b) => ({
  name: b.shortName,
  fullName: b.name,
  x: b.topModelScore,
  y: b.avgTaskHours,
  topModel: b.topModel,
  isGDPVAL: b.isGDPVAL,
}));

// Hand-tuned per-point label offsets [dx, dy, anchor] to avoid ALL overlaps.
//
// Layout map (approximate positions on chart):
//
//   8h |
//   7h |              ● GDPVAL (51.6, 7.0)
//   6h |
//   5h |
//   4h |
//   3h |                          ● APEX-1 (67, 3.5)
//   2h |  ● APEX-A (24, 1.82)
//   1h |
//      |         HLE●  ●WArena        OSW●  T-B●  ●GAIA
//   0h +----+----+----+----+----+----+----+----+----+----
//      0   10   20   30   40   50   60   70   80   90  100%
//
type Anchor = "start" | "end" | "middle";
const labelPos: Record<string, [number, number, Anchor]> = {
  "GDPVAL":  [14, 0, "start"],    // right of dot (isolated at top, plenty of room)
  "APEX-1":  [12, 0, "start"],    // right of dot (isolated in middle)
  "APEX-A":  [12, 0, "start"],    // right of dot (isolated on left side)
  "HLE":     [-10, 0, "end"],     // left of dot  (avoids WArena to its right)
  "WArena":  [10, 0, "start"],    // right of dot (avoids HLE to its left)
  "OSW":     [-10, 0, "end"],     // left of dot  (avoids T-Bench/GAIA cluster)
  "T-Bench": [0, -14, "middle"],  // above dot    (vertically separated from OSW/GAIA)
  "GAIA":    [10, 0, "start"],    // right of dot (rightmost in cluster, extends right)
};

function DotWithLabel(props: any) {
  const { cx, cy, payload } = props;
  if (cx == null || cy == null || !payload) return null;
  const d = payload as DataPoint;
  const [dx, dy, anchor] = labelPos[d.name] || [10, 0, "start"];
  const isG = d.isGDPVAL;

  return (
    <g>
      {/* GDPVAL gets a subtle halo to draw the eye */}
      {isG && (
        <circle
          cx={cx} cy={cy} r={16}
          fill="var(--accent)" fillOpacity={0.07}
        />
      )}
      {/* Dot */}
      <circle
        cx={cx} cy={cy}
        r={isG ? 6 : 4}
        fill={isG ? "var(--accent)" : "#bbb"}
      />
      {/* Name label */}
      <text
        x={cx + dx} y={cy + dy}
        textAnchor={anchor}
        dominantBaseline="central"
        fontSize={isG ? 12 : 10}
        fontFamily="JetBrains Mono, monospace"
        fontWeight={isG ? 700 : 400}
        fill={isG ? "var(--accent)" : "var(--ink-secondary)"}
      >
        {d.name}
      </text>
      {/* GDPVAL gets a second-line annotation */}
      {isG && (
        <text
          x={cx + 14} y={cy + 16}
          textAnchor="start"
          fontSize={9}
          fontFamily="JetBrains Mono, monospace"
          fill="var(--accent)"
          opacity={0.6}
        >
          {Math.round(d.x * 10) / 10}% solved · {d.y}h per task
        </text>
      )}
    </g>
  );
}

function ChartTooltip({ active, payload }: any) {
  if (!active || !payload?.[0]) return null;
  const d = payload[0].payload as DataPoint;
  return (
    <div
      style={{
        background: "var(--surface)",
        border: "1px solid var(--rule)",
        padding: "8px 12px",
        fontFamily: "JetBrains Mono, monospace",
        lineHeight: 1.7,
        minWidth: 180,
      }}
    >
      <div
        style={{
          fontWeight: 600,
          fontSize: 12,
          color: d.isGDPVAL ? "var(--accent)" : "var(--ink)",
          marginBottom: 2,
        }}
      >
        {d.fullName}
      </div>
      <div style={{ color: "var(--ink-secondary)", fontSize: 11 }}>
        Best model: {d.topModel}
      </div>
      <div style={{ color: "var(--ink-secondary)", fontSize: 11 }}>
        Top score: {d.x}%
      </div>
      <div style={{ color: "var(--ink-secondary)", fontSize: 11 }}>
        Avg task: {d.y < 1 ? `${Math.round(d.y * 60)} min` : `${d.y} hours`}
      </div>
    </div>
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

      <p className="text-[var(--ink-secondary)] leading-relaxed max-w-2xl mb-6">
        Each point is a benchmark. The best benchmarks live in the top-left:
        complex professional tasks that AI still cannot solve. GDPVAL sits
        there alone.
      </p>

      {/* Legend */}
      <div className="flex items-center gap-6 mb-4">
        <div className="flex items-center gap-2">
          <span className="inline-block w-3 h-3 rounded-full bg-[var(--accent)]" />
          <span className="font-mono text-[11px] text-[var(--ink-secondary)]">
            GDPVAL (Parsewave)
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-[#bbb]" />
          <span className="font-mono text-[11px] text-[var(--ink-secondary)]">
            Other benchmarks
          </span>
        </div>
        <span className="font-mono text-[11px] text-[var(--ink-tertiary)]">
          Hover for details
        </span>
      </div>

      <ResponsiveContainer width="100%" height={480}>
        <ScatterChart margin={{ top: 30, right: 50, bottom: 50, left: 40 }}>
          <CartesianGrid
            stroke="var(--rule)"
            strokeDasharray="3 3"
            strokeOpacity={0.35}
          />

          {/* Subtle blue tint on the "ideal" quadrant */}
          <ReferenceArea
            x1={0} x2={55} y1={2} y2={8}
            fill="var(--accent)" fillOpacity={0.025}
          />

          <XAxis
            type="number"
            dataKey="x"
            domain={[0, 100]}
            ticks={[0, 20, 40, 60, 80, 100]}
            tick={{
              fontSize: 10,
              fill: "var(--ink-tertiary)",
              fontFamily: "JetBrains Mono",
            }}
            axisLine={{ stroke: "var(--rule)" }}
            tickLine={false}
            tickFormatter={(v) => `${v}%`}
          >
            <Label
              value="Top Model Score (easier to solve →)"
              position="bottom"
              offset={20}
              style={{
                fontSize: 10,
                fill: "var(--ink-tertiary)",
                fontFamily: "JetBrains Mono",
              }}
            />
          </XAxis>

          <YAxis
            type="number"
            dataKey="y"
            domain={[0, 8]}
            ticks={[0, 1, 2, 3, 4, 5, 6, 7, 8]}
            tick={{
              fontSize: 10,
              fill: "var(--ink-tertiary)",
              fontFamily: "JetBrains Mono",
            }}
            axisLine={{ stroke: "var(--rule)" }}
            tickLine={false}
            tickFormatter={(v) => `${v}h`}
          >
            <Label
              value="Avg Task Duration (more complex ↑)"
              angle={-90}
              position="insideLeft"
              offset={-15}
              style={{
                fontSize: 10,
                fill: "var(--ink-tertiary)",
                fontFamily: "JetBrains Mono",
                textAnchor: "middle",
              }}
            />
          </YAxis>

          {/* Quadrant divider lines */}
          <ReferenceLine
            x={55}
            stroke="var(--rule)"
            strokeDasharray="6 4"
            strokeOpacity={0.4}
          />
          <ReferenceLine
            y={2}
            stroke="var(--rule)"
            strokeDasharray="6 4"
            strokeOpacity={0.4}
          />

          <Tooltip content={<ChartTooltip />} cursor={false} isAnimationActive={false} />

          <Scatter data={chartData} shape={DotWithLabel} />
        </ScatterChart>
      </ResponsiveContainer>

      {/* Quadrant guide — outside chart, no overlap risk */}
      <div className="flex justify-between mt-1 font-mono text-[10px]">
        <span className="text-[var(--accent)] font-medium">
          ← Hard & Complex (ideal)
        </span>
        <span className="text-[var(--ink-tertiary)]">
          Easy & Trivial (nearing saturation) →
        </span>
      </div>

      <p className="font-mono text-[11px] text-[var(--ink-tertiary)] mt-3">
        Fig. 0 — Task complexity vs solvability across 8 benchmarks. Shaded
        quadrant marks the ideal zone.
      </p>

      {/* Key takeaway callout */}
      <div className="mt-6 p-5 bg-[var(--surface-raised)] border-l-2 border-l-[var(--accent)]">
        <p className="text-sm text-[var(--ink-secondary)] leading-relaxed">
          GDPVAL is the only benchmark that is both genuinely unsolved (51.6%
          top score) and deeply complex (7-hour professional tasks). Academic
          benchmarks like HLE are hard but test short-answer questions. Agent
          benchmarks like GAIA are nearly saturated. Parsewave's tasks remain
          the definitive test of real AI capability.
        </p>
      </div>
    </section>
  );
}
