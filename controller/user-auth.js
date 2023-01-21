const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const clientuser = require("../models/client-users");
const TherapistUser = require("../models/therapist-users");
const bcrypt = require("bcryptjs");


  exports.postClientLogin = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    console.log("================", req.body);
    
    let loadUserId;
    clientuser.findOne({ email: email }).then((user) => {
    if (!user) {
      return res.status(400).json({
        message: "User does not exist please sign up",
      });
    }
    bcrypt
    .compare(password, user.password)
      .then((isEqual) => {
        if (!isEqual) {
          return res.status(400).json({
            errorMessage: "Incorrect Passsword!",
          });
        }
        loadUserId = user;
        const token = jwt.sign(
          {
            email: loadUserId.email,
            userId: loadUserId._id.toString(),
          },
          "mysecretmysecretchile",
          { expiresIn: "3h" }
        );
        return res.status(200).json({
          message: "Login successful",
          token: token,
          userId: loadUserId._id.toString(),
          email: loadUserId.email,
          activated: loadUserId.activated,
          boarded: loadUserId.boarded
        });
      })
      .catch((err) => {
        return res.status(400).json({
          message: "Server Error!, please refresh your browser",
        });
      });
  });
};


exports.therapistLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  let loadUserId;
  TherapistUser.findOne({ email: email }).then((user) => {
    if (!user) {
      return res.status(400).json({
        message: "User does not exist please sign up",
      });
    }

    bcrypt
      .compare(password, user.password)
      .then((isEqual) => {
        if (!isEqual) {
          return res.status(400).json({
            errorMessage: "Incorrect Passsword!",
          });
        }
        loadUserId = user;
        const token = jwt.sign(
          {
            email: loadUserId.email,
            userId: loadUserId._id.toString(),
          },
          "mysecretmysecretchile",
          { expiresIn: "1h" }
        );
        return res.status(200).json({
          message: "Login successful",
          token: token,
          userId: loadUserId._id.toString(),
          email: loadUserId.email,
          activated: loadUserId.activated
        });
      })
      .catch((err) => {
        return res.status(400).json({
          message: "Server Error!, please refresh your browser",
        });
      });
  });
};
