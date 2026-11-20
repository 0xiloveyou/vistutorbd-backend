/**
 * Chapter-coverage audit (soft by default).
 *
 * A chapter lesson must teach the whole chapter: every theory section, every
 * worked example, every exercise question from the chapter's questions JSON
 * and a final answer key. See content-library/art-rules/RULES.md §1A.
 *
 * Each lesson declares what it covered in a COVERAGE manifest comment:
 *
 *   COVERAGE
 *   {"chapter":"ch-03-fractions","theory":6,"examples":2,
 *    "exerciseSets":4,"exerciseQuestions":36,"answerKey":true}
 *
 * This script compares that manifest with the markdown and questions JSON and
 * prints every gap. It never fails the build unless `--strict` is passed.
 */
import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import { GENERATED_VIZ_ROOT, LIBRARY_CONTENT_ROOT } from "../utils/library-sync";

type Manifest = {
  chapter?: string;
  theory?: number;
  examples?: number;
  exerciseSets?: number;
  exerciseQuestions?: number;
  answerKey?: boolean;
};

type QuestionFile = {
  counts?: { sets?: number; questions?: number; parts?: number };
};

const MIN_PAGES: Record<string, number> = {
  "class-3": 8,
  "class-4": 8,
  "class-5": 8,
  "class-6": 10,
  "class-7": 10,
  "class-8": 10,
  "class-9": 12,
  "class-10": 12,
  "class-11": 12,
  "class-12": 12,
};

const strict = process.argv.includes("--strict");

const walk = async (dir: string): Promise<string[]> => {
  const entries = await readdir(dir, { withFileTypes: true });
  const files: string[] = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...(await walk(full)));
    else if (entry.isFile() && entry.name.endsWith(".html")) files.push(full);
  }
  return files;
};

const readText = async (file: string) => {
  try {
    return await readFile(file, "utf8");
  } catch {
    return null;
  }
};

const parseManifest = (html: string): Manifest | null => {
  const match = html.match(/\/\*\s*COVERAGE([\s\S]*?)\*\//);
  if (!match) return null;
  try {
    return JSON.parse(match[1].trim()) as Manifest;
  } catch {
    return {};
  }
};

/** Theory sections are the headings that come before the first worked example. */
const theorySections = (md: string) => {
  const headings = [...md.matchAll(/^###\s+(.+)$/gm)].map((m) => m[1].trim());
  const firstExample = headings.findIndex((h) => /worked example/i.test(h));
  return firstExample === -1 ? headings : headings.slice(0, firstExample);
};

const workedExamples = (md: string) =>
  [...md.matchAll(/^###\s+(.+)$/gm)].filter((m) => /worked example/i.test(m[1]))
    .length;

const main = async () => {
  let files: string[];
  try {
    files = await walk(GENERATED_VIZ_ROOT);
  } catch {
    console.log("[coverage] No generated-visualizations folder yet.");
    return;
  }

  let gaps = 0;
  let checked = 0;

  for (const file of files.sort()) {
    const relative = path.relative(GENERATED_VIZ_ROOT, file);
    const [classId, name] = relative.split(path.sep);
    const base = path.basename(name, ".html");
    const chapterDir = path.join(
      LIBRARY_CONTENT_ROOT,
      "classes",
      classId,
      "chapters",
    );
    const md = await readText(path.join(chapterDir, `${base}.md`));
    const questionsRaw = await readText(
      path.join(chapterDir, `${base}.questions.json`),
    );
    const questions = questionsRaw
      ? (JSON.parse(questionsRaw) as QuestionFile)
      : null;
    const html = (await readText(file)) ?? "";
    const manifest = parseManifest(html);
    const pages = (html.match(/A\.page\(/g) ?? []).length;

    const problems: string[] = [];
    const notes: string[] = [];
    const required = Boolean(MIN_PAGES[classId]);

    if (!manifest) problems.push("no COVERAGE manifest");
    if (manifest && !manifest.chapter) problems.push("manifest has no chapter id");

    const bookTheory = md ? theorySections(md).length : 0;
    const bookExamples = md ? workedExamples(md) : 0;
    const bookSets = questions?.counts?.sets ?? 0;
    const bookQuestions = questions?.counts?.questions ?? 0;

    if (!md) problems.push(`missing source markdown for ${base}`);
    if (!questions) problems.push(`missing questions JSON for ${base}`);
    if (pages < (MIN_PAGES[classId] ?? 0))
      problems.push(`only ${pages} pages, minimum is ${MIN_PAGES[classId]}`);
    if (manifest) {
      const theory = Number(manifest.theory ?? 0);
      const examples = Number(manifest.examples ?? 0);
      if (theory < bookTheory)
        problems.push(`theory ${theory}/${bookTheory} book sections`);
      if (examples < bookExamples)
        problems.push(`examples ${examples}/${bookExamples} book examples`);
      if (Number(manifest.exerciseSets ?? 0) !== bookSets)
        problems.push(
          `exercise sets ${manifest.exerciseSets ?? 0}/${bookSets}`,
        );
      if (Number(manifest.exerciseQuestions ?? 0) !== bookQuestions)
        problems.push(
          `exercise questions ${manifest.exerciseQuestions ?? 0}/${bookQuestions}`,
        );
      if (manifest.answerKey !== true) problems.push("no answer-key page declared");
    }

    if (md && questions) {
      notes.push(
        `theory ${bookTheory} · examples ${bookExamples} · ` +
          `sets ${bookSets} · questions ${bookQuestions}`,
      );
    }

    checked += 1;

    if (!required) {
      console.log(`[coverage] ${relative} — Class 1–2, rule not required`);
      continue;
    }

    if (!problems.length) {
      console.log(`[coverage] ok ${relative} (${pages} pages)`);
      continue;
    }

    gaps += problems.length;
    console.error(`[coverage] GAP ${relative} (${pages} pages)`);
    for (const note of notes) console.error(`            source: ${note}`);
    for (const problem of problems) console.error(`            - ${problem}`);
  }

  console.log(
    `[coverage] checked ${checked} lesson(s), ${gaps} gap(s). ` +
      (strict ? "" : "Soft audit: gaps do not fail the build."),
  );

  if (strict && gaps) process.exitCode = 1;
};

main();
