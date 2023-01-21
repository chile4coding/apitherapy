const User = require("../models/client-users");
const Therapist = require("../models/therapist-users")

exports.userOnbaording = (req, res, next) => {
    const boarded = req.body.boarded;
    const userId = req.body.userId;
    const hobbies = req.body.hobbies
    const stateofOrigin = req.body.stateofOrigin
    const marriageStatus = req.body.marriageStatus
    // Ensure to get the values the user will enter for the onbaording to valdate it and also ensure that this field are not just updated like that

  User.findOne({ _id: userId })
    .then((user) => {
        if(!user.activated){
            return res.status(200).json({
                message:"User has not been activated!"
            })
        }
      user.boarded = true;
      user.hobbies = hobbies
      user.stateofOrigin = stateofOrigin
      user.marriageStatus = marriageStatus
      user.save();
      return res.status(201).json({
        message: "Registration completed! you can now login",
        name: user.name,
        userId: user._id,
      });
    })
    .catch((err) => {
      return res.status(400).json({
        errorMessage: "Server Error! Please refresh",
      });
    });
};

exports.therapistOnbaording = (req, res, next) => {
  const boarded = req.body.boarded;
  const userId = req.body.userId;
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
      user.stateofOrigin = stateofOrigin
      user.marriageStatus = marriageStatus
      user.save();
      return res.status(201).json({
        message: "Registration completed! you can now login",
        name: user.name,
        userId: user._id,
      });
    })
    .catch((err) => {
      return res.status(400).json({
        errorMessage: "Server Error! Please refresh",
      });
    });
};
