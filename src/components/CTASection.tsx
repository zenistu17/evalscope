export function CTASection() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-10">
      <div className="flex items-center gap-3 mb-6">
        <span className="font-mono text-xs text-[var(--ink-tertiary)]">10</span>
        <div className="w-8 h-px bg-[var(--rule)]" />
      </div>

      <h2 className="font-serif text-[2rem] tracking-[-0.01em] mb-4">
        Need Professional-Grade Evaluation Tasks?
      </h2>

      <p className="text-[var(--ink-secondary)] leading-relaxed max-w-2xl mb-8">
        Parsewave builds the tasks that power GDPVAL - real professional
        deliverables created by domain experts with an average of 14 years of
        experience. If you need rigorous, multi-modal evaluation tasks that
        measure what AI can actually do, we should talk.
      </p>

      <div className="flex flex-wrap items-center gap-6 mb-8">
        <a
          href="https://parsewave.ai"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-5 py-2.5 bg-[var(--accent)] text-white text-sm font-medium hover:opacity-90 transition-opacity"
        >
          Get in touch
        </a>
        <a
          href="https://parsewave.ai"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-[var(--accent)] hover:underline"
        >
          parsewave.ai {'->'}
        </a>
      </div>

      <div className="flex flex-wrap items-center gap-4 font-mono text-[11px] text-[var(--ink-tertiary)]">
        <span>Selected by OpenAI</span>
        <span className="text-[var(--rule)]">|</span>
        <span>14yr avg expert experience</span>
        <span className="text-[var(--rule)]">|</span>
        <span>214 tasks delivered</span>
      </div>
    </section>
  );
}
