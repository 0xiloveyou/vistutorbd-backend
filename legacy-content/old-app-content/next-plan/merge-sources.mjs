/**
 * Merge the three source documents from `public/next plan/` into one machine
 * readable catalogue.
 *
 * The sources are copied into `./source/` so the catalogue stays reproducible
 * after the `public/` copy is deleted or reorganised.
 *
 *   games-plan.txt   -> folder 1 (game concepts + companion rules)
 *   concept-map.txt  -> folder 2 (concept cards, links, checks, projects)
 *   idea-bank.txt    -> folder 3 (interaction templates, activity bank)
 *
 * Output: catalog.generated.json
 *
 * Usage: node src/app/content/next-plan/merge-sources.mjs
 */
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const SOURCE = path.join(HERE, "source");

const GROUPS = [
  { id: "play-nursery", label: "Play & Nursery", conceptHeading: /GROUP 1\s*:\s*PLAY & NURSERY/i, ideaHeading: /CATEGORY 1:\s*PLAY & NURSERY/i, gameHeading: /GROUP A:\s*PLAY & NURSERY/i },
  { id: "class-1-5", label: "Class 1-5", conceptHeading: /GROUP 2\s*:\s*CLASS 1 TO 5/i, ideaHeading: /CATEGORY 2:\s*CLASS 1-5/i, gameHeading: /GROUP B:\s*CLASS 1-5/i },
  { id: "class-6-8", label: "Class 6-8", conceptHeading: /GROUP 3\s*:\s*CLASS 6 TO 8/i, ideaHeading: /CATEGORY 3:\s*CLASS 6-8/i, gameHeading: /GROUP C:\s*CLASS 6-8/i },
  { id: "class-9-10", label: "Class 9-10", conceptHeading: /GROUP 4\s*:\s*CLASS 9 & 10/i, ideaHeading: /CATEGORY 4:\s*CLASS 9-10/i, gameHeading: /GROUP D:\s*CLASS 9-10/i },
  { id: "class-11-12", label: "Class 11-12", conceptHeading: /GROUP 5\s*:\s*CLASS 11 & 12/i, ideaHeading: /CATEGORY 5:\s*CLASS 11-12/i, gameHeading: /GROUP E:\s*CLASS 11-12/i },
];

const clean = (value) => value.replace(/\s+/g, " ").trim();
const groupFor = (line) => GROUPS.find((group) => group.conceptHeading.test(line) || group.ideaHeading.test(line) || group.gameHeading.test(line))?.id ?? null;

async function readSource(name) {
  return readFile(path.join(SOURCE, name), "utf8");
}

function parseConceptCards(text) {
  const lines = text.split(/\r?\n/);
  const cards = [];
  let group = null;
  let current = null;
  let field = null;

  for (const line of lines) {
    const heading = groupFor(line);
    if (heading) group = heading;

    const card = line.match(/^\s*Card\s+([A-Z]\d+)\s*-\s*"([^"]+)"\s*\[(\w+)\]/);
    if (card) {
      if (current) cards.push(current);
      current = { id: card[1], title: clean(card[2]), level: card[3], group, idea: "", angle: "" };
      field = null;
      continue;
    }

    if (!current) continue;
    const idea = line.match(/^\s*Idea\s*:\s*(.+)$/i);
    const angle = line.match(/^\s*New angle\s*:\s*(.+)$/i);
    if (idea) {
      current.idea = clean(idea[1]);
      field = "idea";
    } else if (angle) {
      current.angle = clean(angle[1]);
      field = "angle";
    } else if (field && /^\s{4,}\S/.test(line)) {
      current[field] = clean(`${current[field]} ${line}`);
    }
  }

  if (current) cards.push(current);
  return cards;
}

