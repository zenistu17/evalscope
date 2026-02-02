import { taskQualityData } from "@/data/taskQualityData";

export function Methodology() {
  const { totalTasks, keyMetrics, stats } = taskQualityData;

  return (
    <section className="mx-auto max-w-5xl px-6 py-10">
      <div className="flex items-center gap-3 mb-6">
        <span className="font-mono text-xs text-[var(--ink-tertiary)]">06</span>
        <div className="w-8 h-px bg-[var(--rule)]" />
      </div>

      <h2 className="font-serif text-[2rem] tracking-[-0.01em] mb-4">
        How These Tasks Were Built
      </h2>

      <div className="grid md:grid-cols-2 gap-x-12 gap-y-8 text-[var(--ink-secondary)] leading-relaxed">
        <div>
          <h3 className="text-base font-semibold text-[var(--ink)] mb-2">
            Professional task creators
          </h3>
          <p>
            Tasks are designed by working professionals averaging 14 years of
            experience in their field: financial analysts, lawyers, mechanical
            engineers, film editors, software developers. Each task reproduces a
            real deliverable from their daily work.
          </p>
        </div>

        <div>
          <h3 className="text-base font-semibold text-[var(--ink)] mb-2">
            Rubric-based evaluation
          </h3>
          <p>
            Each task includes a multi-criteria rubric (averaging{" "}
            {keyMetrics.avgRubricPoints} points) with specific quality levels per
            criterion. {stats.percent4LevelRubric}% use standardized 4-level
            scoring. Rubrics reference domain-specific professional standards.
          </p>
        </div>

        <div>
          <h3 className="text-base font-semibold text-[var(--ink)] mb-2">
            Reproducible evaluation protocol
          </h3>
          <p>
            Each model is given 3 independent attempts per task. An automated
            oracle validates task correctness. Results on this page are computed
            from structural analysis of all {totalTasks} tasks in the
            evaluation library across {keyMetrics.uniqueOccupations} occupations.
          </p>
        </div>

        <div>
          <h3 className="text-base font-semibold text-[var(--ink)] mb-2">
            Cross-sector coverage
          </h3>
          <p>
            The library covers {keyMetrics.uniqueOccupations} occupations across{" "}
            {keyMetrics.uniqueSectors} sectors. Tasks range from quick data
            processing to multi-hour professional analysis, reflecting the real
            diversity of work AI needs to handle.
          </p>
        </div>
      </div>

      {/* Transparency callout */}
      <div className="mt-10 p-6 border-2 border-[var(--accent)]">
        <h3 className="text-base font-semibold text-[var(--ink)] mb-3">
          Why trust these metrics?
        </h3>
        <p className="text-[var(--ink-secondary)] leading-relaxed mb-3">
          Parsewave designed these tasks, but the structural metrics reported
          here&mdash;instruction length, file types, rubric complexity&mdash;are
          objective and independently verifiable. The task repository is
          available for inspection.
        </p>
        <p className="text-[var(--ink-secondary)] leading-relaxed">
          The comparison with industry benchmarks is structural, not evaluative.
          Academic benchmarks serve a different purpose (measuring knowledge and
          reasoning). Parsewave tasks measure a different capability: performing
          professional work with real files and domain-specific quality
          standards.
        </p>
      </div>
    </section>
  );
}
