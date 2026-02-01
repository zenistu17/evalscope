import { benchmarks } from "@/data/benchmarks";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Check, X, Minus } from "lucide-react";

const columns = [
  { key: "name", label: "Benchmark" },
  { key: "creator", label: "Creator" },
  { key: "totalTasks", label: "Total Tasks" },
  { key: "occupations", label: "Occupations" },
  { key: "industries", label: "Industries" },
  { key: "expertYears", label: "Expert Exp." },
  { key: "avgTaskHours", label: "Avg Task Time" },
  { key: "scoring", label: "Scoring" },
  { key: "multiModal", label: "Multi-Modal" },
  { key: "fileTypes", label: "File Types" },
] as const;

export function ComparisonTable() {
  const sorted = [...benchmarks].sort((a, b) => {
    if (a.isGDPVAL) return -1;
    if (b.isGDPVAL) return 1;
    return b.totalTasks - a.totalTasks;
  });

  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <h2 className="text-3xl font-bold mb-2">Detailed Comparison</h2>
      <p className="text-muted-foreground mb-8 max-w-2xl">
        Every dimension, side by side. The strongest values in each column are
        highlighted.
      </p>

      <div className="overflow-x-auto rounded-xl border">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((col) => (
                <TableHead
                  key={col.key}
                  className="whitespace-nowrap text-xs font-semibold"
                >
                  {col.label}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {sorted.map((b) => (
              <TableRow
                key={b.id}
                className={
                  b.isGDPVAL
                    ? "bg-indigo-50/50 dark:bg-indigo-950/20 font-medium"
                    : ""
                }
              >
                <TableCell className="whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <div
                      className="h-2.5 w-2.5 rounded-full shrink-0"
                      style={{ backgroundColor: b.color }}
                    />
                    <span className="font-semibold">{b.name}</span>
                    {b.isGDPVAL && (
                      <Badge className="text-[10px] px-1.5 py-0 bg-indigo-500">
                        Ours
                      </Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell className="text-sm">{b.creator}</TableCell>
                <TableCell>
                  <span
                    className={
                      b.totalTasks >= 1000
                        ? "font-bold text-emerald-600 dark:text-emerald-400"
                        : ""
                    }
                  >
                    {b.totalTasks.toLocaleString()}
                  </span>
                </TableCell>
                <TableCell>
                  {b.occupations === 0 ? (
                    <span className="text-muted-foreground">N/A</span>
                  ) : (
                    <span
                      className={
                        b.occupations >= 40
                          ? "font-bold text-emerald-600 dark:text-emerald-400"
                          : ""
                      }
                    >
                      {b.occupations}
                    </span>
                  )}
                </TableCell>
                <TableCell>
                  {b.industries === 0 ? (
                    <span className="text-muted-foreground">N/A</span>
                  ) : (
                    <span
                      className={
                        b.industries >= 9
                          ? "font-bold text-emerald-600 dark:text-emerald-400"
                          : ""
                      }
                    >
                      {b.industries}
                    </span>
                  )}
                </TableCell>
                <TableCell>
                  {b.expertYears ? (
                    <span
                      className={
                        b.expertYears >= 14
                          ? "font-bold text-emerald-600 dark:text-emerald-400"
                          : ""
                      }
                    >
                      {b.expertYears} yr
                    </span>
                  ) : (
                    <Minus className="h-4 w-4 text-muted-foreground" />
                  )}
                </TableCell>
                <TableCell>
                  {b.avgTaskHours < 1
                    ? `${Math.round(b.avgTaskHours * 60)}m`
                    : `${b.avgTaskHours}h`}
                </TableCell>
                <TableCell className="text-xs max-w-[120px]">
                  {b.scoring}
                </TableCell>
                <TableCell>
                  {b.multiModal ? (
                    <Check className="h-4 w-4 text-emerald-500" />
                  ) : (
                    <X className="h-4 w-4 text-red-400" />
                  )}
                </TableCell>
                <TableCell className="text-xs max-w-[140px]">
                  {b.fileTypes.length > 3
                    ? `${b.fileTypes.slice(0, 3).join(", ")} +${b.fileTypes.length - 3}`
                    : b.fileTypes.join(", ")}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  );
}
