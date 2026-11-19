import z from "zod";

const roleSchema = z.enum(["given", "derived", "construction", "unknown"]).optional();
const strokeSchema = z.enum(["solid", "dashed", "dotted"]).optional();
const markSchema = z
  .object({
    equal: z.number().int().min(1).max(3).optional(),
    parallel: z.number().int().min(1).max(3).optional(),
  })
  .optional();

export const FigurePointSchema = z.object({
  id: z.string().trim().min(1).max(24),
  x: z.number().finite(),
  y: z.number().finite(),
  label: z.string().max(80).optional(),
  role: roleSchema,
});

const lineSchema = z.object({
  type: z.literal("line"),
  from: z.string().min(1),
  to: z.string().min(1),
  style: strokeSchema,
  marks: markSchema,
  role: roleSchema,
});

const polygonSchema = z.object({
  type: z.literal("polygon"),
  points: z.array(z.string().min(1)).min(3),
  style: strokeSchema,
  role: roleSchema,
});

const circleSchema = z.object({
  type: z.literal("circle"),
  center: z.string().min(1),
  radius: z.number().positive(),
  style: strokeSchema,
  role: roleSchema,
});

const arcSchema = z.object({
  type: z.literal("arc"),
  center: z.string().min(1),
  from: z.string().min(1),
  to: z.string().min(1),
  clockwise: z.boolean().optional(),
  style: strokeSchema,
  role: roleSchema,
});

const angleSchema = z.object({
  type: z.literal("angle"),
  vertex: z.string().min(1),
  from: z.string().min(1),
  to: z.string().min(1),
  label: z.string().max(40).optional(),
  marks: z.number().int().min(0).max(4).optional(),
  role: roleSchema,
});

const rightAngleSchema = z.object({
  type: z.literal("right-angle"),
  vertex: z.string().min(1),
  from: z.string().min(1),
  to: z.string().min(1),
  role: roleSchema,
});

const dimensionSchema = z.object({
  type: z.literal("dimension"),
  from: z.string().min(1),
  to: z.string().min(1),
  label: z.string().min(1).max(40),
  offset: z.number().finite().optional(),
  role: roleSchema,
});

const labelSchema = z.object({
  type: z.literal("label"),
  x: z.number().finite(),
  y: z.number().finite(),
  text: z.string().min(1).max(160),
  anchor: z.enum(["start", "middle", "end"]).optional(),
  role: roleSchema,
});

const axesSchema = z.object({
  type: z.literal("axes"),
  origin: z.string().min(1),
  xLabel: z.string().max(40).optional(),
  yLabel: z.string().max(40).optional(),
  role: roleSchema,
});

const polylineSchema = z.object({
  type: z.literal("polyline"),
  coordinates: z.array(z.tuple([z.number().finite(), z.number().finite()])).min(2),
  style: strokeSchema,
  label: z.string().max(80).optional(),
  role: roleSchema,
});

export const FigureElementSchema = z.discriminatedUnion("type", [
  lineSchema,
  polygonSchema,
  circleSchema,
  arcSchema,
  angleSchema,
  rightAngleSchema,
  dimensionSchema,
  labelSchema,
  axesSchema,
  polylineSchema,
]);

export const FigureSceneSchema = z.object({
  kind: z
    .enum(["geometry", "graph", "number-line", "diagram", "table", "other"])
    .default("geometry"),
  width: z.number().positive().max(2400).default(800),
  height: z.number().positive().max(2400).default(480),
  points: z.array(FigurePointSchema).min(1),
  elements: z.array(FigureElementSchema).default([]),
  givens: z.array(z.string().max(240)).default([]),
  unknowns: z.array(z.string().max(240)).default([]),
  description: z.string().max(4000).default(""),
  transcription: z.string().max(4000).default(""),
});

