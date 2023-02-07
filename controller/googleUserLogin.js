const bcrypt = require("bcryptjs");
const otpGenerator = require("otp-generator");
const User = require("../models/client-users");
const jwt = require("jsonwebtoken");
const { response } = require("express");

exports.googleAuthUser = (req, res, next) => {
  const email = req.body.email;
  const name = req.body.name;
  const imageUrl = req.body.imageUrl;
  const password = req.body.id;
  const location = req.body.location

 
  User.findOne({ email: email })
    .then((user) => {
      if (user) {
        const token = jwt.sign(
          {
            email: email,
            userId: user._id.toString(),
          },
          "mysecretmysecretchile",
          { expiresIn: "10s" }
        );

        return res.status(200).json({
          message: "Login successful",
          token: token,
          userId: user._id.toString(),
          email: user.email,
          activated: user.activated,
          boarder: user.boarded,
          location: user.location
        });
      } else {
        bcrypt.hash(password, 12).then((hashPw) => {
          const otp = otpGenerator.generate(4, {
            upperCaseAlphabets: false,
            specialChars: false,
            lowerCaseAlphabets: false,
          });

          const newUser = new User({
            name: name,
            email: email,
            password: hashPw,
            isLoggedIn: false,
            imageUrl: imageUrl,
            OTP: otp,
            activated: true,
            boarded: false,
            location : location
          });
          newUser.save().then((user) => {
            const token = jwt.sign(
              {
                email: email,
                userId: user._id.toString(),
              },
              "mysecretmysecretchile",
              { expiresIn: "10" }
            );

            return res.status(200).json({
              message: "Login successful",
              token: token,
              userId: user._id.toString(),
              email: user.email,
              activated: user. activated,
              boarder: user.boarded,
              googleUser: true,
              location: user.location
            });
          });
        });
      }
    })
    .catch((err) => {
      return res.status(401).json({
        errorMessage: "Server Error! Please refresh",
      });
    });

 };
