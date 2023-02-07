const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const clientuser = require("../models/client-users");
const TherapistUser = require("../models/therapist-users");
const bcrypt = require("bcryptjs");


exports.postClientLogin = (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({
      error: error.array(),
    });
  }
  const email = req.body.email;
  const password = req.body.password;
  

  let loadUserId;
  clientuser.findOne({ email: email }).then((user) => {
    if (!user) {
      return next()
      // res.status(400).json({
      //   message: "User does not exist please sign up",
      // });
    }
    loadUserId = user;
    if (!loadUserId.activated) {
      return res.status(400).json({
        errorMessage: "Please Activate Your Account",
        activated: false,
        userId: user._id,
        username: user.name

      });
    }
    if (!loadUserId.boarded) {
      return res.status(400).json({
        errorMessage: "Please Let's Know You!",
        boarded: false,
        userId: user._id
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

        const token = jwt.sign(
          {
            email: loadUserId.email,
            userId: loadUserId._id.toString(),
          },
          "mysecretmysecretchile",
          { expiresIn: "2h" }
        );
        return res.status(200).json({
          message: "Login successful",
          token: token,
          userId: loadUserId._id.toString(),
          email: loadUserId.email,
          activated: loadUserId.activated,
          boarded: loadUserId.boarded,
          userType: 'client',
          name: loadUserId.name,
          imageUrl: loadUserId.imageUrl
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

  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({
      error: error.array(),
    });
  }
  const email = req.body.email;
  const password = req.body.password;

  let loadUserId;
  TherapistUser.findOne({ email: email }).then((user) => {
    if (!user) {
      return res.status(400).json({
        message: "User does not exist please sign up",
      });
    }
   

    loadUserId = user;
    if (!loadUserId.activated) {
      return res.status(400).json({
        errorMessage: "Please Activate Your Account",
        activated: false,
         username: user.name,
         userId: user._id,
      });
    }

    if (!loadUserId.boarded) {
      return res.status(400).json({
        errorMessage: "Please Let's Know You!",
        boarded: false,
        userId: user._id
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
     
        const token = jwt.sign(
          {
            email: loadUserId.email,
            userId: loadUserId._id.toString(),
          },
          "mysecretmysecretchile",
          { expiresIn: "2h" }
        );
        return res.status(200).json({
          message: "Login successful",
          token: token,
          userId: loadUserId._id.toString(),
          email: loadUserId.email,
          activated: loadUserId.activated,
          boarded: user.boarded,
          userType: 'therapist',
          name: loadUserId.name,
          imageUrl: loadUserId.imageUrl
        });
      })
      .catch((err) => {
        return res.status(400).json({
          message: "Server Error!, please refresh your browser",
        });
      });
  });
};
