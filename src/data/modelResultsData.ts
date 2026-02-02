// Model performance data sourced from RESULTS_REPORT.md
// in Parsewave-internal/gdpval-samples (commit: main, evaluated 2025-12-31)
// Agent: terminus-2 v2.0.0 via OpenRouter
// Judge: google/gemini-3-pro-preview (rubric-based binary pass/fail)

export interface ModelResult {
  name: string;
  provider: string;
  attempts: number;
  passed: number;
  passRate: number;
}

export interface UnsolvedTask {
  id: string;
  domain: string;
  description: string;
}

export interface GdpvalComparison {
  model: string;
  gdpvalScore: number;
  parsewaveRate: number;
  delta: number;
}

export interface ModelResultsData {
  lastUpdated: string;
  totalTasks: number;
  attemptsPerTask: number;
  judge: string;
  oraclePassRate: number;
  models: ModelResult[];
  unsolvedCount: number;
  unsolvedTasks: UnsolvedTask[];
  gdpvalComparison: GdpvalComparison[];
  gdpvalMethodNote: string;
  gdpvalSource: string;
}

export const modelResultsData: ModelResultsData = {
  lastUpdated: "2026-02-03",
  totalTasks: 218,
  attemptsPerTask: 3,
  judge: "Gemini 3 Pro",
  oraclePassRate: 88.63,

  models: [
    {
      name: "Claude Sonnet 4.5",
      provider: "Anthropic",
      attempts: 657,
      passed: 339,
      passRate: 51.59,
    },
    {
      name: "GPT-5.2 Thinking",
      provider: "OpenAI",
      attempts: 657,
      passed: 307,
      passRate: 46.72,
    },
    {
      name: "Gemini 3 Pro",
      provider: "Google",
      attempts: 657,
      passed: 222,
      passRate: 33.78,
    },
    {
      name: "GPT-OSS 120B",
      provider: "OpenAI",
      attempts: 634,
      passed: 51,
      passRate: 8.04,
    },
  ],

  unsolvedCount: 37,

  unsolvedTasks: [
    // Financial Analysis (11)
    { id: "409a-valuation-v2", domain: "Financial Analysis", description: "409A startup valuation" },
    { id: "atlassian-financial-model", domain: "Financial Analysis", description: "Atlassian financial model" },
    { id: "cost-report-formula-sae", domain: "Financial Analysis", description: "Formula SAE cost report" },
    { id: "financial-product-governance-document", domain: "Financial Analysis", description: "Financial product governance" },
    { id: "highest-and-best-use-analysis", domain: "Financial Analysis", description: "Real estate highest-use analysis" },
    { id: "nichii-lbo-analysis", domain: "Financial Analysis", description: "Leveraged buyout analysis" },
    { id: "payroll-error-analysis", domain: "Financial Analysis", description: "Payroll discrepancy analysis" },
    { id: "preparation-of-financial-statements", domain: "Financial Analysis", description: "Financial statement preparation" },
    { id: "real-estate-investment-analyzer", domain: "Financial Analysis", description: "RE investment analysis tool" },
    { id: "taxable-income-and-tax-liability", domain: "Financial Analysis", description: "Tax liability computation" },
    { id: "victoria-energy-correlation", domain: "Financial Analysis", description: "Energy market correlation analysis" },

    // Tech/Engineering (10)
    { id: "ai-boq-ingestion-bid-proposal", domain: "Tech/Engineering", description: "AI bid proposal system" },
    { id: "aluminum-billet-extrusion-calc", domain: "Tech/Engineering", description: "Aluminum extrusion calculations" },
    { id: "android-bulk-sms-app", domain: "Tech/Engineering", description: "Android bulk SMS application" },
    { id: "data-center-exodus", domain: "Tech/Engineering", description: "Data center migration planning" },
    { id: "emr-migration", domain: "Tech/Engineering", description: "EMR system migration" },
    { id: "gold-token-trading-system", domain: "Tech/Engineering", description: "Gold token trading platform" },
    { id: "healthcare-symptom-chatbot", domain: "Tech/Engineering", description: "Healthcare symptom chatbot" },
    { id: "ipg-lap-time-simulation-validation", domain: "Tech/Engineering", description: "Lap time simulation validation" },
    { id: "reliability-consultant-fintech", domain: "Tech/Engineering", description: "Fintech reliability consulting" },
    { id: "web-developer-booking", domain: "Tech/Engineering", description: "Booking system web app" },

    // Video/Media (9)
    { id: "ambient-post-rock-for-a-documentary-film", domain: "Video/Media", description: "Documentary film score composition" },
    { id: "blob-tracking", domain: "Video/Media", description: "Blob tracking implementation" },
    { id: "cybertruck-camo-wrap-3d-video", domain: "Video/Media", description: "3D vehicle wrap visualization" },
    { id: "eng-design-presentation-vehicle-dynamics", domain: "Video/Media", description: "Engineering design presentation" },
    { id: "jellyfish-cg-animation", domain: "Video/Media", description: "CG jellyfish animation" },
    { id: "product-presentation-videos", domain: "Video/Media", description: "Product presentation video editing" },
    { id: "psa-video-editing-digital-wellness", domain: "Video/Media", description: "PSA video editing" },
    { id: "psa-video-pre-production", domain: "Video/Media", description: "Video pre-production planning" },
    { id: "tuneflow-analytics-dashboard", domain: "Video/Media", description: "Music analytics dashboard" },

    // Legal/Compliance (6)
    { id: "federal-procurement-dispute-resolution", domain: "Legal/Compliance", description: "Federal procurement dispute brief" },
    { id: "ihl-defense-case-precedents", domain: "Legal/Compliance", description: "International humanitarian law defense" },
    { id: "internet-shutdown-state-defense", domain: "Legal/Compliance", description: "Internet shutdown state defense" },
    { id: "maritime-arb-jurisdiction-precedents", domain: "Legal/Compliance", description: "Maritime arbitration jurisdiction" },
    { id: "pre-arbitral-deposit-international-arbitration", domain: "Legal/Compliance", description: "International pre-arbitral deposits" },
    { id: "purchasing-document-oil-gas-industry", domain: "Legal/Compliance", description: "Oil and gas procurement compliance" },

    // Other (3) - note: dog-adoption-ad had API errors in some runs
    { id: "dog-adoption-ad", domain: "Other", description: "Dog adoption advertisement" },
    { id: "food-distribution-crisis", domain: "Other", description: "Crisis food distribution planning" },
    { id: "recreational-program", domain: "Other", description: "Recreational program design" },
  ],

  gdpvalComparison: [
    {
      model: "GPT-5.2 Thinking",
      gdpvalScore: 70.9,
      parsewaveRate: 46.72,
      delta: -24.2,
    },
    {
      model: "Gemini 3 Pro",
      gdpvalScore: 53.3,
      parsewaveRate: 33.78,
      delta: -19.5,
    },
  ],

  gdpvalMethodNote:
    "GDPval measures win-or-tie rate: a GPT-5 judge compares model output to human expert output in pairwise evaluation (~66% human agreement). Parsewave measures binary pass rate: a Gemini 3 Pro judge evaluates model output against task-specific rubric criteria. These metrics are not directly comparable - the gap shown is directional, not exact.",
  gdpvalSource: "https://arxiv.org/abs/2510.04374",
};
