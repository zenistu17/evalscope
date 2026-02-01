import { Hero } from "@/components/Hero";
import { KeyInsights } from "@/components/KeyInsights";
import { ComparisonTable } from "@/components/ComparisonTable";
import { WhyParsewave } from "@/components/WhyParsewave";
import { TaskShowcase } from "@/components/TaskShowcase";
import { RadarComparison } from "@/components/RadarComparison";
import { CoverageMatrix } from "@/components/CoverageMatrix";
import { TaskQualityComparison } from "@/components/TaskQualityComparison";
import { TheStakes } from "@/components/TheStakes";
import { InThePress } from "@/components/InThePress";
import { BenchmarkCritique } from "@/components/BenchmarkCritique";
import { BenchmarkCards } from "@/components/BenchmarkCards";
import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";

function App() {
  return (
    <div className="min-h-screen bg-[var(--surface)] text-[var(--ink)]">
      <Hero />
      <KeyInsights />
      <div className="mx-auto max-w-5xl px-6"><div className="border-b border-[var(--rule)]" /></div>
      <ComparisonTable />
      <div className="mx-auto max-w-5xl px-6"><div className="border-b border-[var(--rule)]" /></div>

      {/* Pull quote */}
      <div className="mx-auto max-w-5xl px-6 py-12 text-center">
        <div className="font-mono text-6xl font-medium text-[var(--accent)] mb-3">
          214
        </div>
        <p className="font-serif italic text-lg text-[var(--ink-secondary)] max-w-lg mx-auto mb-2">
          Professional-grade tasks. 36 occupations. 17+ file types. The work
          that set the industry standard for AI evaluation.
        </p>
        <p className="font-mono text-xs text-[var(--ink-tertiary)]">
          Built by Parsewave for OpenAI's GDPVAL
        </p>
      </div>

      <div className="mx-auto max-w-5xl px-6"><div className="border-b border-[var(--rule)]" /></div>
      <WhyParsewave />
      <div className="mx-auto max-w-5xl px-6"><div className="border-b border-[var(--rule)]" /></div>
      <TaskShowcase />
      <div className="mx-auto max-w-5xl px-6"><div className="border-b border-[var(--rule)]" /></div>
      <RadarComparison />
      <div className="mx-auto max-w-5xl px-6"><div className="border-b border-[var(--rule)]" /></div>
      <CoverageMatrix />
      <div className="mx-auto max-w-5xl px-6"><div className="border-b border-[var(--rule)]" /></div>
      <TaskQualityComparison />
      <div className="mx-auto max-w-5xl px-6"><div className="border-b border-[var(--rule)]" /></div>
      <TheStakes />
      <div className="mx-auto max-w-5xl px-6"><div className="border-b border-[var(--rule)]" /></div>
      <InThePress />
      <div className="mx-auto max-w-5xl px-6"><div className="border-b border-[var(--rule)]" /></div>
      <BenchmarkCritique />
      <div className="mx-auto max-w-5xl px-6"><div className="border-b border-[var(--rule)]" /></div>
      <BenchmarkCards />
      <CTASection />
      <Footer />
    </div>
  );
}

export default App;
