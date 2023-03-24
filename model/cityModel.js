const mongoose = require("mongoose");

const citySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide city name"],
    },

    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "City must have a user"],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

citySchema.pre(/^find/, function (next) {
  this.populate({
    path: "user",
    select: "name email",
  });

  next();
});

const cityModel = mongoose.model("City", citySchema);

module.exports = cityModel;
