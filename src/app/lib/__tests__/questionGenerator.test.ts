import assert from "node:assert/strict";
import { test } from "node:test";
import { checkAnswer } from "../mathEngine";
import {
  GENERATOR_KEYS,
  generateQuestion,
  generateQuestionSet,
  isGeneratorKey,
} from "../questionGenerator";

test("isGeneratorKey recognises registered generators only", () => {
  assert.equal(isGeneratorKey("addition.singleDigit"), true);
  assert.equal(isGeneratorKey("division.unknown"), false);
});

test("every registered generator produces a valid question", () => {
  for (const generator of GENERATOR_KEYS) {
    const question = generateQuestion({
      generator,
      seed: `${generator}-fixed-seed`,
      mode: "MCQ",
    });

    assert.equal(question.templateKey, generator);
    assert.match(question.prompt.en, /\?/);
    assert.ok(question.prompt.bn.length > 0);
    assert.ok(question.explanation.en.length > 0);
    assert.equal(question.options.length, 4);
    assert.equal(
      question.options.filter((option) => option.correct).length,
      1,
      `${generator} must have exactly one correct option`,
    );

    const correct = question.options.find((option) => option.correct);
    assert.ok(correct);
    assert.equal(checkAnswer(correct.label.en, question.answer), true);
    assert.equal(checkAnswer(question.answer, question.answer), true);
  }
});

test("generation is deterministic for a given seed", () => {
  const first = generateQuestion({
    generator: "addition.twoDigit",
    seed: "deterministic-seed",
  });
  const second = generateQuestion({
    generator: "addition.twoDigit",
    seed: "deterministic-seed",
  });

  assert.deepEqual(first, second);
});

test("different seeds change the numbers", () => {
  const prompts = new Set(
    Array.from(
      { length: 12 },
      (_, index) =>
        generateQuestion({
          generator: "addition.singleDigit",
          seed: `seed-${index}`,
        }).prompt.en,
    ),
  );

  assert.ok(prompts.size > 1);
});

test("TYPED questions omit options but keep the answer", () => {
  const question = generateQuestion({
    generator: "multiplication.singleDigit",
    seed: "typed-seed",
    mode: "TYPED",
  });

  assert.deepEqual(question.options, []);
  assert.equal(question.mode, "TYPED");
  assert.ok(question.answer.length > 0);
});

test("generateQuestionSet respects the count and seed prefix", () => {
  const set = generateQuestionSet({
    generator: "addition.singleDigit",
    count: 5,
    seed: "set-seed",
  });

  assert.equal(set.length, 5);
  assert.ok(set.every((question) => question.seed.startsWith("set-seed-")));
  assert.equal(new Set(set.map((question) => question.id)).size, 5);
});
