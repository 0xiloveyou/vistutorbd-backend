import type { LearnCarouselKind } from "@prisma/client";
import { NEXT_PLAN_ACTIVITIES } from "./activities";
import { NEXT_PLAN_GROUPS } from "./groups";
import type { Bilingual } from "./types";

export type NextPlanCarouselSeed = {
  slug: string;
  kind: LearnCarouselKind;
  file: string;
  classLevelIds: string[];
  classBandIds: string[];
  title: Bilingual;
  summary: Bilingual;
  order: number;
};

const kindFor = (activityKind: string): LearnCarouselKind =>
  activityKind === "VISUAL" ? "EXPLANATION" : "QUESTION";

/**
 * Carousel metadata consumed by `seed-learn-carousels.ts`.
 *
 * Games and Q&A sets share the QUESTION kind so `/learn` shows them together;
 * visual explanations use EXPLANATION. Within each kind the cycle order is
 * game (1) -> visual (2) -> Q&A (3), then the next group.
 */
export const NEXT_PLAN_CAROUSEL_SEEDS: NextPlanCarouselSeed[] =
  NEXT_PLAN_ACTIVITIES.map((activity) => {
    const group = NEXT_PLAN_GROUPS[activity.group];

    return {
      slug: activity.slug,
      kind: kindFor(activity.kind),
      file: activity.file,
      classLevelIds: group.classLevelIds,
      classBandIds: group.classBandIds,
      title: activity.title,
      summary: activity.goal,
      order: 100 + activity.cycle * 10 + activity.order / 10,
    };
  });

export const NEXT_PLAN_CAROUSEL_SLUGS = NEXT_PLAN_CAROUSEL_SEEDS.map(
  (seed) => seed.slug,
);
