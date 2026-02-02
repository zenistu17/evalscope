import { taskQualityData } from "@/data/taskQualityData";

const FILE_TYPE_CATEGORIES: Record<string, string> = {
  xlsx: "Spreadsheet",
  xls: "Spreadsheet",
  csv: "Data",
  json: "Data",
  sql: "Data",
  xml: "Data",
  yaml: "Data",
  docx: "Document",
  doc: "Document",
  pdf: "Document",
  md: "Document",
  txt: "Document",
  rtf: "Document",
  py: "Code",
  js: "Code",
  ts: "Code",
  tsx: "Code",
  jsx: "Code",
  html: "Code",
  css: "Code",
  java: "Code",
  sh: "Code",
  mp4: "Video",
  mov: "Video",
  mp3: "Audio",
  wav: "Audio",
  png: "Image",
  jpg: "Image",
  jpeg: "Image",
  svg: "Image",
  gif: "Image",
  stl: "3D/CAD",
  step: "3D/CAD",
  dwg: "3D/CAD",
  usdz: "3D/CAD",
  zip: "Archive",
  ttf: "Font",
  gsheet: "Spreadsheet",
  pptx: "Presentation",
};

export function DataAndDeliverables() {
  const { stats, keyMetrics } = taskQualityData;

  // Sort file types by frequency
  const fileTypes = Object.entries(stats.fileTypeFrequency)
    .sort((a, b) => b[1] - a[1])
    .map(([ext, count]) => ({
      ext,
      count,
      category: FILE_TYPE_CATEGORIES[ext] || "Other",
    }));

  // Solution file distribution (how many tasks have 1, 2, 3, etc.)
  const solDistribution = stats.solutionFilesPerTask;

  return (
    <section className="mx-auto max-w-5xl px-6 py-10">
      <div className="flex items-center gap-3 mb-6">
        <span className="font-mono text-xs text-[var(--ink-tertiary)]">03</span>
        <div className="w-8 h-px bg-[var(--rule)]" />
      </div>

      <h2 className="font-serif text-[2rem] tracking-[-0.01em] mb-3">
        Real File Types. Real Deliverables.
      </h2>

      <p className="text-[var(--ink-secondary)] leading-relaxed max-w-2xl mb-8">
        Parsewave tasks work with the actual file formats professionals use:
        spreadsheets for analysts, CAD files for engineers, video files for
        editors, code repositories for developers.
      </p>

      {/* Input files section */}
      <div className="mb-10">
        <h3 className="font-mono text-xs text-[var(--ink-tertiary)] uppercase tracking-wider mb-4">
          Input files &mdash; {keyMetrics.uniqueFileTypes}+ types
          across {taskQualityData.totalTasks} tasks
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
          {fileTypes.map(({ ext, count, category }) => (
            <div
              key={ext}
              className="p-3 bg-[var(--surface-raised)] border border-[var(--rule)]"
            >
              <div className="font-mono text-sm font-medium">.{ext}</div>
              <div className="text-[11px] text-[var(--ink-tertiary)] mt-0.5">
                {category}
              </div>
              <div className="font-mono text-xs text-[var(--ink-secondary)] mt-1">
                {count} {count === 1 ? "task" : "tasks"}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Solution deliverables section */}
      <div>
        <h3 className="font-mono text-xs text-[var(--ink-tertiary)] uppercase tracking-wider mb-4">
          Solution deliverables &mdash; Multi-file professional output
        </h3>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Tree view */}
          <div className="bg-[var(--surface-raised)] p-5">
            <p className="font-mono text-[11px] text-[var(--ink-tertiary)] mb-3">
              Typical task solution structure:
            </p>
            <div className="font-mono text-sm space-y-1">
              <div className="text-[var(--ink)]">solution/</div>
              <div className="pl-4 text-[var(--ink-secondary)]">
                ├── primary_deliverable.xlsx
              </div>
              <div className="pl-4 text-[var(--ink-secondary)]">
                ├── supporting_analysis.pdf
              </div>
              <div className="pl-4 text-[var(--ink-secondary)]">
                ├── data_sources.csv
              </div>
              <div className="pl-4 text-[var(--ink-secondary)]">
                └── methodology_notes.md
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="space-y-4">
            <div className="p-4 bg-[var(--surface-raised)]">
              <div className="font-mono text-2xl font-semibold text-[var(--accent)]">
                {stats.percentMultiFileDeliverable}%
              </div>
              <div className="text-sm text-[var(--ink-secondary)] mt-1">
                of tasks require multi-file deliverables
              </div>
            </div>

            <div className="p-4 bg-[var(--surface-raised)]">
              <div className="font-mono text-2xl font-semibold text-[var(--accent)]">
                {keyMetrics.avgSolutionFiles}
              </div>
              <div className="text-sm text-[var(--ink-secondary)] mt-1">
                average solution files per task
              </div>
            </div>

            <div className="p-4 bg-[var(--surface-raised)]">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs text-[var(--ink-tertiary)] w-16">
                  Range:
                </span>
                <span className="text-sm text-[var(--ink-secondary)]">
                  {solDistribution.min}&ndash;{solDistribution.max} files per
                  task
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Comparison */}
        <div className="flex items-start gap-4 p-4 border-l-2 border-[var(--accent)] mt-6">
          <p className="text-sm text-[var(--ink-secondary)]">
            Industry benchmark tasks expect a single text answer or letter
            choice. Parsewave tasks produce the same multi-file deliverables a
            professional would create on the job.
          </p>
        </div>
      </div>

      <p className="font-mono text-[11px] text-[var(--ink-tertiary)] mt-6">
        Fig. 3 &mdash; File type distribution and solution deliverable
        structure. File types counted by number of tasks using each type.
      </p>
    </section>
  );
}
