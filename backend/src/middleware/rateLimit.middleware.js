import rateLimit from "express-rate-limit";
import { errorResponse } from "../utils/response.js";

const baseConfig = {
    standardHeaders: true,
    legacyHeaders: false,
    statusCode: 429
};

const createLimiter = (options) =>
    rateLimit({
        ...options,
        ...baseConfig,
    });

export const apiLimiter = createLimiter({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: {
        success: false,
        message: "Demasiadas peticiones, intenta más tarde"
    }
});

export const strictLimiter = createLimiter({
    windowMs: 10 * 60 * 1000,
    max: 5,
    message: {
        success: false,
        message: "Demasiados intentos, intenta más tarde"
    }
});

export const loginLimiter = createLimiter({
    windowMs: 10 * 60 * 1000,
    max: 5,
    handler: (req, res) => {
        console.warn("RATE LIMIT EXCEEDED:", {
            ip: req.ip,
            endpoint: req.originalUrl,
            time: new Date().toISOString()
        });
        errorResponse(res, "Demasiados intentos. Intenta más tarde.", 429 )
        // res.status(429).json({
        //     success: false,
        //     message: "Demasiados intentos. Intenta más tarde."
        // });
    }
});

