const base = import.meta.env.BASE_URL;

export function Hero() {
  return (
    <header className="mx-auto max-w-5xl px-6 pt-16 pb-6">
      <div className="border-b border-[var(--rule)] pb-4 mb-10 flex items-center justify-between">
        <span className="text-sm font-medium tracking-wide">EvalScope</span>
        <a
          href="https://parsewave.ai"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <img src={`${base}parsewave-logo.png`} alt="" className="h-5 w-5" />
          <img src={`${base}parsewave-text.png`} alt="Parsewave" className="h-3.5" />
        </a>
      </div>

      <h1 className="font-serif text-[3.5rem] sm:text-[4.5rem] leading-[1.05] tracking-[-0.02em] mb-6">
        There Is No Best<br />
        AI Model
      </h1>

      <p className="text-lg text-[var(--ink-secondary)] max-w-xl leading-relaxed mb-6">
        We evaluated four frontier AI models on 26 professional tasks
        spanning 11 occupations. The model that leads overall loses in most
        individual occupations. Rankings depend entirely on the work being done.
      </p>

      <div className="flex flex-wrap items-center gap-6 text-xs text-[var(--ink-tertiary)]">
        <span className="font-mono">February 2026</span>
        <span className="text-[var(--rule)]">|</span>
        <span>26 scored tasks</span>
        <span className="text-[var(--rule)]">|</span>
        <span>4 frontier models</span>
        <span className="text-[var(--rule)]">|</span>
        <span>11 occupations</span>
      </div>

      <div className="border-b border-[var(--rule)] mt-10" />
    </header>
  );
}