export const FigureBriefSchema = z.object({
  figureId: z.string().trim().min(3).max(120),
  chapterId: z.string().trim().min(3).max(80),
  classId: z.string().trim().max(40).optional(),
  page: z.number().int().positive(),
  printedPage: z.number().int().positive().optional(),
  bbox: z.tuple([z.number(), z.number(), z.number(), z.number()]).optional(),
  confidence: z.number().min(0).max(1).default(0.5),
  referenceImage: z.string().trim().max(300).optional(),
  imageHash: z.string().max(128).optional(),
  model: z.string().max(160).optional(),
  generatedAt: z.string().max(80).optional(),
  scene: FigureSceneSchema,
});

export const FigureBriefFileSchema = z.object({
  chapter_id: z.string().min(3),
  class_id: z.string().optional(),
  book_slug: z.string().optional(),
  pdf_pages: z.string().optional(),
  generated_at: z.string().optional(),
  processed_pages: z.array(z.number().int().positive()).default([]),
  figures: z.array(FigureBriefSchema).default([]),
});

export type FigurePoint = z.infer<typeof FigurePointSchema>;
export type FigureElement = z.infer<typeof FigureElementSchema>;
export type FigureScene = z.infer<typeof FigureSceneSchema>;
export type FigureBrief = z.infer<typeof FigureBriefSchema>;
export type FigureBriefFile = z.infer<typeof FigureBriefFileSchema>;

const pointIndex = (scene: FigureScene) => {
  const index = new Map<string, FigurePoint>();
  for (const point of scene.points) {
    if (index.has(point.id)) {
      throw new Error(`Duplicate point id "${point.id}".`);
    }
    index.set(point.id, point);
  }
  return index;
};

const requirePoint = (
  index: Map<string, FigurePoint>,
  id: string,
  element: string,
) => {
  const point = index.get(id);
  if (!point) throw new Error(`${element} references missing point "${id}".`);
  return point;
};

export const validateFigureScene = (scene: FigureScene) => {
  const index = pointIndex(scene);
  const width = scene.width;
  const height = scene.height;

  for (const point of scene.points) {
    if (point.x < 0 || point.x > width || point.y < 0 || point.y > height) {
      throw new Error(
        `Point "${point.id}" (${point.x}, ${point.y}) is outside ${width}x${height}.`,
      );
    }
  }

  for (const element of scene.elements) {
    switch (element.type) {
      case "line":
        requirePoint(index, element.from, "line");
        requirePoint(index, element.to, "line");
        if (element.from === element.to)
          throw new Error("line must connect two different points.");
        break;
      case "polygon":
        for (const id of element.points)
          requirePoint(index, id, "polygon");
        if (new Set(element.points).size < 3)
          throw new Error("polygon needs at least three distinct points.");
        break;
      case "circle":
        requirePoint(index, element.center, "circle");
        break;
      case "arc":
        requirePoint(index, element.center, "arc");
        requirePoint(index, element.from, "arc");
        requirePoint(index, element.to, "arc");
        break;
      case "angle":
        requirePoint(index, element.vertex, "angle");
        requirePoint(index, element.from, "angle");
        requirePoint(index, element.to, "angle");
        break;
      case "right-angle":
        requirePoint(index, element.vertex, "right-angle");
        requirePoint(index, element.from, "right-angle");
        requirePoint(index, element.to, "right-angle");
        break;
      case "dimension":
        requirePoint(index, element.from, "dimension");
        requirePoint(index, element.to, "dimension");
        break;
      case "axes":
        requirePoint(index, element.origin, "axes");
        break;
      case "label":
      case "polyline":
        break;
      default:
        break;
    }
  }

  return scene;
};

export const parseFigureScene = (value: unknown) => {
  const scene = FigureSceneSchema.parse(value);
  return validateFigureScene(scene);
};

const round = (value: number) => Math.round(value * 100) / 100;

const escapeXml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

const dashArray = (style?: "solid" | "dashed" | "dotted") =>
  style === "dashed" ? ' stroke-dasharray="10 7"' : style === "dotted" ? ' stroke-dasharray="2 6"' : "";

const midpoint = (a: { x: number; y: number }, b: { x: number; y: number }) => ({
  x: (a.x + b.x) / 2,
  y: (a.y + b.y) / 2,
});

