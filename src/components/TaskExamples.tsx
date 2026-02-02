import { modelResultsData } from "@/data/modelResultsData";

export function TaskExamples() {
  const { totalTasks } = modelResultsData;

  return (
    <section className="mx-auto max-w-5xl px-6 py-10">
      <div className="flex items-center gap-3 mb-6">
        <span className="font-mono text-xs text-[var(--ink-tertiary)]">04</span>
        <div className="w-8 h-px bg-[var(--rule)]" />
      </div>

      <h2 className="font-serif text-[2rem] tracking-[-0.01em] mb-3">
        What Professional Tasks Look Like
      </h2>

      <p className="text-[var(--ink-secondary)] leading-relaxed max-w-2xl mb-8">
        Each task reproduces real professional work: analyzing case files,
        building financial models, editing video, running engineering
        simulations. Tasks are designed by working professionals with domain
        expertise.
      </p>

      <div className="space-y-3 mb-6">
        <div className="bg-[var(--surface-raised)] p-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="font-mono text-[11px] text-[var(--accent)] font-medium">Law</span>
            <span className="text-[var(--rule)]">|</span>
            <span className="font-mono text-[11px] text-[var(--ink-tertiary)]">Lawyers</span>
          </div>
          <p className="text-sm text-[var(--ink-secondary)] leading-relaxed">
            Analyze the attached case file on antitrust law, research whether
            the defendant's refusal to deal violated Sherman Act Section 2,
            provide case precedents with summaries, and show how each applies
            to the current facts.
          </p>
        </div>

        <div className="bg-[var(--surface-raised)] p-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="font-mono text-[11px] text-[var(--accent)] font-medium">Healthcare</span>
            <span className="text-[var(--rule)]">|</span>
            <span className="font-mono text-[11px] text-[var(--ink-tertiary)]">Transitional Care Coordinator</span>
          </div>
          <p className="text-sm text-[var(--ink-secondary)] leading-relaxed">
            Stratify 150 discharged patients by 30-day readmission risk using
            LACE Plus scoring. Develop tailored transition care plans, resource
            allocation dashboards, and quality metrics trackers from discharge
            notes, illness records, and medication details.
          </p>
        </div>

        <div className="bg-[var(--surface-raised)] p-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="font-mono text-[11px] text-[var(--accent)] font-medium">Software Dev</span>
            <span className="text-[var(--rule)]">|</span>
            <span className="font-mono text-[11px] text-[var(--ink-tertiary)]">Backend Developer</span>
          </div>
          <p className="text-sm text-[var(--ink-secondary)] leading-relaxed">
            Implement a Stripe subscription billing system in Node.js/TypeScript
            for a SaaS fitness platform. Build REST API endpoints, webhook
            handlers, idempotency middleware, and database migration scripts.
          </p>
        </div>

        <div className="bg-[var(--surface-raised)] p-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="font-mono text-[11px] text-[var(--accent)] font-medium">Video/Audio</span>
            <span className="text-[var(--rule)]">|</span>
            <span className="font-mono text-[11px] text-[var(--ink-tertiary)]">Film and Video Editor</span>
          </div>
          <p className="text-sm text-[var(--ink-secondary)] leading-relaxed">
            Edit shelter event footage into a 20-30 second vertical video
            (9:16) for a dog adoption campaign. Include emotional scene
            transitions, text overlays for mobile, H.264/AAC encoding,
            and a thumbnail image.
          </p>
        </div>

        <div className="bg-[var(--surface-raised)] p-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="font-mono text-[11px] text-[var(--accent)] font-medium">Engineering</span>
            <span className="text-[var(--rule)]">|</span>
            <span className="font-mono text-[11px] text-[var(--ink-tertiary)]">Mechanical Engineer</span>
          </div>
          <p className="text-sm text-[var(--ink-secondary)] leading-relaxed">
            Analyze and optimize an off-road buggy chassis frame from DWG
            drawings and 3D sketches. Run finite element analysis, conduct a
            mass reduction design study while maintaining structural integrity,
            and produce optimization reports with scenario comparisons.
          </p>
        </div>

        <div className="bg-[var(--surface-raised)] p-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="font-mono text-[11px] text-[var(--accent)] font-medium">Finance</span>
            <span className="text-[var(--rule)]">|</span>
            <span className="font-mono text-[11px] text-[var(--ink-tertiary)]">Personal Financial Advisor</span>
          </div>
          <p className="text-sm text-[var(--ink-secondary)] leading-relaxed">
            Create a comprehensive early retirement financial plan from client
            profile, severance options, Social Security statements, and tax
            documents. Build a planning model with projections, pension
            analysis, and a written recommendation memo.
          </p>
        </div>
      </div>

      <p className="font-mono text-[11px] text-[var(--ink-tertiary)] mt-6">
        Fig. 4 - Representative task instructions from 6 professions.{" "}
        {totalTasks} tasks across 35 occupations and 9 industry sectors. Each
        task includes reference files, data files, and multi-criteria evaluation
        rubrics.
      </p>
    </section>
  );
}
