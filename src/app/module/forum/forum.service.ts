import httpStatus from "http-status";
import { prisma } from "../../lib/prisma";
import { AppError } from "../../utils/AppError";
import type { RequestUser } from "../../middleware/checkAuth";
import { ChatService } from "../chat/chat.service";
import { FORUM_PREDEFINED_TAGS } from "./forum.tags";

const PUBLISHED = "PUBLISHED";
const MAX_COMMENTS_PER_POST = 50;

type ForumPostRecord = {
  id: string;
  authorName: string;
  isAnonymous: boolean;
  title: string;
  body: string;
  imageUrl: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
};

type ForumCommentRecord = {
  id: string;
  authorName: string;
  isAnonymous: boolean;
  body: string;
  createdAt: Date;
};

const serializeComment = (comment: ForumCommentRecord) => ({
  id: comment.id,
  author: comment.isAnonymous ? "Anonymous" : comment.authorName,
  isAnonymous: comment.isAnonymous,
  body: comment.body,
  createdAt: comment.createdAt,
});

const serializePost = (
  post: ForumPostRecord,
  comments: ForumCommentRecord[] = [],
) => ({
  id: post.id,
  author: post.isAnonymous ? "Anonymous" : post.authorName,
  isAnonymous: post.isAnonymous,
  title: post.title,
  body: post.body,
  imageUrl: post.imageUrl,
  tags: post.tags,
  createdAt: post.createdAt,
  updatedAt: post.updatedAt,
  comments: comments.map(serializeComment),
  commentCount: comments.length,
});

/**
 * Tags are normalised so "Matrix", "matrix " and "MATRIX" collapse into one
 * filter. Bengali letters and digits are kept; everything else is stripped.
 */
const normalizeTags = (tags: string[] = []) => {
  const seen = new Set<string>();
  const result: string[] = [];

  for (const raw of tags) {
    const tag = raw
      .trim()
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\p{L}\p{N}-]/gu, "")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");

    if (!tag || seen.has(tag)) continue;
    seen.add(tag);
    result.push(tag);
  }

  return result.slice(0, 6);
};

const resolveAuthor = (
  isAnonymous: boolean,
  user: RequestUser | undefined,
): { authorId?: string; authorName: string; isAnonymous: boolean } => {
  // Keep the real author id for moderation, but never expose it in responses.
  return {
    ...(user ? { authorId: user.userId } : {}),
    authorName: isAnonymous || !user ? "Anonymous" : user.name,
    isAnonymous: isAnonymous || !user,
  };
};

const listPosts = async (options: {
  tag?: string;
  sort?: string;
  page?: number;
  limit?: number;
}) => {
  const page = Math.max(1, options.page ?? 1);
  const limit = Math.min(50, Math.max(1, options.limit ?? 20));
  const where = {
    status: PUBLISHED,
    ...(options.tag ? { tags: { has: options.tag.toLowerCase() } } : {}),
  };

  const [total, posts] = await Promise.all([
    prisma.forumPost.count({ where }),
    prisma.forumPost.findMany({
      where,
      orderBy: { createdAt: options.sort === "old" ? "asc" : "desc" },
      skip: (page - 1) * limit,
      take: limit,
    }),
  ]);

  const comments = posts.length
    ? await prisma.forumComment.findMany({
        where: { postId: { in: posts.map((post) => post.id) } },
        orderBy: { createdAt: "asc" },
      })
    : [];

  const byPost = new Map<string, ForumCommentRecord[]>();
  for (const comment of comments) {
    const bucket = byPost.get(comment.postId) ?? [];
    if (bucket.length < MAX_COMMENTS_PER_POST) bucket.push(comment);
    byPost.set(comment.postId, bucket);
  }

  return {
    posts: posts.map((post) => serializePost(post, byPost.get(post.id) ?? [])),
    meta: {
      page,
      limit,
      total,
      totalPages: Math.max(1, Math.ceil(total / limit)),
    },
  };
};

const getPost = async (id: string) => {
  const post = await prisma.forumPost.findUnique({ where: { id } });

  if (!post || post.status !== PUBLISHED) {
    throw new AppError(httpStatus.NOT_FOUND, "Forum post not found.");
  }

  const comments = await prisma.forumComment.findMany({
    where: { postId: id },
    orderBy: { createdAt: "asc" },
    take: MAX_COMMENTS_PER_POST,
  });

  return serializePost(post, comments);
};

const createPost = async (
  payload: {
    title: string;
    body: string;
    imageUrl?: string;
    tags?: string[];
    isAnonymous?: boolean;
  },
  user?: RequestUser,
) => {
  const author = resolveAuthor(Boolean(payload.isAnonymous), user);

  const post = await prisma.forumPost.create({
    data: {
      ...author,
      title: payload.title.trim(),
      body: payload.body.trim(),
      imageUrl: payload.imageUrl?.trim() ?? "",
      tags: normalizeTags(payload.tags),
    },
  });

  return serializePost(post);
};

const createComment = async (
  postId: string,
  payload: { body: string; isAnonymous?: boolean },
  user?: RequestUser,
) => {
  const post = await prisma.forumPost.findUnique({ where: { id: postId } });

  if (!post || post.status !== PUBLISHED) {
    throw new AppError(httpStatus.NOT_FOUND, "Forum post not found.");
  }

  const author = resolveAuthor(Boolean(payload.isAnonymous), user);

  const comment = await prisma.forumComment.create({
    data: {
      postId,
      ...author,
      body: payload.body.trim(),
    },
  });

  return serializeComment(comment);
};

/**
 * Sends a forum question to the same grounded companion used by the chat panel.
 * Guests are allowed; the answer is returned inline and not persisted on the post.
 */
const askAi = async (
  postId: string,
  payload: { lang?: "en" | "bn"; classBandId?: string },
  user?: RequestUser,
) => {
  const post = await prisma.forumPost.findUnique({ where: { id: postId } });

  if (!post || post.status !== PUBLISHED) {
    throw new AppError(httpStatus.NOT_FOUND, "Forum post not found.");
  }

  const question = [post.title, post.body].filter(Boolean).join("\n\n");

  const result = await ChatService.ask(
    {
      question,
      lang: payload.lang ?? "en",
      ...(payload.classBandId ? { classBandId: payload.classBandId } : {}),
    },
    user?.userId,
  );

  return {
    answer: result.answer,
    grounded: result.grounded,
    provider: result.provider,
    sources: result.sources,
    sessionId: result.sessionId,
  };
};

const listTags = async () => {
  const recent = await prisma.forumPost.findMany({
    where: { status: PUBLISHED },
    orderBy: { createdAt: "desc" },
    take: 200,
    select: { tags: true },
  });

  const counts = new Map<string, number>();
  for (const post of recent) {
    for (const tag of post.tags) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
  }

  const popular = [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 12)
    .map(([id, count]) => ({ id, count }));

  return { predefined: FORUM_PREDEFINED_TAGS, popular };
};

export const ForumService = {
  listPosts,
  getPost,
  createPost,
  createComment,
  askAi,
  listTags,
};
