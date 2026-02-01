import { fileTypeBuckets, benchmarks } from "@/data/benchmarks";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  FileText,
  Table2,
  Presentation,
  Video,
  Music,
  Image,
  Box,
  Code2,
} from "lucide-react";

const categoryIcons: Record<string, React.ReactNode> = {
  Documents: <FileText className="h-5 w-5" />,
  Spreadsheets: <Table2 className="h-5 w-5" />,
  Presentations: <Presentation className="h-5 w-5" />,
  Video: <Video className="h-5 w-5" />,
  Audio: <Music className="h-5 w-5" />,
  Images: <Image className="h-5 w-5" />,
  "3D Models": <Box className="h-5 w-5" />,
  Code: <Code2 className="h-5 w-5" />,
};

export function FileTypeMatrix() {
  // Count file type categories per benchmark
  const benchmarkCounts = benchmarks.map((b) => ({
    name: b.name,
    color: b.color,
    count: fileTypeBuckets.filter((ft) => ft.benchmarks[b.name]).length,
    total: fileTypeBuckets.length,
  }));

  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <div className="mb-10">
        <h2 className="text-3xl font-bold mb-2">File Type Diversity</h2>
        <p className="text-muted-foreground max-w-2xl">
          Real work involves more than text. GDPVAL is the only benchmark
          covering <strong>all 8 media categories</strong> — from 3D models and
          video to audio and code.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {fileTypeBuckets.map((bucket) => {
          const supportedBy = benchmarks.filter(
            (b) => bucket.benchmarks[b.name]
          );
          const gdpvalSupports = bucket.benchmarks["GDPVAL"];
          const onlyGdpval =
            gdpvalSupports && supportedBy.length === 1;

          return (
            <Card
              key={bucket.category}
              className={`relative overflow-hidden transition-all hover:shadow-lg ${
                onlyGdpval
                  ? "border-indigo-500/30 bg-gradient-to-br from-indigo-50/80 to-purple-50/80 dark:from-indigo-950/20 dark:to-purple-950/20"
                  : ""
              }`}
            >
              {onlyGdpval && (
                <div className="absolute top-2 right-2 text-[10px] font-bold text-indigo-500 bg-indigo-100 dark:bg-indigo-900/40 px-2 py-0.5 rounded-full">
                  GDPVAL ONLY
                </div>
              )}
              <CardHeader className="pb-2">
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                      gdpvalSupports
                        ? "bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {categoryIcons[bucket.category]}
                  </div>
                  <div>
                    <CardTitle className="text-base">{bucket.category}</CardTitle>
                    <p className="text-xs text-muted-foreground">
                      {bucket.types.join(", ")}
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {benchmarks.map((b) => {
                    const supported = bucket.benchmarks[b.name];
                    return (
                      <div
                        key={b.id}
                        className={`text-[10px] px-2 py-0.5 rounded-full font-medium transition-colors ${
                          supported
                            ? "text-white"
                            : "bg-muted/60 text-muted-foreground/40"
                        }`}
                        style={
                          supported ? { backgroundColor: b.color } : undefined
                        }
                      >
                        {b.name.replace("-Agents", "")}
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Coverage summary bar */}
      <div className="mt-8 rounded-2xl border bg-card p-6 shadow-sm">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
          Media Coverage Score (out of {fileTypeBuckets.length} categories)
        </h3>
        <div className="space-y-3">
          {benchmarkCounts
            .sort((a, b) => b.count - a.count)
            .map(({ name, color, count, total }) => (
              <div key={name} className="flex items-center gap-3">
                <div className="w-28 text-sm font-medium shrink-0">{name}</div>
                <div className="flex-1 h-7 bg-muted/40 rounded-full overflow-hidden relative">
                  <div
                    className="h-full rounded-full transition-all duration-1000 ease-out flex items-center justify-end pr-3"
                    style={{
                      width: `${(count / total) * 100}%`,
                      backgroundColor: color,
                    }}
                  >
                    <span className="text-xs font-bold text-white">
                      {count}/{total}
                    </span>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}
