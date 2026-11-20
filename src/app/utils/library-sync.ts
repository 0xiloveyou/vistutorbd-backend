import { createHash } from "node:crypto";
import { access, readFile, readdir } from "node:fs/promises";
import path from "node:path";
import type { Prisma } from "@prisma/client";
import { prisma } from "../lib/prisma";

export const LIBRARY_ROOT = path.join(process.cwd(), "content-library");
export const LIBRARY_CONTENT_ROOT = path.join(
  LIBRARY_ROOT,
  "all-class-content-new",
  "Class Content Library",
);
export const LIBRARY_MANIFEST = path.join(
  LIBRARY_CONTENT_ROOT,
  "_data",
  "site-manifest.json",
);
export const GENERATED_VIZ_ROOT = path.join(
  LIBRARY_ROOT,
  "generated-visualizations",
);

type ManifestChapter = {
  no: number;
  paper?: string | null;
  titleEn: string;
  titleBn?: string;
  printedPages?: string;
  pdfPages?: string;
  ocrQuality?: string;
  chapterId: string;
  docs?: { md?: string; questions?: string; docx?: string };
  counts?: { sets?: number; questions?: number; parts?: number };
};

type ManifestClass = {
  id: string;
  label: string;
  order: number;
  band: string;
  locked?: boolean;
  chapters?: ManifestChapter[];
};

type Manifest = { classes: ManifestClass[] };

const hash = (value: string) =>
  createHash("sha256").update(value).digest("hex");

const heightReporter = `<script>
(function () {
  if (window.__libraryHeightReporter) return;
  window.__libraryHeightReporter = true;
  function report() {
    try {
      parent.postMessage(
        { type: "learn-carousel-height", height: document.documentElement.scrollHeight },
        "*",
      );
    } catch (error) {}
  }
  window.addEventListener("load", report);
  window.addEventListener("resize", report);
  setInterval(report, 600);
})();
</script>`;

const autoplayLoop = `<script>
(function () {
  if (window.__libraryAutoplayLoop) return;
  window.__libraryAutoplayLoop = true;
  var lastRestart = 0;
  function restartIfFinished() {
    if (document.hidden) return;
    var scrub = document.querySelector("#scrub");
    if (!scrub) return;
    var value = Number(scrub.value || 0);
    var max = Number(scrub.max || 1000);
    if (!Number.isFinite(value) || !Number.isFinite(max) || max <= 0) return;
    if (value < max - 2) return;
    var again = document.querySelector("#bRep");
    if (!again) return;
    var now = Date.now();
    if (now - lastRestart < 2500) return;
    lastRestart = now;
    again.click();
  }
  function boot() {
    setInterval(restartIfFinished, 1500);
    window.addEventListener("message", function (event) {
      var data = event.data || {};
      if (data.type !== "library-viz-control") return;
      var button = null;
      if (data.action === "play") button = document.querySelector("#bPlay");
      if (data.action === "next") button = document.querySelector("#bNextP");
      if (data.action === "prev") button = document.querySelector("#bPrevP");
      if (data.action === "restart") button = document.querySelector("#bRep");
      if (button) button.click();
    });
  }
  if (document.readyState === "complete") setTimeout(boot, 500);
  else window.addEventListener("load", function () { setTimeout(boot, 500); });
})();
</script>`;

const addRuntime = (html: string) => {
  let next = html;
  if (!next.includes("learn-carousel-height")) {
    next = /<\/body\s*>/i.test(next)
      ? next.replace(/<\/body\s*>/i, `${heightReporter}</body>`)
      : `${next}${heightReporter}`;
  }
  if (!next.includes("__libraryAutoplayLoop")) {
    next = /<\/body\s*>/i.test(next)
      ? next.replace(/<\/body\s*>/i, `${autoplayLoop}</body>`)
      : `${next}${autoplayLoop}`;
  }
  return next;
};

/**
 * Every generated chapter visualization must be built from the approved art
 * rules. This guard stops accidental imports of old carousels or hand-written
 * pages that do not use the Lesson Studio API.
 */
