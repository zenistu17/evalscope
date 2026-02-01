export function WhyParsewave() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-10">
      <div className="flex items-center gap-3 mb-6">
        <span className="font-mono text-xs text-[var(--ink-tertiary)]">03</span>
        <div className="w-8 h-px bg-[var(--rule)]" />
      </div>

      <h2 className="font-serif text-[2rem] tracking-[-0.01em] mb-4">
        Why Parsewave
      </h2>

      <div className="grid md:grid-cols-2 gap-x-12 gap-y-8 text-[var(--ink-secondary)] leading-relaxed">
        <div>
          <h3 className="text-base font-semibold text-[var(--ink)] mb-2">
            Trusted by OpenAI
          </h3>
          <p>
            Our tasks were selected by OpenAI for GDPVAL, their primary
            benchmark for measuring real-world AI capabilities. Artificial
            Analysis replaced legacy benchmarks (MMLU-Pro, AIME) with our
            GDPVAL data in their Intelligence Index v4.0. When the industry
            needs to measure whether AI can do real work, they use tasks we
            built.
          </p>
        </div>

        <div>
          <h3 className="text-base font-semibold text-[var(--ink)] mb-2">
            Built by working professionals, not annotators
          </h3>
          <p>
            We recruit professionals with an average of 14 years in their
            field: accountants, nurses, film editors, engineers, lawyers.
            Not crowd-sourced annotators or graduate students. Mercor's APEX
            tasks use experts with 7.25 years average experience. Academic
            benchmarks like HLE and GAIA use researcher-created questions that
            don't reflect real job functions.
          </p>
        </div>

        <div>
          <h3 className="text-base font-semibold text-[var(--ink)] mb-2">
            Breadth that matches the real economy
          </h3>
          <p>
            Our task library spans 36 occupations across 9 GDP-contributing
            sectors, from financial advisors to video editors to procurement
            specialists. Competitors cover 3-4 white-collar roles. No other
            evaluation task set captures the diversity of how AI will actually
            impact the workforce.
          </p>
        </div>

        <div>
          <h3 className="text-base font-semibold text-[var(--ink)] mb-2">
            We test deliverables, not answers
          </h3>
          <p>
            Our tasks produce complete financial plans, edited videos, 3D
            models, and legal briefs. Academic benchmarks test whether AI can
            answer a question correctly. APEX-Agents tests whether an agent can
            navigate a simulated workspace. We test what ultimately matters: the
            quality of the final work product.
          </p>
        </div>

        <div>
          <h3 className="text-base font-semibold text-[var(--ink)] mb-2">
            True multi-modal: 17+ file types
          </h3>
          <p>
            Our tasks use spreadsheets, PDFs, video files, audio recordings,
            3D models (STL/USDZ), presentation decks, and more. Competitors
            are either text-only (HLE, Tau-Bench), browser-only (WorkArena), or
            limited to documents and spreadsheets (APEX). Real professional
            work is inherently multi-modal.
          </p>
        </div>

        <div>
          <h3 className="text-base font-semibold text-[var(--ink)] mb-2">
            Granular rubric scoring
          </h3>
          <p>
            We build multi-criteria rubrics (up to 40 points) with specific
            quality levels per criterion, validated by domain experts.
            APEX-Agents uses binary pass/fail. HLE and GAIA use simple answer
            matching. Rubric-based evaluation is harder to build but far more
            informative for understanding actual AI capability.
          </p>
        </div>
      </div>

      <div className="mt-10">
        <p className="text-sm text-[var(--ink-secondary)] leading-relaxed max-w-2xl">
          This is the methodology that produced GDPVAL. We can build the same
          for your evaluation needs, across any industry, occupation, or
          media format.
        </p>
      </div>
    </section>
  );
}
