const createError = (status, message) => {
  const error = new Error();
  error.status = status;
  error.message = message;
  return error;
};

const errorHandler = (err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";

  return res.status(errorStatus).json({
    success: false,
    error: errorMessage,
    // stack: err.stack,
  });
}

module.exports = {
  createError, errorHandler
}