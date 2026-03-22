import { Router } from "express";
import { login, register, me} from "./auth.controller.js";
import authmiddleware from "../../middleware/auth.middleware.js";

const router = Router();

router.post("/login", login);
router.post("/register", register);

router.get("/me", authmiddleware, me);

export default router;


