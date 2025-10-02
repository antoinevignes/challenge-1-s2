import { Router } from "express";
import {
  getProducts,
  getProductById,
  updateProductById,
  deleteProduct,
  addProduct,
  getProductForModify,
} from "../controllers/product.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/", getProducts);
router.get("/add", authMiddleware, (_, res) => res.render("add"));
router.get("/detail/:id", getProductById);
router.get("/modify/:id", authMiddleware, getProductForModify);
router.post("/modify/:id", authMiddleware, updateProductById);
router.post("/delete/:id", authMiddleware, deleteProduct);
router.post("/add", authMiddleware, addProduct);

export default router;
