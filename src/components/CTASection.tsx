import { taskQualityData } from "@/data/taskQualityData";

export function CTASection() {
  const { totalTasks, keyMetrics } = taskQualityData;

  return (
    <section className="bg-[var(--accent-muted)]">
      <div className="mx-auto max-w-5xl px-6 py-16">
        <h2 className="font-serif text-[2.5rem] tracking-[-0.01em] mb-4">
          Evaluation Tasks Built For Your Industry
        </h2>

        <p className="text-[var(--ink-secondary)] leading-relaxed max-w-2xl mb-8 text-lg">
          We build occupation-specific evaluation tasks with professional-grade
          rubrics. If you need to understand how AI models actually perform on
          the work your team does, we can design an evaluation that answers that
          question.
        </p>

        <div className="grid md:grid-cols-2 gap-6 mb-10">
          <div className="bg-[var(--surface)] p-5">
            <h3 className="font-semibold text-[var(--ink)] mb-2">
              AI Labs &amp; Model Developers
            </h3>
            <p className="text-sm text-[var(--ink-secondary)] leading-relaxed">
              Evaluate your models on real professional tasks before deployment.
              Understand capability gaps across occupations and industries with
              rubric-based scoring that captures quality gradients.
            </p>
          </div>

          <div className="bg-[var(--surface)] p-5">
            <h3 className="font-semibold text-[var(--ink)] mb-2">
              Enterprise AI Adopters
            </h3>
            <p className="text-sm text-[var(--ink-secondary)] leading-relaxed">
              Validate AI performance for your specific workflows. Build
              evaluation suites that match your team&apos;s actual work with
              domain expert-designed tasks and professional standards.
            </p>
          </div>
        </div>

        <p className="text-sm text-[var(--ink-secondary)] mb-6">
          {totalTasks} tasks built across {keyMetrics.uniqueOccupations}{" "}
          occupations and {keyMetrics.uniqueSectors} sectors. Our methodology
          has been applied to build professional evaluation tasks across diverse
          industries.
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
