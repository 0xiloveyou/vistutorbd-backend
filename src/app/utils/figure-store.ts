import { readFile } from "node:fs/promises";
import path from "node:path";
import {
  FigureBriefFileSchema,
  type FigureBrief,
  type FigureBriefFile,
} from "./figure-scene";
import { LIBRARY_CONTENT_ROOT, LIBRARY_MANIFEST } from "./library-sync";

type ManifestChapter = {
  chapterId: string;
  docs?: { md?: string };
};

type ManifestClass = {
  id: string;
  chapters?: ManifestChapter[];
};

type Manifest = {
  classes: ManifestClass[];
};

let manifestPromise: Promise<Manifest> | null = null;

const readManifest = async () => {
  manifestPromise ??= readFile(LIBRARY_MANIFEST, "utf8").then(
    (raw) => JSON.parse(raw) as Manifest,
  );
  return manifestPromise;
};

const safeSegment = (value: string) => /^[a-zA-Z0-9._-]+$/.test(value);

export const figureBriefFilePath = (classId: string, chapterBase: string) => {
  if (!safeSegment(classId) || !safeSegment(chapterBase)) {
    throw new Error("Invalid figure brief path segment.");
  }
  return path.join(
    LIBRARY_CONTENT_ROOT,
    "classes",
    classId,
    "chapters",
    "figures",
    `${chapterBase}.figures.json`,
  );
};

export const loadFigureBriefFile = async (
  classId: string,
  chapterBase: string,
): Promise<FigureBriefFile | null> => {
  try {
    const raw = await readFile(figureBriefFilePath(classId, chapterBase), "utf8");
    return FigureBriefFileSchema.parse(JSON.parse(raw));
  } catch (error) {
    if ((error as NodeJS.ErrnoException)?.code === "ENOENT") return null;
    throw error;
  }
};

export const resolveChapterLocation = async (chapterId: string) => {
  const manifest = await readManifest();
  for (const manifestClass of manifest.classes) {
    const chapter = manifestClass.chapters?.find(
      (item) => item.chapterId === chapterId,
    );
    if (!chapter) continue;
    const mdRelative =
      chapter.docs?.md ??
      `classes/${manifestClass.id}/chapters/ch-${String(0).padStart(2, "0")}.md`;
    const chapterBase = path.basename(mdRelative, path.extname(mdRelative));
    return { classId: manifestClass.id, chapterBase };
  }
  return null;
};

export const loadFiguresForChapter = async (chapterId: string) => {
  const location = await resolveChapterLocation(chapterId);
  if (!location) return [];
  const file = await loadFigureBriefFile(location.classId, location.chapterBase);
  return file?.figures ?? [];
};

export const loadFigureBrief = async (
  chapterId: string,
  figureId?: string,
): Promise<FigureBrief | null> => {
  const figures = await loadFiguresForChapter(chapterId);
  if (!figureId) return figures[0] ?? null;
  return figures.find((figure) => figure.figureId === figureId) ?? null;
};
