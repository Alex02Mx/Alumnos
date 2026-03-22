import { sanitize } from "./sanitize.js";
import { serializer } from "./serializer.js";

const clean = (data) => serializer(sanitize(data));

export const successResponse = (res, data, message = "OK", status = 200) => {

  return res.status(status).json({
    success: true,
    data: clean(data),
    message,
    status,
    timeStamp: new Date().toISOString()
  });
};

export const errorResponse = (res, error, status = 500) => {
  return res.status(status).json({
    success: false,
    error,
    status,
    timeStamp: new Date().toISOString()
  });
};

