import type { LearnCarouselKind } from "@prisma/client";
import type { Request, Response } from "express";
import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { LearnService } from "./learn.service";

const str = (value: unknown) =>
  typeof value === "string" && value.trim() ? value.trim() : undefined;

const kind = (value: unknown): LearnCarouselKind | undefined => {
  const normalized = str(value)?.toUpperCase();
  if (normalized === "EXPLANATION" || normalized === "QUESTION") {
    return normalized;
  }
  return undefined;
};

const listCarousels = catchAsync(async (req: Request, res: Response) => {
  const data = await LearnService.listCarousels({
    classLevelId: str(req.query.classLevelId),
    kind: kind(req.query.kind),
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Learn carousels fetched.",
    data,
  });
});

const getCarousel = catchAsync(async (req: Request, res: Response) => {
  const data = await LearnService.getCarousel(String(req.params.slug));

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Learn carousel fetched.",
    data,
  });
});

export const LearnController = {
  listCarousels,
  getCarousel,
};
