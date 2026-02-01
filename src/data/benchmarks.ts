export interface Benchmark {
  id: string;
  name: string;
  creator: string;
  year: number;
  tagline: string;
  description: string;
  url: string;
  totalTasks: number;
  publicTasks: number;
  occupations: number;
  industries: number;
  domains: string[];
  expertYears: number | null;
  avgTaskHours: number;
  scoring: string;
  scoringDetail: string;
  multiModal: boolean;
  fileTypes: string[];
  openSource: boolean;
  license: string;
  topModelScore: number;
  topModel: string;
  color: string;
  gradient: string;
  isGDPVAL: boolean;
  strengths: string[];
  limitations: string[];
  radarScores: {
    breadth: number;
    depth: number;
    realism: number;
    rigor: number;
    multimodality: number;
    accessibility: number;
  };
}

export const benchmarks: Benchmark[] = [
  {
    id: "gdpval",
    name: "GDPVAL",
    creator: "Parsewave",
    year: 2025,
    tagline: "The GDP of AI Evaluation",
    description:
      "Real-world economically valuable tasks across 36 occupations in 9 GDP-dominant industries. Tests whether AI can produce professional-quality deliverables that real experts would sign off on.",
    url: "https://parsewave.ai",
    totalTasks: 213,
    publicTasks: 213,
    occupations: 36,
    industries: 9,
    domains: [
      "Finance & Insurance",
      "Healthcare",
      "Legal",
      "Engineering & Manufacturing",
      "Media & Video Production",
      "Music Production",
      "Software Development",
      "Government & Admin",
      "Real Estate",
    ],
    expertYears: 14,
    avgTaskHours: 7.0,
    scoring: "Multi-criteria Rubric",
    scoringDetail:
      "Multi-criteria rubric (10-40 points) with specific quality levels per criterion. Oracle + 4 model evaluations per task. Captures partial credit and nuanced quality.",
    multiModal: true,
    fileTypes: [
      "PDF", "XLSX", "DOCX", "MP4", "MP3", "WAV", "PNG", "JPG",
      "SVG", "CSV", "TXT", "PPTX", "STL", "USDZ", "PY", "JS", "DART",
    ],
    openSource: true,
    license: "CC-BY",
    topModelScore: 70.9,
    topModel: "GPT-5.2",
    color: "#6366f1",
    gradient: "from-indigo-500 to-purple-600",
    isGDPVAL: true,
    strengths: [
      "Broadest occupational coverage (36 professions)",
      "Highest expert experience (14 yr avg)",
      "True multi-modal (17+ file types incl. video, audio, 3D)",
      "Tests actual work deliverables, not just navigation",
      "Covers creative fields (music, video, 3D design)",
      "Real government data sources mixed with synthetic",
      "Granular rubric scoring (up to 40 points per task)",
    ],
    limitations: [],
    radarScores: {
      breadth: 95,
      depth: 90,
      realism: 95,
      rigor: 92,
      multimodality: 97,
      accessibility: 80,
    },
  },
  {
    id: "apex-agents",
    name: "APEX-Agents",
    creator: "Mercor",
    year: 2026,
    tagline: "Simulated Office Work",
    description:
      "Multi-tool agentic tasks in simulated Google Workspace environments for investment banking, law, and management consulting.",
    url: "https://huggingface.co/datasets/mercor/apex-agents",
    totalTasks: 480,
    publicTasks: 480,
    occupations: 3,
    industries: 1,
    domains: ["Investment Banking", "Management Consulting", "Corporate Law"],
    expertYears: 7.5,
    avgTaskHours: 1.8,
    scoring: "Binary Pass/Fail",
    scoringDetail:
      "Each task has 1-10 binary criteria (Met/Not Met). Pass@1 = probability all criteria pass in a single run.",
    multiModal: true,
    fileTypes: ["PDF", "XLSX", "DOCX", "PPTX", "Calendar", "Chat", "Mail"],
    openSource: true,
    license: "CC-BY 4.0",
    topModelScore: 24.0,
    topModel: "Gemini 3 Flash",
    color: "#f59e0b",
    gradient: "from-amber-400 to-orange-500",
    isGDPVAL: false,
    strengths: [
      "Realistic simulated environments (Google Workspace)",
      "Tests multi-tool cross-app navigation",
      "Fully open source with evaluation harness",
    ],
    limitations: [
      "Only 3 professional domains",
      "Binary scoring loses granularity",
      "No creative or technical fields",
      "Shorter tasks (1.8 hr avg)",
    ],
    radarScores: {
      breadth: 25,
      depth: 85,
      realism: 90,
      rigor: 75,
      multimodality: 70,
      accessibility: 95,
    },
  },
  {
    id: "apex-v1",
    name: "APEX v1.0",
    creator: "Mercor",
    year: 2025,
    tagline: "White-Collar Knowledge Test",
    description:
      "200 expert-created knowledge work tasks across investment banking, consulting, law, and primary care medicine.",
    url: "https://www.mercor.com/apex/",
    totalTasks: 200,
    publicTasks: 100,
    occupations: 4,
    industries: 2,
    domains: ["Investment Banking", "Management Consulting", "Law", "Primary Care Medicine"],
    expertYears: 7.25,
    avgTaskHours: 3.5,
    scoring: "Model-graded",
    scoringDetail:
      "Judge LM evaluates 8 responses per task against expert-crafted rubrics. Hidden test set of 100 tasks.",
    multiModal: true,
    fileTypes: ["PDF", "XLSX", "DOCX"],
    openSource: true,
    license: "CC-BY",
    topModelScore: 67.0,
    topModel: "GPT-5 (High)",
    color: "#f97316",
    gradient: "from-orange-400 to-red-500",
    isGDPVAL: false,
    strengths: [
      "76 domain experts with 7.25 yr avg experience",
      "Multiple attempts per task (8 responses)",
    ],
    limitations: [
      "Only 4 professional domains",
      "No engineering, creative, or technical fields",
      "Model-graded (not human-evaluated)",
      "Small task count (200)",
    ],
    radarScores: {
      breadth: 30,
      depth: 80,
      realism: 85,
      rigor: 70,
      multimodality: 40,
      accessibility: 75,
    },
  },
  {
    id: "swe-bench-pro",
    name: "SWE-Bench Pro",
    creator: "Scale AI",
    year: 2025,
    tagline: "Code-Only Gauntlet",
    description:
      "Rigorous evaluation of AI agents for software engineering across 41 real open-source repositories and 123 languages.",
    url: "https://scale.com/leaderboard/swe_bench_pro_public",
    totalTasks: 1865,
    publicTasks: 1865,
    occupations: 1,
    industries: 1,
    domains: ["Software Engineering"],
    expertYears: null,
    avgTaskHours: 1.0,
    scoring: "Test Case Pass/Fail",
    scoringDetail: "Automated test execution in Docker containers. Binary: tests pass or they don't.",
    multiModal: false,
    fileTypes: ["Code files (123 languages)"],
    openSource: true,
    license: "GPL",
    topModelScore: 45.89,
    topModel: "Claude Opus 4.5",
    color: "#8b5cf6",
    gradient: "from-violet-500 to-purple-600",
    isGDPVAL: false,
    strengths: [
      "Large task count (1,865)",
      "Real GitHub issues from real repos",
      "Fully automated evaluation",
    ],
    limitations: [
      "Software engineering only (1 occupation)",
      "Binary pass/fail misses partial solutions",
      "METR found it overestimates real-world performance",
    ],
    radarScores: {
      breadth: 10,
      depth: 92,
      realism: 70,
      rigor: 85,
      multimodality: 5,
      accessibility: 90,
    },
  },
  {
    id: "gaia",
    name: "GAIA",
    creator: "Meta + HuggingFace",
    year: 2023,
    tagline: "General AI Quiz",
    description:
      "General AI Assistant benchmark with real-world questions requiring reasoning, multi-modality, web browsing, and tool use.",
    url: "https://huggingface.co/papers/2311.12983",
    totalTasks: 466,
    publicTasks: 166,
    occupations: 0,
    industries: 0,
    domains: ["General Knowledge", "Scientific Analysis", "Personal Planning", "Education"],
    expertYears: null,
    avgTaskHours: 0.5,
    scoring: "Answer Match",
    scoringDetail: "Unambiguous answers verified against ground truth. 3 difficulty levels. Human baseline: 92%.",
    multiModal: true,
    fileTypes: ["PDF", "Images", "Web pages"],
    openSource: true,
    license: "Apache 2.0",
    topModelScore: 74.55,
    topModel: "HAL Generalist Agent",
    color: "#10b981",
    gradient: "from-emerald-400 to-teal-500",
    isGDPVAL: false,
    strengths: [
      "Tests fundamental AI capabilities",
      "Clear human baseline (92%)",
      "Multi-modal and tool-use required",
    ],
    limitations: [
      "Not profession-specific",
      "Short answer format misses deliverable quality",
      "5% ground truth error rate",
      "Known data contamination issues",
    ],
    radarScores: {
      breadth: 60,
      depth: 45,
      realism: 50,
      rigor: 60,
      multimodality: 65,
      accessibility: 90,
    },
  },
  {
    id: "hle",
    name: "Humanity's Last Exam",
    creator: "CAIS + Scale AI",
    year: 2025,
    tagline: "Hardest Academic Questions",
    description:
      "3,000 expert-level academic questions across ~100 subjects, designed as the final closed-ended academic benchmark.",
    url: "https://scale.com/leaderboard/humanitys_last_exam",
    totalTasks: 3000,
    publicTasks: 2500,
    occupations: 0,
    industries: 0,
    domains: ["Mathematics", "Physics", "Chemistry", "CS", "History", "Philosophy", "Medicine"],
    expertYears: null,
    avgTaskHours: 0.5,
    scoring: "Answer Match",
    scoringDetail: "Multiple choice or short answer. Human experts: ~90%.",
    multiModal: true,
    fileTypes: ["Text", "Images"],
    openSource: true,
    license: "MIT",
    topModelScore: 37.52,
    topModel: "Gemini-3-Pro-Preview",
    color: "#ec4899",
    gradient: "from-pink-400 to-rose-500",
    isGDPVAL: false,
    strengths: [
      "Largest question count (3,000)",
      "Broadest academic coverage",
    ],
    limitations: [
      "Academic questions, not professional tasks",
      "No deliverables or work products",
      "~30% answer accuracy issues in bio/chem",
      "Tests knowledge recall, not economic value",
    ],
    radarScores: {
      breadth: 70,
      depth: 30,
      realism: 15,
      rigor: 55,
      multimodality: 20,
      accessibility: 85,
    },
  },
  {
    id: "tau-bench",
    name: "Tau-Bench",
    creator: "Sierra AI",
    year: 2024,
    tagline: "Customer Service Bot Test",
    description:
      "Multi-turn customer service agent benchmark across retail and airline domains, testing rule-following, reasoning, and context management.",
    url: "https://sierra.ai/blog/benchmarking-ai-agents",
    totalTasks: 165,
    publicTasks: 165,
    occupations: 1,
    industries: 2,
    domains: ["Retail", "Airline"],
    expertYears: null,
    avgTaskHours: 0.3,
    scoring: "Rule Compliance",
    scoringDetail: "115 retail + 50 airline tasks. Tests rule-following, reasoning over long contexts, and communication effectiveness.",
    multiModal: false,
    fileTypes: ["Text conversations"],
    openSource: true,
    license: "MIT",
    topModelScore: 50.0,
    topModel: "GPT-4o",
    color: "#14b8a6",
    gradient: "from-teal-400 to-cyan-500",
    isGDPVAL: false,
    strengths: [
      "Tests multi-turn interaction",
      "Realistic customer service scenarios",
    ],
    limitations: [
      "Single domain (customer service)",
      "No deliverables or work products",
      "Text-only",
      "Short tasks (minutes, not hours)",
    ],
    radarScores: {
      breadth: 8,
      depth: 70,
      realism: 75,
      rigor: 65,
      multimodality: 5,
      accessibility: 85,
    },
  },
  {
    id: "swe-lancer",
    name: "SWE-Lancer",
    creator: "OpenAI",
    year: 2025,
    tagline: "Freelance Coding Gigs",
    description:
      "1,488 real freelance programming assignments from paid gigs, totaling $1M in real payouts.",
    url: "https://openai.com/index/swe-lancer/",
    totalTasks: 1488,
    publicTasks: 1488,
    occupations: 1,
    industries: 1,
    domains: ["Software Engineering (Freelance)"],
    expertYears: null,
    avgTaskHours: 2.0,
    scoring: "Test Case Pass/Fail",
    scoringDetail: "Based on real Upwork/freelance gigs. Binary test-case evaluation.",
    multiModal: false,
    fileTypes: ["Code files"],
    openSource: true,
    license: "MIT",
    topModelScore: 26.2,
    topModel: "Claude 3.5 Sonnet",
    color: "#0ea5e9",
    gradient: "from-sky-400 to-blue-500",
    isGDPVAL: false,
    strengths: [
      "Real paid gigs ($1M in payouts)",
      "Large task count (1,488)",
    ],
    limitations: [
      "Software engineering only",
      "Binary scoring",
      "No multi-modal or knowledge work",
    ],
    radarScores: {
      breadth: 10,
      depth: 88,
      realism: 80,
      rigor: 80,
      multimodality: 5,
      accessibility: 90,
    },
  },
];

