import {
  CLASS1_VISUALIZATIONS as CLASS1_BASE_VISUALIZATIONS,
} from "./visualizations";
import { CLASS1_CATALOG_VISUALIZATIONS } from "./catalog";

export { CLASS1_CATEGORIES } from "./categories";
export { CLASS1_CATALOG_VISUALIZATIONS };
export const CLASS1_VISUALIZATIONS = [
  ...CLASS1_BASE_VISUALIZATIONS,
  ...CLASS1_CATALOG_VISUALIZATIONS,
];
export type {
  PlayCategoryDef as Class1CategoryDef,
  PlayVisualizationDef as Class1VisualizationDef,
} from "../play/play.types";
