const City = require("../model/cityModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

exports.createCity = catchAsync(async (req, res, next) => {
  const city = await City.create({
    name: req.body.name,
    user: req.body.user,
  });

  res.status(200).json({
    status: "success",
    city,
  });
});

exports.getAllCities = catchAsync(async (req, res, next) => {
  const cities = await City.find();

  if (cities.length == 0) return next(new AppError("No cities found!", 404));

  res.status(200).json({
    status: "success",
    results: cities.length,
    data: cities,
  });
});

exports.getACity = catchAsync(async (req, res, next) => {
  const city = await City.findById(req.params.id);

  if (!city) return next(new AppError("No city found with that id!", 404));

  res.status(200).json({
    status: "success",
    data: city,
  });
});
