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
  [
    body("therapistId").trim().isLength({ min: 5 }),
    body("userId").trim().isLength({ min: 5 }),
    body("disorderType").trim().isLength({ min: 5 }),
    body("therapistname").trim().isLength({ min: 5 }),
    body("therapistEmail").trim().isLength({ min: 5 }),
    body("userEmail").trim().isLength({ min: 5 }),
    body("username").trim().isLength({ min: 5 }),
  ],
  appointmentController.bookAppointment
);

routers.get("/getTherapists", isAuth.isAuth, usersController.getTherapist);
routers.get("/getsessions", isAuth.isAuth, usersController.getAppointment);
routers.post(
  "/usersignup",
  [
    body("email").isEmail().normalizeEmail(),
    body("name").trim().isLength({ min: 1 }),
    body("password").isLength({ min: 5 }),
  ],
  userOTPController.postLogin
);
routers.post(
  "/userSignupConfirm",
  [body("OTP").trim().isLength({ min: 3 })],
  userOTPController.confirmUser
);
routers.post(
  "/therapistReg",
  [body("email").isEmail().normalizeEmail()],
  therapistConfirmationController.therapistSignup
);
routers.post(
  "/therapistConfirmReg",
  [body("OTP").trim().isLength({ min: 3 })],
  therapistConfirmationController.confirmTherapistUser
);
routers.post("/googleUserLogin", googleAuthenticationController.googleAuthUser);

module.exports = routers;
