import { generateToken, verifyToken } from "./utils/jwt.js";

const token = generateToken({ id: 1 });

console.log("TOKEN:", token);

const decoded = verifyToken(token);

console.log("DECODED:", decoded);


