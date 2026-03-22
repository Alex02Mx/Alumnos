import { pool } from "./db.js";

try {
    const conn = await pool.getConnection();
    console.log("✅ DB conectada correctamente");
    conn.release();
} catch (err) {
    console.error("❌ Error DB:", err.message);
}

