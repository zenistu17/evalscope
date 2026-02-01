import { benchmarks } from "@/data/benchmarks";
import type { Benchmark } from "@/data/benchmarks";

export function BenchmarkCards() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-10">
      <div className="flex items-center gap-3 mb-6">
        <span className="font-mono text-xs text-[var(--ink-tertiary)]">03</span>
        <div className="w-8 h-px bg-[var(--rule)]" />
      </div>

      <h2 className="font-serif text-[2rem] tracking-[-0.01em] mb-4">
        Benchmark Profiles
      </h2>

      <p className="text-[var(--ink-secondary)] leading-relaxed max-w-2xl mb-6">
        A closer look at each framework &mdash; what it tests, how it scores,
        and where it falls short.
      </p>

      <div className="space-y-10">
        {benchmarks.map((b) => (
          <BenchmarkEntry key={b.id} benchmark={b} />
        ))}
      </div>
    </section>
  );
}

function BenchmarkEntry({ benchmark: b }: { benchmark: Benchmark }) {
  return (
    <article className={b.isGDPVAL ? "border-l-2 border-l-[var(--accent)] pl-5" : ""}>
      <div className="flex items-baseline justify-between gap-4 mb-2">
        <h3 className="text-lg font-semibold">{b.name}</h3>
        <span className="text-xs text-[var(--ink-tertiary)] shrink-0">
          {b.creator}, {b.year}
        </span>
      </div>

      <div className="border-b border-[var(--rule)] mb-3" />

      <p className="text-[var(--ink-secondary)] text-sm leading-relaxed mb-3">
        {b.description}
      </p>

      <div className="font-mono text-xs text-[var(--ink-secondary)] flex flex-wrap gap-x-2 gap-y-1 mb-3">
        <span>{b.totalTasks.toLocaleString()} tasks</span>
        <span className="text-[var(--rule)]">|</span>
        {b.occupations > 0 && (
          <>
            <span>{b.occupations} occupations</span>
            <span className="text-[var(--rule)]">|</span>
          </>
        )}
        {b.industries > 0 && (
          <>
            <span>{b.industries} {b.industries === 1 ? "industry" : "industries"}</span>
            <span className="text-[var(--rule)]">|</span>
          </>
        )}
        <span>{b.avgTaskHours < 1 ? `${Math.round(b.avgTaskHours * 60)}m avg` : `${b.avgTaskHours}h avg`}</span>
        {b.expertYears && (
          <>
            <span className="text-[var(--rule)]">|</span>
            <span>{b.expertYears}yr expert exp.</span>
          </>
        )}
        <span className="text-[var(--rule)]">|</span>
        <span>{b.scoring}</span>
      </div>

      {b.limitations.length > 0 && (
        <div className="text-xs text-[var(--ink-tertiary)] leading-relaxed">
          <span className="font-medium">Limitations: </span>
          {b.limitations.join(". ")}.
        </div>
      )}

      <div className="mt-2">
        <a
          href={b.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-[var(--accent)] hover:text-[var(--accent-strong)] transition-colors"
        >
          {b.url.replace("https://", "").split("/").slice(0, 2).join("/")} &rarr;
        </a>
      </div>
    </article>
  );
}
