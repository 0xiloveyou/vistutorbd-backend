import config from "../config";
import { embedTextsViaOpenRouter } from "./openrouter";

/**
 * Embeddings for the RAG skeleton.
 *
 * - `openrouter` uses the configured free embedding model.
 * - `stub` (default in development) produces a deterministic hashed vector so
 *   the ingestion/retrieval pipeline can run end-to-end without any API key.
 *
 * Swap EMBEDDING_PROVIDER later without touching callers.
 */

const normalize = (vector: number[]) => {
  const norm = Math.sqrt(vector.reduce((sum, value) => sum + value * value, 0));
  return norm === 0 ? vector : vector.map((value) => value / norm);
};

const hashText = (text: string) => {
  let hash = 2166136261;
  for (let index = 0; index < text.length; index += 1) {
    hash ^= text.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
};

export const stubEmbedding = (
  text: string,
  dimensions = config.embedding_dimensions,
) => {
  const vector = new Array<number>(dimensions).fill(0);
  const tokens =
    text
      .toLowerCase()
      .replace(/\s+/g, " ")
      .match(/[\p{L}\p{N}]+/gu) ?? [];

  for (const token of tokens) {
    let hash = hashText(token);
    for (let i = 0; i < 4; i += 1) {
      const slot = hash % dimensions;
      vector[slot] = (vector[slot] ?? 0) + (hash % 2 === 0 ? 1 : -1);
      hash = Math.imul(hash, 2654435761) >>> 0;
    }
  }

  return normalize(vector);
};

export const embedText = async (text: string) => {
  if (config.embedding_provider === "openrouter" && config.openrouter_api_key) {
    const [vector] = await embedTextsViaOpenRouter(text);
    return { vector: vector ?? [], model: config.openrouter_embedding_model };
  }

  return {
    vector: stubEmbedding(text),
    model: "stub-hash-embedding",
  };
};

export const embedMany = async (texts: string[]) => {
  if (texts.length === 0) return [];

  if (config.embedding_provider === "openrouter" && config.openrouter_api_key) {
    const vectors = await embedTextsViaOpenRouter(texts);
    return vectors.map((vector) => ({
      vector,
      model: config.openrouter_embedding_model,
    }));
  }

  return texts.map((text) => ({
    vector: stubEmbedding(text),
    model: "stub-hash-embedding",
  }));
};

export const cosineSimilarity = (a: number[], b: number[]) => {
  const length = Math.min(a.length, b.length);
  if (length === 0) return 0;

  let dot = 0;
  let normA = 0;
  let normB = 0;

  for (let index = 0; index < length; index += 1) {
    const valueA = a[index] ?? 0;
    const valueB = b[index] ?? 0;
    dot += valueA * valueB;
    normA += valueA * valueA;
    normB += valueB * valueB;
  }

  if (normA === 0 || normB === 0) return 0;
  return dot / (Math.sqrt(normA) * Math.sqrt(normB));
};

export const contentHash = (text: string) => hashText(text).toString(16);
