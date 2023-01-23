const mongodb = require("mongodb");
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const clientUserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  isLoggedIn: {
    type: Boolean,
  },
  imageUrl: {
    type: String,
  },

  OTP: {
    type: String,
    required: true,
  },
  activated: {
    type: Boolean,
    required: true,
  },
  expires: {
    type: Number,
    required: true,
  },
  boarded: {
    type: Boolean,
  },
  hobbies: {
    type: String,
  },
  stateOfOrigin: {
    type: String,
  },
  marriageStatus: {
    type: String,
  },
  location: {
    type: String,
  },
});

module.exports = mongoose.model("clientuser", clientUserSchema);
