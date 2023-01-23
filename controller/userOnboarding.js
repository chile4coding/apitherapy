const User = require("../models/client-users");
const Therapist = require("../models/therapist-users")
const {validationResult} = require('express-validator')

exports.userOnbaording = (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({
      error: error.array(),
    });
  }
    
    const userId = req.body.userId;
    const hobbies = req.body.hobbies
    const stateOfOrigin = req.body.stateOfOrigin
    const marriageStatus = req.body.marriageStatus
    // Ensure to get the values the user will enter for the onbaording to valdate it and also ensure that this field are not just updated like that

  User.findOne({ _id: userId })
    .then((user) => {
        if(!user.activated){
            return res.status(200).json({
                message:"User has not been activated!",
                boarded: user.boarded
            })
        }
      user.boarded = true;
      user.hobbies = hobbies
      user.stateOfOrigin = stateOfOrigin
      user.marriageStatus= marriageStatus
      user.save();
      return res.status(201).json({
        message: "Registration completed! you can now login",
        name: user.name,
        userId: user._id,
        boarded: user.boarded,
        activated: user.activated
      });
    })
    .catch((err) => {
      return res.status(400).json({
        errorMessage: "Server Error! Please refresh",
      });
    });
};

exports.therapistOnbaording = (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({
      error: error.array(),
    });
  }
  const userId = req.body.userId;
  const hobbies = req.body.hobbies
  const stateOfOrigin = req.body.stateOfOrigin
  const marriageStatus = req.body.marriageStatus

// Ensure to get the values the user will enter for the onbaording to valdate it and also ensure that this field are not just updated like that
  Therapist.findOne({ _id: userId })
    .then((user) => {
        if(!user.activated){
            return res.status(200).json({
                message:"User has not been activated!"
            })
        }
      user.boarded = true;
      user.hobbies = hobbies
      user.stateOfOrigin = stateOfOrigin
      user.marriageStatus = marriageStatus
      user.save();
      return res.status(201).json({
        message: "Registration completed! you can now login",
        name: user.name,
        userId: user._id,
        activated: user.activated,
        boarded: user.boarded
      });
    })
    .catch((err) => {
      return res.status(400).json({
        errorMessage: "Server Error! Please refresh",
      });
    });
};
