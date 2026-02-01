export function WhyGDPVAL() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-16">
      <div className="flex items-center gap-3 mb-6">
        <span className="font-mono text-xs text-[var(--ink-tertiary)]">08</span>
        <div className="w-8 h-px bg-[var(--rule)]" />
      </div>

      <h2 className="font-serif text-[2rem] tracking-[-0.01em] mb-10">
        Editorial Analysis
      </h2>

      <blockquote className="border-l-2 border-[var(--accent)] pl-6 mb-12">
        <p className="font-serif italic text-[1.5rem] leading-[1.4] text-[var(--ink)]">
          Benchmarks should measure what matters: can AI do real professional
          work, across the full breadth of the economy, producing deliverables
          that experts would approve?
        </p>
      </blockquote>

      <div className="grid md:grid-cols-2 gap-x-12 gap-y-8 text-[var(--ink-secondary)] leading-relaxed">
        <div>
          <h3 className="text-base font-semibold text-[var(--ink)] mb-2">
            Built by working professionals, not annotators
          </h3>
          <p>
            Every GDPVAL task is created by professionals with an average of 14
            years in their field&mdash;accountants, nurses, film editors,
            engineers, lawyers. Mercor&rsquo;s APEX tasks are created by experts
            with 7.25 years average experience. Academic benchmarks like HLE and
            GAIA use crowd-sourced or researcher-created questions that
            don&rsquo;t reflect real job functions.
          </p>
        </div>

        <div>
          <h3 className="text-base font-semibold text-[var(--ink)] mb-2">
            Breadth that matches the real economy
          </h3>
          <p>
            GDPVAL spans 36 occupations across 9 GDP-contributing
            sectors&mdash;from financial advisors to video editors to
            procurement specialists. APEX covers 3&ndash;4 white-collar roles.
            WorkArena covers enterprise IT workflows. No other benchmark
            captures the diversity of how AI will actually impact the workforce.
          </p>
        </div>

        <div>
          <h3 className="text-base font-semibold text-[var(--ink)] mb-2">
            True multi-modal: not just text and code
          </h3>
          <p>
            GDPVAL tasks involve 17+ file types: spreadsheets, PDFs, video
            files, audio recordings, 3D models (STL/USDZ), presentation decks,
            and more. Competitors are either text-only (HLE, &tau;-bench),
            browser-only (WorkArena), or limited to documents and spreadsheets
            (APEX). Real professional work is inherently multi-modal.
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
      </div>

      <div className="border-t border-[var(--rule)] mt-12 pt-8">
        <p className="text-sm text-[var(--ink-secondary)] leading-relaxed">
          GDPVAL is the only benchmark that comprehensively answers whether AI
          can perform real professional work across 36 occupations, 9 industries,
          and 17+ media formats. The data above speaks for itself.
        </p>
        <div className="flex flex-wrap gap-6 mt-6">
          <a
            href="https://parsewave.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-[var(--accent)] hover:underline"
          >
            parsewave.ai &rarr;
          </a>
          <a
            href="https://huggingface.co/datasets/openai/gdpval"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-[var(--accent)] hover:underline"
          >
            GDPVAL on HuggingFace &rarr;
          </a>
          <a
            href="https://evals.openai.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-[var(--accent)] hover:underline"
          >
            Automated Grader &rarr;
          </a>
        </div>
      </div>
    </section>
  );
}