export interface ComparisonDimension {
  key: keyof Benchmark["radarScores"];
  label: string;
  description: string;
  icon: string;
}

export const comparisonDimensions: ComparisonDimension[] = [
  { key: "breadth", label: "Occupational Breadth", description: "Number and diversity of professional domains covered", icon: "Users" },
  { key: "depth", label: "Task Depth", description: "Complexity and duration of individual tasks", icon: "Layers" },
  { key: "realism", label: "Real-World Realism", description: "How closely tasks mirror actual professional work", icon: "Target" },
  { key: "rigor", label: "Evaluation Rigor", description: "Quality and reliability of the scoring methodology", icon: "Shield" },
  { key: "multimodality", label: "Multi-Modal Coverage", description: "Diversity of file types and media formats tested", icon: "FileVideo" },
  { key: "accessibility", label: "Accessibility", description: "Ease of use, open-source availability, documentation", icon: "Globe" },
];

// Data for the industry coverage heatmap
export interface IndustryCoverage {
  industry: string;
  benchmarks: Record<string, boolean>;
}

export const industryCoverage: IndustryCoverage[] = [
  { industry: "Finance & Insurance", benchmarks: { "GDPVAL": true, "APEX-Agents": true, "APEX v1.0": true, "SWE-Bench Pro": false, "GAIA": false, "HLE": false, "Tau-Bench": false, "SWE-Lancer": false } },
  { industry: "Healthcare", benchmarks: { "GDPVAL": true, "APEX-Agents": false, "APEX v1.0": true, "SWE-Bench Pro": false, "GAIA": false, "HLE": false, "Tau-Bench": false, "SWE-Lancer": false } },
  { industry: "Legal", benchmarks: { "GDPVAL": true, "APEX-Agents": true, "APEX v1.0": true, "SWE-Bench Pro": false, "GAIA": false, "HLE": false, "Tau-Bench": false, "SWE-Lancer": false } },
  { industry: "Engineering & Manufacturing", benchmarks: { "GDPVAL": true, "APEX-Agents": false, "APEX v1.0": false, "SWE-Bench Pro": false, "GAIA": false, "HLE": false, "Tau-Bench": false, "SWE-Lancer": false } },
  { industry: "Media & Creative", benchmarks: { "GDPVAL": true, "APEX-Agents": false, "APEX v1.0": false, "SWE-Bench Pro": false, "GAIA": false, "HLE": false, "Tau-Bench": false, "SWE-Lancer": false } },
  { industry: "Software & IT", benchmarks: { "GDPVAL": true, "APEX-Agents": false, "APEX v1.0": false, "SWE-Bench Pro": true, "GAIA": true, "HLE": true, "Tau-Bench": false, "SWE-Lancer": true } },
  { industry: "Government & Admin", benchmarks: { "GDPVAL": true, "APEX-Agents": false, "APEX v1.0": false, "SWE-Bench Pro": false, "GAIA": false, "HLE": false, "Tau-Bench": false, "SWE-Lancer": false } },
  { industry: "Real Estate", benchmarks: { "GDPVAL": true, "APEX-Agents": false, "APEX v1.0": false, "SWE-Bench Pro": false, "GAIA": false, "HLE": false, "Tau-Bench": false, "SWE-Lancer": false } },
  { industry: "Consulting", benchmarks: { "GDPVAL": true, "APEX-Agents": true, "APEX v1.0": true, "SWE-Bench Pro": false, "GAIA": false, "HLE": false, "Tau-Bench": false, "SWE-Lancer": false } },
  { industry: "Customer Service", benchmarks: { "GDPVAL": true, "APEX-Agents": false, "APEX v1.0": false, "SWE-Bench Pro": false, "GAIA": false, "HLE": false, "Tau-Bench": true, "SWE-Lancer": false } },
  { industry: "Education", benchmarks: { "GDPVAL": false, "APEX-Agents": false, "APEX v1.0": false, "SWE-Bench Pro": false, "GAIA": true, "HLE": true, "Tau-Bench": false, "SWE-Lancer": false } },
  { industry: "Academic Research", benchmarks: { "GDPVAL": false, "APEX-Agents": false, "APEX v1.0": false, "SWE-Bench Pro": false, "GAIA": true, "HLE": true, "Tau-Bench": false, "SWE-Lancer": false } },
];

