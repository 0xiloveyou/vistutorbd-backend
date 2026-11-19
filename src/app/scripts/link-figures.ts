import { access, readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { FigureBriefFileSchema } from "../utils/figure-scene";

type Args = {
  classId?: string;
  chapter?: string;
  dryRun: boolean;
};

type Question = {
  page?: number;
  text?: string;
  parts?: { text?: string }[];
  figureIds?: string[];
};

type QuestionFile = {
  sets?: { questions?: Question[] }[];
};

const LIBRARY =
  process.env.CONTENT_LIBRARY_ROOT ??
  path.resolve(
    process.cwd(),
    "content-library/all-class-content-new/Class Content Library",
  );

const FIGURE_WORDS =
  /\b(figure|diagram|adjacent|shown|picture|graph|draw|construct|quadrilateral|triangle|circle|angle|parallel|perpendicular|midpoint|median|bisector|parallelogram|rhombus|rectangle|square|trapezium)\b/i;

const parseArgs = (): Args => {
  const args: Args = { dryRun: false };
  const argv = process.argv.slice(2);
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--class") args.classId = argv[++i];
    else if (arg === "--chapter") args.chapter = argv[++i];
    else if (arg === "--dry-run") args.dryRun = true;
    else if (arg === "--help" || arg === "-h") {
      console.log(
        "Usage: bun src/app/scripts/link-figures.ts [--class class-8] [--chapter ch-08-quadrilateral] [--dry-run]",
      );
      process.exit(0);
    } else {
      throw new Error(`Unknown argument: ${arg}`);
    }
  }
  return args;
};

const chapterDirs = async (args: Args) => {
  const classesRoot = path.join(LIBRARY, "classes");
  const classDirs = (await readdir(classesRoot, { withFileTypes: true }))
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .filter((name) => !args.classId || name === args.classId)
    .sort();

  const dirs: { classId: string; chaptersDir: string }[] = [];
  for (const classId of classDirs) {
    const chaptersDir = path.join(classesRoot, classId, "chapters");
    try {
      await access(chaptersDir);
    } catch {
      continue;
    }
    dirs.push({ classId, chaptersDir });
  }
  return dirs;
};

const main = async () => {
  const args = parseArgs();
  let files = 0;
  let questions = 0;

  for (const { classId, chaptersDir } of await chapterDirs(args)) {
    for (const name of (await readdir(chaptersDir)).sort()) {
      if (!name.endsWith(".questions.json")) continue;
      const chapterBase = path.basename(name, ".questions.json");
      if (
        args.chapter &&
        chapterBase !== args.chapter &&
        !chapterBase.includes(args.chapter)
      ) {
        continue;
      }

      const briefPath = path.join(
        chaptersDir,
        "figures",
        `${chapterBase}.figures.json`,
      );
      let byPage: Map<number, string[]>;
      try {
        const brief = FigureBriefFileSchema.parse(
          JSON.parse(await readFile(briefPath, "utf8")),
        );
        byPage = new Map();
        for (const figure of brief.figures) {
          const ids = byPage.get(figure.page) ?? [];
          ids.push(figure.figureId);
          byPage.set(figure.page, ids);
        }
      } catch {
        continue;
      }
      if (!byPage.size) continue;

      const questionsPath = path.join(chaptersDir, name);
      const data = JSON.parse(await readFile(questionsPath, "utf8")) as QuestionFile;
      let changed = false;

      for (const set of data.sets ?? []) {
        for (const question of set.questions ?? []) {
          if (!question.page) continue;
          const pageFigures = byPage.get(question.page);
          if (!pageFigures?.length) continue;
          const body = [
            question.text ?? "",
            ...(question.parts ?? []).map((part) => part.text ?? ""),
          ].join(" ");
          if (!FIGURE_WORDS.test(body)) continue;

          const merged = [
            ...new Set([...(question.figureIds ?? []), ...pageFigures]),
          ];
          if (merged.length !== (question.figureIds ?? []).length) {
            question.figureIds = merged;
            changed = true;
            questions += 1;
          }
        }
      }

      if (changed) {
        files += 1;
        console.log(`[link] updated ${classId}/${chapterBase}`);
        if (!args.dryRun) {
          await writeFile(
            questionsPath,
            `${JSON.stringify(data, null, 2)}\n`,
            "utf8",
          );
        }
      }
    }
  }

  console.log(
    `[link] files=${files} questions=${questions} dryRun=${args.dryRun}`,
  );
};

main().catch((error) => {
  console.error("[link] failed:", error);
  process.exitCode = 1;
});
