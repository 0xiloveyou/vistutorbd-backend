import type { Role } from "@prisma/client";

export interface IRequestUser {
  userId: string;
  name: string;
  email: string;
  role: Role;
}

export interface ILocalizedText {
  en: string;
  bn: string;
}

export interface ILoginPayload {
  email: string;
  password: string;
}

export interface IRegisterPayload {
  name: string;
  email: string;
  password: string;
}

export interface IVerifyEmailPayload {
  email: string;
  otp: string;
}

export interface IGoogleLoginPayload {
  idToken: string;
}

export interface IForgotPasswordPayload {
  email: string;
}

export interface IResetPasswordPayload {
  email: string;
  otp: string;
  newPassword: string;
}

export interface ILessonBlockPayload {
  id?: string;
  type: string;
  order: number;
  title?: ILocalizedText;
  body?: ILocalizedText;
  formula?: string;
  vizId?: string;
  audioText?: ILocalizedText;
  companion?: string;
}

export interface ITopicPayload {
  chapterId: string;
  categoryId: string;
  classLevelId: string;
  classBandId: string;
  slug: string;
  title: ILocalizedText;
  summary: ILocalizedText;
  lesson?: ILessonBlockPayload[];
  visualizationIds?: string[];
  difficulty?: number;
  status?: "DRAFT" | "REVIEW" | "PUBLISHED" | "ARCHIVED";
}

export interface ICategoryPayload {
  classLevelId: string;
  parentId?: string | null;
  slug: string;
  title: ILocalizedText;
  summary?: ILocalizedText;
  icon?: string;
  order?: number;
  isActive?: boolean;
}

export interface IChapterPayload {
  categoryId: string;
  classLevelId: string;
  classBandId: string;
  slug: string;
  title: ILocalizedText;
  summary?: ILocalizedText;
  order?: number;
  prerequisites?: string[];
  status?: "DRAFT" | "REVIEW" | "PUBLISHED" | "ARCHIVED";
}

export interface IVisualizationPayload {
  vizId: string;
  kind: "STATIC" | "ANIMATED" | "STEPPER" | "SLIDER_GRAPH" | "SCENE";
  renderer: string;
  engine: string;
  title: ILocalizedText;
  summary?: ILocalizedText;
  inputs?: Record<string, unknown>;
  spec?: Record<string, unknown>;
  tags?: string[];
  concepts?: string[];
  prerequisites?: string[];
  difficulty?: number;
  classBandIds?: string[];
  version?: number;
  aiContext?: string;
  status?: "DRAFT" | "REVIEW" | "PUBLISHED" | "ARCHIVED";
}

export interface IKnowledgeChunkPayload {
  topicId?: string;
  chapterId?: string;
  categoryId?: string;
  classBandId?: string;
  vizId?: string;
  stepIndex?: number;
  lang?: "en" | "bn";
  text: string;
  kind?:
    | "CONCEPT"
    | "WORKED_EXAMPLE"
    | "MISCONCEPTION"
    | "FORMULA"
    | "HINT"
    | "GLOSSARY"
    | "STEP";
}

export interface IChatPayload {
  sessionId?: string;
  question: string;
  lang?: "en" | "bn";
  classBandId?: string;
  classLevelId?: string;
  vizId?: string;
  stepIndex?: number;
  params?: Record<string, unknown>;
  topicSlug?: string;
  chapterId?: string;
  figureId?: string;
  page?: number;
}

export interface IQuizConfigPayload {
  chapterId: string;
  timeMode?: "UNLIMITED" | "BASIC" | "MEDIUM" | "HARD" | "CUSTOM";
  customSeconds?: number;
  answerMode?: "MCQ" | "TYPED";
  difficulty?: number;
  numberRange?: { min: number; max: number };
  companionSlapstick?: boolean;
}
