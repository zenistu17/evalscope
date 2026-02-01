#!/usr/bin/env node
/**
 * One-time prep script: downloads task files from the private repo
 * and converts DOCX -> HTML, XLSX -> HTML tables.
 *
 * Usage: node scripts/prepare-tasks.mjs
 * Requires: gh CLI authenticated with access to Parsewave-internal/gdpval-samples
 */

import { execSync } from "child_process";
import fs from "fs/promises";
import path from "path";
import mammoth from "mammoth";
import pkg from "xlsx";
const { readFile, utils } = pkg;

const REPO = "Parsewave-internal/gdpval-samples";
const BRANCH = "main";
const OUT_DIR = "./public/tasks";

const TASKS = [
  "thai-arbitration-legal-research",
  "early-retirement-plan",
  "fashion-brand-tech-teaser",
  "dermatology-cases-analysis",
  "wing-aero-performance",
  "cinematic-trailer-bgm",
];

function gh(apiPath, raw = false) {
  const accept = raw
    ? '-H "Accept: application/vnd.github.raw"'
    : "";
  const cmd = `gh api "repos/${REPO}/contents/${apiPath}?ref=${BRANCH}" ${accept}`;
  return execSync(cmd, { maxBuffer: 50 * 1024 * 1024 }).toString();
}

function ghBinary(apiPath, outputPath) {
  const cmd = `gh api "repos/${REPO}/contents/${apiPath}?ref=${BRANCH}" -H "Accept: application/vnd.github.raw" > "${outputPath}"`;
  execSync(cmd, { maxBuffer: 50 * 1024 * 1024, shell: true });
}

async function listDir(dirPath) {
  try {
    const json = gh(dirPath);
    const entries = JSON.parse(json);
    return entries.filter((e) => e.type === "file").map((e) => e.name);
  } catch {
    return [];
  }
}

async function convertDocx(filePath) {
  const result = await mammoth.convertToHtml({ path: filePath });
  const htmlPath = filePath.replace(/\.docx$/i, ".html");
  await fs.writeFile(htmlPath, result.value, "utf-8");
  console.log(`  DOCX -> HTML: ${path.basename(htmlPath)}`);
}

async function convertXlsx(filePath) {
  const workbook = readFile(filePath);
  let html = "";
  for (const sheetName of workbook.SheetNames) {
    const sheet = workbook.Sheets[sheetName];
    if (workbook.SheetNames.length > 1) {
      html += `<h3 class="sheet-name">${sheetName}</h3>\n`;
    }
    html += utils.sheet_to_html(sheet, { id: "", header: "", footer: "" });
    html += "\n";
  }
  const htmlPath = filePath.replace(/\.xlsx$/i, ".html");
  await fs.writeFile(htmlPath, html, "utf-8");
  console.log(`  XLSX -> HTML: ${path.basename(htmlPath)}`);
}

async function convertInstruction(taskId) {
  const basePath = `harbor_tasks/${taskId}`;
  const mdContent = gh(`${basePath}/instruction.md`, true);

  // Split on rubric delimiter
  const parts = mdContent.split(/={3,}\s*RUBRIC\s*={3,}/i);
  const descriptionMd = parts[0].trim();

  // Convert markdown to basic HTML (simple approach for instruction text)
  let html = descriptionMd
    .replace(/^### (.+)$/gm, "<h3>$1</h3>")
    .replace(/^## (.+)$/gm, "<h2>$1</h2>")
    .replace(/^# (.+)$/gm, "<h1>$1</h1>")
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/`(.+?)`/g, "<code>$1</code>")
    .replace(/^- (.+)$/gm, "<li>$1</li>")
    .replace(/(<li>.*<\/li>\n?)+/g, (m) => `<ul>${m}</ul>`)
    .replace(/\n\n/g, "\n</p>\n<p>\n")
    .replace(/^(?!<[hulo])/gm, "");

  html = `<div class="instruction-content"><p>${html}</p></div>`;

  const outPath = path.join(OUT_DIR, taskId, "instruction.html");
  await fs.writeFile(outPath, html, "utf-8");
  console.log(`  instruction.md -> HTML`);

  // Extract rubric JSON
  let rubric = [];
  if (parts[1]) {
    const jsonMatch = parts[1].match(/```json\s*([\s\S]*?)```/);
    if (jsonMatch) {
      try {
        rubric = JSON.parse(jsonMatch[1]);
      } catch (e) {
        console.warn(`  Warning: could not parse rubric JSON for ${taskId}`);
      }
    }
  }

  return { descriptionMd, rubric };
}

async function processTask(taskId) {
  console.log(`\nProcessing: ${taskId}`);

  const inputDir = path.join(OUT_DIR, taskId, "input");
  const outputDir = path.join(OUT_DIR, taskId, "output");
  await fs.mkdir(inputDir, { recursive: true });
  await fs.mkdir(outputDir, { recursive: true });

  // Download instruction + extract rubric
  const { rubric } = await convertInstruction(taskId);

  // Download data files
  const dataPath = `harbor_tasks/${taskId}/environment/data`;
  const dataFiles = await listDir(dataPath);
  console.log(`  Data files: ${dataFiles.length}`);
  for (const f of dataFiles) {
    const dest = path.join(inputDir, f);
    ghBinary(`${dataPath}/${encodeURIComponent(f)}`, dest);
    console.log(`  Downloaded: ${f}`);

    const ext = path.extname(f).toLowerCase();
    if (ext === ".docx") await convertDocx(dest);
    if (ext === ".xlsx") await convertXlsx(dest);
  }

  // Download solution files
  const solPath = `harbor_tasks/${taskId}/tests/solution`;
  const solFiles = await listDir(solPath);
  console.log(`  Solution files: ${solFiles.length}`);
  for (const f of solFiles) {
    // Skip non-deliverable files
    if (["changes.md", "report.md", "solve.sh"].includes(f.toLowerCase())) continue;

    const dest = path.join(outputDir, f);
    ghBinary(`${solPath}/${encodeURIComponent(f)}`, dest);
    console.log(`  Downloaded: ${f}`);

    const ext = path.extname(f).toLowerCase();
    if (ext === ".docx") await convertDocx(dest);
    if (ext === ".xlsx") await convertXlsx(dest);
  }

  return { taskId, dataFiles, solFiles: solFiles.filter((f) => !["changes.md", "report.md", "solve.sh"].includes(f.toLowerCase())), rubric };
}

async function main() {
  console.log("Preparing task files...");
  await fs.mkdir(OUT_DIR, { recursive: true });

  const results = [];
  for (const taskId of TASKS) {
    const result = await processTask(taskId);
    results.push(result);
  }

  console.log("\n\nSummary:");
  for (const r of results) {
    console.log(`  ${r.taskId}: ${r.dataFiles.length} input, ${r.solFiles.length} output, ${r.rubric.length} rubric criteria`);
  }
  console.log("\nDone! Files written to public/tasks/");
  console.log("Now create src/data/showcaseTasks.ts with the metadata.");
}

main().catch(console.error);
