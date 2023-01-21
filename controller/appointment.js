require('dotenv').config()
const Appointment = require("../models/appointments");
const { validationResult } = require("express-validator");
const nodemailer = require("nodemailer");
const Clientuser = require("../models/client-users");
const TherapistUser = require("../models/therapist-users");

const requestPromise = require("request-promise");
const jwt = require("jsonwebtoken");
// therapistId  63c492a14844ec81f6857be5
// userId: 63c52072c5d7026234154644
exports.bookAppointment = (req, res, next) => {
  const userId = req.body.userId;
  const therapistId = req.body.therapistId;
  const appointmentTime = req.body.appointmentTime;
  const day = req.body.day;
  const disorderType = req.body.disorderType;
  const meetingType = req.body.meetingType;
  const description = req.body.description;
  const username = req.body.username;
  const userEmail = req.body.userEmail;
  const therapistEmail = req.body.therapistEmail;
  const therapistname = req.body.therapistname;

  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({
      error: error.array(),
    });
  }

  if (meetingType === "virtual") {
    const payload = {
      iss: process.env.GOOGLE_MEET_API_KEY, //your API KEY "HfYFhXpCTfOwSXklHCKQoQ",
      exp: new Date().getTime() + 5000,
    };
    const token = jwt.sign(payload, process.env.API_SECRET) //"g7td1Qic3DfBoJvmb8Ehm4rZ9WTxlJ9np9kQ"); //your API SECRET HERE
    const email = "chileomereji@gmail.com"; // your zoom developer email account
    var options = {
      method: "POST",
      uri: "https://api.zoom.us/v2/users/" + email + "/meetings",
      body: {
        topic: disorderType, //meeting title
        type: 1,
        settings: {
          host_video: "true",
          participant_video: "true",
        },
      },
      auth: {
        bearer: token,
      },
      headers: {
        "User-Agent": "Zoom-api-Jwt-Request",
        "content-type": "application/json",
      },
      json: true, //Parse the JSON string in the response
    };

    requestPromise(options)
      .then(function (response) {
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: "chileomereji@gmail.com",
            pass:process.env.GMAIL_PASSWORD //"eyohirzismtgyqcu", // gmail password
          },
        });

        const mailOptions = {
          from: "TherapyApp@gmail.com",
          to: [therapistEmail, userEmail],
          subject: "Therapy Session",
          html: `<p> Start link: ${response.start_url} </p> <p> Join link:  ${response.join_url} </p> <p>Password: ${response.password}</p>`,
        };

        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            console.log(error);
          } else {
            console.log("Email sent: " + info.response);
            // do something useful
          }
        });

        const createAppointment = new Appointment({
          description: description,
          userId: userId,
          therapistId: therapistId,
          appointmentTime: appointmentTime,
          userEmail: userEmail,
          username: username,
          therapistEmail: therapistEmail,
          therapistname: therapistname,
          day: day,
          disorderType: disorderType,
          meetingType: meetingType,
          seeionLink:
            "start link: " +
            response.start_url +
            " Join link" +
            response.password,
        });
        createAppointment.save().then((result) => {
          return res.status(200).json({
            message: "Appointment successfully booked",
            description: result.description,
            userId: result.userId,
            userEmail: result.userEmail,
            username: result.username,
            therapistEmail: result.email,
            therapistname: result.name,
            therapistId: result.therapistId,
            appointmentTime: result.appointmentTime,
            day: result.day,
            disorderType: result.disorderType,
            meetingType: result.meetingType,
            seeionLink: result.seeionLink,
          });
        });
        
        console.log("response is: ", response);
      })
      .catch(function (err) {
        // API call failed...
        console.log("API call failed, reason ", err);
      });
  } else {
    const createAppointmentOffline = new Appointment({
      userId: userId,
      userEmail: userEmail,
      username: username,
      therapistEmail: therapistEmail,
      therapistname: therapistname,
      therapistId: therapistId,
      appointmentTime: appointmentTime,
      day: day,
      disorderType: disorderType,
      meetingType: meetingType,
      seeionLink: "",
      description: description,
    });
    createAppointmentOffline.save().then((result) => {
      return res
        .status(200)
        .json({
          message: "Appointment successfully booked",
          description: result.description,
          userId: result.userId,
          userEmail: result.userEmail,
          username: result.username,
          therapistEmail: result.email,
          therapistname: result.name,
          day: result.day,
          disorderType: result.disorderType,
          meetingType: result.meetingType,
          seeionLink: result.seeionLink,
        })
      })
      .catch((err) => {
        return res.status(400).json({
          message:
            "Error occurred while taking your booking, please book again!",
        });
    });
  }
};
