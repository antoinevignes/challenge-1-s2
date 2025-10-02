import { Router } from "express";
import {
  getProducts,
  getProductById,
  updateProductById,
  deleteProduct,
  addProduct,
} from "../controllers/product.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/", getProducts);
router.get("/:id", getProductById);
router.get("/modify/:id", authMiddleware, getProductById); // page modify
router.post("/modify/:id", authMiddleware, updateProductById);
router.post("/delete/:id", authMiddleware, deleteProduct);
router.get("/add", authMiddleware, (_, res) => res.render("add"));
router.post("/add", authMiddleware, addProduct);

export default router;
