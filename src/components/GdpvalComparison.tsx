import { taskQualityData } from "@/data/taskQualityData";
import { gdpvalData } from "@/data/gdpvalData";

interface ComparisonRowProps {
  label: string;
  gdpvalValue: number;
  gdpvalLabel: string;
  parsewaveValue: number;
  parsewaveLabel: string;
  maxValue: number;
  multiplier?: string;
}

function ComparisonRow({
  label,
  gdpvalValue,
  gdpvalLabel,
  parsewaveValue,
  parsewaveLabel,
  maxValue,
  multiplier,
}: ComparisonRowProps) {
  const gPct = Math.max((gdpvalValue / maxValue) * 100, 2);
  const pPct = Math.max((parsewaveValue / maxValue) * 100, 2);

  return (
    <div className="grid grid-cols-[110px_1fr_1fr_50px] sm:grid-cols-[140px_1fr_1fr_60px] items-center gap-3 sm:gap-4">
      <span className="text-sm text-[var(--ink-secondary)]">{label}</span>

      {/* GDPval bar */}
      <div>
        <div className="h-8 bg-[var(--surface-sunken)] relative overflow-hidden">
          <div
            className="h-full bg-[var(--rule-strong)] transition-all duration-700"
            style={{ width: `${gPct}%` }}
          />
        </div>
        <span className="font-mono text-[11px] text-[var(--ink-tertiary)] mt-1 block">
          {gdpvalLabel}
        </span>
      </div>

      {/* Parsewave bar */}
      <div>
        <div className="h-8 bg-[var(--accent-muted)] relative overflow-hidden">
          <div
            className="h-full bg-[var(--accent)] transition-all duration-700"
            style={{ width: `${pPct}%` }}
          />
        </div>
        <span className="font-mono text-[11px] text-[var(--ink)] mt-1 block font-medium">
          {parsewaveLabel}
        </span>
      </div>

      {/* Multiplier */}
      <span className="font-mono text-sm text-[var(--accent)] font-semibold text-right">
        {multiplier || ""}
      </span>
    </div>
  );
}

