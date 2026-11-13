import type { Request, Response } from "express";
import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { VisualizationService } from "./visualization.service";

const str = (value: unknown) =>
  typeof value === "string" && value.trim() ? value.trim() : undefined;

const isEditor = (role?: string) => role === "ADMIN" || role === "MODERATOR";

const listVisualizations = catchAsync(async (req: Request, res: Response) => {
  const result = await VisualizationService.listVisualizations({
    tag: str(req.query.tag),
    band: str(req.query.band),
    kind: str(req.query.kind) as
      | "STATIC"
      | "ANIMATED"
      | "STEPPER"
      | "SLIDER_GRAPH"
      | "SCENE"
      | undefined,
    q: str(req.query.q),
    includeUnpublished: isEditor(req.user?.role) && req.query.all === "true",
    page: Number(req.query.page) || 1,
    limit: Number(req.query.limit) || 20,
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Visualizations fetched.",
    data: result.items,
    meta: result.meta,
  });
});

const getVisualization = catchAsync(async (req: Request, res: Response) => {
  const data = await VisualizationService.getVisualization(
    String(req.params.vizId),
    isEditor(req.user?.role) && req.query.all === "true",
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Visualization fetched.",
    data,
  });
});

const createVisualization = catchAsync(async (req: Request, res: Response) => {
  const data = await VisualizationService.createVisualization(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Visualization created.",
    data,
  });
});

const updateVisualization = catchAsync(async (req: Request, res: Response) => {
  const data = await VisualizationService.updateVisualization(
    String(req.params.vizId),
    req.body,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Visualization updated.",
    data,
  });
});

const deleteVisualization = catchAsync(async (req: Request, res: Response) => {
  await VisualizationService.deleteVisualization(String(req.params.vizId));

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Visualization deleted.",
    data: null,
  });
});

export const VisualizationController = {
  listVisualizations,
  getVisualization,
  createVisualization,
  updateVisualization,
  deleteVisualization,
};
