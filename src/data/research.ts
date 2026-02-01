export interface Stake {
  value: string;
  description: string;
  source: string;
  sourceUrl: string;
}

export const stakes: Stake[] = [
  {
    value: "$4.4T",
    description: "Annual value generative AI could add across 63 use cases analyzed",
    source: "McKinsey, 2023",
    sourceUrl: "https://www.mckinsey.com/capabilities/mckinsey-digital/our-insights/the-economic-potential-of-generative-ai-the-next-productivity-frontier",
  },
  {
    value: "300M",
    description: "Jobs globally that could be affected by generative AI automation",
    source: "Goldman Sachs",
    sourceUrl: "https://www.goldmansachs.com/insights/articles/how-will-ai-affect-the-global-workforce",
  },
  {
    value: "57%",
    description: "Of U.S. work hours could be automated with technologies that exist today",
    source: "McKinsey, Nov 2025",
    sourceUrl: "https://roboticsandautomationnews.com/2025/11/26/mckinsey-warns-ai-and-robots-could-automate-40-percent-of-us-jobs-by-2030/97003/",
  },
  {
    value: "80-90%",
    description: "Of all new enterprise data is unstructured: PDFs, images, video, audio",
    source: "Gartner",
    sourceUrl: "https://indicodata.ai/blog/gartner-report-highlights-the-power-of-unstructured-data-analytics-indico-blog/",
  },
  {
    value: "26.2%",
    description: "Of real freelance engineering tasks completed by the best AI model",
    source: "SWE-Lancer, OpenAI 2025",
    sourceUrl: "https://openai.com/index/swe-lancer/",
  },
  {
    value: "40%",
    description: "Of GenAI solutions will be multimodal by 2027, up from 1% in 2023",
    source: "Gartner, Sept 2024",
    sourceUrl: "https://www.gartner.com/en/newsroom/press-releases/2024-09-09-gartner-predicts-40-percent-of-generative-ai-solutions-will-be-multimodal-by-2027",
  },
];

export interface PressQuote {
  quote: string;
  publication: string;
  date: string;
  url: string;
  attribution?: string;
}

export const pressQuotes: PressQuote[] = [
  {
    quote: "OpenAI's new GDPval benchmark shows AI catching up to human work",
    publication: "Axios",
    date: "Sept 25, 2025",
    url: "https://www.axios.com/2025/09/25/chatgpt-gdp-val-ai-study",
  },
  {
    quote: "Top AI models are getting really good at completing professional tasks, new OpenAI GDPval benchmark shows",
    publication: "Fortune",
    date: "Sept 30, 2025",
    url: "https://fortune.com/2025/09/30/ai-models-are-already-as-good-as-experts-at-half-of-tasks-a-new-openai-benchmark-gdpval-suggests/",
  },
  {
    quote: "OpenAI says GPT-5 stacks up to humans in a wide range of jobs",
    publication: "TechCrunch",
    date: "Sept 25, 2025",
    url: "https://techcrunch.com/2025/09/25/openai-says-gpt-5-stacks-up-to-humans-in-a-wide-range-of-jobs/",
  },
  {
    quote: "The most significant addition to the new index is GDPval-AA, an evaluation based on OpenAI's GDPval dataset that tests AI models on real-world economically valuable tasks across 44 occupations and 9 major industries.",
    publication: "VentureBeat",
    date: "Jan 7, 2026",
    url: "https://venturebeat.com/technology/artificial-analysis-overhauls-its-ai-intelligence-index-replacing-popular",
  },
  {
    quote: "GDPval would inspire AI researchers to think more about how to design their systems to be useful in doing practical work, not just ace the technical benchmarks.",
    publication: "Axios",
    date: "Sept 25, 2025",
    url: "https://www.axios.com/2025/09/25/chatgpt-gdp-val-ai-study",
    attribution: "Erik Brynjolfsson, Stanford economist",
  },
  {
    quote: "A wake-up call for every knowledge worker and business leader.",
    publication: "Marketing AI Institute",
    date: "Sept 30, 2025",
    url: "https://www.marketingaiinstitute.com/blog/openai-gdpval",
  },
  {
    quote: "Why CxOs, enterprises need to follow OpenAI's GDPval LLM benchmark.",
    publication: "Constellation Research",
    date: "2025",
    url: "https://www.constellationr.com/blog-news/insights/why-cxos-enterprises-need-follow-openai-s-gdpval-llm-benchmark",
  },
];

export interface CompetitorIssue {
  benchmark: string;
  issues: {
    text: string;
    source: string;
    sourceUrl: string;
  }[];
}

