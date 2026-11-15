import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { NEXT_PLAN_ACTIVITIES } from "./activities";
import { NEXT_PLAN_GROUPS } from "./groups";
import type {
  ActivityKind,
  Bilingual,
  ManifestEntry,
  NextPlanActivity,
} from "./types";

/**
 * Build the standalone carousel documents for the first release.
 *
 * Every activity shares one runtime (`runtime/engine.js`), one stylesheet
 * (`runtime/engine.css`) and the mandatory Bolt companion (`runtime/robot.svg`).
 * The only per-file difference is the injected `window.__NEXT_PLAN__` payload,
 * which carries the activity data plus the group and kind labels.
 *
 * Usage (from `vistutorbd-backend/`):
 *   npm run content:next-plan
 *
 * Output: 15 files in `src/app/content/carousels/` and one manifest in
 * `src/app/content/next-plan/manifest.generated.json`.
 */

const HERE = path.dirname(fileURLToPath(import.meta.url));
const RUNTIME_DIR = path.join(HERE, "runtime");
const CAROUSEL_DIR = path.join(HERE, "..", "carousels");
const MANIFEST_FILE = path.join(HERE, "manifest.generated.json");

const KIND_LABELS: Record<ActivityKind, Bilingual> = {
  GAME: { en: "Game", bn: "খেলা" },
  VISUAL: { en: "Visual explanation", bn: "রেখাচিত্র ব্যাখ্যা" },
  QUESTION: { en: "Question set", bn: "প্রশ্ন সেট" },
};

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

/**
 * JSON goes inside a classic <script> block, so escape the three sequences
 * that could otherwise close the tag or break the parser.
 */
const escapeJson = (value: unknown) =>
  JSON.stringify(value)
    .replace(/</g, "\\u003c")
    .replace(/\u2028/g, "\\u2028")
    .replace(/\u2029/g, "\\u2029");

type ShellInput = {
  activity: NextPlanActivity;
  css: string;
  js: string;
  robot: string;
};

const renderShell = ({ activity, css, js, robot }: ShellInput) => {
  const group = NEXT_PLAN_GROUPS[activity.group];
  const payload = {
    activity,
    groupLabel: group.label,
    kindLabel: KIND_LABELS[activity.kind],
  };

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="description" content="${escapeHtml(activity.goal.en)}">
<title>${escapeHtml(activity.title.en)} · ${escapeHtml(group.label.en)}</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Baloo+Da+2:wght@500;700;800&display=swap" rel="stylesheet">
<style>
${css}
</style>
</head>
<body data-style="${activity.defaultStyle}">
<main>
  <div class="hero">
    <div>
      <span class="kicker" id="kicker"></span>
      <h1 id="title"></h1>
    </div>
    <div class="score">
      <span class="pill" id="roundPill"></span>
      <span class="pill" id="starPill"></span>
    </div>
  </div>
  <p class="goal" id="goal"></p>

  <div class="styles" role="group" aria-label="Style">
    <b data-k="style"></b>
    <button type="button" data-s="robot" aria-pressed="false">🤖 <span data-k="sRobot"></span></button>
    <button type="button" data-s="line" aria-pressed="false">✏️ <span data-k="sLine"></span></button>
    <button type="button" data-s="text" aria-pressed="false">📝 <span data-k="sText"></span></button>
  </div>

  <section class="activity" aria-label="Activity">
    <div class="stage" id="stage"></div>
    <div class="controls" id="controls" hidden></div>
    <div class="cap" id="cap" role="status" aria-live="polite" hidden></div>
  </section>

  <div class="ctl">
    <button type="button" class="go" id="check"></button>
    <button type="button" id="how">▶ <span data-k="how"></span></button>
    <button type="button" id="hint">💡 <span data-k="hint"></span></button>
    <button type="button" id="conf">🙋 <span data-k="conf"></span></button>
    <button type="button" id="snd" aria-label="Sound">🔊</button>
    <button type="button" id="lng">EN / বাংলা</button>
    <button type="button" id="next" hidden></button>
  </div>

  <div class="review" id="review" role="status" aria-live="polite" hidden></div>
</main>

<!-- Companion: Bolt, the cute robot from the folder 1 game pattern. -->
<div id="robot" data-emo="idle" data-talk="off" role="button" tabindex="0" aria-label="Bolt, your helper">
  <div class="bubble" id="bubble" role="status" aria-live="polite"></div>
  ${robot.trim()}
</div>

<noscript><p style="padding:16px">This activity needs JavaScript. Please turn it on in your browser.</p></noscript>

<script>
window.__NEXT_PLAN__ = ${escapeJson(payload)};
</script>
<script>
${js}
</script>
</body>
</html>
`;
};

const main = async () => {
  const [css, js, robot] = await Promise.all([
    readFile(path.join(RUNTIME_DIR, "engine.css"), "utf8"),
    readFile(path.join(RUNTIME_DIR, "engine.js"), "utf8"),
    readFile(path.join(RUNTIME_DIR, "robot.svg"), "utf8"),
  ]);

  const slugs = new Set<string>();
  const files = new Set<string>();
  for (const activity of NEXT_PLAN_ACTIVITIES) {
    if (slugs.has(activity.slug)) {
      throw new Error(`Duplicate carousel slug: ${activity.slug}`);
    }
    if (files.has(activity.file)) {
      throw new Error(`Duplicate output file: ${activity.file}`);
    }
    slugs.add(activity.slug);
    files.add(activity.file);
  }

  await mkdir(CAROUSEL_DIR, { recursive: true });

  const manifest: ManifestEntry[] = [];

  for (const activity of NEXT_PLAN_ACTIVITIES) {
    const html = renderShell({ activity, css, js, robot });
    await writeFile(path.join(CAROUSEL_DIR, activity.file), html, "utf8");

    manifest.push({
      slug: activity.slug,
      file: activity.file,
      kind: activity.kind,
      group: activity.group,
      cycle: activity.cycle,
      order: activity.order,
      title: activity.title,
      summary: activity.goal,
      activityId: activity.id,
    });

    console.log(`[next-plan] ${activity.kind.padEnd(8)} ${activity.file}`);
  }

  await writeFile(
    MANIFEST_FILE,
    `${JSON.stringify(
      {
        generatedAt: new Date().toISOString(),
        total: manifest.length,
        activities: manifest,
      },
      null,
      2,
    )}\n`,
    "utf8",
  );

  console.log(
    `\n[next-plan] ${manifest.length} activities written to ${CAROUSEL_DIR}`,
  );
  console.log(`[next-plan] manifest: ${MANIFEST_FILE}`);
};

main().catch((error) => {
  console.error("[next-plan] generation failed:", error);
  process.exitCode = 1;
});
