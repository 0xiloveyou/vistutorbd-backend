import { Router } from "express";
import { rateLimit } from "../../middleware/rateLimit";
import { validateRequest } from "../../middleware/validateRequest";
import { ContactController } from "./contact.controller";
import { ContactValidation } from "./contact.validation";

const router = Router();

router.post(
  "/",
  rateLimit({ namespace: "contact", limit: 5, windowSeconds: 60 * 60 }),
  validateRequest(ContactValidation.SendContactZodSchema),
  ContactController.sendMessage,
);

export const ContactRoutes = router;
