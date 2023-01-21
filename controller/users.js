const therapists = require("../models/therapist-users");
const appointment = require("../models/appointments");

exports.getTherapist = (req, res, next) => {
    therapists
    .find()
    .then((user) => {
      if (!user) {
        return res.status(400).json({
          message: "Something went wrong refresh the page!",
        });
    }
        const AllTherapist = user.map((eachUser) => {
          return {
            name: eachUser.name,
            location: eachUser.location,
            specialty: eachUser.specialty,
            userId: eachUser._id,
            email: eachUser.email,
            liscenseId: eachUser.liscense,
            imageUrl: eachUser.imageUrl,
          };
        });
        res.status(200).json({
          message: "Users Therapist fetched",
          therapists: AllTherapist,
        });
     
    })
    .catch((err) => {
      res.status(400).json({
        message: "Server Error!, please refresh your browser",
      });
    });
};

exports.getAppointment = (req, res, next) => {

  const userId = req.userId;
  appointment
    .find({ userId: userId })
    .then((userAppointment) => {
      
      if (userAppointment.length < 1) {
        return res.status(200).json({
          message: "No session booked!",
        });
    }
        return res.status(200).json({
          message: "Session successfully fetched!",
          sessions: userAppointment,
        });
     
    })
    .catch((err) => {
      return res.status(400).json({
        message: "Server Error!, please refresh your browser",
      });
    });
};