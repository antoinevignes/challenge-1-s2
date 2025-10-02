import { Router } from "express";
import { login, logout } from "../controllers/user.controller.js";

const router = Router();

router.get("/login", (_, res) => res.render("login"));
router.post("/login", login);
router.get("/logout", logout);

export default router;
