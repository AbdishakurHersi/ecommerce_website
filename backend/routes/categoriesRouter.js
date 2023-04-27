import express from "express";
import {
  createCategoryCtrl,
  getAllCategoriesCtrl,
  getSingleCategoryCtrl,
  updateCategoryCtrl,
  deleteCategoryCtrl,
} from "../controllers/categoryController.js";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";

const categoriesRouter = express.Router();
categoriesRouter.post("/", isLoggedIn, createCategoryCtrl);
categoriesRouter.get("/", getAllCategoriesCtrl);
categoriesRouter.get("/:id", getSingleCategoryCtrl);
categoriesRouter.get("/:id", getSingleCategoryCtrl);
categoriesRouter.get("/:id", deleteCategoryCtrl);
categoriesRouter.get("/:id", updateCategoryCtrl);

export default categoriesRouter;
