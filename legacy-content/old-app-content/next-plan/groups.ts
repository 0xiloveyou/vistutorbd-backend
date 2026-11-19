import type { Bilingual, GroupId } from "./types";

export type GroupMeta = {
  id: GroupId;
  label: Bilingual;
  bandId: string;
  classLevelIds: string[];
  classBandIds: string[];
  /** Suggested look for future work; first release keeps Bolt everywhere. */
  theme: Bilingual;
  companion: Bilingual;
  defaultStyle: "robot" | "line" | "text";
};

/**
 * The five school groups, aligned with the existing Prisma taxonomy seeds.
 * `classLevelIds` are the ids used by `LearnCarousel` documents.
 */
export const NEXT_PLAN_GROUPS: Record<GroupId, GroupMeta> = {
  "play-nursery": {
    id: "play-nursery",
    label: { en: "Play & Nursery", bn: "প্লে ও নার্সারি" },
    bandId: "PLAY_NURSERY",
    classLevelIds: ["play", "nursery"],
    classBandIds: ["PLAY_NURSERY"],
    theme: { en: "mango tree, farm, zoo", bn: "আমগাছ, খামার, চিড়িয়াখানা" },
    companion: { en: "Bolt, big and friendly", bn: "বোল্ট, বড় ও বন্ধুসুলভ" },
    defaultStyle: "robot",
  },
  "class-1-5": {
    id: "class-1-5",
    label: { en: "Class 1–5", bn: "শ্রেণি ১–৫" },
    bandId: "C1_5",
    classLevelIds: ["class-1", "class-2", "class-3", "class-4", "class-5"],
    classBandIds: ["C1_5"],
    theme: {
      en: "bazar, school bus, pitha shop",
      bn: "বাজার, স্কুল বাস, পিঠার দোকান",
    },
    companion: {
      en: "Bolt, jet boots and a yellow pen",
      bn: "বোল্ট, জেট বুট ও হলুদ কলম",
    },
    defaultStyle: "robot",
  },
  "class-6-8": {
    id: "class-6-8",
    label: { en: "Class 6–8", bn: "শ্রেণি ৬–৮" },
    bandId: "C6_8",
    classLevelIds: ["class-6", "class-7", "class-8"],
    classBandIds: ["C6_8"],
    theme: { en: "river, rickshaw, cricket", bn: "নদী, রিকশা, ক্রিকেট" },
    companion: { en: "Bolt, line-art guide", bn: "বোল্ট, রেখাচিত্র সহায়ক" },
    defaultStyle: "robot",
  },
  "class-9-10": {
    id: "class-9-10",
    label: { en: "Class 9–10", bn: "শ্রেণি ৯–১০" },
    bandId: "C9_10",
    classLevelIds: ["class-9", "class-10"],
    classBandIds: ["C9_10"],
    theme: { en: "minar, bridge, field", bn: "মিনার, সেতু, মাঠ" },
    companion: { en: "Bolt, small corner guide", bn: "বোল্ট, কোণার ছোট সহায়ক" },
    defaultStyle: "robot",
  },
  "class-11-12": {
    id: "class-11-12",
    label: { en: "Class 11–12", bn: "শ্রেণি ১১–১২" },
    bandId: "C11_12",
    classLevelIds: ["class-11", "class-12"],
    classBandIds: ["C11_12"],
    theme: { en: "lab, stock market, space", bn: "ল্যাব, শেয়ারবাজার, মহাকাশ" },
    companion: { en: "Bolt, opt-in explainer", bn: "বোল্ট, ইচ্ছেমতো ব্যাখ্যাকার" },
    defaultStyle: "robot",
  },
};

export const GROUP_ORDER: GroupId[] = [
  "play-nursery",
  "class-1-5",
  "class-6-8",
  "class-9-10",
  "class-11-12",
];
