export interface Benchmark {
  id: string;
  name: string;
  shortName: string;
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
    shortName: "GDPVAL",
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
      "Multi-criteria rubric (10\u201340 points) with specific quality levels per criterion. Oracle + 4 model evaluations per task. Captures partial credit and nuanced quality.",
    multiModal: true,
    fileTypes: [
      "PDF", "XLSX", "DOCX", "MP4", "MP3", "WAV", "PNG", "JPG",
      "SVG", "CSV", "TXT", "PPTX", "STL", "USDZ", "PY", "JS", "DART",
    ],
    openSource: true,
    license: "CC-BY",
    topModelScore: 70.9,
    topModel: "GPT-5.2",
    color: "#1a56db",
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
    shortName: "APEX-A",
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
      "Each task has 1\u201310 binary criteria (Met/Not Met). Pass@1 = probability all criteria pass in a single run.",
    multiModal: true,
    fileTypes: ["PDF", "XLSX", "DOCX", "PPTX", "Calendar", "Chat", "Mail"],
    openSource: true,
    license: "CC-BY 4.0",
    topModelScore: 24.0,
    topModel: "Gemini 3 Flash",
    color: "#d4820f",
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
    shortName: "APEX-1",
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
    color: "#c75c10",
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
    id: "workarena",
    name: "WorkArena",
    shortName: "WArena",
    creator: "ServiceNow",
    year: 2024,
    tagline: "Enterprise Knowledge Work",
    description:
      "682 compositional tasks mirroring enterprise knowledge worker workflows on the ServiceNow platform, testing planning, reasoning, and tool use across IT, HR, and operations.",
    url: "https://github.com/ServiceNow/WorkArena",
    totalTasks: 682,
    publicTasks: 682,
    occupations: 6,
    industries: 3,
    domains: ["Enterprise IT", "HR Operations", "Project Management", "Customer Service"],
    expertYears: null,
    avgTaskHours: 0.5,
    scoring: "Binary Pass/Fail",
    scoringDetail: "Agent receives 0 or 1 based on task completion in browser-based ServiceNow environment. Published at ICML 2024.",
    multiModal: true,
    fileTypes: ["Web Forms", "Dashboards", "Knowledge Base"],
    openSource: true,
    license: "Apache 2.0",
    topModelScore: 43.0,
    topModel: "GPT-4o",
    color: "#7c5cbf",
    isGDPVAL: false,
    strengths: [
      "Real enterprise platform (ServiceNow)",
      "682 compositional multi-step tasks",
      "Tests planning and reasoning in realistic UI",
    ],
    limitations: [
      "Limited to ServiceNow workflows",
      "Binary scoring loses granularity",
      "No file-based deliverables",
      "Enterprise IT focus only",
    ],
    radarScores: {
      breadth: 35,
      depth: 65,
      realism: 75,
      rigor: 55,
      multimodality: 40,
      accessibility: 85,
    },
  },
  {
    id: "gaia",
    name: "GAIA",
    shortName: "GAIA",
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
    color: "#2d8a6e",
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
    name: "Humanity\u2019s Last Exam",
    shortName: "HLE",
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
    color: "#b84578",
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
    shortName: "T-Bench",
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
    color: "#3d8a82",
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
    id: "osworld",
    name: "OSWorld",
    shortName: "OSW",
    creator: "HKU + Salesforce",
    year: 2024,
    tagline: "Real Computer Environment",
    description:
      "369 real computer tasks across desktop apps, web browsers, and OS operations on Ubuntu, Windows, and macOS. Tests multimodal agents in authentic work environments.",
    url: "https://os-world.github.io/",
    totalTasks: 369,
    publicTasks: 369,
    occupations: 0,
    industries: 1,
    domains: ["Desktop Applications", "Web Browsing", "OS Operations", "Productivity Tools"],
    expertYears: null,
    avgTaskHours: 0.15,
    scoring: "Execution-based",
    scoringDetail: "134 custom evaluation scripts verify task completion in real OS environments. Human baseline: 72.36%. NeurIPS 2024.",
    multiModal: true,
    fileTypes: ["Documents", "Images", "Code", "Presentations"],
    openSource: true,
    license: "CC-BY-SA-4.0",
    topModelScore: 60.76,
    topModel: "CoACT-1",
    color: "#4a8ab5",
    isGDPVAL: false,
    strengths: [
      "Real OS environments (Ubuntu, Windows, macOS)",
      "Tests true computer-use ability",
      "Multimodal visual interaction",
    ],
    limitations: [
      "No occupation-specific tasks",
      "Short individual tasks",
      "Binary success/fail scoring",
      "Computer use only, not professional deliverables",
    ],
    radarScores: {
      breadth: 20,
      depth: 45,
      realism: 80,
      rigor: 60,
      multimodality: 75,
      accessibility: 80,
    },
  },
];

