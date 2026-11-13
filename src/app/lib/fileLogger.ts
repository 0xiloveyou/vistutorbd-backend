import { appendFile, mkdir, readFile, readdir, unlink } from "node:fs/promises";
import path from "node:path";

export type LogRecord = {
  level: "success" | "error" | "info";
  event: string;
  timestamp?: string;
  [key: string]: unknown;
};

export type LogCategory = "success" | "error" | "info" | "combined";

const logDirectory = path.resolve(process.cwd(), "logger");
const RETENTION_DAYS = 14;
let lastCleanupDate = "";
const sensitiveKey = /password|authorization|cookie|token|secret|api[-_]?key/i;
const sensitiveText = /(\b(?:password|token|secret|api[-_]?key)\b\s*[:=]\s*)([^\s,;]+)/gi;

const redact = (value: unknown, key = ""): unknown => {
  if (sensitiveKey.test(key)) return "[REDACTED]";
  if (typeof value === "string") return value.replace(sensitiveText, "$1[REDACTED]");
  if (Array.isArray(value)) return value.map((item) => redact(item));
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([childKey, childValue]) => [
        childKey,
        redact(childValue, childKey),
      ]),
    );
  }
  return value;
};

/** Writes one searchable JSON record per line to a category file and the combined file. */
export const writeLog = async (record: LogRecord): Promise<void> => {
  const safeRecord = redact({
    timestamp: new Date().toISOString(),
    ...record,
  }) as LogRecord;
  const line = `${JSON.stringify(safeRecord)}\n`;
  const date = safeRecord.timestamp!.slice(0, 10);
  const fileFor = (category: LogCategory) => `${category}-${date}.txt`;

  // Preserve the event stream even if local disk logging fails.
  console.log(line.trimEnd());

  try {
    await mkdir(logDirectory, { recursive: true });
    await Promise.all([
      appendFile(path.join(logDirectory, fileFor(safeRecord.level)), line, "utf8"),
      appendFile(path.join(logDirectory, fileFor("combined")), line, "utf8"),
    ]);
    if (lastCleanupDate !== date) {
      lastCleanupDate = date;
      const cutoff = new Date(`${date}T00:00:00.000Z`);
      cutoff.setUTCDate(cutoff.getUTCDate() - RETENTION_DAYS);
      const files = await readdir(logDirectory);
      await Promise.all(
        files.map(async (file) => {
          const match = /^(?:success|error|info|combined)-(\d{4}-\d{2}-\d{2})\.txt$/.exec(file);
          if (match && new Date(`${match[1]}T00:00:00.000Z`) < cutoff) {
            await unlink(path.join(logDirectory, file));
          }
        }),
      );
    }
  } catch (error) {
    // Logging must never take down an API request; expose disk errors to server stderr.
    console.error("[file-logger] Could not write a log record:", error);
  }
};

export const readLogs = async (
  category: LogCategory,
  limit: number,
): Promise<LogRecord[]> => {
  try {
    const files = await readdir(logDirectory);
    const matchingFiles = files
      .filter((file) => file.startsWith(`${category}-`) && file.endsWith(".txt"))
      .sort()
      .reverse()
      .slice(0, RETENTION_DAYS);
    const records: LogRecord[] = [];
    for (const file of matchingFiles) {
      const contents = await readFile(path.join(logDirectory, file), "utf8");
      const lines = contents.split(/\r?\n/).filter(Boolean).reverse();
      for (const line of lines) {
        try {
          records.push(JSON.parse(line) as LogRecord);
        } catch {
          // Ignore incomplete or malformed lines and continue returning useful records.
        }
        if (records.length >= limit) return records;
      }
    }
    return records;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return [];
    throw error;
  }
};
