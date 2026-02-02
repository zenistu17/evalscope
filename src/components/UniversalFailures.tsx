import { evaluationData } from "@/data/evaluationData";

export function UniversalFailures() {
  const { universalFailures, totalTasks } = evaluationData;

  // Group by occupation for display
  const byOccupation = new Map<string, typeof universalFailures>();
  for (const task of universalFailures) {
    const list = byOccupation.get(task.occupation) || [];
    list.push(task);
    byOccupation.set(task.occupation, list);
  }

  return (
    <section className="mx-auto max-w-5xl px-6 py-10">
      <div className="flex items-center gap-3 mb-6">
        <span className="font-mono text-xs text-[var(--ink-tertiary)]">03</span>
        <div className="w-8 h-px bg-[var(--rule)]" />
      </div>

      <h2 className="font-serif text-[2rem] tracking-[-0.01em] mb-4">
        Tasks No AI Can Solve (Yet)
      </h2>

      <p className="text-[var(--ink-secondary)] leading-relaxed max-w-2xl mb-8">
        {universalFailures.length} of {totalTasks} tasks scored 0% across all
        four models. These represent professional work that remains beyond
        current AI capability.
      </p>

      <div className="space-y-2">
        {universalFailures.map((task) => (
          <div
            key={task.id}
            className="flex items-baseline gap-4 py-2 border-b border-[var(--rule)]"
          >
            <span className="font-mono text-sm text-[var(--ink)] flex-1 truncate">
              {formatTaskName(task.id)}
            </span>
            <span className="text-xs text-[var(--ink-tertiary)] shrink-0">
              {task.occupation}
            </span>
            {task.estimatedHours > 0 && (
              <span className="font-mono text-[10px] text-[var(--ink-tertiary)] shrink-0 w-12 text-right">
                ~{task.estimatedHours}h
              </span>
            )}
          </div>
        ))}
      </div>

      <p className="text-sm text-[var(--ink-secondary)] leading-relaxed mt-6 max-w-2xl">
        The common thread: multi-step reasoning over domain-specific
        documents with quantitative precision requirements. These tasks
        require the kind of deep professional judgment that current models
        cannot replicate.
      </p>

      <p className="font-mono text-[11px] text-[var(--ink-tertiary)] mt-4">
        Fig. 3 — Tasks where all 4 models achieved 0% across 3 evaluation runs.
      </p>
    </section>
  );
}

function formatTaskName(id: string): string {
  return id
    .replace(/-v2$/, "")
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}
