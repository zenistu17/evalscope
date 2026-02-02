#!/usr/bin/env node
/**
 * build-task-quality-data.mjs
 *
 * Fetches all tasks from Parsewave-internal/gdpval-samples and extracts
 * structural quality metrics. Generates src/data/taskQualityData.ts.
 *
 * Optimized: uses Git Tree API for file listings (2 calls) then fetches
 * only task.toml + instruction.md content per task (~428 calls total).
 *
 * Usage: node scripts/build-task-quality-data.mjs
 * Requires: gh CLI authenticated with access to Parsewave-internal org
 */

import { execSync } from "child_process";
import { writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO = "Parsewave-internal/gdpval-samples";
const BRANCH = "main";

// ── Helpers ─────────────────────────────────────────────────────

function ghApi(endpoint) {
  try {
    return execSync(`gh api "${endpoint}"`, {
      encoding: "utf-8",
      maxBuffer: 50 * 1024 * 1024,
      stdio: ["pipe", "pipe", "pipe"],
    });
  } catch {
    return null;
  }
}

function ghRaw(path) {
  try {
    return execSync(
      `gh api "repos/${REPO}/contents/${path}?ref=${BRANCH}" -H "Accept: application/vnd.github.raw"`,
      {
        encoding: "utf-8",
        maxBuffer: 50 * 1024 * 1024,
        stdio: ["pipe", "pipe", "pipe"],
      }
    );
  } catch {
    return null;
  }
}

function extractMatch(text, regex) {
  const m = text.match(regex);
  return m ? m[1] : null;
}

function computeStats(values) {
  if (!values.length) return { min: 0, max: 0, mean: 0, median: 0, p25: 0, p75: 0 };
  const sorted = values.slice().sort((a, b) => a - b);
  const n = sorted.length;
  return {
    min: sorted[0],
    max: sorted[n - 1],
    mean: Math.round((sorted.reduce((s, v) => s + v, 0) / n) * 100) / 100,
    median: sorted[Math.floor(n / 2)],
    p25: sorted[Math.floor(n * 0.25)],
    p75: sorted[Math.floor(n * 0.75)],
  };
}

function makeFrequencyMap(values) {
  const map = {};
  for (const v of values) map[v] = (map[v] || 0) + 1;
  return map;
}

// ── 1. Fetch file tree (2 API calls) ────────────────────────────

console.log("Fetching harbor_tasks file tree...");

const rootTreeRaw = ghApi(`repos/${REPO}/git/trees/${BRANCH}`);
if (!rootTreeRaw) {
  console.error("Failed to fetch root tree");
  process.exit(1);
}
const rootTree = JSON.parse(rootTreeRaw);
const harborEntry = rootTree.tree.find((e) => e.path === "harbor_tasks");
if (!harborEntry) {
  console.error("harbor_tasks not found in repo");
  process.exit(1);
}

const harborTreeRaw = ghApi(
  `repos/${REPO}/git/trees/${harborEntry.sha}?recursive=1`
);
if (!harborTreeRaw) {
  console.error("Failed to fetch harbor_tasks tree");
  process.exit(1);
}
const harborTree = JSON.parse(harborTreeRaw);
if (harborTree.truncated) {
  console.warn("Warning: tree response was truncated — some tasks may be missing");
}

console.log(`  Tree has ${harborTree.tree.length} entries`);

// ── 2. Parse tree into per-task file info ───────────────────────

const taskFileMap = new Map();

for (const entry of harborTree.tree) {
  if (entry.type !== "blob") continue;

  const parts = entry.path.split("/");
  if (parts.length < 2) continue;

  const taskId = parts[0];
  if (!taskFileMap.has(taskId)) {
    taskFileMap.set(taskId, {
      dataFiles: [],
      solutionFiles: [],
      hasToml: false,
      hasInstruction: false,
    });
  }

  const info = taskFileMap.get(taskId);
  const relPath = parts.slice(1).join("/");

  if (relPath === "task.toml") {
    info.hasToml = true;
  } else if (relPath === "instruction.md") {
    info.hasInstruction = true;
  } else if (relPath.startsWith("environment/data/") && parts.length > 3) {
    const fileName = parts[parts.length - 1];
    const ext = fileName.includes(".")
      ? fileName.split(".").pop().toLowerCase()
      : "";
    info.dataFiles.push({ name: fileName, ext, size: entry.size || 0 });
  } else if (relPath.startsWith("tests/solution/") && parts.length > 3) {
    const fileName = parts[parts.length - 1];
    const ext = fileName.includes(".")
      ? fileName.split(".").pop().toLowerCase()
      : "";
    info.solutionFiles.push({ name: fileName, ext, size: entry.size || 0 });
  }
}

const taskIds = Array.from(taskFileMap.keys()).sort();
console.log(`  Found ${taskIds.length} task directories\n`);

// ── 3. Fetch content and extract metrics ────────────────────────

console.log("Fetching task.toml + instruction.md for each task...");
const tasks = [];
let idx = 0;

for (const taskId of taskIds) {
  idx++;
  const fileInfo = taskFileMap.get(taskId);

  if (!fileInfo.hasToml) {
    console.warn(`  [${idx}/${taskIds.length}] Skipping ${taskId}: no task.toml`);
    continue;
  }

  process.stdout.write(
    `  [${idx}/${taskIds.length}] ${taskId.padEnd(60)}\r`
  );

  // ── Fetch task.toml ──
  const toml = ghRaw(`harbor_tasks/${taskId}/task.toml`);
  if (!toml) {
    console.warn(`\n  Failed to fetch task.toml for ${taskId}`);
    continue;
  }

  // Parse task.toml
  let occupation =
    extractMatch(toml, /occupation\s*=\s*"([^"]+)"/) || "Unknown";
  const sector = extractMatch(toml, /sector\s*=\s*"([^"]+)"/) || "Unknown";
  const difficulty =
    extractMatch(toml, /difficulty\s*=\s*"([^"]+)"/) || "hard";
  const durSec = parseInt(
    extractMatch(toml, /estimated_duration_sec\s*=\s*(\d+)/) || "0"
  );
  const textOnly = /text_only\s*=\s*true/.test(toml);

  // Normalize occupation names
  if (occupation === "Editors") occupation = "Film & Video Editors";

  // ── Fetch instruction.md ──
  let instructionWordCount = 0;
  let rubricTotalPoints = 0;
  let rubricCriteriaCount = 0;
  let rubricCriteriaNames = [];
  let rubricHas4Levels = false;

  if (fileInfo.hasInstruction) {
    const instruction = ghRaw(`harbor_tasks/${taskId}/instruction.md`);
    if (instruction) {
      // Split at rubric marker (flexible: at least 3 equals signs)
      const rubricMarker = /={3,}\s*RUBRIC\s*={3,}/;
      const splitParts = instruction.split(rubricMarker);
      const instructionText = splitParts[0] || "";
      const rubricSection = splitParts[1] || "";

      // Word count (instruction only, excluding rubric)
      instructionWordCount = instructionText
        .trim()
        .split(/\s+/)
        .filter((w) => w.length > 0).length;

      // Parse rubric JSON
      try {
        const jsonMatch = rubricSection.match(/```json\s*\n([\s\S]*?)\n```/);
        if (jsonMatch) {
          const rubric = JSON.parse(jsonMatch[1]);
          rubricTotalPoints = rubric.total_points || 0;
          rubricCriteriaCount = rubric.criteria?.length || 0;
          rubricCriteriaNames = (rubric.criteria || []).map((c) => c.name);
          rubricHas4Levels = (rubric.criteria || []).every(
            (c) => c.levels && c.levels.length === 4
          );
        }
      } catch {
        /* rubric parse failed — not critical */
      }
    }
  }

  // ── File info from tree ──
  const dataFileTypes = [
    ...new Set(fileInfo.dataFiles.map((f) => f.ext).filter(Boolean)),
  ].sort();
  const solutionFileTypes = [
    ...new Set(fileInfo.solutionFiles.map((f) => f.ext).filter(Boolean)),
  ].sort();
  const dataFileTotalSize = fileInfo.dataFiles.reduce(
    (sum, f) => sum + f.size,
    0
  );

  tasks.push({
    id: taskId,
    occupation,
    sector,
    difficulty,
    estimatedHours: Math.round((durSec / 3600) * 100) / 100,
    textOnly,
    instructionWordCount,
    rubricTotalPoints,
    rubricCriteriaCount,
    rubricCriteriaNames,
    rubricHas4Levels,
    dataFileCount: fileInfo.dataFiles.length,
    dataFileTypes,
    dataFileTotalSize,
    solutionFileCount: fileInfo.solutionFiles.length,
    solutionFileTypes,
    isMultiFile: fileInfo.dataFiles.length > 1,
    hasMultiFileDeliverable: fileInfo.solutionFiles.length > 1,
  });
}

