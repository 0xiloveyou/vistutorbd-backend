import type { NextPlanActivity } from "../types";
import { GAME_ACTIVITIES } from "./games";
import { QUESTION_ACTIVITIES } from "./questions";
import { VISUAL_ACTIVITIES } from "./visuals";

export { GAME_ACTIVITIES, QUESTION_ACTIVITIES, VISUAL_ACTIVITIES };

/**
 * The complete first release, in cycle order:
 *   1. games  (one per group)
 *   2. visuals (one per group)
 *   3. Q&A    (one per group)
 */
export const NEXT_PLAN_ACTIVITIES: NextPlanActivity[] = [
  ...GAME_ACTIVITIES,
  ...VISUAL_ACTIVITIES,
  ...QUESTION_ACTIVITIES,
];

export const ACTIVITY_BY_ID = new Map(
  NEXT_PLAN_ACTIVITIES.map((activity) => [activity.id, activity]),
);

export const BUILT_IDEA_CODES = NEXT_PLAN_ACTIVITIES.flatMap(
  (activity) => activity.ideas,
);
export const BUILT_CONCEPT_IDS = NEXT_PLAN_ACTIVITIES.flatMap(
  (activity) => activity.concepts,
);
