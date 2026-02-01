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
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[200%] max-w-[2368px] h-[578px] opacity-60 z-0">
        <img
          src={`${base}led-matrix.png`}
          alt=""
          className="w-full h-full object-cover scale-y-[-1]"
        />
      </div>
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
