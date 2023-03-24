const express = require("express");
const passport = require("passport");
const ciyController = require("../controllers/cityController");

require("../utils/passport")(passport);

const router = express.Router();

//All the routes after this are protected by the passport JWT AUTH
router.use(passport.authenticate("jwt", { session: false }));

router.route("/").post(ciyController.createCity);
router.route("/").get(ciyController.getAllCities);
router.route("/:id").get(ciyController.getACity);

module.exports = router;
