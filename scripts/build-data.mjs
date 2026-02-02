#!/usr/bin/env node
/**
 * build-data.mjs
 *
 * Fetches GDPval evaluation results from Parsewave-internal/gdpval-samples
 * and generates src/data/evaluationData.ts with typed metadata.
 *
 * Usage: node scripts/build-data.mjs
 * Requires: gh CLI authenticated with access to Parsewave-internal org
 */

import { execSync } from "child_process";
import { writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO = "Parsewave-internal/gdpval-samples";
const BRANCH = "main";

function gh(path, raw = false) {
  const accept = raw
    ? '-H "Accept: application/vnd.github.raw"'
    : "";
  const cmd = `gh api "repos/${REPO}/contents/${path}?ref=${BRANCH}" ${accept}`;
  try {
    return execSync(cmd, { encoding: "utf-8", maxBuffer: 10 * 1024 * 1024 });
  } catch {
    return null;
  }
}

// ── 1. Fetch results CSV ──────────────────────────────────────────

console.log("Fetching results_all.csv...");
const csv = gh("results_all.csv", true);
if (!csv) {
  console.error("Failed to fetch results_all.csv");
  process.exit(1);
}

const lines = csv.trim().split("\n");
const header = lines[0].split(",");
const modelIds = header.slice(1); // skip "task" column

const taskScores = lines.slice(1).map((line) => {
  const cols = line.split(",");
  const id = cols[0];
  const scores = {};
  modelIds.forEach((model, i) => {
    scores[model] = parseFloat(cols[i + 1]) || 0;
  });
  return { id, scores };
});

console.log(`  Found ${taskScores.length} tasks, ${modelIds.length} models`);

// ── 2. Fetch task metadata ────────────────────────────────────────

// CSV task IDs don't always match harbor_tasks directory names
const DIR_ALIASES = {
  "bill-of-quantities-quote": "ai-boq-ingestion-bid-proposal",
  "calculation-and-validation-of-billet-dimensions-for-single-channel-profile-pressing": "aluminum-billet-extrusion-calc",
  "film-promo-reel-editing": "videographer-showreel",
  "international-humanitarian-law-defenses-case-precedents-v2": "ihl-defense-case-precedents",
  "investment-analyst-screening": "stock-screening-nvidia-deep-dive",
  "maritime-arbitration-jurisdiction-of-tribunal-case-precedents-v2": "maritime-arb-jurisdiction-precedents",
  "order-clerk-complex": "order-processing-confirmation",
  "screenplay-breakdown-storyboard": "shot-division",
  "tuneflow": "tuneflow-analytics-dashboard",
  "web-developer-booking": "auto-shop-booking-system",
};

console.log("Fetching task metadata...");
const tasks = [];

for (const { id, scores } of taskScores) {
  const dir = DIR_ALIASES[id] || id;
  const toml = gh(`harbor_tasks/${dir}/task.toml`, true);
  let occupation = "Unknown";
  let sector = "Unknown";
  let difficulty = "hard";
  let estimatedDurationSec = 0;

  if (toml) {
    const occMatch = toml.match(/occupation\s*=\s*"([^"]+)"/);
    const secMatch = toml.match(/sector\s*=\s*"([^"]+)"/);
    const diffMatch = toml.match(/difficulty\s*=\s*"([^"]+)"/);
    const durMatch = toml.match(/estimated_duration_sec\s*=\s*(\d+)/);

    if (occMatch) occupation = occMatch[1];
    if (secMatch) sector = secMatch[1];
    if (diffMatch) difficulty = diffMatch[1];
    if (durMatch) estimatedDurationSec = parseInt(durMatch[1]);

    // Normalize occupation names
    if (occupation === "Editors") occupation = "Film & Video Editors";
  } else {
    console.warn(`  Warning: No task.toml for ${id}`);
  }

  tasks.push({
    id,
    occupation,
    sector,
    difficulty,
    estimatedHours: Math.round((estimatedDurationSec / 3600) * 10) / 10,
    scores,
  });

  process.stdout.write(`  ${tasks.length}/${taskScores.length} ${id}\r`);
}
console.log();

