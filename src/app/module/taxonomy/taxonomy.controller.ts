import type { Request, Response } from "express";
import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { TaxonomyService } from "./taxonomy.service";

const str = (value: unknown) =>
  typeof value === "string" && value.trim() ? value.trim() : undefined;

const listBands = catchAsync(async (req: Request, res: Response) => {
  const includeInactive =
    req.user?.role === "ADMIN" && req.query.all === "true";
  const data = await TaxonomyService.listBands(includeInactive);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Class bands fetched.",
    data,
  });
});

const listLevels = catchAsync(async (req: Request, res: Response) => {
  const data = await TaxonomyService.listLevels(str(req.query.bandId));

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Class levels fetched.",
    data,
  });
});

const getLevel = catchAsync(async (req: Request, res: Response) => {
  const data = await TaxonomyService.getLevel(String(req.params.id));

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Class level fetched.",
    data,
  });
});

const listCategories = catchAsync(async (req: Request, res: Response) => {
  const includeInactive =
    req.user?.role === "ADMIN" && req.query.all === "true";
  const data = await TaxonomyService.listCategories({
    classLevelId: str(req.query.classLevelId),
    parentId: str(req.query.parentId),
    includeInactive,
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Categories fetched.",
    data,
  });
});

const getCategory = catchAsync(async (req: Request, res: Response) => {
  const data = await TaxonomyService.getCategory(String(req.params.id));

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Category fetched.",
    data,
  });
});

const createCategory = catchAsync(async (req: Request, res: Response) => {
  const data = await TaxonomyService.createCategory(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Category created.",
    data,
  });
});

const updateCategory = catchAsync(async (req: Request, res: Response) => {
  const data = await TaxonomyService.updateCategory(
    String(req.params.id),
    req.body,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Category updated.",
    data,
  });
});

const deleteCategory = catchAsync(async (req: Request, res: Response) => {
  await TaxonomyService.deleteCategory(String(req.params.id));

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Category deleted.",
    data: null,
  });
});

const listChapters = catchAsync(async (req: Request, res: Response) => {
  const includeUnpublished =
    Boolean(req.user) &&
    ["ADMIN", "MODERATOR"].includes(req.user?.role ?? "") &&
    req.query.all === "true";

  const data = await TaxonomyService.listChapters({
    categoryId: str(req.query.categoryId),
    classLevelId: str(req.query.classLevelId),
    classBandId: str(req.query.classBandId),
    includeUnpublished,
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Chapters fetched.",
    data,
  });
});

const getChapter = catchAsync(async (req: Request, res: Response) => {
  const data = await TaxonomyService.getChapter(String(req.params.id));

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Chapter fetched.",
    data,
  });
});

const createChapter = catchAsync(async (req: Request, res: Response) => {
  const data = await TaxonomyService.createChapter(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Chapter created.",
    data,
  });
});

const updateChapter = catchAsync(async (req: Request, res: Response) => {
  const data = await TaxonomyService.updateChapter(
    String(req.params.id),
    req.body,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Chapter updated.",
    data,
  });
});

const deleteChapter = catchAsync(async (req: Request, res: Response) => {
  await TaxonomyService.deleteChapter(String(req.params.id));

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Chapter deleted.",
    data: null,
  });
});

export const TaxonomyController = {
  listBands,
  listLevels,
  getLevel,
  listCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
  listChapters,
  getChapter,
  createChapter,
  updateChapter,
  deleteChapter,
};
