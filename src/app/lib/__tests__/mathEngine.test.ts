import assert from "node:assert/strict";
import { test } from "node:test";
import {
  areEquivalent,
  checkAnswer,
  evaluateNumeric,
  normalizeMathInput,
  round,
  uniqueNumbers,
} from "../mathEngine";

test("normalizeMathInput maps display symbols to operators", () => {
  assert.equal(normalizeMathInput(" 3 × 4 ÷ 2 − 1 "), "3*4/2-1");
  assert.equal(normalizeMathInput("1,000 + 2"), "1000+2");
});

test("evaluateNumeric evaluates safe arithmetic", () => {
  assert.equal(evaluateNumeric("2 + 3 * 4"), 14);
  assert.equal(evaluateNumeric("(2 + 3) * 4"), 20);
  assert.equal(evaluateNumeric("2^3"), 8);
  assert.equal(evaluateNumeric("1/4"), 0.25);
});

test("evaluateNumeric rejects unsafe or invalid input", () => {
  assert.equal(evaluateNumeric(""), null);
  assert.equal(evaluateNumeric("alert(1)"), null);
  assert.equal(evaluateNumeric("2 +"), null);
  assert.equal(evaluateNumeric("x + 1"), null);
});

test("areEquivalent compares values, not spellings", () => {
  assert.equal(areEquivalent("2+3", "5"), true);
  assert.equal(areEquivalent(" 1/2 ", "0.5"), true);
  assert.equal(areEquivalent("4", "5"), false);
  assert.equal(areEquivalent("hello", "HELLO"), true);
});

test("checkAnswer honours numeric and text modes", () => {
  assert.equal(checkAnswer("10", "10", { mode: "numeric" }), true);
  assert.equal(checkAnswer("2*5", "10", { mode: "numeric" }), true);
  assert.equal(checkAnswer("10.0000000001", "10", { mode: "numeric" }), true);
  assert.equal(checkAnswer("abc", "abc", { mode: "text" }), true);
  assert.equal(checkAnswer("ABC", "abc", { mode: "text" }), true);
  assert.equal(checkAnswer("abc", "10", { mode: "numeric" }), false);
});

test("round and uniqueNumbers are stable", () => {
  assert.equal(round(1.23456, 2), 1.23);
  assert.deepEqual(uniqueNumbers([1, 1.0, 2, 2.0000001, 3]), [1, 2, 3]);
});
