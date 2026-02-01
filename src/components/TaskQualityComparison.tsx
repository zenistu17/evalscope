import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Cell,
  LabelList,
} from "recharts";
import { benchmarks } from "@/data/benchmarks";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function TaskQualityComparison() {
  const occupationData = benchmarks
    .filter((b) => b.occupations > 0)
    .map((b) => ({
      name: b.name,
      value: b.occupations,
      color: b.color,
    }))
    .sort((a, b) => b.value - a.value);

  const taskCountData = benchmarks
    .map((b) => ({
      name: b.name,
      value: b.totalTasks,
      color: b.color,
    }))
    .sort((a, b) => b.value - a.value);

  const expertData = benchmarks
    .filter((b) => b.expertYears !== null)
    .map((b) => ({
      name: b.name,
      value: b.expertYears!,
      color: b.color,
    }))
    .sort((a, b) => b.value - a.value);

  const taskHoursData = benchmarks
    .map((b) => ({
      name: b.name,
      value: b.avgTaskHours,
      color: b.color,
    }))
    .sort((a, b) => b.value - a.value);

  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <h2 className="text-3xl font-bold mb-2">Task Quality Deep Dive</h2>
      <p className="text-muted-foreground mb-8 max-w-2xl">
        Visual breakdowns of key quality metrics across all benchmarks.
      </p>

      <Tabs defaultValue="occupations">
        <TabsList className="mb-6">
          <TabsTrigger value="occupations">Occupations</TabsTrigger>
          <TabsTrigger value="tasks">Task Count</TabsTrigger>
          <TabsTrigger value="experts">Expert Experience</TabsTrigger>
          <TabsTrigger value="hours">Task Duration</TabsTrigger>
        </TabsList>

        <TabsContent value="occupations">
          <ChartCard
            title="Occupational Coverage"
            description="Number of distinct professional occupations covered. Only benchmarks with explicit occupation tagging are shown."
            data={occupationData}
            unit=" occupations"
          />
        </TabsContent>

        <TabsContent value="tasks">
          <ChartCard
            title="Total Task Count"
            description="Number of evaluation tasks in each benchmark. More tasks generally means broader coverage and statistical power."
            data={taskCountData}
            unit=" tasks"
          />
        </TabsContent>

        <TabsContent value="experts">
          <ChartCard
            title="Expert Experience (Years)"
            description="Average years of professional experience of the experts who created the tasks. Higher means more realistic, senior-level work."
            data={expertData}
            unit=" years"
          />
        </TabsContent>

        <TabsContent value="hours">
          <ChartCard
            title="Average Task Duration (Hours)"
            description="How long each task takes a professional to complete. Longer tasks test deeper reasoning and sustained context."
            data={taskHoursData}
            unit="h"
          />
        </TabsContent>
      </Tabs>

      {/* Domain coverage comparison */}
      <div className="mt-12 grid gap-4 sm:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">
              GDPVAL Domain Coverage
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-1.5">
              {benchmarks
                .find((b) => b.isGDPVAL)!
                .domains.map((d) => (
                  <Badge
                    key={d}
                    variant="secondary"
                    className="bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300"
                  >
                    {d}
                  </Badge>
                ))}
            </div>
            <p className="text-xs text-muted-foreground mt-3">
              12 distinct domains covering 9 GDP-contributing industries
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">
              APEX-Agents Domain Coverage
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-1.5">
              {benchmarks
                .find((b) => b.id === "apex-agents")!
                .domains.map((d) => (
                  <Badge
                    key={d}
                    variant="secondary"
                    className="bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300"
                  >
                    {d}
                  </Badge>
                ))}
            </div>
            <p className="text-xs text-muted-foreground mt-3">
              3 domains within professional services only
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

function ChartCard({
  title,
  description,
  data,
  unit,
}: {
  title: string;
  description: string;
  data: { name: string; value: number; color: string }[];
  unit: string;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={Math.max(250, data.length * 45)}>
          <BarChart
            data={data}
            layout="vertical"
            margin={{ left: 0, right: 60, top: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" horizontal={false} />
            <XAxis type="number" tick={{ fontSize: 12 }} />
            <YAxis
              type="category"
              dataKey="name"
              width={120}
              tick={{ fontSize: 12 }}
            />
            <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={24}>
              {data.map((entry, i) => (
                <Cell key={i} fill={entry.color} fillOpacity={0.85} />
              ))}
              <LabelList
                dataKey="value"
                position="right"
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                formatter={(v: any) => v != null ? `${Number(v).toLocaleString()}${unit}` : ""}
                style={{ fontSize: 11, fill: "#64748b" }}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
