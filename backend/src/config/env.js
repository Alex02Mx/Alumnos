import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({
  path: path.resolve(__dirname, "../../.env")
});

function required(name) {
    if(!process.env[name]) {
        throw new Error(`Falta variable de entorno ${name}`);
    }
    return process.env[name];
};

export const config = {
  port: Number(process.env.PORT) || 3000,
  dbHost: required("DB_HOST"),
  dbUser: required("DB_USER"),
  dbPassword: required("DB_PASSWORD"),
  dbName: required("DB_NAME"),
  JWT_SECRET: required("JWT_SECRET"),
};

