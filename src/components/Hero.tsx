export function Hero() {
  return (
    <header className="mx-auto max-w-5xl px-6 pt-20 pb-16">
      <div className="border-b border-[var(--rule)] pb-4 mb-10 flex items-baseline justify-between">
        <span className="text-sm font-medium tracking-wide">EvalScope</span>
        <span className="text-xs text-[var(--ink-tertiary)]">by Parsewave</span>
      </div>

      <h1 className="font-serif text-[3.5rem] sm:text-[4.5rem] leading-[1.05] tracking-[-0.02em] mb-6">
        Not All Benchmarks<br />
        Are Created Equal
      </h1>

      <p className="text-lg text-[var(--ink-secondary)] max-w-lg leading-relaxed mb-8">
        An independent analysis of 8 AI evaluation frameworks across
        occupational breadth, task depth, and real-world applicability.
      </p>

      <div className="flex items-center gap-6 text-xs text-[var(--ink-tertiary)]">
        <span className="font-mono">February 2026</span>
        <span className="text-[var(--rule)]">|</span>
        <span>8 benchmarks compared</span>
        <span className="text-[var(--rule)]">|</span>
        <span>All data verified against primary sources</span>
      </div>

      <div className="border-b border-[var(--rule)] mt-10" />
    </header>
  );
}
