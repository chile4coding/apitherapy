const express = require("express");
const authController = require("../controller/user-auth");
const dashboardController = require("../controller/dashboard");
const isAuth = require("../controller/isAuth");
const { body } = require("express-validator");
const appointmentController = require("../controller/appointment");
const usersController = require("../controller/users");
const userOTPController = require("../controller/userOtpSetup");
const therapistConfirmationController = require("../controller/therapistOtpSetup");
const googleAuthenticationController = require("../controller/googleUserLogin");
const userEditController = require("../controller/usereditprofile");
const faqController = require("../controller/faq");
const userOnbaordingController = require("../controller/userOnboarding");
const routers = express.Router();

routers.post(
  "/userlogin",
  [
    body("email").isEmail().normalizeEmail(),
    body("password").isLength({ min: 5 }),
  ],
  authController.postClientLogin
);

routers.get("/dashboard", isAuth.isAuth, dashboardController.getDashBoard);
routers.get(
  "/dashboard",
  isAuth.isAuth,
  dashboardController.getTherapistDashBoard
);
routers.post(
  "/uploadImage",
  isAuth.isAuth,
  dashboardController.uploadProfilePics
);
routers.post(
  "/uploadImage",
  isAuth.isAuth,
  dashboardController.therapistProfilePics
);

routers.post("/userlogin", authController.therapistLogin);
routers.post(
  "/bookappointment",
  [
    body("therapistId").notEmpty(),
    body("disorderType").notEmpty(),
    body("therapistname").notEmpty(),
    body("therapistEmail").notEmpty(),
    body("userEmail").notEmpty(),
    body("username").notEmpty(),
    body("phoneNumber").notEmpty(),
    body("DOB").notEmpty(),
    body("meetingType").notEmpty(),
    body("day").notEmpty(),
    body("appointmentTime").notEmpty(),
    body("description").notEmpty(),
  ],
  isAuth.isAuth,

  appointmentController.bookAppointment
);

routers.get("/getTherapists", isAuth.isAuth, usersController.getTherapist);
routers.get("/getsessions", isAuth.isAuth, usersController.getAppointment);
routers.post("/getdonesessions", isAuth.isAuth, usersController.getDone);
routers.get("/therapistgetsessions", isAuth.isAuth, usersController.getTherapistAppointment);
routers.post(
  "/usersignup",

  [
    body("email").isEmail().normalizeEmail(),
    body("name").notEmpty().trim(),
    body("password").isLength({ min: 5 }),
  ],
  userOTPController.postLogin
);
routers.post(
  "/usersignupconfirm",
  [body("OTP").trim().isLength({ min: 4 })],
  userOTPController.confirmUser
);
routers.post(
  "/therapistsignup",
  [
    body("name").notEmpty(),
    body("email").isEmail().normalizeEmail(),
    body("password").isLength({ min: 5 }),
    body("location").notEmpty(),
    body("liscense").notEmpty(),
    body("specialty").notEmpty(),
  ],
  therapistConfirmationController.therapistSignup
);

/*
req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const location = req.body.location;
  const specialty = req.body.specialty;
  const liscense = req.body.liscense;

*/
routers.post(
  "/therapistconfirmsignup",
  [body("OTP").trim().isLength({ min: 4 })],
  therapistConfirmationController.confirmTherapistUser
);

routers.post(
  "/useronboarding",
  [
    body("hobbies").notEmpty(),
    body("stateOfOrigin").notEmpty(),
    body("marriageStatus").notEmpty(),
  ],
  userOnbaordingController.userOnbaording
);
routers.post(
  "/therapistonboarding",
  [
    body("hobbies").notEmpty(),
    body("stateOfOrigin").notEmpty(),
    body("marriageStatus").notEmpty(),
  ],
  userOnbaordingController.therapistOnbaording
);
routers.post("/googleUserLogin", googleAuthenticationController.googleAuthUser);
routers.put(
  "/edituserptofile",
  [
    body("email").notEmpty(),
    body("name").notEmpty(),
  ],
  isAuth.isAuth,
  userEditController.editUser
);
routers.put(
  "/edittherapistprofile",
  [
    body("email").notEmpty(),
    body("name").notEmpty(),
    body("location").notEmpty(),
    body("specialty").notEmpty(),
    body("liscense").notEmpty(),
  ],
  isAuth.isAuth,
  userEditController.editTherapistUser
);

routers.post("/sendfaq", [
  body("email").notEmpty(),
  body("name").notEmpty(),
  body("message").notEmpty(),
  body("questionType").notEmpty(),
], faqController.postFaq);
routers.get("/getfaqs", faqController.getFaq);

/*
 const location = req.body.location;
  const specialty = req.body.specialty;
  const liscense = req.body.liscense;
  const email = req.body.email;
  const name = req.body.name;
  const location = req.body.location;
  const userId = req.userId;
*/

module.exports = routers;
