/**
 * Shared types for the merged "next plan" content bank.
 *
 * Folder 1 (games plan) supplies the game loop; folder 2 (concept map)
 * supplies the learning map; folder 3 (idea bank) supplies the interaction
 * templates. This file is the single vocabulary every activity uses, so the
 * same data can be rendered as a game, a visual explanation or a Q&A set.
 */

export type GroupId =
  | "play-nursery"
  | "class-1-5"
  | "class-6-8"
  | "class-9-10"
  | "class-11-12";

export type ActivityKind = "GAME" | "VISUAL" | "QUESTION";

export type StyleId = "robot" | "line" | "text";

export type Bilingual = { en: string; bn: string };

export type Coach = {
  /** One-line goal shown above the stage. */
  intro: Bilingual;
  /** "Show me how" lines, in order. */
  steps: Bilingual[];
  /** Hint ladder: gentle -> strong. */
  hints: Bilingual[];
  /** Nothing selected yet. */
  none: Bilingual;
  /** Too few / below the target. `{n}` and `{a}` are replaced. */
  less?: Bilingual;
  /** Too many / above the target. */
  more?: Bilingual;
  good: Bilingual;
  done: Bilingual;
  /** New wording for "I didn't understand" (never a repeat). */
  again: Bilingual;
};

export type BaseActivity = {
  id: string;
  /** MongoDB carousel slug. */
  slug: string;
  /** Generated file under `src/app/content/carousels/`. */
  file: string;
  group: GroupId;
  kind: ActivityKind;
  /** Position in the build cycle: 1 = games, 2 = visuals, 3 = Q&A. */
  cycle: number;
  /** Order inside the group's kind, used by the learn page. */
  order: number;
  title: Bilingual;
  goal: Bilingual;
  defaultStyle: StyleId;
  coach: Coach;
  /** Cards in the merged concept map this activity teaches. */
  concepts: string[];
  /** Rows of the merged idea bank this activity was built from. */
  ideas: string[];
};

export type CountRound = {
  target: number;
  item: string;
  itemName: Bilingual;
};

export type FractionRound = {
  num: number;
  den: number;
};

export type ElevatorRound = {
  start: number;
  move: number;
};

export type QuadraticRound = {
  /** Target vertex-form parameters: y = a(x - h)^2 + k. */
  a: number;
  h: number;
  k: number;
  /** The hoop the curve must pass through. */
  hoop: { x: number; y: number };
};

export type SecantRound = {
  /** x-coordinate of point A on y = x^2. */
  a: number;
};

export type GameActivity = BaseActivity &
  (
    | { type: "count"; rounds: CountRound[] }
    | { type: "fraction-pizza"; rounds: FractionRound[] }
    | { type: "integer-elevator"; rounds: ElevatorRound[] }
    | { type: "quadratic-hoops"; rounds: QuadraticRound[] }
    | { type: "secant-slope"; rounds: SecantRound[] }
  );

export type VisualScene =
  | "shapes"
  | "fraction-wall"
  | "pythagoras"
  | "parabola"
  | "secant";

export type VisualStep = {
  /** CSS selector inside the stage the companion points at. */
  target: string;
  say: Bilingual;
};

export type VisualActivity = BaseActivity & {
  type: "visual";
  scene: VisualScene;
  steps: VisualStep[];
};

export type QuestionOption = {
  label: Bilingual;
  correct?: boolean;
};

export type QuestionItem = {
  id: string;
  prompt: Bilingual;
  hint?: Bilingual;
  options: QuestionOption[];
  explain: Bilingual;
  /** Optional mini-picture rendered above the options. */
  scene?: "count" | "fraction" | "bar" | "graph" | "none";
  sceneData?: Record<string, number | string | number[]>;
};

export type QuestionActivity = BaseActivity & {
  type: "question-set";
  questions: QuestionItem[];
};

export type NextPlanActivity = GameActivity | VisualActivity | QuestionActivity;

export type ManifestEntry = {
  slug: string;
  file: string;
  kind: ActivityKind;
  group: GroupId;
  cycle: number;
  order: number;
  title: Bilingual;
  summary: Bilingual;
  activityId: string;
};
