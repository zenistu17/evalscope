import { useState } from "react";
import { benchmarks } from "@/data/benchmarks";
import type { Benchmark } from "@/data/benchmarks";

export function BenchmarkCards() {
  const [openId, setOpenId] = useState<string | null>(null);

  function toggle(id: string) {
    setOpenId((prev) => (prev === id ? null : id));
  }

  return (
    <section className="mx-auto max-w-5xl px-6 py-10">
      <div className="flex items-center gap-3 mb-6">
        <span className="font-mono text-xs text-[var(--ink-tertiary)]">11</span>
        <div className="w-8 h-px bg-[var(--rule)]" />
      </div>

      <h2 className="font-serif text-[2rem] tracking-[-0.01em] mb-4">
        Appendix: Benchmark Profiles
      </h2>

      <p className="text-[var(--ink-secondary)] leading-relaxed max-w-2xl mb-6">
        Detailed profiles of all eight benchmarks for reference. Click to expand.
      </p>

      <div className="space-y-0 border-t border-[var(--rule)]">
        {benchmarks.map((b) => (
          <BenchmarkEntry
            key={b.id}
            benchmark={b}
            isOpen={openId === b.id}
            onToggle={() => toggle(b.id)}
          />
        ))}
      </div>
    </section>
  );
}

function BenchmarkEntry({
  benchmark: b,
  isOpen,
  onToggle,
}: {
  benchmark: Benchmark;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-[var(--rule)]">
      <button
        onClick={onToggle}
        className={`w-full text-left py-4 flex items-center gap-4 transition-colors ${
          isOpen ? "bg-[var(--surface-raised)] px-4 -mx-4" : "hover:bg-[var(--surface-raised)] hover:px-4 hover:-mx-4"
        }`}
      >
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          className={`shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="var(--ink-tertiary)"
          strokeWidth="1.5"
        >
          <path d="M3 4.5L6 7.5L9 4.5" />
        </svg>

        <div className="flex-1 min-w-0">
          <div className="flex items-baseline gap-3">
            <span className={`font-semibold ${b.isGDPVAL ? "text-[var(--accent)]" : ""}`}>
              {b.name}
            </span>
            <span className="text-xs text-[var(--ink-tertiary)] shrink-0">
              {b.creator}, {b.year}
            </span>
            {b.taskBuilder && (
              <span className="text-xs text-[var(--accent)] font-medium shrink-0">
                Tasks by {b.taskBuilder}
              </span>
            )}
          </div>
          <p className="font-serif italic text-sm text-[var(--ink-secondary)] mt-0.5 truncate">
            {b.tagline}
          </p>
        </div>
      </button>

      {isOpen && (
        <div className={`pb-5 ${b.isGDPVAL ? "border-l-2 border-l-[var(--accent)] pl-5 ml-4" : "pl-8"}`}>
          {b.taskBuilder && (
            <p className="text-xs font-medium text-[var(--accent)] uppercase tracking-wider mb-2">
              All {b.totalTasks} tasks built by {b.taskBuilder}
            </p>
          )}
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

          <div className="flex items-center gap-3 mb-3">
            <span className="text-xs text-[var(--ink-tertiary)]">Top model:</span>
            <span className="font-mono text-xs font-medium">{b.topModel}</span>
            <div className="flex-1 max-w-32 h-1 bg-[var(--surface)] relative">
              <div
                className="h-full absolute left-0 top-0"
                style={{
                  width: `${b.topModelScore}%`,
                  backgroundColor: b.isGDPVAL ? "var(--accent)" : b.color,
                }}
              />
            </div>
            <span className="font-mono text-xs">{b.topModelScore}%</span>
          </div>

          <p className="text-xs text-[var(--ink-secondary)] leading-relaxed mb-3">
            {b.scoringDetail}
          </p>

          {b.strengths.length > 0 && (
            <div className="mb-2">
              <span className="text-xs font-medium text-[var(--ink-tertiary)] uppercase tracking-wider">Strengths: </span>
              <span className="text-xs text-[var(--ink-secondary)]">
                {b.strengths.join(". ")}.
              </span>
            </div>
          )}

          {b.limitations.length > 0 && (
            <div className="mb-2">
              <span className="text-xs font-medium text-[var(--ink-tertiary)] uppercase tracking-wider">Limitations: </span>
              <span className="text-xs text-[var(--ink-secondary)]">
                {b.limitations.join(". ")}.
              </span>
            </div>
          )}

          <div className="mt-3">
            <a
              href={b.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-[var(--accent)] hover:text-[var(--accent-strong)] transition-colors"
            >
              {b.url.replace("https://", "").split("/").slice(0, 2).join("/")} {'->'}
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
