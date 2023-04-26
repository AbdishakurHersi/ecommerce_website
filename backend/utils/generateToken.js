import jwt from "jsonwebtoken";

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWY_KEY, { expiresIn: "3d" });
};

export default generateToken;
