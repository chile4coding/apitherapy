const User = require("../models/client-users");
const Therapist = require("../models/therapist-users");
const { validationResult } = require("express-validator");
exports.editUser = (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({
      error: error.array(),
    });
  }
  const email = req.body.email;
  const name = req.body.name;
  const location = req.body.location;
  const userId = req.userId.toString();

  
  User.findOne({ _id: userId })
    .then((user) => {
      if (!user) {
        return res.status(400).json({
          errorMessage: "Unauthaurized user!",
        });
      }
        
      if (user.activated && user.boarded) {
        user.email = email;
        user.name = name;
        user.location = location;
        user.save();
        return res.status(200).json({
          message: "Details successfully saved!",
          name: user.name,
          email: user.email,
          location: user.location,
        });
      } else {
        return res.status(400).json({
          message: "Unauthorized user!",
        })
      }
    })
    .catch((err) => {
      return res.status(400).json({
        message: "Server Error! Please refresh",
      });
    });
  };
  
  exports.editTherapistUser = (req, res, next) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({
        error: error.array(),
      });
    }
    const email = req.body.email;
    const name = req.body.name;
    const location = req.body.location;
    const specialty = req.body.specialty;
    const liscense = req.body.liscense;
    const userId = req.userId.toString();
    console.log("======================= ", userId)
    
  Therapist.findOne({ _id: userId })
    .then((user) => {
      if (!user) {
        return res.status(400).json({
          errorMessage: "Unauthaurized user!",
        });
      }
    
      if (user.activated && user.boarded) {
        user.email = email;
        user.name = name;
        user.location = location;
        user.specialty = specialty;
        user.location = location;
        user.liscense = liscense;
        user.save();
        return res.status(200).json({
          message: "Details successfully saved!",
          name: user.name,
          email: user.email,
          location: user.location,
          liscense: user.liscense,
          specialty: user.specialty
        });
      } else {
        return res.status(200).json({
          errorMessage: "Unauthaurized user!",
        });
      }
    })
    .catch((err) => {
      return res.status(400).json({
        message: "Server Error! Please refresh",
      });
    });
};
