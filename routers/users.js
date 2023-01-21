const express = require("express");
const authController = require("../controller/user-auth");
const dashboardController = require("../controller/dashboard");
const isAuth = require("../controller/isAuth");
const { body } = require("express-validator");
const appointmentController = require("../controller/appointment");
const usersController = require("../controller/users");
const routers = express.Router();
const userOTPController = require("../controller/userOtpSetup");
const therapistConfirmationController = require("../controller/therapistOtpSetup");
const googleAuthenticationController = require("../controller/googleUserLogin");

routers.post("/userlogin", authController.postClientLogin);

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

routers.post("/tharapistlogin", authController.therapistLogin);
routers.post(
  "/bookappointment",
  isAuth.isAuth,
  // [
  //   body("therapistId").trim(),
  //   body("userId").trim(),
  //   body("disorderType").trim(),
  //   body("therapistname").trim(),
  //   body("therapistEmail").trim(),
  //   body("userEmail").trim(),
  //   body("username").trim()
  // ],
  appointmentController.bookAppointment
);

routers.get("/getTherapists", isAuth.isAuth, usersController.getTherapist);
routers.get("/getsessions", isAuth.isAuth, usersController.getAppointment);
routers.post(
  "/usersignup",
  // [
  //   body("email").isEmail().normalizeEmail(),
  //   body("name").trim()
  // ],
  userOTPController.postLogin
);
routers.post(
  "/userSignupConfirm",
  // [body("OTP").trim().isLength({ min: 3 })],
  userOTPController.confirmUser
);
routers.post(
  "/therapistReg",
  // [body("email").isEmail().normalizeEmail()],
  therapistConfirmationController.therapistSignup
);
routers.post(
  "/therapistConfirmReg",
  [body("OTP").trim().isLength({ min: 3 })],
  therapistConfirmationController.confirmTherapistUser
);
routers.post("/googleUserLogin", googleAuthenticationController.googleAuthUser);

module.exports = routers;
