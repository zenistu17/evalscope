import { Hero } from "@/components/Hero";
import { BenchmarkCards } from "@/components/BenchmarkCards";
import { KeyInsights } from "@/components/KeyInsights";
import { ComparisonTable } from "@/components/ComparisonTable";
import { RadarComparison } from "@/components/RadarComparison";
import { IndustryHeatmap } from "@/components/IndustryHeatmap";
import { FileTypeMatrix } from "@/components/FileTypeMatrix";
import { TaskQualityComparison } from "@/components/TaskQualityComparison";
import { WhyGDPVAL } from "@/components/WhyGDPVAL";
import { Footer } from "@/components/Footer";

function App() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Hero />
      <KeyInsights />
      <BenchmarkCards />
      <ComparisonTable />
      <RadarComparison />
      <IndustryHeatmap />
      <FileTypeMatrix />
      <TaskQualityComparison />
      <WhyGDPVAL />
      <Footer />
    </div>
  );
}

export default App;
