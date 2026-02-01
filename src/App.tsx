import { Hero } from "@/components/Hero";
import { KeyInsights } from "@/components/KeyInsights";
import { ComparisonTable } from "@/components/ComparisonTable";
import { WhyGDPVAL } from "@/components/WhyGDPVAL";
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
          74.1%
        </div>
        <p className="font-serif italic text-lg text-[var(--ink-secondary)] max-w-md mx-auto mb-2">
          The best AI model's score on GDPVAL. Real professional work remains beyond reach.
        </p>
        <p className="font-mono text-xs text-[var(--ink-tertiary)]">
          GPT-5.2 Pro -- highest scoring model
        </p>
      </div>

      <div className="mx-auto max-w-5xl px-6"><div className="border-b border-[var(--rule)]" /></div>
      <WhyGDPVAL />
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
