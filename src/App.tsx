import { Hero } from "@/components/Hero";
import { KeyInsights } from "@/components/KeyInsights";
import { ComparisonTable } from "@/components/ComparisonTable";
import { WhyGDPVAL } from "@/components/WhyGDPVAL";
import { TaskShowcase } from "@/components/TaskShowcase";
import { RadarComparison } from "@/components/RadarComparison";
import { IndustryHeatmap } from "@/components/IndustryHeatmap";
import { FileTypeMatrix } from "@/components/FileTypeMatrix";
import { TaskQualityComparison } from "@/components/TaskQualityComparison";
import { BenchmarkCards } from "@/components/BenchmarkCards";
import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";

const base = import.meta.env.BASE_URL;

function App() {
  return (
    <div className="relative min-h-screen bg-[var(--surface)] text-[var(--ink)]">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[500px] bg-top bg-repeat-x"
        style={{
          backgroundImage: `url(${base}led-matrix.png)`,
          transform: "scaleY(-1)",
          maskImage: "linear-gradient(to bottom, black 30%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, black 30%, transparent 100%)",
        }}
      />
      <div className="relative z-10">
      <Hero />
      <KeyInsights />
      <div className="mx-auto max-w-5xl px-6"><div className="border-b border-[var(--rule)]" /></div>
      <ComparisonTable />
      <div className="mx-auto max-w-5xl px-6"><div className="border-b border-[var(--rule)]" /></div>
      <WhyGDPVAL />
      <div className="mx-auto max-w-5xl px-6"><div className="border-b border-[var(--rule)]" /></div>
      <TaskShowcase />
      <div className="mx-auto max-w-5xl px-6"><div className="border-b border-[var(--rule)]" /></div>
      <RadarComparison />
      <div className="mx-auto max-w-5xl px-6"><div className="border-b border-[var(--rule)]" /></div>
      <IndustryHeatmap />
      <div className="mx-auto max-w-5xl px-6"><div className="border-b border-[var(--rule)]" /></div>
      <FileTypeMatrix />
      <div className="mx-auto max-w-5xl px-6"><div className="border-b border-[var(--rule)]" /></div>
      <TaskQualityComparison />
      <div className="mx-auto max-w-5xl px-6"><div className="border-b border-[var(--rule)]" /></div>
      <BenchmarkCards />
      <div className="mx-auto max-w-5xl px-6"><div className="border-b border-[var(--rule)]" /></div>
      <CTASection />
      <div className="mx-auto max-w-5xl px-6"><div className="border-b border-[var(--rule)]" /></div>
      <Footer />
      </div>
    </div>
  );
}

export default App;
