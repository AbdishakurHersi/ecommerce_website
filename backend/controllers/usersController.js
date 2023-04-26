import User from "../model/User.js";
import bcrypt from "bcryptjs";

export const registerUserController = async (req, res) => {
  const { fullname, email, password } = req.body;
  //check user exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.json({
      msg: "user already exists",
    });
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
};
