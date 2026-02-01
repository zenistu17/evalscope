const showcaseTasks = [
  {
    occupation: "Financial Advisor",
    industry: "Finance & Insurance",
    task: "Build a comprehensive retirement plan for a client with multiple income streams, analyzing tax implications and producing a formatted advisory report.",
    fileTypes: ["XLSX", "PDF", "DOCX"],
    hours: 8,
  },
  {
    occupation: "Film Editor",
    industry: "Media & Creative",
    task: "Edit raw interview footage into a polished 3-minute promotional video with transitions, color grading, and audio mixing.",
    fileTypes: ["MP4", "MP3", "PNG"],
    hours: 6,
  },
  {
    occupation: "Procurement Specialist",
    industry: "Government & Admin",
    task: "Draft a public tender document aligned with national procurement regulations, including scoring criteria and vendor evaluation framework.",
    fileTypes: ["DOCX", "XLSX", "PDF"],
    hours: 10,
  },
  {
    occupation: "Mechanical Engineer",
    industry: "Engineering & Mfg",
    task: "Design a replacement bracket from field measurements, produce a 3D model, and generate a technical drawing with tolerances.",
    fileTypes: ["STL", "PDF", "PNG"],
    hours: 5,
  },
  {
    occupation: "Registered Nurse",
    industry: "Healthcare",
    task: "Compile a pediatric well-child examination report from clinical data, immunization records, and anticipatory guidance references.",
    fileTypes: ["DOCX", "PDF"],
    hours: 4,
  },
  {
    occupation: "Music Producer",
    industry: "Media & Creative",
    task: "Arrange and produce a 60-second commercial jingle from a creative brief, delivering a mixed and mastered audio file.",
    fileTypes: ["WAV", "MP3"],
    hours: 7,
  },
];

export function TaskShowcase() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-10">
      <div className="flex items-center gap-3 mb-6">
        <span className="font-mono text-xs text-[var(--ink-tertiary)]">09</span>
        <div className="w-8 h-px bg-[var(--rule)]" />
      </div>

      <h2 className="font-serif text-[2rem] tracking-[-0.01em] mb-4">
        Task Examples
      </h2>

      <p className="text-[var(--ink-secondary)] leading-relaxed max-w-2xl mb-6">
        Representative tasks from the GDPVAL benchmark. Each task produces a
        real deliverable that domain experts evaluate against multi-criteria rubrics.
      </p>

      <div className="grid md:grid-cols-2 gap-6">
        {showcaseTasks.map((t) => (
          <article
            key={t.occupation}
            className="border border-[var(--rule)] p-5"
          >
            <div className="flex items-baseline justify-between gap-3 mb-3">
              <h3 className="text-sm font-semibold">{t.occupation}</h3>
              <span className="font-mono text-[11px] text-[var(--ink-tertiary)] shrink-0">
                {t.industry}
              </span>
            </div>

            <p className="text-sm text-[var(--ink-secondary)] leading-relaxed mb-4">
              {t.task}
            </p>

            <div className="flex items-center justify-between">
              <div className="flex gap-1.5">
                {t.fileTypes.map((ft) => (
                  <span
                    key={ft}
                    className="font-mono text-[10px] px-1.5 py-0.5 bg-[var(--surface-raised)] text-[var(--ink-tertiary)]"
                  >
                    {ft}
                  </span>
                ))}
              </div>
              <span className="font-mono text-[11px] text-[var(--ink-tertiary)]">
                ~{t.hours}h
              </span>
            </div>
          </article>
        ))}
      </div>

      <p className="font-mono text-[11px] text-[var(--ink-tertiary)] mt-4">
        Fig. 6 - Sample tasks across 6 of 36 occupations. Each task takes an expert 4-10 hours to complete.
      </p>
    </section>
  );
}
