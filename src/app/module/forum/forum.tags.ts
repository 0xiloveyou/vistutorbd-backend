/**
 * Curated starting tags. Learners can still add custom tags; these simply make
 * the common topics (matrix, algebra, geometry, ...) one tap away.
 */
export const FORUM_PREDEFINED_TAGS = [
  { id: "matrix", en: "Matrix", bn: "ম্যাট্রিক্স" },
  { id: "algebra", en: "Algebra", bn: "বীজগণিত" },
  { id: "geometry", en: "Geometry", bn: "জ্যামিতি" },
  { id: "trigonometry", en: "Trigonometry", bn: "ত্রিকোণমিতি" },
  { id: "calculus", en: "Calculus", bn: "ক্যালকুলাস" },
  { id: "arithmetic", en: "Arithmetic", bn: "পাটিগণিত" },
  { id: "probability", en: "Probability", bn: "সম্ভাবনা" },
  { id: "word-problem", en: "Word problem", bn: "শব্দ সমস্যা" },
  { id: "exam", en: "Exam prep", bn: "পরীক্ষা প্রস্তুতি" },
  { id: "suggestion", en: "Suggestion", bn: "পরামর্শ" },
  { id: "homework", en: "Homework", bn: "হোমওয়ার্ক" },
  { id: "visualization", en: "Visualization", bn: "ভিজ্যুয়ালাইজেশন" },
] as const;

export type ForumTag = { id: string; en: string; bn: string };