const unit = (a: { x: number; y: number }, b: { x: number; y: number }) => {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const length = Math.hypot(dx, dy) || 1;
  return { x: dx / length, y: dy / length, length };
};

const svgArcPath = (
  cx: number,
  cy: number,
  radius: number,
  angleA: number,
  angleB: number,
  sweep: boolean,
) => {
  const start = { x: cx + radius * Math.cos(angleA), y: cy + radius * Math.sin(angleA) };
  const end = { x: cx + radius * Math.cos(angleB), y: cy + radius * Math.sin(angleB) };
  const delta = sweep
    ? (angleB - angleA + Math.PI * 2) % (Math.PI * 2)
    : (angleA - angleB + Math.PI * 2) % (Math.PI * 2);
  const large = delta > Math.PI ? 1 : 0;
  return `M ${round(start.x)} ${round(start.y)} A ${round(radius)} ${round(radius)} 0 ${large} ${sweep ? 1 : 0} ${round(end.x)} ${round(end.y)}`;
};

const shortArc = (a1: number, a2: number) => {
  let delta = a2 - a1;
  while (delta <= -Math.PI) delta += Math.PI * 2;
  while (delta > Math.PI) delta -= Math.PI * 2;
  return { delta, end: a1 + delta };
};

const svgPoints = (points: FigurePoint[]) =>
  points.map((p) => `${round(p.x)},${round(p.y)}`).join(" ");

const segmentMarks = (
  a: FigurePoint,
  b: FigurePoint,
  marks: { equal?: number; parallel?: number } | undefined,
  color: string,
) => {
  if (!marks) return "";
  const { x, y } = midpoint(a, b);
  const dir = unit(a, b);
  const normal = { x: -dir.y, y: dir.x };
  const out: string[] = [];

  const equal = marks.equal ?? 0;
  for (let i = 0; i < equal; i += 1) {
    const shift = (i - (equal - 1) / 2) * 7;
    const cx = x + dir.x * shift;
    const cy = y + dir.y * shift;
    out.push(
      `<line x1="${round(cx - normal.x * 6)}" y1="${round(cy - normal.y * 6)}" x2="${round(cx + normal.x * 6)}" y2="${round(cy + normal.y * 6)}" stroke="${color}" stroke-width="2"/>`,
    );
  }

  const parallel = marks.parallel ?? 0;
  for (let i = 0; i < parallel; i += 1) {
    const shift = (i - (parallel - 1) / 2) * 10;
    const cx = x + dir.x * shift;
    const cy = y + dir.y * shift;
    const tip = { x: cx + dir.x * 6, y: cy + dir.y * 6 };
    const wing = 5;
    out.push(
      `<path d="M ${round(tip.x - dir.x * 8 - normal.x * wing)} ${round(tip.y - dir.y * 8 - normal.y * wing)} L ${round(tip.x)} ${round(tip.y)} L ${round(tip.x - dir.x * 8 + normal.x * wing)} ${round(tip.y - dir.y * 8 + normal.y * wing)}" fill="none" stroke="${color}" stroke-width="2"/>`,
    );
  }

  return out.join("");
};

const angleMarker = (
  element: Extract<FigureElement, { type: "angle" }>,
  index: Map<string, FigurePoint>,
  color: string,
  labelColor: string,
) => {
  const vertex = index.get(element.vertex);
  const from = index.get(element.from);
  const to = index.get(element.to);
  if (!vertex || !from || !to) return "";

  const a1 = Math.atan2(from.y - vertex.y, from.x - vertex.x);
  const a2 = Math.atan2(to.y - vertex.y, to.x - vertex.x);
  const { delta, end } = shortArc(a1, a2);
  const radius = 26;
  const path = svgArcPath(vertex.x, vertex.y, radius, a1, end, delta > 0);
  const out = [`<path d="${path}" fill="none" stroke="${color}" stroke-width="2"/>`];

  const marks = element.marks ?? 0;
  for (let i = 1; i <= marks; i += 1) {
    const angle = a1 + (delta * i) / (marks + 1);
    const inner = radius - 5;
    const outer = radius + 5;
    out.push(
      `<line x1="${round(vertex.x + inner * Math.cos(angle))}" y1="${round(vertex.y + inner * Math.sin(angle))}" x2="${round(vertex.x + outer * Math.cos(angle))}" y2="${round(vertex.y + outer * Math.sin(angle))}" stroke="${color}" stroke-width="2"/>`,
    );
  }

  if (element.label) {
    const angle = a1 + delta / 2;
    const lx = vertex.x + (radius + 18) * Math.cos(angle);
    const ly = vertex.y + (radius + 18) * Math.sin(angle);
    out.push(
      `<text x="${round(lx)}" y="${round(ly)}" fill="${labelColor}" font-size="18" text-anchor="middle" dominant-baseline="middle">${escapeXml(element.label)}</text>`,
    );
  }

  return out.join("");
};

