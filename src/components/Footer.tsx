import { sources } from "@/data/benchmarks";

export function Footer() {
  return (
    <footer className="mx-auto max-w-4xl px-6 pt-16 pb-20">
      <div className="flex items-center gap-3 mb-6">
        <span className="font-mono text-xs text-[var(--ink-tertiary)]">09</span>
        <div className="w-8 h-px bg-[var(--rule)]" />
      </div>

      <h2 className="font-serif text-[2rem] tracking-[-0.01em] mb-10">
        Methodology &amp; Sources
      </h2>

      <div className="grid md:grid-cols-[1.2fr_1fr] gap-12">
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
              Radar scores are normalized 0&ndash;100 ratings derived from
              quantitative metrics (task count, occupational breadth, file type
              diversity) and qualitative assessment (scoring granularity,
              real-world applicability). These scores are editorial judgments
              intended for relative comparison, not absolute measurement.
            </p>
            <p>
              Industry and file-type coverage matrices reflect documented support
              in each benchmark&rsquo;s official dataset or publications. &ldquo;Coverage&rdquo;
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
        <div className="flex items-baseline gap-2">
          <span className="text-sm font-medium">EvalScope</span>
          <span className="text-xs text-[var(--ink-tertiary)]">by Parsewave.ai</span>
        </div>
        <p className="font-mono text-[11px] text-[var(--ink-tertiary)]">
          Last updated February 2026 &middot; Data version 2.1
        </p>
      </div>
    </footer>
  );
}
