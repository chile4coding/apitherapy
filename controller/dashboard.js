const clientuser = require("../models/client-users");
const TherapistUser = require("../models/therapist-users");
const fs = require("fs");
const path = require("path");
exports.getDashBoard = (req, res, next) => {
  const userId = req.userId;

  

  clientuser.findById({ _id: userId }).then((user) => {
    if (!user) {
      return next();
    }
    res.status(201).json({
      message: "Welcome, " + user.name,
      username: user.name,
      email: user.email,
      imageUrl:  user.imageUrl,
      userId: user._id,
      location: user.location
    });
  });
};

exports.getTherapistDashBoard = (req, res, next) => {
  const userId = req.userId;

  TherapistUser.findById({ _id: userId }).then((user) => {
    if (!user) {
      return next();
    }
    res.status(201).json({
      message: "Welcome, " + user.name,
      username: user.name,
      email: user.email,
      location: user.location,
      specialty: user.specialty,
      liscense: user.liscense,
      imageUrl: user.imageUrl,
      userId: user._id
    });
  }).catch((err) => {
    return res.status(400).json({
      message: "Server Error!, please refresh your browser",
    });
  });
};
exports.uploadProfilePics = (req, res, next) => {
  const userId = req.userId;
  const imagePath = req.file.path;
  // const imageUrl = req.file.path.replace("\\" ,"/");

  const imageUrl = req.file.path.replace("\\", "/");
  req.file.path = imageUrl;

  if (!userId) {
    return res.status(400).json({
      message: "Please upload a valid image",
    });
  }
  if (!req.file) {
    return res.status(400).json({
      message: "Please upload a valid image",
    });
  }

  clientuser
    .findById({ _id: userId })
    .then((user) => {
      if (!user) {
        return next();
      }
      clearInmage(user?.imageUrl);
      user.imageUrl = "https://apitherapy-production.up.railway.app/"+imageUrl;

      return user.save();
    })
    .then((updatedUser) => {
      return res.status(200).json({
        message: "Profile picture successfully uploaded!",
        imageUrl: updatedUser.imageUrl,
      });
    })
    .catch((err) => {
      return res.status(400).json({
        message: "Server Error!, please refresh your browser",
      });
    });
};

exports.therapistProfilePics = (req, res, next) => {
  
  const userId = req.userId;
  const imagePath = req.file.path;


  const imageUrl = req.file.path.replace("\\", "/");
  req.file.path = imageUrl;
  if (!userId) {
    return res.status(400).json({
      message: "Please upload a valid image",
    });
  }
  if (!req.file) {
    return res.status(400).json({
      message: "Please upload a valid image",
    });
  }
  TherapistUser.findById({ _id: userId })
    .then((user) => {
      clearInmage(user?.imageUrl);
      user.imageUrl ="https://apitherapy-production.up.railway.app/"+ imageUrl;
      return user.save();
    })
    .then((updatedUser) => {
      return res.status(200).json({
        message: "Profile ppicture successfully uploaded!",
        imageUrl: updatedUser.imageUrl,
      });
    })
    .catch((err) => {
      return res.status(400).json({
        message: "Server Error!, please refresh your browser",
      });
    });
};

const clearInmage = (filePath) => {
  filePath = path.join(__dirname, "..", filePath);
  fs.unlink(filePath, (err) => console.log(err));
};
