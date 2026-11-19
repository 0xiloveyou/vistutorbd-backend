export type PlayLocalizedText = { en: string; bn: string };

export type PlayStep = {
  narration: PlayLocalizedText;
  formula?: string;
  data?: Record<string, unknown>;
};

export type PlayVisualizationDef = {
  slug: string;
  chapterCode: string;
  title: PlayLocalizedText;
  summary: PlayLocalizedText;
  renderer: string;
  engine: string;
  kind: "STEPPER" | "SCENE" | "ANIMATED";
  tags: string[];
  concepts: string[];
  difficulty: number;
  data: Record<string, unknown>;
  steps: PlayStep[];
  aiContext: string;
};

export type PlayLessonBlockDef = {
  type: string;
  title?: PlayLocalizedText;
  body?: PlayLocalizedText;
  formula?: string;
  vizSlug?: string;
};

export type PlayTopicDef = {
  slug: string;
  title: PlayLocalizedText;
  summary: PlayLocalizedText;
  difficulty: number;
  lesson: PlayLessonBlockDef[];
  vizSlugs: string[];
};

export type PlayChapterDef = {
  slug: string;
  title: PlayLocalizedText;
  summary: PlayLocalizedText;
  order: number;
  topics: PlayTopicDef[];
};

export type PlayCategoryDef = {
  slug: string;
  title: PlayLocalizedText;
  summary: PlayLocalizedText;
  icon: string;
  order: number;
  chapter: PlayChapterDef;
};

export const L = (en: string, bn: string): PlayLocalizedText => ({ en, bn });

export const S = (
  en: string,
  bn: string,
  data?: Record<string, unknown>,
  formula?: string,
): PlayStep => ({
  narration: L(en, bn),
  ...(formula ? { formula } : {}),
  ...(data ? { data } : {}),
});

export const text = (en: string, bn: string): PlayLessonBlockDef => ({
  type: "text",
  body: L(en, bn),
});

export const example = (
  en: string,
  bn: string,
  formula?: string,
): PlayLessonBlockDef => ({
  type: "example",
  body: L(en, bn),
  ...(formula ? { formula } : {}),
});

export const callout = (en: string, bn: string): PlayLessonBlockDef => ({
  type: "callout",
  body: L(en, bn),
});

export const vizBlock = (vizSlug: string): PlayLessonBlockDef => ({
  type: "visualization",
  vizSlug,
});
