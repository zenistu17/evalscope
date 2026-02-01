import { Hero } from "@/components/Hero";
import { KeyInsights } from "@/components/KeyInsights";
import { ComparisonTable } from "@/components/ComparisonTable";
import { BenchmarkCards } from "@/components/BenchmarkCards";
import { RadarComparison } from "@/components/RadarComparison";
import { IndustryHeatmap } from "@/components/IndustryHeatmap";
import { FileTypeMatrix } from "@/components/FileTypeMatrix";
import { TaskQualityComparison } from "@/components/TaskQualityComparison";
import { WhyGDPVAL } from "@/components/WhyGDPVAL";
import { Footer } from "@/components/Footer";

function App() {
  return (
    <div className="min-h-screen bg-[var(--surface)] text-[var(--ink)]">
      <Hero />
      <KeyInsights />
      <div className="mx-auto max-w-4xl px-6"><div className="border-b border-[var(--rule)]" /></div>
      <ComparisonTable />
      <div className="mx-auto max-w-4xl px-6"><div className="border-b border-[var(--rule)]" /></div>
      <BenchmarkCards />
      <div className="mx-auto max-w-5xl px-6"><div className="border-b border-[var(--rule)]" /></div>
      <RadarComparison />
      <div className="mx-auto max-w-5xl px-6"><div className="border-b border-[var(--rule)]" /></div>
      <IndustryHeatmap />
      <div className="mx-auto max-w-5xl px-6"><div className="border-b border-[var(--rule)]" /></div>
      <FileTypeMatrix />
      <div className="mx-auto max-w-4xl px-6"><div className="border-b border-[var(--rule)]" /></div>
      <TaskQualityComparison />
      <div className="mx-auto max-w-4xl px-6"><div className="border-b border-[var(--rule)]" /></div>
      <WhyGDPVAL />
      <div className="mx-auto max-w-4xl px-6"><div className="border-b border-[var(--rule)]" /></div>
      <Footer />
    </div>
  );
}

export default App;
