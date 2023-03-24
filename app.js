const express = require("express");
const morgan = require("morgan");
const passport = require("passport");

const app = express();

const userRouter = require("./routes/userRoutes");
const cityRouter = require("./routes/cityRoutes");
const errorHandler = require("./controllers/errorHandler");

//body parser for getting req.body
app.use(express.json({ limit: "15kb" }));

app.use(morgan("dev"));

app.use(passport.initialize());

app.use("/api/v1/users", userRouter);
app.use("/api/v1/cities", cityRouter);

//Catches error in occurs in the appication at any place
app.use(errorHandler);

module.exports = app;
