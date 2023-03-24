const express = require("express");
const passport = require("passport");
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");

require("../utils/passport")(passport);

const router = express.Router();

router.route("/signup").post(authController.signup);
router.route("/login").post(authController.login);

// router.route("/login/google").post(authController.googleAuth);

//All the routes after this are protected by the passport JWT AUTH
router.use(passport.authenticate("jwt", { session: false }));

router.route("/log-out").get(authController.logout);

router.route("/").get(userController.getAllUsers);
router.route("/:id").get(userController.getAUser);

module.exports = router;
