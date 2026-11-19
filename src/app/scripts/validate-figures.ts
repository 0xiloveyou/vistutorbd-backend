import { access, readFile, readdir } from "node:fs/promises";
import path from "node:path";
import {
  FigureBriefFileSchema,
  parseFigureScene,
  type FigureBrief,
} from "../utils/figure-scene";
import { LIBRARY_CONTENT_ROOT } from "../utils/library-sync";

const walk = async (dir: string): Promise<string[]> => {
  const entries = await readdir(dir, { withFileTypes: true });
  const files: string[] = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...(await walk(full)));
    else if (entry.isFile() && entry.name.endsWith(".figures.json"))
      files.push(full);
  }
  return files;
};

const validateBrief = (brief: FigureBrief) => {
  parseFigureScene(brief.scene);
  if (brief.bbox) {
    for (const value of brief.bbox) {
      if (value < 0 || value > 1)
        throw new Error(`bbox value ${value} is not normalized to 0..1`);
    }
  }
  if (!brief.scene.description.trim())
    throw new Error("scene.description is empty");
  if (brief.bbox && (brief.bbox[0] >= brief.bbox[2] || brief.bbox[1] >= brief.bbox[3]))
    throw new Error("bbox has no positive width and height");
};

const main = async () => {
  const root = path.join(LIBRARY_CONTENT_ROOT, "classes");
  let files: string[] = [];
  try {
    files = await walk(root);
  } catch {
    console.log("[figures] no chapter folders found.");
    return;
  }

  if (!files.length) {
    console.log("[figures] no figure briefs found.");
    return;
  }

  let figures = 0;
  let failed = 0;

  for (const file of files.sort()) {
    const relative = path.relative(LIBRARY_CONTENT_ROOT, file);
    try {
      const data = FigureBriefFileSchema.parse(
        JSON.parse(await readFile(file, "utf8")),
      );
      const ids = new Set<string>();
      for (const brief of data.figures) {
        if (ids.has(brief.figureId))
          throw new Error(`duplicate figureId ${brief.figureId}`);
        ids.add(brief.figureId);
        if (brief.chapterId !== data.chapter_id)
          throw new Error(
            `${brief.figureId} chapterId ${brief.chapterId} != file chapter_id ${data.chapter_id}`,
          );
        validateBrief(brief);
        if (brief.referenceImage) {
          const image = path.resolve(LIBRARY_CONTENT_ROOT, brief.referenceImage);
          if (!image.startsWith(LIBRARY_CONTENT_ROOT))
            throw new Error(`${brief.figureId} reference image escapes library root`);
          await access(image);
        }
      }
      figures += data.figures.length;
      console.log(
        `[figures] ok ${relative} (${data.figures.length} figure${data.figures.length === 1 ? "" : "s"})`,
      );
    } catch (error) {
      failed += 1;
      console.error(
        `[figures] FAIL ${relative}: ${error instanceof Error ? error.message : error}`,
      );
    }
  }

  if (failed) {
    console.error(`[figures] ${failed} file(s) invalid.`);
    process.exitCode = 1;
  } else {
    console.log(`[figures] ${files.length} file(s), ${figures} figure(s) valid.`);
  }
};

main().catch((error) => {
  console.error("[figures] failed:", error);
  process.exitCode = 1;
});