function parseIdeaBank(text) {
  const lines = text.split(/\r?\n/);
  const items = [];
  let group = null;
  let current = null;
  const codeRe = /^\s*(PN|C15|C68|C910|C1112)-(\d{2})\s+(.+)$/;

  for (const line of lines) {
    const heading = groupFor(line);
    if (heading && /CATEGORY/i.test(line)) group = heading;

    const match = line.match(codeRe);
    if (match) {
      if (current) items.push(current);
      const raw = match[3];
      const split = raw.match(/^(.*?)\s{2,}(.*)$/);
      current = {
        code: `${match[1]}-${match[2]}`,
        group,
        title: clean(split ? split[1] : raw),
        detail: split ? clean(split[2]) : "",
      };
      continue;
    }

    if (!current) continue;
    // Continuation lines are indented and do not start a new section.
    if (/^\s{3,}\S/.test(line) && !/^\s*(TOPIC|NOTES|STAR PICK)/i.test(line)) {
      current.detail = clean(`${current.detail} ${line}`);
    }
  }

  if (current) items.push(current);
  return items;
}

function parseGameIdeas(text) {
  const lines = text.split(/\r?\n/);
  const items = [];
  let group = null;
  let current = null;
  const codeRe = /^\s*([A-E]\d)\s+(.+?)\s+-\s+(.+)$/;

  for (const line of lines) {
    const heading = groupFor(line);
    if (heading && /GROUP [A-E]:/i.test(line)) group = heading;

    const match = line.match(codeRe);
    if (match) {
      if (current) items.push(current);
      current = { code: match[1], group, title: clean(match[2]), detail: clean(match[3]) };
      continue;
    }

    if (!current) continue;
    if (/^\s{3,}\S/.test(line) && !/^\s*(GROUP|----)/i.test(line)) {
      current.detail = clean(`${current.detail} ${line}`);
    }
  }

  if (current) items.push(current);
  return items;
}

function parseTemplates(text) {
  const lines = text.split(/\r?\n/);
  const items = [];
  let current = null;
  for (const line of lines) {
    const match = line.match(/^\s*(T\d{2})\s{2,}(.+)$/);
    if (match) {
      if (current) items.push(current);
      current = { code: match[1], title: clean(match[2]), detail: "" };
      continue;
    }
    if (current && /^\s{5,}\S/.test(line)) current.detail = clean(`${current.detail} ${line}`);
  }
  if (current) items.push(current);
  return items;
}

function parseExamples(text) {
  const examples = [];
  const re = /EXAMPLE ([A-D]):\s+"([^"]+)"\s+\(([^)]+)\)/g;
  let match = re.exec(text);
  while (match) {
    examples.push({ code: match[1], title: clean(match[2]), band: clean(match[3]) });
    match = re.exec(text);
  }
  return examples;
}

const [gamesPlan, conceptMap, ideaBank] = await Promise.all([
  readSource("games-plan.txt"),
  readSource("concept-map.txt"),
  readSource("idea-bank.txt"),
]);

const catalog = {
  generatedAt: new Date().toISOString(),
  sources: {
    games: "source/games-plan.txt",
    concepts: "source/concept-map.txt",
    ideas: "source/idea-bank.txt",
  },
  groups: GROUPS.map(({ id, label }) => ({ id, label })),
  conceptCards: parseConceptCards(conceptMap),
  ideaBank: parseIdeaBank(ideaBank),
  gameIdeas: parseGameIdeas(gamesPlan),
  interactionTemplates: parseTemplates(ideaBank),
  workedExamples: parseExamples(ideaBank),
};

await writeFile(path.join(HERE, "catalog.generated.json"), `${JSON.stringify(catalog, null, 2)}\n`, "utf8");

console.log(
  [
    `Merged ${catalog.conceptCards.length} concept cards,`,
    `${catalog.ideaBank.length} idea-bank activities,`,
    `${catalog.gameIdeas.length} game ideas,`,
    `${catalog.interactionTemplates.length} templates,`,
    `${catalog.workedExamples.length} worked examples.`,
  ].join(" "),
);
