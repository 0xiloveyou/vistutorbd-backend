import { access, mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import mupdf from "mupdf";

type Args = {
  classId?: string;
  chapter?: string;
  force: boolean;
  dryRun: boolean;
  zoom: number;
  quality: number;
  limit?: number;
};

const CONTENT_LIBRARY =
  process.env.CONTENT_ROOT ??
  path.resolve(process.cwd(), "content-library/all-class-content-new");
const LIBRARY = path.join(CONTENT_LIBRARY, "Class Content Library");
const PDF_DIR = path.join(CONTENT_LIBRARY, "Play to class 12");
const FRONTMATTER = /^---\r?\n([\s\S]*?)\r?\n---/;

const parseArgs = (): Args => {
  const args: Args = {
    force: false,
    dryRun: false,
    zoom: 2,
    quality: 72,
  };
  const argv = process.argv.slice(2);
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--class") args.classId = argv[++i];
    else if (arg === "--chapter") args.chapter = argv[++i];
    else if (arg === "--force") args.force = true;
    else if (arg === "--dry-run") args.dryRun = true;
    else if (arg === "--zoom") args.zoom = Number(argv[++i]);
    else if (arg === "--quality") args.quality = Number(argv[++i]);
    else if (arg === "--limit") args.limit = Number(argv[++i]);
    else if (arg === "--help" || arg === "-h") {
      console.log(
        "Usage: bun src/app/scripts/export-figures-pages.ts [--class class-8] [--chapter ch-08-quadrilateral] [--force] [--dry-run] [--zoom 2] [--quality 72] [--limit 20]",
      );
      process.exit(0);
    } else {
      throw new Error(`Unknown argument: ${arg}`);
    }
  }
  return args;
};

const frontmatter = (text: string) => {
  const match = text.match(FRONTMATTER);
  if (!match) return new Map<string, string>();
  const map = new Map<string, string>();
  for (const line of match[1].split(/\r?\n/)) {
    const pair = line.match(/^([a-zA-Z0-9_]+):\s*"?(.*?)"?\s*$/);
    if (pair) map.set(pair[1], pair[2]);
  }
  return map;
};

const chapterTargets = async (args: Args) => {
  const classesRoot = path.join(LIBRARY, "classes");
  const classDirs = (await readdir(classesRoot, { withFileTypes: true }))
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .filter((name) => !args.classId || name === args.classId)
    .sort();

  const targets: { classId: string; chapterBase: string; md: string }[] = [];
  for (const classId of classDirs) {
    const chaptersDir = path.join(classesRoot, classId, "chapters");
    try {
      await access(chaptersDir);
    } catch {
      continue;
    }
    for (const file of (await readdir(chaptersDir))
      .filter((name) => name.endsWith(".md"))
      .sort()) {
      const chapterBase = path.basename(file, ".md");
      if (
        args.chapter &&
        chapterBase !== args.chapter &&
        !chapterBase.includes(args.chapter)
      ) {
        continue;
      }
      targets.push({
        classId,
        chapterBase,
        md: path.join(chaptersDir, file),
      });
    }
  }
  return targets;
};

const main = async () => {
  const args = parseArgs();
  const targets = await chapterTargets(args);
  let rendered = 0;
  let planned = 0;
  let skipped = 0;

  for (const target of targets) {
    if (args.limit && rendered + planned >= args.limit) break;
    const text = await readFile(target.md, "utf8");
    const meta = frontmatter(text);
    const pdfName = meta.get("source_pdf");
    const range = meta.get("pdf_pages")?.match(/^(\d+)-(\d+)$/);
    if (!pdfName || !range) {
      console.warn(`[pages] skip ${target.classId}/${target.chapterBase}: no pdf_pages`);
      continue;
    }

    const first = Number(range[1]);
    const last = Number(range[2]);
    const pdfPath = path.join(PDF_DIR, pdfName);
    try {
      await access(pdfPath);
    } catch {
      console.warn(`[pages] missing PDF ${pdfName}`);
      continue;
    }

    const out = path.join(
      path.dirname(target.md),
      "pages",
      target.chapterBase,
    );
    if (!args.dryRun) await mkdir(out, { recursive: true });

    const doc = mupdf.Document.openDocument(pdfPath);
    const count = doc.countPages();
    const end = Math.min(last, count);
    console.log(
      `[pages] ${target.classId}/${target.chapterBase} pdf ${first}-${last} (doc ${count})`,
    );

    for (let pageNo = first; pageNo <= end; pageNo += 1) {
      if (args.limit && rendered + planned >= args.limit) break;
      const file = path.join(out, `page-${pageNo.toString().padStart(3, "0")}.jpg`);
      if (!args.force) {
        try {
          await access(file);
          skipped += 1;
          continue;
        } catch {}
      }
      if (args.dryRun) {
        planned += 1;
        console.log(`[pages] would render ${file}`);
        continue;
      }
      const page = doc.loadPage(pageNo - 1);
      const pixmap = page.toPixmap(
        mupdf.Matrix.scale(args.zoom, args.zoom),
        mupdf.ColorSpace.DeviceRGB,
      );
      await writeFile(file, pixmap.asJPEG(args.quality));
      rendered += 1;
    }
    doc.destroy?.();
    if (args.limit && rendered + planned >= args.limit) break;
  }

  console.log(
    `[pages] written=${rendered} planned=${planned} skipped=${skipped} dryRun=${args.dryRun}`,
  );
};

main().catch((error) => {
  console.error("[pages] failed:", error);
  process.exitCode = 1;
});
