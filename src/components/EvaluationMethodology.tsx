import { modelResultsData } from "@/data/modelResultsData";

export function EvaluationMethodology() {
  const { totalTasks, attemptsPerTask, judge, oraclePassRate, models } =
    modelResultsData;

  return (
    <section className="mx-auto max-w-5xl px-6 py-10">
      <div className="flex items-center gap-3 mb-6">
        <span className="font-mono text-xs text-[var(--ink-tertiary)]">05</span>
        <div className="w-8 h-px bg-[var(--rule)]" />
      </div>

      <h2 className="font-serif text-[2rem] tracking-[-0.01em] mb-3">
        Evaluation Protocol
      </h2>

      <div className="grid md:grid-cols-2 gap-x-12 gap-y-8 text-[var(--ink-secondary)] leading-relaxed mb-10">
        <div>
          <h3 className="text-base font-semibold text-[var(--ink)] mb-2">
            How we tested
          </h3>
          <div className="space-y-2 text-sm">
            <div className="flex items-start gap-2">
              <span className="text-[var(--ink-tertiary)] shrink-0">-</span>
              <span>
                {models.length} models, {totalTasks} tasks, {attemptsPerTask}{" "}
                attempts each
              </span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-[var(--ink-tertiary)] shrink-0">-</span>
              <span>Binary pass/fail per attempt</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-[var(--ink-tertiary)] shrink-0">-</span>
              <span>{judge} rubric judge</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-[var(--ink-tertiary)] shrink-0">-</span>
              <span>Task-specific rubric criteria (avg 3.6 criteria/task)</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-[var(--ink-tertiary)] shrink-0">-</span>
              <span>
                Agent: terminus-2 v2.0.0 via OpenRouter
              </span>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-base font-semibold text-[var(--ink)] mb-2">
            Why trust an LLM judge?
          </h3>
          <div className="space-y-2 text-sm">
            <div className="flex items-start gap-2">
              <span className="text-[var(--ink-tertiary)] shrink-0">-</span>
              <span>
                Oracle validation: human expert solutions pass {oraclePassRate}%
                when evaluated by the same {judge} judge
              </span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-[var(--ink-tertiary)] shrink-0">-</span>
              <span>
                The judge is calibrated: it correctly identifies good work ~
                {Math.round(oraclePassRate)}% of the time
              </span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-[var(--ink-tertiary)] shrink-0">-</span>
              <span>
                The ~{Math.round(100 - oraclePassRate)}% oracle failure rate
                represents judge conservatism, not task impossibility
              </span>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-base font-semibold text-[var(--ink)] mb-2">
            Known limitations
          </h3>
          <div className="space-y-2 text-sm">
            <div className="flex items-start gap-2">
              <span className="text-[var(--ink-tertiary)] shrink-0">-</span>
              <span>
                LLM-as-judge introduces noise; {judge}'s rubric-based judging
                has not been validated against human raters at scale
              </span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-[var(--ink-tertiary)] shrink-0">-</span>
              <span>
                GDPval uses a different judge (GPT-5) and metric (pairwise
                win/tie); cross-benchmark comparison is approximate
              </span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-[var(--ink-tertiary)] shrink-0">-</span>
              <span>
                Binary pass/fail loses quality gradients captured in rubric
                point scores
              </span>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-base font-semibold text-[var(--ink)] mb-2">
            Replicability
          </h3>
          <div className="space-y-2 text-sm">
            <div className="flex items-start gap-2">
              <span className="text-[var(--ink-tertiary)] shrink-0">-</span>
              <span>
                All {totalTasks} tasks available for inspection
              </span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-[var(--ink-tertiary)] shrink-0">-</span>
              <span>
                Run any model yourself against the task set
              </span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-[var(--ink-tertiary)] shrink-0">-</span>
              <span>
                Judge prompt and rubrics included in each task definition
              </span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-[var(--ink-tertiary)] shrink-0">-</span>
              <span>
                GDPval data publicly available at{" "}
                <a
                  href="https://huggingface.co/datasets/openai/gdpval"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-[var(--ink)]"
                >
                  HuggingFace
                </a>
                {" "}and{" "}
                <a
                  href={modelResultsData.gdpvalSource}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-[var(--ink)]"
                >
                  arXiv
                </a>
              </span>
            </div>
          </div>
        </div>
      </div>

      <p className="font-mono text-[11px] text-[var(--ink-tertiary)]">
        Fig. 5 - Evaluation methodology. Tasks designed by working professionals
        averaging 14 years of domain experience.
      </p>
    </section>
  );
}