export const competitorIssues: CompetitorIssue[] = [
  {
    benchmark: "Humanity's Last Exam",
    issues: [
      {
        text: "29 +/- 3.7% (95% CI) of biology and chemistry answers were contradicted by peer-reviewed literature.",
        source: "FutureHouse",
        sourceUrl: "https://www.futurehouse.org/research-announcements/hle-exam",
      },
      {
        text: "\"This is not PhD-level research, but instead trivia.\" Question writers verified models couldn't answer, but reviewers only spent 5 minutes checking -- and didn't need to verify correctness.",
        source: "FutureHouse",
        sourceUrl: "https://www.futurehouse.org/research-announcements/hle-exam",
      },
    ],
  },
  {
    benchmark: "GAIA",
    issues: [
      {
        text: "About 5% of GAIA data contains errors or ambiguities in ground truth answers. Because scoring is exact-match, a model that arrives at the actually correct answer scores zero if it disagrees with the erroneous ground truth.",
        source: "Towards Data Science",
        sourceUrl: "https://towardsdatascience.com/gaia-the-llm-agent-benchmark-everyones-talking-about/",
      },
      {
        text: "Validation set answers are publicly available online, making the benchmark vulnerable to data contamination. Models can display \"suspiciously accurate guesses\" about search strategies.",
        source: "H2O.ai / Towards Data Science",
        sourceUrl: "https://towardsdatascience.com/gaia-the-llm-agent-benchmark-everyones-talking-about/",
      },
    ],
  },
  {
    benchmark: "APEX-Agents",
    issues: [
      {
        text: "Covers only 3 professional domains (investment banking, consulting, law). Binary pass/fail scoring means a model completing 90% of a task correctly still registers as total failure. Best agent achieves only 24% Pass@1.",
        source: "Mercor",
        sourceUrl: "https://www.mercor.com/blog/introducing-apex-agents/",
      },
    ],
  },
  {
    benchmark: "APEX v1.0",
    issues: [
      {
        text: "Uses LLM-as-a-Judge evaluation with a panel that agrees with human expert grades only 89% of the time. Rubrics do not penalize incorrect or irrelevant claims, meaning a model that includes hallucinations alongside correct answers is not penalized.",
        source: "arXiv",
        sourceUrl: "https://arxiv.org/html/2509.25721v1",
      },
    ],
  },
  {
    benchmark: "WorkArena",
    issues: [
      {
        text: "All tasks are confined to the ServiceNow platform. Original tasks are \"predominantly atomic, with simple goals such as filling out a single form with explicit values.\" No file-based deliverables.",
        source: "arXiv",
        sourceUrl: "https://arxiv.org/abs/2403.07718",
      },
    ],
  },
  {
    benchmark: "Tau-Bench",
    issues: [
      {
        text: "Only 2-3 domains, all customer service (retail, airline, telecom). Entirely text-based with no multimodal inputs and no file deliverables. Tasks take minutes, not hours.",
        source: "arXiv",
        sourceUrl: "https://arxiv.org/abs/2406.12045",
      },
    ],
  },
  {
    benchmark: "OSWorld",
    issues: [
      {
        text: "Approximately 10% of tasks have serious errors. Nearly 45% of tasks don't require significant GUI interaction and can be solved with terminal commands. \"It is difficult to interpret differences in scores reported on OSWorld.\"",
        source: "Epoch AI",
        sourceUrl: "https://epoch.ai/blog/what-does-osworld-tell-us-about-ais-ability-to-use-computers",
      },
    ],
  },
];

export interface ExpertQuote {
  quote: string;
  attribution: string;
  source: string;
  sourceUrl: string;
}

export const expertQuotes: ExpertQuote[] = [
  {
    quote: "It's not like a lawyer's job is to answer bar exam questions all day.",
    attribution: "Arvind Narayanan & Sayash Kapoor, Princeton",
    source: "Knight First Amendment Institute",
    sourceUrl: "https://knightcolumbia.org/content/ai-as-normal-technology",
  },
  {
    quote: "The way we measure progress in AI is terrible.",
    attribution: "MIT Technology Review",
    source: "MIT Technology Review, Nov 2024",
    sourceUrl: "https://www.technologyreview.com/2024/11/26/1107346/the-way-we-measure-progress-in-ai-is-terrible/",
  },
  {
    quote: "Previous AI evaluations like challenging academic tests and competitive coding challenges have been essential in pushing the boundaries of model reasoning capabilities, but they often fall short of the kind of tasks that many people handle in their everyday work.",
    attribution: "OpenAI",
    source: "OpenAI GDPval blog",
    sourceUrl: "https://openai.com/index/gdpval/",
  },
];
