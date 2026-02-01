import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Briefcase,
  Layers,
  FileVideo,
  GraduationCap,
  Target,
  TrendingUp,
} from "lucide-react";

const advantages = [
  {
    icon: Briefcase,
    title: "Built by Working Professionals, Not Annotators",
    body: "Every GDPVAL task is created by professionals with an average of 14 years in their field \u2014 accountants, nurses, film editors, engineers, lawyers. Mercor\u2019s APEX tasks are created by experts with 7.25 years average. Academic benchmarks like HLE and GAIA use crowd-sourced or researcher-created questions that don\u2019t reflect real job functions.",
  },
  {
    icon: Layers,
    title: "Breadth That Matches the Real Economy",
    body: "GDPVAL spans 36 occupations across 9 GDP-contributing sectors \u2014 from financial advisors to video editors to procurement specialists. APEX covers 3\u20134 white-collar roles. SWE-Bench covers only software engineering. No other benchmark captures the diversity of how AI will actually impact the workforce.",
  },
  {
    icon: FileVideo,
    title: "True Multi-Modal: Not Just Text and Code",
    body: "GDPVAL tasks involve 17+ file types: spreadsheets, PDFs, video files, audio recordings, 3D models (STL/USDZ), presentation decks, and more. Competitors are either text-only (HLE, \u03C4-bench), code-only (SWE-Bench), or limited to documents and spreadsheets (APEX). Real professional work is inherently multi-modal.",
  },
  {
    icon: Target,
    title: "Deliverable-Based, Not Answer-Based",
    body: "GDPVAL tests whether AI can produce a complete financial plan, edit a video, design a 3D model, or write a legal brief. Academic benchmarks test whether AI can answer a question correctly. APEX-Agents tests whether an agent can navigate a simulated workspace. GDPVAL tests what ultimately matters: the quality of the final work product.",
  },
  {
    icon: GraduationCap,
    title: "Granular Rubric Scoring with Expert Validation",
    body: "Each GDPVAL task has a multi-criteria rubric (up to 40 points) with specific quality levels per criterion. This captures partial credit and nuanced quality differences. APEX-Agents uses binary pass/fail. HLE and GAIA use simple answer matching. Rubric-based evaluation is harder to build but far more informative.",
  },
  {
    icon: TrendingUp,
    title: "Adopted by OpenAI as Industry Standard",
    body: "OpenAI published GDPVAL as its primary benchmark for measuring real-world AI capabilities. Artificial Analysis replaced legacy benchmarks (MMLU-Pro, AIME) with GDPVAL-AA in their Intelligence Index v4.0. When the industry needs to measure whether AI can do real work, they use GDPVAL.",
  },
];

export function WhyGDPVAL() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <h2 className="text-3xl font-bold mb-2">The Full Picture</h2>
      <p className="text-muted-foreground mb-8 max-w-2xl">
        A deeper look at what makes GDPVAL the most comprehensive benchmark for
        measuring AI\u2019s readiness to do real professional work.
      </p>

      <div className="grid gap-6 sm:grid-cols-2">
        {advantages.map((adv, i) => {
          const Icon = adv.icon;
          return (
            <Card key={i}>
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-indigo-100 dark:bg-indigo-900/30">
                    <Icon className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">{adv.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {adv.body}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Separator className="my-12" />

      <div className="text-center max-w-2xl mx-auto">
        <h3 className="text-xl font-bold mb-3">The Bottom Line</h3>
        <p className="text-muted-foreground leading-relaxed">
          Benchmarks should measure what matters: can AI do real professional
          work, across the full breadth of the economy, producing deliverables
          that experts would approve? GDPVAL is the only benchmark that
          comprehensively answers this question across 36 occupations, 9
          industries, and 17+ media formats.
        </p>
        <div className="flex justify-center gap-6 mt-8">
          <a
            href="https://parsewave.ai"
            className="text-sm font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400"
          >
            Parsewave.ai
          </a>
          <a
            href="https://huggingface.co/datasets/openai/gdpval"
            className="text-sm font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400"
          >
            GDPVAL on HuggingFace
          </a>
          <a
            href="https://evals.openai.com"
            className="text-sm font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400"
          >
            Automated Grader
          </a>
        </div>
      </div>
    </section>
  );
}
