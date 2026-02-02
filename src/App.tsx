import { Hero } from "@/components/Hero";
import { ModelPerformance } from "@/components/ModelPerformance";
import { PerformanceGap } from "@/components/PerformanceGap";
import { UnsolvedFrontier } from "@/components/UnsolvedFrontier";
import { TaskExamples } from "@/components/TaskExamples";
import { EvaluationMethodology } from "@/components/EvaluationMethodology";
import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";

const Divider = () => (
  <div className="mx-auto max-w-5xl px-6">
    <div className="border-b border-[var(--rule)]" />
  </div>
);

function App() {
  return (
    <div className="min-h-screen bg-[var(--surface)] text-[var(--ink)]">
      <Hero />
      <ModelPerformance />
      <Divider />
      <PerformanceGap />
      <Divider />
      <UnsolvedFrontier />
      <Divider />
      <TaskExamples />
      <Divider />
      <EvaluationMethodology />
      <Divider />
      <CTASection />
      <Footer />
    </div>
  );
}

export default App;
