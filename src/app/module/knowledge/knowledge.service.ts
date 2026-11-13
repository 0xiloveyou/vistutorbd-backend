import httpStatus from "http-status";
import { prisma } from "../../lib/prisma";
import {
  contentHash,
  cosineSimilarity,
  embedMany,
  embedText,
} from "../../lib/embeddings";
import { AppError } from "../../utils/AppError";
import type { IKnowledgeChunkPayload } from "../../interfaces";

type ChunkFilter = {
  topicId?: string;
  chapterId?: string;
  categoryId?: string;
  classBandId?: string;
  vizId?: string;
  lang?: string;
  kind?: string;
};

const buildWhere = (filter: ChunkFilter) => ({
  isActive: true,
  ...(filter.topicId ? { topicId: filter.topicId } : {}),
  ...(filter.chapterId ? { chapterId: filter.chapterId } : {}),
  ...(filter.categoryId ? { categoryId: filter.categoryId } : {}),
  ...(filter.classBandId ? { classBandId: filter.classBandId } : {}),
  ...(filter.vizId ? { vizId: filter.vizId } : {}),
  ...(filter.lang ? { lang: filter.lang } : {}),
  ...(filter.kind ? { kind: filter.kind as never } : {}),
});

const search = async (options: {
  query: string;
  filter?: ChunkFilter;
  limit?: number;
}) => {
  const limit = Math.min(Math.max(options.limit ?? 5, 1), 20);
  const { vector, model } = await embedText(options.query);

  // Atlas M0 cannot run $vectorSearch through Prisma, so the skeleton retrieves
  // a metadata-filtered candidate set and ranks it locally. This is the
  // documented fallback in requirements §3.
  const candidates = await prisma.knowledgeChunk.findMany({
    where: buildWhere(options.filter ?? {}),
    take: 500,
    orderBy: { updatedAt: "desc" },
  });

  const ranked = candidates
    .map((chunk) => ({
      id: chunk.id,
      topicId: chunk.topicId,
      chapterId: chunk.chapterId,
      categoryId: chunk.categoryId,
      classBandId: chunk.classBandId,
      vizId: chunk.vizId,
      stepIndex: chunk.stepIndex,
      lang: chunk.lang,
      kind: chunk.kind,
      text: chunk.text,
      score: cosineSimilarity(vector, chunk.embedding),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);

  return { results: ranked, model };
};

const ingestChunk = async (payload: IKnowledgeChunkPayload) => {
  const { vector, model } = await embedText(payload.text);

  return prisma.knowledgeChunk.create({
    data: {
      ...(payload.topicId ? { topicId: payload.topicId } : {}),
      ...(payload.chapterId ? { chapterId: payload.chapterId } : {}),
      ...(payload.categoryId ? { categoryId: payload.categoryId } : {}),
      ...(payload.classBandId ? { classBandId: payload.classBandId } : {}),
      ...(payload.vizId ? { vizId: payload.vizId } : {}),
      ...(payload.stepIndex !== undefined
        ? { stepIndex: payload.stepIndex }
        : {}),
      lang: payload.lang ?? "en",
      text: payload.text,
      embedding: vector,
      embeddingModel: model,
      kind: (payload.kind ?? "CONCEPT") as never,
      contentHash: contentHash(payload.text),
    },
  });
};

/**
 * Rebuilds the chunks for one topic from its summary and lesson blocks.
 * Called by the future publish hook / cron; safe to run repeatedly.
 */
const reindexTopic = async (topicId: string) => {
  const topic = await prisma.topic.findUnique({ where: { id: topicId } });
  if (!topic) {
    throw new AppError(httpStatus.NOT_FOUND, "Topic not found.");
  }

  await prisma.knowledgeChunk.deleteMany({ where: { topicId } });
  await prisma.topic.update({
    where: { id: topicId },
    data: { knowledgeStatus: "INDEXING" },
  });

  const drafts: IKnowledgeChunkPayload[] = [];

  for (const lang of ["en", "bn"] as const) {
    drafts.push({
      topicId,
      chapterId: topic.chapterId,
      categoryId: topic.categoryId,
      classBandId: topic.classBandId,
      lang,
      kind: "CONCEPT",
      text: `${topic.title[lang]}. ${topic.summary[lang]}`,
    });

    for (const block of topic.lesson) {
      const pieces = [
        block.title?.[lang],
        block.body?.[lang],
        block.formula,
        block.audioText?.[lang],
      ].filter(Boolean);

      if (pieces.length === 0) continue;

      drafts.push({
        topicId,
        chapterId: topic.chapterId,
        categoryId: topic.categoryId,
        classBandId: topic.classBandId,
        ...(block.vizId ? { vizId: block.vizId } : {}),
        lang,
        kind: block.type === "formula" ? "FORMULA" : "STEP",
        text: pieces.join(" "),
      });
    }
  }

  const vectors = await embedMany(drafts.map((draft) => draft.text));

  await prisma.knowledgeChunk.createMany({
    data: drafts.map((draft, index) => ({
      ...(draft.topicId ? { topicId: draft.topicId } : {}),
      ...(draft.chapterId ? { chapterId: draft.chapterId } : {}),
      ...(draft.categoryId ? { categoryId: draft.categoryId } : {}),
      ...(draft.classBandId ? { classBandId: draft.classBandId } : {}),
      ...(draft.vizId ? { vizId: draft.vizId } : {}),
      lang: draft.lang ?? "en",
      text: draft.text,
      embedding: vectors[index]?.vector ?? [],
      embeddingModel: vectors[index]?.model ?? "",
      kind: (draft.kind ?? "CONCEPT") as never,
      contentHash: contentHash(draft.text),
    })),
  });

  await prisma.topic.update({
    where: { id: topicId },
    data: { knowledgeStatus: "READY" },
  });

  return { chunks: drafts.length };
};

const listChunks = async (filter: ChunkFilter, limit = 100) =>
  prisma.knowledgeChunk.findMany({
    where: buildWhere(filter),
    orderBy: { updatedAt: "desc" },
    take: Math.min(Math.max(limit, 1), 200),
    select: {
      id: true,
      topicId: true,
      chapterId: true,
      categoryId: true,
      classBandId: true,
      vizId: true,
      stepIndex: true,
      lang: true,
      text: true,
      kind: true,
      embeddingModel: true,
      isActive: true,
      updatedAt: true,
    },
  });

const deleteChunk = async (id: string) => {
  const chunk = await prisma.knowledgeChunk.findUnique({ where: { id } });
  if (!chunk) {
    throw new AppError(httpStatus.NOT_FOUND, "Knowledge chunk not found.");
  }

  await prisma.knowledgeChunk.delete({ where: { id } });
  return null;
};

export const KnowledgeService = {
  search,
  ingestChunk,
  reindexTopic,
  listChunks,
  deleteChunk,
};
