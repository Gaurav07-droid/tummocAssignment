const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },

    email: {
      type: String,
      required: [true, "A user must have an email"],
      unique: [true, "Email already exists!Please use other one"],
      lowercase: true,
      validate: [validator.isEmail, "Please provide a valid email"],
    },

    password: {
      type: String,
      required: [true, "Please provide a password"],
      minLength: [8, "password will be 8 characters"],
      select: false,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

//populating cities with user wihtout storing them in the user schema
//by virtual populate which saves space for the schema

userSchema.virtual("city", {
  ref: "City",
  localField: "_id",
  foreignField: "user",
});

//Hashing the password before saving to the database
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);

  next();
});

//Comparing the password entered by the user while login
userSchema.methods.correctPassword = async function (candidatePass, userPass) {
  return await bcrypt.compare(candidatePass, userPass);
};

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
