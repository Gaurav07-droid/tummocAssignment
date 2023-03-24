const User = require("../model/userModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find()
    .populate({
      path: "city",
      select: "-user -__v",
    })
    .select("-__v");

  if (users.length == 0) return next(new AppError("No users found!", 404));

  res.status(200).json({
    status: "success",
    results: users.length,
    data: users,
  });
});

exports.getAUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) return next(new AppError("No user found with that id!", 404));

  res.status(200).json({
    status: "success",
    data: user,
  });
});
