import { taskQualityData } from "@/data/taskQualityData";

export function OccupationCoverage() {
  const { stats, keyMetrics, tasks } = taskQualityData;

  // Sectors sorted by task count
  const sectors = Object.entries(stats.sectorDistribution)
    .sort((a, b) => b[1] - a[1])
    .map(([name, count]) => ({ name, count }));
  const maxSectorCount = sectors[0]?.count || 1;

  // Occupations sorted by task count, with sector
  const occupations = Object.entries(stats.occupationDistribution)
    .sort((a, b) => b[1] - a[1])
    .map(([name, count]) => {
      const task = tasks.find((t) => t.occupation === name);
      return { name, count, sector: task?.sector || "" };
    });

  // Duration range
  const { estimatedHours } = stats;
  const minHoursLabel =
    estimatedHours.min < 1
      ? `${Math.round(estimatedHours.min * 60)} min`
      : `${estimatedHours.min} hr`;
  const maxHoursLabel = `${estimatedHours.max} hr`;

  return (
    <section className="mx-auto max-w-5xl px-6 py-10">
      <div className="flex items-center gap-3 mb-6">
        <span className="font-mono text-xs text-[var(--ink-tertiary)]">05</span>
        <div className="w-8 h-px bg-[var(--rule)]" />
      </div>

      <h2 className="font-serif text-[2rem] tracking-[-0.01em] mb-3">
        {keyMetrics.uniqueOccupations} Occupations Across{" "}
        {keyMetrics.uniqueSectors} Sectors
      </h2>

      <p className="text-[var(--ink-secondary)] leading-relaxed max-w-2xl mb-8">
        Tasks range from {minHoursLabel} data entry to {maxHoursLabel} legal
        research, reflecting the real diversity of professional work. Each task
        is designed by a domain expert with industry experience.
      </p>

      {/* Sector bars */}
      <div className="mb-10">
        <h3 className="font-mono text-xs text-[var(--ink-tertiary)] uppercase tracking-wider mb-4">
          Tasks by sector
        </h3>

        <div className="space-y-2">
          {sectors.map(({ name, count }) => (
            <div key={name} className="flex items-center gap-4">
              <span className="text-sm text-[var(--ink-secondary)] w-48 shrink-0 truncate">
                {name}
              </span>
              <div className="flex-1 h-7 bg-[var(--surface-raised)] relative overflow-hidden">
                <div
                  className="h-full bg-[var(--accent)]"
                  style={{
                    width: `${(count / maxSectorCount) * 100}%`,
                  }}
                />
              </div>
              <span className="font-mono text-xs text-[var(--ink-secondary)] w-12 text-right shrink-0">
                {count}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Occupation grid */}
      <div>
        <h3 className="font-mono text-xs text-[var(--ink-tertiary)] uppercase tracking-wider mb-4">
          All occupations
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
          {occupations.map(({ name, count, sector }) => (
            <div
              key={name}
              className="p-3 bg-[var(--surface-raised)] border-l-2 border-[var(--accent)]"
            >
              <div className="text-sm font-medium leading-tight">{name}</div>
              <div className="flex items-center justify-between mt-1">
                <span className="text-[11px] text-[var(--ink-tertiary)]">
                  {sector}
                </span>
                <span className="font-mono text-[11px] text-[var(--ink-secondary)]">
                  {count} {count === 1 ? "task" : "tasks"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <p className="font-mono text-[11px] text-[var(--ink-tertiary)] mt-6">
        Fig. 5 - Sector and occupation distribution
        across {taskQualityData.totalTasks} tasks. Avg estimated task duration:{" "}
        {keyMetrics.avgEstimatedHours} hours.
      </p>
    </section>
  );
}
