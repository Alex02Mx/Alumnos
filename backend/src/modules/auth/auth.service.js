import { pool } from "../../database/pool.js";
import { hashPassword, comparePassword } from "../../utils/hash.js";
import { generateToken } from "../../utils/jwt.js";

export const registerUser = async ({ email, password }) => {
  const hashed = await hashPassword(password);

  const result = await pool.execute(
    "INSERT INTO users (email, password) VALUES (?, ?)",
    [email, hashed]
  );
 
  return { id: result.insertId, email };
};

export const loginUser = async ({ email, password }) => {
  const rows = await pool.execute(
    "SELECT id, email, password, role FROM users WHERE email = ?",
    [email]
  );
  
  const user = rows[0];
  
  if (!user) throw new Error("Invalid credentials");

  const match = await comparePassword(password, user.password);
  if (!match) throw new Error("Invalid credentials");

  const token = generateToken({
    id: user.id,
    email: user.email,
    role: user.role
  });

    return {
    token,
    user: {
      id: user.id,
      email: user.email,
      role: user.role
    }
  };
};