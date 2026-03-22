import express from "express";
import profileRoutes from "./modules/profile/profile.routes.js";
import alumnosRoutes from "./modules/alumnos/alumnos.routes.js";
import logger from "./middleware/logger.js";
import errorHandler from "./middleware/error.middleware.js";
import { apiLimiter } from "./middleware/rateLimit.middleware.js"
import cors from "cors";
import authRoutes from "./modules/auth/auth.routes.js";

const app = express();
app.use(logger);

app.use(express.json({limit: "10kb"}));

app.use(cors({
  // Linea de codigo que solo permite la conexion de esta direccion
  // origin: "http://localhost:5173"

  // Codigo para permitir la conexion de un orenador conectado al mismo network
  origin: true, 
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use("/api", apiLimiter);

app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/alumnos", alumnosRoutes);

app.use(errorHandler)

export default app;
