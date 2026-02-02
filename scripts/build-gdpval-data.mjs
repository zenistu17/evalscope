#!/usr/bin/env node
/**
 * build-gdpval-data.mjs
 *
 * Fetches GDPval's 220 public tasks from HuggingFace datasets-server API
 * and computes structural metrics for comparison with Parsewave tasks.
 *
 * Source: https://huggingface.co/datasets/openai/gdpval
 * Paper: https://arxiv.org/abs/2510.04374
 *
 * No authentication required (public dataset).
 */

import { writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const API_BASE =
  "https://datasets-server.huggingface.co/rows?dataset=openai/gdpval&config=default&split=train";

// -- 1. Fetch all 220 rows (3 paginated requests) --

console.log("Fetching GDPval dataset from HuggingFace...");

const allRows = [];

for (let offset = 0; offset < 220; offset += 100) {
  const length = Math.min(100, 220 - offset);
  const url = `${API_BASE}&offset=${offset}&length=${length}`;
  console.log(`  Fetching offset=${offset}, length=${length}...`);

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`HuggingFace API error: ${res.status} ${res.statusText}`);
  }
  const data = await res.json();
  const rows = data.rows.map((r) => r.row);
  allRows.push(...rows);

  // 1s delay between requests
  if (offset + 100 < 220) {
    await new Promise((r) => setTimeout(r, 1000));
  }
}

console.log(`  Fetched ${allRows.length} rows`);

// -- 2. Compute metrics from raw data --

console.log("Computing metrics...");

// Prompt word counts
const promptWordCounts = allRows.map((row) => {
  const prompt = row.prompt || "";
  return prompt.trim().split(/\s+/).filter(Boolean).length;
});

// Reference file counts and types
const refFileCounts = [];
const allRefFileTypes = new Set();
const refFileTypeFreq = {};
let textOnlyCount = 0;

for (const row of allRows) {
  const files = row.reference_files || [];
  refFileCounts.push(files.length);

  if (files.length === 0) {
    textOnlyCount++;
  }

  for (const filename of files) {
    const parts = filename.split(".");
    if (parts.length > 1) {
      const ext = parts[parts.length - 1].toLowerCase();
      allRefFileTypes.add(ext);
      refFileTypeFreq[ext] = (refFileTypeFreq[ext] || 0) + 1;
    }
  }
}

// Sector and occupation distributions
const sectorDist = {};
const occupationDist = {};

for (const row of allRows) {
  const sector = row.sector || "Unknown";
  const occupation = row.occupation || "Unknown";
  sectorDist[sector] = (sectorDist[sector] || 0) + 1;
  occupationDist[occupation] = (occupationDist[occupation] || 0) + 1;
}

// -- 3. Statistical helpers --

function computeStats(arr) {
  const sorted = [...arr].sort((a, b) => a - b);
  const n = sorted.length;
  const sum = sorted.reduce((s, v) => s + v, 0);
  const mean = Math.round((sum / n) * 10) / 10;
  const median = n % 2 === 0
    ? Math.round(((sorted[n / 2 - 1] + sorted[n / 2]) / 2) * 10) / 10
    : sorted[Math.floor(n / 2)];
  const p25 = sorted[Math.floor(n * 0.25)];
  const p75 = sorted[Math.floor(n * 0.75)];
  return { min: sorted[0], max: sorted[n - 1], mean, median, p25, p75 };
}

// Word count bins (same ranges as Parsewave data for comparison)
const wordCountBins = [
  { range: "0-200", min: 0, max: 200 },
  { range: "200-500", min: 200, max: 500 },
  { range: "500-800", min: 500, max: 800 },
  { range: "800-1200", min: 800, max: 1200 },
  { range: "1200+", min: 1200, max: Infinity },
];

const binCounts = wordCountBins.map((bin) => ({
  range: bin.range,
  count: promptWordCounts.filter(
    (wc) => wc >= bin.min && (bin.max === Infinity ? true : wc < bin.max)
  ).length,
}));

// -- 4. Assemble output --

const promptStats = computeStats(promptWordCounts);
const refFileStats = computeStats(refFileCounts);

