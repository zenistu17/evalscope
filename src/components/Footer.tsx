import { sources } from "@/data/benchmarks";

const base = import.meta.env.BASE_URL;

export function Footer() {
  return (
    <footer className="mx-auto max-w-5xl px-6 pt-10 pb-16">
      <div className="flex items-center gap-3 mb-6">
        <span className="font-mono text-xs text-[var(--ink-tertiary)]">12</span>
        <div className="w-8 h-px bg-[var(--rule)]" />
      </div>

      <h2 className="font-serif text-[2rem] tracking-[-0.01em] mb-4">
        Methodology & Sources
      </h2>

      <div className="grid md:grid-cols-[1.2fr_1fr] gap-10">
        <div>
          <h3 className="text-xs font-medium text-[var(--ink-tertiary)] uppercase tracking-wider mb-4">
            Methodology
          </h3>
          <div className="text-sm text-[var(--ink-secondary)] leading-relaxed space-y-4">
            <p>
              All benchmark data in this report was verified against primary
              sources: official leaderboards, HuggingFace dataset pages, and
              peer-reviewed papers. Where discrepancies existed between sources,
              the most authoritative (official leaderboard or paper) was used.
            </p>
            <p>
              Radar scores are normalized 0-100 ratings derived from
              quantitative metrics (task count, occupational breadth, file type
              diversity) and qualitative assessment (scoring granularity,
              real-world applicability). These scores are editorial judgments
              intended for relative comparison, not absolute measurement.
            </p>
            <p>
              Industry and file-type coverage matrices reflect documented support
              in each benchmark's official dataset or publications. "Coverage"
              means at least one task or example exists in that category.
            </p>
          </div>
        </div>

        <div>
          <h3 className="text-xs font-medium text-[var(--ink-tertiary)] uppercase tracking-wider mb-4">
            Sources
          </h3>
          <ol className="space-y-2">
            {sources.map((s) => (
              <li key={s.id} className="text-sm leading-relaxed flex gap-2">
                <span className="font-mono text-xs text-[var(--ink-tertiary)] shrink-0 w-5 text-right">
                  {s.id}.
                </span>
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--ink-secondary)] hover:text-[var(--accent)] transition-colors"
                >
                  {s.label}
                  <span className="font-mono text-[10px] text-[var(--ink-tertiary)] ml-1">
                    {s.url.replace("https://", "").split("/")[0]}
                  </span>
                </a>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <div className="border-t border-[var(--rule)] mt-12 pt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <a
          href="https://parsewave.ai"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2.5 hover:opacity-80 transition-opacity"
        >
          <img src={`${base}parsewave-logo.png`} alt="Parsewave" className="h-5 w-5" />
          <img src={`${base}parsewave-text.png`} alt="Parsewave" className="h-3.5" />
        </a>
        <p className="font-mono text-[11px] text-[var(--ink-tertiary)]">
          Last updated February 2026
        </p>
      </div>
    </footer>
  );
}