const rightAngleMarker = (
  element: Extract<FigureElement, { type: "right-angle" }>,
  index: Map<string, FigurePoint>,
  color: string,
) => {
  const vertex = index.get(element.vertex);
  const from = index.get(element.from);
  const to = index.get(element.to);
  if (!vertex || !from || !to) return "";

  const u = unit(vertex, from);
  const v = unit(vertex, to);
  const size = 15;
  const p1 = { x: vertex.x + u.x * size, y: vertex.y + u.y * size };
  const p2 = { x: p1.x + v.x * size, y: p1.y + v.y * size };
  const p3 = { x: vertex.x + v.x * size, y: vertex.y + v.y * size };
  return `<polyline points="${round(p1.x)},${round(p1.y)} ${round(p2.x)},${round(p2.y)} ${round(p3.x)},${round(p3.y)}" fill="none" stroke="${color}" stroke-width="2"/>`;
};

const dimensionMarker = (
  element: Extract<FigureElement, { type: "dimension" }>,
  index: Map<string, FigurePoint>,
  color: string,
) => {
  const a = index.get(element.from);
  const b = index.get(element.to);
  if (!a || !b) return "";

  const dir = unit(a, b);
  const normal = { x: -dir.y, y: dir.x };
  const offset = element.offset ?? 22;
  const a2 = { x: a.x + normal.x * offset, y: a.y + normal.y * offset };
  const b2 = { x: b.x + normal.x * offset, y: b.y + normal.y * offset };
  const mid = midpoint(a2, b2);
  const label = { x: mid.x + normal.x * 12, y: mid.y + normal.y * 12 };

  return [
    `<line x1="${round(a.x)}" y1="${round(a.y)}" x2="${round(a2.x)}" y2="${round(a2.y)}" stroke="${color}" stroke-width="1" stroke-dasharray="4 5" opacity="0.6"/>`,
    `<line x1="${round(b.x)}" y1="${round(b.y)}" x2="${round(b2.x)}" y2="${round(b2.y)}" stroke="${color}" stroke-width="1" stroke-dasharray="4 5" opacity="0.6"/>`,
    `<line x1="${round(a2.x - normal.x * 4)}" y1="${round(a2.y - normal.y * 4)}" x2="${round(a2.x + normal.x * 4)}" y2="${round(a2.y + normal.y * 4)}" stroke="${color}" stroke-width="2"/>`,
    `<line x1="${round(b2.x - normal.x * 4)}" y1="${round(b2.y - normal.y * 4)}" x2="${round(b2.x + normal.x * 4)}" y2="${round(b2.y + normal.y * 4)}" stroke="${color}" stroke-width="2"/>`,
    `<line x1="${round(a2.x)}" y1="${round(a2.y)}" x2="${round(b2.x)}" y2="${round(b2.y)}" stroke="${color}" stroke-width="2"/>`,
    `<text x="${round(label.x)}" y="${round(label.y)}" fill="${color}" font-size="18" text-anchor="middle" dominant-baseline="middle">${escapeXml(element.label)}</text>`,
  ].join("");
};

export type FigureSvgOptions = {
  color?: string;
  labelColor?: string;
  background?: string;
  padding?: number;
  title?: string;
};

