import {
  L,
  S,
  type PlayStep,
  type PlayVisualizationDef,
} from "../play/play.types";

const V = (
  slug: string,
  chapterCode: string,
  en: string,
  bn: string,
  renderer: string,
  engine: string,
  data: Record<string, unknown>,
  steps: PlayStep[],
  difficulty = 1,
): PlayVisualizationDef => ({
  slug,
  chapterCode,
  title: L(en, bn),
  summary: L(en, bn),
  renderer,
  engine,
  kind: "STEPPER",
  tags: [chapterCode],
  concepts: [en],
  difficulty,
  data,
  steps,
  aiContext: `${chapterCode}: ${en}`,
});

export const CLASS1_CATALOG_VISUALIZATIONS: PlayVisualizationDef[] = [
  V("order-three-to-five", "c1.01", "Order three to five objects", "তিন থেকে পাঁচটি বস্তু সাজাও", "shape-canvas", "shapeCanvas", { items: ["pencil", "crayon", "brush"], mode: "order-length" }, [
    S("Line up the three sticks from shortest to longest.", "তিনটি কাঠি ছোট থেকে বড় ক্রমে সাজাও।", { order: [1, 2, 3] }),
    S("The shortest is first and the longest is last.", "সবচেয়ে ছোটটি প্রথমে আর সবচেয়ে বড়টি শেষে।", { first: "shortest", last: "longest" }),
  ], 2),
  V("compare-misconception", "c1.01", "Compare after lining up starts", "শুরু মিলিয়ে তুলনা", "shape-canvas", "shapeCanvas", { mode: "misconception", startAligned: false }, [
    S("The top line looks longer only because it starts further right.", "উপরের রেখাটি বেশি ডান থেকে শুরু হওয়ায় লম্বা দেখায়।", { aligned: false }),
    S("Move both starts to the same point: the lines are equal.", "দুই শুরু একই বিন্দুতে আনো: রেখা দুটি সমান।", { aligned: true }),
  ], 2),
  V("compare-in-life", "c1.01", "Compare heights in life", "জীবনে উচ্চতা তুলনা", "story-scene", "storyScene", { scene: "family", people: [{ name: "father", height: 170 }, { name: "child", height: 120 }] }, [
    S("Father is 170 cm tall and the child is 120 cm.", "বাবার উচ্চতা ১৭০ সেমি আর শিশুর ১২০ সেমি।", { father: 170, child: 120 }),
    S("170 > 120, so the father is taller.", "১৭০ > ১২০, তাই বাবা লম্বা।", { symbol: ">" }),
  ]),

  V("count-and-write", "c1.02", "Count and write the numeral", "গুনে অঙ্ক লেখো", "number-grid", "numberGrid", { min: 1, max: 10, mode: "count-write", count: 6 }, [
    S("Count the six apples one by one.", "ছয়টি আপেল একে একে গোনো।", { count: 6 }),
    S("Write the numeral 6 for six objects.", "ছয়টি বস্তুর জন্য ৬ লেখো।", { numeral: 6 }),
  ]),
  V("group-by-fives", "c1.02", "Group by fives", "পাঁচে পাঁচে দল বাঁধো", "object-counting", "objectCounting", { total: 15, group: 5, emoji: "🔵", mode: "group-fives" }, [
    S("Make groups of five from 15 counters.", "১৫টি কাউন্টার থেকে পাঁচে পাঁচে দল বানাও।", { groups: 3, size: 5 }),
    S("Three groups of five make 15.", "পাঁচের তিনটি দল মিলে ১৫।", { total: 15 }, "3 \\times 5 = 15"),
  ], 2),
  V("tally-marks", "c1.02", "Tally marks", "ট্যালি দাগ", "chart", "chart", { mode: "tally", counts: [5, 7, 3] }, [
    S("Four upright marks with one across make five.", "চারটি খাড়া দাগের ওপর একটি আড়াআড়ি দাগ মিলে পাঁচ।", { marks: 5 }),
    S("Two groups of five plus two marks show 12.", "পাঁচের দুই দল আর দুই দাগ মিলে ১২ দেখায়।", { marks: 12 }),
  ], 2),

  V("ten-frame-build", "c1.03", "Build in a ten-frame", "দশের ফ্রেমে বানাও", "ten-frame", "tenFrame", { target: 7, cells: 10, mode: "build" }, [
    S("Fill the ten-frame with 7 counters.", "দশের ফ্রেমে ৭টি কাউন্টার ভরো।", { filled: 7 }),
    S("Five in the top row and two in the bottom row make 7.", "উপরের সারিতে ৫ আর নিচের সারিতে ২ মিলে ৭।", { top: 5, bottom: 2 }),
  ]),
  V("number-line-0-10", "c1.03", "Number line 0 to 10", "সংখ্যারেখা ০ থেকে ১০", "number-line", "numberLine", { min: 0, max: 10, mode: "frog", target: 6 }, [
    S("The frog starts at 0 and jumps to 6.", "ব্যাঙ ০ থেকে শুরু করে ৬-এ লাফ দেয়।", { start: 0, target: 6 }),
    S("Six jumps of one land on 6.", "একের ছয়টি লাফে ৬-এ পৌঁছায়।", { jumps: 6 }),
  ]),
  V("number-bonds-10", "c1.03", "Number bonds of 10", "১০-এর সংখ্যা বন্ধন", "tape-diagram", "tapeDiagram", { whole: 10, parts: [3, 7], mode: "bonds" }, [
    S("The whole is 10 and one part is 3.", "সম্পূর্ণ ১০ আর একটি অংশ ৩।", { whole: 10, part: 3 }),
    S("The other part is 10 − 3 = 7.", "অন্য অংশটি ১০ − ৩ = ৭।", { part: 7 }),
  ], 2),
  V("read-write-words", "c1.03", "Read and write number words", "সংখ্যার নাম পড়ো ও লেখো", "number-grid", "numberGrid", { min: 1, max: 10, mode: "words", value: 4 }, [
    S("The numeral 4 is written as “four”.", "৪ অঙ্কটি লেখা হয় “চার”।", { numeral: 4, word: "four" }),
    S("Match each numeral with its word and picture.", "প্রতিটি অঙ্ককে তার নাম ও ছবির সঙ্গে মেলাও।", { value: 4 }),
  ]),

  V("birds-on-tree-add", "c1.04", "Birds join on a tree", "গাছে পাখি যোগ", "story-scene", "storyScene", { scene: "tree", birds: 3, arriving: 2, mode: "add" }, [
    S("Three birds sit on the tree.", "গাছে তিনটি পাখি বসে আছে।", { birds: 3 }),
    S("Two more land, so 3 + 2 = 5 birds.", "আরও দুটি এল, তাই ৩ + ২ = ৫ পাখি।", { total: 5 }),
  ]),
  V("add-with-fingers-both-hands", "c1.04", "Add with both hands", "দুই হাতে যোগ", "finger-hands", "fingerHands", { left: 4, right: 3, mode: "add" }, [
    S("Hold up 4 fingers on one hand and 3 on the other.", "এক হাতে ৪টি আঙুল আর অন্য হাতে ৩টি তুলো।", { left: 4, right: 3 }),
    S("Count all fingers: 4 + 3 = 7.", "সব আঙুল গোনো: ৪ + ৩ = ৭।", { total: 7 }),
  ]),
  V("number-sentence-builder", "c1.04", "Build a number sentence", "সংখ্যা বাক্য বানাও", "algebra-stepper", "algebraStepper", { a: 2, b: 5, mode: "build-sentence" }, [
    S("Two apples and five apples join together.", "দুটি আপেল আর পাঁচটি আপেল একসঙ্গে মেলে।", { a: 2, b: 5 }),
    S("The number sentence is 2 + 5 = 7.", "সংখ্যা বাক্য: ২ + ৫ = ৭।", { total: 7 }),
  ], 2),
  V("commutative-flip", "c1.04", "Flip the groups", "দল উল্টাও", "object-counting", "objectCounting", { a: 2, b: 3, mode: "commutative" }, [
    S("2 + 3 gives 5.", "২ + ৩ = ৫।", { total: 5 }),
    S("Flip the groups: 3 + 2 also gives 5.", "দল উল্টাও: ৩ + ২-ও ৫ দেয়।", { total: 5 }, "2 + 3 = 3 + 2"),
  ], 2),
  V("add-zero", "c1.04", "Adding zero", "শূন্য যোগ", "object-counting", "objectCounting", { a: 5, add: 0, mode: "add-zero" }, [
    S("Start with 5 counters and add 0.", "৫টি কাউন্টার নিয়ে ০ যোগ করো।", { start: 5, add: 0 }),
    S("Adding nothing leaves 5.", "কিছু না যোগ করলে ৫-ই থাকে।", { total: 5 }),
  ]),
  V("story-problem-add", "c1.04", "Addition story problem", "যোগের গল্প সমস্যা", "story-scene", "storyScene", { story: "Rina has 4 balloons and gets 3 more.", a: 4, b: 3, mode: "story-add" }, [
    S("Rina has 4 balloons and gets 3 more.", "রিনার ৪টি বেলুন আছে, আরও ৩টি পেল।", { a: 4, b: 3 }),
    S("4 + 3 = 7 balloons in all.", "মোট ৪ + ৩ = ৭টি বেলুন।", { total: 7 }),
  ]),

  V("birds-fly-away", "c1.05", "Birds fly away", "পাখি উড়ে যায়", "story-scene", "storyScene", { scene: "tree", birds: 6, flying: 2, mode: "subtract" }, [
    S("Six birds are on the tree.", "গাছে ছয়টি পাখি আছে।", { birds: 6 }),
    S("Two fly away, so 6 − 2 = 4 remain.", "দুটি উড়ে গেল, তাই ৬ − ২ = ৪ থাকে।", { remain: 4 }),
  ]),
  V("difference-compare", "c1.05", "How many more?", "কত বেশি?", "tape-diagram", "tapeDiagram", { left: 9, right: 5, mode: "difference" }, [
    S("Line up 9 stars and 5 circles to pair them.", "৯টি তারা আর ৫টি বৃত্ত সারিবদ্ধ করে জোড়া মিলাও।", { left: 9, right: 5 }),
    S("Four stars have no pair, so 9 − 5 = 4 more.", "চারটি তারার জুড়ি নেই, তাই ৯ − ৫ = ৪ বেশি।", { difference: 4 }),
  ], 2),
  V("fact-family-1", "c1.05", "Fact family of 5", "৫-এর তথ্য পরিবার", "tape-diagram", "tapeDiagram", { parts: [3, 2], whole: 5, mode: "family" }, [
    S("3 + 2 = 5 uses the same three numbers.", "৩ + ২ = ৫ একই তিনটি সংখ্যা ব্যবহার করে।", { sum: 5 }),
    S("So 5 − 2 = 3 and 5 − 3 = 2.", "তাই ৫ − ২ = ৩ আর ৫ − ৩ = ২।", { difference: 3 }),
  ], 2),
  V("subtract-zero-and-self", "c1.05", "Subtract zero and itself", "শূন্য ও নিজেকে বিয়োগ", "object-counting", "objectCounting", { mode: "zero-self" }, [
    S("7 − 0 leaves all 7.", "৭ − ০ করলে ৭-ই থাকে।", { result: 7 }),
    S("7 − 7 leaves 0.", "৭ − ৭ করলে ০ থাকে।", { result: 0 }),
  ]),
  V("subtraction-misconception", "c1.05", "Subtract in the right order", "সঠিক ক্রমে বিয়োগ", "number-line", "numberLine", { a: 4, b: 9, mode: "misconception" }, [
    S("You cannot take 9 away from 4 by going left.", "৪ থেকে ৯ বিয়োগ করতে বাঁয়ে গেলে হবে না।", { start: 4, take: 9 }),
    S("Subtract the smaller from the larger: 9 − 4 = 5.", "বড় থেকে ছোট বিয়োগ করো: ৯ − ৪ = ৫।", { result: 5 }),
  ], 2),

  V("teen-number-build", "c1.06", "Build teen numbers", "কিশোর সংখ্যা বানাও", "base-blocks", "baseBlocks", { tens: 1, ones: 4, mode: "teen" }, [
    S("1 ten and 4 ones make 14.", "১ দশক আর ৪ একক মিলে ১৪।", { tens: 1, ones: 4, total: 14 }),
    S("14 = 10 + 4.", "১৪ = ১০ + ৪।", { total: 14 }),
  ]),
  V("teen-grid", "c1.06", "Teen number grid", "কিশোর সংখ্যার গ্রিড", "number-grid", "numberGrid", { min: 1, max: 20, mode: "teen-grid" }, [
    S("Rows of ten help us see 11 to 20.", "দশের সারি ১১ থেকে ২০ দেখতে সাহায্য করে।", { row: 2 }),
    S("The second row starts at 11 and ends at 20.", "দ্বিতীয় সারি ১১ থেকে শুরু হয়ে ২০-তে শেষ।", { start: 11, end: 20 }),
  ]),
  V("teen-name-match", "c1.06", "Teen number names", "কিশোর সংখ্যার নাম", "number-grid", "numberGrid", { min: 11, max: 20, mode: "words", value: 15 }, [
    S("The numeral 15 is written as “fifteen”.", "১৫ অঙ্কটি লেখা হয় “পনেরো”।", { numeral: 15, word: "fifteen" }),
    S("Match numerals 11 to 20 with their words.", "১১ থেকে ২০ অঙ্কগুলোকে তাদের নামের সঙ্গে মেলাও।", { range: [11, 20] }),
  ], 2),
  V("missing-teen", "c1.06", "Find the missing teen", "অনুপস্থিত কিশোর সংখ্যা", "number-line", "numberLine", { min: 0, max: 20, missing: 13, mode: "missing" }, [
    S("The number after 12 is missing.", "১২-এর পরের সংখ্যাটি অনুপস্থিত।", { before: 12 }),
    S("13 comes after 12 and before 14.", "১৩ আসে ১২-এর পরে আর ১৪-এর আগে।", { missing: 13 }),
  ], 2),

  V("hop-over-ten", "c1.07", "Hop over ten", "দশ পার হয়ে লাফ", "number-line", "numberLine", { start: 8, add: 5, mode: "hop-ten" }, [
    S("Start at 8 and hop 2 to reach 10.", "৮ থেকে শুরু করে ২ লাফে ১০-এ পৌঁছাও।", { start: 8, ten: 10 }),
    S("Then hop 3 more: 10 + 3 = 13.", "তারপর আরও ৩ লাফ: ১০ + ৩ = ১৩।", { total: 13 }),
  ], 2),
  V("doubles-and-near-doubles", "c1.07", "Doubles and near doubles", "দ্বিগুণ ও প্রায় দ্বিগুণ", "object-counting", "objectCounting", { a: 6, b: 6, mode: "doubles" }, [
    S("6 + 6 is a double: 6 + 6 = 12.", "৬ + ৬ একটি দ্বিগুণ: ৬ + ৬ = ১২।", { total: 12 }),
    S("6 + 7 is near double: 12 + 1 = 13.", "৬ + ৭ প্রায় দ্বিগুণ: ১২ + ১ = ১৩।", { total: 13 }),
  ], 2),
  V("add-story-cards", "c1.07", "Addition story cards", "যোগের গল্প কার্ড", "story-scene", "storyScene", { story: "A basket has 9 mangoes. 4 more are added.", a: 9, b: 4, mode: "story-add" }, [
    S("The basket has 9 mangoes.", "ঝুড়িতে ৯টি আম আছে।", { a: 9 }),
    S("Add 4 more: 9 + 4 = 13 mangoes.", "আরও ৪টি যোগ: ৯ + ৪ = ১৩টি আম।", { total: 13 }),
  ]),

  V("base-blocks-take", "c1.08", "Take away with blocks", "ব্লকে সরিয়ে নেওয়া", "base-blocks", "baseBlocks", { a: 15, b: 6, mode: "take-away" }, [
    S("Start with 1 ten and 5 ones to show 15.", "১৫ দেখাতে ১ দশক আর ৫ একক নাও।", { tens: 1, ones: 5 }),
    S("Remove 6 ones by breaking a ten: 15 − 6 = 9.", "এক দশক ভেঙে ৬ একক সরাও: ১৫ − ৬ = ৯।", { result: 9 }),
  ], 2),
  V("missing-addend", "c1.08", "Find the missing addend", "অজানা যোগ্যাংশ", "tape-diagram", "tapeDiagram", { a: 8, whole: 14, missing: 6, mode: "missing-addend" }, [
    S("8 + ? = 14.", "৮ + ? = ১৪।", { a: 8, whole: 14 }),
    S("The missing addend is 14 − 8 = 6.", "অজানা যোগ্যাংশ ১৪ − ৮ = ৬।", { missing: 6 }),
  ], 2),
  V("story-subtract", "c1.08", "Subtraction story", "বিয়োগের গল্প", "story-scene", "storyScene", { story: "There are 12 sweets. 5 are eaten.", a: 12, b: 5, mode: "story-subtract" }, [
    S("There are 12 sweets in the box.", "বাক্সে ১২টি মিষ্টি আছে।", { a: 12 }),
    S("5 are eaten, so 12 − 5 = 7 remain.", "৫টি খাওয়া হলো, তাই ১২ − ৫ = ৭ থাকে।", { remain: 7 }),
  ]),

  V("bundle-and-sticks", "c1.09", "Bundles and sticks", "বান্ডিল ও কাঠি", "base-blocks", "baseBlocks", { tens: 2, ones: 6, mode: "bundle" }, [
    S("2 tens are 20 and 6 ones are 6.", "২ দশক = ২০ আর ৬ একক = ৬।", { tens: 20, ones: 6 }),
    S("Together they make 26.", "একসঙ্গে ২৬ হয়।", { total: 26 }),
  ]),
  V("before-after-21-40", "c1.09", "Neighbours to 40", "৪০ পর্যন্ত প্রতিবেশী", "number-line", "numberLine", { min: 21, max: 40, value: 28, mode: "neighbours" }, [
    S("The number before 28 is 27.", "২৮-এর আগের সংখ্যা ২৭।", { before: 27 }),
    S("The number after 28 is 29.", "২৮-এর পরের সংখ্যা ২৯।", { after: 29 }),
  ]),
  V("number-word-match", "c1.09", "Match numbers and words", "সংখ্যা ও নাম মিলাও", "number-grid", "numberGrid", { min: 21, max: 40, mode: "words", value: 34 }, [
    S("The numeral 34 is “thirty-four”.", "৩৪ অঙ্কটি “চৌত্রিশ”।", { numeral: 34, word: "thirty-four" }),
    S("Match each numeral with its English and Bangla word.", "প্রতিটি অঙ্ককে ইংরেজি ও বাংলা নামের সঙ্গে মেলাও।", { value: 34 }),
  ], 2),
  V("compare-two-digit", "c1.09", "Compare two-digit numbers", "দুই অঙ্কের সংখ্যা তুলনা", "balance-scale", "balanceScale", { left: 34, right: 29, mode: "compare" }, [
    S("Compare the tens first: 3 tens > 2 tens.", "আগে দশক তুলনা: ৩ দশক > ২ দশক।", { left: 34, right: 29 }),
    S("So 34 > 29.", "তাই ৩৪ > ২৯।", { symbol: ">" }),
  ], 2),

  V("digit-value-explorer", "c1.10", "What each digit means", "প্রতিটি অঙ্কের মান", "base-blocks", "baseBlocks", { number: 35, mode: "digit-value" }, [
    S("In 35, the 3 is in the tens place, so it means 30.", "৩৫-এ ৩ দশকের ঘরে, তাই এর মান ৩০।", { digit: 3, value: 30 }),
    S("The 5 is in the ones place, so it means 5.", "৫ এককের ঘরে, তাই এর মান ৫।", { digit: 5, value: 5 }),
  ]),
  V("swap-digits", "c1.10", "Swap the digits", "অঙ্ক অদলবদল", "base-blocks", "baseBlocks", { a: 23, b: 32, mode: "swap" }, [
    S("23 has 2 tens and 3 ones.", "২৩-এ ২ দশক আর ৩ একক।", { number: 23 }),
    S("Swap the digits: 32 has 3 tens and 2 ones, so 23 ≠ 32.", "অঙ্ক অদলবদল: ৩২-এ ৩ দশক আর ২ একক, তাই ২৩ ≠ ৩২।", { number: 32 }),
  ], 2),
  V("build-from-clues", "c1.10", "Build from clues", "সূত্র থেকে বানাও", "base-blocks", "baseBlocks", { tens: 4, ones: 7, mode: "clues" }, [
    S("4 tens are 40.", "৪ দশক = ৪০।", { tens: 40 }),
    S("7 ones are 7, so the number is 40 + 7 = 47.", "৭ একক = ৭, তাই সংখ্যা ৪০ + ৭ = ৪৭।", { total: 47 }),
  ], 2),

  V("shape-in-world-hunt", "c1.12", "Shapes around us", "চারপাশের আকৃতি", "shape-canvas", "shapeCanvas", { scene: "classroom", shapes: ["circle", "rectangle", "triangle"], mode: "hunt" }, [
    S("Find a clock face: it is a circle.", "ঘড়ির মুখ খোঁজো: এটি একটি বৃত্ত।", { shape: "circle" }),
    S("Find a door: it is a rectangle, and a sign can be a triangle.", "দরজা খোঁজো: এটি আয়তক্ষেত্র, আর চিহ্ন ত্রিভুজ হতে পারে।", { shapes: ["rectangle", "triangle"] }),
  ]),
  V("combine-shapes", "c1.12", "Combine shapes", "আকৃতি জোড়ো", "shape-canvas", "shapeCanvas", { parts: ["triangle", "triangle"], mode: "combine" }, [
    S("Join two triangles along one side.", "দুই ত্রিভুজ এক বাহু বরাবর জোড়ো।", { parts: 2 }),
    S("Together they can make a square or a new shape.", "একসঙ্গে তারা বর্গ বা নতুন আকৃতি তৈরি করে।", { result: "square" }),
  ], 2),
  V("straight-vs-curved", "c1.12", "Straight and curved lines", "সোজা ও বাঁকা রেখা", "shape-canvas", "shapeCanvas", { mode: "lines" }, [
    S("A triangle has straight sides.", "ত্রিভুজের বাহুগুলো সোজা।", { shape: "triangle", lines: "straight" }),
    S("A circle is made from a curved line.", "বৃত্ত একটি বাঁকা রেখা দিয়ে তৈরি।", { shape: "circle", lines: "curved" }),
  ]),
  V("positions-and-directions", "c1.12", "Positions and directions", "অবস্থান ও দিক", "story-scene", "storyScene", { scene: "playground", mode: "position" }, [
    S("The ball is above the box and the bag is below it.", "বলটি বাক্সের ওপরে আর ব্যাগটি নিচে।", { ball: "above", bag: "below" }),
    S("The tree is to the left and the slide is to the right.", "গাছটি বাঁয়ে আর স্লাইডটি ডানে।", { tree: "left", slide: "right" }),
  ]),

  V("growing-pattern", "c1.13", "Growing pattern", "বর্ধমান ধারা", "shape-canvas", "shapeCanvas", { mode: "growing", sequence: [1, 3, 5] }, [
    S("The tiles grow by 2 each time.", "প্রতিবার টাইল ২ করে বাড়ে।", { step: 2 }),
    S("So the next number is 5 + 2 = 7.", "তাই পরের সংখ্যা ৫ + ২ = ৭।", { next: 7 }),
  ], 2),
  V("break-the-pattern", "c1.13", "Break the pattern", "ধারা ভাঙো", "shape-canvas", "shapeCanvas", { mode: "odd-one", sequence: ["circle", "circle", "square", "circle"] }, [
    S("Three shapes are circles and one is a square.", "তিনটি আকৃতি বৃত্ত আর একটি বর্গ।", { odd: "square" }),
    S("The square breaks the circle pattern.", "বর্গটি বৃত্তের ধারা ভাঙে।", { odd: "square" }),
  ], 2),
  V("pattern-in-life", "c1.13", "Patterns in life", "জীবনের ধারা", "story-scene", "storyScene", { scene: "beads", mode: "life", sequence: ["red", "blue", "red", "blue"] }, [
    S("The beads repeat red, blue, red, blue.", "পুঁতিগুলো লাল, নীল, লাল, নীল করে বারবার আসে।", { repeat: ["red", "blue"] }),
    S("Days repeat in a week: Sunday to Saturday.", "সপ্তাহে দিনগুলো বারবার আসে: রবিবার থেকে শনিবার।", { days: 7 }),
  ]),

  V("skip-count-to-100", "c1.14", "Skip count to 100", "১০০ পর্যন্ত লাফিয়ে গোনো", "number-line", "numberLine", { step: 10, max: 100, mode: "skip-count" }, [
    S("Skip count by 10: 10, 20, 30, 40, 50.", "১০ করে লাফিয়ে গোনো: ১০, ২০, ৩০, ৪০, ৫০।", { step: 10 }),
    S("Continue: 60, 70, 80, 90, 100.", "চালিয়ে যাও: ৬০, ৭০, ৮০, ৯০, ১০০।", { end: 100 }),
  ], 2),
  V("compare-order-to-100", "c1.14", "Order numbers to 100", "১০০ পর্যন্ত সংখ্যা সাজাও", "number-line", "numberLine", { numbers: [57, 23, 84], mode: "order" }, [
    S("Compare the tens: 2 < 5 < 8.", "দশক তুলনা: ২ < ৫ < ৮।", { tens: [2, 5, 8] }),
    S("So the order is 23, 57, 84.", "তাই ক্রম হলো ২৩, ৫৭, ৮৪।", { order: [23, 57, 84] }),
  ], 2),
  V("100-the-big-one", "c1.14", "Ten tens make 100", "দশ দশকে ১০০", "base-blocks", "baseBlocks", { tens: 10, mode: "hundred" }, [
    S("Count ten bundles of ten.", "দশের দশটি বান্ডিল গোনো।", { bundles: 10 }),
    S("10 × 10 = 100, so ten tens make one hundred.", "১০ × ১০ = ১০০, তাই দশ দশক মিলে একশ।", { total: 100 }, "10 \\times 10 = 100"),
  ], 2),
  V("number-names-to-100", "c1.14", "Number names to 100", "১০০ পর্যন্ত সংখ্যার নাম", "number-grid", "numberGrid", { min: 41, max: 100, mode: "words", value: 68 }, [
    S("The numeral 68 is “sixty-eight”.", "৬৮ অঙ্কটি “আটষট্টি”।", { numeral: 68, word: "sixty-eight" }),
    S("Match numerals up to 100 with their words.", "১০০ পর্যন্ত অঙ্কগুলোকে তাদের নামের সঙ্গে মেলাও।", { max: 100 }),
  ], 2),

  V("number-line-add-big", "c1.15", "Add big numbers on a line", "রেখায় বড় সংখ্যার যোগ", "number-line", "numberLine", { start: 34, add: 26, mode: "add-big" }, [
    S("Start at 34 and jump 2 tens to 54.", "৩৪ থেকে শুরু করে ২ দশক লাফ দিয়ে ৫৪।", { start: 34, afterTens: 54 }),
    S("Add 6 ones: 54 + 6 = 60.", "৬ একক যোগ: ৫৪ + ৬ = ৬০।", { total: 60 }),
  ], 2),
  V("add-three-small-numbers", "c1.15", "Add three numbers", "তিনটি সংখ্যা যোগ", "object-counting", "objectCounting", { values: [4, 3, 5], mode: "three-add" }, [
    S("First add 4 + 3 = 7.", "আগে ৪ + ৩ = ৭।", { first: 7 }),
    S("Then 7 + 5 = 12.", "তারপর ৭ + ৫ = ১২।", { total: 12 }),
  ], 2),
  V("word-problem-add", "c1.15", "Addition word problem", "যোগের শব্দ সমস্যা", "story-scene", "storyScene", { story: "A shop sells 28 pens and then 17 more.", a: 28, b: 17, mode: "story-add" }, [
    S("The shop sells 28 pens, then 17 more.", "দোকানে ২৮টি কলম বিক্রি হলো, তারপর আরও ১৭টি।", { a: 28, b: 17 }),
    S("28 + 17 = 45 pens in all.", "মোট ২৮ + ১৭ = ৪৫টি কলম।", { total: 45 }),
  ], 2),
  V("addition-error-hunt", "c1.15", "Find the addition mistake", "যোগের ভুল খোঁজো", "algebra-stepper", "algebraStepper", { wrong: "34 + 25 = 58", correct: 59, mode: "error-hunt" }, [
    S("Add the ones: 4 + 5 = 9.", "একক যোগ: ৪ + ৫ = ৯।", { ones: 9 }),
    S("Add the tens: 3 + 2 = 5, so the answer is 59, not 58.", "দশক যোগ: ৩ + ২ = ৫, তাই উত্তর ৫৯, ৫৮ নয়।", { correct: 59 }),
  ], 2),

  V("number-line-subtract", "c1.16", "Subtract on a number line", "সংখ্যারেখায় বিয়োগ", "number-line", "numberLine", { start: 64, subtract: 27, mode: "subtract-big" }, [
    S("Start at 64 and jump back 2 tens to 44.", "৬৪ থেকে শুরু করে ২ দশক পিছিয়ে ৪৪।", { start: 64, afterTens: 44 }),
    S("Jump back 7 ones: 44 − 7 = 37.", "৭ একক পিছিয়ে: ৪৪ − ৭ = ৩৭।", { result: 37 }),
  ], 2),
  V("check-with-add", "c1.16", "Check subtraction with addition", "যোগ দিয়ে বিয়োগ মিলাও", "tape-diagram", "tapeDiagram", { a: 52, b: 18, difference: 34, mode: "check" }, [
    S("52 − 18 = 34.", "৫২ − ১৮ = ৩৪।", { difference: 34 }),
    S("Check by adding: 34 + 18 = 52.", "যোগ করে মিলাও: ৩৪ + ১৮ = ৫২।", { total: 52 }),
  ], 2),
  V("word-problem-subtract", "c1.16", "Subtraction word problem", "বিয়োগের শব্দ সমস্যা", "story-scene", "storyScene", { story: "A shop has 45 eggs and sells 19.", a: 45, b: 19, mode: "story-subtract" }, [
    S("The shop has 45 eggs.", "দোকানে ৪৫টি ডিম আছে।", { a: 45 }),
    S("After selling 19: 45 − 19 = 26 eggs remain.", "১৯টি বিক্রির পর: ৪৫ − ১৯ = ২৬টি ডিম থাকে।", { remain: 26 }),
  ], 2),

  V("shop-and-pay", "c1.17", "Shop and pay", "কেনাকাটা ও টাকা দেওয়া", "money-shop", "moneyShop", { item: { name: "book", price: 35 }, paid: 50, mode: "pay" }, [
    S("The book costs 35 taka.", "বইটির দাম ৩৫ টাকা।", { price: 35 }),
    S("Pay 50 taka to buy it.", "কিনতে ৫০ টাকা দাও।", { paid: 50 }),
  ]),
  V("change-giving", "c1.17", "Give the change", "ফেরত দেওয়া", "money-shop", "moneyShop", { price: 35, paid: 50, mode: "change" }, [
    S("Pay 50 taka for an item that costs 35 taka.", "৩৫ টাকার জিনিসের জন্য ৫০ টাকা দাও।", { paid: 50, price: 35 }),
    S("Change is 50 − 35 = 15 taka.", "ফেরত = ৫০ − ৩৫ = ১৫ টাকা।", { change: 15 }),
  ], 2),
  V("compare-prices", "c1.17", "Compare prices", "দাম তুলনা", "money-shop", "moneyShop", { left: { name: "ball", price: 20 }, right: { name: "bat", price: 45 }, mode: "compare" }, [
    S("The ball costs 20 taka and the bat costs 45 taka.", "বলের দাম ২০ টাকা আর ব্যাটের দাম ৪৫ টাকা।", { ball: 20, bat: 45 }),
    S("45 > 20, so the bat costs more.", "৪৫ > ২০, তাই ব্যাটের দাম বেশি।", { symbol: ">" }),
  ]),
];
