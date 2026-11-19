import { Prisma } from "@prisma/client";
import type {
  PlayCategoryDef,
  PlayVisualizationDef,
} from "../content/play/play.types";
import { prisma } from "../lib/prisma";

export type ClassContentPack = {
  levelId: string;
  bandId: string;
  label: string;
  categories: PlayCategoryDef[];
  visualizations: PlayVisualizationDef[];
};

export const vizIdFor = (
  levelId: string,
  viz: PlayVisualizationDef,
): string => `viz.${levelId}.${viz.chapterCode}.${viz.slug}.v1`;

export const seedClassContent = async ({
  levelId,
  bandId,
  label,
  categories,
  visualizations,
}: ClassContentPack) => {
  const level = await prisma.classLevel.findUnique({ where: { id: levelId } });
  if (!level) {
    throw new Error(
      `Class level '${levelId}' is missing. Run seedTaxonomy() before seeding ${label} content.`,
    );
  }

  for (const viz of visualizations) {
    const vizId = vizIdFor(levelId, viz);
    const spec = {
      kind: viz.kind,
      renderer: viz.renderer,
      title: viz.title,
      data: viz.data,
      steps: viz.steps,
    } satisfies Record<string, unknown>;

    const data = {
      kind: viz.kind,
      renderer: viz.renderer,
      engine: viz.engine,
      title: viz.title,
      summary: viz.summary,
      inputs: {} as Prisma.InputJsonValue,
      spec: spec as Prisma.InputJsonValue,
      tags: viz.tags,
      concepts: viz.concepts,
      prerequisites: [],
      difficulty: viz.difficulty,
      classBandIds: [bandId],
      version: 1,
      aiContext: viz.aiContext,
      status: "PUBLISHED" as const,
    };

    await prisma.visualization.upsert({
      where: { vizId },
      update: data,
      create: { vizId, ...data },
    });
  }

  const resolveViz = (slug: string) => {
    const viz = visualizations.find((item) => item.slug === slug);
    if (!viz) {
      throw new Error(`Unknown ${label} visualization slug: ${slug}`);
    }
    return vizIdFor(levelId, viz);
  };

  let topicCount = 0;

  for (const categoryDef of categories) {
    const category = await prisma.category.upsert({
      where: {
        classLevelId_slug: {
          classLevelId: levelId,
          slug: categoryDef.slug,
        },
      },
      update: {
        title: categoryDef.title,
        summary: categoryDef.summary,
        icon: categoryDef.icon,
        order: categoryDef.order,
        isActive: true,
      },
      create: {
        classLevelId: levelId,
        slug: categoryDef.slug,
        title: categoryDef.title,
        summary: categoryDef.summary,
        icon: categoryDef.icon,
        order: categoryDef.order,
        isActive: true,
      },
    });

    const chapterDef = categoryDef.chapter;
    const chapter = await prisma.chapter.upsert({
      where: {
        categoryId_slug: {
          categoryId: category.id,
          slug: chapterDef.slug,
        },
      },
      update: {
        title: chapterDef.title,
        summary: chapterDef.summary,
        order: chapterDef.order,
        status: "PUBLISHED",
      },
      create: {
        categoryId: category.id,
        classLevelId: levelId,
        classBandId: bandId,
        slug: chapterDef.slug,
        title: chapterDef.title,
        summary: chapterDef.summary,
        order: chapterDef.order,
        prerequisites: [],
        status: "PUBLISHED",
      },
    });

    for (const topicDef of chapterDef.topics) {
      const lesson = topicDef.lesson.map((block, index) => ({
        id: `${topicDef.slug}-block-${index + 1}`,
        type: block.type,
        order: index,
        ...(block.title ? { title: block.title } : {}),
        ...(block.body ? { body: block.body } : {}),
        ...(block.formula ? { formula: block.formula } : {}),
        ...(block.vizSlug ? { vizId: resolveViz(block.vizSlug) } : {}),
      }));

      const visualizationIds = topicDef.vizSlugs.map(resolveViz);

      const data = {
        chapterId: chapter.id,
        categoryId: category.id,
        classLevelId: levelId,
        classBandId: bandId,
        slug: topicDef.slug,
        title: topicDef.title,
        summary: topicDef.summary,
        lesson,
        visualizationIds,
        knowledgeStatus: "PENDING",
        difficulty: topicDef.difficulty,
        status: "PUBLISHED" as const,
      };

      await prisma.topic.upsert({
        where: { slug: topicDef.slug },
        update: data,
        create: data,
      });
      topicCount += 1;
    }
  }

  console.log(
    `Seeded ${visualizations.length} ${label} visualization(s) and ${topicCount} ${label} topic(s).`,
  );
};