export const figureSceneToSvg = (
  scene: FigureScene,
  options: FigureSvgOptions = {},
) => {
  validateFigureScene(scene);
  const index = pointIndex(scene);
  const color = options.color ?? "#e5e7eb";
  const labelColor = options.labelColor ?? "#f8fafc";
  const padding = options.padding ?? 0;
  const width = scene.width + padding * 2;
  const height = scene.height + padding * 2;
  const out: string[] = [];

  out.push(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${-padding} ${-padding} ${width} ${height}" width="${width}" height="${height}" role="img">`,
  );
  if (options.title)
    out.push(`<title>${escapeXml(options.title)}</title>`);
  if (options.background)
    out.push(
      `<rect x="${-padding}" y="${-padding}" width="${width}" height="${height}" fill="${options.background}"/>`,
    );

  out.push(
    `<g fill="none" stroke="${color}" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" font-family="ui-sans-serif, system-ui, sans-serif">`,
  );

  for (const element of scene.elements) {
    switch (element.type) {
      case "line": {
        const a = index.get(element.from);
        const b = index.get(element.to);
        if (!a || !b) break;
        out.push(
          `<line x1="${round(a.x)}" y1="${round(a.y)}" x2="${round(b.x)}" y2="${round(b.y)}" stroke="${color}"${dashArray(element.style)}/>`,
        );
        out.push(segmentMarks(a, b, element.marks, color));
        break;
      }
      case "polygon": {
        const points = element.points.map((id) => index.get(id)).filter(Boolean) as FigurePoint[];
        out.push(
          `<polygon points="${svgPoints(points)}" stroke="${color}"${dashArray(element.style)}/>`,
        );
        break;
      }
      case "circle": {
        const center = index.get(element.center);
        if (!center) break;
        out.push(
          `<circle cx="${round(center.x)}" cy="${round(center.y)}" r="${round(element.radius)}" stroke="${color}"${dashArray(element.style)}/>`,
        );
        break;
      }
      case "arc": {
        const center = index.get(element.center);
        const from = index.get(element.from);
        const to = index.get(element.to);
        if (!center || !from || !to) break;
        const a1 = Math.atan2(from.y - center.y, from.x - center.x);
        const a2 = Math.atan2(to.y - center.y, to.x - center.x);
        const radius = Math.hypot(from.x - center.x, from.y - center.y);
        out.push(
          `<path d="${svgArcPath(center.x, center.y, radius, a1, a2, element.clockwise ?? false)}" stroke="${color}"${dashArray(element.style)}/>`,
        );
        break;
      }
      case "angle":
        out.push(angleMarker(element, index, color, labelColor));
        break;
      case "right-angle":
        out.push(rightAngleMarker(element, index, color));
        break;
      case "dimension":
        out.push(dimensionMarker(element, index, color));
        break;
      case "label":
        out.push(
          `<text x="${round(element.x)}" y="${round(element.y)}" fill="${labelColor}" font-size="18" text-anchor="${element.anchor ?? "middle"}" dominant-baseline="middle">${escapeXml(element.text)}</text>`,
        );
        break;
      case "axes": {
        const origin = index.get(element.origin);
        if (!origin) break;
        out.push(
          `<line x1="${round(origin.x)}" y1="${round(origin.y)}" x2="${round(scene.width - 18)}" y2="${round(origin.y)}" stroke="${color}" marker-end="url(#figure-arrow)"/>`,
          `<line x1="${round(origin.x)}" y1="${round(origin.y)}" x2="${round(origin.x)}" y2="18" stroke="${color}" marker-end="url(#figure-arrow)"/>`,
        );
        if (element.xLabel)
          out.push(
            `<text x="${round(scene.width - 14)}" y="${round(origin.y + 22)}" fill="${labelColor}" font-size="16" text-anchor="end">${escapeXml(element.xLabel)}</text>`,
          );
        if (element.yLabel)
          out.push(
            `<text x="${round(origin.x + 10)}" y="22" fill="${labelColor}" font-size="16" text-anchor="start">${escapeXml(element.yLabel)}</text>`,
          );
        break;
      }
      case "polyline":
        out.push(
          `<polyline points="${element.coordinates.map(([x, y]) => `${round(x)},${round(y)}`).join(" ")}" stroke="${color}"${dashArray(element.style)}/>`,
        );
        if (element.label)
          out.push(
            `<text x="${round(element.coordinates[element.coordinates.length - 1][0] + 8)}" y="${round(element.coordinates[element.coordinates.length - 1][1] - 8)}" fill="${labelColor}" font-size="16">${escapeXml(element.label)}</text>`,
          );
        break;
      default:
        break;
    }
  }

  for (const point of scene.points) {
    out.push(
      `<circle cx="${round(point.x)}" cy="${round(point.y)}" r="3.2" fill="${labelColor}" stroke="none"/>`,
    );
    if (point.label)
      out.push(
        `<text x="${round(point.x + 8)}" y="${round(point.y - 8)}" fill="${labelColor}" font-size="18" text-anchor="start" dominant-baseline="middle">${escapeXml(point.label)}</text>`,
      );
  }

  out.push("</g>");
  out.push(
    `<defs><marker id="figure-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="${color}"/></marker></defs>`,
  );
  out.push("</svg>");
  return out.join("");
};

