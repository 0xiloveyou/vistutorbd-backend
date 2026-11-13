import { Role } from "@prisma/client";
import { Router } from "express";
import { auth } from "../../middleware/checkAuth";
import { validateRequest } from "../../middleware/validateRequest";
import { UserController } from "./user.controller";
import { UserValidation } from "./user.validation";

const router = Router();

router.get("/", auth(Role.ADMIN), UserController.listUsers);
router.patch(
  "/:id",
  auth(Role.ADMIN),
  validateRequest(UserValidation.UpdateUserZodSchema),
  UserController.updateUser,
);
router.delete("/:id", auth(Role.ADMIN), UserController.deleteUser);

export const UserRoutes = router;
