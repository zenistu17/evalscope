export function CTASection() {
  return (
    <section className="bg-[var(--accent-muted)]">
      <div className="mx-auto max-w-5xl px-6 py-16">
        <h2 className="font-serif text-[2.5rem] tracking-[-0.01em] mb-4">
          Need Professional-Grade Evaluation Tasks?
        </h2>

        <p className="text-[var(--ink-secondary)] leading-relaxed max-w-2xl mb-8 text-lg">
          Parsewave builds the tasks that power GDPVAL -- real professional
          deliverables created by domain experts with an average of 14 years of
          experience. If you need rigorous, multi-modal evaluation tasks that
          measure what AI can actually do, we should talk.
        </p>

        <div className="flex flex-wrap items-center gap-6">
          <a
            href="https://parsewave.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 bg-[var(--accent)] text-white text-sm font-medium hover:opacity-90 transition-opacity"
          >
            Get in touch
          </a>
          <a
            href="https://parsewave.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-[var(--accent)] hover:underline"
          >
            parsewave.ai {'->'}
          </a>
        </div>
      </div>
    </section>
  );
}
