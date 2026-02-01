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
        <div className={`pb-6 ${b.isGDPVAL ? "border-l-2 border-l-[var(--accent)] pl-5 ml-4" : "pl-8"}`}>
          {b.taskBuilder && (
            <p className="text-xs font-medium text-[var(--accent)] uppercase tracking-wider mb-3">
              All {b.totalTasks} tasks built by {b.taskBuilder}
            </p>
          )}
          <p className="text-[var(--ink-secondary)] text-sm leading-relaxed mb-4">
            {b.description}
          </p>

          {/* Stats grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-2 mb-4 text-xs">
            <div>
              <span className="text-[var(--ink-tertiary)]">Tasks</span>
              <span className="font-mono ml-2">{b.totalTasks.toLocaleString()}</span>
            </div>
            {b.occupations > 0 && (
              <div>
                <span className="text-[var(--ink-tertiary)]">Occupations</span>
                <span className="font-mono ml-2">{b.occupations}</span>
              </div>
            )}
            {b.industries > 0 && (
              <div>
                <span className="text-[var(--ink-tertiary)]">Industries</span>
                <span className="font-mono ml-2">{b.industries}</span>
              </div>
            )}
            <div>
              <span className="text-[var(--ink-tertiary)]">Avg time</span>
              <span className="font-mono ml-2">{b.avgTaskHours < 1 ? `${Math.round(b.avgTaskHours * 60)}m` : `${b.avgTaskHours}h`}</span>
            </div>
            {b.expertYears && (
              <div>
                <span className="text-[var(--ink-tertiary)]">Expert exp.</span>
                <span className="font-mono ml-2">{b.expertYears}yr</span>
              </div>
            )}
            <div>
              <span className="text-[var(--ink-tertiary)]">Scoring</span>
              <span className="font-mono ml-2">{b.scoring}</span>
            </div>
          </div>

          {/* Top model score */}
          <div className="flex items-center gap-3 mb-4 py-2 px-3 bg-[var(--surface-raised)] border border-[var(--rule)]">
            <span className="text-xs text-[var(--ink-tertiary)]">Top model</span>
            <span className="font-mono text-xs font-medium">{b.topModel}</span>
            <div className="flex-1 max-w-32 h-1.5 bg-[var(--surface)] relative rounded-full">
              <div
                className="h-full absolute left-0 top-0 rounded-full"
                style={{
                  width: `${b.topModelScore}%`,
                  backgroundColor: b.isGDPVAL ? "var(--accent)" : b.color,
                }}
              />
            </div>
            <span className="font-mono text-xs font-medium">{b.topModelScore}%</span>
          </div>

          <p className="text-xs text-[var(--ink-secondary)] leading-relaxed mb-4">
            {b.scoringDetail}
          </p>

          {/* Strengths & Limitations as lists */}
          <div className="grid sm:grid-cols-2 gap-4 mb-4">
            {b.strengths.length > 0 && (
              <div>
                <h4 className="text-[10px] font-medium text-[var(--ink-tertiary)] uppercase tracking-wider mb-1.5">Strengths</h4>
                <ul className="space-y-1">
                  {b.strengths.map((s, i) => (
                    <li key={i} className="text-xs text-[var(--ink-secondary)] leading-relaxed flex gap-1.5">
                      <span className="text-[var(--accent)] shrink-0 mt-px">+</span>
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {b.limitations.length > 0 && (
              <div>
                <h4 className="text-[10px] font-medium text-[var(--ink-tertiary)] uppercase tracking-wider mb-1.5">Limitations</h4>
                <ul className="space-y-1">
                  {b.limitations.map((l, i) => (
                    <li key={i} className="text-xs text-[var(--ink-secondary)] leading-relaxed flex gap-1.5">
                      <span className="text-[var(--ink-tertiary)] shrink-0 mt-px">-</span>
                      {l}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <a
            href={b.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-[var(--accent)] hover:text-[var(--accent-strong)] transition-colors"
          >
            {b.url.replace("https://", "").split("/").slice(0, 2).join("/")} {'->'}
          </a>
        </div>
      )}
    </div>
  );
}
