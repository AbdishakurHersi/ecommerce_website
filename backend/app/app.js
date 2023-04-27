import dotenv from "dotenv";
dotenv.config();
import express from "express";
import dbConnect from "../config/dbConnect.js";
import {
  globalErrorHandler,
  notFound,
} from "../middlewares/globalErrorHandler.js";
import userRoutes from "../routes/usersRoute.js";
import productRoutes from "../routes/productRoute.js";

dbConnect();
const app = express();
app.use(express.json());
//route
app.use("/api/v1/users/", userRoutes);
app.use("/api/v1/products/", productRoutes);
app.use(notFound);
app.use(globalErrorHandler);

export default app;
