import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import test from "node:test";
import { NEXT_PLAN_ACTIVITIES } from "../../content/next-plan/activities";
import { NEXT_PLAN_CAROUSEL_SEEDS } from "../../content/next-plan/carousels";
import { MERGED_CATALOG } from "../../content/next-plan/catalog";
import { GROUP_ORDER } from "../../content/next-plan/groups";

const CAROUSEL_DIR = path.join(
  process.cwd(),
  "src",
  "app",
  "content",
  "carousels",
);

test("next-plan builds one game, visual and Q&A for every group", () => {
  assert.equal(NEXT_PLAN_ACTIVITIES.length, 15);
  assert.deepEqual(
    [...new Set(NEXT_PLAN_ACTIVITIES.map((activity) => activity.kind))].sort(),
    ["GAME", "QUESTION", "VISUAL"],
  );

  for (const group of GROUP_ORDER) {
    const kinds = new Set(
      NEXT_PLAN_ACTIVITIES.filter((activity) => activity.group === group).map(
        (activity) => activity.kind,
      ),
    );
    assert.deepEqual([...kinds].sort(), ["GAME", "QUESTION", "VISUAL"]);
  }

  assert.equal(
    new Set(NEXT_PLAN_ACTIVITIES.map((activity) => activity.slug)).size,
    15,
  );
  assert.equal(
    new Set(NEXT_PLAN_ACTIVITIES.map((activity) => activity.file)).size,
    15,
  );

  for (const activity of NEXT_PLAN_ACTIVITIES) {
    assert.equal(activity.defaultStyle, "robot");
    assert.ok(activity.ideas.length > 0, `${activity.slug} cites an idea row`);
    assert.ok(
      activity.concepts.length > 0,
      `${activity.slug} cites a concept card`,
    );
  }
});

test("next-plan carousel seeds map visuals to explanations", () => {
  assert.equal(NEXT_PLAN_CAROUSEL_SEEDS.length, 15);

  for (const seed of NEXT_PLAN_CAROUSEL_SEEDS) {
    const activity = NEXT_PLAN_ACTIVITIES.find(
      (item) => item.slug === seed.slug,
    );
    assert.ok(activity, `${seed.slug} has an activity`);
    assert.equal(seed.file, activity.file);
    assert.equal(
      seed.kind,
      activity.kind === "VISUAL" ? "EXPLANATION" : "QUESTION",
    );
    assert.ok(seed.classLevelIds.length > 0);
    assert.ok(seed.classBandIds.length > 0);
    assert.ok(seed.order >= 111 && seed.order < 200);
  }
});

test("every activity points at real concept cards and idea rows", () => {
  const conceptIds = new Set(
    MERGED_CATALOG.conceptCards.map((card) => card.id),
  );
  const ideaCodes = new Set(MERGED_CATALOG.ideaBank.map((row) => row.code));

  for (const activity of NEXT_PLAN_ACTIVITIES) {
    for (const concept of activity.concepts) {
      assert.ok(conceptIds.has(concept), `${activity.slug} cites ${concept}`);
    }
    for (const idea of activity.ideas) {
      assert.ok(ideaCodes.has(idea), `${activity.slug} cites ${idea}`);
    }
  }
});

test("every generated carousel carries its activity and Bolt", () => {
  for (const activity of NEXT_PLAN_ACTIVITIES) {
    const html = readFileSync(path.join(CAROUSEL_DIR, activity.file), "utf8");
    assert.match(html, /window\.__NEXT_PLAN__/, activity.file);
    assert.match(html, /id="robot"/, activity.file);
    assert.match(html, /id="rsvg"/, activity.file);
    assert.ok(
      html.includes(`"slug":"${activity.slug}"`),
      `${activity.file} embeds its slug`,
    );
  }
});
