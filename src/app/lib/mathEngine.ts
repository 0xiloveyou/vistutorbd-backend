import { all, create } from "mathjs";

/**
 * Small, safe math engine for generated questions.
 * It never trusts an LLM for arithmetic: every numeric answer is checked here.
 */

const math = create(all, {});

const ALLOWED_EXPRESSION = /^[0-9+\-*/^().\s%]*$/;
const TOLERANCE = 1e-9;

export const normalizeMathInput = (input: string) =>
  input
    .trim()
    .replace(/[×✕]/g, "*")
    .replace(/[÷]/g, "/")
    .replace(/[−–—]/g, "-")
    .replace(/,/g, "")
    .replace(/\s+/g, "");

export const evaluateNumeric = (input: string): number | null => {
  const normalized = normalizeMathInput(input);

  if (!normalized || normalized.length > 120) return null;
  if (!ALLOWED_EXPRESSION.test(normalized)) return null;

  try {
    const value = math.evaluate(normalized);
    return typeof value === "number" && Number.isFinite(value) ? value : null;
  } catch {
    return null;
  }
};

export const areEquivalent = (submitted: string, expected: string) => {
  const expectedNumber = evaluateNumeric(expected);
  const submittedNumber = evaluateNumeric(submitted);

  if (expectedNumber !== null && submittedNumber !== null) {
    return Math.abs(expectedNumber - submittedNumber) <= TOLERANCE;
  }

  return submitted.trim().toLowerCase() === expected.trim().toLowerCase();
};

export type AnswerCheckRule = {
  mode: "numeric" | "text";
  tolerance?: number;
};

export const checkAnswer = (
  submitted: string,
  expected: string,
  rule: AnswerCheckRule = { mode: "numeric" },
) => {
  if (rule.mode === "text") {
    return submitted.trim().toLowerCase() === expected.trim().toLowerCase();
  }

  const expectedNumber = evaluateNumeric(expected);
  const submittedNumber = evaluateNumeric(submitted);

  if (expectedNumber === null || submittedNumber === null) return false;

  return (
    Math.abs(expectedNumber - submittedNumber) <= (rule.tolerance ?? TOLERANCE)
  );
};

export const round = (value: number, decimals = 2) => {
  const factor = 10 ** decimals;
  return Math.round(value * factor) / factor;
};

export const uniqueNumbers = (values: number[]) => {
  const seen = new Set<string>();
  return values.filter((value) => {
    const key = round(value, 6).toString();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
};
