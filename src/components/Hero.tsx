import { modelResultsData } from "@/data/modelResultsData";

const base = import.meta.env.BASE_URL;

export function Hero() {
  const { totalTasks, models, unsolvedCount, judge } = modelResultsData;
  const bestModel = models[0];
  const bestRate = Math.round(bestModel.passRate);

  return (
    <header className="mx-auto max-w-5xl px-6 pt-16 pb-6">
      <div className="border-b border-[var(--rule)] pb-4 mb-10 flex items-center justify-between">
        <a
          href="https://parsewave.ai"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <img src={`${base}parsewave-logo.png`} alt="" className="h-5 w-5" />
          <img
            src={`${base}parsewave-text.png`}
            alt="Parsewave"
            className="h-3.5"
          />
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

      <h1 className="font-serif text-[3.5rem] sm:text-[4.5rem] leading-[1.05] tracking-[-0.02em] mb-6">
        How Hard Is
        <br />
        Professional Work
        <br />
        for AI?
      </h1>

      <p className="text-lg text-[var(--ink-secondary)] max-w-xl leading-relaxed mb-6">
        {models.length} frontier models. {totalTasks} professional tasks.{" "}
        {modelResultsData.attemptsPerTask} attempts each. The best model
        passes {bestRate}% of the time. {unsolvedCount} tasks remain unsolved
        by every model tested.
      </p>

      <div className="flex flex-wrap items-center gap-6 text-xs text-[var(--ink-tertiary)]">
        <span className="font-mono">February 2026</span>
        <span className="text-[var(--rule)]">|</span>
        <span>{totalTasks} tasks</span>
        <span className="text-[var(--rule)]">|</span>
        <span>{models.length} models</span>
        <span className="text-[var(--rule)]">|</span>
        <span>{modelResultsData.attemptsPerTask} attempts each</span>
        <span className="text-[var(--rule)]">|</span>
        <span>{judge} judge</span>
      </div>

      <div className="border-b border-[var(--rule)] mt-10" />
    </header>
  );
}
