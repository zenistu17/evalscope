import { taskQualityData } from "@/data/taskQualityData";

export function InstructionDepth() {
  const { stats, keyMetrics } = taskQualityData;
  const { wordCountBins, instructionWordCount } = stats;
  const maxBinCount = Math.max(...wordCountBins.map((b) => b.count));

  return (
    <section className="mx-auto max-w-5xl px-6 py-10">
      <div className="flex items-center gap-3 mb-6">
        <span className="font-mono text-xs text-[var(--ink-tertiary)]">02</span>
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

      {/* Anonymized excerpt */}
      <div className="bg-[var(--surface-raised)] p-6 mb-6">
        <p className="font-mono text-[11px] text-[var(--ink-tertiary)] mb-3 uppercase tracking-wider">
          Anonymized instruction excerpt
        </p>
        <p className="text-sm text-[var(--ink-secondary)] leading-relaxed italic">
          &ldquo;You are a [ROLE] at [ORGANIZATION]. Review the attached [FILE
          TYPE] documents and prepare a [DELIVERABLE] that addresses: (1)
          [REQUIREMENT], (2) [REQUIREMENT], (3) [REQUIREMENT]. The deliverable
          must conform to [PROFESSIONAL STANDARD] and include supporting
          calculations with source citations.&rdquo;
        </p>
        <p className="font-mono text-[11px] text-[var(--ink-tertiary)] mt-3">
          &mdash; Anonymized from a financial analysis task
        </p>
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
        Fig. 2 &mdash; Distribution of instruction word counts
        across {taskQualityData.totalTasks} tasks. Word counts exclude rubric
        content.
      </p>
    </section>
  );
}
