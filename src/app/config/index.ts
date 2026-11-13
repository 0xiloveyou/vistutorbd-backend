import dotenv from "dotenv";
import path from "node:path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

const requiredEnv = (name: string) => {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
};

const redisUrl =
  process.env.REDIS_URL ||
  (process.env.REDIS_HOST
    ? `redis://${process.env.REDIS_USER ? `${process.env.REDIS_USER}:` : ""}${
        process.env.REDIS_PASSWORD ? `${process.env.REDIS_PASSWORD}@` : ""
      }${process.env.REDIS_HOST}:${process.env.REDIS_PORT || 6379}`
    : "");

const csv = (value?: string) =>
  (value || "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

export default {
  node_env: process.env.NODE_ENV || "development",
  port: Number(process.env.PORT || 5000),
  database_url: requiredEnv("DATABASE_URL"),
  auto_seed: process.env.AUTO_SEED !== "false",

  backend_url: process.env.BACKEND_URL || "http://localhost:5000",
  frontend_url: process.env.FRONTEND_URL || "http://localhost:3000",

  bcrypt_salt_rounds: Number(process.env.BCRYPT_SALT_ROUNDS || 10),

  jwt_access_secret: requiredEnv("JWT_ACCESS_SECRET"),
  jwt_refresh_secret: requiredEnv("JWT_REFRESH_SECRET"),
  jwt_access_expires_in: process.env.JWT_ACCESS_EXPIRES_IN || "1d",
  jwt_refresh_expires_in: process.env.JWT_REFRESH_EXPIRES_IN || "7d",

  google_client_id: process.env.GOOGLE_CLIENT_ID || "",
  google_client_secret: process.env.GOOGLE_CLIENT_SECRET || "",
  google_redirect_uri:
    process.env.GOOGLE_REDIRECT_URI ||
    `${process.env.FRONTEND_URL || "http://localhost:3000"}/auth/google/callback`,

  smtp_host: process.env.SMTP_HOST || "",
  smtp_port: Number(process.env.SMTP_PORT || 587),
  smtp_user: process.env.SMTP_USER || "",
  smtp_password: process.env.SMTP_PASSWORD || process.env.SMTP_PASS || "",
  email_sender: process.env.EMAIL_SENDER || process.env.SMTP_USER || "",

  redis_url: redisUrl,
  redis_user: process.env.REDIS_USER || "",
  redis_password: process.env.REDIS_PASSWORD || "",
  redis_host: process.env.REDIS_HOST || "",
  redis_port: Number(process.env.REDIS_PORT || 6379),

  openrouter_api_key: process.env.OPENROUTER_API_KEY || "",
  openrouter_chat_models: csv(
    process.env.OPENROUTER_CHAT_MODELS || process.env.OPENROUTER_CHAT_MODEL,
  ),
  openrouter_fallback_chat_models: csv(
    process.env.OPENROUTER_FALLBACK_CHAT_MODELS,
  ),
  openrouter_vision_model: process.env.OPENROUTER_VISION_MODEL || "",
  openrouter_fallback_vision_models: csv(
    process.env.OPENROUTER_FALLBACK_VISION_MODELS,
  ),
  openrouter_embedding_model:
    process.env.OPENROUTER_EMBEDDING_MODEL ||
    process.env.EMBEDDING_MODEL ||
    "nvidia/nemotron-3-embed-1b:free",

  // Free text-to-speech (OpenRouter /audio/speech). The primary model handles
  // English; Bangla uses the browser's built-in voice from the client.
  openrouter_tts_models: csv(
    process.env.OPENROUTER_TTS_MODELS ||
      process.env.OPENROUTER_TTS_MODEL ||
      "fish-audio/s2.1-pro-free:free",
  ),
  openrouter_fallback_tts_models: csv(
    process.env.OPENROUTER_FALLBACK_TTS_MODELS ||
      "heygen/heygen-voice-1-turbo:free",
  ),
  openrouter_tts_voice: process.env.OPENROUTER_TTS_VOICE || "",
  // Appends the OpenRouter auto-router to the chat chain so a free model is
  // still tried when every explicitly configured model is unavailable.
  openrouter_free_router_fallback:
    (process.env.OPENROUTER_FREE_ROUTER_FALLBACK || "true") !== "false",
  embedding_provider: process.env.EMBEDDING_PROVIDER || "stub", // openrouter | local | stub
  embedding_dimensions: Number(process.env.EMBEDDING_DIMENSIONS || 384),

  chat_rate_limit_per_hour: Number(process.env.CHAT_RATE_LIMIT_PER_HOUR || 30),

  // Visitor analytics + the six-hour email report.
  visitor_report_cron: process.env.VISITOR_REPORT_CRON || "0 */6 * * *",
  report_timezone: process.env.REPORT_TIMEZONE || "Asia/Dhaka",
  contact_email:
    process.env.CONTACT_EMAIL ||
    process.env.ADMIN_EMAIL ||
    "care.1337.leet@gmail.com",

  admin_name: process.env.ADMIN_NAME || "Math Admin",
  admin_email: process.env.ADMIN_EMAIL || "admin@mathlearn.local",
  admin_password: process.env.ADMIN_PASSWORD || "Admin@12345",

  moderator_name: process.env.MODERATOR_NAME || "Math Moderator",
  moderator_emails: csv(process.env.MODERATOR_EMAIL),
  moderator_password: process.env.MODERATOR_PASSWORD || "@9.",

  user_name: process.env.USER_NAME || "Demo Learner",
  user_email: process.env.USER_EMAIL || "user@mathlearn.local",
  user_password: process.env.USER_PASSWORD || "User@12345",

  legacy_json_dir:
    process.env.LEGACY_JSON_DIR || "./reference-data/legacy-json",
};
