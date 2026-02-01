export function WhyGDPVAL() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-10">
      <div className="flex items-center gap-3 mb-6">
        <span className="font-mono text-xs text-[var(--ink-tertiary)]">03</span>
        <div className="w-8 h-px bg-[var(--rule)]" />
      </div>

      <h2 className="font-serif text-[2rem] tracking-[-0.01em] mb-4">
        Why GDPVAL
      </h2>

      <div className="grid md:grid-cols-2 gap-x-12 gap-y-8 text-[var(--ink-secondary)] leading-relaxed">
        <div>
          <h3 className="text-base font-semibold text-[var(--ink)] mb-2">
            Adopted by OpenAI as industry standard
          </h3>
          <p>
            OpenAI published GDPVAL as its primary benchmark for measuring
            real-world AI capabilities. Artificial Analysis replaced legacy
            benchmarks (MMLU-Pro, AIME) with GDPVAL-AA in their Intelligence
            Index v4.0. When the industry needs to measure whether AI can do
            real work, they use GDPVAL.
          </p>
        </div>

        <div>
          <h3 className="text-base font-semibold text-[var(--ink)] mb-2">
            Built by working professionals, not annotators
          </h3>
          <p>
            Every GDPVAL task is created by professionals with an average of 14
            years in their field - accountants, nurses, film editors,
            engineers, lawyers. Mercor's APEX tasks are created by experts
            with 7.25 years average experience. Academic benchmarks like HLE and
            GAIA use crowd-sourced or researcher-created questions that
            don't reflect real job functions.
          </p>
        </div>

        <div>
          <h3 className="text-base font-semibold text-[var(--ink)] mb-2">
            Breadth that matches the real economy
          </h3>
          <p>
            GDPVAL spans 36 occupations across 9 GDP-contributing
            sectors - from financial advisors to video editors to
            procurement specialists. APEX covers 3-4 white-collar roles.
            WorkArena covers enterprise IT workflows. No other benchmark
            captures the diversity of how AI will actually impact the workforce.
          </p>
        </div>

        <div>
          <h3 className="text-base font-semibold text-[var(--ink)] mb-2">
            Deliverable-based, not answer-based
          </h3>
          <p>
            GDPVAL tests whether AI can produce a complete financial plan, edit
            a video, design a 3D model, or write a legal brief. Academic
            benchmarks test whether AI can answer a question correctly.
            APEX-Agents tests whether an agent can navigate a simulated
            workspace. GDPVAL tests what ultimately matters: the quality of the
            final work product.
          </p>
        </div>

        <div>
          <h3 className="text-base font-semibold text-[var(--ink)] mb-2">
            True multi-modal: not just text and code
          </h3>
          <p>
            GDPVAL tasks involve 17+ file types: spreadsheets, PDFs, video
            files, audio recordings, 3D models (STL/USDZ), presentation decks,
            and more. Competitors are either text-only (HLE, Tau-Bench),
            browser-only (WorkArena), or limited to documents and spreadsheets
            (APEX). Real professional work is inherently multi-modal.
          </p>
        </div>

        <div>
          <h3 className="text-base font-semibold text-[var(--ink)] mb-2">
            Granular rubric scoring with expert validation
          </h3>
          <p>
            Each GDPVAL task has a multi-criteria rubric (up to 40 points) with
            specific quality levels per criterion. This captures partial credit
            and nuanced quality differences. APEX-Agents uses binary pass/fail.
            HLE and GAIA use simple answer matching. Rubric-based evaluation is
            harder to build but far more informative.
          </p>
        </div>
      </div>

      <div className="mt-10">
        <p className="text-sm text-[var(--ink-secondary)] leading-relaxed max-w-2xl">
          GDPVAL is the only benchmark that comprehensively answers whether AI
          can perform real professional work across 36 occupations, 9 industries,
          and 17+ media formats. Parsewave builds the tasks that make it possible.
        </p>
      </div>
    </section>
  );
}
