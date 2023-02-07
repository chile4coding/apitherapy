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
  

 
  User.findOne({ email: email })
    .then((user) => {
      if (user) {
        const token = jwt.sign(
          {
            email: email,
            userId: user._id.toString(),
          },
          "mysecretmysecretchile",
          { expiresIn: "2h" }
        );

        return res.status(200).json({
          message: "Login successful",
          token: token,
          userId: user._id.toString(),
          email: user.email,
          activated: true,
          boarded: true,
          imageUrl: user.imageUrl,
          name: user.name
        
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
            boarded: true,
            
          });
          newUser.save().then((user) => {
            const token = jwt.sign(
              {
                email: email,
                userId: user._id.toString(),
              },
              "mysecretmysecretchile",
              { expiresIn: "2h" }
            );

            return res.status(200).json({
              message: "Login successful",
              token: token,
              userId: user._id.toString(),
              email: user.email,
              activated: true,
              boarded: true,
              googleUser: true,
              imageUrl: user.imageUrl,
              name: user.name
             
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