const computed = {
  avgPromptWords: promptStats.mean,
  medianPromptWords: promptStats.median,
  promptWordCountStats: promptStats,
  promptWordCountBins: binCounts,
  avgReferenceFiles: refFileStats.mean,
  medianReferenceFiles: refFileStats.median,
  referenceFileStats: refFileStats,
  percentTextOnly: Math.round((textOnlyCount / allRows.length) * 1000) / 10,
  uniqueOccupations: Object.keys(occupationDist).length,
  uniqueSectors: Object.keys(sectorDist).length,
  referenceFileTypes: [...allRefFileTypes].sort(),
  uniqueReferenceFileTypes: allRefFileTypes.size,
  referenceFileTypeFrequency: refFileTypeFreq,
  sectorDistribution: sectorDist,
  occupationDistribution: occupationDist,
};

// Hardcoded from paper (arXiv:2510.04374, Tables 1-3)
const fromPaper = {
  avgDeliverableFiles: 1.54,
  avgReferenceFilesReported: 1.92,
  percentTextOnlyReported: 32.3,
  medianCompletionHours: 5.0,
  meanCompletionHours: 9.49,
  meanDollarValue: 398.46,
  qualityRating: 4.47,
  difficultyRating: 3.32,
  percentWellSpecified: 89,
  evaluationMethod: "Pairwise comparison (GPT-5 judge)",
  humanAgreementRate: 0.66,
  totalTasksFull: 1320,
};

// -- 5. Generate TypeScript output --

console.log("Generating TypeScript output...");

const outputData = {
  generatedAt: new Date().toISOString(),
  source: "https://huggingface.co/datasets/openai/gdpval",
  paperUrl: "https://arxiv.org/abs/2510.04374",
  totalTasks: allRows.length,
  computed,
  fromPaper,
};

const interfaces = `export interface GdpvalData {
  generatedAt: string;
  source: string;
  paperUrl: string;
  totalTasks: number;
  computed: {
    avgPromptWords: number;
    medianPromptWords: number;
    promptWordCountStats: { min: number; max: number; mean: number; median: number; p25: number; p75: number };
    promptWordCountBins: Array<{ range: string; count: number }>;
    avgReferenceFiles: number;
    medianReferenceFiles: number;
    referenceFileStats: { min: number; max: number; mean: number; median: number; p25: number; p75: number };
    percentTextOnly: number;
    uniqueOccupations: number;
    uniqueSectors: number;
    referenceFileTypes: string[];
    uniqueReferenceFileTypes: number;
    referenceFileTypeFrequency: Record<string, number>;
    sectorDistribution: Record<string, number>;
    occupationDistribution: Record<string, number>;
  };
  fromPaper: {
    avgDeliverableFiles: number;
    avgReferenceFilesReported: number;
    percentTextOnlyReported: number;
    medianCompletionHours: number;
    meanCompletionHours: number;
    meanDollarValue: number;
    qualityRating: number;
    difficultyRating: number;
    percentWellSpecified: number;
    evaluationMethod: string;
    humanAgreementRate: number;
    totalTasksFull: number;
  };
}`;

const output = `// Auto-generated by scripts/build-gdpval-data.mjs - do not edit manually
// Last generated: ${outputData.generatedAt}
// Source: ${outputData.source}

${interfaces}

export const gdpvalData: GdpvalData = ${JSON.stringify(outputData, null, 2)};
`;

const outPath = resolve(__dirname, "../src/data/gdpvalData.ts");
writeFileSync(outPath, output, "utf-8");

// -- 6. Print summary --

console.log(`\nGenerated ${outPath}\n`);
console.log("Summary:");
console.log(`  Total tasks: ${allRows.length}`);
console.log(`  Occupations: ${computed.uniqueOccupations}`);
console.log(`  Sectors: ${computed.uniqueSectors}`);
console.log(`  Avg prompt words: ${computed.avgPromptWords}`);
console.log(`  Median prompt words: ${computed.medianPromptWords}`);
console.log(`  Avg reference files: ${computed.avgReferenceFiles}`);
console.log(`  Text-only: ${computed.percentTextOnly}%`);
console.log(`  Reference file types: ${computed.uniqueReferenceFileTypes}`);
console.log();
console.log("Word count distribution:");
for (const bin of binCounts) {
  const bar = "#".repeat(Math.round(bin.count / 2));
  console.log(`  ${bin.range.padEnd(10)} ${bar} ${bin.count}`);
}
console.log();
console.log(`Top reference file types: ${
  Object.entries(refFileTypeFreq)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([ext, count]) => `.${ext} (${count})`)
    .join(", ")
}`);
