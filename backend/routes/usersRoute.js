import express from "express";
import { registerUserController } from "../controllers/usersController.js";

const userRoutes = express.Router();
userRoutes.post("/api/v1/users/register", registerUserController);

export default userRoutes;
