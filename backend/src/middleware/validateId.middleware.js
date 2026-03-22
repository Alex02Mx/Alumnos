export const validateId = (req, res, next) => {
  const id = Number(req.params.id);

  if (!id || !Number.isInteger(id) || id <= 0) {
    return res.status(400).json({
      success: false,
      message: "ID inválido"
    });
  }

  req.id = id;
  next();
};