export const validateVisualizationHtml = (html: string, file: string) => {
  const pages = html.match(/A\.page\(/g)?.length ?? 0;
  const problems: string[] = [];

  if (!html.includes("const CFG")) problems.push("missing CFG block");
  if (!html.includes("function makeLesson")) problems.push("missing makeLesson");
  if (!html.includes("makeLesson(")) problems.push("does not build a lesson");
  if (!html.includes("A.say(")) problems.push("missing bilingual A.say narration");
  if (pages < 3) problems.push("needs at least 3 A.page() pages");
  if (/Hi,\s*I(?:'|’)?m/i.test(html)) problems.push("banned greeting");

  if (
    /<img\b|data:image\/|background-image\s*:|(?:src|href)\s*=\s*["'][^"']+\.(?:png|jpe?g|webp|gif)\b/i.test(
      html,
    )
  )
    problems.push("reference rasters are not allowed; draw the figure as line art");

  if (problems.length) {
    throw new Error(
      `${file} breaks the mandatory art rules: ${problems.join(", ")}.`,
    );
  }
};

const readJson = async <T>(file: string): Promise<T> =>
  JSON.parse(await readFile(file, "utf8")) as T;

const findVisualizationFile = async (
  classLevelId: string,
  mdPath: string,
  chapterId: string,
) => {
  const base = path.basename(mdPath, path.extname(mdPath));
  const directory = path.join(GENERATED_VIZ_ROOT, classLevelId);
  const names = [`${base}.html`, `${chapterId}.html`];
  const candidates = names.map((name) => path.join(directory, name));

  for (const candidate of candidates) {
    try {
      await access(candidate);
      return candidate;
    } catch {}
  }

  // Fall back to a case-insensitive match so a file saved as `CH-01-Foo.html`
  // still publishes on case-sensitive hosts (Linux/Vercel).
  try {
    const entries = await readdir(directory);
    const wanted = new Set(names.map((name) => name.toLowerCase()));
    const match = entries.find((entry) => wanted.has(entry.toLowerCase()));
    if (match) return path.join(directory, match);
  } catch {}

  return null;
};

/**
 * Atlas occasionally drops a write with a transient monitor timeout. One lost
 * write should not abort the whole seed, otherwise a newly added visualization
 * never reaches MongoDB. Retry a few times before surfacing the error.
 */
const isTransientDbError = (error: unknown) => {
  const text = error instanceof Error ? error.message : String(error);
  return (
    text.includes("server monitor timeout") ||
    text.includes("TransientTransactionError") ||
    text.includes("interrupted due to") ||
    text.includes("ECONNRESET") ||
    text.includes("ETIMEDOUT") ||
    text.includes("ReplicaSetNoPrimary")
  );
};

const withDbRetry = async <T>(
  operation: () => Promise<T>,
  attempts = 3,
  delayMs = 2_000,
): Promise<T> => {
  let lastError: unknown;

  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try {
      return await operation();
    } catch (error) {
      lastError = error;

      if (!isTransientDbError(error) || attempt === attempts) {
        throw error;
      }

      console.warn(
        `[library] Transient MongoDB error (attempt ${attempt}/${attempts}); retrying in ${
          (delayMs * attempt) / 1000
        }s.`,
      );
      await new Promise((resolve) => setTimeout(resolve, delayMs * attempt));
    }
  }

  throw lastError;
};

const upsertChapter = (args: Prisma.LibraryChapterUpsertArgs) =>
  withDbRetry(() => prisma.libraryChapter.upsert(args));

const upsertVisualization = (args: Prisma.LibraryVisualizationUpsertArgs) =>
  withDbRetry(() => prisma.libraryVisualization.upsert(args));

export type LibrarySyncResult = {
  classes: number;
  chapters: number;
  visualizations: number;
  skippedVisualizations: { file: string; reason: string }[];
};

export const syncLibraryChapters = async (): Promise<LibrarySyncResult> => {
  let manifest: Manifest;

  try {
    manifest = await readJson<Manifest>(LIBRARY_MANIFEST);
  } catch (error) {
    console.warn(
      `[library] Site manifest is not available at ${LIBRARY_MANIFEST}.`,
      error instanceof Error ? error.message : error,
    );
    return { classes: 0, chapters: 0, visualizations: 0, skippedVisualizations: [] };
  }

  const result: LibrarySyncResult = {
    classes: 0,
    chapters: 0,
    visualizations: 0,
    skippedVisualizations: [],
  };

  const activeChapterIds = new Set<string>();

  for (const manifestClass of manifest.classes ?? []) {
    result.classes += 1;
    const chapters = [...(manifestClass.chapters ?? [])].sort((a, b) => {
      const paperA = a.paper ?? "";
      const paperB = b.paper ?? "";
      return paperA.localeCompare(paperB) || a.no - b.no;
    });

    for (const [index, chapter] of chapters.entries()) {
      const mdRelative =
        chapter.docs?.md ??
        `classes/${manifestClass.id}/chapters/ch-${String(chapter.no).padStart(2, "0")}.md`;
      const mdFile = path.join(LIBRARY_CONTENT_ROOT, mdRelative);
      let md = "";

      try {
        md = await readFile(mdFile, "utf8");
      } catch {
        console.warn(`[library] Missing chapter markdown: ${mdRelative}`);
        continue;
      }

      const contentHash = hash(md);
      const visualizationFile = await findVisualizationFile(
        manifestClass.id,
        mdRelative,
        chapter.chapterId,
      );

      let visualizationSlug = "";
      let visualizationHtml = "";
      let visualizationHash = "";
      let visualizationSource = "";

      if (visualizationFile) {
        try {
          const raw = await readFile(visualizationFile, "utf8");
          validateVisualizationHtml(raw, path.relative(LIBRARY_ROOT, visualizationFile));
          visualizationHtml = addRuntime(raw);
          visualizationHash = hash(raw);
          visualizationSource = path
            .relative(LIBRARY_ROOT, visualizationFile)
            .split(path.sep)
            .join("/");
          visualizationSlug = `${manifestClass.id}.${path.basename(mdRelative, path.extname(mdRelative))}`;
        } catch (error) {
          result.skippedVisualizations.push({
            file: path.relative(LIBRARY_ROOT, visualizationFile),
            reason: error instanceof Error ? error.message : String(error),
          });
        }
      }

      activeChapterIds.add(chapter.chapterId);

      await upsertChapter({
        where: { chapterId: chapter.chapterId },
        update: {
          classLevelId: manifestClass.id,
          classBandId: manifestClass.band,
          classOrder: manifestClass.order,
          chapterNo: chapter.no,
          paper: chapter.paper ?? null,
          titleEn: chapter.titleEn,
          titleBn: chapter.titleBn ?? "",
          printedPages: chapter.printedPages ?? "",
          pdfPages: chapter.pdfPages ?? "",
          ocrQuality: chapter.ocrQuality ?? "",
          sourceMd: mdRelative,
          sourceQuestions: chapter.docs?.questions ?? "",
          setCount: chapter.counts?.sets ?? 0,
          questionCount: chapter.counts?.questions ?? 0,
          order: index,
          visualizationSlug,
          contentHash,
          isActive: true,
        },
        create: {
          chapterId: chapter.chapterId,
          classLevelId: manifestClass.id,
          classBandId: manifestClass.band,
          classOrder: manifestClass.order,
          chapterNo: chapter.no,
          paper: chapter.paper ?? null,
          titleEn: chapter.titleEn,
          titleBn: chapter.titleBn ?? "",
          printedPages: chapter.printedPages ?? "",
          pdfPages: chapter.pdfPages ?? "",
          ocrQuality: chapter.ocrQuality ?? "",
          sourceMd: mdRelative,
          sourceQuestions: chapter.docs?.questions ?? "",
          setCount: chapter.counts?.sets ?? 0,
          questionCount: chapter.counts?.questions ?? 0,
          order: index,
          visualizationSlug,
          contentHash,
        },
      });

      result.chapters += 1;

      if (visualizationSlug && visualizationHtml) {
        const title = {
          en: chapter.titleEn,
          bn: chapter.titleBn || chapter.titleEn,
        };
        const data = {
          chapterId: chapter.chapterId,
          classLevelId: manifestClass.id,
          title,
          html: visualizationHtml,
          source: visualizationSource,
          contentHash: visualizationHash,
          isActive: true,
        };

        await upsertVisualization({
          where: { slug: visualizationSlug },
          update: data,
          create: { slug: visualizationSlug, ...data },
        });
        result.visualizations += 1;
      }
    }
  }

  const stale = await withDbRetry(() =>
    prisma.libraryChapter.findMany({
      where: { chapterId: { notIn: [...activeChapterIds] } },
      select: { chapterId: true, visualizationSlug: true },
    }),
  );

  for (const chapter of stale) {
    await withDbRetry(() =>
      prisma.libraryChapter.update({
        where: { chapterId: chapter.chapterId },
        data: { isActive: false },
      }),
    );
    if (chapter.visualizationSlug) {
      await withDbRetry(() =>
        prisma.libraryVisualization.updateMany({
          where: { chapterId: chapter.chapterId },
          data: { isActive: false },
        }),
      );
    }
  }

  console.log(
    `[library] Synced ${result.chapters} chapter(s) across ${result.classes} class(es); ${result.visualizations} visualization(s) linked.`,
  );

  for (const skipped of result.skippedVisualizations) {
    console.warn(`[library] Skipped ${skipped.file}: ${skipped.reason}`);
  }

  return result;
};

export const libraryArtRulesPath = path.join(LIBRARY_ROOT, "art-rules");
export const libraryExamplePath = path.join(libraryArtRulesPath, "Example.html");
export const libraryRulesPath = path.join(libraryArtRulesPath, "RULES.md");
export const libraryContentPath = LIBRARY_CONTENT_ROOT;
export const libraryManifestPath = LIBRARY_MANIFEST;
export const libraryGeneratedPath = GENERATED_VIZ_ROOT;
