import { competitorIssues } from "@/data/research";

export function BenchmarkCritique() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-10">
      <div className="flex items-center gap-3 mb-6">
        <span className="font-mono text-xs text-[var(--ink-tertiary)]">10</span>
        <div className="w-8 h-px bg-[var(--rule)]" />
      </div>

      <h2 className="font-serif text-[2rem] tracking-[-0.01em] mb-4">
        Problems Our Methodology Solves
      </h2>

      <p className="text-[var(--ink-secondary)] leading-relaxed max-w-2xl mb-8">
        Documented issues with competing benchmark methodologies that
        Parsewave's approach was designed to avoid.
      </p>

      <div className="space-y-8">
        {competitorIssues.map((ci) => (
          <div key={ci.benchmark}>
            <h3 className="text-base font-semibold text-[var(--ink)] mb-3">
              {ci.benchmark}
            </h3>
            <ul className="space-y-3">
              {ci.issues.map((issue, i) => (
                <li key={i} className="text-sm text-[var(--ink-secondary)] leading-relaxed pl-4 border-l border-[var(--rule)]">
                  <p className="mb-1">{issue.text}</p>
                  <a
                    href={issue.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-[11px] text-[var(--ink-tertiary)] hover:text-[var(--accent)] transition-colors"
                  >
                    Source: {issue.source}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-10 pt-6 border-t border-[var(--rule)]">
        <p className="text-sm text-[var(--ink-secondary)] leading-relaxed max-w-2xl">
          Parsewave's methodology addresses every one of these issues:
          multi-criteria rubric scoring (up to 40 points per task),
          expert-validated deliverables reviewed by professionals with 14 years
          average experience, and evaluation across 36 occupations in 9
          industries using 17+ file formats. This is the standard we bring to
          every engagement.
        </p>
      </div>
    </section>
  );
}
