import { successResponse, errorResponse } from "../../utils/response.js";
import { loginUser, registerUser } from "./auth.service.js";
import { loginSchema, registerSchema } from "./auth.schema.js";

export const register = async (req, res, next) => {
  try {
    const validation = registerSchema.safeParse(req.body);

    if (!validation.success) {
      return errorResponse(res, validation.error.issues[0].message, 400);
    }

    const user = await registerUser(validation.data);

    successResponse(res, user, "Usuario registrado", 201);
  } catch (error) {
    next(error);
    // errorResponse(res, err.message, 400);
  }
};

export const login = async (req, res, next) => {
  try {
    const validation = loginSchema.safeParse(req.body);
   
    if (!validation.success) {
      return errorResponse(res, validation.error.issues[0].message, 400);
    }

    const result = await loginUser(validation.data);

    successResponse(res, result, "Login exitoso");
 
  } catch (error) {
    next(error);
  }
};

export const me = (req, res)=>{
  const {id, email, role} = req.user;
  return successResponse(res, {id, email, role}, "User session");
};