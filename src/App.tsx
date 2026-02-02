import { Hero } from "@/components/Hero";
import { HeadlineFinding } from "@/components/HeadlineFinding";
import { OccupationHeatmap } from "@/components/OccupationHeatmap";
import { UniversalFailures } from "@/components/UniversalFailures";
import { ScoreDistribution } from "@/components/ScoreDistribution";
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
      <HeadlineFinding />
      <Divider />
      <OccupationHeatmap />
      <Divider />
      <UniversalFailures />
      <Divider />
      <ScoreDistribution />
      <Divider />
      <Methodology />
      <Divider />
      <CTASection />
      <Footer />
    </div>
  );
}

export default App;
