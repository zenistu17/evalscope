import { taskQualityData } from "@/data/taskQualityData";

interface CategoryDef {
  name: string;
  extensions: string[];
  description: string;
}

const CATEGORIES: CategoryDef[] = [
  {
    name: "Spreadsheets & Data",
    extensions: ["xlsx", "xls", "csv", "gsheet", "json", "xml", "yaml", "sql", "tsv"],
    description: "Financial models, datasets, databases",
  },
  {
    name: "Documents",
    extensions: ["docx", "doc", "pdf", "pptx", "rtf", "md", "txt"],
    description: "Reports, briefs, presentations, memos",
  },
  {
    name: "Code & Config",
    extensions: [
      "py", "js", "ts", "tsx", "jsx", "html", "css", "java", "sh",
      "toml", "yml", "ini", "env", "lock", "cfg",
    ],
    description: "Source code, scripts, configuration",
  },
  {
    name: "Images",
    extensions: ["png", "jpg", "jpeg", "svg", "gif", "webp", "bmp", "tiff"],
    description: "Screenshots, diagrams, photos",
  },
  {
    name: "Video & Audio",
    extensions: ["mp4", "mov", "mp3", "wav", "avi", "mkv", "flac"],
    description: "Film footage, music tracks, voice recordings",
  },
  {
    name: "3D & CAD",
    extensions: ["stl", "step", "dwg", "usdz", "obj", "fbx", "iges"],
    description: "Engineering models, 3D assets, CAD drawings",
  },
  {
    name: "Archives & Other",
    extensions: ["zip", "ttf", "otf", "rar", "7z", "tar"],
    description: "Compressed files, fonts, binaries",
  },
];

export function DataAndDeliverables() {
  const { stats, keyMetrics, tasks } = taskQualityData;

  // Compute task count per category (how many tasks use at least one file type in this category)
  const categoryStats = CATEGORIES.map((cat) => {
    const extSet = new Set(cat.extensions);
    const taskCount = tasks.filter((t) => {
      const allTypes = [...t.dataFileTypes, ...t.solutionFileTypes];
      return allTypes.some((ext) => extSet.has(ext));
    }).length;
    // Top file types in this category that actually appear in data
    const topTypes = cat.extensions
      .filter((ext) => stats.fileTypeFrequency[ext])
      .sort((a, b) => (stats.fileTypeFrequency[b] || 0) - (stats.fileTypeFrequency[a] || 0))
      .slice(0, 4);
    return { ...cat, taskCount, topTypes };
  }).filter((c) => c.taskCount > 0);

  const maxCategoryCount = Math.max(...categoryStats.map((c) => c.taskCount));
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

      {/* File type categories */}
      <div className="mb-10">
        <h3 className="font-mono text-xs text-[var(--ink-tertiary)] uppercase tracking-wider mb-4">
          Input and output files - {keyMetrics.uniqueFileTypes} unique types
          across {taskQualityData.totalTasks} tasks
        </h3>

        <div className="space-y-3">
          {categoryStats.map(({ name, description, taskCount, topTypes }) => (
            <div key={name} className="flex items-center gap-4">
              <div className="w-44 sm:w-56 shrink-0">
                <div className="text-sm font-medium">{name}</div>
                <div className="text-[11px] text-[var(--ink-tertiary)]">
                  {description}
                </div>
              </div>
              <div className="flex-1 h-8 bg-[var(--surface-raised)] relative overflow-hidden">
                <div
                  className="h-full bg-[var(--accent)]"
                  style={{
                    width: `${(taskCount / maxCategoryCount) * 100}%`,
                  }}
                />
              </div>
              <div className="shrink-0 text-right">
                <div className="font-mono text-sm font-medium w-20 text-right">
                  {taskCount} tasks
                </div>
                <div className="font-mono text-[10px] text-[var(--ink-tertiary)]">
                  {topTypes.map((t) => `.${t}`).join(", ")}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Solution deliverables section */}
      <div>
        <h3 className="font-mono text-xs text-[var(--ink-tertiary)] uppercase tracking-wider mb-4">
          Solution deliverables - multi-file professional output
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
                |-- primary_deliverable.xlsx
              </div>
              <div className="pl-4 text-[var(--ink-secondary)]">
                |-- supporting_analysis.pdf
              </div>
              <div className="pl-4 text-[var(--ink-secondary)]">
                |-- data_sources.csv
              </div>
              <div className="pl-4 text-[var(--ink-secondary)]">
                |-- methodology_notes.md
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
                  {solDistribution.min}-{solDistribution.max} files per task
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
        Fig. 3 - File type categories and solution deliverable structure.
        Category counts reflect tasks using at least one file type in
        that category.
      </p>
    </section>
  );
}