export interface ComparisonDimension {
  key: keyof Benchmark["radarScores"];
  label: string;
  description: string;
}

export const comparisonDimensions: ComparisonDimension[] = [
  { key: "breadth", label: "Occupational Breadth", description: "Number and diversity of professional domains covered" },
  { key: "depth", label: "Task Depth", description: "Complexity and duration of individual tasks" },
  { key: "realism", label: "Real-World Realism", description: "How closely tasks mirror actual professional work" },
  { key: "rigor", label: "Evaluation Rigor", description: "Quality and reliability of the scoring methodology" },
  { key: "multimodality", label: "Multi-Modal Coverage", description: "Diversity of file types and media formats tested" },
  { key: "accessibility", label: "Accessibility", description: "Ease of use, open-source availability, documentation" },
];

export interface IndustryCoverage {
  industry: string;
  benchmarks: Record<string, boolean>;
}

export const industryCoverage: IndustryCoverage[] = [
  { industry: "Finance & Insurance", benchmarks: { "GDPVAL": true, "APEX-Agents": true, "APEX v1.0": true, "WorkArena": false, "GAIA": false, "Humanity\u2019s Last Exam": false, "Tau-Bench": false, "OSWorld": false } },
  { industry: "Healthcare", benchmarks: { "GDPVAL": true, "APEX-Agents": false, "APEX v1.0": true, "WorkArena": false, "GAIA": false, "Humanity\u2019s Last Exam": false, "Tau-Bench": false, "OSWorld": false } },
  { industry: "Legal", benchmarks: { "GDPVAL": true, "APEX-Agents": true, "APEX v1.0": true, "WorkArena": false, "GAIA": false, "Humanity\u2019s Last Exam": false, "Tau-Bench": false, "OSWorld": false } },
  { industry: "Engineering & Mfg", benchmarks: { "GDPVAL": true, "APEX-Agents": false, "APEX v1.0": false, "WorkArena": false, "GAIA": false, "Humanity\u2019s Last Exam": false, "Tau-Bench": false, "OSWorld": false } },
  { industry: "Media & Creative", benchmarks: { "GDPVAL": true, "APEX-Agents": false, "APEX v1.0": false, "WorkArena": false, "GAIA": false, "Humanity\u2019s Last Exam": false, "Tau-Bench": false, "OSWorld": false } },
  { industry: "Software & IT", benchmarks: { "GDPVAL": true, "APEX-Agents": false, "APEX v1.0": false, "WorkArena": true, "GAIA": true, "Humanity\u2019s Last Exam": true, "Tau-Bench": false, "OSWorld": true } },
  { industry: "Government & Admin", benchmarks: { "GDPVAL": true, "APEX-Agents": false, "APEX v1.0": false, "WorkArena": false, "GAIA": false, "Humanity\u2019s Last Exam": false, "Tau-Bench": false, "OSWorld": false } },
  { industry: "Real Estate", benchmarks: { "GDPVAL": true, "APEX-Agents": false, "APEX v1.0": false, "WorkArena": false, "GAIA": false, "Humanity\u2019s Last Exam": false, "Tau-Bench": false, "OSWorld": false } },
  { industry: "Consulting", benchmarks: { "GDPVAL": true, "APEX-Agents": true, "APEX v1.0": true, "WorkArena": false, "GAIA": false, "Humanity\u2019s Last Exam": false, "Tau-Bench": false, "OSWorld": false } },
  { industry: "Customer Service", benchmarks: { "GDPVAL": true, "APEX-Agents": false, "APEX v1.0": false, "WorkArena": true, "GAIA": false, "Humanity\u2019s Last Exam": false, "Tau-Bench": true, "OSWorld": false } },
  { industry: "Education", benchmarks: { "GDPVAL": false, "APEX-Agents": false, "APEX v1.0": false, "WorkArena": false, "GAIA": true, "Humanity\u2019s Last Exam": true, "Tau-Bench": false, "OSWorld": false } },
  { industry: "Academic Research", benchmarks: { "GDPVAL": false, "APEX-Agents": false, "APEX v1.0": false, "WorkArena": false, "GAIA": true, "Humanity\u2019s Last Exam": true, "Tau-Bench": false, "OSWorld": false } },
];

