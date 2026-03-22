import jwt from "jsonwebtoken";
import { config } from "../config/env.js"


export const generateToken = (payload) =>
  jwt.sign(payload, config.JWT_SECRET, { expiresIn: "2h" });

export const verifyToken = (token) =>
  jwt.verify(token, config.JWT_SECRET);

  