import config from "../config";
import { AppError } from "../utils/AppError";

const OPENROUTER_BASE_URL = "https://openrouter.ai/api/v1";
const REQUEST_TIMEOUT_MS = 45_000;

export type ChatMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};

type ChatResponse = {
  choices?: { message?: { content?: string } }[];
  error?: { message?: string };
};

const headers = () => ({
  Authorization: `Bearer ${config.openrouter_api_key}`,
  "Content-Type": "application/json",
  "HTTP-Referer": config.frontend_url,
  "X-Title": "Math Learning Platform",
});

const chatModelChain = () => {
  const models = [
    ...config.openrouter_chat_models,
    ...config.openrouter_fallback_chat_models,
  ].filter(Boolean);

  return [...new Set(models)];
};

const requestCompletion = async (options: {
  model: string;
  messages: ChatMessage[];
  temperature?: number;
  maxTokens?: number;
}) => {
  const response = await fetch(`${OPENROUTER_BASE_URL}/chat/completions`, {
    method: "POST",
    headers: headers(),
    signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    body: JSON.stringify({
      model: options.model,
      messages: options.messages,
      temperature: options.temperature ?? 0.2,
      max_tokens: options.maxTokens ?? 900,
    }),
  });

  const data = (await response.json()) as ChatResponse;

  if (!response.ok) {
    throw new Error(
      data.error?.message || `OpenRouter request failed (${response.status}).`,
    );
  }

  const content = data.choices?.[0]?.message?.content;
  if (!content) {
    throw new Error("OpenRouter returned an empty completion.");
  }

  return content;
};

/**
 * Tries the configured free models in order. Free model availability changes
 * frequently, so the chain is entirely env-driven (never hard-coded).
 */
export const chatCompletion = async (options: {
  messages: ChatMessage[];
  temperature?: number;
  model?: string;
  maxTokens?: number;
}) => {
  if (!config.openrouter_api_key) {
    throw new AppError(
      503,
      "OPENROUTER_API_KEY is not configured on the backend.",
    );
  }

  const chain = options.model
    ? [options.model, ...chatModelChain().filter((m) => m !== options.model)]
    : chatModelChain();

  if (chain.length === 0) {
    throw new AppError(
      503,
      "No OpenRouter chat models are configured. Set OPENROUTER_CHAT_MODELS.",
    );
  }

  const failures: string[] = [];

  for (const model of chain) {
    try {
      return await requestCompletion({
        model,
        messages: options.messages,
        temperature: options.temperature,
        maxTokens: options.maxTokens,
      });
    } catch (error) {
      failures.push(
        `${model}: ${error instanceof Error ? error.message : "unknown error"}`,
      );
    }
  }

  console.error("[openrouter] all chat models failed:", failures);
  throw new AppError(
    502,
    "All AI models are busy right now. Please try again in a moment.",
  );
};

const visionModelChain = () => {
  const models = [
    config.openrouter_vision_model,
    ...config.openrouter_fallback_vision_models,
  ].filter(Boolean);

  return [...new Set(models)];
};

const requestVisionCompletion = async (options: {
  model: string;
  prompt: string;
  imageDataUrl: string;
  temperature?: number;
}) => {
  const response = await fetch(`${OPENROUTER_BASE_URL}/chat/completions`, {
    method: "POST",
    headers: headers(),
    signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    body: JSON.stringify({
      model: options.model,
      temperature: options.temperature ?? 0.1,
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: options.prompt },
            { type: "image_url", image_url: { url: options.imageDataUrl } },
          ],
        },
      ],
    }),
  });

  const data = (await response.json()) as ChatResponse;

  if (!response.ok) {
    throw new AppError(
      response.status,
      data.error?.message || "OpenRouter vision request failed.",
    );
  }

  const content = data.choices?.[0]?.message?.content;
  if (!content) {
    throw new AppError(502, "OpenRouter returned an empty vision response.");
  }

  return content;
};

/**
 * Vision helper for the photo-of-a-problem flow. Tries OPENROUTER_VISION_MODEL
 * first, then OPENROUTER_FALLBACK_VISION_MODELS in order.
 */
export const visionCompletion = async (options: {
  prompt: string;
  imageDataUrl: string;
  temperature?: number;
}) => {
  if (!config.openrouter_api_key) {
    throw new AppError(
      503,
      "OPENROUTER_API_KEY is not configured on the backend.",
    );
  }

  const chain = visionModelChain();

  if (chain.length === 0) {
    throw new AppError(
      503,
      "OPENROUTER_VISION_MODEL is not configured. Photo uploads are disabled.",
    );
  }

  const failures: string[] = [];

  for (const model of chain) {
    try {
      return await requestVisionCompletion({
        model,
        prompt: options.prompt,
        imageDataUrl: options.imageDataUrl,
        temperature: options.temperature,
      });
    } catch (error) {
      failures.push(
        `${model}: ${error instanceof Error ? error.message : "unknown error"}`,
      );
    }
  }

  console.error("[openrouter] all vision models failed:", failures);
  throw new AppError(
    502,
    "All AI vision models are busy right now. Please try again in a moment.",
  );
};

type EmbeddingResponse = {
  data: { embedding: number[]; index: number }[];
  error?: { message?: string };
};

export const embedTextsViaOpenRouter = async (input: string | string[]) => {
  const response = await fetch(`${OPENROUTER_BASE_URL}/embeddings`, {
    method: "POST",
    headers: headers(),
    signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    body: JSON.stringify({
      model: config.openrouter_embedding_model,
      input: Array.isArray(input) ? input : [input],
      encoding_format: "float",
    }),
  });

  const data = (await response.json()) as EmbeddingResponse;

  if (!response.ok) {
    throw new AppError(
      response.status,
      data.error?.message || "OpenRouter embedding request failed.",
    );
  }

  return data.data
    .sort((a, b) => a.index - b.index)
    .map((item) => item.embedding);
};
