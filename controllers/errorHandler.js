const prodError = (err, req, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
};

const devError = (err, req, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

module.exports = function (err, req, res, next) {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "fail";

  if (process.env.NODE_ENV === "development") {
    devError(err, req, res);
  } else if (process.env.NODE_ENV === "production") {
    prodError(err, req, res);
  }
};
