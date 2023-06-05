const mongoose = require("mongoose");
// Creating the user schema

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  refreshToken: {
    type: String,
    default: null,
  },
  isEmailConfirmed: {
    type: Boolean,
    default: false,
  },
  confirmationToken: {
    type: String,
    default: null,
  },
  resetPasswordToken: {
    type: String,
    default: null,
  },
  passwordResetTokenExpiration: {
    type: Date,
    default: null,
  },
  profilePic: {
    type: String,
    default:
      "https://www.kindpng.com/picc/m/634-6340670_generic-profile-pic-circle-hd-png-download.png",
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
