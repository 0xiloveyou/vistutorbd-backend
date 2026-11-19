import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import {
  GENERATED_VIZ_ROOT,
  validateVisualizationHtml,
} from "../utils/library-sync";

const walk = async (dir: string): Promise<string[]> => {
  const entries = await readdir(dir, { withFileTypes: true });
  const files: string[] = [];

  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...(await walk(full)));
    else if (entry.isFile() && entry.name.endsWith(".html")) files.push(full);
  }

  return files;
};

const main = async () => {
  let files: string[];

  try {
    files = await walk(GENERATED_VIZ_ROOT);
  } catch {
    console.log("[validate] No generated-visualizations folder yet.");
    return;
  }

  if (!files.length) {
    console.log("[validate] No chapter visualizations to check.");
    return;
  }

  let failed = 0;

  for (const file of files) {
    const relative = path.relative(process.cwd(), file);
    try {
      validateVisualizationHtml(await readFile(file, "utf8"), relative);
      console.log(`[validate] ok ${relative}`);
    } catch (error) {
      failed += 1;
      console.error(
        `[validate] FAIL ${relative}: ${error instanceof Error ? error.message : error}`,
      );
    }
  }

  if (failed) {
    console.error(`[validate] ${failed} file(s) break the mandatory art rules.`);
    process.exitCode = 1;
  } else {
    console.log(`[validate] ${files.length} file(s) pass the mandatory art rules.`);
  }
};

main();
