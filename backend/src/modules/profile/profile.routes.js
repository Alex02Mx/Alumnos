import { Router } from "express";
import authMiddleware from "../../middleware/auth.middleware.js";
import { profileController } from "./profile.controller.js";

const router = Router();

router.get("/", authMiddleware, profileController);

export default router;
