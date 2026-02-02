import { modelResultsData } from "@/data/modelResultsData";

const DOMAIN_ORDER = [
  "Financial Analysis",
  "Tech/Engineering",
  "Video/Media",
  "Legal/Compliance",
  "Other",
];

export function UnsolvedFrontier() {
  const { unsolvedTasks, unsolvedCount, totalTasks, models } =
    modelResultsData;

  // Group tasks by domain
  const domainGroups = DOMAIN_ORDER.map((domain) => ({
    domain,
    tasks: unsolvedTasks.filter((t) => t.domain === domain),
  })).filter((g) => g.tasks.length > 0);

  const maxDomainCount = Math.max(...domainGroups.map((g) => g.tasks.length));
  const unsolvedPercent = Math.round((unsolvedCount / totalTasks) * 100);

  return (
    <section className="mx-auto max-w-5xl px-6 py-10">
      <div className="flex items-center gap-3 mb-6">
        <span className="font-mono text-xs text-[var(--ink-tertiary)]">03</span>
        <div className="w-8 h-px bg-[var(--rule)]" />
      </div>

      <h2 className="font-serif text-[2rem] tracking-[-0.01em] mb-3">
        The Unsolved Frontier
      </h2>

      <p className="text-[var(--ink-secondary)] leading-relaxed max-w-2xl mb-10">
        {unsolvedCount} tasks ({unsolvedPercent}%) were failed by all{" "}
        {models.length} models across all attempts. These span domains where AI
        capabilities have clear limits today.
      </p>

      {/* Domain summary bars */}
      <div className="space-y-2 mb-10">
        <h3 className="font-mono text-xs text-[var(--ink-tertiary)] uppercase tracking-wider mb-4">
          Unsolved tasks by domain
        </h3>

        {domainGroups.map(({ domain, tasks }) => (
          <div key={domain} className="flex items-center gap-4">
            <span className="text-sm text-[var(--ink-secondary)] w-44 shrink-0 truncate">
              {domain}
            </span>
            <div className="flex-1 h-7 bg-[var(--surface-raised)] relative overflow-hidden">
              <div
                className="h-full bg-[var(--accent)]"
                style={{
                  width: `${(tasks.length / maxDomainCount) * 100}%`,
                }}
              />
            </div>
            <span className="font-mono text-xs text-[var(--ink-secondary)] w-12 text-right shrink-0">
              {tasks.length}
            </span>
          </div>
        ))}
      </div>

      {/* Task cards grouped by domain */}
      {domainGroups.map(({ domain, tasks }) => (
        <div key={domain} className="mb-8">
          <h3 className="font-mono text-xs text-[var(--ink-tertiary)] uppercase tracking-wider mb-3">
            {domain} ({tasks.length})
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
            {tasks.map((task) => (
              <div
                key={task.id}
                className="p-3 bg-[var(--surface-raised)] border-l-2 border-[var(--accent)]"
              >
                <div className="text-sm text-[var(--ink-secondary)]">
                  {task.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      <p className="font-mono text-[11px] text-[var(--ink-tertiary)] mt-6">
        Fig. 3 - Tasks failed by all {models.length} models (
        {models.map((m) => m.name).join(", ")}) across all attempts. "Failed" =
        0 passes out of {modelResultsData.attemptsPerTask} attempts, judged
        by {modelResultsData.judge}.
      </p>
    </section>
  );
}
