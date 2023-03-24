//This class extends the Error class by whch we cam differntiate between operational and development error
//We can use this class to throw new error from our application which is operational i.e intentional

class AppError extends Error {
  constructor(message, statusCode) {
    super(message);

    this.statusCode = statusCode;
    this.status = `${this.statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperation = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
