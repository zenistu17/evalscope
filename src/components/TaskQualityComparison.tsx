import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Cell,
  LabelList,
} from "recharts";
import { benchmarks } from "@/data/benchmarks";

const tabs = [
  { id: "occupations", label: "Occupations" },
  { id: "tasks", label: "Task Count" },
  { id: "experts", label: "Expert Exp." },
  { id: "hours", label: "Task Duration" },
] as const;

type TabId = (typeof tabs)[number]["id"];

function getData(tab: TabId) {
  switch (tab) {
    case "occupations":
      return {
        title: "Occupational Coverage",
        caption: "Fig. 5a",
        unit: "",
        data: benchmarks
          .filter((b) => b.occupations > 0)
          .map((b) => ({ name: b.shortName, value: b.occupations, color: b.color, isGDPVAL: b.isGDPVAL }))
          .sort((a, b) => b.value - a.value),
      };
    case "tasks":
      return {
        title: "Total Task Count",
        caption: "Fig. 5b",
        unit: "",
        data: benchmarks
          .map((b) => ({ name: b.shortName, value: b.totalTasks, color: b.color, isGDPVAL: b.isGDPVAL }))
          .sort((a, b) => b.value - a.value),
      };
    case "experts":
      return {
        title: "Expert Experience (Years)",
        caption: "Fig. 5c",
        unit: "yr",
        data: benchmarks
          .filter((b) => b.expertYears !== null)
          .map((b) => ({ name: b.shortName, value: b.expertYears!, color: b.color, isGDPVAL: b.isGDPVAL }))
          .sort((a, b) => b.value - a.value),
      };
    case "hours":
      return {
        title: "Average Task Duration (Hours)",
        caption: "Fig. 5d",
        unit: "h",
        data: benchmarks
          .map((b) => ({ name: b.shortName, value: b.avgTaskHours, color: b.color, isGDPVAL: b.isGDPVAL }))
          .sort((a, b) => b.value - a.value),
      };
  }
}

export function TaskQualityComparison() {
  const [activeTab, setActiveTab] = useState<TabId>("occupations");
  const { title, caption, unit, data } = getData(activeTab);

  return (
    <section className="mx-auto max-w-5xl px-6 py-10">
      <div className="flex items-center gap-3 mb-6">
        <span className="font-mono text-xs text-[var(--ink-tertiary)]">07</span>
        <div className="w-8 h-px bg-[var(--rule)]" />
      </div>

      <h2 className="font-serif text-[2rem] tracking-[-0.01em] mb-4">
        Task Quality Metrics
      </h2>

      <p className="text-[var(--ink-secondary)] leading-relaxed max-w-2xl mb-6">
        Key quality dimensions visualized. Select a metric to compare.
      </p>

      <div className="flex gap-1 mb-8 border-b border-[var(--rule)]">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2.5 text-sm transition-colors relative ${
              activeTab === tab.id
                ? "font-semibold text-[var(--ink)]"
                : "text-[var(--ink-tertiary)] hover:text-[var(--ink-secondary)]"
            }`}
          >
            {tab.label}
            {activeTab === tab.id && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--ink)]" />
            )}
          </button>
        ))}
      </div>

      <h3 className="text-sm font-medium mb-4">{title}</h3>

      <ResponsiveContainer width="100%" height={Math.max(200, data.length * 40)}>
        <BarChart
          data={data}
          layout="vertical"
          margin={{ left: 0, right: 50, top: 0, bottom: 0 }}
        >
          <XAxis type="number" tick={{ fontSize: 11, fill: "var(--ink-tertiary)" }} axisLine={{ stroke: "var(--rule)" }} tickLine={false} />
          <YAxis
            type="category"
            dataKey="name"
            width={80}
            tick={{ fontSize: 12, fill: "var(--ink-secondary)", fontFamily: "JetBrains Mono" }}
            axisLine={false}
            tickLine={false}
          />
          <Bar dataKey="value" barSize={16} radius={0}>
            {data.map((entry, i) => (
              <Cell
                key={i}
                fill={entry.isGDPVAL ? "var(--accent)" : "#bbb"}
              />
            ))}
            <LabelList
              dataKey="value"
              position="right"
              formatter={(v: any) => v != null ? `${Number(v).toLocaleString()}${unit}` : ""}
              style={{ fontSize: 11, fill: "var(--ink-secondary)", fontFamily: "JetBrains Mono" }}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      <p className="font-mono text-[11px] text-[var(--ink-tertiary)] mt-4">
        {caption} &mdash; {title.toLowerCase()}. GDPVAL highlighted in blue.
      </p>
    </section>
  );
}
