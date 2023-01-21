const otpGenerator = require("otp-generator");
const User = require("../models/client-users");
const nodemailer = require("nodemailer");
const requestPromise = require("request-promise");
const bcrypt = require("bcryptjs");
const {validationResult} = require('express-validator')

exports.postLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const name = req.body.name;

  // const error = validationResult(req)
  // if(error.isEmpty()){
  //   return res.status(400).json({
  //      error: error.array(),
  //   })
  // }
  //   check if user exist in the data base if not the  you have to insert the user

  User.findOne({ email: email }).then((user) => {
    if (!user) {
      // generate a new OTP of 4 digits
      const otp = otpGenerator.generate(4, {
        upperCaseAlphabets: false,
        specialChars: false,
        lowerCaseAlphabets: false,
      });

      //    hash the password he provided and store in the database togehter with his new OTP
      bcrypt.hash(password, 12).then((hashPw) => {
        const newUser = new User({
          name: name,
          email: email,
          password: hashPw,
          isLoggedIn: false,
          imageUrl: "",
          OTP: otp,
          activated: false,
          expires: new Date().getTime() + 10,
          boarded: false, //    also send a  mail to the user email with his otp
        });
        return newUser.save();
      });

      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "chileomereji@gmail.com",
          pass: process.env.GMAIL_PASSWORD, //"eyohirzismtgyqcu", // gmail password
        },
      });
      const mailOptions = {
        from: "TherapyApp@gmail.com",
        to: email,
        subject: "TherapyApp Registration Code",
        html: `<p> Enter your Registration code to confirm your registration </p> <br/> <h3>Code:   ${otp}</h3>`,
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("============== Email sent: " + info.response);
          return res.status(200).json({
            message: "OTP sent to your mail, Enter OTP for confirmation",
          });
          // do something useful
        }
      });
    } else if (user && !user.activated) {
      bcrypt.hash(password, 12).then((hashPw) => {
        const otp = otpGenerator.generate(4, {
          upperCaseAlphabets: false,
          specialChars: false,
          lowerCaseAlphabets: false,
        });

        user.name = name;
        user.email = email;
        user.isLoggedIn = false;
        user.OTP = otp;
        user.password = hashPw;
        user.activated = false;
        user.expires = new Date().getTime() + 1800000;
        user.boarded = false;
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: "chileomereji@gmail.com",
            pass: process.env.GMAIL_PASSWORD, //"eyohirzismtgyqcu", // gmail password
          },
        });
        const mailOptions = {
          from: "TherapyApp@gmail.com",
          to: email,
          subject: "TherapyApp Registration Code",
          html: `<p>Dear ${name}, Enter your Registration code to confirm your registration </p>   <hr/> <h3>Code:   ${otp}</h3>  <p>Registration code expires in 30 minutes</p>`,
        };

        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            console.log(error);
          } else {
            console.log("============== Email sent: " + info.response);
            return res.status(200).json({
              message: "OTP sent to your mail, Enter OTP for confirmation",
            });
            // do something useful
          }
        });

        return user.save();
      });
    } else {
      res.status(200).json({
        meesage: "User exist, please provide another email address",
      });
    }
  });
};

exports.confirmUser = (req, res, next) => {
  const OTP = req.body.OTP;

  User.findOne({ OTP: OTP }).then((user) => {
    if (!user) {
      return res.status(200).json({
        errorMessage:
          "Wrong Registration code, please provide the correct OTP sent to this user",
      });
    }

    if (!user.activated) {
      const currentTime = new Date().getTime();
      if (currentTime > user.expires) {
        return res.status(200).json({
          message: "Registration Code has expired, please register again",
        });
      }
      user.activated = true;
      user.boarded = false;

      user.save();

      return res.status(200).json({
        message:
          "Registration  confirmation successful, you can proceed to login",
        activated: true,
        boarded: false,
        userId: user._id,
      });
    } else {
      return res.status(200).json({
        message: "Registration code has been used by this user",
      });
    }
  });
};