console.log(`\n\nProcessed ${tasks.length} tasks\n`);

// ── 4. Compute aggregate statistics ─────────────────────────────

console.log("Computing aggregate statistics...");

// Distribution stats
const wordCounts = tasks.map((t) => t.instructionWordCount);
const rubricPoints = tasks.map((t) => t.rubricTotalPoints);
const criteriaCount = tasks.map((t) => t.rubricCriteriaCount);
const dataFileCounts = tasks.map((t) => t.dataFileCount);
const solFileCounts = tasks.map((t) => t.solutionFileCount);
const hours = tasks.map((t) => t.estimatedHours);

// Unique file types across all tasks
const allFileTypes = new Set();
const fileTypeFreq = {};
for (const t of tasks) {
  const taskTypes = new Set([...t.dataFileTypes, ...t.solutionFileTypes]);
  for (const ft of taskTypes) {
    allFileTypes.add(ft);
    fileTypeFreq[ft] = (fileTypeFreq[ft] || 0) + 1;
  }
}

// Word count histogram bins
const wordCountBins = [
  { range: "0–200", min: 0, max: 200 },
  { range: "200–500", min: 200, max: 500 },
  { range: "500–800", min: 500, max: 800 },
  { range: "800–1200", min: 800, max: 1200 },
  { range: "1200+", min: 1200, max: Infinity },
];
const bins = wordCountBins.map((bin) => ({
  range: bin.range,
  count: wordCounts.filter((w) => w >= bin.min && w < bin.max).length,
}));

