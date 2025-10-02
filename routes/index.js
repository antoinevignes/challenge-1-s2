import { Router } from "express";
import productRoute from "./product.route.js";
import userRoute from "./user.route.js";

const router = Router();

router.use("/", productRoute);
router.use("/user", userRoute);

export default router;
