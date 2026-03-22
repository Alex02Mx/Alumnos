import { createPool } from "mariadb";
import  { config }  from "../config/env.js";

export const pool = createPool({
   host: config.dbHost,
   user: config.dbUser,
   password: config.dbPassword,
   database: config.dbName,
   connectionLimit: 5,
})