import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { CONTENT_PACKS } from "../content";

const here = dirname(fileURLToPath(import.meta.url));
const backendRoot = join(here, "..", "..", "..");
const contentDir = join(backendRoot, "src", "app", "content");
const progressPath = join(backendRoot, "progress.md");

const escapeCell = (value: string) => value.replace(/\|/g, "\\|");

type Pack = (typeof CONTENT_PACKS)[number];

const packTopicCount = (pack: Pack) =>
  pack.categories.reduce(
    (sum, category) => sum + category.chapter.topics.length,
    0,
  );

const packRows = (pack: Pack) => {
  const rows: string[] = [];
  for (const category of pack.categories) {
    for (const topic of category.chapter.topics) {
      rows.push(
        `| ${escapeCell(category.chapter.title.en)} | ${escapeCell(topic.title.en)} | \`${topic.slug}\` | ${topic.vizSlugs.length} |`,
      );
    }
  }
  return rows;
};

const packInventory = (pack: Pack) => {
  const topics = packTopicCount(pack);
  return [
    `# ${pack.label} content inventory`,
    "",
    `_Generated from \`CONTENT_PACKS\` on ${new Date().toISOString().slice(0, 10)}._`,
    "",
    `${pack.categories.length} chapters · ${topics} topics · ${pack.visualizations.length} visualizations`,
    "",
    "| Chapter | Topic | Slug | Viz |",
    "| --- | --- | --- | --- |",
    ...packRows(pack),
    "",
    "See also: [`../CHAPTERS.md`](../CHAPTERS.md) for all packs.",
    "",
  ].join("\n");
};

const totals = CONTENT_PACKS.reduce(
  (acc, pack) => {
    const chapters = pack.categories.length;
    const topics = pack.categories.reduce(
      (sum, category) => sum + category.chapter.topics.length,
      0,
    );
    const visualizations = pack.visualizations.length;
    return {
      chapters: acc.chapters + chapters,
      topics: acc.topics + topics,
      visualizations: acc.visualizations + visualizations,
    };
  },
  { chapters: 0, topics: 0, visualizations: 0 },
);

const generatedAt = new Date().toISOString().slice(0, 10);

const inventory = [
  "# Content inventory",
  "",
  `_Generated from \`CONTENT_PACKS\` on ${generatedAt}._`,
  "",
  `Totals: **${CONTENT_PACKS.length} packs**, **${totals.chapters} chapters**, **${totals.topics} topics**, **${totals.visualizations} visualizations**.`,
  "",
  "Run `bun run src/app/scripts/content-inventory.ts` to refresh this file.",
  "",
];

for (const pack of CONTENT_PACKS) {
  inventory.push(
    `## ${pack.label} (\`${pack.levelId}\`)`,
    "",
    `${pack.categories.length} chapters · ${packTopicCount(pack)} topics · ${pack.visualizations.length} visualizations`,
    "",
    "| Chapter | Topic | Slug | Viz |",
    "| --- | --- | --- | --- |",
    ...packRows(pack),
    "",
    `See also: [\`${pack.levelId}/CHAPTERS.md\`](${pack.levelId}/CHAPTERS.md).`,
    "",
  );
  writeFileSync(
    join(contentDir, pack.levelId, "CHAPTERS.md"),
    packInventory(pack),
  );
}

writeFileSync(join(contentDir, "CHAPTERS.md"), `${inventory.join("\n")}\n`);

const summaryRows = CONTENT_PACKS.map(
  (pack) =>
    `| ${pack.label} | \`${pack.levelId}\` | ${pack.categories.length} | ${packTopicCount(pack)} | ${pack.visualizations.length} |`,
);

const newClassSections: string[] = [];
for (const pack of CONTENT_PACKS) {
  const classNumber = Number(pack.levelId.replace("class-", ""));
  if (Number.isNaN(classNumber) || classNumber < 5) continue;
  const lines = [`### ${pack.label}`, ""];
  for (const category of pack.categories) {
    const topicList = category.chapter.topics
      .map((topic) => `\`${topic.slug}\``)
      .join(", ");
    lines.push(
      `- **${escapeCell(category.chapter.title.en)}** — ${category.chapter.topics.length} topic(s), ${category.chapter.topics.reduce((sum, topic) => sum + topic.vizSlugs.length, 0)} viz: ${topicList}`,
    );
  }
  newClassSections.push(...lines, "");
}

const begin = "<!-- BEGIN CONTENT INVENTORY -->";
const end = "<!-- END CONTENT INVENTORY -->";
const section = [
  begin,
  "## Content inventory (generated)",
  "",
  `Full per-chapter list: \`src/app/content/CHAPTERS.md\`. Each pack folder also has its own \`CHAPTERS.md\`.`,
  "",
  "| Pack | Level | Chapters | Topics | Viz |",
  "| --- | --- | --- | --- | --- |",
  ...summaryRows,
  "",
  "### New topics added (Classes 5–12)",
  "",
  ...newClassSections,
  end,
].join("\n");

let progress = readFileSync(progressPath, "utf8");
if (progress.includes(begin) && progress.includes(end)) {
  const pattern = new RegExp(`${begin}[\\s\\S]*?${end}`);
  progress = progress.replace(pattern, section);
} else {
  progress = `${progress.trimEnd()}\n\n${section}\n`;
}
writeFileSync(progressPath, progress);

console.log(
  `Wrote content/CHAPTERS.md and updated progress.md (${totals.chapters} chapters, ${totals.topics} topics, ${totals.visualizations} visualizations).`,
);
