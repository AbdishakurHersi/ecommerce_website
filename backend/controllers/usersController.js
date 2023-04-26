import User from "../model/User.js";
import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";

export const registerUserController = asyncHandler(async (req, res) => {
  const { fullname, email, password } = req.body;
  //check user exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    throw new Error("user already exists");
  }
  //hashed password
  //create the user
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const user = await User.create({
    fullname,
    email,
    password: hashedPassword,
  });
  res.send(201).json({
    status: "success",
    msg: "user registered successfully",
    data: user,
  });
});

export const loginUserController = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  //check user exists
  const userFound = await User.findOne({ email });
  if (
    userFound &&
    (await bcrypt.compare(password, userFound && userFound.password))
  ) {
    res.status.json({
      status: "success",
      msg: "successfully logged in",
    });
  } else {
    throw new Error("Invalid login credentials");
  }
});
