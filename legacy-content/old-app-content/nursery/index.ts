import { NURSERY_CATALOG_VISUALIZATIONS } from "./catalog";
import { NURSERY_VISUALIZATIONS as NURSERY_BASE_VISUALIZATIONS } from "./visualizations";

export { NURSERY_CATEGORIES } from "./categories";
export { NURSERY_CATALOG_VISUALIZATIONS } from "./catalog";

export const NURSERY_VISUALIZATIONS = [
  ...NURSERY_BASE_VISUALIZATIONS,
  ...NURSERY_CATALOG_VISUALIZATIONS,
];

export type {
  PlayCategoryDef as NurseryCategoryDef,
  PlayVisualizationDef as NurseryVisualizationDef,
} from "../play/play.types";
