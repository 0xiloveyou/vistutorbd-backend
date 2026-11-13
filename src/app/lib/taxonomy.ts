/**
 * Static taxonomy configuration (bands and levels).
 * Content below these levels (categories, chapters, topics) is admin-owned and
 * intentionally left empty in the skeleton.
 */

export const CLASS_BANDS = [
  {
    id: "PLAY_NURSERY",
    name: { en: "Play & Nursery", bn: "প্লে ও নার্সারি" },
    style: {
      companionRequired: true,
      tone: "playful",
      defaultDifficulty: 1,
      inputMode: "tap",
      narration: "required",
    },
    order: 0,
  },
  {
    id: "C1_5",
    name: { en: "Class 1–5", bn: "প্রথম–পঞ্চম শ্রেণি" },
    style: {
      companionRequired: false,
      tone: "concrete",
      defaultDifficulty: 2,
      inputMode: "tap-and-type",
      narration: "optional",
    },
    order: 1,
  },
  {
    id: "C6_8",
    name: { en: "Class 6–8", bn: "ষষ্ঠ–অষ্টম শ্রেণি" },
    style: {
      companionRequired: false,
      tone: "concise",
      defaultDifficulty: 3,
      inputMode: "type",
      narration: "optional",
    },
    order: 2,
  },
  {
    id: "C9_10",
    name: { en: "Class 9–10", bn: "নবম–দশম শ্রেণি" },
    style: {
      companionRequired: false,
      tone: "academic",
      defaultDifficulty: 4,
      inputMode: "type",
      narration: "optional",
    },
    order: 3,
  },
  {
    id: "C11_12",
    name: { en: "Class 11–12", bn: "একাদশ–দ্বাদশ শ্রেণি" },
    style: {
      companionRequired: false,
      tone: "formula-forward",
      defaultDifficulty: 5,
      inputMode: "type",
      narration: "optional",
    },
    order: 4,
  },
] as const;

export const CLASS_LEVELS = [
  {
    id: "play",
    bandId: "PLAY_NURSERY",
    name: { en: "Play", bn: "প্লে" },
    order: 0,
  },
  {
    id: "nursery",
    bandId: "PLAY_NURSERY",
    name: { en: "Nursery", bn: "নার্সারি" },
    order: 1,
  },
  ...Array.from({ length: 5 }, (_, index) => ({
    id: `class-${index + 1}`,
    bandId: "C1_5",
    name: {
      en: `Class ${index + 1}`,
      bn: `${["প্রথম", "দ্বিতীয়", "তৃতীয়", "চতুর্থ", "পঞ্চম"][index]} শ্রেণি`,
    },
    order: index + 2,
  })),
  ...Array.from({ length: 3 }, (_, index) => ({
    id: `class-${index + 6}`,
    bandId: "C6_8",
    name: {
      en: `Class ${index + 6}`,
      bn: `${["ষষ্ঠ", "সপ্তম", "অষ্টম"][index]} শ্রেণি`,
    },
    order: index + 7,
  })),
  ...Array.from({ length: 2 }, (_, index) => ({
    id: `class-${index + 9}`,
    bandId: "C9_10",
    name: { en: `Class ${index + 9}`, bn: `${["নবম", "দশম"][index]} শ্রেণি` },
    order: index + 10,
  })),
  ...Array.from({ length: 2 }, (_, index) => ({
    id: `class-${index + 11}`,
    bandId: "C11_12",
    name: { en: `Class ${index + 11}`, bn: `${["একাদশ", "দ্বাদশ"][index]} শ্রেণি` },
    order: index + 12,
  })),
] as const;

export const COMPANIONS = [
  {
    key: "pip",
    name: { en: "Pip", bn: "পিপ" },
    assets: {},
    states: ["idle", "talk", "point", "celebrate", "confused", "sad"],
  },
] as const;
