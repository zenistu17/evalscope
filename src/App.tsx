import { Hero } from "@/components/Hero";
import { ModelPerformance } from "@/components/ModelPerformance";
import { PerformanceGap } from "@/components/PerformanceGap";
import { UnsolvedFrontier } from "@/components/UnsolvedFrontier";
import { InstructionDepth } from "@/components/InstructionDepth";
import { DataAndDeliverables } from "@/components/DataAndDeliverables";
import { RubricDesign } from "@/components/RubricDesign";
import { OccupationCoverage } from "@/components/OccupationCoverage";
import { Methodology } from "@/components/Methodology";
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
      <InstructionDepth />
      <Divider />
      <DataAndDeliverables />
      <Divider />
      <RubricDesign />
      <Divider />
      <OccupationCoverage />
      <Divider />
      <Methodology />
      <Divider />
      <CTASection />
      <Footer />
    </div>
  );
}

export default App;