const stats = {
  instructionWordCount: computeStats(wordCounts),
  rubricPoints: {
    ...computeStats(rubricPoints),
    distribution: makeFrequencyMap(rubricPoints),
  },
  rubricCriteria: {
    ...computeStats(criteriaCount),
    distribution: makeFrequencyMap(criteriaCount),
  },
  dataFilesPerTask: computeStats(dataFileCounts),
  solutionFilesPerTask: computeStats(solFileCounts),
  estimatedHours: computeStats(hours),

  uniqueFileTypes: Array.from(allFileTypes).sort(),
  fileTypeFrequency: Object.fromEntries(
    Object.entries(fileTypeFreq).sort((a, b) => b[1] - a[1])
  ),
  occupationDistribution: makeFrequencyMap(tasks.map((t) => t.occupation)),
  sectorDistribution: makeFrequencyMap(tasks.map((t) => t.sector)),
  difficultyDistribution: makeFrequencyMap(tasks.map((t) => t.difficulty)),

  percentTextOnly:
    Math.round(
      (tasks.filter((t) => t.textOnly).length / tasks.length) * 10000
    ) / 100,
  percentMultiFile:
    Math.round(
      (tasks.filter((t) => t.isMultiFile).length / tasks.length) * 10000
    ) / 100,
  percentMultiFileDeliverable:
    Math.round(
      (tasks.filter((t) => t.hasMultiFileDeliverable).length / tasks.length) *
        10000
    ) / 100,
  percent4LevelRubric:
    Math.round(
      (tasks.filter((t) => t.rubricHas4Levels).length / tasks.length) * 10000
    ) / 100,

  wordCountBins: bins,
};

