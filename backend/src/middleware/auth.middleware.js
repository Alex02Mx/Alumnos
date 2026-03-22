import { verifyToken } from "../utils/jwt.js";
import { errorResponse } from "../utils/response.js";

export default (req, res, next) => {
  try {
    // retorna  'Bearer eyJhbGc......'
    const authHeader = req.headers.authorization;
 
    if (!authHeader?.startsWith("Bearer ")) return errorResponse(res, "Token requerido", 401);

    // retorna  'eyJhbGc......'
    const token = authHeader.split(" ")[1];

    // retorna { id: 4, email: 'admin@test.com', role: 'admin', iat: 1772868305, exp: 1772875505}
    const decoded = verifyToken(token);

    req.user = decoded;

    next();
    
  } catch {
    return errorResponse(res, "Token inválido o expirado", 403);
  }
};


