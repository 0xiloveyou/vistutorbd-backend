import generated from "./catalog.generated.json";
import type { GroupId } from "./types";

export type ConceptCard = {
  id: string;
  title: string;
  level: string;
  group: GroupId;
  idea: string;
  angle: string;
};

export type IdeaBankEntry = {
  code: string;
  group: GroupId;
  title: string;
  detail: string;
};

export type GameIdea = {
  code: string;
  group: GroupId;
  title: string;
  detail: string;
};

export type InteractionTemplate = {
  code: string;
  title: string;
  detail: string;
};

export type WorkedExample = {
  code: string;
  title: string;
  band: string;
};

export type MergedCatalog = {
  generatedAt: string;
  sources: { games: string; concepts: string; ideas: string };
  groups: { id: GroupId; label: string }[];
  conceptCards: ConceptCard[];
  ideaBank: IdeaBankEntry[];
  gameIdeas: GameIdea[];
  interactionTemplates: InteractionTemplate[];
  workedExamples: WorkedExample[];
};

/**
 * One merged, typed view of folder 1 + folder 2 + folder 3.
 *
 * The source prose stays in `source/`; `catalog.generated.json` is the parsed
 * index (75 concept cards, 148 idea-bank rows, 32 game ideas, 14 templates).
 * Rebuild it with `node src/app/content/next-plan/merge-sources.mjs`.
 */
export const MERGED_CATALOG = generated as MergedCatalog;

export const MERGE_SUMMARY = {
  groups: MERGED_CATALOG.groups.length,
  conceptCards: MERGED_CATALOG.conceptCards.length,
  ideaBank: MERGED_CATALOG.ideaBank.length,
  gameIdeas: MERGED_CATALOG.gameIdeas.length,
  interactionTemplates: MERGED_CATALOG.interactionTemplates.length,
  workedExamples: MERGED_CATALOG.workedExamples.length,
  generatedAt: MERGED_CATALOG.generatedAt,
};

export const conceptCardsFor = (group: GroupId) =>
  MERGED_CATALOG.conceptCards.filter((card) => card.group === group);

export const ideaBankFor = (group: GroupId) =>
  MERGED_CATALOG.ideaBank.filter((row) => row.group === group);

export const gameIdeasFor = (group: GroupId) =>
  MERGED_CATALOG.gameIdeas.filter((row) => row.group === group);

export const findConcept = (id: string) =>
  MERGED_CATALOG.conceptCards.find((card) => card.id === id);

export const findIdea = (code: string) =>
  MERGED_CATALOG.ideaBank.find((row) => row.code === code);

export const findGameIdea = (code: string) =>
  MERGED_CATALOG.gameIdeas.find((row) => row.code === code);

/** Every idea-bank row not yet used by a built activity (future cycle list). */
export const unusedIdeas = (builtCodes: string[]) =>
  MERGED_CATALOG.ideaBank.filter((row) => !builtCodes.includes(row.code));

/** Every game idea not yet built (future cycle list). */
export const unusedGameIdeas = (builtCodes: string[]) =>
  MERGED_CATALOG.gameIdeas.filter((row) => !builtCodes.includes(row.code));
