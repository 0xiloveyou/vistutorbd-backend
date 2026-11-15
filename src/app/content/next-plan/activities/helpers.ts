import type { Bilingual, Coach } from "../types";

export const b = (en: string, bn: string): Bilingual => ({ en, bn });

export const coach = (value: Coach): Coach => value;
