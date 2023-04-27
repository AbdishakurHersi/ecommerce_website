import exppress from "express";
import {
  createBrandCtrl,
  deleteBrandCtrl,
  getAllBrandsCtrl,
  getSingleBrandCtrl,
  updateBrandCtrl,
} from "../controllers/brandController.js";
import isAdmin from "../middlewares/isAdmin.js";

import { isLoggedIn } from "../middlewares/isLoggedIn.js";

const brandRouter = exppress.Router();

brandRouter.post("/", isLoggedIn, isAdmin, createBrandCtrl);
brandRouter.get("/", getAllBrandsCtrl);
brandRouter.get("/:id", getSingleBrandCtrl);
brandRouter.delete("/:id", isLoggedIn, isAdmin, deleteBrandCtrl);
brandRouter.put("/:id", isLoggedIn, isAdmin, updateBrandCtrl);

export default brandRouter;
