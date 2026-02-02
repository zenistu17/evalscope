import { taskQualityData } from "@/data/taskQualityData";

function ComparisonRow({
  label,
  benchmarkValue,
  benchmarkLabel,
  parsewaveValue,
  parsewaveLabel,
  maxValue,
  multiplier,
}: {
  label: string;
  benchmarkValue: number;
  benchmarkLabel: string;
  parsewaveValue: number;
  parsewaveLabel: string;
  maxValue: number;
  multiplier?: string;
}) {
  const bPct = Math.max((benchmarkValue / maxValue) * 100, 1.5);
  const pPct = Math.max((parsewaveValue / maxValue) * 100, 1.5);

  return (
    <div className="grid grid-cols-[120px_1fr_1fr_60px] sm:grid-cols-[140px_1fr_1fr_70px] items-center gap-3 sm:gap-4">
      <span className="text-sm text-[var(--ink-secondary)]">{label}</span>

      {/* Benchmark bar */}
      <div>
        <div className="h-8 bg-[var(--surface-sunken)] relative overflow-hidden">
          <div
            className="h-full bg-[var(--rule-strong)] transition-all duration-700"
            style={{ width: `${bPct}%` }}
          />
        </div>
        <span className="font-mono text-[11px] text-[var(--ink-tertiary)] mt-1 block">
          {benchmarkLabel}
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

export function MagnitudeGap() {
  const { keyMetrics, benchmarks, stats } = taskQualityData;

  // Compute benchmark averages (weighted toward commonly-used benchmarks)
  const avgBenchmarkWords = Math.round(
    benchmarks.reduce((s, b) => s + b.avgQuestionWords, 0) / benchmarks.length
  );
  const avgBenchmarkFiles = Math.round(
    benchmarks.reduce((s, b) => s + b.avgFilesPerTask, 0) /
      benchmarks.length *
      10
  ) / 10;

  const wordMultiplier =
    avgBenchmarkWords > 0
      ? `${Math.round(keyMetrics.avgInstructionWords / avgBenchmarkWords)}x`
      : "";
  const rubricMultiplier =
    keyMetrics.avgRubricPoints > 1
      ? `${Math.round(keyMetrics.avgRubricPoints)}x`
      : "";

  return (
    <section className="mx-auto max-w-5xl px-6 py-10">
      <div className="flex items-center gap-3 mb-6">
        <span className="font-mono text-xs text-[var(--ink-tertiary)]">02</span>
        <div className="w-8 h-px bg-[var(--rule)]" />
      </div>

      <h2 className="font-serif text-[2rem] sm:text-[2.5rem] tracking-[-0.01em] mb-3 leading-tight">
        Benchmarks Test Knowledge.
        <br />
        These Tasks Test Professional Work.
      </h2>

      <p className="text-[var(--ink-secondary)] leading-relaxed max-w-2xl mb-10">
        Beyond the GDPval comparison, Parsewave tasks differ even more
        dramatically from academic AI benchmarks. These benchmarks measure
        pattern recognition through text-only questions with binary scoring.
        Parsewave tasks reproduce professional deliverables with multi-file
        inputs, domain-specific rubrics, and graded quality levels.
      </p>

      {/* Column headers */}
      <div className="grid grid-cols-[120px_1fr_1fr_60px] sm:grid-cols-[140px_1fr_1fr_70px] items-center gap-3 sm:gap-4 mb-4">
        <span />
        <span className="font-mono text-[11px] text-[var(--ink-tertiary)] uppercase tracking-wider">
          Industry Benchmarks
        </span>
        <span className="font-mono text-[11px] text-[var(--accent)] uppercase tracking-wider font-medium">
          Parsewave Tasks
        </span>
        <span />
      </div>

      {/* Comparison rows */}
      <div className="space-y-5">
        <ComparisonRow
          label="Instruction length"
          benchmarkValue={avgBenchmarkWords}
          benchmarkLabel={`${avgBenchmarkWords} words avg`}
          parsewaveValue={keyMetrics.avgInstructionWords}
          parsewaveLabel={`${keyMetrics.avgInstructionWords} words avg`}
          maxValue={keyMetrics.avgInstructionWords}
          multiplier={wordMultiplier}
        />

        <ComparisonRow
          label="Rubric points"
          benchmarkValue={1}
          benchmarkLabel="1 (binary)"
          parsewaveValue={keyMetrics.avgRubricPoints}
          parsewaveLabel={`${keyMetrics.avgRubricPoints} points avg`}
          maxValue={keyMetrics.avgRubricPoints}
          multiplier={rubricMultiplier}
        />

        <ComparisonRow
          label="Input files"
          benchmarkValue={avgBenchmarkFiles}
          benchmarkLabel={`${avgBenchmarkFiles} files avg`}
          parsewaveValue={keyMetrics.avgDataFiles}
          parsewaveLabel={`${keyMetrics.avgDataFiles} files avg`}
          maxValue={keyMetrics.avgDataFiles}
        />

        <ComparisonRow
          label="File types"
          benchmarkValue={1}
          benchmarkLabel="1 (text only)"
          parsewaveValue={stats.uniqueFileTypes.length}
          parsewaveLabel={`${stats.uniqueFileTypes.length} types`}
          maxValue={stats.uniqueFileTypes.length}
          multiplier={`${stats.uniqueFileTypes.length}x`}
        />

        <ComparisonRow
          label="Output"
          benchmarkValue={1}
          benchmarkLabel="1 text answer"
          parsewaveValue={keyMetrics.avgSolutionFiles}
          parsewaveLabel={`${keyMetrics.avgSolutionFiles} files avg`}
          maxValue={keyMetrics.avgSolutionFiles}
        />
      </div>

      <p className="font-mono text-[11px] text-[var(--ink-tertiary)] mt-8">
        Fig. 2 - Structural comparison between industry AI benchmarks
        (MMLU, GAIA, HLE, SWE-bench, GPQA) and Parsewave evaluation tasks.
        Benchmark statistics estimated from published datasets and papers.
      </p>
    </section>
  );
}