// Key metrics
const keyMetrics = {
  avgInstructionWords: Math.round(stats.instructionWordCount.mean),
  medianInstructionWords: stats.instructionWordCount.median,
  avgRubricPoints: Math.round(stats.rubricPoints.mean * 10) / 10,
  avgCriteriaCount: Math.round(stats.rubricCriteria.mean * 10) / 10,
  avgDataFiles: Math.round(stats.dataFilesPerTask.mean * 10) / 10,
  avgSolutionFiles: Math.round(stats.solutionFilesPerTask.mean * 10) / 10,
  uniqueOccupations: Object.keys(stats.occupationDistribution).length,
  uniqueSectors: Object.keys(stats.sectorDistribution).length,
  uniqueFileTypes: stats.uniqueFileTypes.length,
  avgEstimatedHours: Math.round(stats.estimatedHours.mean * 10) / 10,
};

// ── 5. Benchmark comparison data (hardcoded from published papers) ──

const benchmarks = [
  {
    name: "MMLU",
    taskCount: 15908,
    avgQuestionWords: 57,
    scoring: "Multiple choice (A/B/C/D)",
    fileTypes: 0,
    avgFilesPerTask: 0,
    rubricPoints: 1,
    multimodal: "Text only",
  },
  {
    name: "GAIA",
    taskCount: 466,
    avgQuestionWords: 93,
    scoring: "Exact match (binary)",
    fileTypes: 3,
    avgFilesPerTask: 0.3,
    rubricPoints: 1,
    multimodal: "Text + limited files",
  },
  {
    name: "HLE",
    taskCount: 500,
    avgQuestionWords: 142,
    scoring: "Exact match (binary)",
    fileTypes: 0,
    avgFilesPerTask: 0,
    rubricPoints: 1,
    multimodal: "Text only",
  },
  {
    name: "SWE-bench",
    taskCount: 2294,
    avgQuestionWords: 185,
    scoring: "Unit tests pass/fail",
    fileTypes: 1,
    avgFilesPerTask: 1,
    rubricPoints: 1,
    multimodal: "Code only",
  },
  {
    name: "GPQA",
    taskCount: 448,
    avgQuestionWords: 121,
    scoring: "Multiple choice (binary)",
    fileTypes: 0,
    avgFilesPerTask: 0,
    rubricPoints: 1,
    multimodal: "Text only",
  },
];

// ── 6. Generate TypeScript output ───────────────────────────────

console.log("Generating TypeScript output...\n");

