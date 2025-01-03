const validator = require("validator");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { compareValue } = require("../utils/bcrypt");
const userSchema = new mongoose.Schema({
  fname: {
    type: String,
    required: [true, "Please provide your first name."],
  },
  sname: {
    type: String,
    required: [true, "Please provide your surname."],
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    required: [true, "Please provide your email."],
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  verified: { type: Boolean, default: false, required: true },
  photo: {
    type: String,
    default: "default.jpg",
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minlength: 8,
  },
});

// hash password before save.
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

userSchema.methods.comparePassword = async function (val) {
  return compareValue(val, this.password);
};

userSchema.methods.omitPassword = function () {
  const user = this.toObject();
  delete user.password;
  return user;
};

const User = mongoose.model("users", userSchema);

module.exports = User;
