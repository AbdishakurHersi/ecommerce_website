import express from "express";
import {
  createProductController,
  getProductsController,
  getProductController,
  updateProductController,
  deleteProductController,
} from "../controllers/productController.js";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";
const productRoutes = express.Router();
productRoutes.post("/", isLoggedIn, createProductController);
productRoutes.get("/", getProductsController);
productRoutes.get("/:id", getProductController);
productRoutes.get("/:id", isLoggedIn, updateProductController);
productRoutes.get("/:id/delete", isLoggedIn, deleteProductController);

export default productRoutes;