export interface FileTypeBucket {
  category: string;
  types: string[];
  benchmarks: Record<string, boolean>;
}

export const fileTypeBuckets: FileTypeBucket[] = [
  { category: "Documents", types: ["PDF", "DOCX", "TXT"], benchmarks: { "GDPVAL": true, "APEX-Agents": true, "APEX v1.0": true, "WorkArena": false, "GAIA": true, "Humanity\u2019s Last Exam": false, "Tau-Bench": false, "OSWorld": true } },
  { category: "Spreadsheets", types: ["XLSX", "CSV"], benchmarks: { "GDPVAL": true, "APEX-Agents": true, "APEX v1.0": true, "WorkArena": false, "GAIA": false, "Humanity\u2019s Last Exam": false, "Tau-Bench": false, "OSWorld": true } },
  { category: "Presentations", types: ["PPTX"], benchmarks: { "GDPVAL": true, "APEX-Agents": true, "APEX v1.0": false, "WorkArena": false, "GAIA": false, "Humanity\u2019s Last Exam": false, "Tau-Bench": false, "OSWorld": true } },
  { category: "Video", types: ["MP4"], benchmarks: { "GDPVAL": true, "APEX-Agents": false, "APEX v1.0": false, "WorkArena": false, "GAIA": false, "Humanity\u2019s Last Exam": false, "Tau-Bench": false, "OSWorld": false } },
  { category: "Audio", types: ["MP3", "WAV"], benchmarks: { "GDPVAL": true, "APEX-Agents": false, "APEX v1.0": false, "WorkArena": false, "GAIA": false, "Humanity\u2019s Last Exam": false, "Tau-Bench": false, "OSWorld": false } },
  { category: "Images", types: ["PNG", "JPG", "SVG"], benchmarks: { "GDPVAL": true, "APEX-Agents": false, "APEX v1.0": false, "WorkArena": false, "GAIA": true, "Humanity\u2019s Last Exam": true, "Tau-Bench": false, "OSWorld": true } },
  { category: "3D Models", types: ["STL", "USDZ"], benchmarks: { "GDPVAL": true, "APEX-Agents": false, "APEX v1.0": false, "WorkArena": false, "GAIA": false, "Humanity\u2019s Last Exam": false, "Tau-Bench": false, "OSWorld": false } },
  { category: "Code", types: ["PY", "JS", "DART"], benchmarks: { "GDPVAL": true, "APEX-Agents": true, "APEX v1.0": false, "WorkArena": false, "GAIA": false, "Humanity\u2019s Last Exam": false, "Tau-Bench": false, "OSWorld": true } },
];

export const sources = [
  { id: 1, label: "GDPVAL", url: "https://parsewave.ai" },
  { id: 2, label: "GDPVAL Dataset", url: "https://huggingface.co/datasets/openai/gdpval" },
  { id: 3, label: "APEX-Agents", url: "https://huggingface.co/datasets/mercor/apex-agents" },
  { id: 4, label: "APEX v1.0", url: "https://arxiv.org/abs/2509.25721" },
  { id: 5, label: "WorkArena", url: "https://github.com/ServiceNow/WorkArena" },
  { id: 6, label: "GAIA", url: "https://huggingface.co/papers/2311.12983" },
  { id: 7, label: "Humanity\u2019s Last Exam", url: "https://scale.com/leaderboard/humanitys_last_exam" },
  { id: 8, label: "Tau-Bench", url: "https://sierra.ai/blog/benchmarking-ai-agents" },
  { id: 9, label: "OSWorld", url: "https://os-world.github.io/" },
  { id: 10, label: "Artificial Analysis Intelligence Index", url: "https://artificialanalysis.ai/text/intelligence-index" },
];
