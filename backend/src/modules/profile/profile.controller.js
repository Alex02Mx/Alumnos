import { successResponse } from "../../utils/response.js";

export const profileController = (req, res) => {
  successResponse(res, req.user, "Perfil obtenido");
};