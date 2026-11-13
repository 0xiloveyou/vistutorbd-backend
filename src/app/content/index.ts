import type { ClassContentPack } from "../utils/seed-class-content";
import { CLASS1_CATEGORIES, CLASS1_VISUALIZATIONS } from "./class-1";
import { CLASS2_CATEGORIES, CLASS2_VISUALIZATIONS } from "./class-2";
import { CLASS3_CATEGORIES, CLASS3_VISUALIZATIONS } from "./class-3";
import { CLASS4_CATEGORIES, CLASS4_VISUALIZATIONS } from "./class-4";
import { CLASS5_CATEGORIES, CLASS5_VISUALIZATIONS } from "./class-5";
import { CLASS6_CATEGORIES, CLASS6_VISUALIZATIONS } from "./class-6";
import { CLASS7_CATEGORIES, CLASS7_VISUALIZATIONS } from "./class-7";
import { CLASS8_CATEGORIES, CLASS8_VISUALIZATIONS } from "./class-8";
import { CLASS9_CATEGORIES, CLASS9_VISUALIZATIONS } from "./class-9";
import { CLASS10_CATEGORIES, CLASS10_VISUALIZATIONS } from "./class-10";
import { CLASS11_CATEGORIES, CLASS11_VISUALIZATIONS } from "./class-11";
import { CLASS12_CATEGORIES, CLASS12_VISUALIZATIONS } from "./class-12";
import { NURSERY_CATEGORIES, NURSERY_VISUALIZATIONS } from "./nursery";
import { PLAY_CATEGORIES, PLAY_VISUALIZATIONS } from "./play";

export const CONTENT_PACKS: ClassContentPack[] = [
  {
    levelId: "play",
    bandId: "PLAY_NURSERY",
    label: "Play",
    categories: PLAY_CATEGORIES,
    visualizations: PLAY_VISUALIZATIONS,
  },
  {
    levelId: "nursery",
    bandId: "PLAY_NURSERY",
    label: "Nursery",
    categories: NURSERY_CATEGORIES,
    visualizations: NURSERY_VISUALIZATIONS,
  },
  {
    levelId: "class-1",
    bandId: "C1_5",
    label: "Class 1",
    categories: CLASS1_CATEGORIES,
    visualizations: CLASS1_VISUALIZATIONS,
  },
  {
    levelId: "class-2",
    bandId: "C1_5",
    label: "Class 2",
    categories: CLASS2_CATEGORIES,
    visualizations: CLASS2_VISUALIZATIONS,
  },
  {
    levelId: "class-3",
    bandId: "C1_5",
    label: "Class 3",
    categories: CLASS3_CATEGORIES,
    visualizations: CLASS3_VISUALIZATIONS,
  },
  {
    levelId: "class-4",
    bandId: "C1_5",
    label: "Class 4",
    categories: CLASS4_CATEGORIES,
    visualizations: CLASS4_VISUALIZATIONS,
  },
  {
    levelId: "class-5",
    bandId: "C1_5",
    label: "Class 5",
    categories: CLASS5_CATEGORIES,
    visualizations: CLASS5_VISUALIZATIONS,
  },
  {
    levelId: "class-6",
    bandId: "C6_8",
    label: "Class 6",
    categories: CLASS6_CATEGORIES,
    visualizations: CLASS6_VISUALIZATIONS,
  },
  {
    levelId: "class-7",
    bandId: "C6_8",
    label: "Class 7",
    categories: CLASS7_CATEGORIES,
    visualizations: CLASS7_VISUALIZATIONS,
  },
  {
    levelId: "class-8",
    bandId: "C6_8",
    label: "Class 8",
    categories: CLASS8_CATEGORIES,
    visualizations: CLASS8_VISUALIZATIONS,
  },
  {
    levelId: "class-9",
    bandId: "C9_10",
    label: "Class 9",
    categories: CLASS9_CATEGORIES,
    visualizations: CLASS9_VISUALIZATIONS,
  },
  {
    levelId: "class-10",
    bandId: "C9_10",
    label: "Class 10",
    categories: CLASS10_CATEGORIES,
    visualizations: CLASS10_VISUALIZATIONS,
  },
  {
    levelId: "class-11",
    bandId: "C11_12",
    label: "Class 11",
    categories: CLASS11_CATEGORIES,
    visualizations: CLASS11_VISUALIZATIONS,
  },
  {
    levelId: "class-12",
    bandId: "C11_12",
    label: "Class 12",
    categories: CLASS12_CATEGORIES,
    visualizations: CLASS12_VISUALIZATIONS,
  },
];
