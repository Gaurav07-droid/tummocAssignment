const User = require("../model/userModel");
// const passport = require("passport");
const Jwt = require("jsonwebtoken");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

// require("../utils/passportGoogle")(passport);

const signJwt = (id) => {
  return Jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  const token = signJwt(newUser.id);

  res.status(200).json({
    status: "success",
    token,
    data: newUser,
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password)
    return next(new AppError("Please provide email and password!", 404));

  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError("Incorrect email or password!", 401));
  }

  const token = signJwt(user.id);

  res.status(200).json({
    staus: "success",
    token,
    data: user,
  });
});

// exports.googleAuth = async (req, res, next) => {
//   passport.authenticate(
//     "google",
//     {
//       scope: ["email", "profile"],
//     },
//     function (err, data) {
//       console.log(err);
//       console.log(data);
//     }
//   );
// };

exports.logout = catchAsync(async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];

  const decoded = Jwt.verify(token, process.env.JWT_SECRET_KEY);

  // console.log(decoded);

  let expToken = Jwt.sign({ id: decoded.id }, "iamexpired", {
    expiresIn: process.env.JWT_LOGOUT_EXPIRATION,
  });

  res.status(200).json({
    status: "success",
    token: expToken,
    message: "Logged out successfully!",
  });
});
