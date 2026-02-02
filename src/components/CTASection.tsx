import { modelResultsData } from "@/data/modelResultsData";

export function CTASection() {
  const { totalTasks, models } = modelResultsData;
  const bestRate = Math.round(models[0].passRate);

  return (
    <section className="bg-[var(--accent-muted)]">
      <div className="mx-auto max-w-5xl px-6 py-16">
        <h2 className="font-serif text-[2.5rem] tracking-[-0.01em] mb-4">
          Know What AI Can and Cannot Do for Your Work
        </h2>

        <p className="text-[var(--ink-secondary)] leading-relaxed max-w-2xl mb-8 text-lg">
          Current frontier models pass {bestRate}% of professional tasks.
          Understanding which workflows AI can handle today - and which remain
          beyond reach - is the difference between successful deployment and
          expensive failure.
        </p>

        <div className="grid md:grid-cols-2 gap-6 mb-10">
          <div className="bg-[var(--surface)] p-5">
            <h3 className="font-semibold text-[var(--ink)] mb-2">
              AI Labs and Model Developers
            </h3>
            <p className="text-sm text-[var(--ink-secondary)] leading-relaxed">
              Test your models against {totalTasks} professional tasks that
              current SOTA passes only half the time. Identify capability gaps
              across occupations and industries before deployment.
            </p>
          </div>

          <div className="bg-[var(--surface)] p-5">
            <h3 className="font-semibold text-[var(--ink)] mb-2">
              Enterprise AI Adopters
            </h3>
            <p className="text-sm text-[var(--ink-secondary)] leading-relaxed">
              Understand which professional workflows AI can reliably handle
              for your team. Build evaluation suites matched to your industry
              with domain expert-designed tasks and professional-grade rubrics.
            </p>
          </div>
        </div>

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
            {"parsewave.ai ->"}
          </a>
        </div>
      </div>
    </section>
  );
}
