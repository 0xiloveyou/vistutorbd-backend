import { createHash } from "node:crypto";
import { access, mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import z from "zod";
import { visionCompletion } from "../lib/openrouter";
import {
  FigureBriefFileSchema,
  FigureBriefSchema,
  FigureSceneSchema,
  parseFigureScene,
  type FigureBrief,
  type FigureBriefFile,
  type FigureScene,
} from "../utils/figure-scene";
import { LIBRARY_CONTENT_ROOT } from "../utils/library-sync";

type Args = {
  classId?: string;
  chapter?: string;
  pages?: Set<number>;
  force: boolean;
  dryRun: boolean;
  limit?: number;
  link: boolean;
  retries: number;
};

const FRONTMATTER = /^---\r?\n([\s\S]*?)\r?\n---/;

const parseArgs = (): Args => {
  const args: Args = {
    force: false,
    dryRun: false,
    link: false,
    retries: 2,
  };
  const argv = process.argv.slice(2);
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--class") args.classId = argv[++i];
    else if (arg === "--chapter") args.chapter = argv[++i];
    else if (arg === "--page")
      args.pages = new Set(
        (argv[++i] ?? "")
          .split(",")
          .map((value) => Number(value.trim()))
          .filter((value) => Number.isInteger(value) && value > 0),
      );
    else if (arg === "--force") args.force = true;
    else if (arg === "--dry-run") args.dryRun = true;
    else if (arg === "--link") args.link = true;
    else if (arg === "--limit") args.limit = Number(argv[++i]);
    else if (arg === "--retries")
      args.retries = Math.max(0, Number(argv[++i]) || 0);
    else if (arg === "--help" || arg === "-h") {
      console.log(
        "Usage: bun src/app/scripts/extract-figures.ts [--class class-8] [--chapter ch-08-quadrilateral] [--page 156,157] [--force] [--dry-run] [--limit 5] [--retries 2] [--link]",
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

const parseJsonObject = (raw: string) => {
  const fenced = raw.match(/```(?:json)?\s*([\s\S]*?)```/i);
  const text = fenced?.[1] ?? raw;
  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");
  if (start < 0 || end <= start) throw new Error("Vision response has no JSON object.");
  return JSON.parse(text.slice(start, end + 1)) as unknown;
};

const scaleScene = (scene: FigureScene) => {
  const xs: number[] = scene.points.map((point) => point.x);
  const ys: number[] = scene.points.map((point) => point.y);

  for (const element of scene.elements) {
    if (element.type === "label") {
      xs.push(element.x);
      ys.push(element.y);
    } else if (element.type === "polyline") {
      for (const [x, y] of element.coordinates) {
        xs.push(x);
        ys.push(y);
      }
    } else if (element.type === "circle") {
      const center = scene.points.find((point) => point.id === element.center);
      if (center) {
        xs.push(center.x - element.radius, center.x + element.radius);
        ys.push(center.y - element.radius, center.y + element.radius);
      }
    }
  }

  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);

  const marginX = scene.width * 0.06;
  const marginY = scene.height * 0.06;
  const availableW = scene.width - marginX * 2;
  const availableH = scene.height - marginY * 2;
  const contentW = Math.max(maxX - minX, 1);
  const contentH = Math.max(maxY - minY, 1);
  const scale = Math.min(availableW / contentW, availableH / contentH);
  const offsetX = marginX + (availableW - contentW * scale) / 2 - minX * scale;
  const offsetY = marginY + (availableH - contentH * scale) / 2 - minY * scale;
  const mapPoint = (x: number, y: number): [number, number] => [
    offsetX + x * scale,
    offsetY + y * scale,
  ];

  return {
    ...scene,
    points: scene.points.map((point) => {
      const [x, y] = mapPoint(point.x, point.y);
      return { ...point, x, y };
    }),
    elements: scene.elements.map((element) => {
      switch (element.type) {
        case "circle":
          return { ...element, radius: element.radius * scale };
        case "dimension":
          return { ...element, offset: element.offset ? element.offset * scale : undefined };
        case "label": {
          const [x, y] = mapPoint(element.x, element.y);
          return { ...element, x, y };
        }
        case "polyline":
          return {
            ...element,
            coordinates: element.coordinates.map(
              ([x, y]) => mapPoint(x, y) as [number, number],
            ),
          };
        default:
          return element;
      }
    }),
  };
};

const augmentRightAngles = (scene: FigureScene) => {
  const existing = new Set(
    scene.elements
      .filter((element) => element.type === "right-angle")
      .map((element) => element.vertex),
  );
  const neighbors = new Map<string, Set<string>>();
  const connect = (a: string, b: string) => {
    const set = neighbors.get(a) ?? new Set<string>();
    set.add(b);
    neighbors.set(a, set);
  };

  for (const element of scene.elements) {
    if (element.type === "line") {
      connect(element.from, element.to);
      connect(element.to, element.from);
    } else if (element.type === "polygon") {
      for (let i = 0; i < element.points.length; i += 1) {
        const a = element.points[i];
        const b = element.points[(i + 1) % element.points.length];
        connect(a, b);
        connect(b, a);
      }
    }
  }

  const text = [
    scene.description,
    ...scene.givens,
    ...scene.unknowns,
    scene.transcription,
  ].join(" ");
  const candidates = new Set<string>();
  for (const match of text.matchAll(
    /right[-\s]?angle(?:d)?[^.]{0,60}?\bat\s+([A-Z][A-Za-z0-9]*)/gi,
  )) {
    candidates.add(match[1]);
  }
  for (const match of text.matchAll(
    /\b([A-Z])([A-Z])([A-Z])\s+is\s+a\s+right\s+angle/gi,
  )) {
    candidates.add(match[2]);
  }
  for (const match of text.matchAll(
    /\b([A-Z])([A-Z])([A-Z])\s*=\s*90\b/gi,
  )) {
    candidates.add(match[2]);
  }

  for (const vertex of candidates) {
    if (existing.has(vertex)) continue;
    if (!scene.points.some((point) => point.id === vertex)) continue;
    const adjacent = [...(neighbors.get(vertex) ?? [])].filter(
      (point) => point !== vertex,
    );
    if (adjacent.length < 2) continue;
    scene.elements.push({
      type: "right-angle",
      vertex,
      from: adjacent[0],
      to: adjacent[1],
    });
    existing.add(vertex);
  }

  return scene;
};

const NON_MATH_FIGURE =
  /\b(pair of compasses|compasses|protractor|photograph|decorative|cartoon|logo|watermark)\b/i;

const MATH_TERM =
  /\b(circle|triangle|quadrilateral|angle|chord|diameter|radius|arc|graph|axis|axes|parallelogram|rhombus|rectangle|square|trapezium|polygon)\b/i;

const isMathFigure = (scene: FigureScene) => {
  if (!NON_MATH_FIGURE.test(`${scene.description} ${scene.transcription}`)) {
    return true;
  }
  const hasMathElement = scene.elements.some(
    (element) =>
      element.type !== "line" &&
      element.type !== "label" &&
      element.type !== "polyline",
  );
  return hasMathElement && MATH_TERM.test(scene.description);
};

const extractPrompt = `You are a precise textbook figure extractor for a math learning platform.

Look at the page image and extract EVERY mathematical figure or diagram that a student would need in order to solve or understand a question. Ignore decorative art, photos, page borders and handwriting that is not part of a figure.

Return ONLY one JSON object, with no markdown, no explanation:
{
  "figures": [
    {
      "bbox": [x0, y0, x1, y1],
      "confidence": 0.0,
      "scene": {
        "kind": "geometry | graph | number-line | diagram | table | other",
        "width": 800,
        "height": 480,
        "points": [
          {"id": "A", "x": 120, "y": 80, "label": "A", "role": "given"}
        ],
        "elements": [
          {"type": "line", "from": "A", "to": "B", "style": "solid", "marks": {"equal": 1}},
          {"type": "polygon", "points": ["A", "B", "C"], "style": "solid"},
          {"type": "circle", "center": "O", "radius": 60, "style": "solid"},
          {"type": "arc", "center": "O", "from": "A", "to": "B"},
          {"type": "angle", "vertex": "B", "from": "A", "to": "C", "label": "40°", "marks": 1},
          {"type": "right-angle", "vertex": "C", "from": "A", "to": "B"},
          {"type": "dimension", "from": "A", "to": "B", "label": "6 cm"},
          {"type": "label", "x": 200, "y": 200, "text": "text printed in the figure"},
          {"type": "axes", "origin": "O", "xLabel": "x", "yLabel": "y"},
          {"type": "polyline", "coordinates": [[0, 100], [100, 50], [200, 120]], "label": "curve"}
        ],
        "givens": ["AB = 6 cm", "angle ABC = 40°"],
        "unknowns": ["BC"],
        "transcription": "all printed labels and numbers exactly as seen",
        "description": "one clear paragraph describing the figure and every visible mark"
      }
    }
  ]
}

Rules:
1. Coordinates must be inside the 800x480 scene canvas. Preserve the figure's true shape and relative positions. Do not stretch.
2. Every point referenced by an element must exist in "points". Use short ids such as A, B, C, O, P1.
3. Draw only what is visible. Never invent a length, angle, parallel mark, right angle or point that is not printed or marked. If a value is unknown, put it in "unknowns".
4. Capture equal-length tick marks, parallel arrows, right-angle squares, arcs, angle labels, dimension labels, dashed construction lines and axes.
5. For a graph or curve, use "polyline" with sampled coordinates; do not guess the equation.
6. If the page has no mathematical figure, return {"figures":[]}.
7. bbox is normalized to the page image: [left, top, right, bottom], each between 0 and 1.
8. Confidence is your honest 0-1 estimate for the whole figure.
9. The description must let a text-only model solve the question without seeing the image: state shape, labels, given values, right/parallel/equal marks and what is unknown.`;

const KNOWN_ROLES = new Set(["given", "derived", "construction", "unknown"]);
const KNOWN_STYLES = new Set(["solid", "dashed", "dotted"]);
const KNOWN_ELEMENT_TYPES = new Set([
  "line",
  "polygon",
  "circle",
  "arc",
  "angle",
  "right-angle",
  "dimension",
  "label",
  "axes",
  "polyline",
]);

const sanitizeScene = (raw: unknown) => {
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) return raw;
  const scene = { ...(raw as Record<string, unknown>) };

  if (Array.isArray(scene.points)) {
    scene.points = scene.points.map((point) => {
      if (!point || typeof point !== "object") return point;
      const next = { ...(point as Record<string, unknown>) };
      if (!KNOWN_ROLES.has(String(next.role))) delete next.role;
      return next;
    });
  }

  if (Array.isArray(scene.elements)) {
    scene.elements = scene.elements.flatMap((element) => {
      if (!element || typeof element !== "object") return [];
      const next = { ...(element as Record<string, unknown>) };
      if (!KNOWN_ELEMENT_TYPES.has(String(next.type))) return [];
      if ("style" in next && !KNOWN_STYLES.has(String(next.style))) {
        delete next.style;
      }
      if (next.marks && typeof next.marks === "object") {
        const marks = { ...(next.marks as Record<string, unknown>) };
        for (const key of ["equal", "parallel"] as const) {
          const value = Number(marks[key]);
          if (!Number.isInteger(value) || value < 1 || value > 3) {
            delete marks[key];
          } else {
            marks[key] = value;
          }
        }
        if (Object.keys(marks).length) next.marks = marks;
        else delete next.marks;
      }
      if (next.type === "angle" && next.marks !== undefined) {
        const value = Number(next.marks);
        if (!Number.isInteger(value) || value < 0 || value > 4) {
          delete next.marks;
        } else {
          next.marks = value;
        }
      }
      return [next];
    });
  }

  return scene;
};

const extractSchema = z.object({
  figures: z
    .array(
      z.object({
        bbox: z.tuple([z.number(), z.number(), z.number(), z.number()]).optional(),
        confidence: z.number().min(0).max(1).optional(),
        scene: z.unknown(),
      }),
    )
    .default([]),
});

const imageDataUrl = (buffer: Buffer) =>
  `data:image/jpeg;base64,${buffer.toString("base64")}`;

const jpegSize = (buffer: Buffer) => {
  let offset = 2;
  while (offset + 9 < buffer.length) {
    if (buffer[offset] !== 0xff) {
      offset += 1;
      continue;
    }
    const marker = buffer[offset + 1];
    if (marker === 0xd8 || marker === 0xd9 || (marker >= 0xd0 && marker <= 0xd7)) {
      offset += 2;
      continue;
    }
    const length = buffer.readUInt16BE(offset + 2);
    const isStartOfFrame =
      (marker >= 0xc0 && marker <= 0xc3) ||
      (marker >= 0xc5 && marker <= 0xc7) ||
      (marker >= 0xc9 && marker <= 0xcb) ||
      (marker >= 0xcd && marker <= 0xcf);
    if (isStartOfFrame) {
      return {
        width: buffer.readUInt16BE(offset + 7),
        height: buffer.readUInt16BE(offset + 5),
      };
    }
    offset += 2 + length;
  }
  return null;
};

const normalizeBbox = (
  bbox: [number, number, number, number] | undefined,
  size: { width: number; height: number } | null,
) => {
  if (!bbox) return undefined;
  const [x0, y0, third, fourth] = bbox;
  const x1 = third <= x0 ? x0 + third : third;
  const y1 = fourth <= y0 ? y0 + fourth : fourth;
  if (Math.max(Math.abs(x0), Math.abs(y0), Math.abs(x1), Math.abs(y1)) <= 1.5) {
    if (x0 < 0 || y0 < 0 || x1 > 1 || y1 > 1 || x1 <= x0 || y1 <= y0)
      return undefined;
    return [x0, y0, x1, y1] as [number, number, number, number];
  }
  if (!size) return undefined;
  if (
    x0 < 0 ||
    y0 < 0 ||
    x1 > size.width ||
    y1 > size.height ||
    x1 <= x0 ||
    y1 <= y0
  )
    return undefined;
  return [
    x0 / size.width,
    y0 / size.height,
    x1 / size.width,
    y1 / size.height,
  ] as [number, number, number, number];
};

const writeJson = async (file: string, value: unknown) => {
  await mkdir(path.dirname(file), { recursive: true });
  await writeFile(file, `${JSON.stringify(value, null, 2)}\n`, "utf8");
};

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const isRateLimit = (error: unknown) =>
  /rate limit|free-models-per-day|too many requests|\b429\b/i.test(
    error instanceof Error ? error.message : String(error),
  );

const visionWithRetry = async (
  options: { prompt: string; imageDataUrl: string; temperature: number },
  retries: number,
) => {
  let lastError: unknown;
  for (let attempt = 0; attempt <= retries; attempt += 1) {
    try {
      return await visionCompletion(options);
    } catch (error) {
      lastError = error;
      if (isRateLimit(error)) throw error;
      if (attempt < retries) await sleep(3_000 * (attempt + 1));
    }
  }
  throw lastError;
};

const chapterPaths = async (args: Args) => {
  const classesRoot = path.join(LIBRARY_CONTENT_ROOT, "classes");
  const classDirs = (await readdir(classesRoot, { withFileTypes: true }))
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .filter((name) => !args.classId || name === args.classId)
    .sort();

  const paths: { classId: string; chapterBase: string; md: string }[] = [];
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
      if (args.chapter && chapterBase !== args.chapter && !chapterBase.includes(args.chapter)) continue;
      paths.push({
        classId,
        chapterBase,
        md: path.join(chaptersDir, file),
      });
    }
  }
  return paths;
};

