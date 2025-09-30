import { Router } from "express";
import userController from "../controller/user.controller.js";
import { AuthMiddleware } from "../middleware/auth.js";

const router = Router();

router.get("/", userController.home);
router.post("/login", userController.login);
router.get("/dashboard", AuthMiddleware, userController.dashboard);
router.get("/logout", userController.logout);

export default router;
