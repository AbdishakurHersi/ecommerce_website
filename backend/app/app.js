import dotenv from "dotenv";
dotenv.config();
import express from "express";
import dbConnect from "../config/dbConnect.js";
import {
  globalErrorHandler,
  notFound,
} from "../middlewares/globalErrorHandler.js";
import userRoutes from "../routes/usersRoute.js";
dbConnect();
const app = express();
app.use(express.json());
//route
app.use("/", userRoutes);
app.use(notFound);
app.use(globalErrorHandler);

export default app;
