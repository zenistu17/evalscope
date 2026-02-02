export function CTASection() {
  return (
    <section className="bg-[var(--accent-muted)]">
      <div className="mx-auto max-w-5xl px-6 py-16">
        <h2 className="font-serif text-[2.5rem] tracking-[-0.01em] mb-4">
          Need to Know How AI Performs in Your Industry?
        </h2>

        <p className="text-[var(--ink-secondary)] leading-relaxed max-w-2xl mb-4 text-lg">
          We build occupation-specific evaluation tasks with professional-grade
          rubrics. If you need to understand how AI models actually perform on
          the work your team does, we can design an evaluation that answers that
          question.
        </p>

        <p className="text-[var(--ink-secondary)] leading-relaxed max-w-2xl mb-8">
          Our methodology has been used to evaluate frontier models across
          36 occupations and 9 industry sectors. We work with AI labs and
          enterprises to build, validate, and score evaluation tasks that
          measure real capability.
        </p>

        <div className="flex flex-wrap items-center gap-6">
          <a
            href="https://parsewave.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 bg-[var(--accent)] text-white text-sm font-medium hover:opacity-90 transition-opacity"
          >
            Contact Parsewave
          </a>
          <a
            href="https://parsewave.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-[var(--accent)] hover:underline"
          >
            parsewave.ai &rarr;
          </a>
        </div>
      </div>
    </section>
  );
}
