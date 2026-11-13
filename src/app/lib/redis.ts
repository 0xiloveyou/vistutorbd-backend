import { createClient, type RedisClientType } from "redis";
import config from "../config";

type MemoryEntry = { value: string; expiresAt: number };

const memoryStore = new Map<string, MemoryEntry>();

let client: RedisClientType | null = null;
let connected = false;

export const connectRedis = async () => {
  if (!config.redis_url) {
    console.log("[redis] REDIS_URL not set — using in-memory fallback store.");
    return;
  }

  try {
    client = createClient({ url: config.redis_url });
    client.on("error", (error) => {
      console.error("[redis] client error:", error.message);
    });
    await client.connect();
    connected = true;
    console.log("Redis connected successfully.");
  } catch (error) {
    connected = false;
    console.warn(
      "[redis] Could not connect — using in-memory fallback store:",
      error instanceof Error ? error.message : error,
    );
  }
};

const purgeExpired = (key: string) => {
  const entry = memoryStore.get(key);
  if (entry && entry.expiresAt <= Date.now()) {
    memoryStore.delete(key);
    return null;
  }
  return entry ?? null;
};

export const kv = {
  async get(key: string): Promise<string | null> {
    if (connected && client) {
      return client.get(key);
    }
    return purgeExpired(key)?.value ?? null;
  },

  async set(key: string, value: string, ttlSeconds = 300): Promise<void> {
    if (connected && client) {
      await client.set(key, value, { EX: ttlSeconds });
      return;
    }
    memoryStore.set(key, {
      value,
      expiresAt: Date.now() + ttlSeconds * 1000,
    });
  },

  async del(key: string): Promise<void> {
    if (connected && client) {
      await client.del(key);
      return;
    }
    memoryStore.delete(key);
  },

  async incr(key: string, ttlSeconds = 300): Promise<number> {
    if (connected && client) {
      const value = await client.incr(key);
      if (value === 1) {
        await client.expire(key, ttlSeconds);
      }
      return value;
    }

    const existing = purgeExpired(key);
    if (!existing) {
      memoryStore.set(key, {
        value: "1",
        expiresAt: Date.now() + ttlSeconds * 1000,
      });
      return 1;
    }

    const next = Number(existing.value) + 1;
    memoryStore.set(key, {
      value: String(next),
      expiresAt: existing.expiresAt,
    });
    return next;
  },
};

export const redisClient = {
  get isConnected() {
    return connected;
  },
};
