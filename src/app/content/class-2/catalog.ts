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

export const CLASS2_CATALOG_VISUALIZATIONS: PlayVisualizationDef[] = [
  V("count-and-group", "c2.01", "Count and group", "গুনে দল বাঁধো", "object-counting", "objectCounting", { total: 34, group: 10, emoji: "🍎", mode: "group-tens" }, [
    S("Group 34 apples into tens.", "৩৪টি আপেল দশে দশে দল বানাও।", { total: 34 }),
    S("3 tens and 4 ones make 34.", "৩ দশক আর ৪ একক মিলে ৩৪।", { tens: 3, ones: 4 }),
  ], 2),
  V("number-patterns-grid", "c2.01", "Even and odd patterns", "জোড়-বিজোড় ধারা", "number-grid", "numberGrid", { min: 1, max: 100, mode: "even-odd" }, [
    S("Even numbers end in 0, 2, 4, 6 or 8.", "জোড় সংখ্যা ০, ২, ৪, ৬ বা ৮-এ শেষ হয়।", { endings: [0, 2, 4, 6, 8] }),
    S("Odd numbers end in 1, 3, 5, 7 or 9.", "বিজোড় সংখ্যা ১, ৩, ৫, ৭ বা ৯-এ শেষ হয়।", { endings: [1, 3, 5, 7, 9] }),
  ], 2),
  V("ordinal-vs-cardinal", "c2.01", "Ordinal and cardinal", "ক্রমবাচক ও পরিমাণবাচক", "story-scene", "storyScene", { scene: "race", mode: "ordinal-cardinal" }, [
    S("“Third” tells the position of a runner.", "“তৃতীয়” দৌড়বিদের অবস্থান বলে।", { ordinal: "third" }),
    S("“Three” tells how many runners there are.", "“তিন” বলে মোট কতজন দৌড়বিদ আছে।", { cardinal: 3 }),
  ], 2),

  V("add-column-stepper", "c2.02", "Column addition with carry", "হাতে রাখা কলাম যোগ", "algebra-stepper", "algebraStepper", { a: 38, b: 27, mode: "column-add" }, [
    S("Add the ones: 8 + 7 = 15. Write 5 and carry 1 ten.", "একক যোগ: ৮ + ৭ = ১৫। ৫ লেখো আর ১ দশক হাতে রাখো।", { ones: 5, carry: 1 }),
    S("Add the tens: 3 + 2 + 1 = 6, so 38 + 27 = 65.", "দশক যোগ: ৩ + ২ + ১ = ৬, তাই ৩৮ + ২৭ = ৬৫।", { total: 65 }),
  ], 2),
  V("subtract-column-stepper", "c2.02", "Column subtraction with borrow", "ধার নিয়ে কলাম বিয়োগ", "algebra-stepper", "algebraStepper", { a: 53, b: 28, mode: "column-subtract" }, [
    S("3 ones cannot take 8, so borrow 1 ten: 13 − 8 = 5.", "৩ একক থেকে ৮ নেওয়া যায় না, তাই ১ দশক ধার: ১৩ − ৮ = ৫।", { ones: 5 }),
    S("Tens become 4 − 2 = 2, so 53 − 28 = 25.", "দশক হয় ৪ − ২ = ২, তাই ৫৩ − ২৮ = ২৫।", { total: 25 }),
  ], 2),
  V("borrow-misconception", "c2.02", "Borrow the right way", "সঠিকভাবে ধার নাও", "algebra-stepper", "algebraStepper", { wrong: "52 − 28 = 36", correct: 24, mode: "misconception" }, [
    S("Do not subtract the smaller digit from the larger in each column.", "প্রতিটি কলামে ছোট অঙ্ক থেকে বড় অঙ্ক বিয়োগ করো না।", { wrong: 36 }),
    S("Borrow correctly: 12 − 8 = 4 and 4 − 2 = 2, so 52 − 28 = 24.", "সঠিকভাবে ধার নাও: ১২ − ৮ = ৪ আর ৪ − ২ = ২, তাই ৫২ − ২৮ = ২৪।", { correct: 24 }),
  ], 2),
  V("bar-model-intro", "c2.02", "Whole and parts with bars", "বার দিয়ে সম্পূর্ণ ও অংশ", "tape-diagram", "tapeDiagram", { whole: 35, parts: [20, 15], mode: "bar-model" }, [
    S("The whole bar is 35 and one part is 20.", "সম্পূর্ণ বার ৩৫ আর একটি অংশ ২০।", { whole: 35, part: 20 }),
    S("The other part is 35 − 20 = 15.", "অন্য অংশ ৩৫ − ২০ = ১৫।", { part: 15 }),
  ], 2),

  V("repeated-addition", "c2.03", "Repeated addition", "বারবার যোগ", "number-line", "numberLine", { groups: 3, size: 4, mode: "repeated-add" }, [
    S("Jump 4 three times: 4, 8, 12.", "৪ করে তিনবার লাফ: ৪, ৮, ১২।", { jumps: [4, 8, 12] }),
    S("4 + 4 + 4 = 12, which is 3 × 4.", "৪ + ৪ + ৪ = ১২, যা ৩ × ৪।", { total: 12 }, "3 \\times 4 = 12"),
  ], 2),
  V("times-table-explorer", "c2.03", "Times table explorer", "নামতা অন্বেষণ", "number-grid", "numberGrid", { tables: [2, 3, 4, 5, 10], mode: "times-table" }, [
    S("In the 4 times table, skip count by 4.", "৪-এর নামতায় ৪ করে লাফিয়ে গোনো।", { table: 4 }),
    S("4, 8, 12, 16, 20 are the first five multiples of 4.", "৪, ৮, ১২, ১৬, ২০ হলো ৪-এর প্রথম পাঁচ গুণিতক।", { multiples: [4, 8, 12, 16, 20] }),
  ], 2),
  V("multiply-sign-meaning", "c2.03", "What × means", "× মানে কী", "story-scene", "storyScene", { groups: 3, size: 4, mode: "meaning" }, [
    S("3 × 4 means 3 groups of 4.", "৩ × ৪ মানে ৪-এর ৩টি দল।", { groups: 3, size: 4 }),
    S("That makes 3 × 4 = 12.", "তাতে ৩ × ৪ = ১২ হয়।", { total: 12 }),
  ], 2),

  V("3d-solids-faces", "c2.04", "Faces of solids", "ঘনবস্তুর তল", "solid-3d", "solid3d", { shape: "cube", mode: "faces-edges-corners" }, [
    S("A cube has 6 faces, 12 edges and 8 corners.", "ঘনকের ৬টি তল, ১২টি ধার আর ৮টি কোণা।", { faces: 6, edges: 12, corners: 8 }),
    S("A cuboid also has 6 faces, 12 edges and 8 corners.", "আয়তঘনকেরও ৬টি তল, ১২টি ধার আর ৮টি কোণা।", { faces: 6, edges: 12, corners: 8 }),
  ], 2),
  V("shape-compare", "c2.04", "Compare shapes", "আকৃতি তুলনা", "shape-canvas", "shapeCanvas", { pair: ["square", "rectangle"], mode: "compare" }, [
    S("A square has 4 equal sides; a rectangle has 2 pairs of equal sides.", "বর্গের ৪টি সমান বাহু; আয়তক্ষেত্রের সমান বাহুর ২ জোড়া।", { square: 4, rectangle: [2, 2] }),
    S("Both have 4 sides and 4 corners.", "দুটিরই ৪টি বাহু আর ৪টি কোণা।", { sides: 4, corners: 4 }),
  ], 2),
  V("pattern-rule-finder", "c2.04", "Find the pattern rule", "ধারার নিয়ম", "shape-canvas", "shapeCanvas", { sequence: ["circle", "square", "circle", "square"], mode: "rule" }, [
    S("The pattern repeats circle, square.", "ধারাটি বৃত্ত, বর্গ করে বারবার আসে।", { repeat: ["circle", "square"] }),
    S("The rule is “add a circle, then a square”.", "নিয়ম হলো “একটি বৃত্ত, তারপর একটি বর্গ”।", { next: "circle" }),
  ], 2),

  V("non-standard-units", "c2.05", "Measure with non-standard units", "অপ্রচলিত এককে মাপ", "shape-canvas", "shapeCanvas", { mode: "non-standard", object: "pencil", units: 5, cm: 10 }, [
    S("A pencil measures 5 paper clips long.", "একটি পেন্সিল ৫টি পেপার ক্লিপ লম্বা।", { clips: 5 }),
    S("The same pencil is 10 cm long with a ruler.", "একই পেন্সিল রুলারে ১০ সেমি লম্বা।", { cm: 10 }),
  ]),
  V("day-timeline", "c2.05", "A day on a timeline", "দিনের সময়রেখা", "clock", "clock", { mode: "timeline", events: [{ time: "08:00", event: "school" }, { time: "13:00", event: "lunch" }, { time: "20:00", event: "sleep" }] }, [
    S("School starts at 8 o'clock in the morning.", "সকাল ৮টায় স্কুল শুরু।", { hour: 8 }),
    S("Lunch is at 1 o'clock and bedtime is at 8 o'clock at night.", "দুপুর ১টায় খাবার আর রাত ৮টায় ঘুম।", { lunch: 13, sleep: 20 }),
  ], 2),

  V("note-coin-sets", "c2.06", "Notes and coins", "নোট ও কয়েন", "money-shop", "moneyShop", { mode: "note-coin-sets", notes: [1, 2, 5, 10, 20, 50, 100], coins: [1, 2, 5] }, [
    S("Bangladesh notes include 1, 2, 5, 10, 20, 50 and 100 taka.", "বাংলাদেশের নোটে ১, ২, ৫, ১০, ২০, ৫০ আর ১০০ টাকা আছে।", { notes: [1, 2, 5, 10, 20, 50, 100] }),
    S("Coins include 1, 2 and 5 taka.", "কয়েনে ১, ২ আর ৫ টাকা আছে।", { coins: [1, 2, 5] }),
  ]),
  V("exchange-notes", "c2.06", "Exchange notes", "নোট বদল", "money-shop", "moneyShop", { mode: "exchange", small: 1, count: 10, large: 10 }, [
    S("Ten 1-taka coins have the same value as a 10-taka note.", "দশটি ১ টাকার কয়েনের মান একটি ১০ টাকার নোটের সমান।", { coins: 10, value: 10 }),
    S("10 × 1 = 10 taka.", "১০ × ১ = ১০ টাকা।", { total: 10 }, "10 \\times 1 = 10"),
  ], 2),

  V("read-the-graph", "c2.07", "Read a graph", "গ্রাফ পড়ি", "chart", "chart", { categories: ["mango", "banana", "apple"], values: [7, 5, 3], mode: "read" }, [
    S("Mango has the tallest bar with 7 votes.", "আমের বার সবচেয়ে উঁচু, ৭টি ভোট।", { mango: 7 }),
    S("Apple has 3 votes: 7 − 3 = 4 fewer than mango.", "আপেলের ৩টি ভোট: আমের চেয়ে ৭ − ৩ = ৪ কম।", { apple: 3, difference: 4 }),
  ], 2),
];
