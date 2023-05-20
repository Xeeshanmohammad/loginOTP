const express = require("express");
const router = express.Router();
const User = require("../Model/userModel");
const jwt = require("jsonwebtoken");
const { uniqueId, transporter } = require("../Services/emailService");


router.post("/userSignup", async (req, res) => {
  try {
    if (!req.body.email) {
      return res.status(400).json({
        message: "Email is required to Signup",
      });
    }
    let checkUser = await User.findOne({ email: req.body.email });
    if (checkUser) {
      return res.status(200).json({
        message: "An account already exists, login to continue",
      });
    }
    const newUser = new User({
      email: req.body.email,
    });
    const createUser = await newUser.save();
    res.status(201).json({ success: true, user: createUser });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Oops! something went wrong" });
  }
});


router.post("/userLogin", async (req, res, next) => {
  try {
    if (!req.body.email) {
      return res.status(309).json({
        message: "Email is required to login",
      });
    }
    let existingUser = await User.findOne({ email: req.body.email });
    if (!existingUser) {
     return res.status(309).json({
        message: "No account found with given email",
      });
    }
    if (
      existingUser?.accountBlocked &&
      existingUser.accountBlockedTime.setHours(
        existingUser.accountBlockedTime.getHours() + 1
      ) > new Date()
    ) {
     return res.status(400).json({
        message: "Your account is blocked",
      });
    }
    if (
      existingUser?.OtpSentTime &&
      existingUser.OtpSentTime.setMinutes(
        existingUser.OtpSentTime.getMinutes() + 1
      ) > new Date()
    ) {
    return  res.status(400).json({
        message: "Your Cannot send two otp witin one minute",
      });
    }
    let otp = uniqueId(6);
    let obj = {
      otp: otp,
      accountBlocked: false,
      accountBlockedTime: "",
      OtpSentTime: new Date(),
    };

    await User.findOneAndUpdate({ _id: existingUser._id }, obj);

    // send mail
    transporter.sendMail(
      {
        from: "zeeshanmohammad.se@gmail.com",
        to: req.body.email, // receiver
        subject: "verify your account with OTP",
        text: 'Verify Otp?',
        html: `Your otp for login is <h1>${otp}</h1>`, // body
      },
      function (error, response) {
        if (error) {
          console.log("error during mail sent", error);
        }
      }
    );
    res.status(200).json({
      message: "Otp sent on mail",
    });
  
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
});

router.post("/verifyotp", async (req, res) => {
  try {
    if (!req.body.email || !req.body.otp) {
      res.status(400).json({ message: "Email is required to login" });
      return;
    }
    let DbUser = await User.findOne({ email: req.body.email });
    if (!DbUser) {
      res.status(400).json({ message: "No account found with given email" });
      return;
    }
    if (
      DbUser.incorrectOtpCount >= 5 &&
      DbUser.accountBlockedTime.setHours(
        DbUser.accountBlockedTime.getHours() + 1
      ) > new Date()
    ) {
      res.status(400).json({ message: "Your account is blocked" });
      return;
    }
    if (req.body.otp != DbUser.otp) {
      let obj = {
        incorrectOtpCount: DbUser.incorrectOtpCount + 1,
      };
      if (DbUser.incorrectOtpCount + 1 >= 5) {
        obj = {
          ...obj,
          accountBlockedTime: new Date(),
          accountBlocked: true,
        };
      }
      await User.findOneAndUpdate({ _id: DbUser._id }, obj);
      res.status(400).json({ message: "Invalid Otp" });
      return;
    }
    if (
      DbUser.otp &&
      DbUser.OtpSentTime.setMinutes(DbUser.OtpSentTime.getMinutes() + 5) <
        new Date()
    ) {
      res.status(400).json({ message: "Otp expired" });
      return;
    }
    let obj = {
      otp: null,
      accountBlocked: false,
      accountBlockedTime: "",
      incorrectOtpCount: 0,
      OtpSentTime: "",
    };
    await User.findOneAndUpdate({ _id: DbUser._id }, obj);
    let token = jwt.sign({ ID: DbUser._id }, "jwtsecret", {
      expiresIn: 60 * 60,
    });
    return res.status(200).json({ message: "Logged in", token: token });
  } catch (error) {
    res.status(500).json({ message: "Oops! something went wrong" });
  }
});

module.exports = router;
