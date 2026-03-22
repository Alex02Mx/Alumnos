import {
  getAllAlumnosService,
  getAlumnoByIdService,
  createAlumno,
  updateAlumnoService,
  patchAlumnoService,
  deleteAlumnoService,
  restoreAlumnoService,
  getDeletedService,
} from "./alumno.service.js";
import { successResponse, errorResponse } from "../../utils/response.js";
import { alumnoSchema, idParamsSchema, paginationQuerySchema} from "./alumno.schema.js";

// ==================== GET ====================
export const getAlumnos = async (req, res, next) => {
    try {
      const validateQuery = paginationQuerySchema.parse(req.query);
      const data = await getAllAlumnosService(validateQuery);

    successResponse(res, data, "Lista paginada");
  } catch (error) {
    next(error);
  }
};

// ==================== GET BY ID ====================
export const getAlumnoById = async (req, res, next) => {
  try {
    const paramValidation = idParamsSchema.safeParse(req.params);
    
    if(!paramValidation.success) {
        return errorResponse(res, paramValidation.error.issues[0].message, 400)
    }

    const {id} = paramValidation.data;

    const alumno = await getAlumnoByIdService(id);

    if(!alumno){
      return errorResponse(res, "Alumno no encontrado", 404);
    }

    successResponse(res, alumno, "Alumno obtenido");
  } catch (error){
    next(error);
  }
};

// ==================== POST ====================
export const postAlumnos = async (req, res, next) => {
    try {
        const validation = alumnoSchema.safeParse(req.body);
        if (!validation.success) {
            return errorResponse(
                res,
                validation.error.issues[0].message,
                400
            );
        }

        const { name, course } = validation.data;

        const result = await createAlumno({ name, course } );
      
        successResponse(res, {
            id: result.id,
            name: result.name,
            course: result.course,
        }, "Alumno Creado", 201)

    } catch(error){
        next(error);
    }
};

// ==================== UPDATE  toda la fila====================
export const updateAlumno = async (req, res, next) => {
    try{

        const validation = alumnoSchema.safeParse(req.body);

        if(!validation.success){
            return errorResponse(res, validation.error.issues[0].message, 400)
        }

        const paramValidation = idParamsSchema.safeParse(req.params);
       
        if(!paramValidation.success) {
            return errorResponse(res, paramValidation.error.issues[0].message, 400)
        }

        const {id} = paramValidation.data;
        const {name, course} = validation.data;

        const result = await updateAlumnoService( id, {name, course});

        if(result.affectedRows === 0) {
            return errorResponse(res, "Alumno no encontrado", 404);
        }
 
        successResponse(res, result, "Alumno actualizado");

    } catch(error) {
        next(error);
    }
}

// ==================== PATCH MODIFICA PARCIALMENTE SOLO EL DATO QUE SE QUIERE CAMBIAR====================
export const patchAlumno = async (req,res,next)=>{
  try{
   
    const alumnoPatchSchema = alumnoSchema.partial();
    const validation = alumnoPatchSchema.safeParse(req.body)
   
    if(!validation.success){
      return errorResponse(res,validation.error.issues[0].message, 400);
    }

    const paramValidation = idParamsSchema.safeParse(req.params);

    if(!paramValidation.success) {
      return errorResponse(res, paramValidation.error.issues[0].message, 400)
    }

    const { id } = paramValidation.data;
    const fields = validation.data;

    const result = await patchAlumnoService(id, fields)

    if(result === null){
      return errorResponse(res,"Nada que actualizar",400);
    }

    if(result === false){
      return errorResponse(res,"Alumno no encontrado",404);
    }

    successResponse(res,{ id, ...fields },"Alumno actualizado parcialmente");

  } catch(error){
    next(error);
  }
};

// ==================== DELETE ====================

export const deleteAlumno = async (req,res,next)=>{
  try{

    const paramValidation = idParamsSchema.safeParse(req.params);
    
    if(!paramValidation.success){
      return errorResponse(res, paramValidation.error.issues[0].message, 400)
    }

    const { id } = paramValidation.data;

    const result = await deleteAlumnoService(id)

    if(result.affectedRows === 0){
      return errorResponse(res,"Alumno no encontrado o ya eliminado",404);
    }

    successResponse(res,null,"Alumno eliminado");

  } catch(error){
    next(error);
  }
};

// ==================== RESTORE ====================

export const restoreAlumno = async (req, res, next) => {
  try{
    const paramsValidation = idParamsSchema.safeParse(req.params);
    if(!paramsValidation.success){
      return errorResponse(res, paramsValidation.error.issues[0].message, 400);
    }

    const {id} = paramsValidation.data;
    const affected = await restoreAlumnoService(id);
    if(affected.affectedRows === 0){
      return errorResponse(res, "Alumno no encontrado o no eliminado", 400);
    }
    successResponse(res, affected, "Alumno restaurado");
  } catch(error){
      next(error)  
  }
}

// === DELETED ===
export const deletedAlumnos = async (req, res, next) => {
  try{
      const rows = await getDeletedService();
      successResponse(res, rows, "Datos en Safe Delete", 200);
  } catch(error) {
      next(error)
  }
}