// File type diversity data
export interface FileTypeBucket {
  category: string;
  types: string[];
  benchmarks: Record<string, boolean>;
}

export const fileTypeBuckets: FileTypeBucket[] = [
  { category: "Documents", types: ["PDF", "DOCX", "TXT"], benchmarks: { "GDPVAL": true, "APEX-Agents": true, "APEX v1.0": true, "SWE-Bench Pro": false, "GAIA": true, "HLE": false, "Tau-Bench": false, "SWE-Lancer": false } },
  { category: "Spreadsheets", types: ["XLSX", "CSV"], benchmarks: { "GDPVAL": true, "APEX-Agents": true, "APEX v1.0": true, "SWE-Bench Pro": false, "GAIA": false, "HLE": false, "Tau-Bench": false, "SWE-Lancer": false } },
  { category: "Presentations", types: ["PPTX"], benchmarks: { "GDPVAL": true, "APEX-Agents": true, "APEX v1.0": false, "SWE-Bench Pro": false, "GAIA": false, "HLE": false, "Tau-Bench": false, "SWE-Lancer": false } },
  { category: "Video", types: ["MP4"], benchmarks: { "GDPVAL": true, "APEX-Agents": false, "APEX v1.0": false, "SWE-Bench Pro": false, "GAIA": false, "HLE": false, "Tau-Bench": false, "SWE-Lancer": false } },
  { category: "Audio", types: ["MP3", "WAV"], benchmarks: { "GDPVAL": true, "APEX-Agents": false, "APEX v1.0": false, "SWE-Bench Pro": false, "GAIA": false, "HLE": false, "Tau-Bench": false, "SWE-Lancer": false } },
  { category: "Images", types: ["PNG", "JPG", "SVG"], benchmarks: { "GDPVAL": true, "APEX-Agents": false, "APEX v1.0": false, "SWE-Bench Pro": false, "GAIA": true, "HLE": true, "Tau-Bench": false, "SWE-Lancer": false } },
  { category: "3D Models", types: ["STL", "USDZ"], benchmarks: { "GDPVAL": true, "APEX-Agents": false, "APEX v1.0": false, "SWE-Bench Pro": false, "GAIA": false, "HLE": false, "Tau-Bench": false, "SWE-Lancer": false } },
  { category: "Code", types: ["PY", "JS", "DART"], benchmarks: { "GDPVAL": true, "APEX-Agents": true, "APEX v1.0": false, "SWE-Bench Pro": true, "GAIA": false, "HLE": false, "Tau-Bench": false, "SWE-Lancer": true } },
];

export const difficultyDistribution = [
  { difficulty: "Easy", gdpval: 45, apex: 50, sweBench: 60, hle: 0 },
  { difficulty: "Medium", gdpval: 105, apex: 100, sweBench: 800, hle: 0 },
  { difficulty: "Hard", gdpval: 63, apex: 50, sweBench: 1065, hle: 3000 },
];