const mergeFigures = (
  previous: FigureBrief[],
  page: number,
  next: FigureBrief[],
) => {
  const kept = previous.filter((figure) => figure.page !== page);
  return [...kept, ...next].sort(
    (a, b) => a.page - b.page || a.figureId.localeCompare(b.figureId),
  );
};

const main = async () => {
  const args = parseArgs();
  const targets = await chapterPaths(args);
  let processedPages = 0;
  let createdFigures = 0;
  let skipped = 0;

  for (const target of targets) {
    if (args.limit && processedPages >= args.limit) break;
    const text = await readFile(target.md, "utf8");
    const meta = frontmatter(text);
    const chapterId = meta.get("chapter_id");
    if (!chapterId) {
      console.warn(`[figures] skip ${target.md}: missing chapter_id`);
      continue;
    }

    const imageDir = path.join(
      path.dirname(target.md),
      "pages",
      target.chapterBase,
    );
    let images: string[];
    try {
      images = (await readdir(imageDir))
        .filter((name) => /^page-\d+\.(?:jpe?g|png|webp)$/i.test(name))
        .sort();
    } catch {
      continue;
    }
    if (!images.length) continue;

    const briefPath = path.join(
      path.dirname(target.md),
      "figures",
      `${target.chapterBase}.figures.json`,
    );
    let briefFile: FigureBriefFile = {
      chapter_id: chapterId,
      class_id: target.classId,
      book_slug: meta.get("book_slug") ?? "",
      pdf_pages: meta.get("pdf_pages") ?? "",
      generated_at: new Date().toISOString(),
      processed_pages: [],
      figures: [],
    };
    let existingText: string | undefined;
    try {
      existingText = await readFile(briefPath, "utf8");
    } catch {}
    if (existingText) {
      try {
        const existing = FigureBriefFileSchema.parse(JSON.parse(existingText));
        briefFile = {
          ...existing,
          ...briefFile,
          processed_pages: existing.processed_pages,
          figures: existing.figures,
        };
      } catch (error) {
        throw new Error(
          `Existing figure brief is invalid at ${briefPath}: ${
            error instanceof Error ? error.message : error
          }`,
        );
      }
    }

    for (const imageName of images) {
      if (args.limit && processedPages >= args.limit) break;
      const page = Number((imageName.match(/page-(\d+)/) ?? [])[1]);
      if (!Number.isInteger(page)) continue;
      if (args.pages && !args.pages.has(page)) continue;
      if (
        !args.force &&
        (briefFile.processed_pages.includes(page) ||
          briefFile.figures.some((figure) => figure.page === page))
      ) {
        skipped += 1;
        continue;
      }

      const imageFile = path.join(imageDir, imageName);
      processedPages += 1;
      console.log(
        `[figures] ${target.classId}/${target.chapterBase} page ${page}`,
      );

      let parsed: z.infer<typeof extractSchema>;
      const imageBuffer = await readFile(imageFile);
      try {
        const raw = await visionWithRetry(
          {
            prompt: extractPrompt,
            imageDataUrl: imageDataUrl(imageBuffer),
            temperature: 0,
          },
          args.retries,
        );
        parsed = extractSchema.parse(parseJsonObject(raw));
      } catch (error) {
        console.error(
          `[figures] vision failed ${target.classId}/${target.chapterBase} p${page}:`,
          error instanceof Error ? error.message : error,
        );
        skipped += 1;
        if (isRateLimit(error)) {
          console.error(
            "[figures] daily vision quota exhausted; stopping. Rendered pages and processed briefs are saved.",
          );
          throw error;
        }
        continue;
      }

      const hash = createHash("sha256").update(imageBuffer).digest("hex");
      const size = jpegSize(imageBuffer);
      const next: FigureBrief[] = [];
      for (const [index, item] of parsed.figures.entries()) {
        try {
          const scene = parseFigureScene(
            augmentRightAngles(
              scaleScene(FigureSceneSchema.parse(sanitizeScene(item.scene))),
            ),
          );
          if (!isMathFigure(scene)) {
            console.warn(
              `[figures] skip non-math illustration ${target.classId}/${target.chapterBase} p${page} f${index + 1}`,
            );
            continue;
          }
          next.push(
            FigureBriefSchema.parse({
              figureId: `${chapterId}.p${page}.f${index + 1}`,
              chapterId,
              classId: target.classId,
              page,
              bbox: normalizeBbox(item.bbox, size),
              confidence: item.confidence ?? 0.5,
              referenceImage: path
                .relative(LIBRARY_CONTENT_ROOT, imageFile)
                .split(path.sep)
                .join("/"),
              imageHash: hash,
              generatedAt: new Date().toISOString(),
              scene,
            }),
          );
        } catch (error) {
          console.error(
            `[figures] invalid scene ${target.classId}/${target.chapterBase} p${page} f${index + 1}:`,
            error instanceof Error ? error.message : error,
          );
        }
      }

      if (next.length) {
        createdFigures += next.length;
        briefFile.figures = mergeFigures(briefFile.figures, page, next);
      } else {
        briefFile.figures = mergeFigures(briefFile.figures, page, []);
      }
      if (!parsed.figures.length || next.length) {
        briefFile.processed_pages = [
          ...new Set([...briefFile.processed_pages, page]),
        ].sort((a, b) => a - b);
      }

      if (!args.dryRun) {
        briefFile.generated_at = new Date().toISOString();
        await writeJson(briefPath, briefFile);
      }

      if (args.link) {
        const questionsFile = target.md.replace(/\.md$/, ".questions.json");
        try {
          const questions = JSON.parse(await readFile(questionsFile, "utf8")) as {
            sets?: { questions?: { page?: number; text?: string; parts?: { text?: string }[]; figureIds?: string[] }[] }[];
          };
          const ids = next.map((figure) => figure.figureId);
          let changed = false;
          for (const set of questions.sets ?? []) {
            for (const question of set.questions ?? []) {
              if (question.page !== page) continue;
              const body = [question.text ?? "", ...(question.parts ?? []).map((part) => part.text ?? "")].join(" ");
              if (!/\b(figure|diagram|adjacent|shown|picture|graph|draw|construct)\b/i.test(body)) continue;
              const merged = [...new Set([...(question.figureIds ?? []), ...ids])];
              if (merged.length !== (question.figureIds ?? []).length) {
                question.figureIds = merged;
                changed = true;
              }
            }
          }
          if (changed && !args.dryRun)
            await writeJson(questionsFile, questions);
        } catch {}
      }
    }

  }

  console.log(
    `[figures] pages=${processedPages} newFigures=${createdFigures} skipped=${skipped} dryRun=${args.dryRun}`,
  );
};

main().catch((error) => {
  console.error("[figures] failed:", error);
  process.exitCode = 1;
});
