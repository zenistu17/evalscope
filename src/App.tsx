import { Hero } from "@/components/Hero";
import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";

function App() {
  return (
    <div className="min-h-screen bg-[var(--surface)] text-[var(--ink)]">
      <Hero />
      <div className="mx-auto max-w-5xl px-6"><div className="border-b border-[var(--rule)]" /></div>
      <CTASection />
      <Footer />
    </div>
  );
}

export default App;
