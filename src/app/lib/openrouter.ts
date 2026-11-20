import config from "../config";
import { AppError } from "../utils/AppError";

const OPENROUTER_BASE_URL = "https://openrouter.ai/api/v1";
const REQUEST_TIMEOUT_MS = 45_000;
// Never keep a learner waiting through the whole fallback chain twice over.
const CHAT_BUDGET_MS = 75_000;

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

  // `openrouter/free` is a router that always resolves to an available free
  // model, so it is a safe final fallback when every pinned free model is down.
  if (config.openrouter_free_router_fallback) {
    models.push("openrouter/free");
  }

  return [...new Set(models)];
};

const requestCompletion = async (options: {
  model: string;
  messages: ChatMessage[];
  temperature?: number;
  maxTokens?: number;
  timeoutMs?: number;
}) => {
  const response = await fetch(`${OPENROUTER_BASE_URL}/chat/completions`, {
    method: "POST",
    headers: headers(),
    signal: AbortSignal.timeout(options.timeoutMs ?? REQUEST_TIMEOUT_MS),
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
  const startedAt = Date.now();

  for (const model of chain) {
    const remaining = CHAT_BUDGET_MS - (Date.now() - startedAt);
    if (remaining < 5_000) {
      failures.push("chat time budget exhausted before this model ran");
      break;
    }

    try {
      return await requestCompletion({
        model,
        messages: options.messages,
        temperature: options.temperature,
        maxTokens: options.maxTokens,
        timeoutMs: Math.min(REQUEST_TIMEOUT_MS, remaining),
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

const speechModelChain = () => {
  const models = [
    ...config.openrouter_tts_models,
    ...config.openrouter_fallback_tts_models,
  ].filter(Boolean);

  return [...new Set(models)];
};

/**
 * HeyGen requires one of its named voices; Fish Audio works with its default
 * voice. Unknown models get no voice and use their provider default.
 */
const speechVoiceForModel = (model: string) => {
  if (!config.openrouter_tts_voice) return undefined;
  if (model.startsWith("heygen/")) return config.openrouter_tts_voice;
  return undefined;
};

const readSpeechError = async (response: Response) => {
  try {
    const data = (await response.json()) as ChatResponse;
    return (
      data.error?.message ||
      `OpenRouter speech request failed (${response.status}).`
    );
  } catch {
    return `OpenRouter speech request failed (${response.status}).`;
  }
};

const requestSpeech = async (options: {
  model: string;
  text: string;
  format?: string;
}) => {
  const voice = speechVoiceForModel(options.model);
  const response = await fetch(`${OPENROUTER_BASE_URL}/audio/speech`, {
    method: "POST",
    headers: headers(),
    signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    body: JSON.stringify({
      model: options.model,
      input: options.text,
      response_format: options.format ?? "mp3",
      ...(voice ? { voice } : {}),
    }),
  });

  const contentType = response.headers.get("content-type") || "";

  if (!response.ok || contentType.includes("application/json")) {
    const message = await readSpeechError(response);
    throw new Error(message);
  }

  const audio = Buffer.from(await response.arrayBuffer());

  // Some free models answer with a tiny silent frame instead of an error when
  // they cannot speak the requested language.
  if (audio.length < 1200) {
    throw new Error("OpenRouter returned empty speech audio.");
  }

  return {
    audio,
    contentType: contentType || "audio/mpeg",
    model: options.model,
  };
};

/**
 * Free text-to-speech via OpenRouter's OpenAI-compatible /audio/speech route.
 * Tries OPENROUTER_TTS_MODELS first, then OPENROUTER_FALLBACK_TTS_MODELS.
 */
export const speechCompletion = async (options: {
  text: string;
  lang?: "en" | "bn";
  format?: string;
}) => {
  if (!config.openrouter_api_key) {
    throw new AppError(
      503,
      "OPENROUTER_API_KEY is not configured on the backend.",
    );
  }

  const chain = speechModelChain();

  if (chain.length === 0) {
    throw new AppError(
      503,
      "No OpenRouter speech models are configured. Set OPENROUTER_TTS_MODELS.",
    );
  }

  const failures: string[] = [];

  for (const model of chain) {
    try {
      return await requestSpeech({
        model,
        text: options.text,
        format: options.format,
      });
    } catch (error) {
      failures.push(
        `${model}: ${error instanceof Error ? error.message : "unknown error"}`,
      );
    }
  }

  console.error("[openrouter] all speech models failed:", failures);
  throw new AppError(
    502,
    config.node_env === "development"
      ? `Voice is temporarily unavailable: ${failures.join(" | ")}`
      : "Voice is temporarily unavailable. Please try again in a moment.",
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
