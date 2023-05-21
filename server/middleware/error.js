import ErrorHandler from "../utils/errorHandler.js";

export default function errorManager(err, req, res, next) {
  err._statusCode = err.statusCode || 500;
  err._message = err.message || "Internal Server Error";

  // Handling MongoDB Error -> Cast Error
  if (err.name === "CastError") {
    const message = `Resource Not Found. Invalid: ${err.path}`;
    err = new ErrorHandler(message, 400);
  }

  res.status(err._statusCode).json({
    success: false,
    message: err._message,
  });
};
