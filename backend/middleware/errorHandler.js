const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode ? err.statusCode : 500;
  res.status(statusCode).json({
    error: err.message,
    statusCode,
  });
};

module.exports = {
  errorHandler,
};