const elementText = (element: FigureElement) => {
  switch (element.type) {
    case "line": {
      const marks = [
        element.marks?.equal ? `equal×${element.marks.equal}` : "",
        element.marks?.parallel ? `parallel×${element.marks.parallel}` : "",
      ]
        .filter(Boolean)
        .join(", ");
      return `line ${element.from}-${element.to}${element.style ? ` (${element.style})` : ""}${marks ? ` [${marks}]` : ""}`;
    }
    case "polygon":
      return `polygon ${element.points.join("-")}`;
    case "circle":
      return `circle center ${element.center}, radius ${round(element.radius)}`;
    case "arc":
      return `arc center ${element.center} from ${element.from} to ${element.to}`;
    case "angle":
      return `angle at ${element.vertex} between ${element.from} and ${element.to}${element.label ? ` = ${element.label}` : ""}${element.marks ? ` (marks ${element.marks})` : ""}`;
    case "right-angle":
      return `right angle at ${element.vertex} between ${element.from} and ${element.to}`;
    case "dimension":
      return `dimension ${element.from}-${element.to} = ${element.label}`;
    case "label":
      return `label "${element.text}" at (${round(element.x)}, ${round(element.y)})`;
    case "axes":
      return `axes at ${element.origin}${element.xLabel ? `, x=${element.xLabel}` : ""}${element.yLabel ? `, y=${element.yLabel}` : ""}`;
    case "polyline":
      return `polyline with ${element.coordinates.length} points${element.label ? ` (${element.label})` : ""}`;
    default:
      return "unknown element";
  }
};

export const figureSceneToText = (brief: FigureBrief) => {
  const scene = brief.scene;
  const points = scene.points
    .map(
      (point) =>
        `${point.id}(${round(point.x)}, ${round(point.y)})${point.label && point.label !== point.id ? ` label=${point.label}` : ""}${point.role ? ` ${point.role}` : ""}`,
    )
    .join("; ");

  return [
    `FIGURE ${brief.figureId} — page ${brief.page}, confidence ${round(brief.confidence)}`,
    `Kind: ${scene.kind}`,
    `Description: ${scene.description || "(not transcribed)"}`,
    `Printed labels: ${scene.transcription || "(none recorded)"}`,
    `Given: ${scene.givens.length ? scene.givens.join("; ") : "(none recorded)"}`,
    `Unknown: ${scene.unknowns.length ? scene.unknowns.join("; ") : "(none recorded)"}`,
    `Points: ${points}`,
    `Elements: ${scene.elements.map(elementText).join("; ") || "(none recorded)"}`,
  ].join("\n");
};

export const figureBriefsToText = (briefs: FigureBrief[]) =>
  briefs.map(figureSceneToText).join("\n\n");
