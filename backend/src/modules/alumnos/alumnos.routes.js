import { Router } from "express";
import authmiddleware from "../../middleware/auth.middleware.js";
import { authorize }  from "../../middleware/role.middleware.js";
import { getAlumnos, 
         postAlumnos, 
         getAlumnoById, 
         updateAlumno, 
         patchAlumno, 
         deleteAlumno, 
         restoreAlumno,
         deletedAlumnos
        } from "./alumnos.controller.js"

const router = Router();

router.get("/", authmiddleware, getAlumnos);
router.get("/deleted", authmiddleware, authorize("admin"), deletedAlumnos);
router.patch("/:id/restore", authmiddleware, authorize("admin"), restoreAlumno);
router.post("/", authmiddleware, authorize("admin"), postAlumnos);
router.get("/:id", authmiddleware, getAlumnoById);
router.put("/:id", authmiddleware, authorize("admin"), updateAlumno);
router.patch("/:id", authmiddleware, authorize("admin"), patchAlumno);
router.delete("/:id", authmiddleware, authorize("admin"), deleteAlumno);
export default router;


