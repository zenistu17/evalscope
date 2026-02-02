import { evaluationData } from "@/data/evaluationData";

export function Methodology() {
  const { totalTasks, fullTaskCount, oraclePassRate, occupations } = evaluationData;
  const sectors = new Set(occupations.map((o) => o.sector));

  return (
    <section className="mx-auto max-w-5xl px-6 py-10">
      <div className="flex items-center gap-3 mb-6">
        <span className="font-mono text-xs text-[var(--ink-tertiary)]">05</span>
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
            real deliverable from their daily work, not a quiz question or
            academic exercise.
          </p>
        </div>

        <div>
          <h3 className="text-base font-semibold text-[var(--ink)] mb-2">
            Rubric-based evaluation
          </h3>
          <p>
            Each task includes a multi-criteria rubric (up to 40 points) with
            specific quality levels per criterion. Rubrics are validated by domain
            experts. This captures partial credit and quality gradients that
            binary pass/fail scoring misses.
          </p>
        </div>

        <div>
          <h3 className="text-base font-semibold text-[var(--ink)] mb-2">
            Reproducible evaluation protocol
          </h3>
          <p>
            Each model is given 3 independent attempts per task. An automated
            oracle (human professional) validates task correctness with an
            {" "}{Math.round(oraclePassRate * 100)}% pass rate.
            Results on this page are from a {totalTasks}-task scored subset
            of a {fullTaskCount}-task library spanning 36 occupations.
          </p>
        </div>

        <div>
          <h3 className="text-base font-semibold text-[var(--ink)] mb-2">
            Cross-sector coverage
          </h3>
          <p>
            The scored subset covers {occupations.length} occupations
            across {sectors.size} sectors: {Array.from(sectors).slice(0, 4).join(", ")}
            {sectors.size > 4 ? `, and ${sectors.size - 4} more` : ""}.
            Tasks range from 3-minute data entry to 7-hour legal research,
            reflecting the real diversity of professional work.
          </p>
        </div>
      </div>

      <div className="mt-8 p-4 bg-[var(--surface-raised)] text-sm text-[var(--ink-secondary)] leading-relaxed">
        <strong className="text-[var(--ink)]">Transparency note:</strong> These
        tasks were built by Parsewave for evaluation purposes. The evaluation
        protocol, scoring methodology, and aggregate results are reported as-is.
        The models and benchmark are publicly available; these findings can be
        independently verified.
      </div>
    </section>
  );
}