const interfaces = `export interface TaskQualityMetrics {
  id: string;
  occupation: string;
  sector: string;
  difficulty: string;
  estimatedHours: number;
  textOnly: boolean;
  instructionWordCount: number;
  rubricTotalPoints: number;
  rubricCriteriaCount: number;
  rubricCriteriaNames: string[];
  rubricHas4Levels: boolean;
  dataFileCount: number;
  dataFileTypes: string[];
  dataFileTotalSize: number;
  solutionFileCount: number;
  solutionFileTypes: string[];
  isMultiFile: boolean;
  hasMultiFileDeliverable: boolean;
}

export interface DistributionStats {
  min: number;
  max: number;
  mean: number;
  median: number;
  p25: number;
  p75: number;
}

export interface AggregateStats {
  instructionWordCount: DistributionStats;
  rubricPoints: DistributionStats & { distribution: Record<number, number> };
  rubricCriteria: DistributionStats & { distribution: Record<number, number> };
  dataFilesPerTask: DistributionStats;
  solutionFilesPerTask: DistributionStats;
  estimatedHours: DistributionStats;
  uniqueFileTypes: string[];
  fileTypeFrequency: Record<string, number>;
  occupationDistribution: Record<string, number>;
  sectorDistribution: Record<string, number>;
  difficultyDistribution: Record<string, number>;
  percentTextOnly: number;
  percentMultiFile: number;
  percentMultiFileDeliverable: number;
  percent4LevelRubric: number;
  wordCountBins: Array<{ range: string; count: number }>;
}

export interface BenchmarkComparison {
  name: string;
  taskCount: number;
  avgQuestionWords: number;
  scoring: string;
  fileTypes: number;
  avgFilesPerTask: number;
  rubricPoints: number;
  multimodal: string;
}

export interface TaskQualityData {
  generatedAt: string;
  totalTasks: number;
  tasks: TaskQualityMetrics[];
  stats: AggregateStats;
  benchmarks: BenchmarkComparison[];
  keyMetrics: {
    avgInstructionWords: number;
    medianInstructionWords: number;
    avgRubricPoints: number;
    avgCriteriaCount: number;
    avgDataFiles: number;
    avgSolutionFiles: number;
    uniqueOccupations: number;
    uniqueSectors: number;
    uniqueFileTypes: number;
    avgEstimatedHours: number;
  };
}`;

const data = {
  generatedAt: new Date().toISOString(),
  totalTasks: tasks.length,
  tasks,
  stats,
  benchmarks,
  keyMetrics,
};

const output = `// Auto-generated by scripts/build-task-quality-data.mjs — do not edit manually
// Last generated: ${data.generatedAt}

${interfaces}

export const taskQualityData: TaskQualityData = ${JSON.stringify(data, null, 2)};
`;

const outPath = resolve(__dirname, "../src/data/taskQualityData.ts");
writeFileSync(outPath, output, "utf-8");

// ── 7. Print summary ────────────────────────────────────────────

console.log(`Generated ${outPath}\n`);
console.log("Summary:");
console.log(`  Total tasks: ${tasks.length}`);
console.log(`  Occupations: ${keyMetrics.uniqueOccupations}`);
console.log(`  Sectors: ${keyMetrics.uniqueSectors}`);
console.log(`  File types: ${keyMetrics.uniqueFileTypes}`);
console.log();
console.log("Key Metrics:");
console.log(`  Avg instruction words: ${keyMetrics.avgInstructionWords}`);
console.log(`  Median instruction words: ${keyMetrics.medianInstructionWords}`);
console.log(`  Avg rubric points: ${keyMetrics.avgRubricPoints}`);
console.log(`  Avg criteria/task: ${keyMetrics.avgCriteriaCount}`);
console.log(`  Avg data files/task: ${keyMetrics.avgDataFiles}`);
console.log(`  Avg solution files/task: ${keyMetrics.avgSolutionFiles}`);
console.log(`  Avg estimated hours: ${keyMetrics.avgEstimatedHours}`);
console.log();
console.log("Composition:");
console.log(`  Text-only: ${stats.percentTextOnly}%`);
console.log(`  Multi-file input: ${stats.percentMultiFile}%`);
console.log(`  Multi-file deliverable: ${stats.percentMultiFileDeliverable}%`);
console.log(`  4-level rubric: ${stats.percent4LevelRubric}%`);
console.log();
console.log("Word count distribution:");
for (const bin of bins) {
  const bar = "█".repeat(Math.round(bin.count / 3));
  console.log(`  ${bin.range.padEnd(10)} ${bar} ${bin.count}`);
}
console.log();
console.log(
  "Top file types:",
  Object.entries(fileTypeFreq)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([ext, count]) => `.${ext} (${count})`)
    .join(", ")
);
