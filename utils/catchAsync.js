//This is a common function created to catch the async error in our code.
//We can resuse this function again this saves us from writing the same code again and again.

const catchAsync = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch((err) => next(err));
  };
};

module.exports = catchAsync;