export function GdpvalComparison() {
  const pw = taskQualityData;
  const gd = gdpvalData;

  const pwFileTypes = pw.stats.uniqueFileTypes.length;
  const gdFileTypes = gd.computed.uniqueReferenceFileTypes;

  const inputFilesMultiplier = gd.computed.avgReferenceFiles > 0
    ? `${Math.round(pw.keyMetrics.avgDataFiles / gd.computed.avgReferenceFiles)}x`
    : "";
  const outputFilesMultiplier = gd.fromPaper.avgDeliverableFiles > 0
    ? `${Math.round(pw.keyMetrics.avgSolutionFiles / gd.fromPaper.avgDeliverableFiles)}x`
    : "";
  const fileTypesMultiplier = gdFileTypes > 0
    ? `${Math.round(pwFileTypes / gdFileTypes)}x`
    : "";

  return (
    <section className="mx-auto max-w-5xl px-6 py-10">
      <div className="flex items-center gap-3 mb-6">
        <span className="font-mono text-xs text-[var(--ink-tertiary)]">01</span>
        <div className="w-8 h-px bg-[var(--rule)]" />
      </div>

      <h2 className="font-serif text-[2rem] sm:text-[2.5rem] tracking-[-0.01em] mb-3 leading-tight">
        Same Category.
        <br />
        Different Structural Complexity.
      </h2>

      <p className="text-[var(--ink-secondary)] leading-relaxed max-w-2xl mb-10">
        Both Parsewave and OpenAI's GDPval build occupation-specific tasks for
        evaluating AI on professional work. The datasets differ in structural
        complexity, evaluation methodology, and task design. Below is a
        side-by-side comparison using published data.
      </p>

      {/* Column headers */}
      <div className="grid grid-cols-[110px_1fr_1fr_50px] sm:grid-cols-[140px_1fr_1fr_60px] items-center gap-3 sm:gap-4 mb-4">
        <span />
        <span className="font-mono text-[11px] text-[var(--ink-tertiary)] uppercase tracking-wider">
          GDPval ({gd.totalTasks} tasks)
        </span>
        <span className="font-mono text-[11px] text-[var(--accent)] uppercase tracking-wider font-medium">
          Parsewave ({pw.totalTasks} tasks)
        </span>
        <span />
      </div>

      {/* Comparison bars */}
      <div className="space-y-5">
        <ComparisonRow
          label="Input files/task"
          gdpvalValue={gd.computed.avgReferenceFiles}
          gdpvalLabel={`${gd.computed.avgReferenceFiles} avg`}
          parsewaveValue={pw.keyMetrics.avgDataFiles}
          parsewaveLabel={`${pw.keyMetrics.avgDataFiles} avg`}
          maxValue={pw.keyMetrics.avgDataFiles}
          multiplier={inputFilesMultiplier}
        />

        <ComparisonRow
          label="Output files/task"
          gdpvalValue={gd.fromPaper.avgDeliverableFiles}
          gdpvalLabel={`${gd.fromPaper.avgDeliverableFiles} avg`}
          parsewaveValue={pw.keyMetrics.avgSolutionFiles}
          parsewaveLabel={`${pw.keyMetrics.avgSolutionFiles} avg`}
          maxValue={pw.keyMetrics.avgSolutionFiles}
          multiplier={outputFilesMultiplier}
        />

        <ComparisonRow
          label="File types used"
          gdpvalValue={gdFileTypes}
          gdpvalLabel={`${gdFileTypes} types`}
          parsewaveValue={pwFileTypes}
          parsewaveLabel={`${pwFileTypes} types`}
          maxValue={pwFileTypes}
          multiplier={fileTypesMultiplier}
        />

        <ComparisonRow
          label="Prompt length"
          gdpvalValue={gd.computed.avgPromptWords}
          gdpvalLabel={`${gd.computed.avgPromptWords} words avg`}
          parsewaveValue={pw.keyMetrics.avgInstructionWords}
          parsewaveLabel={`${pw.keyMetrics.avgInstructionWords} words avg`}
          maxValue={Math.max(gd.computed.avgPromptWords, pw.keyMetrics.avgInstructionWords)}
        />
      </div>

      {/* Full comparison table */}
      <div className="mt-10 mb-6">
        <h3 className="font-mono text-xs text-[var(--ink-tertiary)] uppercase tracking-wider mb-4">
          Full structural comparison
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[var(--rule)]">
                <th className="text-left py-2 pr-4 font-medium text-[var(--ink-tertiary)]">Dimension</th>
                <th className="text-left py-2 pr-4 font-medium text-[var(--ink-tertiary)]">GDPval ({gd.totalTasks})</th>
                <th className="text-left py-2 font-medium text-[var(--accent)]">Parsewave ({pw.totalTasks})</th>
              </tr>
            </thead>
            <tbody className="text-[var(--ink-secondary)]">
              <tr className="border-b border-[var(--surface-raised)]">
                <td className="py-2 pr-4">Input files/task</td>
                <td className="py-2 pr-4 font-mono text-xs">{gd.computed.avgReferenceFiles} avg</td>
                <td className="py-2 font-mono text-xs font-medium text-[var(--ink)]">{pw.keyMetrics.avgDataFiles} avg</td>
              </tr>
              <tr className="border-b border-[var(--surface-raised)]">
                <td className="py-2 pr-4">Output files/task</td>
                <td className="py-2 pr-4 font-mono text-xs">{gd.fromPaper.avgDeliverableFiles} avg</td>
                <td className="py-2 font-mono text-xs font-medium text-[var(--ink)]">{pw.keyMetrics.avgSolutionFiles} avg</td>
              </tr>
              <tr className="border-b border-[var(--surface-raised)]">
                <td className="py-2 pr-4">File types</td>
                <td className="py-2 pr-4 font-mono text-xs">{gdFileTypes}</td>
                <td className="py-2 font-mono text-xs font-medium text-[var(--ink)]">{pwFileTypes}</td>
              </tr>
              <tr className="border-b border-[var(--surface-raised)]">
                <td className="py-2 pr-4">Prompt length</td>
                <td className="py-2 pr-4 font-mono text-xs">{gd.computed.avgPromptWords} words avg</td>
                <td className="py-2 font-mono text-xs font-medium text-[var(--ink)]">{pw.keyMetrics.avgInstructionWords} words avg</td>
              </tr>
              <tr className="border-b border-[var(--surface-raised)]">
                <td className="py-2 pr-4">Text-only tasks</td>
                <td className="py-2 pr-4 font-mono text-xs">{gd.computed.percentTextOnly}%</td>
                <td className="py-2 font-mono text-xs">{pw.stats.percentTextOnly}%</td>
              </tr>
              <tr className="border-b border-[var(--surface-raised)]">
                <td className="py-2 pr-4">Occupations</td>
                <td className="py-2 pr-4 font-mono text-xs font-medium text-[var(--ink)]">{gd.computed.uniqueOccupations}</td>
                <td className="py-2 font-mono text-xs">{pw.keyMetrics.uniqueOccupations}</td>
              </tr>
              <tr className="border-b border-[var(--surface-raised)]">
                <td className="py-2 pr-4">Sectors</td>
                <td className="py-2 pr-4 font-mono text-xs">{gd.computed.uniqueSectors}</td>
                <td className="py-2 font-mono text-xs">{pw.keyMetrics.uniqueSectors}</td>
              </tr>
              <tr className="border-b border-[var(--surface-raised)]">
                <td className="py-2 pr-4">Evaluation method</td>
                <td className="py-2 pr-4 text-xs">Pairwise comparison (GPT-5 judge, ~{Math.round(gd.fromPaper.humanAgreementRate * 100)}% human agreement)</td>
                <td className="py-2 text-xs font-medium text-[var(--ink)]">4-level rubric ({pw.keyMetrics.avgRubricPoints} pts, {pw.keyMetrics.avgCriteriaCount} criteria avg)</td>
              </tr>
              <tr>
                <td className="py-2 pr-4">Task effort</td>
                <td className="py-2 pr-4 text-xs">Median {gd.fromPaper.medianCompletionHours} hr (mean {gd.fromPaper.meanCompletionHours} hr)</td>
                <td className="py-2 text-xs font-medium text-[var(--ink)]">7+ hr minimum design threshold</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Honest acknowledgment */}
      <div className="flex items-start gap-4 p-4 border-l-2 border-[var(--accent)]">
        <p className="text-sm text-[var(--ink-secondary)]">
          GDPval covers {gd.computed.uniqueOccupations} occupations to
          Parsewave's {pw.keyMetrics.uniqueOccupations}. Both share the same
          9 sectors. Parsewave tasks are structurally more complex per task
          (more input files, more deliverables, wider file type diversity)
          while GDPval covers more occupations with a larger private set
          of {gd.fromPaper.totalTasksFull.toLocaleString()} total tasks.
        </p>
      </div>

      <p className="font-mono text-[11px] text-[var(--ink-tertiary)] mt-6">
        Fig. 1 - Structural comparison between Parsewave ({pw.totalTasks} tasks)
        and GDPval ({gd.totalTasks} public tasks). GDPval data computed from{" "}
        <a
          href={gd.source}
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-[var(--ink-secondary)]"
        >
          openai/gdpval
        </a>{" "}
        on HuggingFace. Paper statistics from{" "}
        <a
          href={gd.paperUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-[var(--ink-secondary)]"
        >
          arXiv:2510.04374
        </a>
        .
      </p>
    </section>
  );
}