// ── 3. Compute per-occupation aggregates ──────────────────────────

const occMap = new Map();
for (const task of tasks) {
  if (!occMap.has(task.occupation)) {
    occMap.set(task.occupation, { tasks: [], sector: task.sector });
  }
  occMap.get(task.occupation).tasks.push(task);
}

const occupations = [];
for (const [occupation, { tasks: occTasks, sector }] of occMap) {
  const scores = {};
  for (const model of modelIds) {
    const avg =
      occTasks.reduce((sum, t) => sum + t.scores[model], 0) / occTasks.length;
    scores[model] = Math.round(avg * 10000) / 10000;
  }
  const maxScore = Math.max(...Object.values(scores));
  const bestModel = maxScore > 0
    ? modelIds.reduce((a, b) => scores[a] >= scores[b] ? a : b)
    : null;
  occupations.push({
    occupation,
    sector,
    taskCount: occTasks.length,
    scores,
    bestModel,
  });
}

// Sort by total score descending (most interesting occupations first)
occupations.sort((a, b) => {
  const totalA = Object.values(a.scores).reduce((s, v) => s + v, 0);
  const totalB = Object.values(b.scores).reduce((s, v) => s + v, 0);
  return totalB - totalA;
});

// ── 4. Identify universal failures ────────────────────────────────

const universalFailures = tasks.filter((t) =>
  modelIds.every((m) => t.scores[m] === 0)
);

// ── 5. Compute aggregate scores ───────────────────────────────────

const aggregateScores = {};
for (const model of modelIds) {
  const avg =
    tasks.reduce((sum, t) => sum + t.scores[model], 0) / tasks.length;
  aggregateScores[model] = Math.round(avg * 10000) / 10000;
}

// ── 6. Model display labels ───────────────────────────────────────

const modelLabels = {
  "gpt-oss-120b": "GPT-OSS 120B",
  "gpt-5.2": "GPT-5.2 Thinking",
  "gemini-3-pro-preview": "Gemini 3 Pro",
  "claude-sonnet-4.5": "Claude Sonnet 4.5",
};

// ── 7. Write TypeScript output ────────────────────────────────────

const output = `// Auto-generated by scripts/build-data.mjs — do not edit manually
// Last generated: ${new Date().toISOString()}

export interface TaskResult {
  id: string;
  occupation: string;
  sector: string;
  difficulty: string;
  estimatedHours: number;
  scores: Record<string, number>;
}

export interface OccupationSummary {
  occupation: string;
  sector: string;
  taskCount: number;
  scores: Record<string, number>;
  bestModel: string | null;
}

export interface EvaluationData {
  models: string[];
  modelLabels: Record<string, string>;
  tasks: TaskResult[];
  occupations: OccupationSummary[];
  universalFailures: TaskResult[];
  aggregateScores: Record<string, number>;
  totalTasks: number;
  fullTaskCount: number;
  oraclePassRate: number;
}

export const evaluationData: EvaluationData = ${JSON.stringify(
  {
    models: modelIds,
    modelLabels,
    tasks,
    occupations,
    universalFailures,
    aggregateScores,
    totalTasks: tasks.length,
    fullTaskCount: 217,
    oraclePassRate: 0.8863,
  },
  null,
  2
)};
`;

const outPath = resolve(__dirname, "../src/data/evaluationData.ts");
writeFileSync(outPath, output, "utf-8");

console.log(`\nGenerated ${outPath}`);
console.log(`  ${tasks.length} tasks`);
console.log(`  ${occupations.length} occupations`);
console.log(`  ${universalFailures.length} universal failures`);
console.log(`  Models: ${modelIds.join(", ")}`);
console.log(
  `  Aggregate: ${modelIds.map((m) => `${modelLabels[m] || m}: ${(aggregateScores[m] * 100).toFixed(1)}%`).join(", ")}`
);
