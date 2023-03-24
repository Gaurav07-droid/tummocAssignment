const jwtStrategy = require("passport-jwt").Strategy;
const extractJwt = require("passport-jwt").ExtractJwt;

const User = require("../model/userModel");

const AppError = require("./appError");

module.exports = function (passport) {
  const params = {};

  (params.secretOrKey = process.env.JWT_SECRET_KEY),
    (params.jwtFromRequest = extractJwt.fromAuthHeaderAsBearerToken()),
    passport.use(
      new jwtStrategy(params, async function (jwt_payload, next) {
        const data = await User.findById(jwt_payload.id);

        if (data) return next(null, data);

        if (!data)
          return next(
            "Invalid token ! please login again to access",
            401,
            false
          );

        return next(
          new AppError("Invalid token ! please login again to access", 401),
          false
        );
      })
    );
};
