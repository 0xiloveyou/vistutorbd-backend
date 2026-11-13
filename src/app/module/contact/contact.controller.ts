import type { Request, Response } from "express";
import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { ContactService } from "./contact.service";

const sendMessage = catchAsync(async (req: Request, res: Response) => {
  const data = await ContactService.sendContactMessage(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Message sent. We will get back to you soon.",
    data,
  });
});

export const ContactController = { sendMessage };
