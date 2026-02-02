import { taskQualityData } from "@/data/taskQualityData";

export function InstructionDepth() {
  const { stats, keyMetrics } = taskQualityData;
  const { wordCountBins, instructionWordCount } = stats;
  const maxBinCount = Math.max(...wordCountBins.map((b) => b.count));

  return (
    <section className="mx-auto max-w-5xl px-6 py-10">
      <div className="flex items-center gap-3 mb-6">
        <span className="font-mono text-xs text-[var(--ink-tertiary)]">04</span>
        <div className="w-8 h-px bg-[var(--rule)]" />
      </div>

      <h2 className="font-serif text-[2rem] tracking-[-0.01em] mb-3">
        Instructions Built Like Work Requests
      </h2>

      <p className="text-[var(--ink-secondary)] leading-relaxed max-w-2xl mb-8">
        Each task instruction sets a professional context, provides reference
        materials, and specifies multi-step deliverables with formatting and
        quality requirements. The median instruction
        is {keyMetrics.medianInstructionWords} words.
      </p>

      {/* Histogram */}
      <div className="space-y-2 mb-6">
        {wordCountBins.map((bin) => (
          <div key={bin.range} className="flex items-center gap-4">
            <span className="font-mono text-xs text-[var(--ink-tertiary)] w-24 text-right shrink-0">
              {bin.range}
            </span>
            <div className="flex-1 h-7 bg-[var(--surface-raised)] relative overflow-hidden">
              <div
                className="h-full bg-[var(--accent)]"
                style={{
                  width: `${(bin.count / maxBinCount) * 100}%`,
                }}
              />
            </div>
            <span className="font-mono text-xs text-[var(--ink-secondary)] w-8 text-right shrink-0">
              {bin.count}
            </span>
          </div>
        ))}
      </div>

      {/* Stats line */}
      <div className="flex flex-wrap gap-6 text-xs text-[var(--ink-tertiary)] mb-10">
        <span>
          <span className="font-mono">Median:</span>{" "}
          {instructionWordCount.median.toLocaleString()} words
        </span>
        <span>
          <span className="font-mono">p25:</span>{" "}
          {instructionWordCount.p25.toLocaleString()}
        </span>
        <span>
          <span className="font-mono">p75:</span>{" "}
          {instructionWordCount.p75.toLocaleString()}
        </span>
        <span>
          <span className="font-mono">Max:</span>{" "}
          {instructionWordCount.max.toLocaleString()}
        </span>
      </div>

      {/* Real task examples */}
      <div className="mb-6">
        <h3 className="font-mono text-xs text-[var(--ink-tertiary)] uppercase tracking-wider mb-4">
          Task instruction examples across professions
        </h3>

        <div className="space-y-3">
          <div className="bg-[var(--surface-raised)] p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="font-mono text-[11px] text-[var(--accent)] font-medium">Law</span>
              <span className="text-[var(--rule)]">|</span>
              <span className="font-mono text-[11px] text-[var(--ink-tertiary)]">Lawyers</span>
            </div>
            <p className="text-sm text-[var(--ink-secondary)] leading-relaxed">
              Analyze the attached case file on antitrust law, research whether
              the defendant's refusal to deal violated Sherman Act Section 2,
              provide case precedents with summaries, and show how each applies
              to the current facts.
            </p>
          </div>

          <div className="bg-[var(--surface-raised)] p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="font-mono text-[11px] text-[var(--accent)] font-medium">Healthcare</span>
              <span className="text-[var(--rule)]">|</span>
              <span className="font-mono text-[11px] text-[var(--ink-tertiary)]">Transitional Care Coordinator</span>
            </div>
            <p className="text-sm text-[var(--ink-secondary)] leading-relaxed">
              Stratify 150 discharged patients by 30-day readmission risk using
              LACE Plus scoring. Develop tailored transition care plans, resource
              allocation dashboards, and quality metrics trackers from discharge
              notes, illness records, and medication details.
            </p>
          </div>

          <div className="bg-[var(--surface-raised)] p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="font-mono text-[11px] text-[var(--accent)] font-medium">Software Dev</span>
              <span className="text-[var(--rule)]">|</span>
              <span className="font-mono text-[11px] text-[var(--ink-tertiary)]">Backend Developer</span>
            </div>
            <p className="text-sm text-[var(--ink-secondary)] leading-relaxed">
              Implement a Stripe subscription billing system in Node.js/TypeScript
              for a SaaS fitness platform. Build REST API endpoints, webhook
              handlers, idempotency middleware, and database migration scripts.
            </p>
          </div>

          <div className="bg-[var(--surface-raised)] p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="font-mono text-[11px] text-[var(--accent)] font-medium">Video/Audio</span>
              <span className="text-[var(--rule)]">|</span>
              <span className="font-mono text-[11px] text-[var(--ink-tertiary)]">Film & Video Editor</span>
            </div>
            <p className="text-sm text-[var(--ink-secondary)] leading-relaxed">
              Edit shelter event footage into a 20-30 second vertical video
              (9:16) for a dog adoption campaign. Include emotional scene
              transitions, text overlays for mobile, H.264/AAC encoding,
              and a thumbnail image.
            </p>
          </div>

          <div className="bg-[var(--surface-raised)] p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="font-mono text-[11px] text-[var(--accent)] font-medium">Engineering</span>
              <span className="text-[var(--rule)]">|</span>
              <span className="font-mono text-[11px] text-[var(--ink-tertiary)]">Mechanical Engineer</span>
            </div>
            <p className="text-sm text-[var(--ink-secondary)] leading-relaxed">
              Analyze and optimize an off-road buggy chassis frame from DWG
              drawings and 3D sketches. Run finite element analysis, conduct a
              mass reduction design study while maintaining structural integrity,
              and produce optimization reports with scenario comparisons.
            </p>
          </div>

          <div className="bg-[var(--surface-raised)] p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="font-mono text-[11px] text-[var(--accent)] font-medium">Finance</span>
              <span className="text-[var(--rule)]">|</span>
              <span className="font-mono text-[11px] text-[var(--ink-tertiary)]">Personal Financial Advisor</span>
            </div>
            <p className="text-sm text-[var(--ink-secondary)] leading-relaxed">
              Create a comprehensive early retirement financial plan from client
              profile, severance options, Social Security statements, and tax
              documents. Build a planning model with projections, pension
              analysis, and a written recommendation memo.
            </p>
          </div>
        </div>
      </div>

      {/* Comparison callout */}
      <div className="flex items-start gap-4 p-4 border-l-2 border-[var(--accent)]">
        <p className="text-sm text-[var(--ink-secondary)]">
          For comparison, the average MMLU question is 57 words with four
          multiple-choice options. The average Parsewave task
          instruction is {keyMetrics.avgInstructionWords} words with multi-step
          requirements and attached reference files.
        </p>
      </div>

      <p className="font-mono text-[11px] text-[var(--ink-tertiary)] mt-6">
        Fig. 4 - Distribution of instruction word counts
        across {taskQualityData.totalTasks} tasks. Word counts exclude rubric
        content.
      </p>
    </section>
  );
}
