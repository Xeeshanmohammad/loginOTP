const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    otp: {
      type: Number,
    },
    accountBlocked: {
      type: Boolean,
      default: false,
    },
    accountBlockedTime: {
      type: Date,
    },
    OtpSentTime: {
      type: Date,
    },
    incorrectOtpCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
