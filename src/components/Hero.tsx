const base = import.meta.env.BASE_URL;

export function Hero() {
  return (
    <header className="mx-auto max-w-5xl px-6 pt-16 pb-6">
      <div className="border-b border-[var(--rule)] pb-4 mb-10 flex items-center justify-between">
        <span className="text-sm font-medium tracking-wide">EvalScope</span>
        <span className="font-serif italic text-sm text-[var(--ink-secondary)] ml-2">The Benchmark for Benchmarks</span>
        <a
          href="https://parsewave.ai"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <img src={`${base}parsewave-logo.png`} alt="Parsewave" className="h-5 w-5" />
          <img src={`${base}parsewave-text.png`} alt="Parsewave" className="h-3.5" />
        </a>
      </div>

      <h1 className="font-serif text-[3.5rem] sm:text-[4.5rem] leading-[1.05] tracking-[-0.02em] mb-6">
        Not All Benchmarks<br />
        Are Created Equal
      </h1>

      <p className="text-lg text-[var(--ink-secondary)] max-w-lg leading-relaxed mb-6">
        We build the professional-grade tasks that power GDPVAL - the benchmark
        OpenAI uses to measure whether AI can do real work. Here is how it
        compares to everything else.
      </p>

      <div className="flex flex-wrap items-center gap-4 font-mono text-xs text-[var(--accent)] mb-6">
        <span>Selected by OpenAI</span>
        <span className="text-[var(--rule)]">|</span>
        <span>Adopted by Artificial Analysis Intelligence Index</span>
      </div>

      <div className="flex flex-wrap items-center gap-6 text-xs text-[var(--ink-tertiary)]">
        <span className="font-mono">February 2026</span>
        <span className="text-[var(--rule)]">|</span>
        <span>214 tasks delivered</span>
        <span className="text-[var(--rule)]">|</span>
        <span>14 years avg expert experience</span>
        <span className="text-[var(--rule)]">|</span>
        <span>7-10 hours per task</span>
      </div>

      <div className="border-b border-[var(--rule)] mt-10" />
    </header>
  );
}
