import { benchmarks } from "@/data/benchmarks";
import type { Benchmark } from "@/data/benchmarks";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  Building2,
  Clock,
  FileStack,
  ExternalLink,
  Crown,
} from "lucide-react";

export function BenchmarkCards() {
  const gdpval = benchmarks.find((b) => b.isGDPVAL)!;
  const others = benchmarks.filter((b) => !b.isGDPVAL);

  return (
    <section id="overview" className="mx-auto max-w-7xl px-6 py-20">
      <h2 className="text-3xl font-bold mb-2">The Contenders</h2>
      <p className="text-muted-foreground mb-10 max-w-2xl">
        8 benchmarks. 6 dimensions. One question: which one actually measures
        real professional work?
      </p>

      {/* GDPVAL featured */}
      <div className="mb-6">
        <Card className="relative overflow-hidden border-2 border-indigo-500/30">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 via-purple-500/5 to-pink-500/5" />
          <CardContent className="relative pt-6">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg">
                  <Crown className="h-6 w-6 text-white" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-bold">{gdpval.name}</h3>
                    <Badge className="bg-indigo-500 text-white text-[10px]">
                      PARSEWAVE
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{gdpval.tagline}</p>
                </div>
              </div>
              <a href={gdpval.url} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground">
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>

            <p className="text-sm text-muted-foreground mb-5">{gdpval.description}</p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <MetricPill icon={<FileStack className="h-4 w-4" />} value="213" label="Tasks" />
              <MetricPill icon={<Users className="h-4 w-4" />} value="36" label="Occupations" />
              <MetricPill icon={<Building2 className="h-4 w-4" />} value="9" label="Industries" />
              <MetricPill icon={<Clock className="h-4 w-4" />} value="7h avg" label="Expert Time" />
            </div>

            <div className="flex flex-wrap gap-1.5 mt-5">
              {gdpval.fileTypes.slice(0, 10).map((ft) => (
                <span key={ft} className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300">
                  .{ft.toLowerCase()}
                </span>
              ))}
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-muted text-muted-foreground">
                +{gdpval.fileTypes.length - 10} more
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Other benchmarks */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {others.map((b) => (
          <CompetitorCard key={b.id} benchmark={b} />
        ))}
      </div>
    </section>
  );
}

function CompetitorCard({ benchmark: b }: { benchmark: Benchmark }) {
  return (
    <Card className="group hover:shadow-md transition-all hover:border-border/80">
      <CardContent className="pt-5">
        <div className="flex items-start justify-between gap-2 mb-3">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: b.color }} />
              <h3 className="font-semibold">{b.name}</h3>
            </div>
            <p className="text-xs text-muted-foreground mt-0.5">{b.creator} &middot; {b.tagline}</p>
          </div>
          <a href={b.url} target="_blank" rel="noopener noreferrer" className="text-muted-foreground/50 hover:text-foreground opacity-0 group-hover:opacity-100 transition-opacity">
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>

        <p className="text-xs text-muted-foreground mb-4 line-clamp-2">{b.description}</p>

        <div className="grid grid-cols-2 gap-2 text-xs">
          <div>
            <div className="font-semibold">{b.totalTasks.toLocaleString()}</div>
            <div className="text-muted-foreground">Tasks</div>
          </div>
          <div>
            <div className="font-semibold">{b.occupations || "N/A"}</div>
            <div className="text-muted-foreground">Occupations</div>
          </div>
          <div>
            <div className="font-semibold">{b.avgTaskHours < 1 ? `${Math.round(b.avgTaskHours * 60)}m` : `${b.avgTaskHours}h`}</div>
            <div className="text-muted-foreground">Expert Time</div>
          </div>
          <div>
            <div className="font-semibold">{b.scoring.split(" ")[0]}</div>
            <div className="text-muted-foreground">Scoring</div>
          </div>
        </div>

        {b.limitations.length > 0 && (
          <div className="mt-4 pt-3 border-t">
            <div className="text-[10px] text-muted-foreground/60 space-y-0.5">
              {b.limitations.slice(0, 2).map((l, i) => (
                <div key={i}>&bull; {l}</div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function MetricPill({ icon, value, label }: { icon: React.ReactNode; value: string; label: string }) {
  return (
    <div className="flex items-center gap-2 bg-white/60 dark:bg-white/5 rounded-xl px-3 py-2 border border-indigo-100 dark:border-indigo-800/30">
      <div className="text-indigo-500">{icon}</div>
      <div>
        <div className="text-sm font-bold">{value}</div>
        <div className="text-[10px] text-muted-foreground">{label}</div>
      </div>
    </div>
  );
}
